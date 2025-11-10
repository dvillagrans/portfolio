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

export type PortfolioLinkType = "primary" | "secondary" | "ghost" | "soft";

export interface PortfolioLink {
  label: string;
  href: string;
  type?: PortfolioLinkType;
  description?: string;
  target?: "_blank" | "_self";
  icon?: string;
  download?: boolean;
}

export interface PortfolioMetric {
  label: string;
  value: string;
  description?: string;
}

export interface PortfolioHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  credentials: string;
  badge: string;
  persona: string;
  photo: string;
  metrics: PortfolioMetric[];
  ctas: PortfolioLink[];
}

export interface PortfolioProblem {
  title: string;
  description: string;
  metric?: string;
}

export interface PortfolioProcessStep {
  icon: PortfolioIconToken;
  title: string;
  description: string;
  detail: string;
}

export interface PortfolioCaseMedia {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
  poster?: string;
}

export interface PortfolioCaseStudy {
  title: string;
  category: string;
  timeframe: string;
  summary: string;
  context: string;
  action: string;
  result: string;
  metric: string;
  tags: string[];
  proof: PortfolioLink[];
  media: PortfolioCaseMedia;
  highlight?: boolean;
  quickRead?: boolean;
}

export interface PortfolioToolboxGroup {
  title: string;
  items: string[];
}

export interface PortfolioGuarantee {
  label: string;
  value: string;
  description: string;
}

export interface PortfolioTestimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  highlight?: boolean;
}

export interface PortfolioWorkingStyle {
  availability: string;
  timezone: string;
  communication: string;
  handoff: string;
  tools: string[];
}

export interface PortfolioAnecdote {
  title: string;
  story: string;
  lesson: string;
}

export interface PortfolioFinalCTA {
  title: string;
  subtitle: string;
  primary: PortfolioLink;
  secondary?: PortfolioLink;
  note?: string;
  slots?: string[];
}

export interface ProfileData {
  hero: PortfolioHero;
  problems: PortfolioProblem[];
  metrics: PortfolioMetric[];
  process: PortfolioProcessStep[];
  caseStudies: PortfolioCaseStudy[];
  toolbox: PortfolioToolboxGroup[];
  guarantees: PortfolioGuarantee[];
  testimonials: PortfolioTestimonial[];
  anecdote: PortfolioAnecdote;
  workingStyle: PortfolioWorkingStyle;
  finalCta: PortfolioFinalCTA;
}
