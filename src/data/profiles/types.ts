import type { Language } from "@/contexts/i18n-context";

export type PortfolioIconToken =
  | "pipeline"
  | "delivery"
  | "monitoring"
  | "quality"
  | "automation"
  | "dashboard"
  | "insights"
  | "recovery"
  | "ai"
  | "cloud"
  | "data";

export interface LocalizedText {
  en: string;
  es: string;
}

export function resolveText(text: LocalizedText, language: Language): string {
  return text[language] ?? text.es;
}

export type PortfolioLinkType = "primary" | "secondary" | "ghost" | "soft";

export interface PortfolioLink {
  label: LocalizedText;
  href: string;
  type?: PortfolioLinkType;
  description?: LocalizedText;
  target?: "_blank" | "_self";
  icon?: string;
  download?: boolean;
}

export interface PortfolioMetric {
  label: LocalizedText;
  value: LocalizedText;
  description?: LocalizedText;
}

export interface PortfolioHero {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  credentials: LocalizedText;
  badge: LocalizedText;
  persona: LocalizedText;
  photo: string;
  metrics: PortfolioMetric[];
  ctas: PortfolioLink[];
}

export interface PortfolioProblem {
  title: LocalizedText;
  description: LocalizedText;
  metric?: LocalizedText;
}

export interface PortfolioProcessStep {
  icon: PortfolioIconToken;
  title: LocalizedText;
  description: LocalizedText;
  detail: LocalizedText;
}

export interface PortfolioCaseMedia {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
  poster?: string;
}

export interface PortfolioCaseStudy {
  title: LocalizedText;
  category: LocalizedText;
  timeframe: LocalizedText;
  summary: LocalizedText;
  context: LocalizedText;
  action: LocalizedText;
  result: LocalizedText;
  metric: LocalizedText;
  tags: string[];
  proof: PortfolioLink[];
  media: PortfolioCaseMedia;
  highlight?: boolean;
  quickRead?: boolean;
  codeSnippet?: {
    language: string;
    code: string;
    file: string;
  };
}

export interface PortfolioToolboxGroup {
  title: LocalizedText;
  items: string[];
}

export interface PortfolioGuarantee {
  label: LocalizedText;
  value: LocalizedText;
  description: LocalizedText;
}

export interface PortfolioTestimonial {
  quote: LocalizedText;
  author: LocalizedText;
  role: LocalizedText;
  company?: LocalizedText;
  avatar?: string;
  highlight?: boolean;
}

export interface PortfolioWorkingStyle {
  availability: LocalizedText;
  timezone: LocalizedText;
  communication: LocalizedText;
  handoff: LocalizedText;
  tools: string[];
}

export interface PortfolioAnecdote {
  title: LocalizedText;
  story: LocalizedText;
  lesson: LocalizedText;
}

export interface PortfolioFinalCTA {
  title: LocalizedText;
  subtitle: LocalizedText;
  primary: PortfolioLink;
  secondary?: PortfolioLink;
  note?: LocalizedText;
  slots?: LocalizedText[];
}

export interface ProfileData {
  hero: PortfolioHero;
  problems: PortfolioProblem[];
  metrics: PortfolioMetric[];
  process: PortfolioProcessStep[];
  caseStudies: PortfolioCaseStudy[];
  toolbox: PortfolioToolboxGroup[];
  coreTools?: string[];
  guarantees: PortfolioGuarantee[];
  testimonials: PortfolioTestimonial[];
  anecdote: PortfolioAnecdote;
  workingStyle: PortfolioWorkingStyle;
  finalCta: PortfolioFinalCTA;
}
