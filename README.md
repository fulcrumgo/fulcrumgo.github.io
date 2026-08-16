# Fulcrum

The website for **Fulcrum**, a volunteer-run non-profit that helps people from
under-resourced regions learn artificial intelligence.

Live at **https://fulcrumgo.github.io/**

---

## What Fulcrum does

Fulcrum was founded in 2025 in Kathmandu, Nepal, by [Utsav Poudel](https://utsavpoudel.com.np/).
The premise is simple: ability is spread evenly across the world and opportunity
is not. What separates a capable student in Pokhara or rural Bihar from one at a
well-funded lab is rarely intelligence. It is access to supervision, to
reviewers, to equipment, and to the unwritten rules nobody writes down.

Fulcrum supplies that missing layer. Everything is free, and everyone who runs
it is a volunteer.

### The five programs

| Program | What it is |
| --- | --- |
| **Mentorship** | One-on-one and small-group mentorship with working researchers and engineers |
| **Research & Publication Support** | Framing a question, structuring a paper, choosing a venue, surviving peer review |
| **Project Building in AI** | Scoping, model development, honest evaluation, deployment |
| **Tech Workshops** | Live sessions on ML, deep learning, quantum computing, computer vision, recorded and released free |
| **Guest Speaker Series** | Talks and open Q&A with researchers and practitioners worldwide |

### Work delivered so far

- **200+ students reached** across rural Nepal and the Indian subcontinent.
- **Shree Pardi Secondary School, Pokhara-17, Kaski**, 27 May 2026. Free AI
  training for grades 9 and 10: using AI as a study tool rather than a shortcut,
  Wolfram Alpha for maths and science, and where over-reliance on AI erodes
  independent thinking.
- **AI Basics, a two-day workshop with Leafclutch Technologies Pvt. Ltd.**,
  March 2026. Foundations through to careers and research practice. Both decks
  are published on the Resources page.
- **Publishing research during an engineering degree**, 100+ students who
  wanted a publication before graduating.
- **Publishing research in medicine, and AI in clinical practice**, our first
  open session, which drew nurses and other health professionals alongside
  researchers, including participants from ACU Australia.

Guest speakers have included **Anuj Nepal** (continual learning, quantum
computing) and **Subramaniyaswamy V** (datasets, recommender systems, scaling).

The **`/impact`** page carries the photographs from these sessions, the sessions
themselves in full, and Shree Pardi Secondary School's own public post about the
training they hosted. Photos live in `public/images/impact/` and are listed in
`impactPhotos` in `src/data/site.js`, all Fulcrum's own, taken at the sessions
and already published on the organisation's social accounts. No stock imagery
is used anywhere on the site.

> **No institutional affiliations.** Fulcrum is an independent volunteer
> non-profit. It delivers sessions with hosts such as schools and companies,
> but has no formal affiliation with any university, and nothing on the site
> may imply otherwise. The founder's own academic roles (Deakin, Monash, VIT)
> are his personally and appear only in his bio.

### Get involved

- Apply for mentorship: **[Discord](https://discord.gg/gbQCGkupdJ)**
- Mentor, speak, or partner: **[LinkedIn](https://www.linkedin.com/company/gofulcrum/)**
- Follow along: **[Instagram](https://www.instagram.com/gofulcrum/)**

> **No email addresses anywhere.** Every Fulcrum mailbox lived on a domain the
> organisation is giving up, so all contact routes through Discord and
> LinkedIn instead. If a mailbox exists again later, add it to `contact` in
> `src/data/site.js`, one place, rather than scattering `mailto:` links back
> through the pages.

---

## Learning materials

`public/materials/` holds every downloadable PDF, surfaced on the site at
`/resources`.

**Fulcrum course notes**, original material written for this programme and
released under CC BY 4.0:

| Deck | Slides | For |
| --- | --- | --- |
| AI for Everyone | 15 | No maths, no code, students, teachers, anyone |
| Computer Vision: Foundations | 17 | First encounter with the field |
| Computer Vision: Advanced | 16 | Detection, segmentation, ViTs, diffusion, video |
| Machine Learning: Foundations | 14 | The ideas that recur everywhere |
| Deep Learning: Foundations | 26 | Neurons to transformers, and what an LLM really does |
| AI for Experts | 15 | Scaling, evaluation, alignment, open problems |

Every deck opens with an "About Fulcrum" slide and closes with one, both
carrying the Discord and LinkedIn links. The Fulcrum mark appears on every
slide.

**Seminar slides**, the AI Basics Day 1 and Day 2 decks, as delivered.

A suggested reading order runs at the top of `/resources`, since two decks
state their own prerequisites (Computer Vision: Advanced assumes the
Foundations deck, AI for Experts assumes backpropagation and transformers).
It lives in `learningPath` in `src/data/site.js` and refers to decks by slug,
resolving titles and file paths from the manifest, so a renamed deck cannot
leave a dead link. Add a new deck to a stage there when you publish one.

### Editing the course notes

Content lives in `scripts/deck-content.mjs` as plain data, no layout code.
Edit it, then:

```bash
npm run decks
```

That re-renders the PDFs into `public/materials/` and rewrites
`src/data/decks.json`, which the Resources page reads. It needs Chrome
installed (set `CHROME_PATH` if it is somewhere unusual). The PDFs are
committed to the repo, so CI never has to run this.

Each deck is printed with a bookmark outline and an accessibility structure
tree, then its document properties are written with pdf-lib. Chrome builds the
outline by reading text back off the printed page, which drops the space where
a heading wraps, so bookmark titles are rewritten from the deck data
afterwards. The two seminar decks are Google Slides exports rather than
pipeline output; `npm run decks:seminars` sets their document properties.

> **On sourcing:** these decks are Fulcrum's own writing. If you extend them,
> keep it that way. Course slides from universities and other organisations are
> copyrighted work belonging to their authors. They cannot be rebranded and
> republished under Fulcrum's name, even with the original logos removed.
> Cite specific papers, models and results by name so readers can reach the
> primary source, and write the explanations yourself.

---

## Running the site

```bash
npm install
npm run dev
```

Opens on **http://localhost:5178/**. The site is served from the domain
root, so there is no path prefix.

```bash
npm run build     # client bundle → SSR bundle → prerender → dist/
npm run preview   # serve the built output locally
npm run decks     # regenerate the course PDFs
```

## Where the content lives

**Almost all copy is in `src/data/site.js`**, organisation details, contact
addresses, the five programs, seminars, partners, founder bio and publications,
FAQs, and the navigation. Edit that file rather than hunting through components.

Per-page SEO text lives alongside it in `src/data/seo.js`.

```
src/
  data/
    site.js           all site copy, start here
    seo.js            per-page titles, descriptions, keywords, JSON-LD
    decks.json        generated by `npm run decks`, do not edit by hand
  lib/
    asset.js          resolves /public paths against the deploy base
    head.js           builds the <head> tag set for a route
  components/
    Mark.jsx          the lever-and-pivot logo, redrawn as SVG
    CursorCrystals.jsx  the drifting shard field behind the hero
    Nav.jsx           sticky header + mobile drawer
    Footer.jsx        Discord invite, link columns, brand line
    PageHero.jsx      shared masthead for interior pages
    SectionNav.jsx    sticky in-page nav, used on the five long pages
    Seo.jsx           keeps <head> correct on client-side navigation
    ui.jsx            Section, Container, Reveal, Button, CapsLink, Stat…
  pages/              Home, About, Programs, Impact, Resources,
                      Mentorship, GetInvolved, Contact, NotFound
  entry-server.jsx    build-time render entry (never shipped to the browser)
scripts/
  prerender.mjs       static HTML + sitemap.xml + robots.txt + 404.html
  build-decks.mjs     renders the course PDFs
  deck-content.mjs    the course notes, as data
  deck-template.mjs   slide layout and styling
```

## Design system

Tokens are defined once in `src/index.css` under `@theme`:

| Token | Value | Used for |
| --- | --- | --- |
| `paper` | `#FFFFFF` | default background |
| `paper-warm` | `#F6F5F2` | alternating section bands |
| `ink` | `#0A0A0A` | body text, dark sections, footer |
| `ink-soft` | `#55534E` | secondary prose |
| `ink-faint` | `#8D8A83` | captions, de-emphasised hero words |
| `accent` | `#B4472F` | eyebrows, stat figures, hover states |

Type is **Space Grotesk** for display and **Inter** for body. The palette is
deliberately monochrome so the lever-and-pivot mark carries the identity; the
accent appears sparingly.

### Animation

There is no animation library. Everything is CSS plus one canvas:

- **Scroll reveals** and the **hero stagger** are CSS, and only hide their
  content once an inline script has added `.js` to `<html>`. That ordering is
  deliberate, the prerendered HTML a crawler reads contains no `opacity: 0`,
  and a reader without JS sees the whole page.
- **`CursorCrystals`** draws ~40 triangular shards to a single canvas. They
  drift on their own and ease away from the cursor in proportion to depth.
  It stops rendering when the hero scrolls out of view and draws one static
  frame under `prefers-reduced-motion`.

Dropping Framer Motion for this cut the JS bundle from 107 KB to 76 KB gzipped.

## SEO

The site is prerendered, so this is real rather than JS-dependent:

- Every route builds to a **static HTML file** with its own `<title>`, meta
  description, keywords, canonical URL, Open Graph and Twitter card tags.
- **JSON-LD structured data**: `NGO` and `WebSite` on every page, plus
  `BreadcrumbList`, `Course` list for programs, `FAQPage` on mentorship,
  `Person` for the founder, `EducationEvent` for seminars, and
  `LearningResource` for each downloadable deck.
- **`sitemap.xml`** and **`robots.txt`** generated at build time from the same
  route table.
- **`404.html`** for genuinely unknown URLs. Real routes are static files, so
  deep links resolve directly, no redirect hack needed.

Everything derives from `org.url` in `src/data/site.js`. Change that one value
and canonicals, Open Graph URLs, the sitemap and JSON-LD all follow.

Seminars only become `EducationEvent` structured data when they have a real
`dateISO`. Two entries are marked `TODO`, add the dates and they join
automatically. Do not invent them.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. Enable it once under **Settings → Pages → Source →
GitHub Actions**.

### Moving to a custom domain

1. Set `org.url` in `src/data/site.js` to the new origin.
2. Set `base` in `vite.config.js` to `'/'`.
3. Add `public/CNAME` containing the bare hostname.
4. Point the domain's DNS at GitHub Pages and enable it in repository settings.
