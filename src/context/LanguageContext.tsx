"use client";
import React, { createContext, useContext, useState } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  dir: "rtl" | "ltr";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  dir: "rtl",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  const setLang = (l: Language) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
