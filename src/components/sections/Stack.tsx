"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Stack() {
  const container = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const tools = t.stack.tools;
  const [activeByCategory, setActiveByCategory] = useState<Record<number, string | null>>({});

  const dataScience = ["Python", "Pandas", "Numpy", "Matplotlib", "Seaborn", "Scikit-learn", "Tensorflow", "Keras", "PyTorch", "Yolo", "anaconda", "googlecolab"];
  const backend = ["PostgreSQL", "SQL", "Docker", "Kubernetes", "AmazonAWS", "Azure", "googlecloud"];
  const frontend = ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Astro", "Vercel"];

  const categories = [
    {
      name: t.systems?.items?.[0]?.title || (language === 'es' ? 'Ciencia de Datos & IA' : 'Data Science & AI'),
      items: tools.filter(tool => dataScience.some(i => i.toLowerCase() === tool.toLowerCase()))
    },
    {
      name: t.systems?.items?.[1]?.title || (language === 'es' ? 'Infraestructura & Nube' : 'Infrastructure & Cloud'),
      items: tools.filter(tool => backend.some(i => i.toLowerCase() === tool.toLowerCase()))
    },
    {
      name: t.systems?.items?.[3]?.title || (language === 'es' ? 'Desarrollo de Plataforma' : 'Platform Development'),
      items: tools.filter(tool => frontend.some(i => i.toLowerCase() === tool.toLowerCase()))
    },
    {
      name: language === 'es' ? 'Herramientas Base' : 'Core Tools',
      items: tools.filter(tool =>
        !dataScience.some(i => i.toLowerCase() === tool.toLowerCase()) &&
        !backend.some(i => i.toLowerCase() === tool.toLowerCase()) &&
        !frontend.some(i => i.toLowerCase() === tool.toLowerCase())
      )
    }
  ].filter(c => c.items.length > 0);

  const statusText = `stack.audit() — ${tools.length} tools across ${categories.length} domains — all systems nominal`;

  useGSAP(() => {
    if (reduced) {
      gsap.set(".terminal-char", { opacity: 1 });
      gsap.set(".stack-category", { opacity: 1, y: 0, rotateX: 0 });
      gsap.set(".tool-chip", { opacity: 1, y: 0 });
      return;
    }

    // Terminal typing effect — character by character
    if (terminalRef.current) {
      gsap.fromTo(
        ".terminal-char",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.04,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }

    // Cards: staggered dramatic entrance with perspective
    if (cardsRef.current) {
      gsap.fromTo(
        ".stack-category",
        { opacity: 0, y: 70, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }

    // Tool chips: fade in with staggered delay after cards appear
    gsap.fromTo(
      ".tool-chip",
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.015,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 78%",
          once: true,
        },
        delay: 0.5,
      }
    );
  }, { scope: container, dependencies: [reduced], revertOnUpdate: true });

  const renderCategoryCard = (category: typeof categories[number], cIdx: number, isPrimary: boolean = false) => {
    const gradientDir = cIdx % 2 === 0 ? "from-accent to-warm" : "from-warm to-accent";
    const dotColor = cIdx % 2 === 0 ? "bg-accent text-accent" : "bg-warm text-warm";
    const glowColor = cIdx % 2 === 0 ? "bg-accent/[0.04]" : "bg-warm/[0.04]";

    return (
      <div
        key={cIdx}
        className={`stack-category group relative rounded-2xl border border-offwhite/[0.08] bg-graphite/40 backdrop-blur-sm transition-all duration-500 hover:border-offwhite/20 hover:bg-graphite/60 ${isPrimary ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6 lg:p-8"}`}
      >
        {/* Subtle radial glow behind card */}
        <div className={`absolute -inset-8 rounded-[2rem] ${glowColor} blur-[60px] pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100`} aria-hidden="true" />

        {/* Gradient top border */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientDir} rounded-t-2xl opacity-80`} />

        <div className="relative z-10">
          <h3 className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-offwhite/70 mb-6 flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full ${dotColor} shadow-[0_0_8px] shadow-current`} />
            {category.name}
          </h3>

          <div className={`grid gap-2 ${isPrimary ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : "grid-cols-2"}`}>
            {category.items.map((tool, iIdx) => {
              const isActive = activeByCategory[cIdx] === tool;
              const borderAccent = iIdx % 2 === 0 ? "border-l-accent/70" : "border-l-warm/70";
              const dotAccent = iIdx % 2 === 0 ? "bg-accent/50" : "bg-warm/50";

              return (
                <button
                  key={tool}
                  type="button"
                  onClick={() =>
                    setActiveByCategory((prev) => ({
                      ...prev,
                      [cIdx]: isActive ? null : tool,
                    }))
                  }
                  className={`tool-chip relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-offwhite/10 font-mono text-[11px] text-offwhite/80 transition-all duration-300 hover:bg-offwhite/[0.06] hover:text-offwhite hover:border-offwhite/20 ${borderAccent} border-l-[3px] ${
                    isActive
                      ? "bg-accent/15 border-accent/40 text-white"
                      : ""
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${dotAccent}`} />
                  {tool}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={container} className="relative bg-charcoal py-24 md:py-32 text-offwhite pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24 overflow-hidden border-t border-offwhite/5 border-b">

      {/* Central radial gradient — accent at very low opacity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl aspect-square rounded-full bg-accent/[0.03] blur-[140px] pointer-events-none" aria-hidden="true" />

      {/* Noise texture for physical grain */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" aria-hidden="true" />

      <div className="mx-auto max-w-7xl relative z-10">
        <header className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6 md:justify-center">
             <div className="h-[1px] w-12 bg-warm opacity-60 block md:hidden"></div>
             <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/70">
               05. {t.stack.title}
             </span>
             <div className="h-[1px] w-12 bg-warm opacity-60 block md:hidden"></div>
          </div>
           <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-4 md:text-center break-words">
            {language === 'es' ? (
               <>Tecnologías <span className="italic text-offwhite/50 font-light">&</span> Herramientas</>
            ) : (
               <>Technologies <span className="italic text-offwhite/50 font-light">&</span> Tooling</>
            )}
          </h2>
        </header>

        {/* Terminal-style system status bar */}
        <div ref={terminalRef} className="mb-12 md:mb-16 md:text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[13px] text-offwhite/50 bg-offwhite/[0.03] border border-offwhite/10 rounded-lg px-4 py-2.5">
            <span className="text-warm font-bold">{">"}</span>
            <span className="flex">
              {statusText.split("").map((char, i) => (
                <span
                  key={i}
                  className="terminal-char inline-block"
                  style={{ minWidth: char === " " ? "0.4em" : undefined }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="inline-block w-[2px] h-[1em] bg-warm animate-pulse ml-0.5" />
          </div>
        </div>

        {/* Asymmetric layout with perspective container */}
        <div ref={cardsRef} className="flex flex-col gap-6 lg:gap-8" style={{ perspective: "1200px" }}>
          {/* Primary card — full width */}
          {categories.length > 0 && renderCategoryCard(categories[0], 0, true)}

          {/* Secondary cards — responsive grid */}
          {categories.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categories.slice(1).map((category, idx) => renderCategoryCard(category, idx + 1, false))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
