"use client";

import { ArrowUpRight } from "lucide-react";

export function CaseStudyExternalActions({
  dashboardHref,
  dashboardLabel,
  repoHref,
  repoLabel,
}: {
  dashboardHref: string;
  dashboardLabel: string;
  repoHref?: string;
  repoLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={dashboardHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-warm px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-warm/90"
      >
        {dashboardLabel}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
      {repoHref && repoLabel && (
        <a
          href={repoHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-offwhite/20 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-offwhite/75 transition-colors hover:border-offwhite/40 hover:text-offwhite"
        >
          {repoLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
