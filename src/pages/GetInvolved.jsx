import { Check } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionNav from "../components/SectionNav";
import {
  Container,
  Section,
  Reveal,
  Eyebrow,
  SectionHead,
  Button,
  CapsLink,
} from "../components/ui";
import { involvement, mentorRequirements, contact } from "../data/site";

const whoWeNeed = [
  {
    title: "Researchers",
    body: "PhD students, postdocs, and faculty who can supervise a research question and survive a peer review cycle with someone.",
  },
  {
    title: "Practitioners",
    body: "Engineers and scientists building real systems. Code review and “here is how it actually works in production” are worth an enormous amount.",
  },
  {
    title: "Educators",
    body: "Anyone who can teach a clear two-hour session on a fundamental topic and answer questions patiently.",
  },
  {
    title: "Organisations",
    body: "Universities, labs, and non-profits working on equity in technology, who want to reach students we can reach together.",
  },
];

export default function GetInvolved() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Fulcrum runs entirely on people who show up."
        lede="Every mentor, speaker, and partner here is someone who decided an hour of their week was worth it. There is no paid staff."
      />

      <SectionNav
        items={[
          { id: "ways-in", label: "Ways in" },
          { id: "become-a-mentor", label: "Become a mentor" },
          { id: "who", label: "Who we’re looking for" },
          { id: "community", label: "Community" },
        ]}
      />


      {/* Three ways in */}
      <Section id="ways-in" className="scroll-mt-[124px]" tone="paper">
        <Container>
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {involvement.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-paper">
                <div className="flex h-full flex-col p-9 md:p-10">
                  <Eyebrow muted className="mb-5">
                    0{i + 1}
                  </Eyebrow>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-soft">
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

      {/* Become a mentor, the detail */}
      <Section id="become-a-mentor" className="scroll-mt-[124px]" tone="warm">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <Eyebrow className="mb-5">Become a mentor</Eyebrow>
              <h2 className="text-[1.9rem] font-semibold md:text-[2.4rem]">
                Share your AI expertise with the next generation of innovators.
              </h2>
              <div className="prose-fulcrum mt-6">
                <p>
                  Whether you are a researcher, a practitioner, or an educator,
                  your knowledge matters here. Most of our mentees have never
                  met a working AI researcher. Being reachable is, on its own,
                  a large part of the value.
                </p>
                <p>
                  We ask for honesty about your availability rather than
                  enthusiasm about it. An hour a fortnight that actually happens
                  beats a weekly commitment that quietly lapses.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-6">
              <div className="border border-line bg-paper p-9 md:p-10">
                <p className="text-sm uppercase tracking-[0.18em] text-ink-faint">
                  Tell us the following
                </p>
                <ul className="mt-7 space-y-4">
                  {mentorRequirements.map((r) => (
                    <li key={r} className="flex gap-3.5">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-accent"
                        strokeWidth={2.5}
                      />
                      <span className="leading-relaxed text-ink-soft">{r}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9 border-t border-line pt-8">
                  <Button
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full"
                  >
                    Message us on LinkedIn
                  </Button>
                  <p className="mt-5 text-sm text-ink-faint">
                    Prefer something less formal? Say hello on{" "}
                    <a
                      href={contact.discord}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-ink underline decoration-accent underline-offset-4"
                    >
                      Discord
                    </a>
                    . We will get back to you no matter what, even if you
                    decide not to join.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Who we're looking for */}
      <Section id="who" className="scroll-mt-[124px]" tone="paper">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="Who we’re looking for"
              title="Four kinds of people make this work."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {whoWeNeed.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.07}>
                <div className="border-t border-line pt-7">
                  <h3 className="text-xl font-semibold">{w.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Community */}
      <Section id="community" className="scroll-mt-[124px]" tone="ink" compact>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-6">Community</Eyebrow>
              <h2 className="text-[1.9rem] font-semibold text-paper md:text-[2.5rem]">
                Not ready to commit? Come and lurk.
              </h2>
              <p className="mt-6 text-paper/60">
                Join our Discord community, drop a hello! Chances are, you’ll
                find someone with similar interests.
              </p>
              <div className="mt-10 flex justify-center">
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 bg-paper px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-accent hover:text-paper"
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
