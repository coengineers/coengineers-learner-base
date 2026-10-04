import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { brand } from "./src/brand.ts";
import { fileURLToPath } from "node:url";
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [
    react(),
    {
      name: "brand-title",
      transformIndexHtml(html) {
        const title = (brand.appLabel + " · " + brand.name).replace(
          /[&<>"']/g,
          (c) =>
            ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            })[c]!,
        );
        return html.replace("<title></title>", "<title>" + title + "</title>");
      },
    },
  ],
  server: {
    port: 4310,
    strictPort: true,
    proxy: { "/api": "http://127.0.0.1:8787" },
  },
  build: { outDir: "../../dist/web", emptyOutDir: true },
});
