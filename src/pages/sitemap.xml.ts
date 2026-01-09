import type { APIRoute } from "astro";

const pages = [
  {
    url: "https://autoescoladanda.com.br/",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    url: "https://autoescoladanda.com.br/planos",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: "0.9",
  },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

export const GET: APIRoute = () => {
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
