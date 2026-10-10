/**
 * The angular brackets from the FSD Ethiopia logo, redrawn as a scalable motif.
 * Green, yellow and red echo the Ethiopian flag and frame content across the site.
 */
export function Brackets({ className = "", strokeWidth = 10, mono }: { className?: string; strokeWidth?: number; mono?: string }) {
  return (
    <svg viewBox="0 0 721 503" className={className} fill="none" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="232,10 410,88 402,176 452,164" stroke={mono ?? "var(--color-flag-green)"} strokeWidth={strokeWidth} />
      <polyline points="134,118 66,280 8,294 70,300 174,444" stroke={mono ?? "var(--color-flag-yellow)"} strokeWidth={strokeWidth} />
      <polyline points="492,254 654,298 712,290 570,406 366,494" stroke={mono ?? "var(--color-flag-red)"} strokeWidth={strokeWidth} />
    </svg>
  );
}

/** A single bracket stroke used as a section accent. */
export function Tick({ color = "var(--color-flag-yellow)", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 60 24" className={className} aria-hidden="true" fill="none">
      <polyline points="2,4 40,12 30,20 58,16" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
