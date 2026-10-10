import type { MetadataRoute } from "next";
import { pillars, posts, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/team",
    "/partners",
    "/our-work",
    ...pillars.map((p) => `/our-work/${p.slug}`),
    "/board-ready",
    "/impact",
    "/resources",
    "/newsroom",
    "/work-with-us",
    "/work-with-us/apply",
    "/contact",
    "/privacy",
    "/accessibility",
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...posts.map((p) => ({ url: `${site.url}/newsroom/${p.slug}`, lastModified: p.date })),
  ];
}
