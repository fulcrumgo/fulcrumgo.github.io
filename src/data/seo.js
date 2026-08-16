/* ==========================================================================
   SEO, per-route metadata and structured data.

   These values are used twice:
     1. at build time, injected as real <head> tags into each prerendered
        HTML file (so crawlers and social scrapers see them without running JS)
     2. at runtime, applied on client-side navigation by <Seo />

   Keep titles under ~60 characters and descriptions between 120 and 158, or
   Google will truncate them in results.
   ========================================================================== */

import { org, contact, founder, programs, seminars } from "./site";

export const defaultOgImage = "images/fulcrum_banner.png";

export const routes = [
  {
    path: "/",
    title: "Fulcrum, Free AI Mentorship for Under-Resourced Regions",
    description:
      "Fulcrum is a volunteer-run non-profit helping people from under-resourced regions learn AI, free mentorship, research supervision, workshops, and open resources. No fees, ever.",
    keywords: [
      "free AI mentorship",
      "AI education Nepal",
      "artificial intelligence non-profit",
      "AI for under-resourced regions",
      "research publication support",
      "AI workshops Nepal",
    ],
  },
  {
    path: "/about",
    title: "About Fulcrum, Who We Are and Why the Name",
    description:
      "A volunteer-run non-profit founded in 2025 in Kathmandu, Nepal. We supply the missing layer, supervision, reviewers, and access for people the AI field usually overlooks.",
    keywords: [
      "about Fulcrum",
      "AI non-profit Nepal",
      "Utsav Poudel founder",
      "equity in technology",
      "first-generation students AI",
    ],
  },
  {
    path: "/programs",
    title: "Programs, Mentorship, Research, Workshops | Fulcrum",
    description:
      "Five free programs: one-on-one mentorship, research and publication support, AI project building, tech workshops, and a guest speaker series. Open to anyone we can reach.",
    keywords: [
      "AI mentorship program",
      "research publication support",
      "AI project building",
      "free tech workshops",
      "AI guest lectures",
      "machine learning workshops",
    ],
  },
  {
    path: "/impact",
    title: "Our Impact, AI Seminars in Rural Nepal | Fulcrum",
    description:
      "200+ students reached across rural Nepal and the Indian subcontinent. Photographs, sessions delivered, and what the schools we taught in said about it.",
    keywords: [
      "AI education rural Nepal",
      "AI seminar Pokhara",
      "free AI training school Nepal",
      "Fulcrum impact",
      "AI workshop Nepal students",
      "digital literacy Nepal",
    ],
  },
  {
    path: "/resources",
    title: "Free AI Course Notes and Slides | Fulcrum",
    description:
      "Free, downloadable course notes on computer vision, machine learning, deep learning and transformers, plus the slides from our seminars. No sign-up required.",
    keywords: [
      "free AI course notes",
      "computer vision slides PDF",
      "machine learning course material free",
      "deep learning notes download",
      "transformers explained PDF",
      "free AI teaching material",
    ],
  },
  {
    path: "/mentorship",
    title: "Apply for Free AI Mentorship | Fulcrum",
    description:
      "Free one-on-one and group AI mentorship with working researchers. No fee, no deadline, no university enrolment required. Apply through our Discord, here is what to send.",
    keywords: [
      "apply AI mentorship",
      "free machine learning mentor",
      "AI mentorship application",
      "find an AI research mentor",
      "mentorship for students Nepal",
    ],
  },
  {
    path: "/get-involved",
    title: "Become a Mentor or Guest Speaker | Fulcrum",
    description:
      "Fulcrum runs on volunteers. Mentor a student, give a workshop, or partner with us, an hour of your week reaches people who would otherwise never get in the room.",
    keywords: [
      "volunteer AI mentor",
      "become a guest speaker",
      "AI education volunteering",
      "non-profit partnership technology",
    ],
  },
  {
    path: "/contact",
    title: "Contact Fulcrum",
    description:
      "Reach Fulcrum on Discord for mentorship applications and community questions, or on LinkedIn for partnerships and institutional enquiries. We answer everything.",
    keywords: [
      "contact Fulcrum",
      "AI mentorship contact",
      "gofulcrum",
      "Fulcrum Discord",
    ],
  },
];

export function seoFor(pathname) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return routes.find((r) => r.path === clean) ?? routes[0];
}

/* --------------------------------------------------------------------------
   JSON-LD structured data.

   Organization + WebSite go on every page (they describe the site itself).
   Page-specific graphs are added on top where they apply.
   -------------------------------------------------------------------------- */

export function organizationLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${siteUrl}/#organization`,
    name: org.name,
    alternateName: "Fulcrum Org",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/images/logo.png`,
    image: `${siteUrl}/${defaultOgImage}`,
    description: org.shortDescription,
    slogan: org.tagline,
    foundingDate: org.founded,
    nonprofitStatus: "NonprofitANBI",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      url: founder.links.website,
      sameAs: Object.values(founder.links),
    },
    sameAs: [contact.linkedin, contact.instagram, contact.discord],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "AI Education",
      "Academic Research Publication",
      "Youth Empowerment",
      "Equity in Technology",
    ],
    areaServed: { "@type": "Place", name: "Worldwide" },
  };
}

export function websiteLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: org.name,
    description: org.shortDescription,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  };
}

/** The five programs, as a schema.org ItemList of Courses. */
export function programsLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fulcrum programs",
    itemListElement: programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: p.title,
        description: p.summary,
        url: `${siteUrl}/programs/#${p.slug}`,
        provider: { "@id": `${siteUrl}/#organization` },
        isAccessibleForFree: true,
        inLanguage: "en",
        courseMode: "online",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          category: "Free",
        },
      },
    })),
  };
}

/** Seminars already delivered, as past EducationEvents. */
export function seminarsLd(siteUrl) {
  // Only entries with a real date become structured data, an invented
  // startDate would be worse than no markup at all.
  return seminars
    .filter((s) => Boolean(s.dateISO))
    .map((s) => ({
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      name: s.title,
      description: s.summary,
      startDate: s.dateISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      isAccessibleForFree: true,
      location: {
        "@type": "Place",
        name: s.host,
        address: { "@type": "PostalAddress", addressLocality: s.place },
      },
      organizer: { "@id": `${siteUrl}/#organization` },
      about: s.topics,

    }));
}

/** Downloadable decks, as freely-licensed LearningResources. */
export function materialsLd(siteUrl, decks) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fulcrum learning materials",
    itemListElement: decks.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LearningResource",
        name: d.title,
        description: d.subtitle,
        url: `${siteUrl}/${d.file}`,
        encodingFormat: "application/pdf",
        learningResourceType: "presentation",
        educationalLevel: "beginner to intermediate",
        isAccessibleForFree: true,
        inLanguage: "en",
        license: "https://creativecommons.org/licenses/by/4.0/",
        provider: { "@id": `${siteUrl}/#organization` },
        creator: { "@type": "Person", name: founder.name },
      },
    })),
  };
}

export function personLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: `${founder.role}, ${org.name}`,
    description: founder.bio,
    url: founder.links.website,
    sameAs: Object.values(founder.links),
    // The founder's own affiliations. Fulcrum itself has no institutional
    // affiliations, so nothing here may be presented as the organisation's.
    affiliation: founder.affiliations.map((a) => ({
      "@type": "Organization",
      name: a,
    })),
    knowsAbout: founder.interests,
    worksFor: { "@id": `${siteUrl}/#organization` },
  };
}

export function faqLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(siteUrl, pathname, label) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
  ];
  if (pathname !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: label,
      item: `${siteUrl}${pathname}/`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}
