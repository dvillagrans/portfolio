"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const abstractions = [
  (
    <svg className="w-full h-full stroke-offwhite/50 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100" aria-hidden>
      <rect x="10" y="10" width="80" height="20" rx="4" fill="none" strokeWidth="1" />
      <rect x="10" y="40" width="35" height="50" rx="4" fill="none" strokeWidth="1" />
      <rect x="55" y="40" width="35" height="50" rx="4" fill="none" strokeWidth="1" />
      <path d="M50 30 v10" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-offwhite/50 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100" aria-hidden>
      <circle cx="20" cy="50" r="10" fill="none" strokeWidth="1" />
      <circle cx="80" cy="50" r="10" fill="none" strokeWidth="1" />
      <path d="M30 50 h40" strokeWidth="1" strokeDasharray="4,2" />
      <path d="M50 45 l5 5 l-5 5" fill="none" strokeWidth="1" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-offwhite/50 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100" aria-hidden>
      <rect x="20" y="20" width="60" height="60" rx="8" fill="none" strokeWidth="1" />
      <circle cx="50" cy="50" r="15" fill="none" strokeWidth="1" />
      <path d="M45 45 l10 10" strokeWidth="1" />
      <path d="M55 45 l-10 10" strokeWidth="1" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-offwhite/50 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100" aria-hidden>
      <path d="M25 25 L50 15 L75 25 L75 75 L50 85 L25 75 Z" fill="none" strokeWidth="1" />
      <circle cx="50" cy="50" r="5" fill="none" strokeWidth="1" />
      <path d="M50 25 V45 m0 10 V75 M25 50 H45 m10 0 H75" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  )
];

export default function Systems() {
  const containerRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t, language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Each card gets a distinct visual personality
  const cardStyles = [
    // First card — warm amber accent, larger prominence
    "lg:col-span-2 border-warm/30 hover:border-warm/60 bg-warm/[0.03] hover:bg-warm/[0.06]",
    // Second card — standard teal
    "lg:col-span-1 border-offwhite/10 hover:border-accent/40 bg-offwhite/[0.02] hover:bg-offwhite/[0.04]",
    // Third card — standard teal
    "lg:col-span-1 border-offwhite/10 hover:border-accent/40 bg-offwhite/[0.02] hover:bg-offwhite/[0.04]",
    // Fourth card — warm amber, larger prominence
    "lg:col-span-2 border-warm/20 hover:border-warm/50 bg-offwhite/[0.02] hover:bg-warm/[0.04]",
  ];

  const glowStyles = [
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-warm/8 blur-[100px] transition-all duration-500 group-hover:bg-warm/18",
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px] transition-all duration-500 group-hover:bg-accent/15",
    "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px] transition-all duration-500 group-hover:bg-accent/15",
    "absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-warm/8 blur-[100px] transition-all duration-500 group-hover:bg-warm/18",
  ];

  const titleHoverColors = [
    "group-hover:text-warm",
    "group-hover:text-accent-light",
    "group-hover:text-accent-light",
    "group-hover:text-warm",
  ];

  return (
    <section ref={containerRef} id="systems" className="relative bg-charcoal py-24 md:py-32 text-offwhite pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24 overflow-hidden">
      {/* Background ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-offwhite/10 to-transparent"></div>
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.systems.items.map((cap, idx) => {
            return (
              <div
                key={cap.title}
                ref={(el) => {
                  blocksRef.current[idx] = el;
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${cardStyles[idx] ?? "border-offwhite/10 bg-offwhite/[0.02]"} ${idx % 2 === 0 ? "mr-4 md:mr-0" : "ml-4 md:ml-0"}`}
              >
                {/* Background Glow Effect */}
                <div className={glowStyles[idx] ?? "absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px]"}></div>
                
                <div className="relative z-10 flex flex-col gap-8 h-full">
                  <div className="flex items-start justify-between">
                    <span className={`font-sans text-[10px] font-bold tracking-[0.3em] uppercase mt-2 ${idx % 2 === 0 ? "text-warm/60 group-hover:text-warm/90" : "text-offwhite/50 group-hover:text-offwhite/70"} transition-colors duration-300`}>
                      SYS_0{idx + 1}
                    </span>
                    <div className="h-16 w-16 opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80 flex-shrink-0">
                      {abstractions[idx % abstractions.length]}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-12">
                    <h3 className={`mb-4 font-sans text-2xl lg:text-3xl font-medium tracking-tight text-offwhite/90 transition-colors duration-300 ${titleHoverColors[idx] ?? "group-hover:text-accent"}`}>
                      {cap.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-offwhite/55 group-hover:text-offwhite/75 transition-colors duration-300">
                      {cap.description}
                    </p>
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

