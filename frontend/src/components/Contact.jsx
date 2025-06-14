import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>📞 Contact Us</h1>
      <p className="subtitle">We'd love to hear from you!</p>

      <div className="contact-container">
        <div className="contact-card">
          <i className="fas fa-envelope icon"></i>
          <h3>Email</h3>
          <p>kumarshivam12102004@gmail.com</p>
        </div>

        <div className="contact-card">
          <i className="fas fa-phone-alt icon"></i>
          <h3>Phone</h3>
          <p>+91 62065 00643</p>
        </div>

        <div className="contact-card">
          <i className="fab fa-instagram icon"></i>
          <h3>Instagram</h3>
          <p>@shivam_saw1515</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
