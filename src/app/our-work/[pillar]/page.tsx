import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AccountOwnershipChart, ClimateGapChart, EsxTimeline } from "@/components/charts";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, PageHero, PostCard, ResourceCard, SectionHeading } from "@/components/ui";
import { pillars, postsFor, resources, sources } from "@/lib/content";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/our-work/[pillar]">): Promise<Metadata> {
  const { pillar } = await params;
  const p = pillars.find((x) => x.slug === pillar);
  return p ? { title: p.title, description: p.summary } : {};
}

function PillarData({ slug }: { slug: string }) {
  if (slug === "financial-inclusion") {
    return (
      <div className="rounded-[2rem] bg-white p-6 ring-1 ring-sage-200 sm:p-8">
        <p className="font-semibold text-teal-900">Account ownership, % of adults (15+)</p>
        <div className="mt-4">
          <AccountOwnershipChart />
        </div>
        <a href={sources.findex.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-muted hover:text-teal-700">
          Source: {sources.findex.label} <ArrowUpRight className="size-3" />
        </a>
      </div>
    );
  }
  if (slug === "access-to-capital") {
    return (
      <div className="rounded-[2rem] bg-white p-6 ring-1 ring-sage-200 sm:p-8">
        <p className="font-semibold text-teal-900">Listings on the Ethiopian Securities Exchange since launch (Jan 2025)</p>
        <div className="mt-6">
          <EsxTimeline />
        </div>
        <a href={sources.esx.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-xs text-muted hover:text-teal-700">
          Source: {sources.esx.label} <ArrowUpRight className="size-3" />
        </a>
      </div>
    );
  }
  return (
    <div className="rounded-[2rem] bg-teal-900 p-6 sm:p-8">
      <p className="font-semibold text-white">Ethiopia&apos;s climate finance gap (USD per year)</p>
      <div className="mt-6">
        <ClimateGapChart />
      </div>
      <a href={sources.cpi.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 text-xs text-sage-300 hover:text-white">
        Source: {sources.cpi.label} <ArrowUpRight className="size-3" />
      </a>
    </div>
  );
}

export default async function PillarPage({ params }: PageProps<"/our-work/[pillar]">) {
  const { pillar } = await params;
  const p = pillars.find((x) => x.slug === pillar);
  if (!p) notFound();

  const related = resources.filter((r) => r.topics.includes(p.topic)).slice(0, 4);
  const stories = postsFor(p.topic).slice(0, 3);
  const others = pillars.filter((x) => x.slug !== p.slug);

  return (
    <>
      <PageHero eyebrow={`Our work · ${p.kicker}`} title={p.title} intro={p.intro} image={p.wideImage} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Why it matters" title={`Why ${p.title.toLowerCase()} matters.`} />
            <Reveal className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {p.why.map((para) => (
                <p key={para.slice(0, 20)}>{para}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="lg:sticky lg:top-28">
            <PillarData slug={p.slug} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sage-50 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Our approach" title="Where we focus." />
          <ol className={`mt-14 grid gap-6 md:grid-cols-2 ${p.approach.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {p.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 90} className="relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-sage-200">
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: p.accent }} />
                <span className="text-sm font-semibold text-green-600">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-teal-900">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Evidence"
              title="Related research & policy."
              action={<ButtonLink href="/resources" variant="secondary">Full library</ButtonLink>}
            />
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
              {related.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {stories.length > 0 && (
        <section className="bg-paper py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Stories" title="In the field." action={<ButtonLink href="/newsroom" variant="secondary">Newsroom</ButtonLink>} />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {stories.map((s) => (
                <PostCard key={s.slug} post={s} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16">
        <Container className="grid gap-4 md:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/our-work/${o.slug}`} className="group relative flex items-center justify-between overflow-hidden rounded-3xl bg-teal-900 p-8 text-white">
              <Image src={o.image} alt="" fill sizes="50vw" className="object-cover opacity-25 transition duration-700 group-hover:scale-105 group-hover:opacity-35" />
              <span className="relative">
                <span className="block text-sm uppercase tracking-[0.2em] text-sage-300">Next pillar</span>
                <span className="mt-1 block text-2xl font-semibold">{o.title}</span>
              </span>
              <ArrowRight className="relative size-6 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}
