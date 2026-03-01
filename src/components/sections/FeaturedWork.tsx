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
    <section ref={sectionRef} id="projects" className="relative bg-offwhite px-8 py-32 text-charcoal md:px-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-charcoal/10 pb-12">
          <div>
            <h2 className="font-serif text-4xl italic text-graphite">{t.work.title}</h2>
            <p className="mt-4 max-w-md font-sans text-sm tracking-wide text-gray-500 uppercase">
              {t.work.subtitle}
            </p>
          </div>
        </header>

        <div className="flex items-center justify-end mb-12">
          <a
            href="/projects"
            className="group flex items-center gap-3 border border-charcoal/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-charcoal transition-all hover:bg-charcoal hover:text-offwhite"
          >
            {language === 'en' ? 'View Full Archive' : 'Ver Archivo Completo'}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
        <div className="flex flex-col gap-12 border-t border-charcoal/10 pt-12">
          {t.work.projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="group relative flex flex-col gap-8 md:flex-row md:items-start p-8 transition-colors duration-500 hover:bg-gray-100/50 rounded-3xl"
            >
              <div className="flex w-full flex-col justify-between md:w-[30%] border-l-2 border-transparent group-hover:border-accent pl-6 transition-all duration-300">
                <span className="font-mono text-xs text-gray-400">SYS_0{project.id}</span>
                <h3 className="mt-6 font-sans text-2xl font-medium tracking-tight">
                  {project.title}
                </h3>
                <div className="mt-12 flex flex-col items-start gap-3">
                  <>
                    {(project as any).caseStudy ? (
                      <Link
                        href={(project as any).caseStudy}
                        className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent opacity-100 md:opacity-0 transform md:translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-accent/10 px-3 py-1.5 rounded-full"
                      >
                        {language === 'es' ? 'Caso de Estudio' : 'Case Study'} <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal opacity-100 md:opacity-0 transform md:translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      >
                        {t.work.inspect} <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    
                    {(project as any).links && (project as any).links.length > 0 && (
                      <div className="flex flex-col gap-2 mt-2 opacity-100 md:opacity-0 transform md:translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                        {(project as any).links.map((link: any, lIdx: number) => (
                          <a 
                            key={lIdx} 
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-charcoal/60 hover:text-charcoal transition-colors ml-1"
                          >
                            <ArrowUpRight className="w-3 h-3" /> {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:w-[70%] md:grid-cols-2 lg:grid-cols-3 font-mono text-sm leading-relaxed text-gray-700">
                <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-4 group-hover:border-charcoal/30 transition-colors">
                  <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">{t.work.labelScope}</span>
                  <p>{project.problem}</p>
                </div>
                <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-4 group-hover:border-charcoal/30 transition-colors">
                  <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">{t.work.labelSystem}</span>
                  <p>{project.system}</p>
                </div>
                <div className="flex flex-col gap-3 border-t border-charcoal/10 pt-4 group-hover:border-charcoal/30 transition-colors md:col-span-2 lg:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">{t.work.labelOutcome}</span>
                  <p>{project.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
