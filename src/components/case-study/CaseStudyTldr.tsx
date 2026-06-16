"use client";

import { AlertCircle, Zap, Activity } from "lucide-react";

interface TldrCard {
  title: string;
  text1: string;
  bold?: string;
  text2?: string;
  cyan?: string;
  text3?: string;
}

interface CaseStudyTldrProps {
  challenge: TldrCard;
  solution: TldrCard & { cyan?: string; text3?: string };
  impact: TldrCard & { bold?: string };
  accent?: string;
}

export function CaseStudyTldr({ challenge, solution, impact, accent = "warm" }: CaseStudyTldrProps) {
  const accentBorder = accent === "warm" ? "hover:border-warm/30" : `hover:border-${accent}/30`;

  return (
    <section
      className="reveal-fade mb-12 grid grid-cols-1 gap-4 md:mb-14 xl:grid-cols-3"
      aria-labelledby="tldr-heading"
    >
      <h2 id="tldr-heading" className="sr-only">
        Summary
      </h2>
      <div className={`rounded-2xl border border-offwhite/10 bg-offwhite/[0.02] p-6 transition-colors ${accentBorder}`}>
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-offwhite/70">
          <AlertCircle size={14} className="text-warm/80" />
          {challenge.title}
        </h3>
        <p className="text-sm leading-relaxed text-offwhite/60">
          {challenge.text1}
          {challenge.bold && <span className="font-medium text-offwhite">{challenge.bold}</span>}
          {challenge.text2}
        </p>
      </div>
      <div className={`rounded-2xl border border-offwhite/10 bg-offwhite/[0.02] p-6 transition-colors ${accentBorder}`}>
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-offwhite/70">
          <Zap size={14} className="text-warm/70" />
          {solution.title}
        </h3>
        <p className="text-sm leading-relaxed text-offwhite/60">
          {solution.text1}
          {solution.bold && <span className="font-medium text-offwhite">{solution.bold}</span>}
          {solution.text2}
          {solution.cyan && <span className="text-warm/90">{solution.cyan}</span>}
          {solution.text3}
        </p>
      </div>
      <div className="rounded-2xl border border-warm/20 bg-warm/[0.04] p-6">
        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-offwhite/80">
          <Activity size={14} className="text-warm" />
          {impact.title}
        </h3>
        <p className="text-sm leading-relaxed text-offwhite/80">
          {impact.bold && <span className="font-medium text-offwhite">{impact.bold}</span>}
          {impact.text1}
        </p>
      </div>
    </section>
  );
}
