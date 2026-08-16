import { Check } from "lucide-react";
import PageHero from "../components/PageHero";
import {
  Container,
  Section,
  Reveal,
  Eyebrow,
  Button,
} from "../components/ui";
import { programs, contact } from "../data/site";

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Five programs. Every one of them free."
        lede="Mentorship, research supervision, project building, workshops, and a guest speaker series, open to anyone we can reach."
      />

      {/* Jump nav */}
      <div className="sticky top-[70px] z-40 border-y border-line bg-paper/90 backdrop-blur-md">
        <Container>
          <nav className="flex gap-7 overflow-x-auto py-4">
            {programs.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="whitespace-nowrap text-sm text-ink-soft transition-colors hover:text-accent"
              >
                {p.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {programs.map((p, i) => (
        <Section
          key={p.slug}
          id={p.slug}
          tone={i % 2 === 0 ? "paper" : "warm"}
          className="scroll-mt-[124px]"
        >
          <Container>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <Reveal
                className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <div className="aspect-square overflow-hidden bg-paper-deep/60">
                  {/* see Home.jsx, multiply hides the white plate */}
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain p-12 mix-blend-multiply"
                  />
                </div>
              </Reveal>

              <Reveal
                delay={0.08}
                className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}
              >
                <Eyebrow muted className="mb-4">
                  Program {String(i + 1).padStart(2, "0")}
                </Eyebrow>
                <h2 className="text-[2rem] font-semibold md:text-[2.5rem]">
                  {p.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink">
                  {p.summary}
                </p>
                <div className="prose-fulcrum mt-5">
                  <p>{p.body}</p>
                </div>

                <ul className="mt-9 space-y-3.5 border-t border-line pt-8">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3.5">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-accent"
                        strokeWidth={2.5}
                      />
                      <span className="text-[0.97rem] leading-relaxed text-ink-soft">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="ink" compact>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-[2rem] font-semibold text-paper md:text-[2.5rem]">
                Ready to start?
              </h2>
              <p className="mt-5 text-paper/60">
                Mentorship applications are open. Workshops and speaker sessions
                are announced on our Discord and LinkedIn.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button to="/mentorship" variant="ghostInvert">
                  Apply for mentorship
                </Button>
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  Join the Discord
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
