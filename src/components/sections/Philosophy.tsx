"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main quote animation
      gsap.fromTo(
        ".quote-text",
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
          },
        }
      );

      // Box items animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative bg-white py-24 md:py-32 text-charcoal pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24 overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0_/_0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0_/_0.07)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <div className="@container mx-auto max-w-7xl relative z-10">
        
        {/* Section heading for accessibility and semantics */}
        <h2 className="sr-only">{t.philosophy.tag}</h2>
        <div className="flex items-center gap-4 mb-16 justify-center md:justify-start" aria-hidden>
           <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
             04. {t.philosophy.tag}
           </span>
           <div className="h-[1px] w-24 bg-charcoal/10"></div>
        </div>

        {/* Massive Quote Section */}
        <div className="mb-24 md:max-w-4xl">
          <p className="quote-text font-serif text-4xl leading-[1.2] tracking-tight text-graphite md:text-6xl lg:text-7xl md:leading-[1.1]">
            <span className="text-accent/40 mr-4 font-sans text-5xl md:text-8xl">"</span>
            {t.philosophy.quote.replace(/[“”]/g, '')}
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div 
          ref={textRef} 
          className="grid grid-cols-1 @md:grid-cols-3 gap-6 @lg:gap-10"
        >
          {t.philosophy.items.map((item, idx) => {
            // Split title number from text
            const [number, ...titleRest] = item.title.split('. ');
            const pureTitle = titleRest.join('. ');

            return (
              <div 
                key={idx}
                className="group relative flex flex-col p-8 lg:p-10 rounded-[2rem] bg-offwhite hover:bg-white border border-charcoal/5 hover:border-accent/20 transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                {/* Minimalist Watermark Number */}
                <span className="absolute top-6 right-8 font-serif text-6xl text-charcoal/5 font-medium transition-transform duration-500 group-hover:-translate-y-2 group-hover:text-accent/10">
                  {number}
                </span>

                <div className="relative z-10 flex flex-col h-full mt-12">
                  <h3 className="mb-6 font-sans text-xl lg:text-2xl font-semibold tracking-tight text-charcoal flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-500"></div>
                     {pureTitle || item.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-graphite group-hover:text-charcoal transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
