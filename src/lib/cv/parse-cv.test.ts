import { describe, expect, it } from "vitest";
import { CV_DATA } from "@/data/cv";
import { CERTIFICATIONS } from "@/data/certifications";
import { selectCvContext } from "@/lib/cv/select";
import {
  buildFallbackCvDocument,
  normalizeCvOutput,
  padCvFromSource,
  parseCvFromModel,
} from "@/lib/cv/parse-cv";
import { parseJsonFromModel } from "@/lib/cv/parse-json";
import { enforceCvMetrics } from "@/lib/cv/validate";

const jd = `Data Scientist — Python, SQL, scikit-learn, dashboards, experimentation.`;
const selection = selectCvContext(CV_DATA, jd);
const ctx = { cv: CV_DATA, selection, certifications: CERTIFICATIONS };

describe("parseJsonFromModel", () => {
  it("parses fenced JSON with preamble", () => {
    const raw = parseJsonFromModel(`Here is the CV:\n\`\`\`json\n{"summary":"ok"}\n\`\`\``);
    expect(raw).toEqual({ summary: "ok" });
  });

  it("extracts first JSON object from noisy text", () => {
    const raw = parseJsonFromModel(`Note: output below\n{"a":1,"b":{"c":2}}\nThanks`);
    expect(raw).toEqual({ a: 1, b: { c: 2 } });
  });
});

describe("parseCvFromModel", () => {
  it("accepts partially valid model output after padding", () => {
    const text = JSON.stringify({
      summary: "Early-career engineer focused on data, ML, and production systems in Mexico.",
      skills: [
        { category: "Languages", items: "Python, TypeScript" },
        { category: "ML", items: "scikit-learn, PyTorch" },
      ],
      experience: [
        {
          title: "AI Intern",
          company: "Eyenet",
          dates: "2025",
          bullets: ["Reduced manual work by 65% across 300+ docs/week."],
        },
      ],
      projects: [
        {
          name: "EyeNet",
          description: "Document automation platform",
          stack: "Python, FastAPI",
          bullets: ["10,000+ daily requests in production."],
        },
      ],
      certifications: ["Generative AI with LLMs (AWS, 2024)"],
    });

    const result = parseCvFromModel(text, ctx);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.projects.length).toBeGreaterThanOrEqual(3);
      expect(result.data.skills.length).toBeGreaterThanOrEqual(3);
      expect(() => enforceCvMetrics(result.data)).not.toThrow();
    }
  });

  it("builds a valid fallback document from CV_DATA", () => {
    const doc = buildFallbackCvDocument(ctx);
    expect(doc.summary.length).toBeGreaterThanOrEqual(20);
    expect(doc.projects.length).toBeGreaterThanOrEqual(3);
    expect(() => enforceCvMetrics(doc)).not.toThrow();
  });
});

describe("normalizeCvOutput", () => {
  it("maps alternate field names", () => {
    const normalized = normalizeCvOutput({
      professionalSummary: "Summary with enough length for validation checks here.",
      skills: { Languages: ["Python", "SQL"], ML: ["scikit-learn"] },
      work: [
        {
          role: "Intern",
          employer: "Eyenet",
          period: "2025",
          highlights: ["Cut errors by 60% with 92% field accuracy."],
        },
      ],
      featuredProjects: [
        {
          project: "COVID",
          summary: "Clustering on 30M+ records",
          tech: "Python",
          impact: ["9 interpretable ICU risk profiles from 30M+ rows."],
        },
      ],
      certs: ["Google AI Essentials (Google, 2024)"],
    });

    const padded = padCvFromSource(normalized, ctx);
    const result = parseCvFromModel(JSON.stringify(padded), ctx);
    expect(result.ok).toBe(true);
  });
});
