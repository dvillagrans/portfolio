import type { Certification } from "@/data/certifications";
import type { CvData, CvJdSelection, CvProjectFact } from "@/data/cv";
import { parseJsonFromModel } from "./parse-json";
import {
  CvGeneratedDocumentSchema,
  type CvGeneratedDocumentParsed,
  pickMetricBullets,
} from "./validate";

export interface CvParseContext {
  cv: CvData;
  selection: CvJdSelection;
  certifications: Certification[];
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean).join(", ");
  if (value != null && typeof value === "object") {
    const row = value as Record<string, unknown>;
    return asString(row.name ?? row.title ?? row.label ?? row.text, fallback);
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function normalizeBullets(value: unknown, max: number, pool: string[] = []): string[] {
  const parsed = !Array.isArray(value)
    ? []
    : value
        .map((b) => asString(b))
        .filter((b) => b.length >= 6);
  return pickMetricBullets([...parsed, ...pool], 2, max);
}

function normalizeSkills(value: unknown): { category: string; items: string }[] {
  if (Array.isArray(value)) {
    return value
      .map((entry, index) => {
        if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
          return null;
        }
        const row = entry as Record<string, unknown>;
        const category = asString(row.category ?? row.name ?? row.label, `Skills ${index + 1}`);
        const items = asString(row.items ?? row.skills ?? row.values);
        if (!category || !items) return null;
        return { category, items };
      })
      .filter((s): s is { category: string; items: string } => s !== null);
  }

  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([category, items]) => ({
        category: category.trim(),
        items: asString(items),
      }))
      .filter((s) => s.category && s.items);
  }

  return [];
}

function stackToString(stack: CvProjectFact["stack"]): string {
  return Object.values(stack)
    .flat()
    .filter((v): v is string => Boolean(v))
    .join(", ");
}

function normalizeExperience(
  value: unknown
): { title: string; company: string; dates: string; bullets: string[] }[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
      const row = entry as Record<string, unknown>;
      const title = asString(row.title ?? row.role ?? row.position);
      const company = asString(row.company ?? row.employer ?? row.organization);
      const dates = asString(row.dates ?? row.period ?? row.duration);
      const bullets = normalizeBullets(row.bullets ?? row.highlights ?? row.points, 5);
      if (!title || !company || !dates) return null;
      return { title, company, dates, bullets };
    })
    .filter((e): e is { title: string; company: string; dates: string; bullets: string[] } => e !== null);
}

function normalizeProjects(
  value: unknown
): { name: string; description: string; stack: string; bullets: string[] }[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
      const row = entry as Record<string, unknown>;
      const name = asString(row.name ?? row.title ?? row.project);
      const description = asString(row.description ?? row.summary ?? row.oneLiner);
      const stack = asString(row.stack ?? row.technologies ?? row.tech);
      const bullets = normalizeBullets(row.bullets ?? row.highlights ?? row.impact, 4);
      if (!name || !description) return null;
      return { name, description, stack: stack || "See project details", bullets };
    })
    .filter(
      (p): p is { name: string; description: string; stack: string; bullets: string[] } => p !== null
    );
}

function normalizeCertifications(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();
      if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        const row = entry as Record<string, unknown>;
        const name = asString(row.name ?? row.title);
        const issuer = asString(row.issuer);
        const year = row.year != null ? String(row.year) : "";
        if (name && issuer) return `${name} (${issuer}${year ? `, ${year}` : ""})`;
        return name;
      }
      return "";
    })
    .filter((c) => c.length >= 5);
}

export function normalizeCvOutput(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }

  const o = raw as Record<string, unknown>;

  return {
    summary: asString(o.summary ?? o.professionalSummary ?? o.profile),
    skills: normalizeSkills(o.skills),
    experience: normalizeExperience(o.experience ?? o.work ?? o.employment),
    projects: normalizeProjects(o.projects ?? o.featuredProjects),
    certifications: normalizeCertifications(o.certifications ?? o.certs),
  };
}

function certificationLabel(cert: Certification): string {
  return `${cert.name} (${cert.issuer}, ${cert.year})`;
}

/** Fill gaps from canonical CV_DATA so Zod validation can pass. */
export function padCvFromSource(
  partial: Record<string, unknown>,
  ctx: CvParseContext
): Record<string, unknown> {
  const { cv, selection, certifications } = ctx;

  let summary = asString(partial.summary);
  if (summary.length < 20) {
    summary = `${cv.profile.headline}. ${cv.profile.location}.`.trim();
  }
  if (summary.length < 20) {
    summary = cv.profile.headline;
  }

  let skills = normalizeSkills(partial.skills);
  if (skills.length < 3) {
    const groups: [string, string[]][] = [
      ["Languages", cv.skills.languages],
      ["ML & AI", cv.skills.ml],
      ["Data", cv.skills.data],
      ["Backend", cv.skills.backend],
      ["Frontend", cv.skills.frontend],
      ["DevOps", cv.skills.devops],
    ];
    for (const [category, items] of groups) {
      if (skills.length >= 3) break;
      if (!skills.some((s) => s.category === category)) {
        skills.push({ category, items: items.join(", ") });
      }
    }
  }

  const selectedExp = cv.experience.filter((e) => selection.experienceIds.includes(e.id));
  let experience = normalizeExperience(partial.experience);

  if (experience.length < 1) {
    experience = selectedExp.map((e) => ({
      title: e.title,
      company: e.company,
      dates: e.dates,
      bullets: pickMetricBullets(e.bullets, 2, 4),
    }));
  } else {
    experience = experience.map((entry, index) => {
      const source = selectedExp[index] ?? selectedExp[0];
      let bullets = pickMetricBullets(entry.bullets, 2, 5);
      if (bullets.length < 2 && source) {
        bullets = pickMetricBullets([...entry.bullets, ...source.bullets], 2, 5);
      }
      return { ...entry, bullets };
    });
  }

  const selectedProjects = cv.projects.filter((p) => selection.projectIds.includes(p.id));
  let projects = normalizeProjects(partial.projects);
  const projectNames = new Set(projects.map((p) => p.name.toLowerCase()));

  if (projects.length < 3) {
    for (const project of selectedProjects) {
      if (projects.length >= 4) break;
      if (projectNames.has(project.name.toLowerCase())) continue;
      projects.push({
        name: project.name,
        description: project.oneLiner,
        stack: stackToString(project.stack),
        bullets: pickMetricBullets(project.impactBullets, 2, 4),
      });
      projectNames.add(project.name.toLowerCase());
    }
  }

  if (projects.length < 3) {
    for (const project of cv.projects) {
      if (projects.length >= 4) break;
      if (projectNames.has(project.name.toLowerCase())) continue;
      projects.push({
        name: project.name,
        description: project.oneLiner,
        stack: stackToString(project.stack),
        bullets: pickMetricBullets(project.impactBullets, 2, 4),
      });
      projectNames.add(project.name.toLowerCase());
    }
  }

  projects = projects.map((entry, index) => {
    const source =
      selectedProjects.find((p) => p.name.toLowerCase() === entry.name.toLowerCase()) ??
      selectedProjects[index];
    let bullets = pickMetricBullets(entry.bullets, 2, 4);
    if (bullets.length < 2 && source) {
      bullets = pickMetricBullets([...entry.bullets, ...source.impactBullets], 2, 4);
    }
    return { ...entry, bullets };
  });

  let certs = normalizeCertifications(partial.certifications);
  if (certs.length < 2) {
    const topCerts = certifications
      .slice()
      .sort((a, b) => b.year - a.year || b.month.localeCompare(a.month))
      .map(certificationLabel);
    certs = [...new Set([...certs, ...topCerts])].slice(0, 5);
  }

  return {
    summary,
    skills: skills.slice(0, 6),
    experience: experience.slice(0, 3),
    projects: projects.slice(0, 4),
    certifications: certs,
  };
}

export function buildFallbackCvDocument(ctx: CvParseContext): CvGeneratedDocumentParsed {
  const padded = padCvFromSource({}, ctx);
  const parsed = CvGeneratedDocumentSchema.safeParse(padded);
  if (!parsed.success) {
    throw new Error(
      `Fallback CV document invalid: ${parsed.error.issues.map((i) => i.message).join("; ")}`
    );
  }
  return parsed.data;
}

export type CvParseResult =
  | { ok: true; data: CvGeneratedDocumentParsed; usedFallback: boolean }
  | { ok: false; errors: string };

export function parseCvFromModel(text: string, ctx: CvParseContext): CvParseResult {
  try {
    const raw = parseJsonFromModel(text);
    const normalized = normalizeCvOutput(raw);
    const padded = padCvFromSource(normalized, ctx);
    const parsed = CvGeneratedDocumentSchema.safeParse(padded);

    if (parsed.success) {
      return { ok: true, data: parsed.data, usedFallback: false };
    }

    return {
      ok: false,
      errors: parsed.error.issues
        .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
        .join("; "),
    };
  } catch (error) {
    return {
      ok: false,
      errors: error instanceof Error ? error.message : "Failed to parse CV JSON",
    };
  }
}
