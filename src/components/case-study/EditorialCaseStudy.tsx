"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import type { EditorialCaseStudyDict } from "@/i18n/types";
import type { CaseStudySlug } from "@/data/case-study-media";
import { getCaseStudyMedia } from "@/data/case-study-media";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyMetrics } from "@/components/case-study/CaseStudyMetrics";
import { CaseStudyTldr } from "@/components/case-study/CaseStudyTldr";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import { useCaseStudyReveal } from "@/components/case-study/useCaseStudyReveal";
import { AlertCircle, Activity, Quote } from "lucide-react";

interface EditorialCaseStudyProps {
  dict: EditorialCaseStudyDict;
  slug: CaseStudySlug;
  actions?: ReactNode;
  schema?: ReactNode;
}

function constraintItems(dict: EditorialCaseStudyDict) {
  const { c1, c2, c3, c4, c5 } = dict.constraints;
  return [c1, c2, c3, c4, c5];
}

function architectureItems(dict: EditorialCaseStudyDict) {
  const { d1, d2, d3, d4 } = dict.architecture;
  return [d1, d2, d3, d4];
}

function lessonItems(dict: EditorialCaseStudyDict) {
  const { l1, l2, l3 } = dict.lessons;
  return [l1, l2, l3];
}

export function EditorialCaseStudy({ dict, slug, actions, schema }: EditorialCaseStudyProps) {
  const containerRef = useCaseStudyReveal();
  const media = getCaseStudyMedia(slug);

  return (
    <>
      <Navbar />
      <main
        ref={containerRef}
        className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-24 selection:bg-warm/30 selection:text-white md:px-12 md:pt-32 md:pb-32 lg:px-8"
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        {schema}

        <CaseStudyHeader
          back={dict.back}
          eyebrow={dict.eyebrow}
          title={dict.title}
          subtitle={dict.subtitle}
          actions={actions}
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
          <blockquote className="font-serif text-2xl leading-snug text-offwhite/85 md:text-3xl">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {constraintItems(dict).map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.02] p-6"
              >
                <h3 className="mb-2 font-serif text-lg text-offwhite">{item.title}</h3>
                <p className="text-sm leading-relaxed text-offwhite/55">
                  {item.text1}
                  {item.bold1 && <span className="font-medium text-offwhite">{item.bold1}</span>}
                  {item.text2}
                  {item.bold2 && <span className="font-medium text-offwhite">{item.bold2}</span>}
                </p>
                {item.tag && (
                  <span className="mt-4 inline-block rounded-full border border-warm/20 bg-warm/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-warm/80">
                    {item.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          eyebrow={dict.pipeline.title1}
          title={dict.pipeline.title2}
          description={dict.pipeline.desc}
        >
          <CaseStudyHeroMedia media={media} />
        </CaseStudySection>

        <CaseStudySection eyebrow={dict.architecture.title1} title={dict.architecture.title2}>
          <div className="flex flex-col gap-6">
            {architectureItems(dict).map((d, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.015] md:flex"
              >
                <div className="border-b border-offwhite/[0.06] p-6 md:w-1/3 md:border-b-0 md:border-r">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-warm/70">
                    {d.nav}
                  </span>
                  <h3 className="font-serif text-xl text-offwhite">{d.title}</h3>
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
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          eyebrow={dict.lessons.title1}
          title={dict.lessons.title2}
          description={dict.lessons.desc}
        >
          <div className="flex flex-col gap-4">
            {lessonItems(dict).map((l, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-offwhite/[0.08] bg-offwhite/[0.02] p-6 md:p-7"
              >
                <h3 className="mb-2 flex items-center gap-2 font-serif text-lg text-offwhite">
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
