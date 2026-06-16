/**
 * Single source of truth for case study hero media (poster + optional demo video).
 * Add new projects here; pages reference `CaseStudySlug` only.
 */
export type CaseStudySlug = "covid" | "nyc" | "india";

export interface CaseStudyVideoSources {
  /** Primary web delivery — H.264 for broad compatibility and hardware decode. */
  mp4: string;
  /** Optional fallback when smaller than mp4 on re-export. */
  webm?: string;
}

export interface CaseStudyMedia {
  slug: CaseStudySlug;
  poster: string;
  alt: string;
  video?: CaseStudyVideoSources;
  /** Matches pipeline hero frame; defaults to 16/10 in the player. */
  aspectRatio?: "16/10" | "16/9";
}

export const caseStudyMedia = {
  covid: {
    slug: "covid",
    poster: "/img/dashboard-covid-19.webp",
    alt: "COVID-19 risk profiles dashboard walkthrough",
    video: { mp4: "/videos/covid.mp4" },
    aspectRatio: "16/10",
  },
  nyc: {
    slug: "nyc",
    poster: "/img/nyc-ridehailing-dashboard.webp",
    alt: "NYC ride-hailing analytics dashboard",
    aspectRatio: "16/10",
  },
  india: {
    slug: "india",
    poster: "/img/india-air-quality.webp",
    alt: "India air quality intelligence dashboard",
    aspectRatio: "16/10",
  },
} as const satisfies Record<CaseStudySlug, CaseStudyMedia>;

export function getCaseStudyMedia(slug: CaseStudySlug): CaseStudyMedia {
  return caseStudyMedia[slug];
}

const CASE_STUDY_PATH_TO_SLUG: Record<string, CaseStudySlug> = {
  "/projects/covid": "covid",
  "/projects/nyc": "nyc",
  "/projects/india": "india",
};

/** Resolve editorial media from a featured-work or archive project link. */
export function resolveCaseStudyMediaFromProject(project: {
  caseStudy?: string;
  href: string;
}): CaseStudyMedia | null {
  const path = project.caseStudy ?? project.href;
  const slug = CASE_STUDY_PATH_TO_SLUG[path];
  return slug ? getCaseStudyMedia(slug) : null;
}
