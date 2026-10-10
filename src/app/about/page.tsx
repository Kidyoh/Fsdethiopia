import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Play } from "@/components/Icons";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { images, outcomes, pillars, site, team, tools } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description: "FSD Ethiopia supports accessible, inclusive and sustainable financial markets for economic growth and human development.",
};

const theory = [
  { step: "Diagnose", body: "Identify the underlying causes of financial system failures and market constraints." },
  { step: "Facilitate", body: "Equip policymakers, regulators and market actors with technical assistance, grants and research insights." },
  { step: "Transform", body: "Enable large-scale, sustainable change in how financial markets function and whom they serve." },
  { step: "Impact", body: "Economic gains for a wide cross-section of Ethiopian individuals and businesses." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A thriving financial system that delivers real value for Ethiopia."
        intro="Established in 2022, FSD Ethiopia supports the development of accessible, inclusive and sustainable financial markets for economic growth and human development."
        image={images.about}
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Our role" title="We fix the system, not just the symptoms." />
          <Reveal className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Our role is to identify the underlying causes of financial system failures, facilitate market actors to address these
              constraints, and help build a functional and effective financial sector that generates economic gains for a wide
              cross-section of Ethiopian individuals and businesses.
            </p>
            <p>
              We provide <strong className="text-teal-900">technical assistance, grants and research insights</strong> to
              policymakers, regulators and market actors to drive large-scale change in financial markets and support sustainable
              economic development.
            </p>
            <p>
              Our vision is to contribute to a thriving financial system that delivers real value to the broader economy and to the
              people of Ethiopia.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-teal-900 py-20 text-white sm:py-28">
        <Container>
          <SectionHeading light eyebrow="Theory of change" title="From diagnosis to lasting impact." />
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {theory.map((t, i) => (
              <Reveal as="li" key={t.step} delay={i * 120} className="relative rounded-3xl bg-teal-800/70 p-7 ring-1 ring-white/10">
                <span className="text-6xl font-semibold text-white/10">0{i + 1}</span>
                <h3 className="mt-2 text-2xl font-semibold text-flag-yellow">{t.step}</h3>
                <p className="mt-3 leading-relaxed text-sage-200">{t.body}</p>
                {i < theory.length - 1 && <ArrowRight className="absolute -right-5 top-1/2 hidden size-6 text-sage-400 md:block" />}
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-2xl border border-white/15 px-5 py-4">
                <p className="text-sm text-sage-300">Outcome</p>
                <p className="font-medium">{o.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our tools"
            title="How we work."
            intro="We work with public, private and development partners to address critical system constraints and help Ethiopia's financial sector function transparently, effectively and inclusively."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {tools.map((t, i) => (
              <Reveal key={t.title} delay={i * 100}>
                <Link href={t.href} className="group block overflow-hidden rounded-3xl ring-1 ring-sage-200">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={t.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-semibold text-teal-900">{t.title}</h3>
                    <p className="mt-2 text-muted">{t.body}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sage-50 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Focus areas" title="Three pillars of work." />
            <ul className="mt-8 divide-y divide-sage-200 border-y border-sage-200">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link href={`/our-work/${p.slug}`} className="group flex items-center justify-between gap-4 py-5">
                    <span>
                      <span className="block text-xl font-semibold text-teal-900">{p.title}</span>
                      <span className="text-sm text-muted">{p.kicker}</span>
                    </span>
                    <ArrowRight className="size-5 text-green-600 transition group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a href={site.video} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video overflow-hidden rounded-[2rem]">
            <Image src={images["inclusion-2"]} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-teal-900/40" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full bg-flag-yellow text-teal-900 shadow-2xl transition group-hover:scale-110">
                <Play className="size-8" />
              </span>
            </span>
            <span className="sr-only">Watch the FSD Ethiopia introduction video on YouTube</span>
          </a>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="Guided by an experienced board."
            action={<ButtonLink href="/team" variant="secondary">Meet the full team</ButtonLink>}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {team.board.map((b) => (
              <div key={b.name} className="flex items-center gap-5 rounded-3xl bg-paper p-6">
                <span className="relative size-20 shrink-0 overflow-hidden rounded-full bg-sage-200">
                  <Image src={b.image} alt="" fill sizes="80px" className="object-cover" />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-teal-900">{b.name}</span>
                  <span className="text-sm text-muted">{b.role}</span>
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
