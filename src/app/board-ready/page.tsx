import type { Metadata } from "next";
import { CohortGrid } from "@/components/CohortGrid";
import { Check } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { cohort, images } from "@/lib/content";

export const metadata: Metadata = {
  title: "Board Ready Women",
  description: "FSD Ethiopia and IFC's corporate governance and ESG training for women professionals preparing for board leadership.",
};

const objectives = [
  "Equip women professionals with best practice in corporate governance.",
  "Deepen understanding of board roles and responsibilities.",
  "Build leadership and decision-making skills for board-level engagement.",
  "Promote gender diversity and inclusion in the financial sector.",
];

export default function BoardReadyPage() {
  return (
    <>
      <PageHero
        eyebrow="Board Ready Women · with IFC"
        title="Preparing women to lead from the boardroom."
        intro="Three rounds of comprehensive corporate governance training, delivered with IFC, for women professionals ready to take up board seats."
        image={images["inclusion-wide"]}
      >
        <dl className="mt-10 flex flex-wrap gap-10">
          {[
            [String(cohort.length), "Cohort members"],
            ["3", "Training rounds"],
            ["ESG", "Embedded throughout"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="text-sm text-sage-300">{l}</dt>
              <dd className="text-4xl font-semibold text-flag-yellow">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About the programme" title="Leading with integrity, transparency and accountability." />
            <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                The programme equipped participants with the skills, knowledge and tools to lead with integrity, transparency and
                accountability in board-level roles — strengthening leadership while embedding Environmental, Social and Governance
                (ESG) principles.
              </p>
              <p>
                With growing demand for gender diversity in leadership, the initiative helps women take up governance positions where
                their expertise and perspectives are vital for sustainable development, innovation and stronger ESG frameworks.
              </p>
            </Reveal>
          </div>
          <Reveal className="rounded-[2rem] bg-teal-900 p-8 text-white sm:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-flag-yellow">Programme objectives</h3>
            <ul className="mt-6 space-y-5">
              {objectives.map((o) => (
                <li key={o} className="flex gap-4 text-lg">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-600">
                    <Check className="size-4" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The cohort"
            title="Meet the leaders."
            intro="Senior professionals from banking, public finance, consulting and beyond. Select a profile to read more."
          />
          <div className="mt-14">
            <CohortGrid members={cohort} />
          </div>
        </Container>
      </section>
    </>
  );
}
