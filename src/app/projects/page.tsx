"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "next-view-transitions";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SystemArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const archive = (t as any).archive;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".archive-item",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.045, duration: 0.75, ease: "power2.out", delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!archive) return null;

  const featured = archive.projects.find((p: any) => p.isFeatured);
  const rest: any[] = archive.projects.filter((p: any) => !p.isFeatured);

  // Group rest by year, descending
  const byYear = rest.reduce((acc: Record<string, any[]>, p: any) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="min-h-screen w-full bg-charcoal text-offwhite selection:bg-accent selection:text-offwhite font-sans overflow-x-hidden">

      <div className="fixed inset-0 z-0 bg-charcoal">
        <div
          className="absolute inset-0 opacity-60 mix-blend-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg-water-dark.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-12 md:px-16 md:py-32" ref={containerRef}>

        <Navbar />

        {/* Header */}
        <header className="mb-12 md:mb-20 mt-20 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {archive.back}
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
            {archive.projects.length} {language === "es" ? "proyectos" : "projects"} · 2023—2025
          </span>
        </header>

        {/* Title */}
        <div className="mb-16 md:mb-20">
          <h1
            className="font-serif text-4xl sm:text-5xl italic tracking-tight text-offwhite md:text-7xl"
            style={{ viewTransitionName: "page-title" }}
          >
            {archive.title}
          </h1>
          <p className="mt-6 font-mono text-sm leading-relaxed text-gray-500 max-w-xl">
            {archive.subtitle}
          </p>
        </div>

        {/* ── Featured card (TimeUp) ── */}
        {featured && (
          <div className="archive-item mb-16 md:mb-20 group relative rounded-2xl border border-accent/20 bg-accent/[0.04] hover:bg-accent/[0.07] transition-colors duration-300 overflow-hidden">
            <div className="p-7 md:p-10">
              {/* Top meta */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    {language === "es" ? "Proyecto Destacado" : "Featured Project"} · {featured.year}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600 hidden sm:block">
                  {featured.domain}
                </span>
              </div>

              <h2 className="font-sans text-2xl md:text-3xl font-semibold text-offwhite leading-tight mb-2">
                {featured.title}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600 sm:hidden block mb-6">
                {featured.domain}
              </span>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 mt-6">
                {featured.caseStudy && (
                  <Link
                    href={featured.caseStudy}
                    className="inline-flex items-center gap-2 bg-accent text-charcoal font-mono text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-accent/90 transition-colors"
                  >
                    {language === "es" ? "Caso de Estudio" : "Case Study"}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                {featured.links?.map((lnk: any, i: number) => (
                  <a
                    key={i}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-offwhite/15 text-gray-400 font-mono text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-full hover:border-offwhite/40 hover:text-offwhite transition-colors"
                  >
                    {lnk.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Year-grouped list ── */}
        <div className="flex flex-col gap-12 md:gap-16">
          {years.map((year) => (
            <div key={year}>
              {/* Year divider */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">{year}</span>
                <div className="flex-1 h-px bg-offwhite/[0.07]" />
                <span className="font-mono text-[10px] text-gray-600">{byYear[year].length}</span>
              </div>

              {/* Rows */}
              <div className="flex flex-col">
                {byYear[year].map((project: any, pidx: number) => (
                  <div
                    key={pidx}
                    className="archive-item group flex items-center gap-4 md:gap-8 py-4 md:py-5 border-b border-offwhite/[0.06] hover:border-offwhite/[0.12] border-l-2 border-l-transparent hover:border-l-accent pl-4 md:pl-5 transition-all duration-200"
                  >
                    {/* Domain — desktop only */}
                    <span className="hidden md:block shrink-0 w-44 font-mono text-[10px] uppercase tracking-widest text-gray-600 leading-tight">
                      {project.domain}
                    </span>

                    {/* Title */}
                    <p className="flex-1 font-sans text-sm md:text-base font-medium text-offwhite/70 group-hover:text-offwhite transition-colors leading-snug">
                      {project.title}
                      {/* Domain — mobile only */}
                      <span className="md:hidden flex font-mono text-[10px] uppercase tracking-widest text-gray-600 mt-1">
                        {project.domain}
                      </span>
                    </p>

                    {/* Link */}
                    <div className="shrink-0">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-gray-600 group-hover:text-accent transition-colors"
                        >
                          <span className="hidden sm:inline">{archive.viewProject}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
