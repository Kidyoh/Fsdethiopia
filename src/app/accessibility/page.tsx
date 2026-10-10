import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Accessibility" };

const commitments = [
  "Designed to meet WCAG 2.1 Level AA, with colour contrast checked across the palette.",
  "Full keyboard navigation, visible focus states and a skip-to-content link.",
  "Charts include text alternatives and a data-table view.",
  "Animations respect your device's reduced-motion setting.",
  "English and Amharic interface with a one-click language toggle.",
  "Responsive layouts tested from small phones to large desktops.",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Accessibility" title="A website for everyone." intro="We want everyone to be able to use this website, whatever their device, ability or language." />
      <section className="py-20">
        <Container className="max-w-3xl">
          <ul className="space-y-4">
            {commitments.map((c) => (
              <li key={c} className="flex gap-4 text-lg text-ink">
                <span className="mt-2.5 h-1 w-6 shrink-0 rounded-full bg-green-600" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg text-muted">
            Found a barrier? Tell us at{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-green-600 underline underline-offset-4">
              {site.email}
            </a>{" "}
            and we&apos;ll fix it.
          </p>
        </Container>
      </section>
    </>
  );
}
