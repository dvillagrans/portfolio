"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect } from "react";

export function HtmlLang() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
