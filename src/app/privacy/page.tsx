import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy & data protection" };

const sections = [
  {
    h: "What we collect",
    p: "Only what we need: contact details you give us through forms or newsletter sign-up, documents submitted with job or procurement applications, and anonymised analytics about how the site is used.",
  },
  {
    h: "Why we use it",
    p: "To respond to enquiries, send newsletters you asked for, assess applications against published criteria, and improve the website. Optional gender information is used only in aggregate to monitor balance in applications and procurement.",
  },
  {
    h: "AI-assisted screening",
    p: "Initial screening of applications uses an AI-assisted tool that parses documents and scores them against criteria set by FSD Ethiopia. Every result is reviewed by staff, and no decision is made by the tool alone.",
  },
  {
    h: "Your rights",
    p: `Under Ethiopia's Personal Data Protection Proclamation No. 1321/2024 you may request access to, correction of, or deletion of your personal data at any time. Write to ${site.email}.`,
  },
  {
    h: "Security & retention",
    p: "Data is encrypted in transit and at rest, access is role-based with two-factor authentication, and records are kept only as long as necessary for the purpose they were collected for.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Draft for review" title="Privacy & data protection" intro="How FSD Ethiopia handles your personal data. Final wording to be confirmed with FSD Ethiopia's legal counsel." />
      <section className="py-20">
        <Container className="max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-semibold text-teal-900">{s.h}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{s.p}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
