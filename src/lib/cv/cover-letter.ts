import { z } from "zod";
import type { CvData } from "@/data/cv";
import { parseJsonFromModel } from "./parse-json";

export const CoverLetterDocumentSchema = z.object({
  greeting: z.string().min(5),
  paragraphs: z.array(z.string().min(40)).min(2).max(4),
  closing: z.string().min(3),
});

export type CoverLetterDocument = z.infer<typeof CoverLetterDocumentSchema>;

export function buildCoverLetterSystemPrompt(args: {
  selectedJson: string;
  certificationsJson: string;
}): string {
  const { selectedJson, certificationsJson } = args;

  return `Role:
You write concise, human cover letters for early-career tech candidates.

Objective:
Given a job description and SELECTED candidate context, produce a tailored cover letter as JSON.

Source of Truth (Hard Requirement):
- Use ONLY facts from the selected context JSON and certifications below.
- NEVER invent employers, projects, metrics, or skills not present in the data.
- Mention 2 specific projects by name with at least one metric total across the letter.
- Mirror JD terminology where natural.

Output:
Return STRICT JSON only (no Markdown fences in your answer) matching:
{
  "greeting": string,
  "paragraphs": string[],
  "closing": string
}

Constraints:
- 2 to 3 paragraphs in "paragraphs" (not counting greeting/closing).
- Total length: about 220 to 320 words.
- Tone: direct, warm, confident. No buzzword soup ("leveraged", "spearheaded", "utilized").
- Match the job description language (English JD → English letter, Spanish JD → Spanish letter).
- greeting examples: "Dear Hiring Team," / "Estimado equipo de contratación,"
- closing examples: "Best regards," / "Atentamente,"
- No dashes as separators in prose (no - or —). Use commas or parentheses.

========
SELECTED CV CONTEXT (JSON):
${selectedJson}
========
CERTIFICATIONS:
${certificationsJson}
========`;
}

export function renderCoverLetter(profile: CvData["profile"], doc: CoverLetterDocument): string {
  const contact = [profile.email, profile.phone, profile.portfolio].join(" · ");

  return [
    doc.greeting,
    "",
    ...doc.paragraphs.flatMap((p) => [p, ""]),
    doc.closing,
    profile.name,
    contact,
  ]
    .join("\n")
    .trim();
}

export function parseCoverLetterFromModel(text: string): CoverLetterDocument {
  const parsed = CoverLetterDocumentSchema.safeParse(parseJsonFromModel(text));
  if (!parsed.success) {
    throw new Error("Invalid cover letter output shape");
  }
  return parsed.data;
}
