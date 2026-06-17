"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import type { Certification } from "@/data/certifications";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
    { src: "Helvetica-Oblique", fontStyle: "italic" },
  ],
});

const COLORS = {
  ink: "#111827",
  body: "#1f2937",
  muted: "#4b5563",
  rule: "#d1d5db",
  link: "#1d4ed8",
};

/** ATS-friendly section order (summary → skills → experience → education → projects → certs). */
const ATS_SECTION_ORDER = [
  "professional summary",
  "technical skills",
  "professional experience",
  "education",
  "featured projects",
  "certifications",
] as const;

const SECTION_LABELS: Record<string, string> = {
  "professional summary": "Professional Summary",
  "technical skills": "Technical Skills",
  "professional experience": "Professional Experience",
  education: "Education",
  "featured projects": "Selected Projects",
  certifications: "Certifications",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.25,
    lineHeight: 1.38,
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 44,
    color: COLORS.body,
  },
  header: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1.25,
    borderBottomColor: COLORS.ink,
    borderBottomStyle: "solid",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.ink,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  contactLine: {
    fontSize: 8.5,
    color: COLORS.muted,
    lineHeight: 1.65,
  },
  contactText: {
    fontSize: 8.5,
    color: COLORS.muted,
  },
  contactSep: {
    fontSize: 8.5,
    color: COLORS.muted,
  },
  contactLink: {
    fontSize: 8.5,
    color: COLORS.link,
    textDecoration: "none",
  },
  section: {
    marginTop: 9,
  },
  sectionTitle: {
    fontSize: 8.75,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    color: COLORS.ink,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.75,
    borderBottomColor: COLORS.rule,
    borderBottomStyle: "solid",
  },
  summary: {
    fontSize: 9.25,
    lineHeight: 1.42,
    color: COLORS.body,
    textAlign: "left",
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 2.5,
    alignItems: "flex-start",
  },
  skillCategory: {
    width: 92,
    fontSize: 8.75,
    fontWeight: "bold",
    color: COLORS.ink,
    paddingRight: 6,
  },
  skillItems: {
    flex: 1,
    fontSize: 8.75,
    color: COLORS.body,
    lineHeight: 1.35,
  },
  entryBlock: {
    marginBottom: 6,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
    gap: 8,
  },
  entryTitle: {
    flex: 1,
    fontSize: 9.5,
    fontWeight: "bold",
    color: COLORS.ink,
    lineHeight: 1.25,
  },
  entryDates: {
    fontSize: 8.5,
    color: COLORS.muted,
    textAlign: "right",
    minWidth: 72,
  },
  entrySubtitle: {
    fontSize: 8.75,
    color: COLORS.muted,
    fontStyle: "italic",
    marginBottom: 2,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 1.5,
    paddingLeft: 2,
  },
  bulletGlyph: {
    width: 8,
    fontSize: 8.75,
    color: COLORS.body,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.75,
    lineHeight: 1.38,
    color: COLORS.body,
  },
  projectBlock: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: COLORS.ink,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 8.75,
    color: COLORS.muted,
    marginBottom: 4,
    lineHeight: 1.45,
  },
  stackLine: {
    fontSize: 8.25,
    color: COLORS.muted,
    marginBottom: 3,
    lineHeight: 1.35,
  },
  certLine: {
    fontSize: 8.5,
    color: COLORS.body,
    marginBottom: 3,
    lineHeight: 1.45,
  },
  certLink: {
    fontSize: 8.5,
    color: COLORS.link,
    textDecoration: "none",
  },
});

interface CvSection {
  type: string;
  content: string;
  items: string[];
}

interface ParsedSkill {
  category: string;
  items: string;
}

interface ParsedEntry {
  title: string;
  subtitle: string;
  dates: string;
  bullets: string[];
  stack?: string;
  description?: string;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();
}

function parseMarkdown(md: string): CvSection[] {
  const lines = md.split("\n");
  const sections: CvSection[] = [];
  let currentType = "";
  let currentContent = "";
  let currentItems: string[] = [];

  const flush = () => {
    if (currentType) {
      sections.push({
        type: currentType === "__name__" ? "name" : currentType,
        content: currentContent.trim(),
        items: [...currentItems],
      });
    }
    currentType = "";
    currentContent = "";
    currentItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      flush();
      currentType = "__name__";
      currentContent = trimmed.replace(/^# /, "");
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flush();
      currentType = trimmed.replace(/^## /, "").toLowerCase();
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      currentItems.push(trimmed.replace(/^[-*•]\s*/, ""));
      continue;
    }

    if (trimmed.startsWith("**")) {
      currentItems.push("__BOLD__" + trimmed);
      continue;
    }

    if (trimmed.toLowerCase().startsWith("stack:")) {
      currentItems.push("__STACK__" + trimmed.replace(/^stack:\s*/i, ""));
      continue;
    }

    if (currentType) {
      currentContent += (currentContent ? " " : "") + trimmed;
    }
  }

  flush();
  return sections;
}

function parseSkillLine(line: string): ParsedSkill {
  const clean = stripMarkdown(line.replace(/^__BOLD__/, ""));
  const idx = clean.indexOf(":");
  if (idx === -1) return { category: "Skills", items: clean };
  return {
    category: clean.slice(0, idx).trim(),
    items: clean.slice(idx + 1).trim(),
  };
}

function parseTitleCompanyDates(line: string): {
  title: string;
  subtitle: string;
  dates: string;
} {
  const clean = stripMarkdown(line.replace(/^__BOLD__/, ""));
  const datesMatch = clean.match(/\(([^)]+)\)\s*$/);
  const dates = datesMatch?.[1]?.trim() ?? "";
  const withoutDates = datesMatch ? clean.slice(0, datesMatch.index).trim() : clean;

  const commaIdx = withoutDates.indexOf(",");
  if (commaIdx === -1) {
    return { title: withoutDates, subtitle: "", dates };
  }

  return {
    title: withoutDates.slice(0, commaIdx).trim(),
    subtitle: withoutDates.slice(commaIdx + 1).trim(),
    dates,
  };
}

function parseProjectTitleLine(line: string): { title: string; description: string } {
  const clean = stripMarkdown(line.replace(/^__BOLD__/, ""));
  // Split on first comma only: "**Name**, description"
  const commaIdx = clean.indexOf(",");
  if (commaIdx === -1) return { title: clean, description: "" };
  return {
    title: clean.slice(0, commaIdx).trim(),
    description: clean.slice(commaIdx + 1).trim(),
  };
}

function findCertId(text: string, lookup: Map<string, string>): string | null {
  const lower = text.toLowerCase();
  if (lookup.has(lower)) return lookup.get(lower)!;
  for (const [name, id] of lookup) {
    if (lower.includes(name)) return id;
  }
  return null;
}

function groupExperienceItems(items: string[]): ParsedEntry[] {
  const entries: ParsedEntry[] = [];
  let current: ParsedEntry | null = null;

  for (const item of items) {
    if (item.startsWith("__BOLD__")) {
      if (current) entries.push(current);
      const header = parseTitleCompanyDates(item);
      current = {
        title: header.title,
        subtitle: header.subtitle,
        dates: header.dates,
        bullets: [],
      };
      continue;
    }
    if (current) current.bullets.push(stripMarkdown(item));
  }

  if (current) entries.push(current);
  return entries;
}

function groupProjectItems(items: string[]): ParsedEntry[] {
  const entries: ParsedEntry[] = [];
  let current: ParsedEntry | null = null;

  for (const item of items) {
    if (item.startsWith("__BOLD__")) {
      if (current) entries.push(current);
      const header = parseProjectTitleLine(item);
      current = {
        title: header.title,
        description: header.description,
        subtitle: "",
        dates: "",
        bullets: [],
      };
      continue;
    }
    if (item.startsWith("__STACK__")) {
      if (current) current.stack = item.replace("__STACK__", "");
      continue;
    }
    if (current) current.bullets.push(stripMarkdown(item));
  }

  if (current) entries.push(current);
  return entries;
}

function dedupeSections(sections: CvSection[]): CvSection[] {
  const seen = new Set<string>();
  return sections.filter((section) => {
    if (section.type === "name") return true;
    if (seen.has(section.type)) return false;
    seen.add(section.type);
    return true;
  });
}

function sortSectionsForAts(sections: CvSection[]): CvSection[] {
  const name = sections.find((s) => s.type === "name");
  const byType = new Map(sections.map((s) => [s.type, s]));

  const ordered = ATS_SECTION_ORDER.map((type) => byType.get(type)).filter(
    (s): s is CvSection => Boolean(s)
  );

  return name ? [name, ...ordered] : ordered;
}

function getContactLink(segment: string): { text: string; src: string } | null {
  const lower = segment.toLowerCase();
  if (lower.includes("github.com")) {
    return { text: segment, src: segment.startsWith("http") ? segment : `https://${segment}` };
  }
  if (lower.includes("linkedin.com")) {
    return { text: segment, src: segment.startsWith("http") ? segment : `https://${segment}` };
  }
  if (lower.includes("dvillagrans.dev") || lower.includes(".dev")) {
    return { text: segment, src: segment.startsWith("http") ? segment : `https://${segment}` };
  }
  if (lower.includes("@") && lower.includes(".")) {
    return { text: segment, src: `mailto:${segment}` };
  }
  if (/^\+?\d[\d\s-]{7,}$/.test(segment)) {
    return { text: segment, src: `tel:${segment.replace(/\s/g, "")}` };
  }
  return null;
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <>
      {bullets.map((bullet, index) => (
        <View key={index} style={styles.bulletRow} wrap={false}>
          <Text style={styles.bulletGlyph}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </>
  );
}

function ExperienceEntry({ entry }: { entry: ParsedEntry }) {
  return (
    <View style={styles.entryBlock} wrap={false}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        {entry.dates ? <Text style={styles.entryDates}>{entry.dates}</Text> : null}
      </View>
      {entry.subtitle ? <Text style={styles.entrySubtitle}>{entry.subtitle}</Text> : null}
      <BulletList bullets={entry.bullets} />
    </View>
  );
}

function ProjectEntry({ entry }: { entry: ParsedEntry }) {
  return (
    <View style={styles.projectBlock}>
      <Text style={styles.projectTitle}>{entry.title}</Text>
      {entry.description ? (
        <Text style={styles.projectDesc}>{entry.description}</Text>
      ) : null}
      {entry.stack ? (
        <Text style={styles.stackLine}>Technologies: {entry.stack}</Text>
      ) : null}
      <BulletList bullets={entry.bullets} />
    </View>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function CvPdfDocument({
  markdown,
  certifications = [],
}: {
  markdown: string;
  certifications?: Certification[];
}) {
  const sections = sortSectionsForAts(dedupeSections(parseMarkdown(markdown)));
  const nameSection = sections.find((s) => s.type === "name");

  const rawHeader = nameSection?.content || "Diego Villagran Salazar";
  const contactMatch = rawHeader.match(/\(([^)]+)\)/);
  const name = stripMarkdown(
    contactMatch ? rawHeader.replace(/\([^)]+\)/, "").trim() : rawHeader.split(/\n/)[0]?.trim() || rawHeader
  );

  const contactRaw = contactMatch?.[1] ?? rawHeader.split(/\n/)[1]?.replace(/^\(|\)$/g, "") ?? "";
  const contactSegments = contactRaw
    .split("·")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const certLookup = new Map<string, string>();
  for (const cert of certifications) {
    certLookup.set(cert.name.toLowerCase(), cert.id);
  }

  const contentSections = sections.filter((s) => s.type !== "name");

  return (
    <Document
      title={`${name} — Resume`}
      author={name}
      subject="Resume"
      keywords="resume, curriculum vitae, ATS"
    >
      <Page size="LETTER" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          {contactSegments.length > 0 && (
            <View style={styles.contactRow}>
              {contactSegments.map((segment, index) => {
                const link = getContactLink(segment);
                return (
                  <React.Fragment key={index}>
                    {index > 0 ? <Text style={styles.contactSep}>|</Text> : null}
                    {link ? (
                      <Link src={link.src} style={styles.contactLink}>
                        {link.text}
                      </Link>
                    ) : (
                      <Text style={styles.contactText}>{segment}</Text>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          )}
        </View>

        {contentSections.map((section) => {
          const title = SECTION_LABELS[section.type] || section.type;

          if (section.type === "professional summary") {
            return (
              <SectionBlock key={section.type} title={title}>
                <Text style={styles.summary}>{stripMarkdown(section.content)}</Text>
              </SectionBlock>
            );
          }

          if (section.type === "technical skills") {
            const skillLines =
              section.items.length > 0
                ? section.items.map((item) => parseSkillLine(item))
                : section.content
                  ? [{ category: "Skills", items: stripMarkdown(section.content) }]
                  : [];

            return (
              <SectionBlock key={section.type} title={title}>
                {skillLines.map((skill, index) => (
                  <View key={index} style={styles.skillRow} wrap={false}>
                    <Text style={styles.skillCategory}>{skill.category}</Text>
                    <Text style={styles.skillItems}>{skill.items}</Text>
                  </View>
                ))}
              </SectionBlock>
            );
          }

          if (section.type === "professional experience") {
            return (
              <SectionBlock key={section.type} title={title}>
                {groupExperienceItems(section.items).map((entry, index) => (
                  <ExperienceEntry key={index} entry={entry} />
                ))}
              </SectionBlock>
            );
          }

          if (section.type === "education") {
            return (
              <SectionBlock key={section.type} title={title}>
                {section.items.map((item, index) => {
                  const parsed = parseTitleCompanyDates(item.startsWith("__BOLD__") ? item : `__BOLD__${item}`);
                  return (
                    <View key={index} style={styles.entryBlock} wrap={false}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryTitle}>{parsed.title}</Text>
                        {parsed.dates ? <Text style={styles.entryDates}>{parsed.dates}</Text> : null}
                      </View>
                      {parsed.subtitle ? <Text style={styles.entrySubtitle}>{parsed.subtitle}</Text> : null}
                    </View>
                  );
                })}
                {section.content ? (
                  <Text style={styles.summary}>{stripMarkdown(section.content)}</Text>
                ) : null}
              </SectionBlock>
            );
          }

          if (section.type === "featured projects") {
            return (
              <SectionBlock key={section.type} title={title}>
                {groupProjectItems(section.items).map((entry, index) => (
                  <ProjectEntry key={index} entry={entry} />
                ))}
              </SectionBlock>
            );
          }

          if (section.type === "certifications") {
            const certLines =
              section.items.length > 0
                ? section.items.map((item) => stripMarkdown(item.replace(/^__BOLD__/, "")))
                : section.content
                    .split(/\n|(?<=\))\s{2,}/)
                    .map((line) => stripMarkdown(line.trim()))
                    .filter(Boolean);

            return (
              <SectionBlock key={section.type} title={title}>
                {certLines.map((text, index) => (
                  <Text key={index} style={styles.certLine}>
                    • {text}
                  </Text>
                ))}
              </SectionBlock>
            );
          }

          return null;
        })}
      </Page>
    </Document>
  );
}
