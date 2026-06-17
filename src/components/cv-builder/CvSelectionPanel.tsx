"use client";

import type { CvSelectionSummary } from "@/lib/cv/format-selection";

interface CvSelectionPanelProps {
  selection: CvSelectionSummary;
  labels: {
    title: string;
    projects: string;
    experience: string;
    skills: string;
  };
}

export function CvSelectionPanel({ selection, labels }: CvSelectionPanelProps) {
  return (
    <div
      className="mb-6 rounded-2xl border px-5 py-5 md:px-6"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border-color)",
      }}
    >
      <h3
        className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {labels.title}
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="mb-2 font-sans text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
            {labels.projects}
          </p>
          <ul className="space-y-1.5">
            {selection.projects.map((p) => (
              <li key={p.id} className="font-sans text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
                {p.name}
                {p.score > 0 && (
                  <span className="ml-1 font-mono text-[9px] text-warm/80">+{p.score}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-sans text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
            {labels.experience}
          </p>
          <ul className="space-y-1.5">
            {selection.experience.map((e) => (
              <li key={e.id} className="font-sans text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>
                {e.title}, {e.company}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 font-sans text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
            {labels.skills}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selection.skills.slice(0, 12).map((skill) => (
              <span
                key={skill}
                className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-muted)",
                  backgroundColor: "var(--bg-primary)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
