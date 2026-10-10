import type { Metadata, Viewport } from "next";
import { Noto_Sans_Ethiopic, Rubik } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { site } from "@/lib/content";
import "./globals.css";

const rubik = Rubik({ variable: "--font-rubik", subsets: ["latin", "latin-ext"], display: "swap" });
const ethiopic = Noto_Sans_Ethiopic({ variable: "--font-ethiopic", subsets: ["ethiopic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "FSD Ethiopia — Building financial markets that work for every Ethiopian",
    template: "%s · FSD Ethiopia",
  },
  description:
    "FSD Ethiopia supports the development of accessible, inclusive and sustainable financial markets for economic growth and human development in Ethiopia.",
  openGraph: {
    type: "website",
    siteName: "FSD Ethiopia",
    locale: "en_GB",
    alternateLocale: ["am_ET"],
  },
  twitter: { card: "summary_large_image", site: "@FSDEthiopia" },
};

export const viewport: Viewport = {
  themeColor: "#185454",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/images/site/logo-dark.png`,
  foundingDate: "2022",
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "6th Floor, Giant Eagle Building, Mexico Square, Roosevelt St.",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  sameAs: Object.values(site.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rubik.variable} ${ethiopic.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <LanguageProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
