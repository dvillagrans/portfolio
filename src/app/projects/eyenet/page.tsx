"use client";

import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { EyeNetProjectSchema } from "@/components/ui/SchemaOrg";
import PipelineFlow from "@/components/ui/PipelineFlow";
import { eyenetEn, eyenetEs } from "@/i18n/dictionaries/eyenet";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyMetrics } from "@/components/case-study/CaseStudyMetrics";
import { CaseStudyTldr } from "@/components/case-study/CaseStudyTldr";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { useCaseStudyReveal } from "@/components/case-study/useCaseStudyReveal";
import {
  AlertCircle,
  Zap,
  Database,
  Server,
  Brain,
  LayoutTemplate,
  Activity,
  Quote,
  Lock,
} from "lucide-react";

export default function EyeNetCaseStudy() {
  const { language } = useLanguage();
  const dict = language === "es" ? eyenetEs : eyenetEn;
  const containerRef = useCaseStudyReveal();
  const isEn = language === "en";

  if (!dict) return null;

  const badges = [
    { label: isEn ? "Apr 2025 – May 2026" : "Abr 2025 – May 2026" },
    { label: isEn ? "Remote" : "Remoto" },
    {
      label: isEn ? "Partial NDA" : "NDA parcial",
      icon: <Lock size={10} />,
      accent: true,
    },
  ];

  return (
    <>
      <Navbar />
      <main
        ref={containerRef}
        className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-24 selection:bg-warm/30 selection:text-white md:px-12 md:pt-32 md:pb-32 lg:px-8"
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        <EyeNetProjectSchema />

        <CaseStudyHeader
          back={dict.back}
          eyebrow={dict.eyebrow}
          title={dict.title}
          subtitle={dict.subtitle}
          badges={badges}
        />

        <CaseStudyMetrics metrics={dict.metrics} />
        <CaseStudyTldr {...dict.tldr} />

        <section className="reveal-fade mb-12 grid grid-cols-2 gap-6 border-y border-offwhite/10 py-8 font-mono text-xs md:mb-14 md:grid-cols-4">
          {dict.meta.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="uppercase text-offwhite/40">{item.label}</span>
              <span className="text-offwhite/90">{item.value}</span>
            </div>
          ))}
        </section>

        <section className="reveal-fade mb-16 max-w-3xl md:mb-20">
          <Quote className="mb-4 h-8 w-8 text-warm/25" />
          <blockquote className="font-display text-2xl leading-snug text-offwhite/85 md:text-3xl">
            &ldquo;{dict.quote.text}
            <span className="text-warm italic">{dict.quote.bold}</span>
            {dict.quote.text2}&rdquo;
          </blockquote>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-offwhite/40">
            {dict.quote.title}
          </p>
        </section>

        <CaseStudySection
          eyebrow={dict.constraints.title1}
          title={dict.constraints.title2}
          description={dict.constraints.desc}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: <Database size={22} />, data: dict.constraints.c1 },
              { icon: <Server size={22} />, data: dict.constraints.c2 },
              { icon: <Brain size={22} />, data: dict.constraints.c3 },
            ].map((card, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.02] p-6 transition-colors hover:border-warm/20"
              >
                <h3 className="mb-3 flex items-center gap-2 font-display text-lg text-offwhite">
                  <span className="text-warm/70">{card.icon}</span>
                  {card.data.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-offwhite/55">
                  {card.data.text1}
                  <span className="font-medium text-offwhite">{card.data.bold1}</span>
                  {card.data.text2}
                </p>
                <span className="inline-block rounded-full border border-warm/20 bg-warm/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-warm/80">
                  {card.data.tag}
                </span>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          eyebrow={dict.systems.title1}
          title={dict.systems.title2}
          description={dict.systems.desc}
        >
          <PipelineFlow lang={language as "en" | "es"} />
        </CaseStudySection>

        <CaseStudySection
          eyebrow={dict.architecture.title1}
          title={dict.architecture.title2}
        >
          <div className="flex flex-col gap-6">
            {[dict.architecture.d1, dict.architecture.d2, dict.architecture.d3, dict.architecture.d4].map(
              (d, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.015] md:flex"
                >
                  <div className="border-b border-offwhite/[0.06] p-6 md:w-1/3 md:border-b-0 md:border-r">
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-warm/70">
                      {d.nav}
                    </span>
                    <h3 className="font-display text-xl text-offwhite">{d.title}</h3>
                  </div>
                  <div className="flex flex-col justify-center gap-5 p-6 md:w-2/3 md:p-8">
                    <p className="text-sm leading-relaxed text-offwhite/60 md:text-base">
                      {d.desc}
                      <span className="font-medium text-offwhite">{d.bold}</span>
                      {d.desc2}
                    </p>
                    <div className="rounded-r-xl border-l-2 border-warm bg-warm/[0.06] p-5">
                      <h4 className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-warm">
                        <Activity size={12} />
                        {d.costTitle}
                      </h4>
                      <p className="text-sm text-offwhite/65">{d.costDesc}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </CaseStudySection>

        <CaseStudySection eyebrow={dict.stack.title1} title={dict.stack.title2}>
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dict.stack.layers.map((layer, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.02] p-5"
              >
                <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/35">
                  {layer.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-offwhite/[0.08] bg-offwhite/[0.02] px-2.5 py-1 text-[10px] font-bold tracking-wider text-offwhite/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {dict.stack.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-offwhite/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-offwhite/35"
              >
                {tag}
              </span>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          eyebrow={dict.lessons.title1}
          title={dict.lessons.title2}
          description={dict.lessons.desc}
        >
          <div className="flex flex-col gap-4">
            {[dict.lessons.l1, dict.lessons.l2, dict.lessons.l3].map((l, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.02] p-6 md:p-7"
              >
                <h3 className="mb-2 flex items-center gap-2 font-display text-lg text-offwhite">
                  {l.title}
                  <AlertCircle className="text-red-400/70" size={16} />
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-offwhite/55">{l.desc}</p>
                <span className="inline-block rounded-full border border-warm/20 bg-warm/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-warm/80">
                  {l.tag}
                </span>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudyFooter footer={dict.footer} />
      </main>
    </>
  );
}
