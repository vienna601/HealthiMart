import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // --- Plugins ---
  plugins: [
    react(), // enables JSX, Fast Refresh, etc.
  ],

  // --- Dev server options ---
  server: {
    open: true, // opens your browser automatically
    port: 5173,
    strictPort: false, // if 3000 is taken, try the next available
  },

  // --- Build options ---
  build: {
    outDir: "dist", // where `vite build` will output files
    assetsDir: "assets", // sub-folder under dist for images/CSS/JS
    sourcemap: true, // generate source maps for easier debugging
  },
});
