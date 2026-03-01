"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

      <div className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-24 md:py-32" ref={containerRef}>
        
        {/* Navigation & Switcher Header */}
        <header className="mb-24 flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {archive.back}
          </Link>

          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="font-mono text-xs border border-offwhite/20 rounded-full px-3 py-1 transition-colors hover:bg-offwhite hover:text-charcoal"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </header>

        {/* Title Container */}
        <div className="mb-24">
          <h1 className="font-serif text-5xl italic tracking-tight text-offwhite md:text-7xl">
            {archive.title}
          </h1>
          <p className="mt-6 font-mono text-sm leading-relaxed text-gray-400 max-w-xl">
            {archive.subtitle}
          </p>
        </div>

        {/* Dense Table Layout */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-mono text-sm col-span-full border-collapse min-w-[800px]">
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
                  <td className="py-6 pl-2 pr-6 align-top">
                    {project.year}
                    {project.isFeatured && (
                      <span className="block mt-2 text-[10px] text-accent uppercase tracking-widest font-mono">
                        [CASE STUDY]
                      </span>
                    )}
                  </td>
                  <td className={`py-6 px-6 align-top font-sans text-lg font-medium ${project.isFeatured ? 'text-accent font-bold' : 'text-offwhite'}`}>
                    {project.title}
                  </td>
                  <td className="py-6 px-6 align-top text-gray-500">
                    {project.domain}
                  </td>
                  <td className="py-6 px-6 text-right align-top">
                    <div className="flex flex-col items-end gap-3">
                      {project.caseStudy && (
                        <Link 
                          href={project.caseStudy}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
                        >
                          Read Architecture
                          <ArrowLeft className="h-3 w-3 rotate-135" />
                        </Link>
                      )}
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${project.isFeatured ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-accent'}`}
                      >
                        {archive.viewProject}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
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
