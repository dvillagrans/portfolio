"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const abstractions = [
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-offwhite transition-colors" viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="20" rx="4" fill="none" strokeWidth="1" />
      <rect x="10" y="40" width="35" height="50" rx="4" fill="none" strokeWidth="1" />
      <rect x="55" y="40" width="35" height="50" rx="4" fill="none" strokeWidth="1" />
      <path d="M50 30 v10" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-offwhite transition-colors" viewBox="0 0 100 100">
      <circle cx="20" cy="50" r="10" fill="none" strokeWidth="1" />
      <circle cx="80" cy="50" r="10" fill="none" strokeWidth="1" />
      <path d="M30 50 h40" strokeWidth="1" strokeDasharray="4,2" />
      <path d="M50 45 l5 5 l-5 5" fill="none" strokeWidth="1" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-offwhite transition-colors" viewBox="0 0 100 100">
      <rect x="20" y="20" width="60" height="60" rx="8" fill="none" strokeWidth="1" />
      <circle cx="50" cy="50" r="15" fill="none" strokeWidth="1" />
      <path d="M45 45 l10 10" strokeWidth="1" />
      <path d="M55 45 l-10 10" strokeWidth="1" />
    </svg>
  ),
  (
    <svg className="w-full h-full stroke-gray-500 hover:stroke-offwhite transition-colors" viewBox="0 0 100 100">
      <path d="M25 25 L50 15 L75 25 L75 75 L50 85 L25 75 Z" fill="none" strokeWidth="1" />
      <circle cx="50" cy="50" r="5" fill="none" strokeWidth="1" />
      <path d="M50 25 V45 m0 10 V75 M25 50 H45 m10 0 H75" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
  )
];

export default function Systems() {
  const containerRef = useRef<HTMLElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      blocksRef.current.forEach((block, index) => {
        if (!block) return;
        gsap.fromTo(
          block,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="systems" className="bg-charcoal px-8 py-32 text-offwhite md:px-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-20 font-sans text-xs uppercase tracking-[0.2em] text-gray-400">
          {t.systems.title}
        </h2>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {t.systems.items.map((cap, idx) => (
            <div
              key={cap.title}
              ref={(el) => {
                blocksRef.current[idx] = el;
              }}
              className="group flex flex-col items-start border-t border-offwhite/10 pt-8 transition-colors hover:border-accent"
            >
              <div className="mb-12 h-32 w-32 opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-2">
                {abstractions[idx % abstractions.length]}
              </div>
              <h3 className="mb-4 font-mono text-lg font-medium tracking-tight">
                {cap.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-gray-400">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
