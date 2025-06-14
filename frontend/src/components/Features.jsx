import React from "react";
import "./Features.css";

const Features = () => {
  const features = [
    {
      title: "🔍 IP & Port Scanner",
      description: "This feature enables you to scan any public IP address to detect open TCP ports and running services. It's the fundamental step in network reconnaissance. Attackers use port scanning to discover potential entry points — now, with VulnScanner, you can do the same to defend. It reveals whether SSH (22), HTTP (80), HTTPS (443), or other sensitive services like FTP (21) or RDP (3389) are publicly exposed. By regularly scanning, you ensure your servers don't accidentally expose internal services to the public internet. You can also assess whether firewall rules and security groups are correctly configured. This is like your digital “perimeter fence check."
    },
    {
      title: "🛡️ Security Headers Check",
      description: "Security headers are HTTP response fields that tell browsers how to behave when handling content from your server. Without them, even a secure website can become vulnerable to clickjacking, MIME sniffing, cross-site scripting, and more. VulnScanner checks for missing headers such as Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, and more. These headers act like browser-level firewalls and help prevent many client-side attacks. Missing them is like leaving your car unlocked — everything might seem okay, until someone opens the door."
    },
    {
      title: "💉 SQL Injection Detection",
      description: "SQL Injection (SQLi) is one of the oldest and most dangerous web vulnerabilities. If your application inserts user input directly into SQL queries, attackers can manipulate those queries to extract sensitive data, bypass login systems, or even delete entire databases. This scanner sends crafted payloads to form inputs and URL parameters to detect if user input is being interpreted as code. If a vulnerable point is found, it’s flagged immediately. For example, input like ' OR 1=1 -- can turn a login form into an open gate. VulnScanner helps you catch these critical issues before attackers do."
    },
    {
      title: "🧪 XSS Detection",
      description: "Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into pages viewed by other users. This script can steal cookies, hijack sessions, or redirect users to phishing sites. VulnScanner tests for XSS by injecting safe test payloads into URL parameters and input fields, then checking if they are reflected unescaped in the response. It detects reflected, stored, and basic DOM-based XSS issues. With real-world payloads like <script>alert(1)</script>, it helps ensure your output encoding, sanitization, and CSP (Content Security Policy) are working properly."
    },
    {
      title: "🔗 Redirect Chain Viewer",
      description: "Sometimes URLs silently redirect users to other destinations, which can be exploited in phishing attacks or cause privacy concerns. For example, http://example.com might redirect to https://www.example.com/login, then to auth.examplecdn.net/session. VulnScanner traces the full redirect chain step by step, showing you every hop. This helps you find unexpected third-party redirects, infinite loops, or unsafe HTTP→HTTPS transitions. It’s like a GPS tracker for URLs — you see every turn the user’s browser takes before reaching the final destination."
    },
    {
      title: "📊 JSON Output Display",
      description: "Developers need clean, structured data — not just pretty dashboards. VulnScanner provides all scan results as JSON, formatted and readable. This includes fields like is_https, missing_headers, vulnerabilities_detected, open_ports, and more. You can easily copy, log, or export the output. It's ideal for integrating into automated pipelines (CI/CD), dashboards, or for sharing with security teams. Whether you're running a manual test or building a continuous scanning tool, JSON output keeps your results portable and machine-readable."
    }
  ];

  return (
    <div className="features-page">
      <h1 className="page-title">🔧 Tool Features</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
