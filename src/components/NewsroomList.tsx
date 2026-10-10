"use client";

import { useState } from "react";
import { PostCard } from "@/components/ui";
import type { Post } from "@/lib/content";

const tabs = [
  { key: "all", label: "All" },
  { key: "blog", label: "Insights & blogs" },
  { key: "press", label: "Press releases" },
] as const;

export function NewsroomList({ posts }: { posts: Post[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");
  const [year, setYear] = useState<string>("all");
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];
  const list = posts.filter((p) => (tab === "all" || p.type === tab) && (year === "all" || p.date.startsWith(year)));

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-sage-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filter news" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${tab === t.key ? "bg-teal-700 text-white" : "bg-sage-100 text-teal-900 hover:bg-sage-200"}`}
            >
              {t.label}
              <span className="ml-2 opacity-70">{t.key === "all" ? posts.length : posts.filter((p) => p.type === t.key).length}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-sm text-muted">
          Year
          <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-full border border-sage-300 bg-white px-4 py-2 text-teal-900">
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {list.map((p, i) => (
          <div key={p.slug} className={i === 0 ? "md:col-span-2 lg:col-span-3" : ""}>
            <PostCard post={p} featured={i === 0} />
          </div>
        ))}
      </div>
      {!list.length && <p className="mt-10 text-muted">No stories match this filter.</p>}
    </div>
  );
}
