"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en, es } from "./dictionaries";

type Locale = "en" | "es";
export type Dictionary = typeof es;

interface LanguageContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      document.documentElement.classList.add('back-transition');
      setTimeout(() => document.documentElement.classList.remove('back-transition'), 100);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0].clientX < 30 || e.touches[0].clientX > window.innerWidth - 30) {
        document.documentElement.classList.add('back-transition');
        setTimeout(() => document.documentElement.classList.remove('back-transition'), 1500); 
      }
    };

    window.addEventListener('popstate', handlePopState, { capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      window.removeEventListener('popstate', handlePopState, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);


  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("portfolio-lang");
    if (stored === "en" || stored === "es") {
      setLanguageState(stored as Locale);
    } else {
      const browserLang = navigator.language.split("-")[0];
      setLanguageState(browserLang === "es" ? "es" : "en");
    }
  }, []);

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-lang", lang);
  };

  const value = {
    language: mounted ? language : "en",
    setLanguage,
    t: mounted ? (language === "es" ? es : en) : en,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
