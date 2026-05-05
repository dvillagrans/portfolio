"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Brain, Database, BarChart3, Globe, Cpu, Workflow, Terminal, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <Brain className="w-full h-full" />,
  <Database className="w-full h-full" />,
  <BarChart3 className="w-full h-full" />,
  <Globe className="w-full h-full" />
];

const subIcons = [
  <Workflow className="w-4 h-4" />,
  <Terminal className="w-4 h-4" />,
  <Cpu className="w-4 h-4" />,
  <Layers className="w-4 h-4" />
];

export default function Systems() {
  const containerRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        blocksRef.current.forEach((block) => {
          if (!block) return;
          gsap.set(block, { opacity: 1, y: 0 });
        });
        return;
      }
      blocksRef.current.forEach((block, index) => {
        if (!block) return;
        gsap.fromTo(
          block,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  // Balanced 2x2 grid on desktop, each card is equal prominence
  const cardStyles = "lg:col-span-1 border-offwhite/10 hover:border-accent/40 bg-white/[0.02] hover:bg-white/[0.04]";

  const glowStyles = [
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-warm/10 blur-[100px] transition-all duration-500 group-hover:bg-warm/20",
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/8 blur-[100px] transition-all duration-500 group-hover:bg-accent/18",
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/8 blur-[100px] transition-all duration-500 group-hover:bg-accent/18",
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-warm/10 blur-[100px] transition-all duration-500 group-hover:bg-warm/20",
  ];

  return (
    <section ref={containerRef} id="systems" className="relative bg-charcoal py-24 md:py-32 text-offwhite pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24 overflow-hidden">
      {/* Background ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-offwhite/10 to-transparent" aria-hidden="true"></div>
      
      <div className="mx-auto max-w-7xl">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-12 bg-warm opacity-60"></div>
             <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/70">
               03. {t.systems.title}
             </span>
          </div>
          <h2 className="font-serif text-5xl lg:text-7xl tracking-tight text-offwhite mb-4">
             {language === 'es' ? (
                <>Arquitectura <span className="italic text-offwhite/50 font-light">&</span> Escala</>
             ) : (
                <>Architecture <span className="italic text-offwhite/50 font-light">&</span> Scale</>
             )}
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {t.systems.items.map((cap, idx) => {
            return (
              <div
                key={cap.title}
                ref={(el) => {
                  blocksRef.current[idx] = el;
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 md:p-8 lg:p-12 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${cardStyles}`}
              >
                {/* Background Glow Effect */}
                <div className={glowStyles[idx] ?? "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px]"} aria-hidden="true"></div>
                
                <div className="relative z-10 flex flex-col gap-10 h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-warm/50 group-hover:bg-warm/10 transition-all duration-500">
                        {subIcons[idx % subIcons.length]}
                      </div>
                      <span className={`font-mono text-[10px] font-bold tracking-[0.3em] uppercase ${idx % 2 === 0 ? "text-warm/60 group-hover:text-warm" : "text-accent/60 group-hover:text-accent"} transition-colors duration-300`}>
                        SYS_0{idx + 1}
                      </span>
                    </div>
                    <div className="h-12 w-12 text-offwhite/20 transition-all duration-700 group-hover:scale-110 group-hover:text-offwhite/80 group-hover:rotate-6 flex-shrink-0" aria-hidden="true">
                      {icons[idx % icons.length]}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`mb-4 font-sans text-2xl md:text-2xl lg:text-3xl font-medium tracking-tight text-offwhite group-hover:text-white transition-colors duration-300 break-words`}>
                      {cap.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-offwhite/50 group-hover:text-offwhite/80 transition-colors duration-300 mb-8 break-words">
                      {cap.description}
                    </p>
                    
                    {/* Technical Tags / Meta */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {cap.tags?.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] uppercase tracking-widest font-bold text-offwhite/40 group-hover:text-offwhite/70 group-hover:border-white/10 transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
