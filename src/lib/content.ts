import postsData from "@/content/posts.json";
import teamData from "@/content/team.json";
import cohortData from "@/content/cohort.json";
import resourcesData from "@/content/resources.json";
import siteImages from "@/content/site-images.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  type: "blog" | "press";
  author: string | null;
  excerpt: string;
  image: string | null;
  readingMinutes: number;
  html: string;
};

export type Person = { name: string; role: string; image: string; region?: string };
export type CohortMember = { name: string; image: string; bio: string[] };
export type Topic = "inclusion" | "capital" | "climate" | "gender";
export type Resource = {
  id: string;
  title: string;
  publisher: string;
  year: number | null;
  type: "report" | "strategy" | "brief" | "policy";
  topics: Topic[];
  url: string;
  cover: string;
};

export const posts = postsData as Post[];
export const team = teamData as { staff: Person[]; coordinators: Person[]; board: Person[] };
export const cohort = cohortData as CohortMember[];
export const resources = resourcesData as Resource[];
export const images = siteImages as Record<string, string>;

export const site = {
  name: "FSD Ethiopia",
  legalName: "Financial Sector Deepening Ethiopia",
  url: "https://fsdethiopia.org",
  email: "comms@fsdethiopia.org",
  bidsEmail: "bids@fsdethiopia.org",
  phone: "+251 993 969 696",
  phoneHref: "tel:+251993969696",
  hours: "Mon – Fri, 8:30 – 17:00",
  address: ["6th Floor, Giant Eagle Building", "Mexico Square, Roosevelt St.", "Next to Sudan Embassy, Addis Ababa"],
  mapEmbed: "https://maps.google.com/maps?q=2P4V%2B428%20Addis%20Ababa&t=m&z=15&output=embed&iwloc=near",
  video: "https://www.youtube.com/watch?v=p5tktsT-F6k",
  social: {
    linkedin: "https://www.linkedin.com/company/fsd-ethiopia/",
    facebook: "https://www.facebook.com/FSDEthiopia",
    x: "https://twitter.com/FSDEthiopia",
  },
};

export const topicLabels: Record<Topic, string> = {
  inclusion: "Financial Inclusion",
  capital: "Access to Capital",
  climate: "Climate Finance",
  gender: "Gender & Inclusion",
};

export const typeLabels: Record<Resource["type"], string> = {
  report: "Research report",
  strategy: "Strategy & roadmap",
  brief: "Brief",
  policy: "National policy",
};

export type Pillar = {
  slug: "financial-inclusion" | "access-to-capital" | "climate-finance";
  topic: Topic;
  title: string;
  kicker: string;
  summary: string;
  intro: string;
  why: string[];
  approach: { title: string; body: string }[];
  image: string;
  wideImage: string;
  accent: string;
};

export const pillars: Pillar[] = [
  {
    slug: "financial-inclusion",
    topic: "inclusion",
    title: "Financial Inclusion",
    kicker: "Access, usage and quality",
    summary:
      "Driving access to, and meaningful use of, quality financial services for the individuals, households and businesses that formal finance has historically left behind.",
    intro:
      "Increased access to saving, borrowing and investment opportunities drives job creation, household incomes and enterprise growth. We work so that historically marginalised and underserved Ethiopians can overcome financial barriers and reach their full potential.",
    why: [
      "Millions of Ethiopians are still excluded from financial services because of underdeveloped infrastructure and risk-averse lending. Fewer than half of adults hold an account, formal saving and credit remain low, and a small insurance market reaches only a fraction of the population.",
      "Women are disproportionately affected, with a persistent gender gap in access to accounts, savings and credit. Closing these gaps requires a better policy environment, more responsive providers, and informed customers — especially women, youth and entrepreneurs.",
    ],
    approach: [
      {
        title: "Expanding basic financial access",
        body: "Building capacity for traditional and digital innovation so every consumer can save, transact, borrow, invest and safeguard assets easily and responsibly.",
      },
      {
        title: "Supporting financial sector reform",
        body: "Helping realise the Government of Ethiopia's reform agenda, which prioritises the digitisation and liberalisation of the financial sector.",
      },
      {
        title: "Deepening financial services",
        body: "Encouraging public–private collaboration on innovative markets and products designed around the needs of underserved and marginalised communities.",
      },
      {
        title: "Building an inclusive insurance sector",
        body: "Expanding insurance coverage to underserved consumers and sharing knowledge that helps households and businesses manage and mitigate financial risk.",
      },
    ],
    image: images["pillar-inclusion"],
    wideImage: images["inclusion-wide"],
    accent: "var(--color-flag-green)",
  },
  {
    slug: "access-to-capital",
    topic: "capital",
    title: "Access to Capital",
    kicker: "Capital markets & SME finance",
    summary:
      "Partnering with industry to widen access to long-term finance and working capital, and to build an equitable, efficient capital market for Ethiopia.",
    intro:
      "We work closely with key industry actors to increase access to long-term financing and working capital, and to design equitable and efficient capital systems so that diverse people can build strong businesses, communities and economies.",
    why: [
      "Access to finance creates jobs, lifts productivity and reduces poverty. Yet Ethiopian enterprises face limited risk capital for early-stage ventures, collateral-heavy lending and historic restrictions on investment.",
      "Addressing this takes government, the private sector and development partners working together to build a resilient capital market that responds to Ethiopia's socio-economic challenges and enables local ownership of the country's economic future.",
    ],
    approach: [
      {
        title: "Strengthening capital markets regulation",
        body: "Technical assistance to develop capital markets and to review the policies, guidelines and regulations that enable new markets, products and structures.",
      },
      {
        title: "Developing the capital markets ecosystem",
        body: "Supporting well-functioning market infrastructure — from the securities exchange to credit enhancement facilities.",
      },
      {
        title: "Enhancing SME access to capital",
        body: "Expanding financing options for micro, small and medium enterprises through equity, bonds, microloans and working capital.",
      },
    ],
    image: images["pillar-capital"],
    wideImage: images["capital-wide"],
    accent: "var(--color-flag-yellow)",
  },
  {
    slug: "climate-finance",
    topic: "climate",
    title: "Climate Finance",
    kicker: "Green, resilient growth",
    summary:
      "Mobilising domestic and international capital for adaptation and mitigation, and building financial infrastructure that can withstand the impacts of climate change.",
    intro:
      "Our climate finance interventions build environmental resilience by mobilising capital for adaptation and mitigation projects. We respond to the needs of government, businesses, households and vulnerable communities to develop sustainable financial infrastructure.",
    why: [
      "Ethiopia contributes a very small share of global emissions, yet it is highly exposed to drought and flooding that threaten food and water security, force internal migration and destroy livelihoods.",
      "Climate finance protects vulnerable communities, reduces poverty and strengthens local economies. Investing in adaptation is more sustainable than responding to extreme weather after the fact, and green technologies create jobs while reducing exposure to environmental threats.",
    ],
    approach: [
      {
        title: "Advancing climate finance products",
        body: "Supporting green bonds, carbon credits and insurance products that channel investment into green public and private sector projects.",
      },
      {
        title: "Mapping the climate finance landscape",
        body: "Producing evidence on where climate finance flows today — and where the gaps are — to guide policymakers and investors.",
      },
      {
        title: "Convening the market",
        body: "Bringing regulators, financiers and partners together through the annual Climate Finance Summit to agree practical next steps.",
      },
    ],
    image: images["pillar-climate"],
    wideImage: images["climate-wide"],
    accent: "var(--color-flag-red)",
  },
];

export const tools = [
  {
    title: "Technical Assistance",
    body: "Tailored expertise for regulators, policymakers and market actors to design and implement reforms.",
    image: images["tool-ta"],
    href: "/our-work",
  },
  {
    title: "Research & Data",
    body: "Evidence, market diagnostics and data that inform decisions across Ethiopia's financial sector.",
    image: images["tool-research"],
    href: "/resources",
  },
  {
    title: "Convening & Advocacy",
    body: "Bringing government, industry and partners together to align on shared priorities and action.",
    image: images["tool-convening"],
    href: "/newsroom",
  },
];

export const outcomes = [
  {
    title: "Poverty Reduction",
    body: "More households able to save, borrow, insure and invest — building resilience against shocks.",
    icon: "home",
  },
  {
    title: "Gender & Social Inclusion",
    body: "Closing the gender gap in finance and opening leadership pathways for women.",
    icon: "users",
  },
  {
    title: "Quality Economic Growth",
    body: "Deeper capital markets and SME finance that create jobs and drive productivity.",
    icon: "trend",
  },
  {
    title: "Resilient Green Economy",
    body: "Capital mobilised for adaptation and mitigation in a climate-exposed economy.",
    icon: "leaf",
  },
] as const;

/** Sourced indicators used in the data stories. Keep each figure tied to its source. */
export const sources = {
  findex: { label: "World Bank Global Findex Database", url: "https://www.worldbank.org/en/publication/globalfindex" },
  telebirr: {
    label: "Ethio Telecom FY2025/26 results, via TechAfrica News (Jul 2026)",
    url: "https://techafricanews.com/2026/07/23/ethio-telecom-reports-record-revenue-growth-tops-90-million-customers/",
  },
  esx: { label: "Ethiopian Securities Exchange — Listed Companies", url: "https://esx.et/listed-companies/" },
  cpi: {
    label: "Climate Policy Initiative, Landscape of Climate Finance in Ethiopia (2026)",
    url: "https://www.climatepolicyinitiative.org/publication/landscape-of-climate-finance-in-ethiopia-2/",
  },
  population: { label: "World Bank, Population total (SP.POP.TOTL)", url: "https://data.worldbank.org/indicator/SP.POP.TOTL?locations=ET" },
};

export const accountOwnership = [
  { wave: "2014", total: 21.8, men: 22.6, women: 21.0 },
  { wave: "2017", total: 34.8, men: 40.9, women: 29.1 },
  { wave: "2021", total: 46.5, men: 54.7, women: 38.7 },
  { wave: "2025", total: 48.8, men: 56.5, women: 41.6 },
];

export const esxListings = [
  { company: "Wegagen Bank", ticker: "WGBX", date: "2025-01-10" },
  { company: "Gadaa Bank", ticker: "GDAB", date: "2025-06-13" },
  { company: "Awash Bank", ticker: "AWAB", date: "2026-04-23" },
  { company: "Ethio Telecom", ticker: "TELE", date: "2026-05-26" },
  { company: "Abay Bank", ticker: "ABAYB", date: "2026-06-25" },
  { company: "Bank of Abyssinia", ticker: "BOAX", date: "2026-07-28" },
  { company: "Sidama Bank", ticker: "SIDAX", date: "2026-09-28" },
];

export const climateGap = { needPerYear: 10.6, flowsPerYear: 2.3 };

export const headlineStats = [
  {
    value: 48.8,
    suffix: "%",
    decimals: 1,
    label: "of Ethiopian adults own a financial account",
    source: sources.findex,
    note: "Global Findex 2025",
  },
  {
    value: 15,
    suffix: " pts",
    decimals: 0,
    label: "gender gap in account ownership (57% of men vs 42% of women)",
    source: sources.findex,
    note: "Global Findex 2025",
  },
  {
    value: 60.6,
    suffix: "M",
    decimals: 1,
    label: "telebirr mobile money customers",
    source: sources.telebirr,
    note: "Ethio Telecom, FY2025/26",
  },
  {
    value: 7,
    suffix: "",
    decimals: 0,
    label: "companies listed on the Ethiopian Securities Exchange since its January 2025 launch",
    source: sources.esx,
    note: "ESX, October 2026",
  },
];

/** Opportunities — deadlines are compared against the viewer's clock on the client. */
export const jobs = [
  {
    id: "internship-program-support",
    title: "Internship – Program Support",
    summary: "A three-month internship for a dynamic and motivated individual to support FSD Ethiopia's programme team.",
    deadline: "2026-10-02",
    doc: "https://fsdethiopia.org/wp-content/uploads/2026/09/2026-9-22-FSDE-COMMUNICATION-FSDE-Internship-Program-Support-2.pdf",
    docLabel: "Full job description",
    kind: "Job",
  },
];

export const procurements = [
  {
    id: "rfp-investor-relations",
    title: "Request for Proposal — Investor Relations Capacity",
    summary:
      "Qualified consultants or consortiums to strengthen investor relations capacity among listed, OTC-traded and prospective public companies — covering IR tools, disclosure, investor engagement, ESG communication and market-wide IR mechanisms.",
    deadline: "2026-10-14",
    doc: "https://fsdethiopia.org/wp-content/uploads/2026/09/2026-9-30-FSDE-COMMUNICATION-TOR-04.pdf",
    docLabel: "Terms of Reference",
    kind: "RFP",
  },
  {
    id: "tor-website-redesign",
    title: "Terms of Reference — Website Redesign",
    summary:
      "Qualified firms to redesign and redevelop the FSD Ethiopia website into a modern, secure, accessible and user-focused digital platform.",
    deadline: "2026-10-16",
    doc: "https://fsdethiopia.org/wp-content/uploads/2026/10/2026-10-05-FSDE-COMMUNICATION-TOR-Website-Redesign-for-FSD-Ethiopia.pdf",
    docLabel: "Terms of Reference",
    kind: "ToR",
  },
];

export const newsletters = [
  { title: "Vol. 1 · Edition 3", period: "Feb / Mar 2024", url: "https://fsdethiopia.org/wp-content/pdf/News%20letter%20v5%20%281%2900.pdf" },
  {
    title: "Vol. 1 · Edition 2",
    period: "January 2024",
    url: "https://fsdethiopia.org/wp-content/pdf/NEWSLETTER%20-%20FSDE%20Vol.1%20Edition%202%20January%202024..pdf",
  },
  { title: "Vol. 1 · Edition 1", period: "Oct / Nov 2023", url: "https://fsdethiopia.org/wp-content/pdf/Spotlight%20Oct-Nov%202023.pdf" },
];

export const fsdNetwork = [
  { name: "FSD Africa", url: "https://fsdafrica.org/" },
  { name: "FSD Kenya", url: "https://www.fsdkenya.org/" },
  { name: "FSD Tanzania", url: "https://www.fsdt.or.tz/" },
  { name: "FSD Uganda", url: "https://fsduganda.or.ug/" },
  { name: "Access to Finance Rwanda", url: "https://afr.rw/" },
  { name: "EFInA (Nigeria)", url: "https://efina.org.ng/" },
  { name: "FinMark Trust", url: "https://finmark.org.za/" },
];

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { ...opts, timeZone: "UTC" });
}

export function postsFor(topic: Topic) {
  const keywords: Record<Topic, RegExp> = {
    inclusion: /inclusion|digital|payment|insurance|bimalab|open finance|dpi|mobile|women/i,
    capital: /capital market|esx|exchange|securities|rulebook|investor|green investment/i,
    climate: /climate|green|cop32|summit/i,
    gender: /women|gender|board/i,
  };
  return posts.filter((p) => keywords[topic].test(p.title));
}
