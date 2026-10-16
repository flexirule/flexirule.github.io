import type { APIRoute } from "astro";
import { comparisons } from "../data/comparisons";

const siteUrl = "https://flexirule.github.io";

export const GET: APIRoute = () => {
  const urls = [
    siteUrl + "/",
    siteUrl + "/comparisons/",
    ...comparisons.map(({ slug }) => siteUrl + "/comparisons/" + slug + "/"),
  ];

  const entries = urls
    .map((url) => "  <url><loc>" + url + "</loc></url>")
    .join("\n");
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries +
    "\n</urlset>\n";

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
