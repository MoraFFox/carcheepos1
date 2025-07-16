/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Using default react plugin configuration
    // visualizer({ open: true, filename: "dist/stats.html" }), // Adds the visualizer plugin
  ],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      '/api': {
        target: 'http://localhost:7500',
        changeOrigin: true, // Recommended for virtual-hosted sites
      },
    },
  },
});
