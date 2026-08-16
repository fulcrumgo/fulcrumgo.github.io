import { Fragment } from "react";
import { ArrowDown } from "lucide-react";
import Mark from "../components/Mark";
import CursorCrystals from "../components/CursorCrystals";
import { asset } from "../lib/asset";
import {
  Container,
  Section,
  Reveal,
  Eyebrow,
  SectionHead,
  Button,
  CapsLink,
  Stat,
} from "../components/ui";
import {
  org,
  contact,
  stats,
  pillars,
  programs,
  founder,
  seminars,
  impactPhotos,
  involvement,
} from "../data/site";

/* -------------------------------------------------------------------------
   Hero, no masthead band above it, the mark sits behind the headline.
   ------------------------------------------------------------------------- */
function Hero() {
  const words = [
    { text: "We", plain: true },
    { text: "help", plain: false },
    { text: "individuals", plain: true },
    { text: "from", plain: true },
    { text: "under-resourced", plain: false },
    { text: "regions", plain: true },
    { text: "to", plain: true },
    { text: "learn", plain: false },
    { text: "AI.", plain: false },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper">
      {/* drifting shards, reacting to the cursor */}
      <CursorCrystals />

      {/* the mark, sitting behind the sentence */}
      <Mark
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(78vw,640px)] w-[min(78vw,640px)] -translate-x-1/2 -translate-y-[54%] text-ink/[0.035]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/*
            The words are separate elements so they can animate in sequence,
            but a real space text node has to sit between them: a CSS margin
            creates a visual gap without creating a word break, which would
            leave this heading reading as one run-on word to search engines
            and screen readers.
          */}
          <h1 className="font-display text-[2.6rem] font-medium leading-[1.1] tracking-tight sm:text-[3.6rem] md:text-[4.5rem] lg:text-[5rem]">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span
                  style={{ "--i": i }}
                  className={`hero-word inline-block ${
                    w.plain ? "text-ink-faint" : "font-semibold text-ink"
                  }`}
                >
                  {w.text}
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          <div
            className="hero-late mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ "--delay": "950ms" }}
          >
            <Button
              href={contact.discord}
              target="_blank"
              rel="noreferrer noopener"
            >
              Apply for Mentorship
            </Button>
            <Button to="/about" variant="outline">
              Who we are
            </Button>
          </div>
        </div>
      </Container>

      <a
        href="#what-we-do"
        aria-label="Scroll to what we do"
        className="hero-late absolute bottom-9 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-ink"
        style={{ "--delay": "1400ms" }}
      >
        <span className="scroll-cue block">
          <ArrowDown className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </a>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The argument, stated plainly.
   ------------------------------------------------------------------------- */
function Thesis() {
  return (
    <Section id="what-we-do" tone="warm">
      <Container>
        <Reveal>
          <Eyebrow className="mb-8">What we do</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="max-w-4xl font-display text-[1.7rem] font-medium leading-[1.32] tracking-tight md:text-[2.4rem]">
            Artificial intelligence will define the next century.{" "}
            <span className="text-ink-faint">
              Shouldn’t everyone get a fair chance to understand and learn it?
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 border-l-2 border-accent pl-6 font-display text-xl italic text-ink md:text-2xl">
            “That’s exactly what we help with.”
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="prose-fulcrum mt-10 max-w-2xl">
            <span className="text-ink-soft">
              Fulcrum pivots potential from under-resourced regions toward
              learning about (and shaping), the future of artificial
              intelligence. We do it through global mentorship, free learning
              resources, research supervision, and by bridging the gap between
              rural communities and the frontier of the field.
            </span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Impact band, Aspire's oversized-figures treatment.
   ------------------------------------------------------------------------- */
function Impact() {
  if (!stats.show) return null;
  return (
    <Section tone="paper" compact>
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
            <h2 className="font-display text-[1.6rem] font-semibold md:text-[2rem]">
              Where we stand
            </h2>
            <p className="text-sm uppercase tracking-[0.18em] text-ink-faint">
              {stats.period}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <Stat value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Why the name means something.
   ------------------------------------------------------------------------- */
function Pillars() {
  return (
    <Section tone="ink">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="The idea"
            title="A small force, correctly placed, moves a very large weight."
            lede="That is what a fulcrum does. It is also, exactly, what good mentorship does."
            invert
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="bg-ink">
              <div className="h-full p-9 md:p-10">
                <p className="font-display text-5xl font-semibold text-white/12">
                  0{i + 1}
                </p>
                <h3 className="mt-7 text-xl font-semibold text-paper">
                  {p.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/60">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Programs, alternating image / text rows, Aspire's program block pattern.
   ------------------------------------------------------------------------- */
function HowWeHelp() {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="How we help"
            title="Five programs. All of them free."
            lede="Nothing behind a paywall, nothing behind a login. If you can reach us, you can use them."
          />
        </Reveal>

        <div className="mt-20 space-y-20 md:space-y-24">
          {programs.map((p, i) => (
            <div
              key={p.slug}
              className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <Reveal
                className={i % 2 === 1 ? "md:order-2" : ""}
                delay={0.05}
              >
                <div className="aspect-4/3 overflow-hidden bg-paper-warm">
                  {/* multiply blend drops the illustrations' opaque white
                      backgrounds so they sit flush on the tinted tile */}
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain p-10 mix-blend-multiply transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
              </Reveal>

              <Reveal className={i % 2 === 1 ? "md:order-1" : ""}>
                <Eyebrow muted className="mb-4">
                  Program {String(i + 1).padStart(2, "0")}
                </Eyebrow>
                <h3 className="text-[1.75rem] font-semibold md:text-[2.1rem]">
                  {p.title}
                </h3>
                <p className="prose-fulcrum mt-5">
                  <span className="text-ink-soft">{p.summary}</span>
                </p>
                <div className="mt-8">
                  <CapsLink to={`/programs#${p.slug}`} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Field work, the sessions we have actually run.
   ------------------------------------------------------------------------- */
function InTheField() {
  return (
    // Warm, so it separates the two white sections either side of it.
    <Section tone="warm">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="In the field"
            title="Classrooms in Pokhara, not just calls on Zoom."
            lede="We take the same material into rural schools and colleges that we teach online, and we leave the slides behind, free, for anyone to reuse."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mt-14">
            <div className="aspect-3/2 overflow-hidden bg-paper-warm">
              <img
                src={impactPhotos[0].src}
                alt={impactPhotos[0].alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-faint">
              Grades 9 and 10, Shree Pardi Secondary School, Pokhara, May 2026.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {seminars.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 0.06, 0.2)}>
              <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{s.host}</p>
                  <p className="mt-1 text-sm text-ink-faint">
                    {[s.place, s.date].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="leading-relaxed text-ink-soft">{s.summary}</p>
                  {s.attendance && (
                    <p className="mt-3 text-sm font-medium text-accent">
                      {s.attendance}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12">
            <div className="flex flex-wrap gap-8">
              <CapsLink to="/impact">See our impact</CapsLink>
              <CapsLink to="/resources">Download the materials</CapsLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Founder note.
   ------------------------------------------------------------------------- */
function FounderNote() {
  return (
    <Section tone="paper">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            {/* source art is landscape (645×422), so the tile matches it
                rather than floating a small image in a portrait box */}
            <div className="aspect-4/3 overflow-hidden bg-paper-warm">
              <img
                src={asset("/images/OurVision/ourVision.png")}
                alt=""
                loading="lazy"
                className="h-full w-full object-contain p-6 mix-blend-multiply"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-7">
            <Eyebrow className="mb-6">From the founder</Eyebrow>
            <blockquote className="font-display text-[1.5rem] font-medium leading-[1.35] tracking-tight md:text-[2rem]">
              “{founder.quote}”
            </blockquote>
            <div className="mt-9 border-t border-line pt-7">
              <p className="font-semibold">{founder.name}</p>
              <p className="mt-1 text-sm text-ink-soft">
                {founder.role}, {org.name}
              </p>
              <p className="mt-1 text-sm text-ink-faint">
                {founder.affiliations.join(" · ")}
              </p>
              <div className="mt-7">
                <CapsLink to="/about">Read our story</CapsLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Get Involved, Aspire's three-column closing block.
   ------------------------------------------------------------------------- */
function GetInvolvedBlock() {
  return (
    <Section tone="warm">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Get involved"
            title="It runs on people who show up."
            lede="Fulcrum is volunteer-run. Every mentor, speaker, and partner is someone who decided an hour of their week was worth it."
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {involvement.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="bg-paper-warm">
              <div className="flex h-full flex-col p-9 md:p-10">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
                <div className="mt-8">
                  <CapsLink href={item.href}>{item.cta}</CapsLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Closing CTA.
   ------------------------------------------------------------------------- */
function ClosingCta() {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <div className="border border-line px-8 py-16 text-center md:px-16 md:py-20">
            <Eyebrow className="mb-6">Apply now</Eyebrow>
            <h2 className="mx-auto max-w-2xl text-[2rem] font-semibold md:text-[2.75rem]">
              Your journey into AI begins right here.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-soft">
              Tell us where you are from, what you want to work on, and what is
              standing in your way, on{" "}
              <a
                href={contact.discord}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink underline decoration-accent decoration-2 underline-offset-4"
              >
                our Discord
              </a>
              . It is the fastest way to reach a mentor.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button to="/mentorship">How to apply</Button>
              <Button
                href={contact.discord}
                target="_blank"
                rel="noreferrer noopener"
                variant="outline"
              >
                Join the Discord
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <Impact />
      <Pillars />
      <HowWeHelp />
      <InTheField />
      <FounderNote />
      <GetInvolvedBlock />
      <ClosingCta />
    </>
  );
}
