import { ExternalLink, Quote } from "lucide-react";
import PageHero from "../components/PageHero";
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
  stats,
  seminars,
  impactPhotos,
  schoolPost,
  collaborators,
  speakers,
  seminarDecks,
  contact,
} from "../data/site";

/* -------------------------------------------------------------------------
   Photographs from the sessions. The first is given full width; the rest
   run two-up.
   ------------------------------------------------------------------------- */
function Gallery() {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="In the room"
            title="What this actually looks like."
            lede="Photographs from our own sessions, no stock imagery anywhere on this page."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {impactPhotos.map((p, i) => (
            <Reveal
              key={p.src}
              delay={Math.min(i * 0.06, 0.2)}
              className={p.span === "wide" ? "md:col-span-2" : ""}
            >
              <figure className="h-full">
                {/* The source photos are 4:3. A 16:9 frame would crop heads
                    off the top, so the full-width one uses a gentler 3:2. */}
                <div
                  className={`overflow-hidden bg-paper-warm ${
                    p.span === "wide" ? "aspect-3/2" : "aspect-4/3"
                  }`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-faint">
                  {p.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   The school's own public post about the session.
   ------------------------------------------------------------------------- */
function SchoolPost() {
  return (
    <Section tone="warm">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-7">
            <Eyebrow className="mb-6">What the school said</Eyebrow>
            <h2 className="text-[1.9rem] font-semibold md:text-[2.4rem]">
              They wrote about it themselves.
            </h2>

            <blockquote className="mt-8 border-l-2 border-accent pl-6">
              <Quote className="mb-4 h-5 w-5 text-accent" strokeWidth={1.5} />
              <p className="font-display text-lg leading-relaxed text-ink md:text-xl">
                {schoolPost.translation}
              </p>
            </blockquote>

            <div className="mt-7 border-t border-line pt-6">
              <p className="font-semibold">{schoolPost.source}</p>
              <p className="mt-1 text-sm text-ink-faint">
                {schoolPost.platform} · {schoolPost.date}
              </p>
              <p className="mt-3 max-w-md text-sm text-ink-faint">
                {schoolPost.note}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-5">
            <figure>
              <a
                href={schoolPost.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block overflow-hidden border border-line bg-paper transition-colors hover:border-accent"
              >
                <img
                  src={schoolPost.image}
                  alt={`Facebook post by ${schoolPost.source} about the free AI training session, dated ${schoolPost.date}`}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </a>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-faint">
                <span>The original post, as published by the school.</span>
                <a
                  href={schoolPost.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
                >
                  View on Facebook
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Sessions delivered, in full.
   ------------------------------------------------------------------------- */
function Sessions() {
  return (
    <Section tone="paper">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Sessions delivered"
            title="Every session we have run."
            lede="Schools, companies, and open online sessions. All free, all taught by people doing the work."
          />
        </Reveal>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {seminars.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 0.06, 0.2)}>
              <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <p className="font-display text-4xl font-semibold text-line">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">{s.host}</p>
                  <p className="mt-1 text-sm text-ink-faint">
                    {[s.place, s.date].filter(Boolean).join(" · ")}
                  </p>
                  {s.attendance && (
                    <p className="mt-4 border-l-2 border-accent pl-3 text-sm font-medium text-accent">
                      {s.attendance}
                    </p>
                  )}
                </div>
                <div className="md:col-span-8">
                  <p className="leading-relaxed text-ink-soft">{s.summary}</p>

                  <p className="mt-6 text-xs uppercase tracking-[0.16em] text-ink-faint">
                    What we covered
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.topics.map((t) => (
                      <li
                        key={t}
                        className="border border-line px-3 py-1.5 text-xs text-ink-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Institutions people joined from, where we recorded them. */}
                  {s.institutions && (
                    <>
                      <p className="mt-7 text-xs uppercase tracking-[0.16em] text-ink-faint">
                        Who joined
                      </p>
                      <p className="mt-3 leading-relaxed text-ink-soft">
                        {s.institutions.join(" · ")}
                      </p>
                    </>
                  )}

                  {s.link && (
                    <div className="mt-7">
                      <a
                        href={s.link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-caps"
                      >
                        {s.link.label}
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12">
            <CapsLink to="/resources">Download the slides we taught from</CapsLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Who we ran them with.
   ------------------------------------------------------------------------- */
function Collaborators() {
  return (
    <Section tone="warm">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="With"
            title="None of this happened alone."
            lede="Someone has to open a room and fill it. These are the organisations that did."
          />
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
          {collaborators.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08} className="bg-paper-warm">
              <div className="flex h-full flex-col p-9 md:p-10">
                <h3 className="font-display text-xl font-semibold leading-snug">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm text-ink-faint">{c.what}</p>
                <p className="mt-1 text-sm text-ink-faint">{c.place}</p>
                <p className="mt-5 flex-1 leading-relaxed text-ink-soft">
                  {c.contribution}
                </p>
                {c.site && (
                  <div className="mt-7">
                    <a
                      href={c.site}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-caps"
                    >
                      Visit site
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16">
            <p className="text-sm uppercase tracking-[0.18em] text-ink-faint">
              Guest speakers
            </p>
            <div className="mt-6 grid gap-x-16 gap-y-6 sm:grid-cols-2">
              {speakers.map((s) => (
                <div key={s.name} className="border-t border-line pt-5">
                  <p className="font-semibold">{s.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{s.topics}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function Impact() {
  return (
    <>
      <PageHero
        eyebrow="Our impact"
        title="200+ students, and a lot of borrowed classrooms."
        lede="We do not have an office. We have a laptop, a projector when the room has one, and material we give away. Here is what that has added up to so far."
      />

      {/* Numbers */}
      <Section tone="paper" compact>
        <Container>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <Stat value={s.value} label={s.label} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Gallery />
      <SchoolPost />
      <Sessions />
      <Collaborators />

      {/* CTA */}
      <Section tone="ink">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-6">Host a session</Eyebrow>
              <h2 className="text-[2rem] font-semibold text-paper md:text-[2.75rem]">
                Get us a room and we will come.
              </h2>
              <p className="mt-6 text-paper/60">
                Schools, colleges, and organisations anywhere we can reach. You
                supply the students; we supply everything else, free. The slides
                stay with you afterwards.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="ghostInvert"
                >
                  Request a session
                </Button>
                <Button
                  to="/resources"
                  className="border border-white/25 text-paper hover:border-paper hover:bg-paper hover:text-ink"
                >
                  See the material
                </Button>
              </div>
              <p className="mt-8 text-sm text-paper/40">
                {seminarDecks.length} seminar decks and seven course notes, all
                free to download.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
