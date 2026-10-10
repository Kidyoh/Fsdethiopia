import Image from "next/image";
import Link from "next/link";
import { Brackets, Tick } from "@/components/Brackets";
import { ArrowRight, ArrowUpRight, Download } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { formatDate, topicLabels, typeLabels, type Post, type Resource } from "@/lib/content";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] ${light ? "text-flag-yellow" : "text-green-600"}`}>
      <Tick className="h-3 w-8" color={light ? "var(--color-flag-yellow)" : "var(--color-green-600)"} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  action,
  className = "",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  light?: boolean;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2 className={`mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-teal-900"}`}>
          {title}
        </h2>
        {intro && <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${light ? "text-sage-200" : "text-muted"}`}>{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost" | "yellow";
  external?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-teal-700 text-white hover:bg-teal-800",
    secondary: "border border-teal-700/30 text-teal-800 hover:border-teal-700 hover:bg-teal-700 hover:text-white",
    light: "bg-white text-teal-900 hover:bg-sage-100",
    ghost: "border border-white/30 text-white hover:bg-white hover:text-teal-900",
    yellow: "bg-flag-yellow text-teal-900 hover:brightness-95",
  }[variant];
  const cls = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition ${styles} ${className}`;
  const icon = external ? (
    <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  ) : (
    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      {icon}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

/** Banner used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-teal-900 text-white">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-teal-950 via-teal-900/90 to-teal-900/40" />
        </>
      )}
      <Brackets className="pointer-events-none absolute -right-24 top-1/2 -z-10 w-[38rem] -translate-y-1/2 opacity-40 max-md:hidden" strokeWidth={7} />
      <Container className="py-20 sm:py-24 lg:py-28">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sage-200 sm:text-xl">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-sage-200 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/10 ${featured ? "lg:flex-row" : ""}`}>
      <div className={`relative overflow-hidden bg-sage-100 ${featured ? "aspect-[16/10] lg:aspect-auto lg:w-3/5" : "aspect-[16/10]"}`}>
        {post.image && (
          <Image
            src={post.image}
            alt=""
            fill
            sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover object-left transition duration-700 group-hover:scale-105"
          />
        )}
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${post.type === "blog" ? "bg-flag-yellow text-teal-900" : "bg-teal-700 text-white"}`}>
          {post.type === "blog" ? "Insight" : "Press release"}
        </span>
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-10" : ""}`}>
        <p className="text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.author && <> · {post.author}</>} · {post.readingMinutes} min read
        </p>
        <h3 className={`mt-3 font-semibold leading-snug text-teal-900 ${featured ? "text-2xl lg:text-3xl" : "text-lg"}`}>
          <Link href={`/newsroom/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        {featured && <p className="mt-4 line-clamp-4 text-muted">{post.excerpt}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-green-600">
          Read {post.type === "blog" ? "insight" : "story"} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sage-100 ring-1 ring-sage-200">
        <Image
          src={resource.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-full bg-white/95 py-2 text-sm font-medium text-teal-900 opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <Download className="size-4" /> PDF
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-green-600">
        {typeLabels[resource.type]}
        {resource.year && <> · {resource.year}</>}
      </p>
      <h3 className="mt-2 font-semibold leading-snug text-teal-900">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
          {resource.title}
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>
      </h3>
      <p className="mt-1 text-sm text-muted">{resource.publisher}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {resource.topics.map((t) => (
          <span key={t} className="rounded-full bg-sage-100 px-2.5 py-0.5 text-xs text-teal-800">
            {topicLabels[t]}
          </span>
        ))}
      </div>
    </article>
  );
}
