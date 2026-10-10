"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "@/components/Icons";
import type { CohortMember } from "@/lib/content";

export function CohortGrid({ members }: { members: CohortMember[] }) {
  const [active, setActive] = useState<CohortMember | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {members.map((m) => (
          <li key={m.name}>
            <button type="button" onClick={() => setActive(m)} className="group block w-full text-left">
              <span className="relative block aspect-[3/4] overflow-hidden rounded-3xl bg-sage-100">
                <Image
                  src={m.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-white/95 py-2 text-sm font-medium text-teal-900 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  Read profile <ArrowRight className="size-4" />
                </span>
              </span>
              <span className="mt-3 block font-semibold text-teal-900">{m.name}</span>
              <span className="mt-1 line-clamp-2 text-sm text-muted">{m.bio.find((b) => b.length > 60) ?? m.bio[0]}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialog.current && setActive(null)}
        aria-labelledby="cohort-name"
        className="m-auto max-h-[90vh] w-[min(56rem,calc(100%-2rem))] overflow-hidden rounded-[2rem] bg-white p-0 shadow-2xl backdrop:bg-teal-950/70 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="grid max-h-[90vh] md:grid-cols-[0.8fr_1.2fr]">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image src={active.image} alt={active.name} fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover object-top" />
            </div>
            <div className="overflow-y-auto p-8 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600">Board Ready cohort</p>
                  <h2 id="cohort-name" className="mt-2 text-3xl font-semibold text-teal-900">
                    {active.name}
                  </h2>
                </div>
                <button type="button" onClick={() => setActive(null)} aria-label="Close profile" className="grid size-10 shrink-0 place-items-center rounded-full bg-sage-100 text-teal-900 hover:bg-sage-200">
                  <Close className="size-5" />
                </button>
              </div>
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                {active.bio.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
