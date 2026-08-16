import Mark from "./Mark";
import { Container, Eyebrow } from "./ui";

/** Shared masthead for interior pages. */
export default function PageHero({ eyebrow, title, lede }) {
  return (
    <section className="relative overflow-hidden bg-paper-warm pb-20 pt-[168px] md:pb-28 md:pt-[210px]">
      <Mark
        className="pointer-events-none absolute -right-16 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-ink/[0.03] md:right-4"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="hero-late max-w-3xl" style={{ "--delay": "60ms" }}>
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <h1 className="text-[2.4rem] font-semibold leading-[1.06] md:text-[3.5rem]">
            {title}
          </h1>
          {lede && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {lede}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
