import { useEffect, useState } from "react";
import { Container } from "./ui";

/**
 * Sticky in-page navigation, sitting directly under the main header.
 *
 * Sections must carry a matching `id` and `scroll-mt-[124px]`, which is the
 * combined height of the header and this bar, so a jumped-to heading is not
 * hidden underneath them.
 *
 * The active item is tracked with an IntersectionObserver rather than by
 * listening to scroll, so it costs nothing while the page is idle. The
 * bottom margin is pulled in so a section only counts as current once it
 * reaches the upper part of the viewport, which is where a reader is
 * actually looking.
 */
export default function SectionNav({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        /* Pick the lowest section currently in the band, not the highest.
           Two sections can intersect at once, and the one the reader has
           just scrolled into is the lower of the two. Choosing the topmost
           also left the last section on a page unhighlighted, because an
           earlier one was still clipping the band. */
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => b.boundingClientRect.top - a.boundingClientRect.top
          );
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-124px 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="sticky top-[70px] z-40 border-y border-line bg-paper/90 backdrop-blur-md">
      <Container>
        <nav
          aria-label="On this page"
          className="-mx-1 flex gap-7 overflow-x-auto px-1 py-4"
        >
          {items.map((item) => {
            const current = item.id === active;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={`relative whitespace-nowrap text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                  current
                    ? "text-ink after:w-full"
                    : "text-ink-soft after:w-0 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
