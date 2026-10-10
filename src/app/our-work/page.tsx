import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { cohort, images, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our work",
  description: "FSD Ethiopia's programmes in financial inclusion, access to capital and climate finance.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Systemic change across three connected pillars."
        intro="We design interventions that help Ethiopia's financial sector function transparently, effectively and inclusively — from household finance to capital markets and climate investment."
        image={images["capital-wide"]}
      />

      <section className="py-20 sm:py-28">
        <Container className="space-y-24">
          {pillars.map((p, i) => (
            <Reveal key={p.slug} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Link href={`/our-work/${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[2.5rem]">
                <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-6 top-6 rounded-full bg-white/95 px-4 py-1.5 text-sm font-medium text-teal-900">0{i + 1}</span>
              </Link>
              <div>
                <span className="block h-1.5 w-14 rounded-full" style={{ background: p.accent }} />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">{p.kicker}</p>
                <h2 className="mt-3 text-4xl font-semibold text-teal-900 sm:text-5xl">{p.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-6 space-y-2">
                  {p.approach.map((a) => (
                    <li key={a.title} className="flex items-center gap-3 text-ink">
                      <ArrowRight className="size-4 text-green-600" /> {a.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href={`/our-work/${p.slug}`}>Explore {p.title}</ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Cross-cutting programme"
            title="Board Ready Women"
            intro={`Gender is woven through every pillar. With IFC, our Board Ready programme has trained ${cohort.length} women professionals for board leadership.`}
          />
          <div className="lg:justify-self-end">
            <ButtonLink href="/board-ready">Discover the programme</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
