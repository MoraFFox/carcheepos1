import React from "react";
import { Palette, ChevronDown } from "lucide-react";

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  const themeOptions = [
    { value: "default", label: "Default" },
    { value: "blue", label: "Ocean Blue" },
    { value: "red", label: "Racing Red" },
    { value: "green", label: "Forest Green" },
    { value: "purple", label: "Royal Purple" },
  ];

  return (
    <div className="theme-switcher">
      <button className="theme-button">
        <Palette className="theme-icon" />
        <ChevronDown className="dropdown-icon" />
      </button>
      <div className="theme-dropdown">
        {themeOptions.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onThemeChange(value)}
            className={currentTheme === value ? "active" : ""}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
