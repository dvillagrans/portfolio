import { CV_PROFILE } from "./profile";
import { CV_EDUCATION } from "./education";
import { CV_EXPERIENCE } from "./experience";
import { CV_PROJECTS } from "./projects";
import { CV_SKILL_GROUPS } from "./skills";
import type { CvData } from "./types";

/**
 * ═══════════════════════════════════════════════════════════════════
 * CV_DATA — single source of truth for CV Builder, Interview Prep,
 * and portfolio chat agent.
 *
 * WHAT TO UPDATE WHEN SOMETHING CHANGES:
 * ┌─────────────────────────────┬────────────────────────────────────┐
 * │ You changed…                │ Update this file                   │
 * ├─────────────────────────────┼────────────────────────────────────┤
 * │ New portfolio case study    │ projects.ts (facts + bullets)      │
 * │ New job / internship        │ experience.ts                      │
 * │ New cert                    │ data/certifications.ts (shared)    │
 * │ Contact / headline          │ profile.ts                         │
 * │ School / graduation         │ education.ts                       │
 * │ New tech you actually use   │ skills.ts + project stack          │
 * │ Marketing copy on home      │ i18n/shared.ts (separate layer)  │
 * └─────────────────────────────┴────────────────────────────────────┘
 * ═══════════════════════════════════════════════════════════════════
 */
export const CV_DATA: CvData = {
  profile: CV_PROFILE,
  education: CV_EDUCATION,
  experience: CV_EXPERIENCE,
  projects: CV_PROJECTS,
  skills: CV_SKILL_GROUPS,
  updatedAt: "2026-06-17",
};

export { CV_PROFILE, CV_EDUCATION, CV_EXPERIENCE, CV_PROJECTS, CV_SKILL_GROUPS };
export type * from "./types";
