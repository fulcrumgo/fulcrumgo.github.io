import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { buildHead } from "./lib/head";

/**
 * Build-time render of a single route.
 *
 * Used only by scripts/prerender.mjs, never shipped to the browser. Returns
 * the page markup plus the head tags for that route, which the script splices
 * into the built index.html.
 */
export function render(pathname) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <App />
      </StaticRouter>
    </StrictMode>
  );

  return { html, head: buildHead(pathname) };
}

export { routes } from "./data/seo";
