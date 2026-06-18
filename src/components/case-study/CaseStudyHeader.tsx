"use client";

import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export interface CaseStudyBadge {
  label: string;
  icon?: ReactNode;
  accent?: boolean;
}

interface CaseStudyHeaderProps {
  back: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  badges?: CaseStudyBadge[];
  actions?: ReactNode;
}

export function CaseStudyHeader({
  back,
  eyebrow,
  title,
  subtitle,
  badges,
  actions,
}: CaseStudyHeaderProps) {
  return (
    <>
      <div className="mb-10 reveal-fade">
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-offwhite/55 transition-colors hover:text-offwhite"
        >
          <ArrowLeft size={14} />
          {back}
        </Link>
      </div>

      <header className="mb-10 max-w-4xl reveal-fade md:mb-12">
        <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-warm/80">
          {eyebrow}
        </p>
        <h1
          className="font-display italic tracking-tight text-offwhite"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 1.05,
            viewTransitionName: "page-title",
          }}
        >
          {title}
        </h1>
        <p className="mt-5 font-sans text-lg leading-relaxed text-offwhite/60 md:text-xl">
          {subtitle}
        </p>
        {(badges && badges.length > 0) || actions ? (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold tracking-tight ${
                      badge.accent
                        ? "border-warm/25 bg-warm/10 text-warm/90"
                        : "border-offwhite/10 bg-offwhite/[0.03] text-offwhite/50"
                    }`}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
              </div>
            )}
            {actions}
          </div>
        ) : null}
      </header>
    </>
  );
}
