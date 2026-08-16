import { Container, Button } from "../components/ui";
import { asset } from "../lib/asset";
import { contact } from "../data/site";

/**
 * 404.
 *
 * Landing here is already mildly annoying, so the page does not compound it
 * with a scolding. It says what probably happened, points at the home page,
 * and gets out of the way.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-paper-warm pt-[70px]">
      <Container className="relative">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <p className="eyebrow mb-6">404</p>

            <h1 className="text-[2.2rem] font-semibold leading-[1.1] md:text-[3rem]">
              You have landed in the wrong place.
            </h1>

            <div className="prose-fulcrum mt-7 max-w-md">
              <p>
                This link may have been updated, or the page moved somewhere
                tidier. Nothing has been thrown away.
              </p>
              <p>
                Whatever you were after is almost certainly still here. Start
                from the home page and you will find it.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-5">
              {/* A small arrow that nudges toward the button, so the eye lands
                  on the way out rather than on the error. */}
              <span
                aria-hidden="true"
                className="point-right text-2xl leading-none text-accent"
              >
                &rarr;
              </span>
              <Button to="/">Take me home</Button>
            </div>

            <p className="mt-8 text-sm text-ink-faint">
              Still stuck? Ask on our{" "}
              <a
                href={contact.discord}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink underline decoration-accent underline-offset-4"
              >
                Discord
              </a>{" "}
              and someone will point you at it.
            </p>
          </div>

          <div className="md:col-span-6">
            <figure>
              <div className="aspect-4/3 overflow-hidden bg-paper-deep/50">
                <img
                  src={asset("/images/Mentorship/mentoring.avif")}
                  alt=""
                  className="h-full w-full object-contain p-8 mix-blend-multiply"
                />
              </div>
              <figcaption className="mt-3 text-sm text-ink-faint">
                Someone here knows where it went.
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
