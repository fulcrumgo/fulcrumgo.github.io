import { useState } from "react";
import { Download, Eye, FileText, Link2, Check } from "lucide-react";
import PageHero from "../components/PageHero";
import {
  Container,
  Section,
  Reveal,
  Eyebrow,
  SectionHead,
  Button,
} from "../components/ui";
import { asset } from "../lib/asset";
import { seminarDecks, seminars, contact, org, learningPath } from "../data/site";
import courseDecks from "../data/decks.json";

/**
 * Copies the deck's permanent public URL to the clipboard.
 *
 * The link is built from `org.url` rather than `window.location`, so what gets
 * shared is always the canonical address, correct even if someone is viewing
 * a local build or a preview deployment.
 */
function ShareLink({ file }) {
  const [copied, setCopied] = useState(false);
  const url = `${org.url.replace(/\/+$/, "")}/${file}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard access can be blocked; fall back to a prompt so the
      // reader can still get the URL by hand.
      window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={url}
      aria-label={`Copy shareable link${copied ? ", copied" : ""}`}
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-accent"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      ) : (
        <Link2 className="h-3.5 w-3.5" strokeWidth={2} />
      )}
      {copied ? "Copied" : "Share"}
    </button>
  );
}

function DeckCard({ title, subtitle, file, meta, context }) {
  const href = asset(file);

  /*
   * Two deliberately different actions on the same file:
   *   View     opens the PDF in a new tab, read in the browser's own viewer
   *   Download saves it, via the `download` attribute
   * The title carries the view action too, since that is what most people
   * click first.
   */
  return (
    <article className="flex h-full flex-col bg-paper p-8 md:p-9">
      <FileText className="h-5 w-5 text-ink-faint" strokeWidth={1.5} />

      <h3 className="mt-6 font-display text-xl font-semibold leading-snug">
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors hover:text-accent"
        >
          {title}
        </a>
      </h3>

      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
        {subtitle}
      </p>
      {context && <p className="mt-4 text-sm text-ink-faint">{context}</p>}

      <div className="mt-7 border-t border-line pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="link-caps"
            >
              <Eye className="h-3.5 w-3.5" strokeWidth={2} />
              View
            </a>
            <a
              href={href}
              download
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-accent"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Download
            </a>
            <ShareLink file={file} />
          </div>
          {meta && <span className="text-xs text-ink-faint">{meta}</span>}
        </div>

        {/* The bare URL, so it can be read off a projected slide or copied
            by hand without JavaScript. */}
        <p className="mt-4 break-all font-mono text-[0.7rem] leading-relaxed text-ink-faint">
          {`${org.url.replace(/\/+$/, "")}/${file}`}
        </p>
      </div>
    </article>
  );
}


/**
 * Suggested reading order.
 *
 * Titles and file paths are resolved from the deck manifest rather than
 * repeated here, so a renamed deck cannot leave this list pointing at
 * nothing. Anything unresolved is dropped instead of rendering a dead link.
 */
function ReadingOrder() {
  const bySlug = Object.fromEntries(
    [...courseDecks, ...seminarDecks].map((d) => [d.slug, d])
  );
  let step = 0;

  return (
    <Section tone="warm">
      <Container>
        <Reveal>
          <SectionHead
            eyebrow="Where to start"
            title="If you are not sure which to read first."
            lede={learningPath.intro}
          />
        </Reveal>

        <div className="mt-16 space-y-12">
          {learningPath.stages.map((stage, si) => (
            <Reveal key={stage.label} delay={Math.min(si * 0.06, 0.2)}>
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl font-semibold">
                    {stage.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                    {stage.note}
                  </p>
                </div>

                <ol className="md:col-span-8">
                  {stage.items.map((item) => {
                    const deck = bySlug[item.slug];
                    if (!deck) return null;
                    step += 1;
                    return (
                      <li
                        key={item.slug}
                        className="flex gap-5 border-t border-line py-5"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-ink font-display text-xs font-semibold">
                          {step}
                        </span>
                        <div>
                          <a
                            href={asset(deck.file)}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="font-display font-semibold transition-colors hover:text-accent"
                          >
                            {deck.title}
                          </a>
                          {deck.slides && (
                            <span className="ml-2 text-xs text-ink-faint">
                              {deck.slides} slides
                            </span>
                          )}
                          <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">
                            {item.why}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 border-t border-line pt-8 text-[0.95rem] leading-relaxed text-ink-soft">
            {learningPath.upcoming}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Everything we teach, free to download."
        lede="Course notes written for Fulcrum, plus the slides from sessions we have delivered. Open any of them in your browser or save the PDF. No sign-up, no email wall, take them and use them."
      />

      <ReadingOrder />

      {/* Course notes */}
      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Course notes"
              title="Written for this programme."
              lede="Original material, released under CC BY 4.0. Reuse it, teach from it, adapt it for your own students, just keep the attribution."
            />
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {courseDecks.map((d, i) => (
              <Reveal key={d.slug} delay={Math.min(i * 0.06, 0.24)}>
                <DeckCard
                  title={d.title}
                  subtitle={d.subtitle}
                  file={d.file}
                  meta={`${d.slides} slides · ${d.sizeKb} KB`}
                />
              </Reveal>
            ))}

            {/* An odd number of decks would otherwise leave a bare cell in the
                two-column grid, so the last slot asks for the next topic. */}
            {courseDecks.length % 2 === 1 && (
              <Reveal>
                <div className="flex h-full flex-col justify-center bg-paper p-8 md:p-9">
                  <h3 className="font-display text-xl font-semibold leading-snug">
                    Something missing?
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                    We write these in response to what people actually ask for.
                    Tell us the topic you wish existed and we will put it on the
                    list.
                  </p>
                  <div className="mt-7">
                    <a
                      href={contact.discord}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-caps"
                    >
                      Suggest a topic
                    </a>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {/* Seminar decks */}
      <Section tone="warm">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Seminar slides"
              title="From sessions we have run."
              lede="The decks we actually taught from, published as-is."
            />
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {seminarDecks.map((d, i) => (
              <Reveal key={d.slug} delay={i * 0.08}>
                <DeckCard {...d} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Where these were taught */}
      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="In the field"
              title="Where this material has been taught."
            />
          </Reveal>

          <div className="mt-14 divide-y divide-line border-y border-line">
            {seminars.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 0.06, 0.2)}>
                <div className="grid gap-6 py-9 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{s.host}</p>
                    <p className="mt-1 text-sm text-ink-faint">
                      {[s.place, s.date].filter(Boolean).join(" · ")}
                    </p>
                    {s.attendance && (
                      <p className="mt-3 text-sm font-medium text-accent">
                        {s.attendance}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-8">
                    <p className="leading-relaxed text-ink-soft">{s.summary}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.topics.map((t) => (
                        <li
                          key={t}
                          className="border border-line px-3 py-1.5 text-xs text-ink-soft"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink" compact>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-6">Want a session?</Eyebrow>
              <h2 className="text-[1.9rem] font-semibold text-paper md:text-[2.5rem]">
                We will come and teach this.
              </h2>
              <p className="mt-6 text-paper/60">
                Schools, colleges, and organisations, if you can get the room
                and the students, we will run the session. Free, as always.
              </p>
              <div className="mt-10 flex justify-center">
                <Button
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="ghostInvert"
                >
                  Request a session
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
