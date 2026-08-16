import { Link } from "react-router-dom";
import { Linkedin, Instagram, MessageCircle } from "lucide-react";
import Mark from "./Mark";
import { Container } from "./ui";
import { org, contact, nav, programs } from "../data/site";

const socials = [
  { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: contact.instagram, label: "Instagram" },
  { icon: MessageCircle, href: contact.discord, label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="py-20 md:py-24">
        {/* Discord invitation, kept from the current site, wording per the
            latest content revision. */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Stay Connected</p>
            <h2 className="text-[1.75rem] font-semibold md:text-[2.25rem]">
              Join our Discord community, drop a hello!
            </h2>
            <p className="mt-4 text-paper/60">
              Chances are, you’ll find someone with similar interests.
            </p>
            <a
              href={contact.discord}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2 bg-paper px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-accent hover:text-paper"
            >
              Join the Discord
            </a>
          </div>

          <figure className="shrink-0">
            <img
              src={contact.discordQr}
              alt="QR code linking to the Fulcrum Discord server"
              className="h-36 w-36 bg-paper p-2 md:h-40 md:w-40"
              loading="lazy"
            />
            <figcaption className="mt-3 text-center text-xs text-paper/50">
              Scan to join our Discord.
            </figcaption>
          </figure>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 text-paper">
              <Mark className="h-6 w-6" />
              <span className="wordmark text-[0.95rem] leading-none">
                Fulcrum
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/55">
              {org.shortDescription}
            </p>
            <p className="mt-5 text-sm text-paper/40">
              {org.type} · Founded {org.founded}
              <br />
              {org.location}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Programs</p>
            <ul className="space-y-3">
              {programs.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/programs#${p.slug}`}
                    className="text-sm text-paper/60 transition-colors hover:text-paper"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={contact.discord}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 transition-colors hover:text-paper"
                >
                  Discord
                </a>
                <span className="block text-xs text-paper/35">
                  Mentorship applications and community
                </span>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/60 transition-colors hover:text-paper"
                >
                  LinkedIn
                </a>
                <span className="block text-xs text-paper/35">
                  Partnerships and formal enquiries
                </span>
              </li>
            </ul>

            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-paper/70 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-paper"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Brand line, echoing the current site's closing statement */}
        <div className="flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          <p className="font-display text-[2.5rem] font-semibold leading-[0.95] tracking-tight text-paper/10 md:text-[4rem]">
            A place to learn.
            <br />
            A chance to grow.
          </p>
          <p className="text-xs text-paper/40">
            © {new Date().getFullYear()} {org.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
