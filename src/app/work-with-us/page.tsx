import type { Metadata } from "next";
import { Deadline } from "@/components/Deadline";
import { ArrowRight, Briefcase, FileText, Shield } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { jobs, procurements, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work with us",
  description: "Job opportunities, procurement opportunities and calls for applications at FSD Ethiopia.",
};

type Opp = (typeof jobs)[number] | (typeof procurements)[number];

function OpportunityCard({ o }: { o: Opp }) {
  return (
    <Reveal as="li" className="flex flex-col gap-6 rounded-3xl border border-sage-200 p-7 transition hover:border-teal-700 hover:shadow-lg md:flex-row md:items-center md:justify-between">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-800">{o.kind}</span>
          <Deadline date={o.deadline} />
        </div>
        <h3 className="mt-3 text-xl font-semibold text-teal-900">{o.title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{o.summary}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        <ButtonLink href={o.doc} external variant="secondary">
          {o.docLabel}
        </ButtonLink>
        <ButtonLink href={`/work-with-us/apply?opportunity=${o.id}`}>Apply online</ButtonLink>
      </div>
    </Reveal>
  );
}

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Help shape Ethiopia's financial future."
        intro="Join our team, partner with us as a consultant or firm, or respond to a call for applications. All opportunities can be applied for online."
      >
        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-3">
          {[
            ["#jobs", "Job opportunities", Briefcase],
            ["#procurement", "Procurement", FileText],
            ["#calls", "Calls for applications", ArrowRight],
          ].map(([href, label, Icon]) => {
            const I = Icon as typeof Briefcase;
            return (
              <a key={href as string} href={href as string} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 ring-1 ring-white/20 transition hover:bg-white hover:text-teal-900">
                <I className="size-4" /> {label as string}
              </a>
            );
          })}
        </nav>
      </PageHero>

      <section id="jobs" className="scroll-mt-24 py-20">
        <Container>
          <SectionHeading eyebrow="Careers" title="Job opportunities" />
          <ul className="mt-10 space-y-4">
            {jobs.map((o) => (
              <OpportunityCard key={o.id} o={o} />
            ))}
          </ul>
        </Container>
      </section>

      <section id="procurement" className="scroll-mt-24 bg-sage-50 py-20">
        <Container>
          <SectionHeading
            eyebrow="Procurement"
            title="Procurement opportunities"
            intro={`Requests for proposals and terms of reference. Questions on any tender can be sent to ${site.bidsEmail}.`}
          />
          <ul className="mt-10 space-y-4 bg-transparent">
            {procurements.map((o) => (
              <OpportunityCard key={o.id} o={o} />
            ))}
          </ul>
        </Container>
      </section>

      <section id="calls" className="scroll-mt-24 py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Calls for applications" title="No open calls right now" />
            <p className="mt-6 text-lg text-muted">
              There are currently no active calls for applications. Subscribe to our newsletter or follow us on LinkedIn to hear about future
              programmes, fellowships and grant opportunities.
            </p>
          </div>
          <div className="rounded-[2rem] bg-teal-900 p-8 text-white sm:p-10">
            <Shield className="size-10 text-flag-yellow" />
            <h3 className="mt-5 text-2xl font-semibold">Fair, transparent and secure</h3>
            <p className="mt-3 leading-relaxed text-sage-200">
              Applications are processed in line with Ethiopia&apos;s Personal Data Protection Proclamation No. 1321/2024. We collect only
              what is needed, store it encrypted, and you can request access to, correction of or deletion of your data at any time.
              Initial screening is AI-assisted against published criteria, and every decision is reviewed by our team.
            </p>
            <a href="/privacy" className="mt-6 inline-flex items-center gap-2 font-medium text-flag-yellow hover:underline">
              Read our privacy notice <ArrowRight className="size-4" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
