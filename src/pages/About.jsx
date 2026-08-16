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
import { org, founder, pillars, contact, visionCredit } from "../data/site";

const principles = [
  {
    title: "Free, permanently",
    body: "No tuition, no subscription, no premium tier. Everything Fulcrum produces is released openly and stays that way.",
  },
  {
    title: "Access over credentials",
    body: "We do not filter on where you studied or what your institution is ranked. We filter on whether we can actually help you.",
  },
  {
    title: "Depth over volume",
    body: "We would rather supervise a small number of people properly than broadcast at a large number badly.",
  },
  {
    title: "Volunteer-run",
    body: "Nobody here draws a salary from this. That keeps the incentives honest and the programs free.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Fulcrum"
        title="A fixed point that lets a small force move a large weight."
        lede={`${org.type} · Founded ${org.founded} · ${org.location}`}
      />

      <SectionNav
        items={[
          { id: "vision", label: "Our vision" },
          { id: "name", label: "Why the name" },
          { id: "how-we-work", label: "How we work" },
          { id: "founder", label: "Founder" },
        ]}
      />


      {/* Vision */}
      <Section id="vision" className="scroll-mt-[124px]" tone="paper">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <Eyebrow className="mb-5">Our vision</Eyebrow>
              <h2 className="text-[1.9rem] font-semibold md:text-[2.4rem]">
                Computer intelligence is the only invention mankind will ever
                need to build.
              </h2>
              {/* The thought is Good's, not ours. Credited where it is used. */}
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-faint">
                {visionCredit.long}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7">
              <div className="prose-fulcrum md:pt-14">
                <p>
                  Shouldn’t everyone get a fair chance to understand, use, and
                  create it? Including those who are underprivileged, and those
                  from underserved regions?
                </p>
                <p>
                  The gap is not talent. Ability is distributed evenly across
                  the world; opportunity is not. What separates a student in
                  Kathmandu or rural Bihar from one at a well-funded lab is
                  rarely intelligence. It is access to supervision, to
                  reviewers, to equipment, and to the unwritten rules that
                  nobody writes down.
                </p>
                <p>
                  Fulcrum exists to supply that missing layer. We are a
                  volunteer-based non-profit: a group of researchers and
                  practitioners from around the world helping people from
                  less-resourced areas learn AI, build with it, and publish in
                  it.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why "Fulcrum" */}
      <Section id="name" className="scroll-mt-[124px]" tone="ink" compact>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="mb-6">Why the name</Eyebrow>
              <p className="font-display text-[1.5rem] font-medium leading-[1.35] text-paper md:text-[2rem]">
                A lever is useless on its own. Give it a fixed point to turn
                against and it will move almost anything.
              </p>
              <p className="mx-auto mt-7 max-w-xl text-paper/55">
                Our mentees supply the force. We try to be the fixed point.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="bg-ink">
                <div className="h-full p-9">
                  <h3 className="text-lg font-semibold text-paper">
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

      {/* How we work */}
      <Section id="how-we-work" className="scroll-mt-[124px]" tone="paper">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="How we work"
              title="Four commitments we do not negotiate on."
            />
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="border-t border-line pt-7">
                  <p className="font-display text-sm text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founder */}
      <Section id="founder" className="scroll-mt-[124px]" tone="warm">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-4">
              <Eyebrow className="mb-5">Founder</Eyebrow>
              <h2 className="text-[1.9rem] font-semibold">{founder.name}</h2>
              <p className="mt-2 text-ink-soft">{founder.tagline}</p>

              <ul className="mt-7 space-y-2 text-sm text-ink-soft">
                {founder.affiliations.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {founder.interests.map((t) => (
                  <span
                    key={t}
                    className="border border-line bg-paper px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col items-start gap-4">
                {founder.profiles.map((p) => (
                  <CapsLink
                    key={p.label}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {p.label}
                  </CapsLink>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-8">
              <div className="prose-fulcrum">
                <p>{founder.bio}</p>
              </div>

              <div className="mt-12">
                <p className="text-sm uppercase tracking-[0.18em] text-ink-faint">
                  Selected publications
                </p>
                <ul className="mt-6 divide-y divide-line border-t border-line">
                  {founder.publications.map((pub) => (
                    <li key={pub.title} className="py-5">
                      <p className="font-medium leading-snug">{pub.title}</p>
                      <p className="mt-1.5 text-sm text-ink-faint">
                        {pub.venue} · {pub.year}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <CapsLink
                    href={founder.links.scholar}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Full publication list
                  </CapsLink>
                </div>
              </div>

              {/* Patent applications, kept distinct from published papers. */}
              {founder.patents?.length > 0 && (
                <div className="mt-14">
                  <p className="text-sm uppercase tracking-[0.18em] text-ink-faint">
                    Intellectual property
                  </p>
                  <ul className="mt-6 divide-y divide-line border-t border-line">
                    {founder.patents.map((p) => (
                      <li key={p.number} className="py-5">
                        <p className="font-medium leading-snug">{p.title}</p>
                        <p className="mt-1.5 text-sm text-ink-soft">
                          {p.authors}
                        </p>
                        <p className="mt-1 text-sm text-ink-faint">
                          {p.number} · {p.year}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

    </>
  );
}
