import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Netflix-login-clonept/",
  server: {
    port: 5173,
  },
});
