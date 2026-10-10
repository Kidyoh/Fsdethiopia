"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LanguageNotice, LanguageToggle, useLanguage } from "@/components/LanguageProvider";
import { ArrowRight, ChevronDown, Close, Mail, Menu, Phone } from "@/components/Icons";
import { images, pillars, site } from "@/lib/content";
import type { DictKey } from "@/lib/i18n";

type NavItem = { key: DictKey; href: string; children?: { key: DictKey; href: string; blurb: string }[] };

const nav: NavItem[] = [
  {
    key: "nav.who",
    href: "/about",
    children: [
      { key: "nav.about", href: "/about", blurb: "Our mission, approach and theory of change" },
      { key: "nav.team", href: "/team", blurb: "Leadership, staff, regional coordinators and board" },
      { key: "nav.partners", href: "/partners", blurb: "The funders and network behind our work" },
    ],
  },
  {
    key: "nav.work",
    href: "/our-work",
    children: [
      ...pillars.map((p) => ({
        key: (p.slug === "financial-inclusion" ? "nav.inclusion" : p.slug === "access-to-capital" ? "nav.capital" : "nav.climate") as DictKey,
        href: `/our-work/${p.slug}`,
        blurb: p.kicker,
      })),
      { key: "nav.boardready", href: "/board-ready", blurb: "Corporate governance programme for women leaders" },
    ],
  },
  { key: "nav.impact", href: "/impact" },
  { key: "nav.resources", href: "/resources" },
  { key: "nav.newsroom", href: "/newsroom" },
  { key: "nav.workwithus", href: "/work-with-us" },
];

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-md bg-flag-yellow px-4 py-2 font-medium text-teal-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skip")}
      </a>
      <LanguageNotice />
      <div className="hidden bg-teal-950 text-sm text-sage-200 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4" /> {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-4" /> {site.phone}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/work-with-us" className="hover:text-white">
              {t("nav.workwithus")}
            </Link>
            <Link href="/contact" className="hover:text-white">
              {t("nav.contact")}
            </Link>
            <LanguageToggle className="text-sage-100" />
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "border-sage-200 shadow-[0_8px_30px_-12px_rgba(13,52,52,0.25)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
          <Link href="/" className="shrink-0" aria-label="FSD Ethiopia — home">
            <Image src={images["logo-dark"]} alt="FSD Ethiopia" width={721} height={503} priority className="h-14 w-auto sm:h-16" />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) =>
                item.children ? (
                  <li key={item.key} className="relative" onMouseEnter={() => setOpen(item.key)} onMouseLeave={() => setOpen(null)}>
                    <button
                      type="button"
                      aria-expanded={open === item.key}
                      aria-controls={`menu-${item.key}`}
                      onClick={() => setOpen(open === item.key ? null : item.key)}
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition-colors hover:bg-sage-100 hover:text-teal-800 ${
                        isActive(item.href) || item.children.some((c) => isActive(c.href)) ? "text-green-600" : "text-teal-900"
                      }`}
                    >
                      {t(item.key)}
                      <ChevronDown className={`size-4 transition-transform ${open === item.key ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      id={`menu-${item.key}`}
                      hidden={open !== item.key}
                      className="absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-3"
                    >
                      <ul className="overflow-hidden rounded-2xl border border-sage-200 bg-white p-2 shadow-2xl shadow-teal-900/15">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 hover:bg-sage-50"
                              aria-current={isActive(c.href) ? "page" : undefined}
                            >
                              <span>
                                <span className="block font-medium text-teal-900">{t(c.key)}</span>
                                <span className="mt-0.5 block text-sm text-muted">{c.blurb}</span>
                              </span>
                              <ArrowRight className="mt-1 size-4 shrink-0 text-green-600 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors hover:bg-sage-100 hover:text-teal-800 ${
                        isActive(item.href) ? "text-green-600" : "text-teal-900"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 xl:inline-flex"
            >
              {t("nav.contact")}
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-sage-300 px-4 py-2 text-sm font-medium text-teal-900 lg:hidden"
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              onClick={() => setMobile(true)}
            >
              <Menu className="size-5" /> {t("nav.menu")}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!mobile}
        className="fixed inset-0 z-[60] overflow-y-auto bg-teal-900 text-white lg:hidden"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <LanguageToggle className="text-sage-100" />
          <button
            type="button"
            onClick={() => setMobile(false)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm"
          >
            <Close className="size-5" /> {t("nav.close")}
          </button>
        </div>
        <nav aria-label="Mobile" className="px-4 pb-10">
          <ul className="divide-y divide-white/10">
            <li>
              <Link href="/" className="block py-4 text-2xl font-medium">
                {t("nav.home")}
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.key} className="py-4">
                <Link href={item.href} className="block text-2xl font-medium">
                  {t(item.key)}
                </Link>
                {item.children && (
                  <ul className="mt-3 grid gap-2 pl-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="text-sage-200 hover:text-white">
                          {t(c.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-4">
              <Link href="/contact" className="block text-2xl font-medium">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
          <div className="mt-6 space-y-2 text-sage-200">
            <a href={`mailto:${site.email}`} className="block">
              {site.email}
            </a>
            <a href={site.phoneHref} className="block">
              {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
