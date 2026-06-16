export interface NavDict {
  projects: string;
  systems: string;
  contact: string;
  about: string;
}

export interface HeroDict {
  eyebrow: string;
  title1: string;
  title2: string;
  subtitle: string;
  focusLine: string;
  cta: string;
  downloadCv: string;
  scrollHint: string;
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
  type: "hero" | "grid" | "wide";
  /** e.g. Client project, Research, Personal */
  context: string;
  category: string;
  title: string;
  /** One-line descriptor under the title */
  subtitle: string;
  problem: string;
  system: string;
  outcome: string;
  /** Your contribution — scanable roles */
  role: string;
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
  labelRole: string;
  labelStack: string;
  labelEvidence: string;
  inspect: string;
  projects: ProjectItem[];
}

export interface SystemCapability {
  title: string;
  /** One-line scan text (collapsed state) */
  summary: string;
  description: string;
  /** Featured project names where this capability shows up */
  usedIn: string[];
  tags: string[];
}

export interface SystemsDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  labelCapability: string;
  labelUsedIn: string;
  hintHover: string;
  hintTap: string;
  railTop: string;
  railBottom: string;
  items: SystemCapability[];
}

export interface MarqueeSegment {
  text: string;
  warm?: boolean;
}

export interface MarqueeDict {
  ariaLabel: string;
  segments: MarqueeSegment[];
}

export interface PhilosophyItem {
  title: string;
  /** One-line scan text */
  summary: string;
  description: string;
}

export interface PhilosophyDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  quote: string;
  quoteBy: string;
  labelPrinciple: string;
  hintHover: string;
  hintTap: string;
  readMore: string;
  closure: string;
  items: PhilosophyItem[];
}

export interface StackBandDict {
  dataScience: string;
  infrastructure: string;
  platform: string;
  core: string;
}

export interface StackDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  hintHover: string;
  hintTap: string;
  labelUsedIn: string;
  labelExploration: string;
  explorationNote: string;
  emptyTitle: string;
  emptyHint: string;
  projectOne: string;
  projectMany: string;
  bands: StackBandDict;
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

export interface AboutMeta {
  locationLabel: string;
  locationValue: string;
  statusLabel: string;
  statusValue: string;
  roleLabel: string;
  studyingLabel: string;
  studyingValue: string;
}

export interface AboutDict {
  title: string;
  subtitle: string;
  intro: string;
  introHighlights: string[];
  meta: AboutMeta;
  metrics: AboutMetric[];
  sections: AboutSections;
  closure: string;
}

export interface ArchiveProject {
  year: string;
  title: string;
  domain: string;
  /** One-line descriptor for featured cards */
  summary?: string;
  isFeatured?: boolean;
  caseStudy?: string;
  links?: ProjectLink[];
  link?: string;
  description?: string;
  technologies?: string[];
  metrics?: { value: string; label: string }[];
}

export interface ArchiveDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  metaLine: string;
  featuredTitle: string;
  back: string;
  searchPlaceholder: string;
  filterLabel: string;
  clearLabel: string;
  showingLabel: string;
  filteredLabel: string;
  emptyTitle: string;
  emptyHint: string;
  clearFiltersLabel: string;
  caseStudyLabel: string;
  featuredBadge: string;
  yearProjectOne: string;
  yearProjectMany: string;
  footerCta: string;
  footerContact: string;
  labelStack: string;
  labelMetrics: string;
  viewProject: string;
  headers: {
    year: string;
    project: string;
    domain: string;
    link: string;
  };
  projects: ArchiveProject[];
}

export interface ContactDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  focusLine: string;
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
  labelSocial: string;
  errorRequired?: string;
  errorNameShort?: string;
  errorEmailInvalid?: string;
  errorMessageShort?: string;
  github: string;
  linkedin: string;
  footerText: string;
}

export interface ColophonDict {
  fontCredit: string;
  deployLabel: string;
  scoreLabel: string;
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
  cta: string;
  contact: string;
  note?: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyPageHeader {
  eyebrow: string;
  title: string;
  metrics: CaseStudyMetric[];
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
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: CaseStudyMetric[];
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
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: CaseStudyMetric[];
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
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: CaseStudyMetric[];
  tldr: CovidTldr;
  meta: MetaItem[];
  links: CovidLinks;
  linkDashboard: string;
  linkRepo?: string;
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

export type EditorialCaseStudyDict = CovidDict;

/* ─── Bouquet ─── */

export interface BouquetTldr {
  challenge: TldrCard;
  solution: TldrCard & { cyan: string; text3: string };
  impact: TldrCard & { bold: string };
}

export interface BouquetLinks {
  landing: string;
}

export interface BouquetDashboards {
  title1: string;
  title2: string;
  superAdmin: { tag: string; desc: string };
  zoneManager: { tag: string; desc: string };
  branchManager: { tag: string; desc: string };
}

export interface BouquetArchitecture {
  title1: string;
  title2: string;
  d1: ArchitectureDecision;
  d2: ArchitectureDecision;
  d3: ArchitectureDecision;
}

export interface BouquetLessons {
  title1: string;
  title2: string;
  desc: string;
  l1: LessonItem;
  l2: LessonItem;
  l3: LessonItem;
}

export interface BouquetDict {
  back: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metrics: CaseStudyMetric[];
  tldr: BouquetTldr;
  meta: MetaItem[];
  links: BouquetLinks;
  quote: QuoteBlock;
  constraints: {
    title1: string;
    title2: string;
    desc: string;
    c1: ConstraintItem;
    c2: ConstraintItem;
    c3: ConstraintItem;
    c4: ConstraintItem;
  };
  dashboards: BouquetDashboards;
  architecture: BouquetArchitecture;
  lessons: BouquetLessons;
  footer: CaseStudyFooter;
}

/* ─── CV Builder ─── */

export interface CvBuilderDict {
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  generateButton: string;
  generating: string;
  copyButton: string;
  copied: string;
  printButton: string;
  generateAgain: string;
  back: string;
  errorRateLimit: string;
  errorGeneric: string;
  errorEmpty: string;
  errorTooLong: string;
  poweredBy: string;
  charCount: string;
  retryAfter: string;
  interviewTitle: string;
  interviewSubtitle: string;
  interviewPlaceholder: string;
  interviewSend: string;
  interviewThinking: string;
  interviewPoweredBy: string;
}

/* ─── Now page ─── */

export interface NowDict {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: { heading: string; content: string }[];
}

/* ─── Top-level Language dictionary ─── */

export interface LanguageDict {
  nav: NavDict;
  hero: HeroDict;
  work: WorkDict;
  marquee: MarqueeDict;
  systems: SystemsDict;
  philosophy: PhilosophyDict;
  stack: StackDict;
  about: AboutDict;
  archive: ArchiveDict;
  contact: ContactDict;
  colophon: ColophonDict;
  now: NowDict;
  timeup: TimeUpDict;
  eyenet: EyeNetDict;
  covidPerfiles: CovidDict;
  bouquet: BouquetDict;
  cvBuilder: CvBuilderDict;
}

/* ─── Shared dictionary (loaded into context) ─── */

export type SharedDict = Pick<
  LanguageDict,
  | "nav"
  | "hero"
  | "work"
  | "marquee"
  | "systems"
  | "philosophy"
  | "stack"
  | "about"
  | "archive"
  | "contact"
  | "colophon"
  | "now"
>;
