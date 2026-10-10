"use client";

import { useMemo, useState } from "react";
import { Search } from "@/components/Icons";
import { ResourceCard } from "@/components/ui";
import { topicLabels, typeLabels, type Resource, type Topic } from "@/lib/content";

export function ResourceLibrary({ resources }: { resources: Resource[] }) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [type, setType] = useState<Resource["type"] | "all">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return resources.filter(
      (r) =>
        (topic === "all" || r.topics.includes(topic)) &&
        (type === "all" || r.type === type) &&
        (!needle || `${r.title} ${r.publisher}`.toLowerCase().includes(needle)),
    );
  }, [resources, q, topic, type]);

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${active ? "bg-teal-700 text-white" : "bg-white text-teal-900 ring-1 ring-sage-200 hover:ring-teal-700"}`;

  return (
    <div>
      <div className="sticky top-[80px] sm:top-[88px] z-20 -mx-4 border-b border-sage-200 bg-white/95 px-4 py-5 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search the library</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles and publishers"
              className="w-full rounded-full border border-sage-300 bg-white py-3 pl-12 pr-4 outline-none focus:border-teal-700"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
            <button type="button" aria-pressed={topic === "all"} onClick={() => setTopic("all")} className={chip(topic === "all")}>
              All topics
            </button>
            {(Object.keys(topicLabels) as Topic[]).map((t) => (
              <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)} className={chip(topic === t)}>
                {topicLabels[t]}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" role="group" aria-label="Filter by type">
          <span className="text-muted">Type:</span>
          {(["all", ...Object.keys(typeLabels)] as (Resource["type"] | "all")[]).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={`border-b-2 pb-0.5 transition ${type === t ? "border-green-600 font-medium text-teal-900" : "border-transparent text-muted hover:text-teal-900"}`}
            >
              {t === "all" ? "All" : typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-muted" aria-live="polite">
        Showing {filtered.length} of {resources.length} resources
      </p>

      {filtered.length ? (
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl bg-sage-50 p-12 text-center">
          <p className="text-lg font-medium text-teal-900">No resources match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setTopic("all");
              setType("all");
            }}
            className="mt-4 text-green-600 underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
