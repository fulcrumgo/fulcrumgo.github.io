/**
 * Turns the SPA into a set of real, static HTML pages.
 *
 * GitHub Pages serves files, not an application, so without this every route
 * would ship an empty <div id="root"> and rely on the crawler executing JS,
 * and a hard refresh on /about would 404. After this step each route is a
 * genuine HTML document with its own <title>, meta description, canonical URL,
 * Open Graph tags and JSON-LD, and deep links resolve without any redirect
 * trickery.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */

import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const { render, routes } = await import(
  join(dist, "server", "entry-server.js")
);

const template = readFileSync(join(dist, "index.html"), "utf8");

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** JSON-LD sits inside a <script>, so the only real hazard is a closing tag. */
const escapeJsonLd = (obj) =>
  JSON.stringify(obj).replace(/</g, "\\u003c");

function headToHtml(head) {
  const lines = [];

  for (const m of head.metas) {
    const key = m.name ? "name" : "property";
    const val = m.name ?? m.property;
    lines.push(
      `    <meta ${key}="${escapeAttr(val)}" content="${escapeAttr(m.content)}" />`
    );
  }
  for (const l of head.links) {
    lines.push(`    <link rel="${escapeAttr(l.rel)}" href="${escapeAttr(l.href)}" />`);
  }
  for (const graph of head.jsonLd) {
    lines.push(
      `    <script type="application/ld+json">${escapeJsonLd(graph)}</script>`
    );
  }
  return lines.join("\n");
}

const written = [];

for (const route of routes) {
  const { html, head } = render(route.path);

  const page = template
    .replace("<!--seo-->", headToHtml(head))
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeAttr(head.title)}</title>`
    )
    .replace('<div id="root"><!--app--></div>', `<div id="root">${html}</div>`);

  const outDir =
    route.path === "/" ? dist : join(dist, route.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), page);
  written.push(route.path);
  console.log(`  prerendered  ${route.path}`);
}

/* ---------------------------------------------------------------------------
   sitemap.xml, every canonical URL, so search engines do not have to guess.
   --------------------------------------------------------------------------- */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const { canonical } = render(r.path).head;
    const priority = r.path === "/" ? "1.0" : r.path === "/mentorship" ? "0.9" : "0.8";
    return `  <url>
    <loc>${canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
console.log("  wrote        sitemap.xml");

/* robots.txt, allow everything, point at the sitemap. */
const siteRoot = render("/").head.canonical.replace(/\/$/, "");
writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteRoot}/sitemap.xml\n`
);
console.log("  wrote        robots.txt");

/*
 * 404.html, a safety net only.
 *
 * Every real route is a static file now, so Pages serves those directly. This
 * catches genuinely unknown URLs and renders the styled NotFound page instead
 * of GitHub's default.
 */
const notFound = render("/404-not-found");
writeFileSync(
  join(dist, "404.html"),
  template
    .replace("<!--seo-->", '    <meta name="robots" content="noindex" />')
    .replace(
      /<title>[\s\S]*?<\/title>/,
      "<title>Page not found, Fulcrum</title>"
    )
    .replace('<div id="root"><!--app--></div>', `<div id="root">${notFound.html}</div>`)
);
console.log("  wrote        404.html");

/* .nojekyll, stops GitHub Pages' Jekyll step from dropping _-prefixed files. */
writeFileSync(join(dist, ".nojekyll"), "");

if (!existsSync(join(dist, "sitemap.xml"))) {
  throw new Error("prerender finished without writing a sitemap");
}

// The SSR bundle was a build input. Drop it so it never gets published,
// this runs last, after every render call above has used it.
rmSync(join(dist, "server"), { recursive: true, force: true });

console.log(`\n  ${written.length} routes prerendered, dist/ ready to publish\n`);
