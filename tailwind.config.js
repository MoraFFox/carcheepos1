/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        "primary-blue": "#3563E9", // Main blue from design
        "secondary-blue": "#9FB7FF", // Lighter blue accent
        "light-gray-100": "#F6F7F9", // Very light background gray
        "light-gray-200": "#C3D4E9", // Light gray for borders/accents
        "text-primary": "#1A202C", // Dark text
        "text-secondary": "#90A3BF", // Lighter text
      },
    },
  },
  plugins: [],
};
