import type { CvData, CvGeneratedDocument } from "@/data/cv";

function joinContact(profile: CvData["profile"]): string {
  return [
    profile.location,
    profile.email,
    profile.phone,
    profile.linkedin,
    profile.github,
    profile.portfolio,
  ].join(" · ");
}

function dashSafe(text: string): string {
  return text.replace(/[—–-]/g, ",");
}

export function renderCvMarkdown(cv: CvData, doc: CvGeneratedDocument): string {
  const { profile } = cv;

  const lines: string[] = [];

  lines.push(`# ${profile.name}`);
  lines.push(`(${joinContact(profile)})`);
  lines.push("");

  lines.push("## Professional Summary");
  lines.push(dashSafe(doc.summary).trim());
  lines.push("");

  lines.push("## Technical Skills");
  for (const s of doc.skills) {
    lines.push(`${dashSafe(s.category)}: ${dashSafe(s.items)}`);
  }
  lines.push("");

  lines.push("## Professional Experience");
  for (const e of doc.experience) {
    lines.push(`**${dashSafe(e.title)}**, ${dashSafe(e.company)} (${dashSafe(e.dates)})`);
    for (const b of e.bullets) lines.push(`• ${dashSafe(b).trim()}`);
    lines.push("");
  }

  lines.push("## Education");
  for (const e of cv.education) {
    lines.push(`**${dashSafe(e.school)}**, ${dashSafe(e.degree)} (${dashSafe(e.dates)})`);
  }
  lines.push("");

  lines.push("## Featured Projects");
  for (const p of doc.projects) {
    lines.push(`**${dashSafe(p.name)}**, ${dashSafe(p.description)}`);
    lines.push(`Stack: ${dashSafe(p.stack)}`);
    for (const b of p.bullets) lines.push(`• ${dashSafe(b).trim()}`);
    lines.push("");
  }

  lines.push("## Certifications");
  for (const c of doc.certifications) lines.push(`• ${dashSafe(c).trim()}`);

  return lines.join("\n");
}

