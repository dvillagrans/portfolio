"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useVizReveal } from "@/hooks/useVizReveal";
import EyeNetCard from "../ui/EyeNetCard";
import { VizContainer } from "../portfolio/viz/VizContainer";
import { CovidClusterViz } from "../portfolio/viz/CovidClusterViz";
import { NYCFareViz } from "../portfolio/viz/NYCFareViz";
import { IndiaAQIViz } from "../portfolio/viz/IndiaAQIViz";

gsap.registerPlugin(ScrollTrigger);

interface ProjectMetric { label: string; value: string; }
interface ProjectLink { label: string; url: string; }
interface FeaturedProject {
  id: string;
  type: "special" | "hero" | "grid" | "wide";
  category: string;
  title: string;
  problem: string;
  system: string;
  outcome: string;
  href: string;
  image?: string;
  caseStudy?: string;
  links?: ProjectLink[];
  tags?: string[];
  metrics?: ProjectMetric[];
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const vizRevealRef = useVizReveal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, { opacity: 1, y: 0 });
        });
        return;
      }
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const projects = t.work.projects;
  let globalIdx = 0;

  return (
    <section ref={sectionRef} id="projects" className="relative bg-offwhite py-24 text-charcoal pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-charcoal/20"></div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/40">
                02. {language === 'en' ? 'Featured Systems' : 'Sistemas Destacados'}
              </span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight text-charcoal">
              {t.work.title}
            </h2>
            <p className="mt-4 max-w-md font-sans text-sm text-charcoal/50">
              {t.work.subtitle}
            </p>
          </div>
          <Link
            href="/projects"
            className="group flex items-center justify-center min-h-[44px] gap-3 border border-charcoal/10 px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-charcoal hover:text-offwhite rounded-full bg-white shadow-sm spring-press"
          >
            {language === 'en' ? 'Full Systems Archive' : 'Archivo de Sistemas'}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </header>

        <div className="flex flex-col gap-8 md:gap-16">
          
          {/* SPECIAL PROJECTS (EyeNet) */}
          {projects.filter(p => p.type === 'special').map((p) => {
            const currentIdx = globalIdx++;
            return (
              <div key={p.id} ref={(el) => { cardsRef.current[currentIdx] = el; }}>
                <EyeNetCard />
              </div>
            );
          })}

          {/* GRID PROJECTS */}
          <div ref={vizRevealRef} className="secondary-cards-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.filter(p => p.type === 'grid').map((p) => {
              const currentIdx = globalIdx++;
              const accentMap: Record<string, { color: string; gradient: string }> = {
                "01": { color: "oklch(54% 0.18 265)", gradient: "linear-gradient(135deg, oklch(54% 0.18 265 / 0.06), oklch(54% 0.18 265 / 0.01))" },
                "02": { color: "oklch(65% 0.15 145)", gradient: "linear-gradient(135deg, oklch(65% 0.15 145 / 0.06), oklch(65% 0.15 145 / 0.01))" },
                "04": { color: "oklch(60% 0.16 35)",  gradient: "linear-gradient(135deg, oklch(60% 0.16 35 / 0.06), oklch(60% 0.16 35 / 0.01))" },
              };
              const accent = accentMap[p.id] ?? { color: "oklch(50% 0.12 240)", gradient: "linear-gradient(135deg, oklch(50% 0.12 240 / 0.06), oklch(50% 0.12 240 / 0.01))" };

              return (
                <article 
                  key={p.id}
                  ref={(el) => { cardsRef.current[currentIdx] = el; }}
                  className="secondary-card group relative flex flex-col rounded-[2.5rem] border border-charcoal/8 bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-1.5"
                >
                  {/* Decorative accent gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: accent.gradient }}
                  />

                  {/* Giant SYS watermark */}
                  <div className="absolute -bottom-6 right-4 select-none pointer-events-none" aria-hidden="true">
                    <span className="font-mono text-[6rem] md:text-[8rem] font-black leading-none text-charcoal/[0.03] tracking-tighter">
                      {p.id}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col flex-1 p-5 sm:p-6 md:p-8">
                    {/* Header metadata */}
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/25">
                        SYS_0{p.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="block w-1.5 h-1.5 rounded-full"
                          style={{ background: accent.color, boxShadow: `0 0 6px ${accent.color}` }}
                        />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-charcoal/35">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    {/* Title with subtle accent underline */}
                    <h3 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-charcoal mb-4 leading-tight transition-colors break-words">
                      {p.title}
                    </h3>

                    {/* Problem statement with left accent bar */}
                    <div className="flex gap-3 mb-8">
                      <div
                        className="w-[3px] shrink-0 rounded-full transition-all duration-500 group-hover:h-12"
                        style={{ background: accent.color, height: "1.5rem" }}
                      />
                      <p className="text-sm text-charcoal/55 leading-relaxed flex-1 break-words">
                        {p.problem}
                      </p>
                    </div>

                    {/* Visualization */}
                    {p.id === "01" ? (
                      <div className="mb-8">
                        <VizContainer height={180}>
                          <CovidClusterViz />
                        </VizContainer>
                      </div>
                    ) : p.id === "02" ? (
                      <div className="mb-8">
                        <VizContainer height={160}>
                          <NYCFareViz />
                        </VizContainer>
                      </div>
                    ) : (
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-charcoal/[0.03] mb-8 border border-charcoal/5">
                        <Image 
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ viewTransitionName: `project-img-${p.id}` }}
                        />
                      </div>
                    )}

                    {/* Metrics — hero stat + secondary roll */}
                    {p.metrics && p.metrics.length > 0 && (
                      <div className="mb-8">
                        <div className="flex items-baseline gap-3 mb-4">
                          <span
                            className="font-mono text-5xl font-black tabular-nums tracking-tighter transition-colors duration-500"
                            style={{ color: accent.color }}
                          >
                            {p.metrics[0].value}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/35">
                            {p.metrics[0].label}
                          </span>
                        </div>
                        {p.metrics.length > 1 && (
                          <div className="flex flex-wrap gap-4">
                            {p.metrics.slice(1).map((m, i) => (
                              <div key={i} className="min-w-0">
                                <p className="text-lg font-bold text-charcoal break-words">{m.value}</p>
                                <p className="text-[8px] font-bold uppercase tracking-widest text-charcoal/30 break-words">{m.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer — tags + expanding arrow button */}
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-charcoal/[0.06]">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags?.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:border-charcoal/20"
                            style={{
                              color: "oklch(30% 0.02 100 / 0.5)",
                              background: "oklch(30% 0.02 100 / 0.04)",
                              border: "1px solid oklch(30% 0.02 100 / 0.06)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={p.href}
                        className="relative flex items-center justify-center rounded-full transition-all duration-500 overflow-hidden spring-press"
                        style={{
                          background: "oklch(30% 0.02 100 / 0.06)",
                          width: "44px",
                          height: "44px",
                          minWidth: "44px",
                          minHeight: "44px",
                        }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            width: 120,
                            borderRadius: "999px",
                            background: "oklch(30% 0.02 100 / 0.9)",
                            duration: 0.35,
                            ease: "power3.out",
                          });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            width: 44,
                            borderRadius: "999px",
                            background: "oklch(30% 0.02 100 / 0.06)",
                            duration: 0.35,
                            ease: "power3.out",
                          });
                        }}
                      >
                        <ArrowRight className="h-4 w-4 text-charcoal shrink-0 absolute right-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 ml-1 mr-8">
                          {language === 'en' ? 'Explore' : 'Explorar'}
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* WIDE PROJECTS */}
          {projects.filter(p => p.type === 'wide').map((p) => {
            const currentIdx = globalIdx++;
            return (
              <article 
                key={p.id}
                ref={(el) => { cardsRef.current[currentIdx] = el; }}
                className="secondary-card group relative flex flex-col md:flex-row gap-8 md:gap-12 overflow-hidden rounded-[2.5rem] border border-charcoal/5 bg-charcoal p-5 sm:p-6 md:p-8 lg:p-14 shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex flex-col md:w-1/2">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                      SYS_0{p.id}
                    </span>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                  </div>

                  <h3 className="font-serif text-4xl md:text-5xl italic tracking-tight text-white mb-6 break-words">
                    {p.title}
                  </h3>
                  <p className="text-lg text-white/60 leading-relaxed mb-10 break-words">
                    {p.system}
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                    {p.metrics?.map((m, i) => (
                      <div key={i} className="min-w-0">
                        <p className="text-3xl font-bold text-white break-words">{m.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 break-words">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-4">
                    <a 
                      href={p.href} 
                      target="_blank"
                      className="inline-flex min-h-[44px] items-center justify-center gap-3 bg-white px-8 py-4 rounded-2xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-offwhite spring-press"
                    >
                      {language === 'en' ? 'Live System' : 'Sistema en Vivo'} <ArrowUpRight className="w-4 h-4" />
                    </a>
                    {p.links?.map(link => (
                      <a key={link.url} href={link.url} className="inline-flex min-h-[44px] items-center justify-center gap-2 px-6 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                {p.id === "03" ? (
                  <div className="md:w-1/2 flex flex-col min-h-[220px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px]">
                    <VizContainer height="100%">
                      <IndiaAQIViz />
                    </VizContainer>
                  </div>
                  ) : (
                    <div className="relative aspect-video md:aspect-auto md:w-1/2 overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                        style={{ viewTransitionName: `project-img-${p.id}` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" aria-hidden="true"></div>
                    </div>
                  )}
              </article>
            );
          })}
        </div>

        {/* Archives Link Footer */}
        <footer className="mt-24 border-t border-charcoal/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex flex-col gap-1">
             <p className="font-sans text-sm font-medium text-charcoal">
               {language === 'en' ? 'Hungry for more systems?' : '¿Quieres ver más sistemas?'}
             </p>
             <p className="font-sans text-xs text-charcoal/40">
               {language === 'en' ? 'Explore 12+ experimental notebooks and archive projects.' : 'Explora más de 12 notebooks experimentales y proyectos de archivo.'}
             </p>
           </div>
           <Link href="/projects" className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal hover:text-accent transition-colors">
             {language === 'en' ? 'View Archive' : 'Ver Archivo'}
             <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
           </Link>
        </footer>
      </div>
    </section>
  );
}
