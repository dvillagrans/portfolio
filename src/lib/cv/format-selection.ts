import type { CvData, CvJdSelection } from "@/data/cv";

export interface CvSelectionSummary {
  projects: { id: string; name: string; score: number }[];
  experience: { id: string; title: string; company: string }[];
  skills: string[];
}

export function formatSelectionSummary(cv: CvData, selection: CvJdSelection): CvSelectionSummary {
  return {
    projects: selection.projectIds.map((id) => {
      const project = cv.projects.find((p) => p.id === id);
      const score = selection.scores.find((s) => s.projectId === id)?.score ?? 0;
      return {
        id,
        name: project?.name ?? id,
        score,
      };
    }),
    experience: selection.experienceIds.map((id) => {
      const entry = cv.experience.find((e) => e.id === id);
      return {
        id,
        title: entry?.title ?? id,
        company: entry?.company ?? "",
      };
    }),
    skills: selection.skillItems,
  };
}
