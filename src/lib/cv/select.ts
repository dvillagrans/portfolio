import type { CvData, CvJdSelection } from "@/data/cv";
import { extractKeywords } from "./keywords";

function scoreByOverlap(haystack: string[], needles: string[]): number {
  if (needles.length === 0) return 0;
  const set = new Set(haystack.map((t) => t.toLowerCase()));
  let hits = 0;
  for (const n of needles) if (set.has(n.toLowerCase())) hits += 1;
  return hits;
}

export function selectCvContext(cv: CvData, jobDescription: string): CvJdSelection {
  const keywords = extractKeywords(jobDescription);

  const projectScores = cv.projects
    .map((p) => ({
      projectId: p.id,
      score: scoreByOverlap(p.keywords.concat(Object.values(p.stack).flatMap((v) => v ?? [])), keywords),
      priority: p.priority,
    }))
    .sort((a, b) => b.score - a.score || a.priority - b.priority);

  const projectIds = projectScores
    .slice(0, 4)
    .map((s) => s.projectId);

  const experienceIds = cv.experience
    .map((e) => ({
      id: e.id,
      score: scoreByOverlap(e.keywords, keywords),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((e) => e.id);

  const allSkills = Object.values(cv.skills).flat();
  const skillItems = allSkills
    .map((s) => ({
      skill: s,
      score: keywords.some((k) => s.toLowerCase().includes(k)) ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score || a.skill.localeCompare(b.skill))
    .slice(0, 15)
    .map((s) => s.skill);

  // Keep cert selection simple: choose most recent/relevant by skill overlap later in prompt.
  // Here we return empty; the route will compute it from CERTIFICATIONS.
  return {
    projectIds,
    experienceIds,
    skillItems,
    certificationIds: [],
    scores: projectScores.map(({ projectId, score }) => ({ projectId, score })),
  };
}

