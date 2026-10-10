import Image from "next/image";
import Link from "next/link";
import { Brackets } from "@/components/Brackets";
import { Facebook, LinkedIn, Mail, Phone, Pin, Clock, XLogo, ArrowUpRight } from "@/components/Icons";
import { T } from "@/components/LanguageProvider";
import { NewsletterForm } from "@/components/NewsletterForm";
import { fsdNetwork, images, site } from "@/lib/content";

const columns = [
  {
    title: "nav.who" as const,
    links: [
      ["nav.about", "/about"],
      ["nav.team", "/team"],
      ["nav.partners", "/partners"],
      ["nav.impact", "/impact"],
    ] as const,
  },
  {
    title: "nav.work" as const,
    links: [
      ["nav.inclusion", "/our-work/financial-inclusion"],
      ["nav.capital", "/our-work/access-to-capital"],
      ["nav.climate", "/our-work/climate-finance"],
      ["nav.boardready", "/board-ready"],
    ] as const,
  },
  {
    title: "nav.resources" as const,
    links: [
      ["nav.resources", "/resources"],
      ["nav.newsroom", "/newsroom"],
      ["nav.workwithus", "/work-with-us"],
      ["nav.contact", "/contact"],
    ] as const,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-950 text-sage-100">
      <Brackets className="pointer-events-none absolute -right-40 -top-24 w-[46rem] opacity-[0.07]" strokeWidth={6} mono="#ffffff" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:pt-20">
        <div className="grid gap-10 rounded-3xl bg-teal-800/60 p-8 ring-1 ring-white/10 lg:grid-cols-2 lg:items-center lg:p-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-flag-yellow">Newsletter</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              <T k="footer.newsletter" />
            </h2>
            <p className="mt-3 max-w-md text-sage-200">
              Research, events and opportunities from across Ethiopia&apos;s financial sector — a few times a year, never spam.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Image src={images.logo} alt="FSD Ethiopia" width={721} height={503} className="h-16 w-auto" />
            <p className="mt-6 max-w-sm text-sage-200">
              Established in 2022, FSD Ethiopia supports the development of accessible, inclusive and sustainable financial markets for
              economic growth and human development.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <Pin className="size-5 shrink-0 text-sage-400" />
                <span>{site.address.join(", ")}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="size-5 shrink-0 text-sage-400" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="size-5 shrink-0 text-sage-400" />
                <a href={site.phoneHref} className="hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="size-5 shrink-0 text-sage-400" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                <T k={col.title} />
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map(([k, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sage-200 transition hover:text-white">
                      <T k={k} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a href="https://fsdnetwork.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-white hover:text-flag-yellow">
                <T k="footer.network" /> <ArrowUpRight className="size-4" />
              </a>
              {fsdNetwork.map((n) => (
                <a key={n.name} href={n.url} target="_blank" rel="noopener noreferrer" className="text-sage-300 hover:text-white">
                  {n.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {[
                [site.social.linkedin, LinkedIn, "LinkedIn"],
                [site.social.facebook, Facebook, "Facebook"],
                [site.social.x, XLogo, "X (Twitter)"],
              ].map(([href, Icon, label]) => {
                const I = Icon as typeof LinkedIn;
                return (
                  <a
                    key={label as string}
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`FSD Ethiopia on ${label}`}
                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-flag-yellow hover:text-teal-900"
                  >
                    <I className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 text-xs text-sage-300 sm:flex-row sm:justify-between">
            <p>
              © 2022–2026 FSD Ethiopia. <T k="footer.rights" />
            </p>
            <p className="flex gap-4">
              <Link href="/privacy" className="hover:text-white">
                <T k="footer.privacy" />
              </Link>
              <Link href="/accessibility" className="hover:text-white">
                <T k="footer.accessibility" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
