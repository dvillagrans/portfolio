"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, ArrowDownToLine, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import CountUpMetric from "@/components/ui/CountUpMetric";
import Certifications from "@/components/sections/Certifications";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setScrollPct(pct);
      // Also drive via GSAP for smooth rendering
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, { scaleX: pct / 100, transformOrigin: "left" });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const { about } = t;
  const sections = about.sections;
  const closureText = about.closure;
  const stats = about.metrics;

  return (
    <main
      id="main-content"
      className="min-h-screen w-full font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      tabIndex={-1}
    >
      {/* Reading progress bar — 3px, warm amber fill, visible */}
      <div className="fixed top-0 left-0 z-[100] h-[3px] w-full bg-[var(--text-primary)]/5">
        <div
          ref={progressBarRef}
          className="h-full bg-warm origin-left"
          style={{ transform: `scaleX(${scrollPct / 100})` }}
          aria-hidden
        />
      </div>

      <Navbar />
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 md:px-12 md:py-32" ref={containerRef}>

        {/* Header */}
        <header className="mb-24 mt-20 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center min-h-[44px] gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] spring-press"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "Return" : "Volver"}
          </Link>

          <div className="flex items-center gap-3">
            {/* Download CV button */}
            <a
              href="/resume/resume-banca.pdf"
              download
              className="group inline-flex items-center justify-center min-h-[44px] gap-2 border border-[var(--border-color)] rounded-full px-4 py-2 bg-[var(--card)] shadow-sm font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] hover:border-[var(--border-color)] spring-press"
            >
              {language === "en" ? "Download CV" : "Descargar CV"}
              <ArrowDownToLine className="h-3.5 w-3.5" />
            </a>

            {/* Live status badge */}
            <div className="flex items-center gap-2 border border-[var(--border-color)] rounded-full px-4 py-2 bg-[var(--card)] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-warm" />
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                {language === "en" ? "Open to work" : "Disponible"}
              </span>
            </div>
          </div>
        </header>

        {/* Editorial Intro */}
        <section className="mb-32">

          {/* Title Section */}
          <div className="flex flex-col gap-4 mb-20">
            <h1
              style={{ viewTransitionName: "about-title" }}
              ref={(el) => { elementsRef.current[0] = el; }}
              className="font-serif text-5xl italic tracking-tight md:text-8xl mb-4 text-[var(--text-primary)]"
            >
              {about.title}
            </h1>
            <p
              ref={(el) => { elementsRef.current[1] = el; }}
              className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-warm"
            >
              {about.subtitle}
            </p>
          </div>

          <div
            ref={(el) => { elementsRef.current[2] = el; }}
            className="text-2xl md:text-4xl leading-relaxed md:leading-[1.4] text-[var(--text-primary)] font-medium text-balance"
          >
            {about.intro}
          </div>

          {/* Stats strip — animated counters */}
          <div
            ref={(el) => { elementsRef.current[8] = el; }}
            className="mt-20 grid grid-cols-3 divide-x divide-[var(--border-color)] border border-[var(--border-color)] rounded-[1.5rem] overflow-hidden shadow-sm"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-[var(--card)] px-8 py-10 flex flex-col gap-2">
                <CountUpMetric
                  value={stat.value}
                  label={stat.label}
                  className="font-serif text-3xl md:text-4xl italic text-[var(--text-primary)]"
                />
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Body Sections */}
        <div className="flex flex-col gap-32 border-t border-[var(--border-color)] pt-24">

          {/* How I build */}
          <section ref={(el) => { elementsRef.current[3] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-warm pt-2 border-t-2 border-warm/30 md:border-transparent md:pt-0">
              {sections.systems.title}
            </h2>
            <div className="md:col-span-8 font-serif text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)]">
              {sections.systems.content}
            </div>
          </section>

          {/* What I optimize for */}
          <section ref={(el) => { elementsRef.current[4] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)] md:border-transparent md:pt-0">
              {sections.optimization.title}
            </h2>
            <div className="md:col-span-8 flex flex-col divide-y divide-[var(--border-color)]">
              {sections.optimization.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 py-8 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-warm/80">0{idx + 1}</span>
                    <h3 className="font-sans font-semibold tracking-wide text-[var(--text-primary)]">{item.label}</h3>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)] pl-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Decisions — highlight block */}
          <section
            ref={(el) => { elementsRef.current[5] = el; }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] p-10 md:p-16 rounded-[2rem] shadow-2xl"
          >
            <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-warm/70 pt-2 border-t border-warm/20 md:border-transparent md:pt-0">
              {sections.decisions.title}
            </h2>
            <div className="md:col-span-8 flex flex-col gap-12">
              {sections.decisions.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4 border-l-2 border-warm/40 pl-6">
                  <h3 className="font-serif text-2xl italic">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Certifications Section */}
        <div className="flex flex-col gap-32 pt-24">
          <Certifications />
        </div>

        {/* Closure */}
        <section
          ref={(el) => { elementsRef.current[6] = el; }}
          className="mt-40 mb-20 text-center max-w-2xl mx-auto"
        >
          <div className="font-serif text-2xl md:text-3xl leading-relaxed text-[var(--text-primary)] mb-12">
            &ldquo;{closureText}&rdquo;
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-warm hover:text-charcoal rounded-full spring-press"
            >
              {language === "en" ? "Start a conversation" : "Iniciar conversación"}
              <span className="h-1.5 w-1.5 rounded-full bg-warm group-hover:bg-charcoal animate-pulse transition-colors" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/dvillagrans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--border-color)] rounded-full hover:border-warm/50 hover:text-[var(--text-primary)] transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/dvillagrans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--border-color)] rounded-full hover:border-warm/50 hover:text-[var(--text-primary)] transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
