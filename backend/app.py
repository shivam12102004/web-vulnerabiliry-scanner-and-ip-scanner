import nmap  # Import python-nmap for Nmap scanning
from flask import Flask, request, jsonify
from urllib.parse import urlparse, quote_plus
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from functools import wraps
from flask_cors import CORS
from collections import defaultdict
import requests
import subprocess
import logging

app = Flask(__name__)

# Flask-Limiter Setup for Rate Limiting
limiter = Limiter(get_remote_address, app=app)

# Secret Key for Session Management (for Authentication/CSRF protection)
app.config['SECRET_KEY'] = os.urandom(24)

# CORS Configuration
# CORS(app, resources={r"/scan": {"origins": "*"}})
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# Security headers to check
SECURITY_HEADERS = [
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-XSS-Protection",
    "Referrer-Policy",
    "Permissions-Policy",
    "Expect-CT"
]

# API Key for authentication
API_KEY = "Shivam200@123"

# Failed requests counter
failed_requests = defaultdict(int)

# Function to check if URL is valid
def is_valid_url(url):
    try:
        parsed = urlparse(url)
        return parsed.scheme in ['http', 'https'] and parsed.netloc
    except:
        return False

# Basic Authentication Decorator
def requires_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if api_key != API_KEY:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.after_request
def apply_security_headers(response):
    for header in SECURITY_HEADERS:
        if header not in response.headers:
            response.headers[header] = 'Strict-Transport-Security'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

@app.before_request
def log_suspicious_requests():
    ip = request.remote_addr
    if failed_requests[ip] > 5:
        logging.warning(f"Suspicious IP {ip} blocked after multiple failed attempts.")

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Vulnerability Scanner Backend!"})

# Function to check if required security headers are present (case-insensitive)
def check_security_headers(response):
    missing_headers = []
    headers = {k.lower(): v for k, v in response.headers.items()}
    for header in SECURITY_HEADERS:
        if header.lower() not in headers:
            missing_headers.append(header)
    return missing_headers

# 🔐 XSS Testing Function (Newly Added)
def test_xss_vulnerability(url):
    xss_payloads = [
        "<script>alert(1)</script>",
        "'><script>alert(1)</script>",
        "\" onerror=\"alert(1)",
        "<img src=x onerror=alert(1)>"
    ]
    for payload in xss_payloads:
        encoded_payload = quote_plus(payload)
        test_url = url + ("&input=" if "?" in url else "?input=") + encoded_payload
        try:
            response = requests.get(test_url, timeout=10)
            if payload in response.text:
                return "Potential XSS vulnerability detected!"
        except Exception as e:
            return f"Error testing for XSS: {e}"
    return "No XSS vulnerability detected"

# 🔐 Vulnerability Descriptions in Hindi
vulnerability_explanations = {
    "sql_injection": {
        "description": "SQL Injection ek aisi vulnerability hai jisme attacker tumhare database me apna code daal kar chala sakta hai. Isse attacker login bypass kar sakta hai ya sensitive data chura sakta hai.",
        "solution": "User input ko sanitize karo aur prepared statements ka use karo. Bina check kiye input ko query me mat lagao."
    },
    "xss": {
        "description": "XSS me attacker tumhare page me JavaScript daal kar user ke browser me chala deta hai. Isse user ka data leak ho sakta hai.",
        "solution": "User input ko HTML encode karo, CSP lagao, aur kabhi bhi bina check kiye input browser me mat dikhao."
    },
    "security_headers": {
        "description": "Security headers browser ko batate hain ki website kaise secure tarike se behave kare. Agar ye headers na ho to attacker page ke response ka misuse kar sakta hai.",
        "solution": "Content-Security-Policy, X-Frame-Options jaise headers response me bhejna chahiye taaki browser security badhaye."
    }
}

@app.route('/scan', methods=['POST'])
@limiter.limit("5 per minute")
@requires_api_key
def scan():
    data = request.get_json()
    url = data.get('url')

    if not url or not is_valid_url(url):
        return jsonify({"error": "Valid URL is required"}), 400

    try:
        response = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
    except Exception as e:
        return jsonify({"error": f"Failed to fetch URL: {str(e)}"}), 500

    missing_headers = check_security_headers(response)
    redirect_chain = [r.url for r in response.history] if response.history else []
    sql_injection_vuln = test_sql_injection(url)
    xss_vuln = test_xss_vulnerability(url)

    vulnerability_details = {}
    if "SQL Injection" in sql_injection_vuln:
        vulnerability_details["sql_injection"] = vulnerability_explanations["sql_injection"]
    if "XSS" in xss_vuln:
        vulnerability_details["xss"] = vulnerability_explanations["xss"]
    if missing_headers:
        vulnerability_details["security_headers"] = vulnerability_explanations["security_headers"]

    return jsonify({
        "url": url,
        "status_code": response.status_code,
        "is_https": url.startswith("https"),
        "redirect_chain": redirect_chain,
        "missing_security_headers": missing_headers,
        "sql_injection_vuln": sql_injection_vuln,
        "xss_vulnerability": xss_vuln,
        "vulnerability_details": vulnerability_details
    })

# SQL Injection Testing Function
def test_sql_injection(url):
    payloads = [
        "' OR 1=1 --",
        '" OR 1=1 --',
        "' OR 'a'='a",
        '" OR "a"="a',
        "admin' --",
        "' UNION SELECT NULL, username, password FROM users --"
    ]
    for payload in payloads:
        encoded_payload = quote_plus(payload)
        if '?' in url:
            full_url = url + "&payload=" + encoded_payload
        else:
            full_url = url + "?payload=" + encoded_payload
        try:
            response = requests.get(full_url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
            if "error" in response.text.lower() or "mysql" in response.text.lower() or "syntax" in response.text.lower():
                return "SQL Injection vulnerability detected!"
        except requests.exceptions.RequestException as e:
            return f"Error testing for SQL Injection: {e}"
    return "No SQL Injection vulnerability detected"

# Nmap Scanning Function with Direct Path to nmap
def scan_ip(ip):
    nm = nmap.PortScanner()
    nmap_path = r"C:\\Program Files (x86)\\Nmap\\nmap.exe"
    try:
        nm.scan(ip, '21-23,25,53,80,110,135,139,143,443,445,3306,3389', arguments='-O')
        if ip not in nm.all_hosts():
            return {"error": f"Host {ip} is not reachable or is down."}
        scan_data = {
            "host": ip,
            "status": nm[ip].state(),
            "protocols": nm[ip].all_protocols(),
            "hostnames": nm[ip].hostnames(),
            "addresses": nm[ip].get('addresses', {}),
            "ports": nm[ip]['tcp'] if 'tcp' in nm[ip] else {},
            "os": nm[ip].get('osmatch', 'OS detection not available')
        }
        return scan_data
    except Exception as e:
        return {"error": f"Failed to scan IP: {str(e)}"}

@app.route('/scan_ip', methods=['POST'])
@limiter.limit("5 per minute")
@requires_api_key
def scan_ip_route():
    data = request.get_json()
    ip = data.get('ip')
    if not ip:
        return jsonify({"error": "IP address is required"}), 400
    scan_data = scan_ip(ip)
    return jsonify(scan_data)

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error, please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
