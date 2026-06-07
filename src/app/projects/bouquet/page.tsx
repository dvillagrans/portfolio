"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { bouquetEn, bouquetEs } from "@/i18n/dictionaries/bouquet";
import { BouquetProjectSchema } from "@/components/ui/SchemaOrg";
import {
  ArrowLeft, ArrowUpRight,
  Clock, Users, Zap, Shield, Database, LayoutTemplate, Activity, FileCheck2, AlertCircle, Quote, X, ZoomIn, ChevronLeft, ChevronRight, ArrowUp
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "/img/bouquet/dashboard-super-admin.png", alt: "Super Admin Dashboard — chain-level GMV and zone comparison" },
  { src: "/img/bouquet/dashboard-zone-manager.png", alt: "Zone Manager Dashboard — branch trends and staff performance" },
  { src: "/img/bouquet/dashboard-branch-manager.png", alt: "Branch Manager Dashboard — kitchen status and table occupancy" },
];

function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const { src, alt } = IMAGES[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Image */}
      <div
        className="relative mx-14 max-w-[90vw] max-h-[85vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="90vw" />
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1" role="tablist" aria-label="Image carousel">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`${i + 1} of ${IMAGES.length}`}
            aria-selected={i === index}
            onClick={(e) => { e.stopPropagation(); }}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <span className={`block rounded-full transition-all duration-300 ${i === index ? "w-5 h-1.5 bg-bouquet-rose" : "w-1.5 h-1.5 bg-white/30"}`} aria-hidden />
          </button>
        ))}
      </div>

      {/* Caption */}
      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/40">{alt}</p>
    </div>
  );
}

export default function BouquetCaseStudy() {
  const { language } = useLanguage();
  const dict = language === "es" ? bouquetEs : bouquetEn;
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null), []);
  const nextImage = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % IMAGES.length : null), []);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowScrollTop(scrolled > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal-fade");
      if (reduced) {
        elements.forEach((el: any) => {
          gsap.set(el, { y: 0, opacity: 1 });
        });
        return;
      }
      elements.forEach((el: any) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[9998] h-[2px] bg-gradient-to-r from-bouquet-rose via-bouquet-burgundy to-bouquet-sage transition-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-bouquet-rose/10 border border-bouquet-rose/30 text-bouquet-rose backdrop-blur-sm hover:bg-bouquet-rose/20 active:scale-95 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
      <main ref={containerRef} className="min-h-screen pt-24 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pt-32 md:pb-[calc(8rem+env(safe-area-inset-bottom,0px))] px-5 md:px-12 lg:px-24 selection:bg-bouquet-rose selection:text-bouquet-bg"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <BouquetProjectSchema />

      {/* Navigation */}
      <div className="mb-12 reveal-fade">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-bouquet-rose transition-colors uppercase font-mono tracking-widest"><ArrowLeft size={16} /> {dict.back}</Link>
      </div>

      {/* Header */}
      <header className="mb-12 reveal-fade max-w-5xl">
        <h1
          className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-bouquet-rose),var(--color-bouquet-burgundy),var(--color-bouquet-sage))] drop-shadow-2xl"
          style={{textShadow:"0 0 40px rgb(from var(--color-bouquet-rose) r g b / 0.4)", viewTransitionName: 'page-title'}}
        >
          Bouquet
        </h1>
        <p className="text-xl md:text-3xl text-white/70 tracking-normal font-serif italic mb-6">{dict.subtitle}</p>
      </header>

      {/* 1. TL;DR Cards */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-16 reveal-fade" aria-labelledby="tldr-heading">
        <h2 id="tldr-heading" className="sr-only">{language === "es" ? "Resumen" : "Summary"}</h2>
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-bouquet-rose/30 transition-all duration-500">
          <h3 className="text-bouquet-rose font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size={14}/> {dict.tldr.challenge.title}</h3><p className="text-sm text-white/60 leading-relaxed font-sans">{dict.tldr.challenge.text1}<span className="text-white font-medium">{dict.tldr.challenge.bold}</span>{dict.tldr.challenge.text2}</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-bouquet-sage/30 transition-all duration-500">
          <h3 className="text-bouquet-sage font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size={14}/> {dict.tldr.solution.title}</h3><p className="text-sm text-white/60 leading-relaxed font-sans">{dict.tldr.solution.text1}<span className="text-white font-medium">{dict.tldr.solution.bold}</span>{dict.tldr.solution.text2}<span className="text-bouquet-sage">{dict.tldr.solution.cyan}</span>{dict.tldr.solution.text3}</p>
        </div>
        <div className="bg-bouquet-burgundy/10 border border-bouquet-burgundy/20 p-6 rounded-2xl hover:border-bouquet-burgundy/40 transition-all duration-500">
          <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={14}/> {dict.tldr.impact.title}</h3><p className="text-sm text-white/90 leading-relaxed font-sans"><span className="text-white font-medium">{dict.tldr.impact.bold}</span>{dict.tldr.impact.text1}</p>
        </div>
      </section>

      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade font-mono text-xs">
        {dict.meta.map((item: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40 uppercase relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-bouquet-rose before:rounded-full">{item.label}</span>
            <span className="text-white/90">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Live URL */}
      <section className="flex flex-col sm:flex-row flex-wrap gap-5 mb-24 reveal-fade px-2">
        <a href="https://bouquet-psi.vercel.app/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 bg-[linear-gradient(135deg,var(--color-bouquet-rose),var(--color-bouquet-burgundy))] text-white px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 hover:bg-[linear-gradient(135deg,var(--color-bouquet-burgundy),var(--color-bouquet-rose))] shadow-[0_0_20px_rgb(from_var(--color-bouquet-rose)_r_g_b_/0.4)] hover:shadow-[0_0_35px_rgb(from_var(--color-bouquet-rose)_r_g_b_/0.7)] rounded-full w-full sm:w-auto">
          {dict.links.landing}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>

      {/* 2. PULL QUOTE */}
      <section className="mb-32 reveal-fade max-w-4xl mx-auto text-center px-4">
        <Quote className="text-bouquet-rose/20 w-12 h-12 md:w-16 md:h-16 mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-8">
          &ldquo;{dict.quote.text}<span className="text-bouquet-rose italic font-medium">{dict.quote.bold}</span>{dict.quote.text2}&rdquo;
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-bouquet-rose to-bouquet-sage mx-auto mb-6 rounded-full"></div>
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">{dict.quote.title}</p>
      </section>

      {/* 3. Bento Constraints */}
      <section className="mb-32 reveal-fade">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm text-bouquet-rose font-mono tracking-widest uppercase mb-3">{dict.constraints.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.constraints.title2}</p></div><p className="font-mono text-xs text-white/40 md:max-w-[200px] border-l border-white/20 pl-4 py-1">{dict.constraints.desc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Bento Item 1: Wide */}
          <div className="md:col-span-2 bg-bouquet-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-bouquet-rose/30 transition-all duration-500 hover:bg-bouquet-card">
            <div className="absolute top-0 right-0 p-8 text-white/[0.03] group-hover:text-bouquet-rose/10 transition-colors duration-500">
              <Shield size={180} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 relative z-10 w-fit">{dict.constraints.c1.title}</h3><p className="text-white/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">{dict.constraints.c1.text1}<span className="text-bouquet-rose font-medium">{dict.constraints.c1.bold1}</span>{dict.constraints.c1.text2}<span className="text-white border-b border-white/20 pb-0.5">{dict.constraints.c1.bold2}</span>.</p>
          </div>

          {/* Bento Item 2 */}
          <div className="bg-bouquet-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-bouquet-sage/30 transition-all duration-500 hover:bg-bouquet-card flex flex-col justify-center">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Clock className="text-bouquet-sage" size={24}/> {dict.constraints.c2.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c2.text1}<span className="text-bouquet-sage font-medium">{dict.constraints.c2.bold1}</span>{dict.constraints.c2.text2}</p>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-gradient-to-br from-bouquet-burgundy/10 to-bouquet-card/60 border border-bouquet-burgundy/20 p-8 rounded-3xl relative group hover:border-bouquet-burgundy/40 transition-all duration-500 flex flex-col justify-center">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Database className="text-bouquet-burgundy" size={24}/> {dict.constraints.c3.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c3.text1}<span className="text-bouquet-burgundy font-medium">{dict.constraints.c3.bold1}</span>{dict.constraints.c3.text2}</p>
          </div>

          {/* Bento Item 4: Wide */}
          <div className="md:col-span-2 bg-bouquet-card/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-bouquet-rose/30 transition-all duration-500 hover:bg-bouquet-card">
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col justify-center">
                 <h3 className="text-xl lg:text-2xl font-serif text-white mb-4 flex items-center gap-3"><Zap className="text-bouquet-rose" size={24}/> {dict.constraints.c4.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c4.text1}<span className="text-white font-medium">{dict.constraints.c4.bold1}</span>{dict.constraints.c4.text2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Screenshots Section */}
      <section className="mb-32 reveal-fade">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-sm text-bouquet-rose font-mono tracking-widest uppercase mb-3">{dict.dashboards.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.dashboards.title2}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div
            className="md:col-span-12 relative h-[35vh] sm:h-[50vh] md:h-[75vh] w-full bg-bouquet-card rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(0)}
          >
            <Image 
              src="/img/bouquet/dashboard-super-admin.png" 
              alt={dict.dashboards.superAdmin.desc} 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-bouquet-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-bouquet-rose shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-bouquet-rose uppercase mb-1">{dict.dashboards.superAdmin.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.dashboards.superAdmin.desc}</p>
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
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-bouquet-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-bouquet-sage shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-bouquet-sage uppercase mb-1">{dict.dashboards.zoneManager.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.dashboards.zoneManager.desc}</p>
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
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-bouquet-bg/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-bouquet-burgundy shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-bouquet-burgundy uppercase mb-1">{dict.dashboards.branchManager.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.dashboards.branchManager.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

        </div>
      </section>

      {/* 4. Engineering Decisions */}
      <section className="mb-32 reveal-fade">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm text-bouquet-rose font-mono tracking-widest uppercase mb-3">{dict.architecture.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.architecture.title2}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-8">
          
          {/* Dec 1: Multi-Tenant RLS */}
          <div className="bg-bouquet-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-bouquet-rose/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-bouquet-rose mb-3 block">{dict.architecture.d1.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d1.title}</h3></div><Shield className="text-white/10 mt-12 group-hover:text-bouquet-rose/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d1.desc}<span className="text-white">{dict.architecture.d1.bold}</span>{dict.architecture.d1.desc2}</p><div className="bg-gradient-to-r from-bouquet-burgundy/10 to-transparent border-l-2 border-bouquet-burgundy rounded-r-xl p-6"><h4 className="text-bouquet-burgundy uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d1.costTitle}</h4><p className="text-sm text-bouquet-burgundy/80 font-sans">{dict.architecture.d1.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 2: Spark Pipeline */}
          <div className="bg-bouquet-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-bouquet-sage/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-bouquet-sage mb-3 block">{dict.architecture.d2.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d2.title}</h3></div><Database className="text-white/10 mt-12 group-hover:text-bouquet-sage/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d2.desc}<span className="text-bouquet-sage">{dict.architecture.d2.bold}</span>{dict.architecture.d2.desc2}</p><div className="bg-gradient-to-r from-bouquet-burgundy/10 to-transparent border-l-2 border-bouquet-burgundy rounded-r-xl p-6"><h4 className="text-bouquet-burgundy uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d2.costTitle}</h4><p className="text-sm text-bouquet-burgundy/80 font-sans">{dict.architecture.d2.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 3: QR Menu Flow */}
          <div className="bg-bouquet-card/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-bouquet-rose/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-bouquet-rose mb-3 block">{dict.architecture.d3.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d3.title}</h3></div><LayoutTemplate className="text-white/10 mt-12 group-hover:text-bouquet-rose/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d3.desc}<span className="text-white">{dict.architecture.d3.bold}</span>{dict.architecture.d3.desc2}</p><div className="bg-gradient-to-r from-bouquet-burgundy/10 to-transparent border-l-2 border-bouquet-burgundy rounded-r-xl p-6"><h4 className="text-bouquet-burgundy uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d3.costTitle}</h4><p className="text-sm text-bouquet-burgundy/80 font-sans">{dict.architecture.d3.costDesc}</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. Lessons Learned */}
      <section className="mb-32 grid md:grid-cols-12 gap-12 md:gap-20 reveal-fade">
        <div className="md:col-span-5">
          <h2 className="text-sm text-bouquet-sage font-mono tracking-widest uppercase mb-3">{dict.lessons.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 mb-6 leading-tight">{dict.lessons.title2}</p><p className="text-sm font-sans text-white/50 leading-relaxed">{dict.lessons.desc}</p>
        </div>
        <div className="md:col-span-7">
          <div className="flex flex-col gap-4">
            
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l1.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l1.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-bouquet-sage bg-bouquet-sage/10 border border-bouquet-sage/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l1.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l2.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l2.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-bouquet-sage bg-bouquet-sage/10 border border-bouquet-sage/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l2.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l3.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l3.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-bouquet-sage bg-bouquet-sage/10 border border-bouquet-sage/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l3.tag}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="pt-12 pb-12 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 font-mono tracking-widest uppercase border-t border-white/10 reveal-fade">
        <span className="mb-4 sm:mb-0">{dict.footer.text}</span><span className="text-bouquet-rose/50 border border-bouquet-rose/20 px-4 py-2 rounded-full">{dict.footer.status}</span>
      </footer>
    </main>
    </>
  );
}
