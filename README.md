# FSD Ethiopia — website redesign prototype

A high-fidelity, fully working prototype of a redesigned [fsdethiopia.org](https://fsdethiopia.org), built with **Next.js 16 (App Router) + Tailwind CSS 4**.
All content was migrated from the live WordPress site; the brand palette (teal `#185454`, green `#237a40`, sage `#8fbfa8`), the Rubik typeface and
the flag-coloured brackets from the FSD Ethiopia logo carry the visual identity.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, sourced headline stats, who we are, three pillars, interactive data story, outcomes, Board Ready Women, newsroom, resource library, funders |
| `/about`, `/team`, `/partners` | Mission & theory of change; staff, regional coordinators and board; funders, incubator and FSD Network |
| `/our-work`, `/our-work/[pillar]` | Financial Inclusion, Access to Capital, Climate Finance — each with a "why it matters" data chart, approach, related research and stories |
| `/impact` | Data dashboard: account ownership by gender, ESX listings, climate finance gap, outcome framework, Power BI/Tableau embed slot |
| `/resources` | Searchable, filterable resource library (topic + type) and newsletter archive |
| `/newsroom`, `/newsroom/[slug]` | All 20 migrated blogs and press releases with filters, article pages, share buttons and `Article` schema |
| `/board-ready` | Board Ready Women programme with the 40-member cohort and profile dialogs |
| `/work-with-us`, `/work-with-us/apply` | Jobs, procurement and calls; online application portal with document upload, consent and AI-screening disclosure |
| `/contact`, `/privacy`, `/accessibility` | Contact form + map; draft privacy notice; accessibility statement |

Every old WordPress URL (e.g. `/about-us-2/`, `/our-work-4/`, `/2026/07/17/<post>/`) permanently redirects to its new route — see `next.config.ts`.

## How it maps to the Terms of Reference

- **Brand & storytelling** — logo brackets as a motif, pillar and impact-story pages, featured programme sections.
- **Bilingual (EN / አማ)** — one-click toggle that persists per visitor and sets `<html lang>`; Noto Sans Ethiopic is loaded for Amharic.
  Interface strings are translated in `src/lib/i18n.ts`; long-form content translations are to be supplied by FSD Ethiopia, as the ToR specifies.
- **Data visualisation** — dependency-free, animated SVG charts with toggles, keyboard focus, text alternatives and a table view.
- **Resource library** — search + topic + type filters.
- **Job & procurement portal** — upload, gender-balance tracking (optional, never used in screening), explicit consent under Proclamation No. 1321/2024, AI-assisted screening disclosed with human review.
- **Newsletter / contact / social** — Mailchimp-ready sign-up with consent, contact form, LinkedIn/X/Facebook links and share buttons.
- **Accessibility (WCAG 2.1 AA)** — skip link, landmarks, visible focus, `aria` states on menus/filters/tabs, native `<dialog>`, reduced-motion support.
- **SEO** — per-page metadata, `NGO` and `Article` JSON-LD, `sitemap.xml`, `robots.txt`, legacy redirects.

## Prototype vs production

Forms (newsletter, contact, applications) validate and show their success states but **send nothing** — each says so on submit.
In production they connect to Mailchimp, the CMS and the screening workflow. Content lives in JSON under `src/content/`, which a headless
CMS (e.g. WordPress REST) can replace without changing components.

## Content & data sources

- Pages, posts, team, cohort, resources and images: migrated from fsdethiopia.org (October 2026). Images were compressed and stored in `public/images/`.
  Cohort members' personal email addresses were intentionally **not** republished.
- Statistics (each links to its source on the page):
  - Account ownership by gender — World Bank Global Findex (2014, 2017, 2021, 2025 waves)
  - telebirr customers — Ethio Telecom FY2025/26 results (TechAfrica News, Jul 2026)
  - ESX listings — esx.et Listed Companies (Oct 2026)
  - Climate finance need vs flows — Climate Policy Initiative, *Landscape of Climate Finance in Ethiopia* (2026)

Fixes over the live site: the FSD Uganda link (previously pointed to FSD Tanzania), the mislinked "Landscape of Climate Finance (2026)" PDF,
duplicated press releases, and publication years/publishers corrected from the report covers.
