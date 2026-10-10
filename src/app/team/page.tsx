import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { team, type Person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our team",
  description: "Meet the people behind FSD Ethiopia — our staff, regional coordinators and non-executive board of directors.",
};

function PersonCard({ person, i }: { person: Person; i: number }) {
  return (
    <Reveal as="li" delay={(i % 4) * 70} className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sage-100">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover object-top transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-teal-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <h3 className="mt-4 font-semibold text-teal-900">{person.name}</h3>
      <p className="text-sm text-muted">{person.role}</p>
      {person.region && <p className="mt-1 text-sm font-medium text-green-600">{person.region}</p>}
    </Reveal>
  );
}

export default function TeamPage() {
  const [ceo, ...staff] = team.staff;
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Ethiopian expertise, working nationwide."
        intro={`A team of ${team.staff.length} specialists in Addis Ababa, ${team.coordinators.length} regional coordinators across the country, and a non-executive board that brings decades of experience in finance and development.`}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <Reveal className="grid gap-10 overflow-hidden rounded-[2.5rem] bg-paper md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="relative aspect-[4/5] md:h-full md:aspect-auto">
              <Image src={ceo.image} alt={ceo.name} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
            </div>
            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">{ceo.role}</p>
              <h2 className="mt-3 text-4xl font-semibold text-teal-900">{ceo.name}</h2>
              <blockquote className="mt-6 border-l-4 border-flag-yellow pl-5 text-xl leading-relaxed text-teal-800">
                “The theme, ‘From Inception to Enduring Impact,’ reflects where FSD Ethiopia stands today.”
              </blockquote>
              <p className="mt-3 text-sm text-muted">— Stakeholder Summit, July 2026</p>
            </div>
          </Reveal>

          <SectionHeading eyebrow="Staff" title="The team" className="mt-24" />
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {staff.map((p, i) => (
              <PersonCard key={p.name} person={p} i={i} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sage-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Across Ethiopia"
            title="Regional coordinators"
            intro="Our coordinators connect national programmes with regional governments, institutions and communities."
          />
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {team.coordinators.map((p, i) => (
              <PersonCard key={p.name} person={p} i={i} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Governance" title="Non-executive board of directors" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {team.board.map((b, i) => (
              <Reveal as="li" key={b.name} delay={i * 100} className="rounded-3xl border border-sage-200 p-8 text-center">
                <span className="relative mx-auto block size-32 overflow-hidden rounded-full bg-sage-100 ring-4 ring-sage-100">
                  <Image src={b.image} alt={b.name} fill sizes="128px" className="object-cover" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-teal-900">{b.name}</h3>
                <p className="mt-2 text-muted">{b.role}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
