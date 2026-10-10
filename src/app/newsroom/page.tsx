import type { Metadata } from "next";
import { LinkedIn, XLogo } from "@/components/Icons";
import { NewsroomList } from "@/components/NewsroomList";
import { Container, PageHero } from "@/components/ui";
import { posts, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Insights, blogs, press releases and event stories from FSD Ethiopia.",
};

export default function NewsroomPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Insights, events and announcements."
        intro="Analysis from our experts, highlights from our convenings, and official news from FSD Ethiopia."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white hover:text-teal-900">
            <LinkedIn className="size-4" /> Follow on LinkedIn
          </a>
          <a href={site.social.x} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white hover:text-teal-900">
            <XLogo className="size-4" /> Follow on X
          </a>
        </div>
      </PageHero>
      <section className="py-16 sm:py-20">
        <Container>
          <NewsroomList posts={posts} />
        </Container>
      </section>
    </>
  );
}
