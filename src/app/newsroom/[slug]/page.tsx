import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Facebook, LinkedIn, XLogo } from "@/components/Icons";
import { Container, PostCard } from "@/components/ui";
import { formatDate, posts, site } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/newsroom/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date, images: post.image ? [post.image] : undefined },
  };
}

export default async function PostPage({ params }: PageProps<"/newsroom/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug && p.type === post.type).slice(0, 3);
  const url = encodeURIComponent(`${site.url}/newsroom/${post.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@type": post.type === "blog" ? "BlogPosting" : "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article>
        <header className="bg-paper pt-12 sm:pt-16">
          <Container className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/newsroom" className="hover:text-teal-700">
                Newsroom
              </Link>{" "}
              / <span>{post.type === "blog" ? "Insights" : "Press releases"}</span>
            </nav>
            <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight text-teal-900 sm:text-5xl">{post.title}</h1>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              {post.author && <span className="font-medium text-teal-900">By {post.author}</span>}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>· {post.readingMinutes} min read</span>
            </p>
          </Container>
          {post.image && (
            <Container className="mt-10 max-w-5xl">
              <div className="relative aspect-[16/9] translate-y-12 overflow-hidden rounded-[2rem] bg-sage-100 shadow-2xl shadow-teal-900/10">
                <Image src={post.image} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
              </div>
            </Container>
          )}
        </header>

        <Container className={`grid max-w-5xl gap-10 pb-20 lg:grid-cols-[3.5rem_1fr] ${post.image ? "pt-24" : "pt-12"}`}>
          <div className="prose-fsd mx-auto w-full max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />
          <aside aria-label="Share" className="flex gap-3 lg:sticky lg:top-28 lg:order-first lg:h-fit lg:flex-col">
            {[
              [`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, LinkedIn, "LinkedIn"],
              [`https://twitter.com/intent/tweet?url=${url}`, XLogo, "X"],
              [`https://www.facebook.com/sharer/sharer.php?u=${url}`, Facebook, "Facebook"],
            ].map(([href, Icon, label]) => {
              const I = Icon as typeof LinkedIn;
              return (
                <a
                  key={label as string}
                  href={href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Share on ${label}`}
                  className="grid size-11 place-items-center rounded-full bg-sage-100 text-teal-800 transition hover:bg-teal-700 hover:text-white"
                >
                  <I className="size-4" />
                </a>
              );
            })}
          </aside>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="bg-sage-50 py-20">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl font-semibold text-teal-900">More {post.type === "blog" ? "insights" : "news"}</h2>
              <Link href="/newsroom" className="inline-flex items-center gap-2 font-medium text-green-600">
                All stories <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {more.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
