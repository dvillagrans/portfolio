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
    fontSize: 9,
    color: "#333",
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
        type: currentType,
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

    // H1 — name
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      flush();
      sections.push({ type: "name", content: trimmed.replace(/^# /, ""), items: [] });
      continue;
    }

    // H2 — section header
    if (trimmed.startsWith("## ")) {
      flush();
      currentType = trimmed.replace(/^## /, "").toLowerCase();
      continue;
    }

    // Bullet
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentItems.push(trimmed.replace(/^[-*] /, ""));
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

export function CvPdfDocument({ markdown }: { markdown: string }) {
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
  const contact = nameParts.length > 1 ? nameParts.slice(1).join(" ").trim() : "";

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
              ? section.items.map((item, i) => (
                  <Text key={i} style={styles.skillLine}>
                    {renderInline(item)}
                  </Text>
                ))
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
                • {stripMarkdown(item)}
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
            {section.items.map((item, i) => (
              <Text key={i} style={styles.educationLine}>
                {renderInline(item)}
              </Text>
            ))}
            {section.content && (
              <Text style={styles.educationLine}>{section.content}</Text>
            )}
          </View>
        )}

        {/* Certifications */}
        {section.type === "certifications" &&
          section.items.map((item, i) => (
            <Text key={i} style={styles.certLine}>
              • {stripMarkdown(item)}
            </Text>
          ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{stripMarkdown(name)}</Text>
        {contact && <Text style={styles.contactLine}>{contact}</Text>}
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
