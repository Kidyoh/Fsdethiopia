"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowRight, Check } from "@/components/Icons";

/** Newsletter sign-up. In production this posts to FSD Ethiopia's Mailchimp audience. */
export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { t } = useLanguage();
  const id = useId();
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  if (done) {
    return (
      <p role="status" className={`flex items-start gap-3 rounded-2xl p-4 ${dark ? "bg-white/10 text-white" : "bg-sage-100 text-teal-900"}`}>
        <Check className="mt-0.5 size-5 shrink-0 text-flag-yellow" />
        <span>
          Thank you for subscribing.
          <span className={`mt-1 block text-sm ${dark ? "text-sage-200" : "text-muted"}`}>
            Prototype note: in production this form adds you to FSD Ethiopia&apos;s Mailchimp audience.
          </span>
        </span>
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-3"
    >
      <label htmlFor={`${id}-email`} className="sr-only">
        {t("footer.email")}
      </label>
      <div className={`flex rounded-full p-1.5 ${dark ? "bg-white/10 ring-1 ring-white/20 focus-within:ring-flag-yellow" : "bg-white ring-1 ring-sage-300 focus-within:ring-teal-700"}`}>
        <input
          id={`${id}-email`}
          type="email"
          required
          autoComplete="email"
          placeholder={t("footer.email")}
          className={`min-w-0 flex-1 bg-transparent px-4 text-base outline-none ${dark ? "text-white placeholder:text-sage-300" : "text-ink placeholder:text-muted"}`}
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-flag-yellow px-5 py-2.5 text-sm font-semibold text-teal-900 transition hover:brightness-95"
        >
          {t("cta.subscribe")} <ArrowRight className="size-4" />
        </button>
      </div>
      <label className={`flex items-start gap-2 text-xs ${dark ? "text-sage-200" : "text-muted"}`}>
        <input type="checkbox" required className="mt-0.5 size-4 accent-green-600" />
        <span>
          I agree to receive email updates from FSD Ethiopia and understand I can unsubscribe at any time, in line with Ethiopia&apos;s
          Personal Data Protection Proclamation No. 1321/2024.
        </span>
      </label>
    </form>
  );
}
