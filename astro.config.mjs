import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://flexirule.github.io",
  integrations: [sitemap()],
  output: "static",
  trailingSlash: "always",
});
