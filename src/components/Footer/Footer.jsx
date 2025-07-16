import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Description */}
        <div className="footer-logo-section">
          <Link to="/" className="footer-logo">
            Rivent
          </Link>
          <p className="footer-description">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        {/* Links Sections */}
        <div>
          <h4 className="footer-section-title">About</h4>
          <ul className="footer-links">
            <li>
              <Link to="/how-it-works" className="footer-link">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/featured" className="footer-link">
                Featured
              </Link>
            </li>
            <li>
              <Link to="/partnership" className="footer-link">
                Partnership
              </Link>
            </li>
            <li>
              <Link to="/business-relation" className="footer-link">
                Business Relation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="footer-section-title">Socials</h4>
          <ul className="footer-links">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="footer-section-title">Community</h4>
          <ul className="footer-links">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Podcast
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Invite a friend
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Rivent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
