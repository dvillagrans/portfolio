export interface NavDict {
  projects: string;
  systems: string;
  contact: string;
  about: string;
}

export interface HeroDict {
  title1: string;
  title2: string;
  subtitle1: string;
  subtitle2: string;
  cta: string;
  downloadCv?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  type: "special" | "hero" | "grid" | "wide";
  category: string;
  title: string;
  problem: string;
  system: string;
  outcome: string;
  image: string;
  tags: string[];
  metrics: ProjectMetric[];
  date?: string;
  location?: string;
  links: ProjectLink[];
  href: string;
  caseStudy?: string;
}

export interface WorkDict {
  title: string;
  subtitle: string;
  labelScope: string;
  labelSystem: string;
  labelOutcome: string;
  inspect: string;
  projects: ProjectItem[];
}

export interface SystemCapability {
  title: string;
  description: string;
  tags: string[];
}

export interface SystemsDict {
  title: string;
  items: SystemCapability[];
}

export interface PhilosophyItem {
  title: string;
  description: string;
}

export interface PhilosophyDict {
  tag: string;
  quote: string;
  items: PhilosophyItem[];
}

export interface StackDict {
  title: string;
  tools: string[];
}

export interface AboutMetric {
  value: string;
  label: string;
}

export interface OptimizationItem {
  label: string;
  desc: string;
}

export interface DecisionItem {
  title: string;
  desc: string;
}

export interface AboutSections {
  systems: {
    title: string;
    content: string;
  };
  optimization: {
    title: string;
    items: OptimizationItem[];
  };
  decisions: {
    title: string;
    items: DecisionItem[];
  };
}

export interface AboutDict {
  title: string;
  subtitle: string;
  intro: string;
  metrics: AboutMetric[];
  sections: AboutSections;
  closure: string;
}

export interface ArchiveProject {
  year: string;
  title: string;
  domain: string;
  isFeatured?: boolean;
  caseStudy?: string;
  links?: ProjectLink[];
  link?: string;
}

export interface ArchiveDict {
  title: string;
  subtitle: string;
  back: string;
  headers: {
    year: string;
    project: string;
    domain: string;
    link: string;
  };
  viewProject: string;
  projects: ArchiveProject[];
}

export interface ContactDict {
  title1: string;
  title2: string;
  email: string;
  bookSession: string;
  bookDesc: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSubmit: string;
  formLoading: string;
  formLabel: string;
  formSuccess: string;
  formError: string;
  errorRequired?: string;
  errorNameShort?: string;
  errorEmailInvalid?: string;
  errorMessageShort?: string;
  github: string;
  linkedin: string;
  footerText: string;
}

/* ─── Case-study shared shapes ─── */

export interface TldrCard {
  title: string;
  text1: string;
  bold?: string;
  text2?: string;
  cyan?: string;
  text3?: string;
}

export interface MetaItem {
  label: string;
  value: string;
}

export interface QuoteBlock {
  text: string;
  bold: string;
  text2: string;
  title: string;
}

export interface ConstraintItem {
  title: string;
  text1: string;
  bold1?: string;
  text2?: string;
  bold2?: string;
  tag?: string;
}

export interface ArchitectureDecision {
  nav: string;
  title: string;
  desc: string;
  bold: string;
  desc2: string;
  costTitle: string;
  costDesc: string;
}

export interface LessonItem {
  title: string;
  desc: string;
  tag: string;
}

export interface CaseStudyFooter {
  text: string;
  status: string;
}

/* ─── TimeUp ─── */

export interface TimeUpTldr {
  challenge: TldrCard;
  solution: TldrCard & { cyan: string; text3: string };
  impact: TldrCard & { bold: string };
}

export interface TimeUpLinks {
  public: string;
  business: string;
}

export interface TimeUpInterfaces {
  title1: string;
  title2: string;
  admin: { tag: string; desc: string };
  owner: { tag: string; desc: string };
  staff: { tag: string; desc: string };
}

export interface TimeUpArchitecture {
  title1: string;
  title2: string;
  d1: ArchitectureDecision;
  d2: ArchitectureDecision;
  d3: ArchitectureDecision;
}

export interface TimeUpLessons {
  title1: string;
  title2: string;
  desc: string;
  l1: LessonItem;
  l2: LessonItem;
  l3: LessonItem;
}

export interface TimeUpDict {
  back: string;
  subtitle: string;
  tldr: TimeUpTldr;
  meta: MetaItem[];
  links: TimeUpLinks;
  quote: QuoteBlock;
  constraints: {
    title1: string;
    title2: string;
    desc: string;
    c1: ConstraintItem;
    c2: ConstraintItem;
    c3: ConstraintItem;
    c4: ConstraintItem;
    c5: ConstraintItem;
  };
  interfaces: TimeUpInterfaces;
  architecture: TimeUpArchitecture;
  lessons: TimeUpLessons;
  footer: CaseStudyFooter;
}

/* ─── EyeNet ─── */

export interface EyeNetTldr {
  challenge: TldrCard;
  solution: TldrCard & { cyan: string; text3: string };
  impact: TldrCard & { bold: string };
}

export interface EyeNetLinks {
  systemA: string;
  systemB: string;
}

export interface EyeNetSystems {
  title1: string;
  title2: string;
  desc: string;
  tabA: string;
  tabB: string;
  mobileHint: string;
}

export interface EyeNetStackLayer {
  label: string;
  items: string[];
}

export interface EyeNetStack {
  title1: string;
  title2: string;
  layers: EyeNetStackLayer[];
  tags: string[];
}

export interface EyeNetArchitecture {
  title1: string;
  title2: string;
  d1: ArchitectureDecision;
  d2: ArchitectureDecision;
  d3: ArchitectureDecision;
  d4: ArchitectureDecision;
}

export interface EyeNetLessons {
  title1: string;
  title2: string;
  desc: string;
  l1: LessonItem;
  l2: LessonItem;
  l3: LessonItem;
}

export interface EyeNetDict {
  back: string;
  subtitle: string;
  tldr: EyeNetTldr;
  meta: MetaItem[];
  links: EyeNetLinks;
  quote: QuoteBlock;
  constraints: {
    title1: string;
    title2: string;
    desc: string;
    c1: ConstraintItem;
    c2: ConstraintItem;
    c3: ConstraintItem;
  };
  systems: EyeNetSystems;
  architecture: EyeNetArchitecture;
  stack: EyeNetStack;
  lessons: EyeNetLessons;
  footer: CaseStudyFooter;
}

/* ─── Covid ─── */

export interface CovidTldr {
  challenge: TldrCard;
  solution: TldrCard & { cyan: string; text3: string };
  impact: TldrCard & { bold: string };
}

export interface CovidLinks {
  dashboard: string;
  repo: string;
  report: string;
}

export interface CovidPipeline {
  title1: string;
  title2: string;
  desc: string;
}

export interface CovidArchitecture {
  title1: string;
  title2: string;
  d1: ArchitectureDecision;
  d2: ArchitectureDecision;
  d3: ArchitectureDecision;
  d4: ArchitectureDecision;
}

export interface CovidLessons {
  title1: string;
  title2: string;
  desc: string;
  l1: LessonItem;
  l2: LessonItem;
  l3: LessonItem;
}

export interface CovidDict {
  back: string;
  subtitle: string;
  tldr: CovidTldr;
  meta: MetaItem[];
  links: CovidLinks;
  linkDashboard: string;
  quote: QuoteBlock;
  constraints: {
    title1: string;
    title2: string;
    desc: string;
    c1: ConstraintItem;
    c2: ConstraintItem;
    c3: ConstraintItem;
    c4: ConstraintItem;
    c5: ConstraintItem;
  };
  pipeline: CovidPipeline;
  architecture: CovidArchitecture;
  lessons: CovidLessons;
  footer: CaseStudyFooter;
}

/* ─── Top-level Language dictionary ─── */

export interface LanguageDict {
  nav: NavDict;
  hero: HeroDict;
  work: WorkDict;
  systems: SystemsDict;
  philosophy: PhilosophyDict;
  stack: StackDict;
  about: AboutDict;
  archive: ArchiveDict;
  contact: ContactDict;
  timeup: TimeUpDict;
  eyenet: EyeNetDict;
  covidPerfiles: CovidDict;
}

/* ─── Shared dictionary (loaded into context) ─── */

export type SharedDict = Pick<
  LanguageDict,
  "nav" | "hero" | "work" | "systems" | "philosophy" | "stack" | "about" | "archive" | "contact"
>;
