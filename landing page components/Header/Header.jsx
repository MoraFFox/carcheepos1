import React from "react";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = ({ currentTheme, onThemeChange, isMenuOpen, onMenuToggle }) => {
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
            <a href="#" className="nav-link">
              Buy Cars
            </a>
            <a href="#" className="nav-link">
              Sell Your Car
            </a>
            <a href="#" className="nav-link">
              Finance
            </a>
            <a href="#" className="nav-link">
              About
            </a>
            <a href="#" className="nav-link">
              Contact
            </a>
          </nav>

          <div className="header-actions">
            {/* <ThemeSwitcher
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
            /> */}
            <button className="btn-outline">Sign In</button>
            <button className="btn-primary">Sign Up</button>
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
