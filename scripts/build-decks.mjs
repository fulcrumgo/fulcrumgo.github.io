/**
 * Renders the course decks in scripts/deck-content.mjs to branded PDFs in
 * public/materials/, and writes a manifest the website reads.
 *
 * Run with `npm run decks`. Only needs re-running when deck content changes,
 * so the PDFs are committed rather than built on every deploy.
 */

import { mkdirSync, writeFileSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { PDFDocument, PDFName, PDFHexString } from "pdf-lib";
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

/** Walk the outline tree in document order and set each /Title. */
function relabelOutline(doc, titles) {
  const root = doc.catalog.get(PDFName.of("Outlines"));
  if (!root) return;
  const out = [];
  const walk = (node) => {
    let child = node.get(PDFName.of("First"));
    while (child) {
      const item = child instanceof Object && child.get ? child : doc.context.lookup(child);
      if (!item || !item.get) break;
      out.push(item);
      walk(item);
      const next = item.get(PDFName.of("Next"));
      child = next ? doc.context.lookup(next) : null;
    }
  };
  walk(doc.context.lookup(root));
  out.forEach((item, i) => {
    if (titles[i] !== undefined) {
      item.set(PDFName.of("Title"), PDFHexString.fromText(titles[i]));
    }
  });
}

const manifest = [];

for (const deck of decks) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setContent(renderDeck(deck), { waitUntil: "networkidle0" });

  // Webfonts must be resolved before printing or the PDF falls back to serif.
  await page.evaluateHandle("document.fonts.ready");

  const file = `${deck.slug}.pdf`;
  const target = join(outDir, file);

  await page.pdf({
    path: target,
    width: "1280px",
    height: "720px",
    printBackground: true,
    pageRanges: `1-${deck.slides.length}`,
    // `outline` builds PDF bookmarks from the heading structure, so a reader
    // can jump between slides instead of scrolling 34 pages. `tagged` emits
    // the structure tree that screen readers rely on.
    outline: true,
    tagged: true,
  });
  await page.close();

  /* Chrome sets the title from <title> and nothing else, so the remaining
     document properties are written here. These are what a PDF reader shows
     under document properties, and what search engines index. */
  const doc = await PDFDocument.load(readFileSync(target));

  /* Chrome builds the outline by reading the printed text back off the page,
     so a heading that wraps across two lines loses the space at the break
     ("and a squashing" becomes "and asquashing"). The deck data is the real
     source of truth, so the bookmark titles are rewritten from it. */
  const titles = deck.slides.map((sl) =>
    sl.type === "title" ? deck.title : sl.heading ?? deck.title
  );
  relabelOutline(doc, titles);

  doc.setTitle(deck.title);
  doc.setAuthor(`${deck.author}, ${deck.org}`);
  doc.setSubject(deck.subtitle);
  doc.setKeywords([
    "Fulcrum",
    "free course notes",
    "artificial intelligence",
    deck.shortTitle,
    "CC BY 4.0",
  ]);
  doc.setCreator("Fulcrum (fulcrumgo.github.io)");
  doc.setProducer("Fulcrum deck builder");
  writeFileSync(target, await doc.save());

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
