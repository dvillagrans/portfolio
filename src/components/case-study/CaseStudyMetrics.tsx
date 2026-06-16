"use client";

import CountUpMetric from "@/components/ui/CountUpMetric";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudyMetricsProps {
  metrics: Metric[];
}

export function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  return (
    <section className="reveal-fade mb-12 grid grid-cols-2 gap-6 border-y border-offwhite/10 py-8 md:mb-14 md:grid-cols-4">
      {metrics.map((m, idx) => (
        <div key={`${m.value}-${m.label}`} className="flex flex-col gap-1.5">
          <CountUpMetric
            value={m.value}
            delay={idx}
            className="font-sans text-2xl font-bold tabular-nums tracking-tight text-offwhite md:text-3xl"
          />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-offwhite/40">
            {m.label}
          </span>
        </div>
      ))}
    </section>
  );
}
