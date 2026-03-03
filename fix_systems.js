const fs = require('fs');

const content = `"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const abstractions = [
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="20" rx="4" fill="none" strokeWidth="1" />
      <rect x="10" y="40" width="35" height="50" rx="4" fill="none" strokeWidth="1" />
      <rect x="55" y="40" width="35" height="50" rx="4" fill="none" strokeWidth="1" />
      <path d="M50 30 v10" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100">
      <circle cx="20" cy="50" r="10" fill="none" strokeWidth="1" />
      <circle cx="80" cy="50" r="10" fill="none" strokeWidth="1" />
      <path d="M30 50 h40" strokeWidth="1" strokeDasharray="4,2" />
      <path d="M50 45 l5 5 l-5 5" fill="none" strokeWidth="1" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100">
      <rect x="20" y="20" width="60" height="60" rx="8" fill="none" strokeWidth="1" />
      <circle cx="50" cy="50" r="15" fill="none" strokeWidth="1" />
      <path d="M45 45 l10 10" strokeWidth="1" />
      <path d="M55 45 l-10 10" strokeWidth="1" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-accent transition-colors duration-500" viewBox="0 0 100 100">
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

  return (
    <section ref={containerRef} id="systems" className="relative bg-charcoal px-6 py-24 md:py-32 text-offwhite md:px-12 lg:px-24 overflow-hidden">
      {/* Background ambient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-offwhite/10 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-12 bg-accent opacity-50"></div>
             <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
               03. {t.systems.title}
             </span>
          </div>
          <h2 className="font-serif text-5xl lg:text-6xl tracking-tight text-white mb-4">
             {language === 'es' ? (
                <>Arquitectura <span className="italic text-gray-500 font-light">&</span> Escala</>
             ) : (
                <>Architecture <span className="italic text-gray-500 font-light">&</span> Scale</>
             )}
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.systems.items.map((cap, idx) => {
            // Asymmetric bento box layout: first and last items span 2 columns on large screens
            const isLarge = idx === 0 || idx === 3;
            
            return (
              <div
                key={cap.title}
                ref={(el) => {
                  blocksRef.current[idx] = el;
                }}
                className={\`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-offwhite/10 bg-offwhite/[0.02] p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-offwhite/[0.04] hover:shadow-2xl hover:shadow-accent/5 \${
                  isLarge ? "lg:col-span-2" : "lg:col-span-1"
                }\`}
              >
                {/* Background Glow Effect */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[100px] transition-all duration-500 group-hover:bg-accent/15"></div>
                
                <div className="relative z-10 flex flex-col gap-8 h-full">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold text-accent/80 tracking-widest uppercase mt-2">
                      SYS_0{idx + 1}
                    </span>
                    <div className="h-16 w-16 opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 flex-shrink-0">
                      {abstractions[idx % abstractions.length]}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-16">
                    <h3 className="mb-4 font-sans text-2xl lg:text-3xl font-medium tracking-tight text-white group-hover:text-accent transition-colors">
                      {cap.title}
                    </h3>
                    <p className="font-sans text-sm lg:text-base leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
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
`;

fs.writeFileSync('src/components/sections/Systems.tsx', content);
