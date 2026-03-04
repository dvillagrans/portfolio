"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  ArrowLeft, ArrowUpRight, 
  Clock, Users, Zap, Shield, Database, LayoutTemplate, Activity, FileCheck2, AlertCircle, Quote, X, ZoomIn, ChevronLeft, ChevronRight, ArrowUp
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);


const IMAGES = [
  { src: "/images/timeup/admin-analytics.png", alt: "Administrador TimeUp" },
  { src: "/images/timeup/owner-finance.png", alt: "Finanzas Dueño" },
  { src: "/images/timeup/staff-dashboard.png", alt: "Agenda Staff" },
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
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`rounded-full transition-all duration-300 ${
              i === index ? "w-5 h-1.5 bg-[#00C9FF]" : "w-1.5 h-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Caption */}
      <p className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/40">{alt}</p>
    </div>
  );
}

export default function TimeUpCaseStudy() {
  const { t } = useLanguage();
  const dict = t.timeup;
  const containerRef = useRef<HTMLDivElement>(null);
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
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal-fade");
      elements.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[9998] h-[2px] bg-gradient-to-r from-[#00C9FF] via-[#00E3CC] to-[#4B5DFF] transition-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />
      {lightbox !== null && (
        <Lightbox index={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-[#00C9FF]/10 border border-[#00C9FF]/30 text-[#00C9FF] backdrop-blur-sm hover:bg-[#00C9FF]/20 active:scale-95 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>
      <main ref={containerRef} className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 px-5 md:px-12 lg:px-24 text-zinc-300 bg-[#020406] selection:bg-[#00C9FF] selection:text-[#020406]">
      
      {/* Navigation */}
      <div className="mb-12 reveal-fade">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#00C9FF] transition-colors uppercase font-mono tracking-widest"><ArrowLeft size={16} /> {dict.back}</Link>
      </div>

      {/* Header */}
      <header className="mb-12 reveal-fade max-w-5xl">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none bg-clip-text text-transparent bg-[linear-gradient(135deg,#00C9FF,#00E3CC,#4B5DFF)] drop-shadow-2xl" style={{textShadow:"0 0 40px rgba(0,201,255,0.4)"}}>
          Time<span className="text-white/40">Up</span>
        </h1>
        <p className="text-xl md:text-3xl text-white/70 tracking-normal font-serif italic mb-6">{dict.subtitle}</p>
      </header>

      {/* 1. TL;DR Cards */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-16 reveal-fade">
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-[#00C9FF]/30 transition-all duration-500">
          <h3 className="text-[#00C9FF] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size={14}/> {dict.tldr.challenge.title}</h3><p className="text-sm text-white/60 leading-relaxed font-sans">{dict.tldr.challenge.text1}<span className="text-white font-medium">{dict.tldr.challenge.bold}</span>{dict.tldr.challenge.text2}</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-[#00E3CC]/30 transition-all duration-500">
          <h3 className="text-[#00E3CC] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size={14}/> {dict.tldr.solution.title}</h3><p className="text-sm text-white/60 leading-relaxed font-sans">{dict.tldr.solution.text1}<span className="text-white font-medium">{dict.tldr.solution.bold}</span>{dict.tldr.solution.text2}<span className="text-[#00E3CC]">{dict.tldr.solution.cyan}</span>{dict.tldr.solution.text3}</p>
        </div>
        <div className="bg-[#4B5DFF]/10 border border-[#4B5DFF]/20 p-6 rounded-2xl hover:border-[#4B5DFF]/40 transition-all duration-500">
          <h3 className="text-[#4B5DFF] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={14}/> {dict.tldr.impact.title}</h3><p className="text-sm text-[#4B5DFF]/90 leading-relaxed font-sans"><span className="text-white font-medium">{dict.tldr.impact.bold}</span>{dict.tldr.impact.text1}</p>
        </div>
      </section>

      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade font-mono text-xs">
        {dict.meta.map((item: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40 uppercase relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-[#00C9FF] before:rounded-full">{item.label}</span>
            <span className="text-white/90">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Live URLs */}
      <section className="flex flex-col sm:flex-row flex-wrap gap-5 mb-24 reveal-fade px-2">
        <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 bg-[linear-gradient(135deg,#00C9FF,#0088FF)] text-[#020406] px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 hover:bg-[linear-gradient(135deg,#00E3CC,#00C9FF)] shadow-[0_0_20px_rgba(0,201,255,0.4)] hover:shadow-[0_0_35px_rgba(0,201,255,0.7)] rounded-full w-full sm:w-auto">
          {dict.links.public}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 bg-white/[0.03] border border-[#4B5DFF]/40 text-[#4B5DFF] px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#4B5DFF] hover:text-white shadow-[0_0_15px_rgba(75,93,255,0.1)] hover:shadow-[0_0_30px_rgba(75,93,255,0.5)] rounded-full w-full sm:w-auto">
          {dict.links.business}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>

      {/* 2. PULL QUOTE */}
      <section className="mb-32 reveal-fade max-w-4xl mx-auto text-center px-4">
        <Quote className="text-[#00C9FF]/20 w-12 h-12 md:w-16 md:h-16 mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-8">
          "{dict.quote.text}<span className="text-[#00C9FF] italic font-medium">{dict.quote.bold}</span>{dict.quote.text2}"
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#00C9FF] to-[#4B5DFF] mx-auto mb-6 rounded-full"></div>
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">{dict.quote.title}</p>
      </section>

      {/* 3. Bento Constraints */}
      <section className="mb-32 reveal-fade">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">{dict.constraints.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.constraints.title2}</p></div><p className="font-mono text-xs text-white/40 md:max-w-[200px] border-l border-white/20 pl-4 py-1">{dict.constraints.desc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {/* Bento Item 1: Wide */}
          <div className="md:col-span-2 bg-[#1A1A1A]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#00C9FF]/30 transition-all duration-500 hover:bg-[#1A1A1A]">
            <div className="absolute top-0 right-0 p-8 text-white/[0.03] group-hover:text-[#00C9FF]/10 transition-colors duration-500">
              <Users size={180} />
            </div>
            <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 relative z-10 w-fit">{dict.constraints.c1.title}</h3><p className="text-white/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">{dict.constraints.c1.text1}<span className="text-[#00C9FF] font-medium">{dict.constraints.c1.bold1}</span>{dict.constraints.c1.text2}<span className="text-white border-b border-white/20 pb-0.5">{dict.constraints.c1.bold2}</span>.</p>
          </div>

          {/* Bento Item 2 */}
          <div className="bg-[#1A1A1A]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#00E3CC]/30 transition-all duration-500 hover:bg-[#1A1A1A] flex flex-col justify-center">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Clock className="text-[#00E3CC]" size={24}/> {dict.constraints.c2.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c2.text1}<span className="text-[#00E3CC] font-medium">{dict.constraints.c2.bold1}</span>{dict.constraints.c2.text2}</p>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-gradient-to-br from-[#4B5DFF]/10 to-[#1A1A1A]/60 border border-[#4B5DFF]/20 p-8 rounded-3xl relative group hover:border-[#4B5DFF]/40 transition-all duration-500 flex flex-col justify-center">
            <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Shield className="text-[#4B5DFF]" size={24}/> {dict.constraints.c3.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c3.text1}<span className="text-[#4B5DFF] font-mono text-[10px] bg-[#4B5DFF]/10 px-2 py-1 rounded ml-1">{dict.constraints.c3.tag}</span>.</p>
          </div>

          {/* Bento Item 4: Wide */}
          <div className="md:col-span-2 bg-[#1A1A1A]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-[#00C9FF]/30 transition-all duration-500 hover:bg-[#1A1A1A]">
            <div className="flex flex-col md:flex-row gap-8 h-full">
              <div className="flex-1 flex flex-col justify-center">
                 <h3 className="text-xl lg:text-2xl font-serif text-white mb-4 flex items-center gap-3"><Zap className="text-[#00C9FF]" size={24}/> {dict.constraints.c4.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c4.text1}<span className="text-white font-medium">{dict.constraints.c4.bold1}</span>{dict.constraints.c4.text2}</p>
              </div>
              <div className="flex-1 md:border-l md:border-white/10 md:pl-8 flex flex-col justify-center pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
                 <div className="flex items-center gap-3 mb-3">
                    <FileCheck2 className="text-white/40 group-hover:text-[#00C9FF] transition-colors" size={24}/>
                    <span className="text-white/90 font-serif text-lg">{dict.constraints.c5.title}</span></div><p className="text-sm text-white/50 font-sans">{dict.constraints.c5.text1}<span className="text-white/80">{dict.constraints.c5.bold1}</span>{dict.constraints.c5.text2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual System Context */}
      <section className="mb-32 reveal-fade">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">{dict.interfaces.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.interfaces.title2}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div
            className="md:col-span-12 relative h-[35vh] sm:h-[50vh] md:h-[75vh] w-full bg-[#1A1A1A] rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(0)}
          >
            <Image 
              src="/images/timeup/admin-analytics.png" 
              alt="Administrador TimeUp" 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-[#020406]/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-[#00C9FF] shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#00C9FF] uppercase mb-1">{dict.interfaces.admin.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.interfaces.admin.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

          <div
            className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-[#1A1A1A] rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(1)}
          >
            <Image 
              src="/images/timeup/owner-finance.png" 
              alt="Finanzas Dueño" 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-[#020406]/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-[#00E3CC] shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#00E3CC] uppercase mb-1">{dict.interfaces.owner.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.interfaces.owner.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

          <div
            className="md:col-span-6 relative h-[30vh] sm:h-[40vh] md:h-[55vh] w-full bg-[#1A1A1A] rounded-3xl overflow-hidden group border border-white/5 cursor-zoom-in"
            onClick={() => openLightbox(2)}
          >
            <Image 
              src="/images/timeup/staff-dashboard.png" 
              alt="Agenda Staff" 
              fill 
              className="object-cover object-left-top opacity-50 mix-blend-screen scale-105 group-hover:scale-100 transition-all duration-1000 group-hover:opacity-100" 
            />
            <div className="absolute top-6 left-6 bg-[#020406]/90 p-4 rounded-xl backdrop-blur-md border-l-4 border-[#4B5DFF] shadow-2xl">
              <p className="font-mono text-[10px] md:text-xs tracking-widest text-[#4B5DFF] uppercase mb-1">{dict.interfaces.staff.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.interfaces.staff.desc}</p>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white/70 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 md:opacity-0">
              <ZoomIn size={12} /> Expand
            </div>
          </div>

        </div>
      </section>

      {/* 4. Engineering Decisions / Callouts */}
      <section className="mb-32 reveal-fade">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">{dict.architecture.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.architecture.title2}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-8">
          
          {/* Dec 1 */}
          <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-[#00C9FF]/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00C9FF] mb-3 block">{dict.architecture.d1.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d1.title}</h3></div><LayoutTemplate className="text-white/10 mt-12 group-hover:text-[#00C9FF]/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d1.desc}<span className="text-white">{dict.architecture.d1.bold}</span>{dict.architecture.d1.desc2}</p><div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6"><h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d1.costTitle}</h4><p className="text-sm text-[#4B5DFF]/80 font-sans">{dict.architecture.d1.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 2 */}
          <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-[#00E3CC]/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00E3CC] mb-3 block">{dict.architecture.d2.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d2.title}</h3></div><Database className="text-white/10 mt-12 group-hover:text-[#00E3CC]/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d2.desc}<span className="text-[#00E3CC]">{dict.architecture.d2.bold}</span>{dict.architecture.d2.desc2}</p><div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6"><h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d2.costTitle}</h4><p className="text-sm text-[#4B5DFF]/80 font-sans">{dict.architecture.d2.costDesc}</p>
                </div>
             </div>
          </div>

          {/* Dec 3 */}
          <div className="bg-[#1A1A1A]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-[#00C9FF]/20 transition-all duration-500">
             <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#4B5DFF] mb-3 block">{dict.architecture.d3.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d3.title}</h3></div><Shield className="text-white/10 mt-12 group-hover:text-[#4B5DFF]/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d3.desc}<span className="text-white">{dict.architecture.d3.bold}</span>{dict.architecture.d3.desc2}</p><div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6"><h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d3.costTitle}</h4><p className="text-sm text-[#4B5DFF]/80 font-sans">{dict.architecture.d3.costDesc}</p>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. What Broke & Learned (Minimalist rows) */}
      <section className="mb-32 grid md:grid-cols-12 gap-12 md:gap-20 reveal-fade">
        <div className="md:col-span-5">
          <h2 className="text-sm text-[#00E3CC] font-mono tracking-widest uppercase mb-3">{dict.lessons.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 mb-6 leading-tight">{dict.lessons.title2}</p><p className="text-sm font-sans text-white/50 leading-relaxed">{dict.lessons.desc}</p>
        </div>
        <div className="md:col-span-7">
          <div className="flex flex-col gap-4">
            
            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l1.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l1.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l1.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l2.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l2.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l2.tag}</span>
              </div>
            </div>

            <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors p-6 md:p-8 rounded-2xl group">
              <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l3.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l3.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l3.tag}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="pt-12 pb-12 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 font-mono tracking-widest uppercase border-t border-white/10 reveal-fade">
        <span className="mb-4 sm:mb-0">{dict.footer.text}</span><span className="text-[#00C9FF]/50 border border-[#00C9FF]/20 px-4 py-2 rounded-full">{dict.footer.status}</span>
      </footer>
    </main>
    </>
  );
}
