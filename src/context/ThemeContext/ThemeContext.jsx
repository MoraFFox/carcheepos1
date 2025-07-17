/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";
const colorTheme = {
  defaultTheme: {
    mode: "light",
    primary: "#5fb68f",
    text: "#101110",
    background: "#f7faf8",
    secondary: "#95e0bd",
    accent: "#5ae3a4",
    lightPrimary: "rgba(0, 255, 0, 0.05)",
    bg: "rgba(0, 255, 0, 0.103)",
    sb1: "rgba(0, 177, 59, 0.4)",
    sb2: "rgba(0, 177, 59, 0.3)",
    sb3: "rgba(0, 177, 59, 0.2)",
    sb4: "rgba(0, 177, 59, 0.1)",
    sb5: "rgba(0, 177, 59, 0.05)",
  },
  blueTheme: {
    mode: "light",
    text: "#050315",
    background: "#fbfbfe",
    primary: "rgb(0, 135, 212)",
    secondary: "rgb(131, 183, 255)",
    accent: "rgb(59, 167, 255)",
    lightPrimary: "rgba(0, 132, 255, 0.05)",
    bg: "rgba(0, 101, 184, 0.1)",
    sb1: "rgba(0, 101, 184, 0.4)",
    sb2: "rgba(0, 101, 184, 0.3)",
    sb3: "rgba(0, 101, 184, 0.2)",
    sb4: "rgba(0, 101, 184, 0.1)",
    sb5: "rgba(0, 101, 184, 0.05)",
  },
  redTheme: {
    mode: "light",
    text: "#060505",
    background: "#f8f2f4",
    primary: "#c0456d",
    secondary: "#e77ea0",
    accent: "#f45387",
    lightPrimary: "rgba(255, 0, 0, 0.05)",
    bg: "rgba(255, 0, 0, 0.103)",
    sb1: "rgba(200, 0, 50, 0.4)",
    sb2: "rgba(200, 0, 50, 0.3)",
    sb3: "rgba(200, 0, 50, 0.2)",
    sb4: "rgba(200, 0, 50, 0.1)",
    sb5: "rgba(200, 0, 50, 0.05)",
  },
  greenTheme: {
    mode: "light",
    text: "#0a0f0e",
    background: "#f7fbfa",
    primary: "#61b7a0",
    secondary: "#a2dccc",
    accent: "#68d2b5",
    lightPrimary: "rgba(0, 255, 0, 0.05)",
    bg: "rgba(0, 255, 0, 0.103)",
    sb1: "rgba(0, 177, 59, 0.4)",
    sb2: "rgba(0, 177, 59, 0.3)",
    sb3: "rgba(0, 177, 59, 0.2)",
    sb4: "rgba(0, 177, 59, 0.1)",
    sb5: "rgba(0, 177, 59, 0.05)",
  },
  purpleTheme: {
    mode: "light",
    text: "#060506",
    background: "#f8f7fa",
    primary: "#835cb6",
    secondary: "#b292dc",
    accent: "#925ada",
    lightPrimary: "rgba(131, 92, 182, 0.05)",
    bg: "rgba(131, 92, 182, 0.103)",
    sb1: "rgba(131,92,182,0.4)",
    sb2: "rgba(131,92,182,0.3)",
    sb3: "rgba(131,92,182,0.2)",
    sb4: "rgba(131,92,182,0.1)",
    sb5: "rgba(131,92,182,0.05)",
  },
};

const getTheme = (c) => {
  switch (c) {
    case "#5fb68f":
      return colorTheme.defaultTheme;

    case "#2f27ce":
      return colorTheme.blueTheme;

    case "#c0456d":
      return colorTheme.redTheme;

    case "#835cb6":
      return colorTheme.purpleTheme;

    default:
      return colorTheme.greenTheme;
  }
};
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || colorTheme.defaultTheme.mode;
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || colorTheme.defaultTheme;
  });

  // Update CSS vars
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    console.log(document.documentElement.dataset);
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--accent", theme.accent);
    document.documentElement.style.setProperty(
      "--lightPrimary",
      theme.lightPrimary
    );
    document.documentElement.style.setProperty("--bg", theme.bg);
    console.log(theme.sb1)
    document.documentElement.style.setProperty("--sb1", theme.sb1);
    document.documentElement.style.setProperty("--sb2", theme.sb2);
    document.documentElement.style.setProperty("--sb3", theme.sb3);
    document.documentElement.style.setProperty("--sb4", theme.sb4);
    document.documentElement.style.setProperty("--sb5", theme.sb5);
    document.documentElement.style.setProperty("--sb6", theme.sb6);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const value = { mode, theme, toggleMode, setTheme, getTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
