"use client";

import { useEffect, useRef, useState } from "react";
import { accountOwnership, climateGap, esxListings, formatDate } from "@/lib/content";

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fallback for very old browsers
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Animated number that counts up once it scrolls into view. */
export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- jump straight to the final value
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} aria-label={`${value.toFixed(decimals)}${suffix}`}>
      <span aria-hidden="true">
        {n.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

const SERIES = [
  { key: "total", label: "All adults", color: "var(--color-teal-700)", dark: "#ffffff" },
  { key: "men", label: "Men", color: "var(--color-sage-400)", dark: "var(--color-sage-400)" },
  { key: "women", label: "Women", color: "var(--color-green-600)", dark: "var(--color-flag-yellow)" },
] as const;
type SeriesKey = (typeof SERIES)[number]["key"];
const colorOf = (s: (typeof SERIES)[number], dark: boolean) => (dark ? s.dark : s.color);

/** Account ownership by Findex wave, with gender split. */
export function AccountOwnershipChart({ dark = false }: { dark?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [active, setActive] = useState<Record<SeriesKey, boolean>>({ total: true, men: true, women: true });
  const [hover, setHover] = useState<number | null>(accountOwnership.length - 1);
  const [table, setTable] = useState(false);

  const W = 640, H = 320, L = 44, R = 24, T = 20, B = 40;
  const x = (i: number) => L + (i * (W - L - R)) / (accountOwnership.length - 1);
  const y = (v: number) => T + (1 - v / 60) * (H - T - B);
  const grid = dark ? "rgba(255,255,255,0.12)" : "var(--color-sage-200)";
  const axis = dark ? "var(--color-sage-300)" : "var(--color-muted)";
  const d = accountOwnership[hover ?? accountOwnership.length - 1];

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Show series" className="flex flex-wrap gap-2">
          {SERIES.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={active[s.key]}
              onClick={() => setActive((a) => ({ ...a, [s.key]: !a[s.key] }))}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ring-1 transition ${
                active[s.key]
                  ? dark ? "bg-white/10 text-white ring-white/30" : "bg-white text-teal-900 ring-sage-300"
                  : dark ? "text-sage-300 opacity-60 ring-white/10" : "text-muted opacity-60 ring-sage-200"
              }`}
            >
              <span className="size-2.5 rounded-full" style={{ background: colorOf(s, dark) }} />
              {s.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setTable((t) => !t)} className={`text-sm underline underline-offset-4 ${dark ? "text-sage-200" : "text-teal-700"}`}>
          {table ? "View as chart" : "View as table"}
        </button>
      </div>

      {table ? (
        <table className={`mt-6 w-full text-left text-sm ${dark ? "text-sage-100" : "text-ink"}`}>
          <caption className="sr-only">Account ownership, % of adults aged 15+</caption>
          <thead>
            <tr className={dark ? "border-b border-white/20" : "border-b border-sage-200"}>
              <th className="py-2 font-medium">Findex wave</th>
              {SERIES.map((s) => (
                <th key={s.key} className="py-2 font-medium">{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accountOwnership.map((r) => (
              <tr key={r.wave} className={dark ? "border-b border-white/10" : "border-b border-sage-100"}>
                <td className="py-2">{r.wave}</td>
                <td className="py-2">{r.total}%</td>
                <td className="py-2">{r.men}%</td>
                <td className="py-2">{r.women}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="relative mt-4">
          <p className={`flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl px-4 py-3 text-sm ${dark ? "bg-white/5 text-sage-100" : "bg-sage-50 text-ink"}`} aria-live="polite">
            <span className="font-semibold">Findex {d.wave}</span>
            <span>All adults {d.total}%</span>
            <span>Men {d.men}%</span>
            <span>Women {d.women}%</span>
            <span className={`font-semibold ${dark ? "text-flag-yellow" : "text-flag-red"}`}>Gap {(d.men - d.women).toFixed(1)} pts</span>
          </p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full overflow-visible" role="img" aria-label="Line chart: share of Ethiopian adults with an account rose from 21.8% in 2014 to 48.8% in 2025; women 41.6%, men 56.5% in 2025.">
            {[0, 20, 40, 60].map((v) => (
              <g key={v}>
                <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={grid} strokeDasharray={v ? "4 6" : undefined} />
                <text x={L - 10} y={y(v) + 4} textAnchor="end" fontSize="12" fill={axis}>
                  {v}%
                </text>
              </g>
            ))}
            {accountOwnership.map((r, i) => (
              <text key={r.wave} x={x(i)} y={H - 12} textAnchor="middle" fontSize="13" fill={axis} fontWeight={hover === i ? 600 : 400}>
                {r.wave}
              </text>
            ))}
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke={dark ? "rgba(255,255,255,0.3)" : "var(--color-sage-300)"} />}
            {/* Gender gap band */}
            {active.men && active.women && (
              <path
                d={`M${accountOwnership.map((r, i) => `${x(i)},${y(r.men)}`).join(" L")} L${[...accountOwnership]
                  .map((r, i) => ({ r, i }))
                  .reverse()
                  .map(({ r, i }) => `${x(i)},${y(r.women)}`)
                  .join(" L")} Z`}
                fill="var(--color-green-600)"
                opacity={inView ? 0.1 : 0}
                style={{ transition: "opacity 1s 0.8s" }}
              />
            )}
            {SERIES.filter((s) => active[s.key]).map((s) => {
              const pts = accountOwnership.map((r, i) => `${x(i)},${y(r[s.key])}`).join(" ");
              return (
                <g key={s.key}>
                  <polyline
                    points={pts}
                    fill="none"
                    stroke={colorOf(s, dark)}
                    strokeWidth={s.key === "total" ? 4 : 3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={inView ? 0 : 1}
                    style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)" }}
                  />
                  {accountOwnership.map((r, i) => (
                    <circle key={i} cx={x(i)} cy={y(r[s.key])} r={hover === i ? 6 : 4} fill={dark ? "var(--color-teal-900)" : "#fff"} stroke={colorOf(s, dark)} strokeWidth={3} />
                  ))}
                </g>
              );
            })}
            {accountOwnership.map((r, i) => (
              <rect
                key={r.wave}
                x={x(i) - 40}
                y={T}
                width={80}
                height={H - T - B}
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`${r.wave}: all adults ${r.total}%, men ${r.men}%, women ${r.women}%`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                className="cursor-pointer outline-none"
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

/** Annual climate finance need vs. tracked flows (USD bn). */
export function ClimateGapChart() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const rows = [
    { label: "Annual need to deliver Ethiopia's NDC 3.0 (2025–2035)", value: climateGap.needPerYear, color: "var(--color-flag-red)" },
    { label: "Tracked climate finance flows (2022/23 average)", value: climateGap.flowsPerYear, color: "var(--color-green-600)" },
  ];
  return (
    <div ref={ref} className="space-y-6">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-sm text-sage-200">{r.label}</p>
            <p className="text-2xl font-semibold text-white">${r.value}bn</p>
          </div>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: inView ? `${(r.value / climateGap.needPerYear) * 100}%` : 0, background: r.color, transition: "width 1.4s cubic-bezier(.2,.7,.2,1)" }}
            />
          </div>
        </div>
      ))}
      <p className="text-sm text-sage-200">
        Flows cover roughly <strong className="text-white">{Math.round((climateGap.flowsPerYear / climateGap.needPerYear) * 100)}%</strong> of annual need — a gap of about{" "}
        <strong className="text-white">${(climateGap.needPerYear - climateGap.flowsPerYear).toFixed(1)}bn a year</strong>.
      </p>
    </div>
  );
}

/** Cumulative listings on the Ethiopian Securities Exchange. */
export function EsxTimeline() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <ol className="relative grid gap-3 sm:grid-cols-7 sm:gap-2">
        {esxListings.map((l, i) => (
          <li key={l.ticker} className="flex items-center gap-4 sm:flex-col sm:items-stretch sm:gap-2">
            <div className="flex h-10 shrink-0 items-end sm:h-40">
              <div
                className="w-10 rounded-t-lg bg-gradient-to-t from-teal-700 to-green-500 sm:w-full"
                style={{
                  height: inView ? `${((i + 1) / esxListings.length) * 100}%` : "6%",
                  transition: `height 1s cubic-bezier(.2,.7,.2,1) ${i * 120}ms`,
                }}
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="font-semibold text-teal-900">{l.ticker}</p>
              <p className="text-xs text-muted">{l.company}</p>
              <p className="text-xs text-muted">{formatDate(l.date, { month: "short", year: "numeric" })}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
