/** @format */

import React from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import "./SettingsSubPage.css";

const COLOR_PRESETS = ["#5fb68f", "#2f27ce", "#c0456d", "#835cb6"];

export default function AppearanceSettingsPage() {
  const { mode, theme, toggleMode, setTheme, getTheme } = useTheme();
  const color = getTheme(theme);
  console.log(theme);
  return (
    <div className="settings-subpage-container">
      <h2>Appearance</h2>
      <div className="appearance-group">
        <label className="switch-label">
          <span>Dark mode</span>
          <input
            type="checkbox"
            checked={mode === "dark"}
            onChange={toggleMode}
          />
          <span className="switch-slider"></span>
        </label>
      </div>

      <div className="appearance-group">
        <p className="appearance-subtitle">Primary color</p>
        <div className="color-options">
          {COLOR_PRESETS.map((c) => {
            return (
              <button
                key={c}
                className={`color-swatch ${
                  theme.primary === c ? "selected" : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setTheme(getTheme(c))}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
