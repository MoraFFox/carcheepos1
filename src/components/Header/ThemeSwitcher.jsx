import React, { useState } from "react";
import { Palette, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import "./ThemeSwitcher.css";

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
  // If a parent passes handlers use them, otherwise rely on ThemeContext
  const { theme, setTheme, getTheme } = useTheme();
  console.log(theme.primary);
  const handleThemeChange = (value) => {
    if (onThemeChange) {
      onThemeChange(value);
    } else {
      // Map the simple value to the primary color that ThemeContext.getTheme expects
      const valueToPrimary = {
        default: "#5fb68f",
        blue: "#0087d4",
        red: "#c0456d",
        green: "#61b7a0",
        purple: "#835cb6",
      };
      const selectedPrimary = valueToPrimary[value] || "#5fb68f";
      const newTheme = getTheme(selectedPrimary);
      setTheme(newTheme);
    }
  };
  const themeOptions = [
    { value: "default", label: "Default" },
    { value: "blue", label: "Ocean Blue" },
    { value: "red", label: "Racing Red" },
    { value: "green", label: "Forest Green" },
    { value: "purple", label: "Royal Purple" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="theme-switcher">
      <button className="theme-button" onClick={() => setOpen(!open)}>
        <Palette className="theme-icon" />
        <ChevronDown className="dropdown-icon" />
      </button>
      {open && (
        <div className="theme-dropdown">
          {themeOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleThemeChange(value)}
              className={theme.primary === value ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
