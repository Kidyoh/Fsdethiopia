"use client";

import { useSyncExternalStore } from "react";
import { formatDate } from "@/lib/content";

const subscribe = () => () => {};

/** Shows the deadline and, once on the client, whether it is still open. */
export function Deadline({ date }: { date: string }) {
  // Status depends on the viewer's clock, so it is only computed on the client.
  const today = useSyncExternalStore(subscribe, () => new Date().toISOString().slice(0, 10), () => null);
  const open = today === null ? null : date >= today;
  return (
    <span className="inline-flex flex-wrap items-center gap-2 text-sm">
      {open !== null && (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${open ? "bg-green-600 text-white" : "bg-sage-200 text-muted"}`}>
          {open ? "Open" : "Closed"}
        </span>
      )}
      <span className="text-muted">
        Deadline: <time dateTime={date}>{formatDate(date)}</time>
      </span>
    </span>
  );
}

export function useIsOpen(date: string) {
  const today = useSyncExternalStore(subscribe, () => new Date().toISOString().slice(0, 10), () => null);
  return today === null ? true : date >= today;
}
