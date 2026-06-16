"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { EyeNetPipelineFlow } from "./eyenetPipelineShared";

export function EyeNetPipelineViz() {
  const { language } = useLanguage();
  return <EyeNetPipelineFlow compact isEn={language === "en"} />;
}
