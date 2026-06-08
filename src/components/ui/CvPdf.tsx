"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register a clean font
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
    { src: "Helvetica-Oblique", fontStyle: "italic" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.35,
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 44,
    paddingRight: 44,
    color: "#1a1a1a",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#1a1a1a",
  },
  contactLine: {
    fontSize: 8,
    color: "#555",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    color: "#1a1a1a",
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.4,
    marginBottom: 4,
    color: "#333",
  },
  skillLine: {
    fontSize: 9,
    lineHeight: 1.35,
    marginBottom: 2,
    color: "#333",
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 1,
  },
  jobMeta: {
    fontSize: 8.5,
    color: "#666",
    marginBottom: 2,
  },
  bullet: {
    fontSize: 9,
    lineHeight: 1.3,
    marginLeft: 10,
    marginBottom: 1.5,
    color: "#333",
  },
  projectTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 1,
  },
  projectDesc: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.3,
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
    marginBottom: 1.5,
  },
});

// Simple markdown parser for the CV
function parseMarkdown(md: string) {
  const lines = md.split("\n");
  const sections: {
    type: string;
    content: string;
    items?: string[];
  }[] = [];

  let currentSection = "";
  let currentContent = "";
  let currentItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      // Name
      sections.push({ type: "name", content: trimmed.replace(/^# /, "") });
    } else if (trimmed.startsWith("## ")) {
      // Save previous section
      if (currentSection) {
        sections.push({
          type: currentSection,
          content: currentContent.trim(),
          items: currentItems.length > 0 ? currentItems : undefined,
        });
      }
      currentSection = trimmed.replace(/^## /, "").toLowerCase();
      currentContent = "";
      currentItems = [];
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentItems.push(trimmed.replace(/^[-*] /, ""));
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      // Bold line — job title or similar
      currentItems.push("__BOLD__" + trimmed.replace(/\*\*/g, ""));
    } else if (trimmed) {
      currentContent += (currentContent ? " " : "") + trimmed;
    }
  }

  // Push last section
  if (currentSection) {
    sections.push({
      type: currentSection,
      content: currentContent.trim(),
      items: currentItems.length > 0 ? currentItems : undefined,
    });
  }

  return sections;
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

  const nameSection = sections.find((s) => s.type === "name");
  const contactLine = sections.find(
    (s) => s.type === "name" && s.content.includes("·")
  );

  // Find name without contact info
  const name = nameSection?.content.split("\n")[0] || "Diego Villagran Salazar";
  const contact =
    contactLine?.content.includes("·") && contactLine.content !== name
      ? contactLine.content
      : "";

  const renderSection = (
    section: (typeof sections)[0],
    index: number
  ): React.ReactNode => {
    const titleMap: Record<string, string> = {
      "professional summary": "Professional Summary",
      "technical skills": "Technical Skills",
      "professional experience": "Professional Experience",
      "featured projects": "Featured Projects",
      education: "Education",
      certifications: "Certifications",
    };

    const title = titleMap[section.type] || section.type;

    if (section.type === "name") return null;

    return (
      <View key={index}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {section.type === "professional summary" && section.content && (
          <Text style={styles.summary}>{stripMarkdown(section.content)}</Text>
        )}

        {section.type === "technical skills" && section.items
          ? section.items.map((item, i) => (
              <Text key={i} style={styles.skillLine}>
                {stripMarkdown(item)}
              </Text>
            ))
          : section.content && (
              <Text style={styles.skillLine}>
                {stripMarkdown(section.content)}
              </Text>
            )}

        {section.type === "professional experience" &&
          section.items?.map((item, i) => {
            if (item.startsWith("__BOLD__")) {
              return (
                <Text key={i} style={styles.jobTitle}>
                  {item.replace("__BOLD__", "")}
                </Text>
              );
            }
            return (
              <Text key={i} style={styles.bullet}>
                • {stripMarkdown(item)}
              </Text>
            );
          })}

        {section.type === "featured projects" &&
          section.items?.map((item, i) => {
            if (item.startsWith("__BOLD__")) {
              return (
                <Text key={i} style={styles.projectTitle}>
                  {item.replace("__BOLD__", "")}
                </Text>
              );
            }
            return (
              <Text key={i} style={styles.projectDesc}>
                • {stripMarkdown(item)}
              </Text>
            );
          })}

        {section.type === "education" &&
          section.items?.map((item, i) => (
            <Text key={i} style={styles.educationLine}>
              {stripMarkdown(item)}
            </Text>
          ))}

        {section.type === "certifications" &&
          section.items?.map((item, i) => (
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
        {sections.map((section, index) => renderSection(section, index))}
      </Page>
    </Document>
  );
}
