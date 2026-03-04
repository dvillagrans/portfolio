"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "next-view-transitions";
import { ArrowLeft, ArrowUpRight } from "lucide-react"; // ArrowLeft used in back link
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SystemArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2, // Wait for hydration
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Use archive dictionary (make sure to cast if not strongly typed yet, handled internally)
  const archive = (t as any).archive;

  if (!archive) return null;

  return (
    <main className="min-h-screen w-full bg-charcoal text-offwhite selection:bg-accent selection:text-offwhite font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 bg-charcoal">
        <div className="absolute inset-0 opacity-80 mix-blend-screen bg-cover bg-center"
             style={{ backgroundImage: "url('/images/bg-water-dark.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 md:px-24 md:py-32" ref={containerRef}>
        
        <Navbar />
        
        {/* Simple Return Link */}
        <header className="mb-16 md:mb-24 mt-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {archive.back}
          </Link>
        </header>

        {/* Title Container */}
        <div className="mb-16 md:mb-24">
          <h1 className="font-serif text-4xl sm:text-5xl italic tracking-tight text-offwhite md:text-7xl" style={{ viewTransitionName: "page-title" }}>
            {archive.title}
          </h1>
          <p className="mt-6 font-mono text-sm leading-relaxed text-gray-400 max-w-xl">
            {archive.subtitle}
          </p>
        </div>

        {/* ── MOBILE: card list ── */}
        <div className="md:hidden flex flex-col divide-y divide-offwhite/5">
          {archive.projects.map((project: any, idx: number) => (
            <div
              key={idx}
              ref={(el) => { rowsRef.current[idx] = el; }}
              className={`py-5 flex flex-col gap-3 ${project.isFeatured ? "bg-offwhite/[0.04]" : ""}`}
            >
              {/* Top row: year + domain badge */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-gray-500">{project.year}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500 text-right leading-tight">{project.domain}</span>
              </div>

              {/* Title */}
              <p className={`font-sans text-base font-medium leading-snug ${project.isFeatured ? "text-accent" : "text-offwhite"}`}>
                {project.title}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {project.caseStudy && (
                  <Link
                    href={project.caseStudy}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent/15 font-mono text-[10px] font-bold uppercase tracking-widest text-accent active:scale-95 transition-transform"
                  >
                    {language === 'es' ? 'Caso de Estudio' : 'Case Study'}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
                {project.links ? (
                  project.links.map((lnk: any, lidx: number) => (
                    <a
                      key={lidx}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-offwhite/10 font-mono text-[10px] text-gray-400 active:scale-95 transition-transform"
                    >
                      {lnk.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ))
                ) : (project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-offwhite/10 font-mono text-[10px] text-gray-400 active:scale-95 transition-transform"
                  >
                    {archive.viewProject}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── DESKTOP: table ── */}
        <div className="hidden md:block w-full">
          <table className="w-full text-left font-mono text-sm border-collapse">
            <thead>
              <tr className="border-b border-offwhite/10 text-xs uppercase tracking-widest text-gray-500">
                <th className="pb-6 pl-2 pr-6 font-normal w-24">{archive.headers.year}</th>
                <th className="pb-6 px-6 font-normal w-[40%]">{archive.headers.project}</th>
                <th className="pb-6 px-6 font-normal">{archive.headers.domain}</th>
                <th className="pb-6 px-6 text-right font-normal">{archive.headers.link}</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {archive.projects.map((project: any, idx: number) => (
                <tr
                  key={idx}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  className={`group border-b transition-colors ${
                    project.isFeatured
                      ? "border-offwhite/20 bg-offwhite/[0.03] hover:bg-offwhite/[0.08]"
                      : "border-offwhite/5 hover:bg-offwhite/5"
                  }`}
                >
                  <td className="py-6 pl-2 pr-6 align-top text-gray-500">
                    {project.year}
                    {project.isFeatured && (
                      <span className="block mt-2 text-[10px] text-accent uppercase tracking-widest font-mono">
                        [CASE STUDY]
                      </span>
                    )}
                  </td>
                  <td className={`py-6 px-6 align-top font-sans text-lg font-medium ${project.isFeatured ? "text-accent font-bold" : "text-offwhite"}`}>
                    {project.title}
                  </td>
                  <td className="py-6 px-6 align-top text-sm text-gray-500">
                    {project.domain}
                  </td>
                  <td className="py-6 px-6 text-right align-top">
                    <div className="flex flex-col items-end gap-3">
                      {project.caseStudy && (
                        <Link
                          href={project.caseStudy}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent transition-colors hover:text-white bg-accent/10 px-3 py-1.5 rounded-full"
                        >
                          {language === 'es' ? 'Caso de Estudio' : 'Case Study'}
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                      {project.links ? (
                        project.links.map((lnk: any, lidx: number) => (
                          <a
                            key={lidx}
                            href={lnk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-gray-400 hover:text-white transition-colors"
                          >
                            {lnk.label}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))
                      ) : (project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${project.isFeatured ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-accent"}`}
                        >
                          {archive.viewProject}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}
