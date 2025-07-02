import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/profile/", // MUST match your repository name
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Optional: Better chunking for large files
          react: ["react", "react-dom"],
          vendor: ["lucide-react", "react-scroll"],
        },
      },
    },
  },
});
