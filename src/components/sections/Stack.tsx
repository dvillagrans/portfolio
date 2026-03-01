"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  "React",
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "Radix UI",
  "Zustand",
  "Sanity",
  "Payload CMS",
  "Vercel",
  "Docker",
  "PostgreSQL",
  "Prisma",
  "Python",
  "Playwright",
  "TRPC",
  "Figma",
];

export default function Stack() {
  const container = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "circ.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
            delay: (index % Math.floor(tools.length / 3)) * 0.05, // Subtle staggering
          }
        );
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="bg-charcoal px-8 py-32 md:px-24 border-t border-offwhite/5 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-20 font-sans text-xs uppercase tracking-[0.2em] text-gray-400 text-center">
          {t.stack.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 gap-y-12 max-w-4xl mx-auto">
          {tools.map((tool, idx) => (
            <span
              key={tool}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="font-mono text-sm uppercase tracking-widest text-gray-500 transition-colors duration-300 hover:text-offwhite cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
