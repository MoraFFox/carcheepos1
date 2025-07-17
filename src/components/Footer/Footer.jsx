import React from "react";
import "./Footer.css";
const Footer = () => {
  const footerSections = [
    {
      title: "Buy Cars",
      links: [
        { label: 'Search Cars', href: '#' },
        { label: 'Featured Deals', href: '#' },
        { label: 'Car Reviews', href: '#' },
        { label: 'Financing', href: '#' }
      ]
    },
    {
      title: 'Sell Cars',
      links: [
        { label: 'List Your Car', href: '#' },
        { label: 'Dealer Programs', href: '#' },
        { label: 'Trade-In Value', href: '#' },
        { label: 'Selling Tips', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Safety Tips', href: '#' },
        { label: 'Privacy Policy', href: '#' }
      ]
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CarCHeepo</h3>
            <p>Your trusted partner in finding the perfect car at the best price.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">LI</a>
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CarCHeepo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;