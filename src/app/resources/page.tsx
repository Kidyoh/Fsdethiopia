import type { Metadata } from "next";
import { ArrowUpRight, FileText } from "@/components/Icons";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { newsletters, resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resource library",
  description: "Research, strategies and national policy documents on Ethiopia's financial sector — searchable and filterable.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource library"
        title="Evidence for a stronger financial sector."
        intro="Research reports, national strategies and policy documents on financial inclusion, capital markets and climate finance in Ethiopia."
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <ResourceLibrary resources={resources} />
        </Container>
      </section>

      <section id="newsletters" className="bg-sage-50 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Newsletters" title="Spotlight newsletter archive" intro="Catch up on past editions of the FSD Ethiopia newsletter." />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {newsletters.map((n) => (
              <li key={n.url}>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-sage-200 transition hover:ring-teal-700"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-teal-700 text-white">
                    <FileText className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-teal-900">{n.title}</span>
                    <span className="text-sm text-muted">{n.period}</span>
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </span>
                  <ArrowUpRight className="size-5 text-green-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
