import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Apply online",
  description: "Apply for jobs and procurement opportunities at FSD Ethiopia.",
};

const steps = ["Choose the opportunity", "Share your details", "Upload documents", "Confirm consent"];

export default function ApplyPage() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Link href="/work-with-us" className="text-sm text-muted hover:text-teal-700">
            ← All opportunities
          </Link>
          <h1 className="mt-4 text-4xl font-semibold text-teal-900 sm:text-5xl">Apply online</h1>
          <p className="mt-4 text-lg text-muted">One portal for job applications and procurement bids — available in English and Amharic.</p>
          <ol className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid size-9 place-items-center rounded-full bg-teal-700 text-sm font-semibold text-white">{i + 1}</span>
                <span className="font-medium text-teal-900">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-teal-900/5 ring-1 ring-sage-200 sm:p-10">
          <Suspense fallback={<p className="text-muted">Loading form…</p>}>
            <ApplicationForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
