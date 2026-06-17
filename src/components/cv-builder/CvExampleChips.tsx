"use client";

import type { ExampleJd } from "@/data/cv/example-jds";

interface CvExampleChipsProps {
  examples: ExampleJd[];
  label: string;
  disabled?: boolean;
  onSelect: (text: string) => void;
}

export function CvExampleChips({ examples, label, disabled, onSelect }: CvExampleChipsProps) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(ex.text)}
            className="rounded-full border px-3 py-1.5 font-sans text-xs transition-colors hover:border-warm/40 hover:text-warm disabled:opacity-40"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-primary)",
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
