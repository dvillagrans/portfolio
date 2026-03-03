"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, language } = useLanguage();

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
    <section ref={sectionRef} id="projects" className="relative bg-offwhite px-6 py-20 text-charcoal md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-charcoal/10 pb-8">
          <div>
            <h2 className="font-serif text-5xl italic text-graphite">{t.work.title}</h2>
            <p className="mt-4 max-w-md font-sans text-sm tracking-wide text-gray-500 uppercase">
              {t.work.subtitle}
            </p>
          </div>
          <a
            href="/projects"
            className="group flex items-center gap-3 border border-charcoal/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-charcoal transition-all hover:bg-charcoal hover:text-offwhite rounded-full bg-white shadow-sm hover:shadow-md"
          >
            {language === 'en' ? 'View Full Archive' : 'Ver Archivo Completo'}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </header>

        <div className="flex flex-col gap-12">
          {t.work.projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="group relative flex flex-col gap-8 lg:flex-row p-6 lg:p-10 transition-colors duration-500 bg-white hover:bg-gray-50/80 rounded-[2rem] shadow-sm hover:shadow-xl border border-charcoal/5"
            >
              {/* Left Column: Title, Visual, CTA */}
              <div className="flex w-full flex-col lg:w-[45%] gap-8">
                <div>
                  <span className="font-mono text-xs font-bold text-charcoal/40 block mb-3 uppercase tracking-widest">
                    SYS_0{project.id}
                  </span>
                  <h3 className="font-sans text-2xl lg:text-3xl font-medium tracking-tight text-charcoal leading-tight">
                    {project.title}
                  </h3>
                </div>
                
                {/* Visual Proof / Image */}
                {(project as any).image ? (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 shadow-inner group-hover:shadow-lg transition-all duration-500 transform group-hover:-translate-y-1">
                    <img 
                      src={(project as any).image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-charcoal/10 bg-gray-100 flex items-center justify-center">
                    <span className="font-mono text-xs text-charcoal/40 uppercase tracking-widest">No Preview Available</span>
                  </div>
                )}

                {/* Case Study / Links CTA */}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  {(project as any).caseStudy ? (
                    <Link
                      href={(project as any).caseStudy}
                      className="flex-1 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-offwhite bg-accent px-5 py-3.5 rounded-xl hover:bg-accent/90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-accent/20"
                    >
                      {language === 'es' ? 'Caso de Estudio' : 'Case Study'} <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-offwhite bg-charcoal px-5 py-3.5 rounded-xl hover:bg-charcoal/90 hover:scale-[1.02] transition-all duration-300 shadow-md"
                    >
                      {language === 'es' ? 'Ver Proyecto' : 'Open Project'} <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Impact, Narrative, Stack */}
              <div className="flex w-full flex-col lg:w-[55%] lg:pl-12 pt-4 lg:pt-0 lg:border-l border-charcoal/10">

                {/* Impact / Features Breakdown */}
                <div className="flex flex-col mb-8">
                   <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/50 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {language === 'es' ? 'Impacto & Arquitectura' : 'Impact & Architecture'}
                   </h4>
                   
                   {(project as any).features ? (
                      <div className="flex flex-col gap-6">
                         {(project as any).features.map((feat: any, i: number) => (
                            <div key={i} className="flex flex-col gap-1.5">
                               <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">
                                  {feat.name}
                               </span>
                               <span className="text-base font-sans font-medium text-charcoal/90">
                                  {feat.value}
                               </span>
                            </div>
                         ))}
                      </div>
                   ) : (
                     <p className="text-base lg:text-lg text-charcoal/90 font-sans leading-relaxed">
                       {project.system.split(' ').map((word: string, i: number) => {
                          const isKeyword = word.length > 5 && (i % 5 === 0 || word.includes('ing') || word.includes('ed'));
                          return isKeyword ? <strong key={i} className="font-semibold text-charcoal">{word} </strong> : word + ' ';
                       })}
                     </p>
                   )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-auto bg-gray-50/50 p-5 lg:p-6 rounded-2xl border border-charcoal/5">
                   {/* Role */}
                   <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">
                        {t.work.labelScope}
                      </span>
                      <p className="text-sm font-sans font-medium text-charcoal/80 leading-relaxed">{project.problem}</p>
                   </div>

                   {/* Tech Stack */}
                   <div className="flex flex-col gap-4">
                       <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-charcoal/40">
                         {t.work.labelOutcome}
                       </span>
                       <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                         {project.outcome.split(',').map((tech: string, i: number, arr: string[]) => (
                           <span key={i} className="flex items-center text-xs font-sans text-charcoal/60">
                             {tech.trim()}
                             {i < arr.length - 1 && <span className="opacity-30 mx-2 text-[10px]">•</span>}
                           </span>
                         ))}
                       </div>
                   </div>
                </div>

                {/* Auxiliary links below stack */}
                {(project as any).links && (project as any).links.length > 0 && (
                   <div className="mt-6 flex flex-wrap items-center gap-3">
                     {(project as any).links.map((link: any, lIdx: number) => (
                       <a 
                         key={lIdx} 
                         href={link.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-charcoal/10 bg-white font-sans text-sm font-medium text-charcoal/80 hover:text-accent hover:border-accent/30 hover:bg-accent/5 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                       >
                         {link.label} 
                         <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                       </a>
                     ))}
                   </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
