import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./Mark";
import { Container } from "./ui";
import { nav, contact } from "../data/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[70px] items-center justify-between">
          <Link to="/" aria-label="Fulcrum, home" className="text-ink">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-[0.9rem] transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                    isActive
                      ? "text-ink after:w-full"
                      : "text-ink-soft after:w-0"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={contact.discord}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden bg-ink px-6 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-paper transition-colors duration-300 hover:bg-accent lg:inline-block"
            >
              Apply Now
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 p-2 text-ink lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-menu"
        data-open={open}
        className="drawer border-t border-line bg-paper lg:hidden"
        style={open ? undefined : { borderTopColor: "transparent" }}
      >
        <div>
          <Container className="py-6">
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `border-b border-line-soft py-4 font-display text-xl ${
                      isActive ? "text-accent" : "text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <a
              href={contact.discord}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 block bg-ink px-6 py-4 text-center text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-paper"
            >
              Apply Now
            </a>
          </Container>
        </div>
      </div>
    </header>
  );
}
