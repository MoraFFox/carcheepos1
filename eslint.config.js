import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tailwindcss from "eslint-plugin-tailwindcss";

export default [
  // Global ignores
  { ignores: ["dist/**"] },

  // Base JS recommended config
  js.configs.recommended,

  // React recommended flat config
  react.configs.flat.recommended,

  // JSX-A11y recommended flat config
  jsxA11y.flatConfigs.recommended,

  // Tailwind CSS recommended flat config
  tailwindcss.configs["flat/recommended"],

  // Project-specific configuration for JS/JSX files
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      // Plugins providing rules not covered by recommended configs
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      // react, jsx-a11y, tailwindcss plugins are likely included via their recommended configs above
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Ensure JSX is enabled
      },
      globals: {
        ...globals.browser, // Add browser globals
        ...globals.es2021, // Add newer ES globals
      },
    },
    settings: {
      react: {
        version: "detect", // Auto-detect React version
      },
      // Tailwind CSS settings (if needed, e.g., for custom class names)
      // tailwindcss: {
      //   callees: ['classnames', 'clsx', 'ctl'],
      // },
    },
    rules: {
      // Apply recommended rules from hooks/refresh plugins
      ...reactHooks.configs.recommended.rules,

      // Custom rules or overrides (can override recommended rules from above)
      "react/prop-types": "off", // Disable prop-types if not using them
      "react/react-in-jsx-scope": "off", // Not needed with React 17+ JSX transform
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Example: Override a rule from a recommended config if needed
      // 'jsx-a11y/anchor-is-valid': 'warn', // Example: Downgrade severity
    },
  },
];
