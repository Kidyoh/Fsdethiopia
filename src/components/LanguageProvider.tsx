"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dict, type DictKey, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "fsde-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string };
const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => dict[k].en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore the visitor's saved choice after hydration
      if (saved === "am" || saved === "en") setLangState(saved);
    } catch {
      /* storage unavailable: stay on English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback((k: DictKey) => dict[k][lang] || dict[k].en, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Render a dictionary string in the active language. */
export function T({ k }: { k: DictKey }) {
  const { t } = useLanguage();
  return <>{t(k)}</>;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div role="group" aria-label="Language / ቋንቋ" className={`inline-flex rounded-full border border-current/25 p-0.5 text-xs font-medium ${className}`}>
      {(
        [
          ["en", "EN", "English"],
          ["am", "አማ", "አማርኛ"],
        ] as const
      ).map(([code, short, full]) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          aria-label={full}
          onClick={() => setLang(code)}
          className={`rounded-full px-3 py-1 transition-colors ${
            lang === code ? "bg-flag-yellow text-teal-900" : "hover:bg-white/10"
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  );
}

export function LanguageNotice() {
  const { lang, t } = useLanguage();
  if (lang !== "am") return null;
  return (
    <div role="status" className="bg-flag-yellow px-4 py-2 text-center text-sm text-teal-900">
      {t("lang.notice")}
    </div>
  );
}
