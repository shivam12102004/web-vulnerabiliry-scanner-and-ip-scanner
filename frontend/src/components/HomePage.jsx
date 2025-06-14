import { useState } from "react";
import './../App.css';
import { Link } from "react-router-dom";
function HomePage() {
 

return (
   <div className="homepage">
      <header className="header">
        <div className="container">
          <h1 className="logo">VULN-SCANNER BY SHIVAM</h1>
          <nav>
            <ul className="nav-links">
              <li><a href="/" className="text-2xl">Home</a></li>
              <li><a href="/features">Features</a></li>
              <li><a href="/scan">Scan</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Find Website Bugs Instantly</h2>
          <p>Scan your site for vulnerabilities with one click.</p>
          <a href='/scan'><button className="cta-button">Start Scan</button></a>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h3>Key Features</h3>
          <div className="features-grid">
            <div className="feature-box">
              <h4>Fast Scanning</h4>
              <p>Scan your site in seconds with optimized tools.</p>
            </div>
            <div className="feature-box">
              <h4>Detailed Reports</h4>
              <p>Get comprehensive summaries of vulnerabilities.</p>
            </div>
            <div className="feature-box">
              <h4>Secure & Reliable</h4>
              <p>Your data stays safe during scans.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} VULN-SCANNER. All rights reserved.</p>
          <p>Built for security researchers and developers.</p>
        </div>
      </footer>
    </div>
);
}

export default HomePage;
