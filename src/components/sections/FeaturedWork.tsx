"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// ─── Types matching dictionaries.ts project shape ───────────────────────────
interface ProjectLink { label: string; url: string; }
interface FeaturedProject {
  id: string;
  title: string;
  problem: string;
  system: string;
  outcome: string;
  href: string;
  image?: string;
  caseStudy?: string;
  links?: ProjectLink[];
  features?: Array<{ name: string; value: string }>;
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { t, language } = useLanguage();

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setActiveIdx(idx);
  }, []);

  const scrollToCard = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-surface-warm py-12 text-charcoal pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] md:px-12 md:py-20 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 md:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-charcoal/10 pb-6 md:pb-8 pl-4 pr-4 md:px-0">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl italic text-graphite">{t.work.title}</h2>
            <p className="mt-3 max-w-md font-sans text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
              {t.work.subtitle}
            </p>
          </div>
          <a
            href="/projects"
            className="group flex items-center justify-center min-h-[44px] gap-3 border border-charcoal/20 px-6 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-charcoal hover:text-offwhite rounded-full bg-white shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            {language === 'en' ? 'View Full Archive' : 'Ver Archivo Completo'}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </header>

        {/* ── MOBILE: horizontal swipe carousel ── */}
        <div className="lg:hidden">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 px-4 pb-2"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            {t.work.projects.map((project, idx) => {
              const p = project as unknown as FeaturedProject;
              return (
              <div
                key={p.id}
                className="snap-start shrink-0 w-[75vw] bg-white rounded-2xl border border-charcoal/5 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Image */}
                {p.image ? (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 left-4 font-mono text-[10px] font-bold text-white/60 uppercase tracking-widest">
                      SYS_0{p.id}
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/9] bg-gray-100 flex items-center justify-center">
                    <span className="font-mono text-xs text-charcoal/30 uppercase tracking-widest">No Preview</span>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-4 p-5 flex-1">
                  <h3 className="font-sans text-lg font-medium tracking-tight text-charcoal leading-snug">
                    {p.title}
                  </h3>

                  {/* Key outcome */}
                  <p className="text-base sm:text-sm text-charcoal/70 font-sans leading-relaxed line-clamp-3">
                    {p.outcome}
                  </p>

                  {/* Links row — 44px touch targets on mobile */}
                  {p.links && p.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2.5 rounded-lg border border-charcoal/10 bg-charcoal/5 font-mono text-xs text-charcoal/70 active:scale-[0.98] transition-transform sm:py-1.5 sm:text-[10px] sm:min-h-0"
                        >
                          {link.label}
                          <ArrowUpRight className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5" />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* CTA — pinned to bottom */}
                  <div className="mt-auto">
                    {p.caseStudy ? (
                      <Link
                        href={p.caseStudy}
                        className="flex min-h-[44px] items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-offwhite bg-accent px-5 py-4 rounded-xl active:scale-[0.98] transition-transform shadow-lg shadow-accent/20 hover:bg-warm"
                      >
                        {language === 'es' ? 'Caso de Estudio' : 'Case Study'} <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-offwhite bg-charcoal px-5 py-4 rounded-xl active:scale-[0.98] transition-transform shadow-md hover:bg-graphite"
                      >
                        {language === 'es' ? 'Ver Proyecto' : 'Open Project'} <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Dot indicators — 44px touch target each */}
          <div className="flex items-center justify-center gap-1 mt-5" role="tablist" aria-label="Project carousel">
            {t.work.projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-label={`Project ${idx + 1}`}
                aria-selected={idx === activeIdx}
                tabIndex={idx === activeIdx ? 0 : -1}
                onClick={() => scrollToCard(idx)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-charcoal/10"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    idx === activeIdx ? "w-5 h-1.5 bg-charcoal" : "w-1.5 h-1.5 bg-charcoal/20"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: vertical stacked layout ── */}
        <div className="hidden lg:flex flex-col gap-12">
          {t.work.projects.map((project, idx) => {
            const p = project as unknown as FeaturedProject;
            return (
            <div
              key={p.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="group relative flex flex-row gap-8 p-10 transition-colors duration-500 bg-white hover:bg-gray-50/80 rounded-[2rem] shadow-sm hover:shadow-xl border border-charcoal/5 overflow-hidden"
            >
              {/* Left Column */}
              <div className="flex w-[45%] flex-col gap-8">
                <div>
                  <span className="font-sans text-[10px] font-bold text-charcoal/40 block mb-3 uppercase tracking-[0.2em]">
                    SYS_0{p.id}
                  </span>
                  <h3 className="font-sans text-3xl font-medium tracking-tight text-charcoal leading-tight">
                    {p.title}
                  </h3>
                </div>

                {p.image ? (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 shadow-inner group-hover:shadow-lg transition-all duration-500 transform group-hover:-translate-y-1">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-gray-100 flex items-center justify-center">
                    <span className="font-sans text-xs text-charcoal/40 uppercase tracking-widest">No Preview Available</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {p.caseStudy ? (
                    <Link
                      href={p.caseStudy}
                      className="flex-1 flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-offwhite bg-accent px-5 py-4 rounded-xl hover:bg-warm active:scale-[0.98] transition-all duration-200 shadow-lg shadow-accent/20"
                    >
                      {language === 'es' ? 'Caso de Estudio' : 'Case Study'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-offwhite bg-charcoal px-5 py-4 rounded-xl hover:bg-graphite active:scale-[0.98] transition-all duration-200 shadow-md"
                    >
                      {language === 'es' ? 'Ver Proyecto' : 'Open Project'} <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex w-[55%] flex-col pl-12 border-l border-charcoal/10">
                <div className="flex flex-col mb-8">
                  <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-charcoal/40 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warm"></span>
                    {language === 'es' ? 'Impacto & Arquitectura' : 'Impact & Architecture'}
                  </h4>
                  {p.features ? (
                    <div className="flex flex-col gap-6">
                      {p.features.map((feat, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/40">{feat.name}</span>
                          <span className="text-base font-sans font-medium text-charcoal/90">{feat.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg text-charcoal/80 font-sans leading-relaxed">
                      {p.system}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-8 mt-auto bg-gray-50/50 p-6 rounded-2xl border border-charcoal/5">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/40">{t.work.labelScope}</span>
                    <p className="text-sm font-sans font-medium text-charcoal/80 leading-relaxed">{p.problem}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-charcoal/40">{t.work.labelOutcome}</span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {p.outcome.split(',').map((tech, i, arr) => (
                        <span key={i} className="flex items-center text-xs font-sans text-charcoal/60">
                          {tech.trim()}
                          {i < arr.length - 1 && <span className="opacity-30 mx-2 text-[10px]">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {p.links && p.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    {p.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-charcoal/10 bg-white font-sans text-xs font-medium text-charcoal/80 hover:text-accent hover:border-accent/30 hover:bg-accent/5 active:scale-[0.97] transition-all duration-200"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-all duration-200" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
