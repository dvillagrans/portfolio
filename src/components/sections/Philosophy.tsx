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
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-offwhite px-8 py-40 md:px-24">
      <div className="mx-auto max-w-4xl text-center md:text-left">
        <h2 className="mb-12 font-mono text-xs uppercase tracking-widest text-charcoal/40">
          {t.philosophy.tag}
        </h2>
        <div ref={textRef} className="flex flex-col gap-10">
          <p className="font-serif text-3xl leading-snug tracking-tight text-charcoal md:text-5xl md:leading-[1.15]">
            {t.philosophy.quote}
          </p>
          <div className="grid grid-cols-1 gap-12 border-t border-charcoal/10 pt-12 md:grid-cols-3 md:gap-8 text-left">
            {t.philosophy.items.map((item, idx) => (
              <div key={idx}>
                <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-charcoal">
                  {item.title}
                </h3>
                <p className="font-mono text-sm leading-relaxed text-charcoal/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
