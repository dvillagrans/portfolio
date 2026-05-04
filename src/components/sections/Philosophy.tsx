"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".quote-text", { opacity: 1, scale: 1, y: 0 });
        if (textRef.current) {
          gsap.set(textRef.current.children, { opacity: 1, y: 0 });
        }
        return;
      }

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
            once: true,
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
              once: true,
            },
          }
        );
      }
    }, container);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={container} className="relative bg-surface-warm py-24 md:py-32 text-charcoal pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24 overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0_/_0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

      <div className="@container mx-auto max-w-7xl relative z-10">
        
        {/* Section heading for accessibility and semantics */}
        <h2 className="sr-only">{t.philosophy.tag}</h2>
        <div className="flex items-center gap-4 mb-16 justify-start" aria-hidden>
           <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
             04. {t.philosophy.tag}
           </span>
           <div className="h-[1px] w-24 bg-charcoal/10"></div>
        </div>

        {/* Massive Quote Section — more dramatic scale */}
        <div className="mb-28 md:max-w-5xl">
          <p className="quote-text font-serif text-4xl leading-[1.15] tracking-tight text-graphite md:text-7xl lg:text-[5.5rem] lg:leading-[1.08]">
            <span className="text-warm mr-3 font-sans text-5xl md:text-8xl lg:text-[7rem] leading-none align-text-top opacity-70">"</span>
            {t.philosophy.quote.replace(/[""]/g, '')}
          </p>
        </div>

        {/* 3 Pillar Cards — asymmetric layout */}
        <div 
          ref={textRef} 
          className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-5 @lg:gap-8"
        >
          {t.philosophy.items.map((item, idx) => {
            // Split title number from text
            const [number, ...titleRest] = item.title.split('. ');
            const pureTitle = titleRest.join('. ');

            // First card gets special treatment — accent border on left
            const isFirst = idx === 0;

            return (
              <div 
                key={idx}
                className={`group relative flex flex-col p-8 lg:p-10 bg-white hover:bg-offwhite border transition-all duration-500 shadow-sm hover:shadow-xl ${
                  isFirst 
                    ? "border-l-4 border-l-warm border-t border-r border-b border-charcoal/5 hover:border-l-warm hover:shadow-warm/10" 
                    : "border border-charcoal/5 hover:border-accent/20 rounded-2xl"
                }`}
              >
                {/* Minimalist Watermark Number */}
                <span className={`absolute top-6 right-8 font-serif text-6xl font-medium transition-transform duration-500 group-hover:-translate-y-2 ${isFirst ? "text-warm/10 group-hover:text-warm/20" : "text-charcoal/5 group-hover:text-accent/10"}`}>
                  {number}
                </span>

                <div className="relative z-10 flex flex-col h-full mt-12">
                  <h3 className={`mb-5 font-sans text-xl lg:text-2xl font-semibold tracking-tight text-charcoal flex items-center gap-3`}>
                     <div className={`w-2 h-2 rounded-full transition-colors duration-500 shrink-0 ${isFirst ? "bg-warm/60 group-hover:bg-warm" : "bg-accent/40 group-hover:bg-accent"}`}></div>
                     {pureTitle || item.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-graphite/80 group-hover:text-charcoal transition-colors duration-500">
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

