"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            delay: index * 0.1, // Stagger on initial load
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const about = (t as any).about;
  if (!about) return null;

  return (
    <main className="min-h-screen w-full bg-offwhite text-charcoal font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite">
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 md:px-12 md:py-32" ref={containerRef}>
        
        {/* Header / Nav */}
        <header className="mb-24 flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === 'en' ? 'Return' : 'Volver'}
          </Link>

          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="font-mono text-xs border border-charcoal/20 rounded-full px-3 py-1 transition-colors hover:bg-charcoal hover:text-offwhite"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </header>

        {/* Editorial Intro */}
        <section className="mb-32">
          <h1 style={{ viewTransitionName: "about-title" }} 
            ref={(el) => { elementsRef.current[0] = el; }}
            className="font-serif text-5xl italic tracking-tight md:text-7xl mb-6 text-graphite"
          >
            {about.title}
          </h1>
          <p 
            ref={(el) => { elementsRef.current[1] = el; }}
            className="font-mono text-sm uppercase tracking-widest text-gray-500 mb-16"
          >
            {about.subtitle}
          </p>
          <div 
            ref={(el) => { elementsRef.current[2] = el; }}
            className="text-2xl md:text-3xl leading-relaxed md:leading-[1.5] text-charcoal font-medium text-balance"
          >
            {about.intro}
          </div>
        </section>

        {/* Body Sections */}
        <div className="flex flex-col gap-32 border-t border-charcoal/10 pt-24">
          
          {/* How I Think */}
          <section ref={(el) => { elementsRef.current[3] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-gray-400 pt-2 border-t border-charcoal/10 md:border-transparent md:pt-0">
              01 // {about.sections.systems.title}
            </h2>
            <div className="md:col-span-8 font-serif text-xl md:text-2xl leading-relaxed text-charcoal/80">
               {about.sections.systems.content}
            </div>
          </section>

          {/* What I optimize for */}
          <section ref={(el) => { elementsRef.current[4] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-gray-400 pt-2 border-t border-charcoal/10 md:border-transparent md:pt-0">
              02 // {about.sections.optimization.title}
            </h2>
            <div className="md:col-span-8 flex flex-col gap-12">
              {about.sections.optimization.items.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-3">
                  <h3 className="font-sans font-semibold tracking-wide text-charcoal">{item.label}</h3>
                  <p className="font-mono text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Decisions */}
          <section ref={(el) => { elementsRef.current[5] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-charcoal text-offwhite p-10 md:p-16 rounded-[2rem] shadow-2xl">
            <h2 className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-gray-400 pt-2 border-t border-offwhite/10 md:border-transparent md:pt-0">
              03 // {about.sections.decisions.title}
            </h2>
            <div className="md:col-span-8 flex flex-col gap-12">
              {about.sections.decisions.items.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-4 border-l-2 border-accent pl-6">
                  <h3 className="font-serif text-2xl italic">{item.title}</h3>
                  <p className="font-mono text-sm leading-relaxed text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Closure */}
        <section 
          ref={(el) => { elementsRef.current[6] = el; }}
          className="mt-40 mb-20 text-center max-w-2xl mx-auto"
        >
          <div className="font-serif text-2xl md:text-3xl leading-relaxed text-graphite mb-12">
            "{about.closure}"
          </div>
          <Link 
            href="/#contact"
            className="group inline-flex items-center gap-4 bg-charcoal text-offwhite px-8 py-4 font-mono text-xs uppercase tracking-widest transition-transform hover:scale-105"
          >
            Deploy System
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          </Link>
        </section>

      </div>
    </main>
  );
}
