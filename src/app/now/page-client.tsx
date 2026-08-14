"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function NowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        elementsRef.current.forEach((el) => {
          if (!el) return;
          gsap.set(el, { opacity: 1, y: 0 });
        });
        return;
      }
      elementsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  const { now } = t;

  return (
    <main
      id="main-content"
      className="min-h-screen w-full font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      tabIndex={-1}
    >
      <Navbar />
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 md:px-12 md:py-32" ref={containerRef}>
        {/* Header */}
        <header className="mb-24 mt-20 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/"
            className="group flex items-center min-h-[44px] gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] spring-press"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{language === "en" ? "Return" : "Volver"}</span>
          </Link>
        </header>

        {/* Title */}
        <section className="mb-20">
          <div className="flex flex-col gap-4 mb-12">
            <h1
              ref={(el) => { elementsRef.current[0] = el; }}
              className="font-display text-5xl italic tracking-tight md:text-8xl mb-4 text-[var(--text-primary)]"
            >
              {now.title}
            </h1>
            <p
              ref={(el) => { elementsRef.current[1] = el; }}
              className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-warm"
            >
              {now.subtitle}
            </p>
            <p
              ref={(el) => { elementsRef.current[2] = el; }}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              {now.lastUpdated}
            </p>
          </div>
        </section>

        {/* Sections */}
        <div className="flex flex-col gap-24 border-t border-[var(--border-color)] pt-16">
          {now.sections.map((section, idx) => (
            <section
              key={idx}
              ref={(el) => { elementsRef.current[3 + idx] = el; }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-warm pt-2 border-t-2 border-warm/30 md:border-transparent md:pt-0">
                {section.heading}
              </h2>
              <div className="md:col-span-8 font-display text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)]">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
