/**
 * Builds the complete <head> tag set for a route.
 *
 * One implementation, two consumers:
 *   - scripts/prerender.mjs serialises the result into static HTML at build time
 *   - <Seo /> applies it to the live DOM on client-side navigation
 *
 * Keeping both on the same source means a prerendered page and a
 * client-navigated page can never disagree about their metadata.
 */

import { org, faqs, seminarDecks } from "../data/site";
import courseDecks from "../data/decks.json";
import {
  seoFor,
  defaultOgImage,
  organizationLd,
  websiteLd,
  programsLd,
  seminarsLd,
  personLd,
  faqLd,
  materialsLd,
  breadcrumbLd,
} from "../data/seo";

const SITE = org.url.replace(/\/+$/, "");

/** Absolute URL for a route, always with a trailing slash except the root. */
export function canonicalFor(pathname) {
  const clean = pathname.replace(/\/+$/, "");
  return clean === "" ? `${SITE}/` : `${SITE}${clean}/`;
}

export function buildHead(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const seo = seoFor(clean);
  const canonical = canonicalFor(clean);
  const ogImage = `${SITE}/${defaultOgImage}`;

  const metas = [
    { name: "description", content: seo.description },
    { name: "keywords", content: seo.keywords.join(", ") },
    { name: "author", content: org.name },
    { name: "robots", content: "index, follow, max-image-preview:large" },

    { property: "og:type", content: clean === "/" ? "website" : "article" },
    { property: "og:site_name", content: org.name },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: `${org.name}, ${org.tagline}` },
    { property: "og:locale", content: "en_US" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: ogImage },
  ];

  const links = [{ rel: "canonical", href: canonical }];

  // Organization and WebSite describe the site itself, so they belong on
  // every page. Everything after is page-specific.
  const jsonLd = [organizationLd(SITE), websiteLd(SITE)];

  const label = { "/": "Home", "/about": "About", "/programs": "Programs", "/impact": "Impact",
    "/resources": "Resources", "/mentorship": "Mentorship",
    "/get-involved": "Get Involved", "/contact": "Contact" }[clean];

  jsonLd.push(breadcrumbLd(SITE, clean, label));

  if (clean === "/") {
    jsonLd.push(programsLd(SITE), ...seminarsLd(SITE));
  }
  if (clean === "/about") {
    jsonLd.push(personLd(SITE), ...seminarsLd(SITE));
  }
  if (clean === "/programs") {
    jsonLd.push(programsLd(SITE));
  }
  if (clean === "/mentorship") {
    jsonLd.push(faqLd(faqs));
  }
  if (clean === "/impact") {
    jsonLd.push(...seminarsLd(SITE));
  }
  if (clean === "/resources") {
    jsonLd.push(materialsLd(SITE, [...courseDecks, ...seminarDecks]), ...seminarsLd(SITE));
  }

  return { title: seo.title, metas, links, jsonLd, canonical };
}
