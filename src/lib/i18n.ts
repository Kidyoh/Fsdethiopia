/**
 * Interface strings in English and Amharic.
 * Per the ToR, FSD Ethiopia supplies the translated long-form content; this dictionary
 * covers navigation and interface chrome so the language toggle works end to end.
 */
export type Lang = "en" | "am";

export const dict = {
  "skip": { en: "Skip to main content", am: "ወደ ዋናው ይዘት ይለፉ" },
  "nav.home": { en: "Home", am: "መነሻ" },
  "nav.who": { en: "Who we are", am: "እኛ ማን ነን" },
  "nav.about": { en: "About us", am: "ስለ እኛ" },
  "nav.team": { en: "Our team", am: "ቡድናችን" },
  "nav.partners": { en: "Funders & partners", am: "ለጋሾችና አጋሮች" },
  "nav.work": { en: "Our work", am: "ሥራዎቻችን" },
  "nav.inclusion": { en: "Financial Inclusion", am: "የፋይናንስ አካታችነት" },
  "nav.capital": { en: "Access to Capital", am: "የካፒታል ተደራሽነት" },
  "nav.climate": { en: "Climate Finance", am: "የአየር ንብረት ፋይናንስ" },
  "nav.boardready": { en: "Board Ready Women", am: "ለቦርድ ዝግጁ ሴቶች" },
  "nav.impact": { en: "Impact & data", am: "ተጽዕኖና መረጃ" },
  "nav.resources": { en: "Resources", am: "የመረጃ ማዕከል" },
  "nav.newsroom": { en: "Newsroom", am: "ዜና" },
  "nav.workwithus": { en: "Work with us", am: "ከእኛ ጋር ይሥሩ" },
  "nav.contact": { en: "Contact", am: "ያግኙን" },
  "nav.menu": { en: "Menu", am: "ማውጫ" },
  "nav.close": { en: "Close", am: "ዝጋ" },

  "hero.eyebrow": { en: "Financial Sector Deepening Ethiopia", am: "የፋይናንስ ዘርፍ ማጠናከሪያ ኢትዮጵያ" },
  "hero.title.1": { en: "Building financial markets", am: "ለሁሉም ኢትዮጵያዊ" },
  "hero.title.2": { en: "that work for every Ethiopian.", am: "የሚሠሩ የፋይናንስ ገበያዎችን እንገነባለን።" },
  "hero.body": {
    en: "We identify the root causes of financial system failures and work with government, regulators and market actors to build an accessible, inclusive and sustainable financial sector.",
    am: "የፋይናንስ ሥርዓት ችግሮችን መንስኤ በመለየት ከመንግሥት፣ ከተቆጣጣሪ አካላትና ከገበያ ተዋናዮች ጋር ተደራሽ፣ አካታችና ዘላቂ የፋይናንስ ዘርፍ ለመገንባት እንሠራለን።",
  },
  "cta.explore": { en: "Explore our work", am: "ሥራዎቻችንን ይመልከቱ" },
  "cta.library": { en: "Resource library", am: "የመረጃ ቤተ-መጻሕፍት" },
  "cta.readmore": { en: "Read more", am: "ተጨማሪ ያንብቡ" },
  "cta.viewall": { en: "View all", am: "ሁሉንም ይመልከቱ" },
  "cta.subscribe": { en: "Subscribe", am: "ይመዝገቡ" },
  "cta.apply": { en: "Apply now", am: "አሁን ያመልክቱ" },
  "cta.download": { en: "Download", am: "ያውርዱ" },
  "cta.watch": { en: "Watch our story", am: "ታሪካችንን ይመልከቱ" },

  "home.numbers": { en: "Ethiopia's financial sector in numbers", am: "የኢትዮጵያ የፋይናንስ ዘርፍ በቁጥር" },
  "home.who": { en: "Who we are", am: "እኛ ማን ነን" },
  "home.pillars": { en: "Three pillars. One financial system.", am: "ሦስት ምሰሶዎች። አንድ የፋይናንስ ሥርዓት።" },
  "home.outcomes": { en: "The change we work towards", am: "የምንሠራለት ለውጥ" },
  "home.insights": { en: "Latest insights & news", am: "የቅርብ ጊዜ ዜናዎችና ትንታኔዎች" },
  "home.library": { en: "From the resource library", am: "ከመረጃ ቤተ-መጻሕፍቱ" },
  "home.partners": { en: "Funded and supported by", am: "የገንዘብ ድጋፍ የሚያደርጉልን" },

  "footer.newsletter": { en: "Get our insights in your inbox", am: "ትንታኔዎቻችንን በኢሜይልዎ ያግኙ" },
  "footer.email": { en: "Email address", am: "የኢሜይል አድራሻ" },
  "footer.rights": { en: "All rights reserved.", am: "መብቱ በሕግ የተጠበቀ ነው።" },
  "footer.network": { en: "Member of the FSD Network", am: "የFSD ኔትወርክ አባል" },
  "footer.privacy": { en: "Privacy & data protection", am: "ግላዊነትና የመረጃ ጥበቃ" },
  "footer.accessibility": { en: "Accessibility", am: "ተደራሽነት" },

  "lang.notice": {
    en: "",
    am: "የአማርኛ ገጽታ ቅድመ-እይታ — ሙሉ የይዘት ትርጉሞች በFSD ኢትዮጵያ ይቀርባሉ።",
  },
} as const satisfies Record<string, Record<Lang, string>>;

export type DictKey = keyof typeof dict;
