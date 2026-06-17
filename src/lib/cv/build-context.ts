import type { CvData, CvJdSelection } from "@/data/cv";

export function buildSelectedCvContext(cv: CvData, selection: CvJdSelection) {
  return {
    profile: cv.profile,
    education: cv.education,
    experience: cv.experience.filter((e) => selection.experienceIds.includes(e.id)),
    projects: cv.projects.filter((p) => selection.projectIds.includes(p.id)),
    skills: cv.skills,
    selection,
    updatedAt: cv.updatedAt,
  };
}
