import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router"],
          "ui-vendor": [
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-progress",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
          "form-vendor": ["@hookform/resolvers", "react-hook-form", "zod"],
          "chart-vendor": ["recharts"],
          "animation-vendor": ["framer-motion"],
          "redux-vendor": ["@reduxjs/toolkit", "react-redux", "redux"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: true,
  },
});
