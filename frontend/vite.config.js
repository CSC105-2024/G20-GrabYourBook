import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: '../frontend',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [react(), tailwindcss()],
});
