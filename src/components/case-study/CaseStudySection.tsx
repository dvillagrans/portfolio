"use client";

import type { ReactNode } from "react";

interface CaseStudySectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function CaseStudySection({
  eyebrow,
  title,
  description,
  children,
  className = "mb-20 md:mb-24",
}: CaseStudySectionProps) {
  return (
    <section className={`reveal-fade ${className}`}>
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-offwhite/40">
            {eyebrow}
          </p>
          <h2 className="font-serif text-2xl leading-tight text-offwhite/90 md:text-3xl">
            {title}
          </h2>
        </div>
        {description && (
          <p className="max-w-xs border-l border-offwhite/15 pl-4 text-sm leading-relaxed text-offwhite/45">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
