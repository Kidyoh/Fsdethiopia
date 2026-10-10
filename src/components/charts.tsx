"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { accountOwnership, climateGap, esxListings, formatDate, telebirrUsers } from "@/lib/content";

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

/**
 * Hero data panel: account ownership by Findex wave (interactive) plus three
 * mini indicators for mobile money, capital markets and climate finance.
 */
export function HeroDashboard() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const last = accountOwnership.length - 1;
  const [active, setActive] = useState(last);
  const d = accountOwnership[active];

  const W = 520, H = 210, L = 36, R = 10, T = 16, B = 28;
  const x = (i: number) => L + (i * (W - L - R)) / last;
  const y = (v: number) => T + (1 - v / 60) * (H - T - B);
  const line = (k: "total" | "men" | "women") => accountOwnership.map((r, i) => `${i ? "L" : "M"}${x(i)},${y(r[k])}`).join(" ");
  const area = `${line("total")} L${x(last)},${y(0)} L${x(0)},${y(0)} Z`;
  const draw = (delay = 0) => ({
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: inView ? 0 : 1,
    style: { transition: `stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1) ${delay}ms` },
  });

  const tbMax = Math.max(...telebirrUsers.map((t) => t.value));
  const gapShare = climateGap.flowsPerYear / climateGap.needPerYear;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-teal-950/90 p-5 shadow-2xl shadow-black/30 ring-1 ring-white/10 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage-300">Adults with a financial account</p>
          <p className="mt-2 flex items-baseline gap-3">
            <span className="text-5xl font-semibold tracking-tight text-white sm:text-6xl" aria-live="polite">
              {active === last ? <CountUp value={d.total} decimals={1} suffix="%" /> : `${d.total}%`}
            </span>
            <span className="text-sm text-sage-300">Findex {d.wave}</span>
          </p>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold text-white">
          +{(d.total - accountOwnership[0].total).toFixed(1)} pts since 2014
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-sage-200">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-white" /> All adults</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-sage-400" /> Men {d.men}%</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-flag-yellow" /> Women {d.women}%</span>
        <span className="ml-auto font-semibold text-flag-yellow">Gender gap {(d.men - d.women).toFixed(1)} pts</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full overflow-visible" role="img" aria-label="Account ownership in Ethiopia rose from 21.8% of adults in 2014 to 48.8% in 2025. Men 56.5%, women 41.6% in 2025.">
        <defs>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 6" />
            <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--color-sage-300)">{v}%</text>
          </g>
        ))}
        <path d={area} fill="url(#hero-area)" opacity={inView ? 1 : 0} style={{ transition: "opacity 1.2s 0.6s" }} />
        <path d={line("men")} fill="none" stroke="var(--color-sage-400)" strokeWidth={2.5} strokeLinecap="round" {...draw(150)} />
        <path d={line("women")} fill="none" stroke="var(--color-flag-yellow)" strokeWidth={2.5} strokeLinecap="round" {...draw(300)} />
        <path d={line("total")} fill="none" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" {...draw()} />
        <line x1={x(active)} x2={x(active)} y1={T} y2={H - B} stroke="rgba(255,255,255,0.35)" />
        {accountOwnership.map((r, i) => (
          <g key={r.wave}>
            <circle cx={x(i)} cy={y(r.men)} r={active === i ? 4.5 : 3} fill="var(--color-sage-400)" />
            <circle cx={x(i)} cy={y(r.women)} r={active === i ? 4.5 : 3} fill="var(--color-flag-yellow)" />
            <circle cx={x(i)} cy={y(r.total)} r={active === i ? 7 : 4.5} fill="var(--color-teal-900)" stroke="#fff" strokeWidth={3} />
            <text x={x(i)} y={H - 6} textAnchor={i === last ? "end" : "middle"} fontSize="12" fill={active === i ? "#fff" : "var(--color-sage-300)"} fontWeight={active === i ? 600 : 400}>
              {r.wave}
            </text>
            <rect
              x={x(i) - (W - L - R) / last / 2}
              y={0}
              width={(W - L - R) / last}
              height={H}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`Show ${r.wave}: all adults ${r.total}%, men ${r.men}%, women ${r.women}%`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseLeave={() => setActive(last)}
              className="cursor-pointer outline-none"
            />
          </g>
        ))}
      </svg>

      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        {/* telebirr growth */}
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:p-4">
          <p className="text-[11px] uppercase tracking-wider text-sage-300">telebirr</p>
          <p className="mt-1 text-lg font-semibold text-white sm:text-2xl">
            <CountUp value={60.6} decimals={1} suffix="M" />
          </p>
          <div className="mt-2 flex h-10 items-end gap-1.5" aria-hidden="true">
            {telebirrUsers.map((t, i) => (
              <div
                key={t.year}
                className={`flex-1 rounded-t ${i === telebirrUsers.length - 1 ? "bg-green-500" : "bg-white/25"}`}
                style={{ height: inView ? `${(t.value / tbMax) * 100}%` : "8%", transition: `height 1s cubic-bezier(.2,.7,.2,1) ${400 + i * 150}ms` }}
              />
            ))}
          </div>
          <p className="mt-1.5 text-[10px] leading-tight text-sage-300 sm:text-[11px]">customers, up from 54.8M a year earlier</p>
        </div>

        {/* ESX listings */}
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:p-4">
          <p className="text-[11px] uppercase tracking-wider text-sage-300">ESX listings</p>
          <p className="mt-1 text-lg font-semibold text-white sm:text-2xl">
            <CountUp value={esxListings.length} />
          </p>
          <div className="mt-2 flex h-10 items-end gap-1" aria-hidden="true">
            {esxListings.map((l, i) => (
              <div
                key={l.ticker}
                title={`${l.company} (${formatDate(l.date, { month: "short", year: "numeric" })})`}
                className="flex-1 rounded-t bg-gradient-to-t from-teal-500 to-sage-300"
                style={{ height: inView ? `${((i + 1) / esxListings.length) * 100}%` : "8%", transition: `height 0.9s cubic-bezier(.2,.7,.2,1) ${500 + i * 90}ms` }}
              />
            ))}
          </div>
          <p className="mt-1.5 text-[10px] leading-tight text-sage-300 sm:text-[11px]">companies listed since Jan 2025</p>
        </div>

        {/* Climate finance gap */}
        <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:p-4">
          <p className="text-[11px] uppercase tracking-wider text-sage-300">Climate finance</p>
          <p className="mt-1 text-lg font-semibold text-white sm:text-2xl">
            <CountUp value={Math.round(gapShare * 100)} suffix="%" />
          </p>
          <div className="mt-2 flex h-10 flex-col justify-end gap-1.5" aria-hidden="true">
            <div className="h-2.5 overflow-hidden rounded-full bg-flag-red/35">
              <div className="h-full rounded-full bg-green-500" style={{ width: inView ? `${gapShare * 100}%` : 0, transition: "width 1.2s cubic-bezier(.2,.7,.2,1) 600ms" }} />
            </div>
            <div className="flex justify-between text-[10px] text-sage-300">
              <span>${climateGap.flowsPerYear}bn</span>
              <span>${climateGap.needPerYear}bn</span>
            </div>
          </div>
          <p className="mt-1.5 text-[10px] leading-tight text-sage-300 sm:text-[11px]">of annual need currently financed</p>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-sage-300">
        Sources: World Bank Global Findex · Ethio Telecom · ESX · Climate Policy Initiative.{" "}
        <Link href="/impact" className="font-medium text-white underline-offset-2 hover:underline">
          Explore the data →
        </Link>
      </p>
    </div>
  );
}
