import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  // Define styles for active and inactive NavLinks based on the new design
  const activeStyle = "nav-link-active";
  const inactiveStyle = "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - Circle with blue border and text */}
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-circle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="#3563E9"
                strokeWidth="2"
                fill="#e6edff"
              />
            </svg>
          </span>
          <span className="navbar-logo-text">Rivent</span>
        </Link>
        {/* Navigation Links */}
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            Pricing
          </NavLink>
        </div>
        {/* Get Started Button */}
        <button className="navbar-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default NavBar;
