/**
 * Renders the course decks in scripts/deck-content.mjs to branded PDFs in
 * public/materials/, and writes a manifest the website reads.
 *
 * Run with `npm run decks`. Only needs re-running when deck content changes,
 * so the PDFs are committed rather than built on every deploy.
 */

import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { renderDeck } from "./deck-template.mjs";
import { decks } from "./deck-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "materials");
mkdirSync(outDir, { recursive: true });

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((p) => {
  try {
    statSync(p);
    return true;
  } catch {
    return false;
  }
});

if (!executablePath) {
  console.error(
    "No Chrome/Chromium found. Set CHROME_PATH to your browser binary."
  );
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--font-render-hinting=none"],
});

const manifest = [];

for (const deck of decks) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setContent(renderDeck(deck), { waitUntil: "networkidle0" });

  // Webfonts must be resolved before printing or the PDF falls back to serif.
  await page.evaluateHandle("document.fonts.ready");

  const file = `${deck.slug}.pdf`;
  await page.pdf({
    path: join(outDir, file),
    width: "1280px",
    height: "720px",
    printBackground: true,
    pageRanges: `1-${deck.slides.length}`,
  });
  await page.close();

  const bytes = statSync(join(outDir, file)).size;
  manifest.push({
    slug: deck.slug,
    title: deck.title,
    subtitle: deck.subtitle,
    file: `materials/${file}`,
    slides: deck.slides.length,
    sizeKb: Math.round(bytes / 1024),
  });

  console.log(
    `  ${deck.title.padEnd(34)} ${String(deck.slides.length).padStart(2)} slides  ${String(
      Math.round(bytes / 1024)
    ).padStart(4)} KB`
  );
}

await browser.close();

writeFileSync(
  join(root, "src", "data", "decks.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);

console.log(`\n  ${manifest.length} decks written to public/materials/\n`);
