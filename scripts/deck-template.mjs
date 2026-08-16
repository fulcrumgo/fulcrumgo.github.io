/**
 * Slide rendering for Fulcrum course decks.
 *
 * Produces a single HTML document of 1280×720 pages which headless Chrome
 * then prints to PDF. Styling deliberately matches the website: same palette,
 * same typefaces, same lever-and-pivot mark in the corner of every slide.
 */

const MARK = `<svg viewBox="0 0 24 24" fill="none" width="20" height="20">
  <path d="M2.6 6.35 20.9 3.1" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>
  <path d="M10.62 8.3a1.6 1.6 0 0 1 2.76 0l5.66 9.6a1.6 1.6 0 0 1-1.38 2.42H6.34a1.6 1.6 0 0 1-1.38-2.42z" fill="currentColor"/>
</svg>`;

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Inline markup allowed in slide copy: **bold** and `code`. */
const rich = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");

function chrome(deck, n, total) {
  return `
    <div class="chrome">
      <div class="brand">${MARK}<span class="wm">Fulcrum</span></div>
      <div class="meta"><span>${esc(deck.shortTitle ?? deck.title)}</span><span class="num">${n} / ${total}</span></div>
    </div>`;
}

function renderSlide(deck, slide, i, total) {
  const n = i + 1;

  if (slide.type === "title") {
    return `<section class="slide title-slide">
      <div class="rule"></div>
      <p class="kicker">${esc(deck.kicker ?? "Fulcrum course notes")}</p>
      <h1>${rich(deck.title)}</h1>
      <p class="subtitle">${rich(deck.subtitle)}</p>
      <div class="byline">
        <div class="brand big">${MARK}<span class="wm">Fulcrum</span></div>
        <p>${esc(deck.author)}<br /><span class="muted">${esc(deck.org)}</span></p>
      </div>
      <p class="license">${esc(deck.license)}</p>
    </section>`;
  }

  if (slide.type === "about") {
    return `<section class="slide about-slide">
      <p class="kicker">About Fulcrum</p>
      <h2>${rich(slide.heading)}</h2>
      <div class="about-body">
        <div class="about-main">
          ${slide.paras.map((t) => `<p>${rich(t)}</p>`).join("")}
        </div>
        <aside class="about-links">
          <p class="aside-title">Find us</p>
          <p><strong>Website</strong><br/><a href="https://fulcrumgo.github.io">fulcrumgo.github.io</a></p>
          <p><strong>More material</strong><br/><a href="https://fulcrumgo.github.io/resources">fulcrumgo.github.io/resources</a></p>
          <p><strong>Discord</strong><br/><a href="https://discord.gg/gbQCGkupdJ">discord.gg/gbQCGkupdJ</a></p>
          <p><strong>LinkedIn</strong><br/><a href="https://www.linkedin.com/company/gofulcrum/">linkedin.com/company/gofulcrum</a></p>
          <p class="about-note">Every deck we publish is free to download at <a href="https://fulcrumgo.github.io/resources">fulcrumgo.github.io/resources</a></p>
        </aside>
      </div>
      ${chrome(deck, n, total)}
    </section>`;
  }

  if (slide.type === "section") {
    return `<section class="slide section-slide">
      <p class="kicker">Part ${esc(slide.part)}</p>
      <h2>${rich(slide.heading)}</h2>
      ${slide.note ? `<p class="section-note">${rich(slide.note)}</p>` : ""}
      ${chrome(deck, n, total)}
    </section>`;
  }

  if (slide.type === "end") {
    return `<section class="slide end-slide">
      <p class="kicker">About Fulcrum</p>
      <h2>${rich(slide.heading)}</h2>
      <p class="section-note">${rich(slide.note)}</p>
      <p class="end-blurb">Fulcrum is a volunteer-run non-profit helping people from under-resourced regions learn AI through free mentorship, research supervision, and open material like this deck. Founded 2025 in Kathmandu, Nepal. Nothing we do costs anything.</p>
      <div class="end-contact">
        <p><strong>Website</strong><br/><a href="https://fulcrumgo.github.io">fulcrumgo.github.io</a></p>
        <p><strong>Every deck, free</strong><br/><a href="https://fulcrumgo.github.io/resources">fulcrumgo.github.io/resources</a></p>
        <p><strong>Apply for mentorship</strong><br/><a href="https://discord.gg/gbQCGkupdJ">discord.gg/gbQCGkupdJ</a></p>
        <p><strong>Partnerships</strong><br/><a href="https://www.linkedin.com/company/gofulcrum/">linkedin.com/company/gofulcrum</a></p>
      </div>
      ${chrome(deck, n, total)}
    </section>`;
  }

  // Standard content slide: heading, optional lede, bullets, optional aside.
  const bullets = (slide.bullets ?? [])
    .map((b) => `<li>${rich(b)}</li>`)
    .join("");

  const aside = slide.aside
    ? `<aside class="aside">
         ${slide.aside.title ? `<p class="aside-title">${rich(slide.aside.title)}</p>` : ""}
         ${slide.aside.body ? `<p>${rich(slide.aside.body)}</p>` : ""}
         ${slide.aside.svg ?? ""}
       </aside>`
    : "";

  return `<section class="slide content-slide${aside ? " has-aside" : ""}">
    <h2>${rich(slide.heading)}</h2>
    ${slide.lede ? `<p class="lede">${rich(slide.lede)}</p>` : ""}
    <div class="body">
      <div class="main">
        ${bullets ? `<ul>${bullets}</ul>` : ""}
        ${slide.note ? `<p class="note">${rich(slide.note)}</p>` : ""}
      </div>
      ${aside}
    </div>
    ${chrome(deck, n, total)}
  </section>`;
}

export function renderDeck(deck) {
  const total = deck.slides.length;
  const slides = deck.slides
    .map((s, i) => renderSlide(deck, s, i, total))
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(deck.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
  :root {
    --paper: #ffffff;
    --warm: #f6f5f2;
    --ink: #0a0a0a;
    --soft: #55534e;
    --faint: #8d8a83;
    --line: #e3e0da;
    --accent: #b4472f;
    --display: "Space Grotesk", sans-serif;
    --sans: "Inter", sans-serif;
    --mono: "JetBrains Mono", monospace;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--paper); color: var(--ink); font-family: var(--sans); }

  .slide {
    width: 1280px;
    height: 720px;
    padding: 62px 76px;
    position: relative;
    background: var(--paper);
    page-break-after: always;
    break-after: page;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .slide:last-child { page-break-after: auto; break-after: auto; }

  h1 { font-family: var(--display); font-size: 64px; font-weight: 600; line-height: 1.04; letter-spacing: -0.025em; }
  h2 { font-family: var(--display); font-size: 40px; font-weight: 600; line-height: 1.1; letter-spacing: -0.02em; }

  .kicker {
    font-size: 12px; font-weight: 600; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 22px;
  }

  /* ---------- title slide ---------- */
  .title-slide { justify-content: center; background: var(--warm); }
  .title-slide .rule { width: 64px; height: 3px; background: var(--accent); margin-bottom: 34px; }
  .subtitle { font-size: 21px; color: var(--soft); margin-top: 24px; max-width: 780px; line-height: 1.5; }
  .byline { display: flex; align-items: center; gap: 26px; margin-top: 64px; }
  .byline p { font-size: 15px; line-height: 1.5; }
  .muted { color: var(--faint); }
  .license { position: absolute; left: 76px; bottom: 46px; font-size: 11.5px; color: var(--faint); max-width: 720px; line-height: 1.5; }

  /* ---------- section divider ---------- */
  .section-slide { justify-content: center; background: var(--ink); color: var(--paper); }
  .section-slide h2 { font-size: 54px; max-width: 900px; }
  .section-slide .kicker { color: var(--accent); }
  .section-note { margin-top: 22px; font-size: 18px; color: rgba(255,255,255,0.6); max-width: 760px; line-height: 1.55; }
  .end-slide .section-note { color: var(--soft); }
  .section-slide .chrome, .section-slide .brand { color: rgba(255,255,255,0.5); }
  .section-slide .chrome { border-top-color: rgba(255,255,255,0.15); }

  /* ---------- content ---------- */
  .lede { font-size: 19px; color: var(--soft); margin-top: 16px; max-width: 900px; line-height: 1.5; }
  .body { display: flex; gap: 48px; margin-top: 34px; flex: 1; min-height: 0; }
  .main { flex: 1; min-width: 0; }

  ul { list-style: none; }
  li {
    font-size: 18.5px; line-height: 1.5; color: var(--soft);
    padding-left: 26px; position: relative; margin-bottom: 15px;
  }
  li::before {
    content: ""; position: absolute; left: 0; top: 11px;
    width: 7px; height: 7px; background: var(--accent);
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
  }
  li strong { color: var(--ink); font-weight: 600; }

  code {
    font-family: var(--mono); font-size: 0.88em;
    background: var(--warm); padding: 2px 6px; border: 1px solid var(--line);
  }

  .note { margin-top: 20px; font-size: 15.5px; color: var(--faint); line-height: 1.55; font-style: italic; }

  .aside {
    width: 400px; flex-shrink: 0; background: var(--warm);
    border: 1px solid var(--line); padding: 28px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .aside-title { font-family: var(--display); font-size: 15px; font-weight: 600; margin-bottom: 12px; }
  .aside p { font-size: 15px; line-height: 1.55; color: var(--soft); }
  .aside svg { max-width: 100%; height: auto; margin-top: 14px; }

  /* ---------- about Fulcrum ---------- */
  .about-slide { justify-content: center; background: var(--warm); }
  .about-body { display: flex; gap: 48px; margin-top: 30px; }
  .about-main { flex: 1; }
  .about-main p { font-size: 17px; line-height: 1.6; color: var(--soft); }
  .about-main p + p { margin-top: 14px; }
  .about-links {
    width: 360px; flex-shrink: 0; background: var(--paper);
    border: 1px solid var(--line); padding: 26px;
  }
  .about-links p { font-size: 13.5px; line-height: 1.5; color: var(--soft); }
  .about-links p + p { margin-top: 12px; }
  .about-links strong { font-family: var(--display); color: var(--ink); }
  .about-note {
    margin-top: 18px !important; padding-top: 16px;
    border-top: 1px solid var(--line); font-size: 13px !important;
    color: var(--faint) !important;
  }

  /* ---------- closing ---------- */
  .end-slide { justify-content: center; background: var(--warm); }
  .end-blurb {
    margin-top: 24px; max-width: 860px; font-size: 16px;
    line-height: 1.6; color: var(--soft);
  }
  .end-contact { display: flex; gap: 44px; margin-top: 34px; flex-wrap: wrap; }
  .end-contact p { font-size: 15px; line-height: 1.6; color: var(--soft); }
  .end-contact strong { font-family: var(--display); color: var(--ink); }

  /* ---------- per-slide chrome ---------- */
  .chrome {
    position: absolute; left: 76px; right: 76px; bottom: 40px;
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--line); padding-top: 14px;
    font-size: 11.5px; color: var(--faint);
  }
  .brand { display: flex; align-items: center; gap: 9px; color: var(--ink); }
  .brand.big { color: var(--ink); }
  .wm { font-family: var(--display); font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; font-size: 12px; }
  .meta { display: flex; gap: 22px; align-items: center; }
  .num { font-variant-numeric: tabular-nums; }

  a { color: inherit; text-decoration: none; }
  .about-links a, .end-contact a { border-bottom: 1px solid var(--line); }

  @page { size: 1280px 720px; margin: 0; }
</style>
</head>
<body>
${slides}
</body>
</html>`;
}
