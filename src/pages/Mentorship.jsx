import { MessageCircle } from "lucide-react";
import PageHero from "../components/PageHero";
import {
  Container,
  Section,
  Reveal,
  Eyebrow,
  SectionHead,
  Button,
} from "../components/ui";
import { applicationRequirements, contact, faqs } from "../data/site";
import { asset } from "../lib/asset";

const steps = [
  {
    title: "Put your application together",
    body: "Four things, listed below. Plain text in the email body is completely fine. We are not scoring you on formatting.",
  },
  {
    title: "Send it to us on Discord",
    body: "Join the server and post it in the applications channel, or message a mentor directly. There is no form to fill in.",
  },
  {
    title: "We read it and reply",
    body: "We reply either way, including when the answer is no. If we cannot help you ourselves, we will try to point you somewhere that can.",
  },
  {
    title: "Get matched",
    body: "If it is a fit, we pair you with a mentor working in your area of interest and agree a cadence that suits both of you.",
  },
];


export default function Mentorship() {
  return (
    <>
      <PageHero
        eyebrow="Mentorship"
        title="Your journey into AI begins right here."
        lede="One-on-one and group mentorship with working researchers and practitioners. Free, and open to anyone from an under-resourced region."
      />

      {/* How it actually runs */}
      <Section tone="paper">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-6">
              <Eyebrow className="mb-5">How it works</Eyebrow>
              <h2 className="text-[1.9rem] font-semibold md:text-[2.4rem]">
                Mentorship here happens wherever you are.
              </h2>
              <div className="prose-fulcrum mt-6">
                <p>
                  Everything runs remotely, video calls, shared documents,
                  asynchronous review when timezones do not line up. You do not
                  need to travel, relocate, or be in a particular country.
                </p>
                <p>
                  You need a connection good enough for a call and a few hours a
                  month. If your connection is unreliable, tell us; we will work
                  around it rather than drop you.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-6">
              <div className="aspect-4/3 overflow-hidden bg-paper-warm">
                <img
                  src={asset("/images/Mentorship/mentoring.avif")}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain p-8 mix-blend-multiply"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What to send */}
      <Section tone="warm">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What you’ll need"
              title="Four things, and none of them need to be perfect."
              lede="We are looking for a clear picture of who you are and what would actually help. Not a polished pitch."
            />
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {applicationRequirements.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.07} className="bg-paper">
                <div className="h-full p-9 md:p-10">
                  <p className="font-display text-4xl font-semibold text-line">
                    0{i + 1}
                  </p>
                  <h3 className="mt-6 text-xl font-semibold">{r.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHead eyebrow="The process" title="How applying works." />
          </Reveal>

          <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="flex gap-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink font-display text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Apply CTA */}
      <Section tone="ink">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow className="mb-6">Apply now</Eyebrow>
              <h2 className="text-[2rem] font-semibold text-paper md:text-[2.75rem]">
                Apply on our Discord
              </h2>
              <p className="mt-6 text-paper/60">
                Applications are read on a rolling basis. There is no deadline
                and no application fee.
              </p>
              <div className="mt-10 flex justify-center">
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-3 bg-paper px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-accent hover:text-paper"
                >
                  <MessageCircle className="h-4 w-4" />
                  Join and apply
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <Container>
          <Reveal>
            <SectionHead eyebrow="Questions" title="Before you ask." />
          </Reveal>

          <div className="mt-14 divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i * 0.05, 0.25)}>
                <details className="group py-7">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {f.q}
                    </h3>
                    <span className="mt-1 shrink-0 text-2xl font-light leading-none text-ink-faint transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 text-center">
              <p className="text-ink-soft">Still not sure? Just ask.</p>
              <div className="mt-6 flex justify-center">
                <Button
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                >
                  Message us on LinkedIn
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
