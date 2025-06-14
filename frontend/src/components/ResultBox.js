import React from "react";
import "./ResultBox.css";

const ResultBox = ({ result }) => {
  if (!result) return null;

  const { 
    url, status_code, is_https, sql_injection_vuln, 
    xss_vulnerability, redirect_chain, missing_security_headers,
    vulnerability_details 
  } = result;

  return (
    <div className="result-box">
      <h2>🔍 Scan Result</h2>

      <div className="result-item">
        <strong>URL:</strong> {url}
      </div>
      <div className="result-item">
        <strong>Status Code:</strong> {status_code}
      </div>
      <div className="result-item">
        <strong>HTTPS:</strong> {is_https ? "Yes ✅" : "No ❌"}
      </div>
      <div className="result-item">
        <strong>Redirect Chain:</strong>
        <ul>
          {redirect_chain.map((url, idx) => (
            <li key={idx}>{url}</li>
          ))}
        </ul>
      </div>

      <div className="result-item">
        <strong>Missing Security Headers:</strong>
        <ul>
          {missing_security_headers.map((header, idx) => (
            <li key={idx}>{header}</li>
          ))}
        </ul>
        <p className="desc">{vulnerability_details.security_headers.description}</p>
        <p className="solution"><strong>Fix:</strong> {vulnerability_details.security_headers.solution}</p>
      </div>

      <div className="result-item">
        <strong>SQL Injection:</strong> {sql_injection_vuln}
        <p className="desc">{result.vulnerability_details.sql_injection.description}</p>
        <p className="solution"><strong>Fix:</strong> {result.vulnerability_details.sql_injection.solution}</p>
      </div>

      <div className="result-item">
        <strong>XSS Vulnerability:</strong> {result.xss_vulnerability}
        <p className="desc">{result.vulnerability_details.xss.description}</p>
        <p className="solution"><strong>Fix:</strong> {result.vulnerability_details.xss.solution}</p>
      </div>
    </div>
  );
};

export default ResultBox;
