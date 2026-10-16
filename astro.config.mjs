import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://flexirule.github.io",
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  build: {
    // Keep CSS as cacheable, fingerprinted external assets instead of inlining it.
    inlineStylesheets: "never",
  },
  vite: {
    build: {
      minify: "oxc",
      cssMinify: "lightningcss",
      sourcemap: false,
      assetsInlineLimit: 4096,
      reportCompressedSize: true,
    },
  },
});
