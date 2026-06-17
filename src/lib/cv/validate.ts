import { z } from "zod";

export const CvGeneratedDocumentSchema = z.object({
  summary: z.string().min(20),
  skills: z
    .array(
      z.object({
        category: z.string().min(2),
        items: z.string().min(2),
      })
    )
    .min(3),
  experience: z
    .array(
      z.object({
        title: z.string().min(2),
        company: z.string().min(2),
        dates: z.string().min(2),
        bullets: z.array(z.string().min(8)).min(2).max(5),
      })
    )
    .min(1)
    .max(3),
  projects: z
    .array(
      z.object({
        name: z.string().min(2),
        description: z.string().min(10),
        stack: z.string().min(2),
        bullets: z.array(z.string().min(8)).min(2).max(4),
      })
    )
    .min(3)
    .max(4),
  certifications: z.array(z.string().min(5)).min(2).max(5),
});

export type CvGeneratedDocumentParsed = z.infer<typeof CvGeneratedDocumentSchema>;

function hasNumberLikeMetric(text: string): boolean {
  return /\d/.test(text) || /<\s*\d/.test(text) || /\$/.test(text);
}

export function pickMetricBullets(bullets: string[], min: number, max: number): string[] {
  const deduped = bullets.filter((b, i, arr) => b.trim().length >= 8 && arr.indexOf(b) === i);
  const valid = deduped.filter(hasNumberLikeMetric);
  if (valid.length >= min) return valid.slice(0, max);

  const fallback = [...valid, ...deduped.filter((b) => !valid.includes(b))];
  return fallback.slice(0, Math.max(min, Math.min(max, fallback.length)));
}

/**
 * Prefer metric-bearing bullets when enough exist; otherwise keep originals
 * so generation does not fail on edge-case source lines.
 */
export function enforceCvMetrics(doc: CvGeneratedDocumentParsed): CvGeneratedDocumentParsed {
  const preferMetrics = (bullets: string[]) => {
    const metric = bullets.filter(hasNumberLikeMetric);
    return metric.length >= 2 ? metric.slice(0, 5) : bullets;
  };

  return {
    ...doc,
    experience: doc.experience.map((e) => ({
      ...e,
      bullets: preferMetrics(e.bullets),
    })),
    projects: doc.projects.map((p) => ({
      ...p,
      bullets: preferMetrics(p.bullets),
    })),
  };
}

