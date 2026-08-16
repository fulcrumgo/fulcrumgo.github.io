import { Linkedin, Instagram, MessageCircle, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import { Container, Section, Reveal, Eyebrow } from "../components/ui";
import { org, contact } from "../data/site";

/**
 * Contact routes.
 *
 * There is intentionally no email address here, see the note on `contact`
 * in data/site.js. Discord carries applications and everyday conversation;
 * LinkedIn carries partnerships and anything formal.
 */
const channels = [
  {
    icon: MessageCircle,
    label: "Discord",
    handle: "Join the server",
    href: contact.discord,
    purpose:
      "Mentorship applications, questions about the programs, and the community itself. This is the fastest way to reach a mentor.",
    primary: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "/company/gofulcrum",
    href: contact.linkedin,
    purpose:
      "Partnerships, institutional enquiries, mentoring and speaking offers, and press.",
    primary: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@gofulcrum",
    href: contact.instagram,
    purpose: "Sessions, events, and what we have been up to.",
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come and talk to us."
        lede="We answer everything, including the ones we have to say no to. If we cannot help you ourselves, we will try to point you somewhere that can."
      />

      <Section tone="paper">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-7">
              <Eyebrow className="mb-8">Where to reach us</Eyebrow>

              <div className="divide-y divide-line border-y border-line">
                {channels.map(({ icon: Icon, label, handle, href, purpose }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-start gap-5 py-8"
                  >
                    <Icon className="mt-1.5 h-5 w-5 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
                    <div>
                      <p className="font-display text-2xl font-semibold transition-colors group-hover:text-accent md:text-3xl">
                        {label}
                      </p>
                      <p className="mt-1 text-sm text-ink-faint">{handle}</p>
                      <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                        {purpose}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <p className="mt-10 max-w-md text-sm leading-relaxed text-ink-faint">
                We do not run a mailing list and we do not have an email form.
                Everything happens in the open, on Discord.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-5">
              <div className="border border-line bg-paper-warm p-9">
                <p className="wordmark text-sm">{org.name}</p>
                <p className="mt-5 leading-relaxed text-ink-soft">
                  {org.shortDescription}
                </p>

                <dl className="mt-8 space-y-4 border-t border-line pt-8 text-sm">
                  <div>
                    <dt className="text-ink-faint">Type</dt>
                    <dd className="mt-0.5">{org.type}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Founded</dt>
                    <dd className="mt-0.5">{org.founded}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Based in</dt>
                    <dd className="mt-0.5 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {org.location}
                    </dd>
                  </div>
                </dl>
              </div>

              <figure className="mt-8 border border-line p-9 text-center">
                <img
                  src={contact.discordQr}
                  alt="QR code linking to the Fulcrum Discord server"
                  className="mx-auto h-44 w-44"
                  loading="lazy"
                />
                <figcaption className="mt-5 text-sm text-ink-soft">
                  Scan to join our Discord.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
