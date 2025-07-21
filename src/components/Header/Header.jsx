import React  from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

import "./Header.css";
const Header = ({ currentTheme, onThemeChange, isMenuOpen, onMenuToggle }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <h1>
              Car<span className="logo-accent">CHeepo</span>
            </h1>
          </div>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link to="/cars" className="nav-link">
              Buy 
            </Link>
            <Link to="/sell" className="nav-link">
              Sell 
            </Link>
            <Link to="/finance" className="nav-link">
              Finance
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <ThemeSwitcher
              onThemeChange={onThemeChange}
            />
            <button className="btn-outline" onClick={() => {navigate('auth/login')}}>Sign In</button>
            <button className="btn-primary" onClick={() => {navigate('auth/signup')}}>Sign Up</button>
            <button className="menu-toggle" onClick={onMenuToggle}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
