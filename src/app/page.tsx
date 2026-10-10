import Image from "next/image";
import Link from "next/link";
import { Brackets } from "@/components/Brackets";
import { AccountOwnershipChart, CountUp } from "@/components/charts";
import { ArrowRight, ArrowUpRight, OutcomeIcon, Play } from "@/components/Icons";
import { T } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, PostCard, ResourceCard, SectionHeading } from "@/components/ui";
import { cohort, formatDate, headlineStats, images, outcomes, pillars, posts, resources, site, sources, tools } from "@/lib/content";

export default function HomePage() {
  const latest = posts[0];
  const [featured, ...rest] = posts;
  const featuredResources = resources.slice(0, 4);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden bg-teal-900 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(47,147,81,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(143,191,168,0.18),transparent_50%)]" />
        <Container className="grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28 [&>*]:min-w-0">
          <div>
            <Eyebrow light>
              <T k="hero.eyebrow" />
            </Eyebrow>
            <h1 className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl xl:text-[4.25rem]">
              <T k="hero.title.1" />{" "}
              <span className="text-sage-300">
                <T k="hero.title.2" />
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-sage-200 sm:text-xl">
              <T k="hero.body" />
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/our-work" variant="yellow">
                <T k="cta.explore" />
              </ButtonLink>
              <ButtonLink href="/resources" variant="ghost">
                <T k="cta.library" />
              </ButtonLink>
            </div>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {[
                ["2022", "Established"],
                ["3", "Strategic pillars"],
                ["7", "Regional coordinators"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-sm text-sage-300">{l}</dt>
                  <dd className="mt-1 text-3xl font-semibold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Image mosaic framed by the logo brackets */}
          <div className="relative mx-auto w-full max-w-xl">
            <Brackets className="absolute -inset-x-10 -inset-y-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+5rem)] animate-float" strokeWidth={8} />
            <div className="grid h-[24rem] grid-cols-6 grid-rows-6 gap-3 sm:h-[34rem] sm:gap-4">
              <div className="relative col-span-4 row-span-4 overflow-hidden rounded-[2rem]">
                <Image src={images["pillar-inclusion"]} alt="A woman using mobile money on her phone" fill priority sizes="(min-width: 1024px) 30vw, 66vw" className="object-cover" />
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[2rem]">
                <Image src={images["pillar-climate"]} alt="" fill priority sizes="(min-width: 1024px) 15vw, 33vw" className="object-cover" />
              </div>
              <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.25rem] bg-green-600 p-3 sm:rounded-[2rem] sm:p-4">
                <p className="text-2xl font-semibold leading-none sm:text-5xl">
                  <CountUp value={48.8} decimals={1} suffix="%" />
                </p>
                <p className="mt-2 text-[11px] leading-snug text-white/85 sm:text-sm">of adults own an account (Global Findex 2025)</p>
              </div>
              <div className="relative col-span-4 row-span-2 overflow-hidden rounded-[2rem]">
                <Image src={images["pillar-capital"]} alt="" fill priority sizes="(min-width: 1024px) 30vw, 66vw" className="object-cover object-[50%_35%]" />
              </div>
            </div>

            {latest && (
              <Link
                href={`/newsroom/${latest.slug}`}
                className="group absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 text-teal-900 shadow-2xl shadow-black/30 transition hover:-translate-y-1 sm:-left-8 sm:right-auto sm:max-w-sm"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                  {latest.image && <Image src={latest.image} alt="" fill sizes="64px" className="object-cover" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-green-600">Latest · {formatDate(latest.date, { day: "numeric", month: "short" })}</span>
                  <span className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug">{latest.title}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 transition group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* ---------- Numbers ---------- */}
      <section aria-labelledby="numbers" className="border-b border-sage-200 bg-paper">
        <Container className="py-14">
          <h2 id="numbers" className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            <T k="home.numbers" />
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl bg-sage-200 ring-1 ring-sage-200 sm:grid-cols-2 lg:grid-cols-4">
            {headlineStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="bg-paper p-6 lg:p-8">
                <p className="text-5xl font-semibold tracking-tight text-teal-800">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[15px] leading-snug text-ink">{s.label}</p>
                <a href={s.source.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-muted underline-offset-2 hover:text-teal-700 hover:underline">
                  Source: {s.note} <ArrowUpRight className="size-3" />
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Who we are ---------- */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem]">
              <Image src={images.about} alt="FSD Ethiopia team and partners at work" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <a
              href={site.video}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute -bottom-6 right-6 flex items-center gap-4 rounded-full bg-teal-900 py-3 pl-3 pr-6 text-white shadow-2xl transition hover:bg-teal-800"
            >
              <span className="grid size-12 place-items-center rounded-full bg-flag-yellow text-teal-900 transition group-hover:scale-110">
                <Play className="size-5" />
              </span>
              <span className="font-medium">
                <T k="cta.watch" />
                <span className="sr-only"> (YouTube, opens in a new tab)</span>
              </span>
            </a>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow={<T k="home.who" />}
              title="A catalyst for Ethiopia's financial system."
              intro="Established in 2022, FSD Ethiopia identifies the underlying causes of financial system failures and helps market actors address them — building a functional, effective financial sector that generates gains for Ethiopians from all walks of life."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {tools.map((tool, i) => (
                <Reveal key={tool.title} delay={i * 100}>
                  <Link href={tool.href} className="group block h-full rounded-2xl border border-sage-200 p-5 transition hover:border-teal-700 hover:bg-sage-50">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600">0{i + 1}</p>
                    <h3 className="mt-3 font-semibold text-teal-900">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{tool.body}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href="/about" variant="secondary">
                <T k="nav.about" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Pillars ---------- */}
      <section className="bg-sage-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={<T k="nav.work" />}
            title={<T k="home.pillars" />}
            intro="Our programmes are organised around three mutually reinforcing areas, each designed to unlock systemic, market-wide change."
            action={
              <ButtonLink href="/our-work" variant="secondary">
                <T k="cta.viewall" />
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link href={`/our-work/${p.slug}`} className="group relative isolate flex h-[30rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 text-white">
                  <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="-z-20 object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-950 via-teal-900/70 to-teal-900/5 transition group-hover:via-teal-900/80" />
                  <span className="absolute left-8 top-8 h-1.5 w-12 rounded-full" style={{ background: p.accent }} />
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-sage-300">{p.kicker}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{p.title}</h3>
                  <p className="mt-4 max-h-0 overflow-hidden text-sage-100 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">
                    {p.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-medium">
                    Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Data story ---------- */}
      <section className="relative overflow-hidden bg-teal-900 py-20 text-white sm:py-28">
        <Brackets className="pointer-events-none absolute -left-40 bottom-0 w-[40rem] opacity-20" strokeWidth={6} />
        <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              light
              eyebrow="Data story"
              title="Access is rising. The gender gap isn't closing fast enough."
              intro="Account ownership in Ethiopia more than doubled in a decade — but women remain about 15 percentage points behind men. Closing that gap is central to our work on digital finance, insurance and capital markets."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/impact" variant="yellow">
                Explore the data
              </ButtonLink>
              <ButtonLink href="/board-ready" variant="ghost">
                Women in leadership
              </ButtonLink>
            </div>
          </div>
          <Reveal className="rounded-[2rem] bg-teal-800/70 p-6 ring-1 ring-white/10 sm:p-8">
            <p className="text-sm font-medium text-sage-200">Account ownership, % of adults (15+)</p>
            <div className="mt-4">
              <AccountOwnershipChart dark />
            </div>
            <a href={sources.findex.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-xs text-sage-300 hover:text-white">
              Source: {sources.findex.label} <ArrowUpRight className="size-3" />
            </a>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Outcomes ---------- */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Outcomes" title={<T k="home.outcomes" />} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((o, i) => (
              <Reveal key={o.title} delay={i * 90} className="group rounded-3xl border border-sage-200 p-7 transition hover:-translate-y-1 hover:border-transparent hover:bg-teal-700 hover:text-white hover:shadow-xl">
                <span className="grid size-14 place-items-center rounded-2xl bg-sage-100 text-teal-700 transition group-hover:bg-white/15 group-hover:text-flag-yellow">
                  <OutcomeIcon name={o.icon} className="size-7" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-teal-900 group-hover:text-white">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-muted group-hover:text-sage-100">{o.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Board Ready Women ---------- */}
      <section className="overflow-hidden bg-paper py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Featured programme"
              title="Board Ready Women"
              intro={`With IFC, we have delivered three rounds of corporate governance and ESG training for women professionals preparing for board seats. Meet the ${cohort.length} leaders of our cohort.`}
            />
            <ul className="mt-8 space-y-3 text-ink">
              {["Corporate governance best practice", "Board roles, responsibilities and decision-making", "ESG principles for responsible leadership"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="h-1 w-6 rounded-full bg-flag-yellow" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/board-ready">Meet the cohort</ButtonLink>
            </div>
          </div>
          <Reveal>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {cohort.slice(0, 15).map((m, i) => (
                <div key={m.name} className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-sage-200 ${i % 2 ? "translate-y-6" : ""} ${i >= 12 ? "max-sm:hidden" : ""}`}>
                  <Image src={m.image} alt={m.name} fill sizes="(min-width: 1024px) 10vw, 25vw" className="object-cover object-top grayscale transition duration-500 hover:grayscale-0" />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- Newsroom ---------- */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={<T k="nav.newsroom" />}
            title={<T k="home.insights" />}
            action={
              <ButtonLink href="/newsroom" variant="secondary">
                <T k="cta.viewall" />
              </ButtonLink>
            }
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-3">
              <PostCard post={featured} featured />
            </Reveal>
            {rest.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Resources ---------- */}
      <section className="bg-sage-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={<T k="nav.resources" />}
            title={<T k="home.library" />}
            intro="Research, strategies and national policy documents shaping Ethiopia's financial sector."
            action={
              <ButtonLink href="/resources" variant="secondary">
                <T k="cta.library" />
              </ButtonLink>
            }
          />
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {featuredResources.map((r, i) => (
              <Reveal key={r.id} delay={i * 90}>
                <ResourceCard resource={r} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Partners ---------- */}
      <section className="py-20">
        <Container>
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            <T k="home.partners" />
          </h2>
          <div className="mt-10 grid items-center gap-10 sm:grid-cols-3">
            {[
              { src: images["funder-gates"], alt: "Gates Foundation", href: "https://www.gatesfoundation.org/", label: "Funder", w: 300, h: 33 },
              { src: images["funder-uk"], alt: "UK International Development", href: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office", label: "Funder", w: 793, h: 235 },
              { src: images["funder-fsdafrica"], alt: "FSD Africa", href: "https://www.fsdafrica.org/", label: "Incubated by", w: 303, h: 205 },
            ].map((f) => (
              <a key={f.alt} href={f.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-muted">{f.label}</span>
                <Image src={f.src} alt={f.alt} width={f.w} height={f.h} className="h-14 w-auto object-contain opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0" />
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Opportunities CTA ---------- */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-green-600 px-8 py-14 text-white sm:px-14">
            <Brackets className="pointer-events-none absolute -right-16 -top-10 w-[30rem] opacity-30" strokeWidth={8} mono="#ffffff" />
            <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="text-balance text-3xl font-semibold sm:text-4xl">Partner with us to deepen Ethiopia&apos;s financial sector.</h2>
                <p className="mt-4 max-w-xl text-lg text-white/85">Explore open jobs, procurement opportunities and calls for applications — and apply online.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/work-with-us" variant="light">
                  <T k="nav.workwithus" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  <T k="nav.contact" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
