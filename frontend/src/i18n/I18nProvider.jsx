import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { dictionaries } from "@/i18n/translations";

const I18nContext = createContext(null);

const STORAGE_KEY = "omera.lang";
const SUPPORTED = ["en", "ar"];

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState("en");

  // Load saved preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) {
        setLangState(saved);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Sync html dir + lang
  useEffect(() => {
    const dir = dictionaries[lang].meta.dir;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // ignore
    }
  }, []);

  const value = useMemo(() => {
    const t = dictionaries[lang];
    return { lang, setLang, t, dir: t.meta.dir, isRTL: t.meta.dir === "rtl" };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
