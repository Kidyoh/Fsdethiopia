import type { Metadata } from "next";
import { AccountOwnershipChart, ClimateGapChart, CountUp, EsxTimeline } from "@/components/charts";
import { ArrowUpRight, OutcomeIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { headlineStats, outcomes, sources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impact & data",
  description: "Interactive data on Ethiopia's financial sector: account ownership, the gender gap, mobile money, capital markets and climate finance.",
};

function Source({ s, light = false }: { s: { label: string; url: string }; light?: boolean }) {
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center gap-1 text-xs ${light ? "text-sage-300 hover:text-white" : "text-muted hover:text-teal-700"}`}>
      Source: {s.label} <ArrowUpRight className="size-3" />
    </a>
  );
}

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact & data"
        title="The numbers behind the work."
        intro="We track the state of Ethiopia's financial system to target our interventions and measure progress. Every figure here links to its public source."
      />

      <section className="border-b border-sage-200 bg-paper py-14">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-sage-200 ring-1 ring-sage-200 sm:grid-cols-2 lg:grid-cols-4">
          {headlineStats.map((s) => (
            <div key={s.label} className="bg-paper p-6 lg:p-8">
              <p className="text-5xl font-semibold tracking-tight text-teal-800">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[15px] leading-snug">{s.label}</p>
              <a href={s.source.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-muted hover:text-teal-700">
                {s.note} <ArrowUpRight className="size-3" />
              </a>
            </div>
          ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeading
            eyebrow="Financial inclusion"
            title="More Ethiopians are banked — women still lag."
            intro="Account ownership has more than doubled since 2014, reaching 48.8% of adults in 2025. But the gap between men and women has widened from under 2 points to roughly 15."
          />
          <Reveal className="rounded-[2rem] bg-white p-6 ring-1 ring-sage-200 sm:p-8">
            <AccountOwnershipChart />
            <Source s={sources.findex} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sage-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Capital markets"
            title="A new exchange, growing fast."
            intro="The Ethiopian Securities Exchange opened in January 2025 — the country's first in decades. Seven companies have listed so far, including Ethio Telecom as the first non-financial issuer."
          />
          <Reveal className="mt-12 rounded-[2rem] bg-white p-6 ring-1 ring-sage-200 sm:p-10">
            <EsxTimeline />
            <Source s={sources.esx} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-teal-900 py-20 text-white sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            light
            eyebrow="Climate finance"
            title="A $8bn-a-year climate finance gap."
            intro="Delivering Ethiopia's latest Nationally Determined Contribution needs around $10.6bn a year. Tracked flows averaged $2.3bn in 2022/23."
          />
          <Reveal className="rounded-[2rem] bg-teal-800/70 p-6 ring-1 ring-white/10 sm:p-8">
            <ClimateGapChart />
            <Source s={sources.cpi} light />
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Results framework"
            title="Four outcomes guide everything we do."
            intro="Programmes, learning briefs, publications and news are organised against these outcome areas so partners can follow progress."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-3xl border border-sage-200 p-7">
                <OutcomeIcon name={o.icon} className="size-8 text-green-600" />
                <h3 className="mt-5 text-lg font-semibold text-teal-900">{o.title}</h3>
                <p className="mt-2 text-muted">{o.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border-2 border-dashed border-sage-300 p-8 text-center">
            <p className="font-semibold text-teal-900">Live dashboard slot</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              This space supports embedded Power BI or Tableau dashboards, so programme results can be published directly from FSD Ethiopia&apos;s monitoring systems.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
