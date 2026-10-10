"use client";

import { useState } from "react";
import { Check } from "@/components/Icons";

const field = "mt-2 w-full rounded-xl border border-sage-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div role="status" className="rounded-2xl bg-sage-50 p-8">
        <span className="grid size-12 place-items-center rounded-full bg-green-600 text-white">
          <Check className="size-6" />
        </span>
        <p className="mt-4 text-xl font-semibold text-teal-900">Thank you — your message is on its way.</p>
        <p className="mt-2 text-sm text-muted">Prototype note: in production this form is protected by CAPTCHA and delivered to the communications team.</p>
      </div>
    );
  }
  return (
    <form
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="block text-sm font-medium text-teal-900">
        Name
        <input required autoComplete="name" className={field} />
      </label>
      <label className="block text-sm font-medium text-teal-900">
        Email
        <input required type="email" autoComplete="email" className={field} />
      </label>
      <label className="block text-sm font-medium text-teal-900 sm:col-span-2">
        Organisation <span className="font-normal text-muted">(optional)</span>
        <input autoComplete="organization" className={field} />
      </label>
      <label className="block text-sm font-medium text-teal-900 sm:col-span-2">
        Topic
        <select className={field} defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Partnership</option>
          <option>Media</option>
          <option>Procurement</option>
          <option>Careers</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-teal-900 sm:col-span-2">
        Message
        <textarea required rows={6} className={field} />
      </label>
      <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
        <input type="checkbox" required className="mt-0.5 size-4 accent-green-600" />
        I agree that FSD Ethiopia may use these details to respond to my enquiry, in line with Proclamation No. 1321/2024.
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="rounded-full bg-teal-700 px-8 py-4 font-medium text-white transition hover:bg-teal-800">
          Send message
        </button>
      </div>
    </form>
  );
}
