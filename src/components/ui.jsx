import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* Page gutter. One container width used everywhere for vertical rhythm. */
export function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

/* Vertical section rhythm + optional background tone. */
export function Section({
  id,
  tone = "paper",
  className = "",
  children,
  compact = false,
}) {
  const tones = {
    paper: "bg-paper",
    warm: "bg-paper-warm",
    deep: "bg-paper-deep",
    ink: "bg-ink text-paper",
  };
  return (
    <section
      id={id}
      className={`${tones[tone]} ${
        compact ? "py-16 md:py-20" : "py-20 md:py-28 lg:py-32"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Scroll-triggered fade-up.
 *
 * Renders visible and only becomes an animation once the `.js` class is on
 * <html> (see index.css), which keeps the prerendered HTML fully readable to
 * crawlers. `delay` is in seconds, matching the previous API.
 */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, just show it.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);

    // Safety net: a renderer that never scrolls (some crawlers, some
    // screenshot tools) would otherwise leave content at opacity 0 forever.
    const failsafe = setTimeout(() => {
      el.classList.add("is-visible");
      io.disconnect();
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { "--reveal-delay": `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, muted = false, className = "" }) {
  return (
    <p className={`eyebrow ${muted ? "eyebrow-muted" : ""} ${className}`}>
      {children}
    </p>
  );
}

/* Section heading with the hairline rule Aspire uses above its section titles. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h2
        className={`text-[2rem] font-semibold md:text-[2.75rem] ${
          invert ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            invert ? "text-paper/70" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* Solid CTA. Renders as <Link>, <a>, or <button> depending on props. */
export function Button({
  to,
  href,
  children,
  variant = "solid",
  className = "",
  ...rest
}) {
  const variants = {
    solid:
      "bg-ink text-paper hover:bg-accent border border-transparent",
    outline:
      "bg-transparent text-ink border border-ink hover:bg-ink hover:text-paper",
    ghostInvert:
      "bg-paper text-ink border border-transparent hover:bg-accent hover:text-paper",
  };
  const base = `inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={base} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a className={base} href={href} {...rest}>
      {children}
    </a>
  );
}

/* Aspire's tracked "LEARN MORE" underline link. */
export function CapsLink({ to, href, children = "Learn more", ...rest }) {
  const inner = (
    <>
      {children}
      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
    </>
  );
  if (to) {
    return (
      <Link to={to} className="link-caps" {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a className="link-caps" href={href} {...rest}>
      {inner}
    </a>
  );
}

/* Oversized statistic, Aspire's impact band treatment. */
export function Stat({ value, label, invert = false }) {
  return (
    <div>
      <p
        className={`font-display text-[3rem] font-semibold leading-none tracking-tight md:text-[3.75rem] ${
          invert ? "text-paper" : "text-accent"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-4 max-w-[15rem] text-[0.95rem] leading-snug ${
          invert ? "text-paper/60" : "text-ink-soft"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

/* Thin decorative rule used to open sections. */
export function Rule({ className = "" }) {
  return <div className={`h-px w-full bg-line ${className}`} />;
}
