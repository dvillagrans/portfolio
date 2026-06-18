"use client";

import React, { useState, useCallback } from "react";
import { ArrowUpRight, Clock, Users, Zap, Shield, Database, LayoutTemplate, Activity, FileCheck2, AlertCircle, Quote, ZoomIn } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { timeupEn, timeupEs } from "@/i18n/dictionaries/timeup";
import { TimeUpProjectSchema } from "@/components/ui/SchemaOrg";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyMetrics } from "@/components/case-study/CaseStudyMetrics";
import { CaseStudyTldr } from "@/components/case-study/CaseStudyTldr";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { CaseStudyLightbox } from "@/components/case-study/CaseStudyLightbox";
import { useCaseStudyReveal } from "@/components/case-study/useCaseStudyReveal";

const IMAGES = [
  { src: "/img/timeup/admin-analytics.png", alt: "Administrador TimeUp" },
  { src: "/img/timeup/owner-finance.png", alt: "Finanzas Dueño" },
  { src: "/img/timeup/staff-dashboard.png", alt: "Agenda Staff" },
];

export default function TimeUpCaseStudy() {
  const { language } = useLanguage();
  const dict = language === "es" ? timeupEs : timeupEn;
  const containerRef = useCaseStudyReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null), []);
  const nextImage = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % IMAGES.length : null), []);

  return (
    <>
      <Navbar />
      {lightbox !== null && (
        <CaseStudyLightbox images={IMAGES} index={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} accentClass="bg-timeup-cyan" />
      )}
      <main ref={containerRef} className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-24 md:px-12 md:pt-32 md:pb-32 lg:px-8"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <TimeUpProjectSchema />

        <CaseStudyHeader
          back={dict.back}
          eyebrow={dict.eyebrow}
          title={dict.title}
          subtitle={dict.subtitle}
          actions={
            <div className="flex flex-wrap gap-2">
              <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-warm px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-warm/90">
                {dict.links.public}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-offwhite/20 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-offwhite/75 transition-colors hover:border-offwhite/40 hover:text-offwhite">
                {dict.links.business}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          }
        />

        <CaseStudyMetrics metrics={dict.metrics} />
        <CaseStudyTldr {...dict.tldr} />

      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade font-mono text-xs">
        {dict.meta.map((item: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40 uppercase relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-timeup-cyan before:rounded-full">{item.label}</span>
            <span className="text-white/90">{item.value}</span>
          </div>
        ))}
      </section>

      <section className="reveal-fade mb-16 max-w-3xl md:mb-20">
        <Quote className="mb-4 h-8 w-8 text-timeup-cyan/25" />
        <blockquote className="font-display text-2xl leading-snug text-offwhite/85 md:text-3xl">
          &ldquo;{dict.quote.text}<span className="text-timeup-cyan italic">{dict.quote.bold}</span>{dict.quote.text2}&rdquo;
        </blockquote>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-offwhite/40">{dict.quote.title}</p>
      </section>

      <CaseStudySection eyebrow={dict.constraints.title1} title={dict.constraints.title2} description={dict.constraints.desc}>
        <div className="grid grid-cols-1 gap-4 auto-rows-[minmax(200px,auto)] md:grid-cols-3">
          {/* Bento Item 1: Wide */}
          <div className="md:col-span-2 bg-timeup-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-timeup-cyan/30 transition-all duration-500 hover:bg-timeup-card">
            <div className="absolute top-0 right-0 p-8 text-white/[0.03] group-hover:text-timeup-cyan/10 transition-colors duration-500">
              <Users size={180} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-display text-white mb-4 relative z-10 w-fit">{dict.constraints.c1.title}</h3><p className="text-white/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">{dict.constraints.c1.text1}<span className="text-timeup-cyan font-medium">{dict.constraints.c1.bold1}</span>{dict.constraints.c1.text2}<span className="text-white border-b border-white/20 pb-0.5">{dict.constraints.c1.bold2}</span>.</p>
          </div>

          {/* Bento Item 2 */}
          <div className="bg-timeup-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-timeup-teal/30 transition-all duration-500 hover:bg-timeup-card flex flex-col justify-center">
            <h3 className="text-xl font-display text-white mb-4 flex items-center gap-3"><Clock className="text-timeup-teal" size={24}/> {dict.constraints.c2.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c2.text1}<span className="text-timeup-teal font-medium">{dict.constraints.c2.bold1}</span>{dict.constraints.c2.text2}</p>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-gradient-to-br from-timeup-indigo/10 to-timeup-card/60 border border-timeup-indigo/20 p-8 rounded-3xl relative group hover:border-timeup-indigo/40 transition-all duration-500 flex flex-col justify-center">
            <h3 className="text-xl font-display text-white mb-4 flex items-center gap-3"><Shield className="text-timeup-indigo" size={24}/> {dict.constraints.c3.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c3.text1}<span className="text-timeup-indigo font-mono text-[10px] bg-timeup-indigo/10 px-2 py-1 rounded ml-1">{dict.constraints.c3.tag}</span>.</p>
          </div>

          {/* Bento Item 4: Wide */}
          <div className="md:col-span-2 bg-timeup-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-timeup-cyan/30 transition-all duration-500 hover:bg-timeup-card">
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col justify-center">
                 <h3 className="text-xl lg:text-2xl font-display text-white mb-4 flex items-center gap-3"><Zap className="text-timeup-cyan" size={24}/> {dict.constraints.c4.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c4.text1}<span className="text-white font-medium">{dict.constraints.c4.bold1}</span>{dict.constraints.c4.text2}</p>
              </div>
              <div className="flex-1 md:border-l md:border-white/10 md:pl-8 flex flex-col justify-center pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
                 <div className="flex items-center gap-3 mb-3">
                    <FileCheck2 className="text-white/40 group-hover:text-timeup-cyan transition-colors" size={24}/>
                    <span className="text-white/90 font-display text-lg">{dict.constraints.c5.title}</span></div><p className="text-sm text-white/50 font-sans">{dict.constraints.c5.text1}<span className="text-white/80">{dict.constraints.c5.bold1}</span>{dict.constraints.c5.text2}</p>
              </div>
            </div>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={dict.interfaces.title1} title={dict.interfaces.title2}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          
          <div
            className="md:col-span-12 relative h-[35vh] sm:h-[50vh] md:h-[75vh] w-full bg-timeup-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(0)}
          >
            <Image 
              src="/img/timeup/admin-analytics.png" 
              alt="Administrador TimeUp" 
              fill 
              className="object-cover object-left-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-timeup-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-timeup-cyan shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-timeup-cyan uppercase mb-1">{dict.interfaces.admin.tag}</p><p className="font-display text-white/90 text-sm md:text-base">{dict.interfaces.admin.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

          <div
            className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-timeup-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(1)}
          >
            <Image 
              src="/img/timeup/owner-finance.png" 
              alt="Finanzas Dueño" 
              fill 
              className="object-cover object-left-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-timeup-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-timeup-teal shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-timeup-teal uppercase mb-1">{dict.interfaces.owner.tag}</p><p className="font-display text-white/90 text-sm md:text-base">{dict.interfaces.owner.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

          <div
            className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-timeup-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(2)}
          >
            <Image 
              src="/img/timeup/staff-dashboard.png" 
              alt="Agenda Staff" 
              fill 
              className="object-cover object-left-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-timeup-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-timeup-indigo shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-timeup-indigo uppercase mb-1">{dict.interfaces.staff.tag}</p><p className="font-display text-white/90 text-sm md:text-base">{dict.interfaces.staff.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={dict.architecture.title1} title={dict.architecture.title2}>
        <div className="flex flex-col gap-8">
          
          {/* Dec 1 */}
          <div className="bg-timeup-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-timeup-cyan/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-timeup-cyan mb-3 block">{dict.architecture.d1.nav}</span><h3 className="text-2xl font-display text-white mb-2">{dict.architecture.d1.title}</h3></div><LayoutTemplate className="text-white/10 mt-12 group-hover:text-timeup-cyan/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d1.desc}<span className="text-white">{dict.architecture.d1.bold}</span>{dict.architecture.d1.desc2}</p><div className="bg-gradient-to-r from-timeup-indigo/10 to-transparent border-l-2 border-timeup-indigo rounded-r-xl p-6"><h4 className="text-timeup-indigo uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d1.costTitle}</h4><p className="text-sm text-timeup-indigo/80 font-sans">{dict.architecture.d1.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 2 */}
          <div className="bg-timeup-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-timeup-teal/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-timeup-teal mb-3 block">{dict.architecture.d2.nav}</span><h3 className="text-2xl font-display text-white mb-2">{dict.architecture.d2.title}</h3></div><Database className="text-white/10 mt-12 group-hover:text-timeup-teal/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d2.desc}<span className="text-timeup-teal">{dict.architecture.d2.bold}</span>{dict.architecture.d2.desc2}</p><div className="bg-gradient-to-r from-timeup-indigo/10 to-transparent border-l-2 border-timeup-indigo rounded-r-xl p-6"><h4 className="text-timeup-indigo uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d2.costTitle}</h4><p className="text-sm text-timeup-indigo/80 font-sans">{dict.architecture.d2.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 3 */}
          <div className="bg-timeup-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-timeup-cyan/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-timeup-indigo mb-3 block">{dict.architecture.d3.nav}</span><h3 className="text-2xl font-display text-white mb-2">{dict.architecture.d3.title}</h3></div><Shield className="text-white/10 mt-12 group-hover:text-timeup-indigo/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d3.desc}<span className="text-white">{dict.architecture.d3.bold}</span>{dict.architecture.d3.desc2}</p><div className="bg-gradient-to-r from-timeup-indigo/10 to-transparent border-l-2 border-timeup-indigo rounded-r-xl p-6"><h4 className="text-timeup-indigo uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d3.costTitle}</h4><p className="text-sm text-timeup-indigo/80 font-sans">{dict.architecture.d3.costDesc}</p>
                </div>
             </div>
          </div>

        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={dict.lessons.title1} title={dict.lessons.title2} description={dict.lessons.desc}>
        <div className="flex flex-col gap-4">
            
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-display text-white mb-3 flex items-center gap-3">{dict.lessons.l1.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l1.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-timeup-teal bg-timeup-teal/10 border border-timeup-teal/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l1.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-display text-white mb-3 flex items-center gap-3">{dict.lessons.l2.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l2.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-timeup-teal bg-timeup-teal/10 border border-timeup-teal/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l2.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-display text-white mb-3 flex items-center gap-3">{dict.lessons.l3.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l3.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-timeup-teal bg-timeup-teal/10 border border-timeup-teal/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l3.tag}</span>
              </div>
            </div>

          </div>
      </CaseStudySection>

        <CaseStudyFooter footer={dict.footer} />
    </main>
    </>
  );
}
