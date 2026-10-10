import { Brackets } from "@/components/Brackets";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-teal-900 py-32 text-white">
      <Brackets className="pointer-events-none absolute -right-20 top-1/2 w-[36rem] -translate-y-1/2 opacity-40" strokeWidth={7} />
      <Container className="relative">
        <p className="text-8xl font-semibold text-flag-yellow">404</p>
        <h1 className="mt-4 text-4xl font-semibold">We couldn&apos;t find that page.</h1>
        <p className="mt-4 max-w-lg text-lg text-sage-200">It may have moved during our website redesign. Try one of these instead.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="yellow">
            Home
          </ButtonLink>
          <ButtonLink href="/resources" variant="ghost">
            Resource library
          </ButtonLink>
          <ButtonLink href="/newsroom" variant="ghost">
            Newsroom
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
