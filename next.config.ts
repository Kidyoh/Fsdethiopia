import type { NextConfig } from "next";

// Old WordPress URLs → new routes, so existing links and search rankings survive the migration.
const legacy: [string, string][] = [
  ["/about-us-2", "/about"],
  ["/our-team", "/team"],
  ["/our-team-demo", "/team"],
  ["/our-funders-and-incubator", "/partners"],
  ["/funders", "/partners"],
  ["/our-work-3", "/our-work/financial-inclusion"],
  ["/our-work-2", "/our-work/access-to-capital"],
  ["/our-work-4", "/our-work/climate-finance"],
  ["/why-financial-inclusion-matters", "/our-work/financial-inclusion"],
  ["/why-access-to-capital-matters", "/our-work/access-to-capital"],
  ["/why-climate-finance-matters", "/our-work/climate-finance"],
  ["/outcomes", "/impact"],
  ["/resource-center", "/resources"],
  ["/newsletters", "/resources#newsletters"],
  ["/blog-left-sidebar", "/newsroom"],
  ["/blogs", "/newsroom"],
  ["/our-events", "/newsroom"],
  ["/latest-events", "/newsroom"],
  ["/events", "/newsroom"],
  ["/our-press-release", "/newsroom"],
  ["/press-releases", "/newsroom"],
  ["/cohort", "/board-ready"],
  ["/about-our-board-ready-program", "/board-ready"],
  ["/work-with-us-2", "/work-with-us#jobs"],
  ["/procurement-opportunities", "/work-with-us#procurement"],
  ["/call-for-applications", "/work-with-us#calls"],
  ["/contact-us-2", "/contact"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Post permalinks: /2026/07/21/some-post/ → /newsroom/some-post
      { source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug", destination: "/newsroom/:slug", permanent: true },
      { source: "/category/:cat", destination: "/newsroom", permanent: true },
    ];
  },
};

export default nextConfig;
