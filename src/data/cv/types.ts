/**
 * Canonical CV corpus types.
 *
 * UPDATE GUIDE — when you ship a new portfolio project:
 * 1. Add or edit an entry in `projects.ts` (impact bullets + keywords).
 * 2. If it's client work, update `experience.ts` bullets too.
 * 3. Add new stack tags to `skills.ts` if needed.
 * 4. Portfolio copy (`shared.ts` / case study dicts) can stay separate for marketing;
 *    this folder is what the CV agent reads.
 */

export interface CvLinks {
  caseStudy?: string;
  live?: string;
  repo?: string;
}

export interface CvProjectFact {
  id: string;
  name: string;
  oneLiner: string;
  role: string;
  dates: string;
  stack: {
    languages?: string[];
    ml?: string[];
    data?: string[];
    backend?: string[];
    frontend?: string[];
    infra?: string[];
    other?: string[];
  };
  /** Verified impact bullets — every line should include a metric or scale. */
  impactBullets: string[];
  keywords: string[];
  links: CvLinks;
  /** Default rank when no JD match (lower = higher priority). */
  priority: number;
}

export interface CvExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
  keywords: string[];
}

export interface CvEducationEntry {
  school: string;
  degree: string;
  dates: string;
  href?: string;
  gpa?: string;
}

export interface CvSkillGroups {
  languages: string[];
  ml: string[];
  data: string[];
  backend: string[];
  frontend: string[];
  devops: string[];
}

export interface CvProfile {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

export interface CvData {
  profile: CvProfile;
  education: CvEducationEntry[];
  experience: CvExperienceEntry[];
  projects: CvProjectFact[];
  skills: CvSkillGroups;
  /** ISO-ish maintenance stamp for debugging drift. */
  updatedAt: string;
}

/** LLM output shape — profile/education rendered from CV_DATA, not invented. */
export interface CvGeneratedDocument {
  summary: string;
  skills: { category: string; items: string }[];
  experience: {
    title: string;
    company: string;
    dates: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    description: string;
    stack: string;
    bullets: string[];
  }[];
  certifications: string[];
}

export interface CvJdSelection {
  projectIds: string[];
  experienceIds: string[];
  skillItems: string[];
  certificationIds: string[];
  scores: { projectId: string; score: number }[];
}
