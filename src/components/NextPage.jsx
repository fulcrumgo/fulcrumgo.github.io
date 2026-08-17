import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "./ui";
import { pageFlow } from "../data/site";

/**
 * The "keep going" band above the footer.
 *
 * Rendered once in App rather than added to each page, so every route gets
 * the same treatment and a new page only needs an entry in `pageFlow`.
 * Routes absent from that map render nothing, which is how the 404 page
 * avoids getting one.
 */
export default function NextPage() {
  const { pathname } = useLocation();
  const next = pageFlow[pathname.replace(/\/+$/, "") || "/"];
  if (!next) return null;

  return (
    <section
      className={`border-t border-line ${
        next.tone === "paper" ? "bg-paper" : "bg-paper-warm"
      }`}
    >
      <Container>
        <Link to={next.to} className="group block py-16 md:py-20">
          <Eyebrow className="mb-6">Keep going</Eyebrow>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-display text-[1.6rem] font-medium leading-[1.25] tracking-tight text-ink-soft md:text-[2.1rem]">
                {next.prompt}
              </p>
              <p className="mt-3 font-display text-[2rem] font-semibold leading-[1.1] tracking-tight transition-colors duration-300 group-hover:text-accent md:text-[2.75rem]">
                {next.label}
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                {next.hint}
              </p>
            </div>

            {/* Sits on the baseline of the block and slides on hover, so the
                whole band reads as one target rather than a stray icon. */}
            <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-ink text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
