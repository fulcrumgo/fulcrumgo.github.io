/**
 * Resolve a path in /public against the deploy base.
 *
 * Vite rewrites asset URLs it can see at build time (imports, and paths inside
 * index.html) but NOT string literals in JSX. On a project site served from
 * /fulcrum/, a bare "/images/logo.png" would resolve to the domain root and
 * 404, so every public asset reference goes through here.
 */
const BASE = import.meta.env.BASE_URL || "/";

export function asset(path) {
  return `${BASE}${String(path).replace(/^\/+/, "")}`;
}

/** Absolute URL for a route path, used for canonical tags and JSON-LD. */
export function absoluteUrl(siteUrl, routePath = "/") {
  const root = siteUrl.replace(/\/+$/, "");
  const suffix = routePath === "/" ? "/" : `${routePath.replace(/\/+$/, "")}/`;
  return `${root}${suffix}`;
}
