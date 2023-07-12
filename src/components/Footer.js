import React from "react";
import backgroundImg from './dark.jpg';
import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer-container" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <div className="footer-content">
          <div className="logo-container">
            <h4 className="logo">
              Web3Berlin<span className="logo-highlight">Hackathon</span>
            </h4>
          </div>
          <div className="subscribe-form">
            <p className="subtitle">
              Join us and never miss out on our Latest Updates.
            </p>
            <form action="">
              <input
                type="text"
                className="email-input"
                placeholder="Enter your email"
              />
              <button className="subscribe-button">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
