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

const ACCENT = "#2563eb"; // blue accent for links/highlights

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.5,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 48,
    paddingRight: 48,
    color: "#1a1a1a",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#1a1a1a",
  },
  contactLine: {
    fontSize: 8,
    color: "#555",
    marginBottom: 12,
  },
  contactLink: {
    fontSize: 8,
    color: ACCENT,
    textDecoration: "none",
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    borderBottomStyle: "solid",
    color: "#1a1a1a",
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.55,
    marginBottom: 4,
    color: "#333",
  },
  skillLine: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 3,
    color: "#333",
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 1,
    marginTop: 6,
  },
  jobMeta: {
    fontSize: 8.5,
    color: "#666",
    marginBottom: 3,
  },
  bullet: {
    fontSize: 9,
    lineHeight: 1.5,
    marginLeft: 10,
    marginBottom: 3,
    color: "#333",
  },
  projectBlock: {
    marginBottom: 8,
  },
  projectTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 1,
  },
  projectStack: {
    fontSize: 8,
    color: "#666",
    marginBottom: 2,
    marginLeft: 0,
  },
  projectBullet: {
    fontSize: 9,
    color: "#333",
    lineHeight: 1.5,
    marginLeft: 10,
    marginBottom: 2,
  },
  educationBlock: {
    marginBottom: 3,
  },
  educationLine: {
    fontSize: 9.5,
    color: "#333",
    marginBottom: 2,
  },
  certLine: {
    fontSize: 8.5,
    color: "#333",
    marginBottom: 2,
    lineHeight: 1.4,
  },
  certLink: {
    fontSize: 8.5,
    color: ACCENT,
    textDecoration: "none",
  },
  certGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  certItem: {
    width: "48%",
    marginBottom: 3,
  },
});

interface CvSection {
  type: string;
  content: string;
  items: string[];
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
        items: currentItems,
      });
    }
    currentType = "";
    currentContent = "";
    currentItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // H1 — name (capture name + next line for contact info)
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      flush();
      currentType = "__name__";
      currentContent = trimmed.replace(/^# /, "");
      continue;
    }

    // H2 — section header
    if (trimmed.startsWith("## ")) {
      flush();
      currentType = trimmed.replace(/^## /, "").toLowerCase();
      continue;
    }

    // Bullet (- or •)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      currentItems.push(trimmed.replace(/^[-*•]\s*/, ""));
      continue;
    }

    // Bold line (job title, project title, etc.)
    if (trimmed.startsWith("**")) {
      currentItems.push("__BOLD__" + trimmed);
      continue;
    }

    // Stack: line
    if (trimmed.toLowerCase().startsWith("stack:")) {
      currentItems.push("__STACK__" + trimmed.replace(/^stack:\s*/i, ""));
      continue;
    }

    // Regular text
    if (currentType) {
      currentContent += (currentContent ? " " : "") + trimmed;
    }
  }

  flush();
  return sections;
}

function renderInline(text: string): React.ReactNode[] {
  // Split text by **bold** markers and render bold/normal segments
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Text key={match.index} style={{ fontWeight: "bold" }}>
        {match[1]}
      </Text>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1");
}

/**
 * Match a certification text line to a known certification ID.
 * Tries exact match first, then checks if the cert name is contained in the line.
 */
function findCertId(text: string, lookup: Map<string, string>): string | null {
  const lower = text.toLowerCase();
  // Exact match
  if (lookup.has(lower)) return lookup.get(lower)!;
  // Check if any cert name is contained in the text
  for (const [name, id] of lookup) {
    if (lower.includes(name)) return id;
  }
  return null;
}

export function CvPdfDocument({
  markdown,
  certifications = [],
}: {
  markdown: string;
  certifications?: Certification[];
}) {
  const sections = parseMarkdown(markdown);

  // Deduplicate sections by type — DeepBoost sometimes generates duplicates
  const seenTypes = new Set<string>();
  const uniqueSections = sections.filter((s) => {
    if (s.type === "name") return true;
    if (seenTypes.has(s.type)) return false;
    seenTypes.add(s.type);
    return true;
  });

  const nameSection = uniqueSections.find((s) => s.type === "name");

  // Split name from contact
  const rawName = nameSection?.content || "Diego Villagran Salazar";
  const nameParts = rawName.split(/\n|(?=·)/);
  const name = nameParts[0]?.trim() || rawName;
  const contactRaw = nameParts.length > 1 ? nameParts.slice(1).join(" ").trim() : "";

  // Parse contact into segments with clickable links
  const contactSegments = contactRaw
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

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

  // Build a lookup for certification links by name matching
  const certLookup = new Map<string, string>();
  for (const cert of certifications) {
    certLookup.set(cert.name.toLowerCase(), cert.id);
  }

  const titleMap: Record<string, string> = {
    "professional summary": "Professional Summary",
    "technical skills": "Technical Skills",
    "professional experience": "Professional Experience",
    "featured projects": "Featured Projects",
    education: "Education",
    certifications: "Certifications",
  };

  const renderSection = (section: CvSection, index: number): React.ReactNode => {
    if (section.type === "name") return null;

    const title = titleMap[section.type] || section.type;

    return (
      <View key={index} wrap={false}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {/* Summary */}
        {section.type === "professional summary" && section.content && (
          <Text style={styles.summary}>{stripMarkdown(section.content)}</Text>
        )}

        {/* Skills — single line or grouped */}
        {section.type === "technical skills" && (
          <>
            {section.items.length > 0
              ? section.items.map((item, i) => {
                  const clean = item.startsWith("__BOLD__")
                    ? item.replace("__BOLD__", "")
                    : item;
                  return (
                    <Text key={i} style={styles.skillLine}>
                      {renderInline(clean)}
                    </Text>
                  );
                })
              : section.content && (
                  <Text style={styles.skillLine}>{section.content}</Text>
                )}
          </>
        )}

        {/* Experience */}
        {section.type === "professional experience" &&
          section.items.map((item, i) => {
            if (item.startsWith("__BOLD__")) {
              const raw = item.replace("__BOLD__", "");
              return (
                <Text key={i} style={styles.jobTitle}>
                  {renderInline(raw)}
                </Text>
              );
            }
            return (
              <Text key={i} style={styles.bullet}>
                • {renderInline(item)}
              </Text>
            );
          })}

        {/* Projects — grouped blocks */}
        {section.type === "featured projects" && (
          <ProjectBlocks items={section.items} />
        )}

        {/* Education */}
        {section.type === "education" && (
          <View style={styles.educationBlock}>
            {section.items.map((item, i) => {
              const clean = item.startsWith("__BOLD__")
                ? item.replace("__BOLD__", "")
                : item;
              return (
                <Text key={i} style={styles.educationLine}>
                  {renderInline(clean)}
                </Text>
              );
            })}
            {section.content && (
              <Text style={styles.educationLine}>{section.content}</Text>
            )}
          </View>
        )}

        {/* Certifications — 2-column grid */}
        {section.type === "certifications" && (
          <View style={styles.certGrid}>
            {(section.items.length > 0
              ? section.items.map((item) => {
                  const clean = item.startsWith("__BOLD__")
                    ? item.replace("__BOLD__", "")
                    : item;
                  return stripMarkdown(clean);
                })
              : section.content
                ? section.content.split(/\n|(?<=\))\s{2,}/).filter(Boolean).map((l) => stripMarkdown(l.trim()))
                : []
            ).map((text, i) => {
              if (!text) return null;
              const matchedId = findCertId(text, certLookup);
              return (
                <View key={i} style={styles.certItem}>
                  {matchedId ? (
                    <Text style={styles.certLine}>
                      •{" "}
                      <Link
                        src={`https://www.dvillagrans.dev/about#${matchedId}`}
                        style={styles.certLink}
                      >
                        {text}
                      </Link>
                    </Text>
                  ) : (
                    <Text style={styles.certLine}>• {text}</Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{stripMarkdown(name)}</Text>
        {contactSegments.length > 0 && (
          <Text style={styles.contactLine}>
            {contactSegments.map((segment, i) => {
              const link = getContactLink(segment);
              return (
                <React.Fragment key={i}>
                  {i > 0 && " · "}
                  {link ? (
                    <Link src={link.src} style={styles.contactLink}>
                      {link.text}
                    </Link>
                  ) : (
                    segment
                  )}
                </React.Fragment>
              );
            })}
          </Text>
        )}
        {uniqueSections.map((section, index) => renderSection(section, index))}
      </Page>
    </Document>
  );
}

// Separate component for project blocks with better formatting
function ProjectBlocks({ items }: { items: string[] }) {
  // Group items into project blocks: BOLD title, optional STACK, then bullets
  const blocks: {
    title: string;
    stack: string;
    bullets: string[];
  }[] = [];

  let current: { title: string; stack: string; bullets: string[] } | null = null;

  for (const item of items) {
    if (item.startsWith("__BOLD__")) {
      if (current) blocks.push(current);
      current = {
        title: item.replace("__BOLD__", "").replace(/\*\*/g, ""),
        stack: "",
        bullets: [],
      };
    } else if (item.startsWith("__STACK__")) {
      if (current) current.stack = item.replace("__STACK__", "");
    } else if (current) {
      current.bullets.push(item);
    }
  }
  if (current) blocks.push(current);

  return (
    <>
      {blocks.map((block, i) => (
        <View key={i} style={styles.projectBlock}>
          <Text style={styles.projectTitle}>{block.title}</Text>
          {block.stack && <Text style={styles.projectStack}>Stack: {block.stack}</Text>}
          {block.bullets.map((b, bi) => (
            <Text key={bi} style={styles.projectBullet}>
              • {stripMarkdown(b)}
            </Text>
          ))}
        </View>
      ))}
    </>
  );
}
