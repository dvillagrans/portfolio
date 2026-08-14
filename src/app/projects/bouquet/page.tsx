"use client";

import React, { useState, useCallback } from "react";
import { ArrowUpRight, Clock, Zap, Shield, Database, LayoutTemplate, Activity, AlertCircle, Quote, ZoomIn } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { bouquetEn, bouquetEs } from "@/i18n/dictionaries/bouquet";
import { BouquetProjectSchema } from "@/components/ui/SchemaOrg";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyMetrics } from "@/components/case-study/CaseStudyMetrics";
import { CaseStudyTldr } from "@/components/case-study/CaseStudyTldr";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";
import { CaseStudyLightbox } from "@/components/case-study/CaseStudyLightbox";
import { useCaseStudyReveal } from "@/components/case-study/useCaseStudyReveal";

const IMAGES = [
  { src: "/img/bouquet/dashboard-super-admin.png", alt: "Super Admin Dashboard — chain-level GMV and zone comparison" },
  { src: "/img/bouquet/dashboard-zone-manager.png", alt: "Zone Manager Dashboard — branch trends and staff performance" },
  { src: "/img/bouquet/dashboard-branch-manager.png", alt: "Branch Manager Dashboard — kitchen status and table occupancy" },
];

export default function BouquetCaseStudy() {
  const { language } = useLanguage();
  const dict = language === "es" ? bouquetEs : bouquetEn;
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
        <CaseStudyLightbox
          images={IMAGES}
          index={lightbox}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          accentClass="bg-bouquet-rose"
        />
      )}
      <main ref={containerRef} className="mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-24 md:px-12 md:pt-32 md:pb-32 lg:px-8"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <BouquetProjectSchema />

        <CaseStudyHeader
          back={dict.back}
          eyebrow={dict.eyebrow}
          title={dict.title}
          subtitle={dict.subtitle}
          actions={
            <a href="https://bouquet-psi.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-warm px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-warm/90">
              {dict.links.landing}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          }
        />

        <CaseStudyMetrics metrics={dict.metrics} />
        <CaseStudyTldr {...dict.tldr} />

      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade font-mono text-xs">
        {dict.meta.map((item: { label: string; value: string }, idx: number) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40 uppercase relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-bouquet-rose before:rounded-full">{item.label}</span>
            <span className="text-white/90">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Live URL removed — CTA in header */}

      <section className="reveal-fade mb-16 max-w-3xl md:mb-20">
        <Quote className="mb-4 h-8 w-8 text-bouquet-rose/25" />
        <blockquote className="font-display text-2xl leading-snug text-offwhite/85 md:text-3xl">
          &ldquo;{dict.quote.text}<span className="text-bouquet-rose italic">{dict.quote.bold}</span>{dict.quote.text2}&rdquo;
        </blockquote>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-offwhite/40">{dict.quote.title}</p>
      </section>

      <CaseStudySection eyebrow={dict.constraints.title1} title={dict.constraints.title2} description={dict.constraints.desc}>
        <div className="grid grid-cols-1 gap-4 auto-rows-[minmax(200px,auto)] md:grid-cols-3">
          <div className="md:col-span-2 bg-bouquet-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-bouquet-rose/30 transition-all duration-500 hover:bg-bouquet-card">
            <div className="absolute top-0 right-0 p-8 text-white/[0.03] group-hover:text-bouquet-rose/10 transition-colors duration-500">
              <Shield size={180} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-display text-white mb-4 relative z-10 w-fit">{dict.constraints.c1.title}</h3><p className="text-white/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">{dict.constraints.c1.text1}<span className="text-bouquet-rose font-medium">{dict.constraints.c1.bold1}</span>{dict.constraints.c1.text2}<span className="text-white border-b border-white/20 pb-0.5">{dict.constraints.c1.bold2}</span>.</p>
          </div>

          {/* Bento Item 2 */}
          <div className="bg-bouquet-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-bouquet-sage/30 transition-all duration-500 hover:bg-bouquet-card flex flex-col justify-center">
            <h3 className="text-xl font-display text-white mb-4 flex items-center gap-3"><Clock className="text-bouquet-sage" size={24}/> {dict.constraints.c2.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c2.text1}<span className="text-bouquet-sage font-medium">{dict.constraints.c2.bold1}</span>{dict.constraints.c2.text2}</p>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-gradient-to-br from-bouquet-burgundy/10 to-bouquet-card/60 border border-bouquet-burgundy/20 p-8 rounded-3xl relative group hover:border-bouquet-burgundy/40 transition-all duration-500 flex flex-col justify-center">
            <h3 className="text-xl font-display text-white mb-4 flex items-center gap-3"><Database className="text-bouquet-burgundy" size={24}/> {dict.constraints.c3.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c3.text1}<span className="text-bouquet-burgundy font-medium">{dict.constraints.c3.bold1}</span>{dict.constraints.c3.text2}</p>
          </div>

          {/* Bento Item 4: Wide */}
          <div className="md:col-span-2 bg-bouquet-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-bouquet-rose/30 transition-all duration-500 hover:bg-bouquet-card">
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col justify-center">
                 <h3 className="text-xl lg:text-2xl font-display text-white mb-4 flex items-center gap-3"><Zap className="text-bouquet-rose" size={24}/> {dict.constraints.c4.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c4.text1}<span className="text-white font-medium">{dict.constraints.c4.bold1}</span>{dict.constraints.c4.text2}</p>
              </div>
            </div>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={dict.dashboards.title1} title={dict.dashboards.title2}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div
            className="md:col-span-12 relative h-[35vh] sm:h-[50vh] md:h-[75vh] w-full bg-bouquet-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(0)}
          >
            <Image 
              src="/img/bouquet/dashboard-super-admin.png" 
              alt={dict.dashboards.superAdmin.desc} 
              fill 
              className="object-cover object-left-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-bouquet-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-bouquet-rose shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-bouquet-rose uppercase mb-1">{dict.dashboards.superAdmin.tag}</p><p className="font-display text-white/90 text-sm md:text-base">{dict.dashboards.superAdmin.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

          <div
            className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-bouquet-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(1)}
          >
            <Image 
              src="/img/bouquet/dashboard-zone-manager.png" 
              alt={dict.dashboards.zoneManager.desc} 
              fill 
              className="object-cover object-left-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-bouquet-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-bouquet-sage shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-bouquet-sage uppercase mb-1">{dict.dashboards.zoneManager.tag}</p><p className="font-display text-white/90 text-sm md:text-base">{dict.dashboards.zoneManager.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

          <div
            className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-bouquet-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(2)}
          >
            <Image 
              src="/img/bouquet/dashboard-branch-manager.png" 
              alt={dict.dashboards.branchManager.desc} 
              fill 
              className="object-cover object-left-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-bouquet-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-bouquet-burgundy shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-bouquet-burgundy uppercase mb-1">{dict.dashboards.branchManager.tag}</p><p className="font-display text-white/90 text-sm md:text-base">{dict.dashboards.branchManager.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={dict.architecture.title1} title={dict.architecture.title2}>
        <div className="flex flex-col gap-8">
          {/* Dec 1: Multi-Tenant RLS */}
          <div className="bg-bouquet-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-bouquet-rose/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-bouquet-rose mb-3 block">{dict.architecture.d1.nav}</span><h3 className="text-2xl font-display text-white mb-2">{dict.architecture.d1.title}</h3></div><Shield className="text-white/10 mt-12 group-hover:text-bouquet-rose/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d1.desc}<span className="text-white">{dict.architecture.d1.bold}</span>{dict.architecture.d1.desc2}</p><div className="bg-gradient-to-r from-bouquet-burgundy/10 to-transparent border-l-2 border-bouquet-burgundy rounded-r-xl p-6"><h4 className="text-bouquet-burgundy uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d1.costTitle}</h4><p className="text-sm text-bouquet-burgundy/80 font-sans">{dict.architecture.d1.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 2: Spark Pipeline */}
          <div className="bg-bouquet-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-bouquet-sage/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-bouquet-sage mb-3 block">{dict.architecture.d2.nav}</span><h3 className="text-2xl font-display text-white mb-2">{dict.architecture.d2.title}</h3></div><Database className="text-white/10 mt-12 group-hover:text-bouquet-sage/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d2.desc}<span className="text-bouquet-sage">{dict.architecture.d2.bold}</span>{dict.architecture.d2.desc2}</p><div className="bg-gradient-to-r from-bouquet-burgundy/10 to-transparent border-l-2 border-bouquet-burgundy rounded-r-xl p-6"><h4 className="text-bouquet-burgundy uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d2.costTitle}</h4><p className="text-sm text-bouquet-burgundy/80 font-sans">{dict.architecture.d2.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 3: QR Menu Flow */}
          <div className="bg-bouquet-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-bouquet-rose/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-bouquet-rose mb-3 block">{dict.architecture.d3.nav}</span><h3 className="text-2xl font-display text-white mb-2">{dict.architecture.d3.title}</h3></div><LayoutTemplate className="text-white/10 mt-12 group-hover:text-bouquet-rose/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d3.desc}<span className="text-white">{dict.architecture.d3.bold}</span>{dict.architecture.d3.desc2}</p><div className="bg-gradient-to-r from-bouquet-burgundy/10 to-transparent border-l-2 border-bouquet-burgundy rounded-r-xl p-6"><h4 className="text-bouquet-burgundy uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d3.costTitle}</h4><p className="text-sm text-bouquet-burgundy/80 font-sans">{dict.architecture.d3.costDesc}</p>
                </div>
             </div>
          </div>

        </div>
      </CaseStudySection>

      <CaseStudySection eyebrow={dict.lessons.title1} title={dict.lessons.title2} description={dict.lessons.desc}>
        <div className="flex flex-col gap-4">
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-display text-white mb-3 flex items-center gap-3">{dict.lessons.l1.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l1.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-bouquet-sage bg-bouquet-sage/10 border border-bouquet-sage/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l1.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-display text-white mb-3 flex items-center gap-3">{dict.lessons.l2.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l2.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-bouquet-sage bg-bouquet-sage/10 border border-bouquet-sage/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l2.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-display text-white mb-3 flex items-center gap-3">{dict.lessons.l3.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l3.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-bouquet-sage bg-bouquet-sage/10 border border-bouquet-sage/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l3.tag}</span>
              </div>
            </div>

          </div>
      </CaseStudySection>

        <CaseStudyFooter footer={dict.footer} />
    </main>
    </>
  );
}
