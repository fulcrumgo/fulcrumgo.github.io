import { Container, Button } from "../components/ui";
import Mark from "../components/Mark";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-paper-warm pt-[70px]">
      <Mark
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-ink/[0.035]"
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <p className="eyebrow mb-6">404</p>
        <h1 className="mx-auto max-w-xl text-[2.2rem] font-semibold md:text-[3rem]">
          This page has lost its footing.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ink-soft">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-10 flex justify-center">
          <Button to="/">Back to home</Button>
        </div>
      </Container>
    </section>
  );
}
