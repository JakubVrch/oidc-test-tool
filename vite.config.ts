import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-router-dom")) return "vendor-router";
          if (
            id.includes("@chakra-ui") ||
            id.includes("@emotion") ||
            id.includes("next-themes")
          ) {
            return "vendor-chakra";
          }
          if (id.includes("react-hook-form")) return "vendor-form";
          if (id.includes("react-icons")) return "vendor-icons";
          if (id.includes("react") || id.includes("scheduler"))
            return "vendor-react";
        },
      },
    },
  },
});
