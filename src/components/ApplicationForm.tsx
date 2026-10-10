"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState, useSyncExternalStore } from "react";
import { Check, Shield, Upload } from "@/components/Icons";
import { jobs, procurements } from "@/lib/content";

const all = [...jobs, ...procurements];
const subscribe = () => () => {};

const field = "mt-2 w-full rounded-xl border border-sage-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20";
const labelCls = "block text-sm font-medium text-teal-900";

export function ApplicationForm() {
  const params = useSearchParams();
  const id = useId();
  const today = useSyncExternalStore(subscribe, () => new Date().toISOString().slice(0, 10), () => "0000-00-00");
  const latest = [...all].sort((a, b) => b.deadline.localeCompare(a.deadline))[0];
  const [opp, setOpp] = useState(params.get("opportunity") ?? latest.id);
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  const selected = all.find((o) => o.id === opp) ?? all[0];
  const isFirm = selected.kind !== "Job";
  const closed = selected.deadline < today;

  if (submitted) {
    return (
      <div role="status" className="rounded-[2rem] bg-sage-50 p-8 text-center sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-600 text-white">
          <Check className="size-8" />
        </span>
        <h2 className="mt-6 text-3xl font-semibold text-teal-900">Application received</h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          Your reference is <strong className="text-teal-900">{submitted}</strong>. A confirmation email would be sent now, followed by an update
          once initial screening is complete.
        </p>
        <p className="mx-auto mt-6 max-w-lg rounded-xl bg-flag-yellow/30 px-4 py-3 text-sm text-teal-900">
          Prototype: no data has left your browser. In production, submissions are stored encrypted in the CMS and routed to the screening
          workflow.
        </p>
        <button type="button" onClick={() => setSubmitted(null)} className="mt-8 font-medium text-green-600 underline underline-offset-4">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(`FSDE-${selected.kind.toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
        window.scrollTo({ top: 0 });
      }}
    >
      <fieldset>
        <legend className="text-xl font-semibold text-teal-900">1. Opportunity</legend>
        <label htmlFor={`${id}-opp`} className={`${labelCls} mt-5`}>
          Which opportunity are you applying for?
        </label>
        <select id={`${id}-opp`} value={opp} onChange={(e) => setOpp(e.target.value)} className={field}>
          <optgroup label="Jobs">
            {jobs.map((o) => (
              <option key={o.id} value={o.id}>
                {o.title}
              </option>
            ))}
          </optgroup>
          <optgroup label="Procurement">
            {procurements.map((o) => (
              <option key={o.id} value={o.id}>
                {o.title}
              </option>
            ))}
          </optgroup>
        </select>
        {closed && (
          <p className="mt-3 rounded-xl bg-flag-red/10 px-4 py-3 text-sm text-flag-red" role="alert">
            This opportunity closed on {selected.deadline}. Late applications can&apos;t be accepted.
          </p>
        )}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-5 text-xl font-semibold text-teal-900">2. {isFirm ? "Firm & contact details" : "Your details"}</legend>
        {isFirm && (
          <label className={`${labelCls} sm:col-span-2`}>
            Firm or consortium name
            <input required name="org" autoComplete="organization" className={field} />
          </label>
        )}
        <label className={labelCls}>
          {isFirm ? "Contact person" : "Full name"}
          <input required name="name" autoComplete="name" className={field} />
        </label>
        <label className={labelCls}>
          Email
          <input required type="email" name="email" autoComplete="email" className={field} />
        </label>
        <label className={labelCls}>
          Phone
          <input type="tel" name="phone" autoComplete="tel" placeholder="+251" className={field} />
        </label>
        <label className={labelCls}>
          {isFirm ? "Women-led or women-owned firm?" : "Gender"} <span className="font-normal text-muted">(optional)</span>
          <select name="gender" className={field} defaultValue="">
            <option value="">Prefer not to say</option>
            {isFirm ? (
              <>
                <option>Yes</option>
                <option>No</option>
              </>
            ) : (
              <>
                <option>Woman</option>
                <option>Man</option>
              </>
            )}
          </select>
          <span className="mt-1 block text-xs font-normal text-muted">Used only in aggregate to track gender balance. It is never used in screening.</span>
        </label>
      </fieldset>

      <fieldset>
        <legend className="text-xl font-semibold text-teal-900">3. Documents</legend>
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            setFiles((f) => [...f, ...Array.from(e.dataTransfer.files)]);
          }}
          className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
            drag ? "border-teal-700 bg-sage-50" : "border-sage-300 hover:border-teal-700"
          }`}
        >
          <Upload className="size-8 text-teal-700" />
          <span className="mt-3 font-medium text-teal-900">
            {isFirm ? "Upload technical & financial proposals" : "Upload your CV and cover letter"}
          </span>
          <span className="mt-1 text-sm text-muted">Drag and drop or browse · PDF or DOCX, up to 10 MB each</span>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => setFiles((f) => [...f, ...Array.from(e.target.files ?? [])])}
          />
        </label>
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-xl bg-sage-50 px-4 py-2 text-sm">
                <span className="truncate">{f.name}</span>
                <button type="button" onClick={() => setFiles((all) => all.filter((_, j) => j !== i))} className="ml-4 text-flag-red hover:underline">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <label className={`${labelCls} mt-6`}>
          {isFirm ? "Summary of your approach" : "Why are you interested in this role?"}
          <textarea name="statement" rows={5} className={field} />
        </label>
      </fieldset>

      <fieldset className="rounded-2xl bg-teal-900 p-6 text-white sm:p-8">
        <legend className="sr-only">4. Consent</legend>
        <p className="flex items-center gap-3 text-xl font-semibold">
          <Shield className="size-6 text-flag-yellow" /> 4. Your data, your rights
        </p>
        <p className="mt-3 text-sm leading-relaxed text-sage-200">
          FSD Ethiopia processes your application under Ethiopia&apos;s Personal Data Protection Proclamation No. 1321/2024. Initial screening
          uses an AI-assisted tool that matches your documents against the published criteria for this opportunity. Our staff review every
          result before any decision is made.
        </p>
        <div className="mt-5 space-y-3 text-sm">
          <label className="flex items-start gap-3">
            <input type="checkbox" required className="mt-0.5 size-4 accent-flag-yellow" />
            I consent to FSD Ethiopia processing the information and documents I submit for the purpose of this application.
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" required className="mt-0.5 size-4 accent-flag-yellow" />
            I understand initial screening is AI-assisted with human review, and that I can request access to, correction of, or deletion of my data
            at any time.
          </label>
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={closed}
          className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-8 py-4 font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit application
        </button>
        <p className="text-sm text-muted">You&apos;ll receive an email confirmation and an update after screening.</p>
      </div>
    </form>
  );
}
