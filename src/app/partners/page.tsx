import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { fsdNetwork, images } from "@/lib/content";

export const metadata: Metadata = {
  title: "Funders & partners",
  description: "FSD Ethiopia is funded by the Gates Foundation and UK International Development, incubated by FSD Africa, and part of the FSD Network.",
};

const funders = [
  {
    name: "Gates Foundation",
    role: "Funder",
    href: "https://www.gatesfoundation.org/",
    logo: images["funder-gates"],
    w: 300,
    h: 33,
    body: "A core funding partner of FSD Ethiopia, providing continued partnership, guidance and support.",
  },
  {
    name: "UK International Development",
    role: "Funder",
    href: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office",
    logo: images["funder-uk"],
    w: 793,
    h: 235,
    body: "A core funding partner of FSD Ethiopia through the UK Foreign, Commonwealth & Development Office (FCDO).",
  },
  {
    name: "FSD Africa",
    role: "Incubated by",
    href: "https://www.fsdafrica.org/",
    logo: images["funder-fsdafrica"],
    w: 303,
    h: 205,
    body: "FSD Ethiopia was incubated by FSD Africa, the Nairobi-based financial sector development agency.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Funders & partners"
        title="Built on partnership."
        intro="Our progress is built through collective effort, trust and sustained collaboration with funders, government, regulators and the wider FSD family."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {funders.map((f, i) => (
              <Reveal key={f.name} delay={i * 100}>
                <a href={f.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-3xl border border-sage-200 p-8 transition hover:border-teal-700 hover:shadow-xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">{f.role}</span>
                  <span className="mt-8 flex h-20 items-center">
                    <Image src={f.logo} alt={f.name} width={f.w} height={f.h} className="max-h-16 w-auto object-contain" />
                  </span>
                  <p className="mt-8 flex-1 leading-relaxed text-muted">{f.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1 font-medium text-teal-700">
                    Visit website <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-teal-900 py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              light
              eyebrow="FSD Network"
              title="Part of a family of Financial Sector Deepening programmes."
              intro="The FSD Network brings together specialist financial sector development organisations across sub-Saharan Africa, sharing knowledge and expertise across markets."
            />
            <a href="https://fsdnetwork.org/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-medium text-flag-yellow hover:underline">
              fsdnetwork.org <ArrowUpRight className="size-4" />
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {fsdNetwork.map((n, i) => (
              <Reveal as="li" key={n.name} delay={i * 60}>
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 transition hover:bg-white hover:text-teal-900">
                  <span className="font-medium">{n.name}</span>
                  <ArrowUpRight className="size-4 opacity-60 group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
