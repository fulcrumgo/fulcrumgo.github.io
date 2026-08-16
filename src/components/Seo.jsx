import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildHead } from "../lib/head";

/**
 * Keeps <head> correct during client-side navigation.
 *
 * The first paint of any page already carries the right tags. They are baked
 * into the prerendered HTML at build time. This only has to fix things up when
 * the router swaps pages without a reload.
 *
 * Tags it manages are marked data-seo so they can be cleanly replaced without
 * disturbing the static tags (fonts, favicon, viewport) around them.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, metas, links, jsonLd } = buildHead(pathname);

    document.title = title;

    document.querySelectorAll("[data-seo]").forEach((el) => el.remove());

    const head = document.head;
    const add = (tag, attrs, text) => {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      el.setAttribute("data-seo", "");
      if (text) el.textContent = text;
      head.appendChild(el);
    };

    metas.forEach((m) => add("meta", m));
    links.forEach((l) => add("link", l));
    jsonLd.forEach((graph) =>
      add("script", { type: "application/ld+json" }, JSON.stringify(graph))
    );
  }, [pathname]);

  return null;
}
