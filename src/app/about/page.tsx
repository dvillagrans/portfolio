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
  const meta = about.meta;
  // Split the title for editorial typography: "Diego" / "Villagran" / "Salazar"
  const titleParts = about.title.trim().split(/\s+/);
  const titleFirst = titleParts[0] ?? about.title;
  const titleMid = titleParts[1] ?? "";
  const titleLast = titleParts.slice(2).join(" ");

  // Split the intro text by highlighted keywords and wrap each match in a
  // serif italic warm span. Longer phrases match before shorter ones so
  // "ML pipelines" beats "ML" if both were highlights.
  const introNodes = (() => {
    const highlights = about.introHighlights;
    if (!highlights?.length) return [about.intro];
    const sorted = [...highlights].sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(${sorted.map(escape).join("|")})`, "g");
    const set = new Set(sorted);
    return about.intro.split(pattern).map((part, i) => {
      if (set.has(part)) {
        return (
          <em key={i} className="font-serif italic font-medium text-warm">
            {part}
          </em>
        );
      }
      return part;
    });
  })();

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
        <header className="mb-24 mt-20 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/"
            className="group flex items-center min-h-[44px] gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] spring-press"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{language === "en" ? "Return" : "Volver"}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download CV button */}
            <a
              href="/resume/resume-banca.pdf"
              download
              className="group inline-flex items-center justify-center min-h-[40px] sm:min-h-[44px] gap-1.5 sm:gap-2 border border-[var(--border-color)] rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[var(--card)] shadow-sm font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-[var(--text-secondary)] transition-all hover:text-[var(--text-primary)] hover:border-[var(--border-color)] spring-press"
            >
              {language === "en" ? "Download CV" : "Descargar CV"}
              <ArrowDownToLine className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </a>

            {/* Live status badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 border border-[var(--border-color)] rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[var(--card)] shadow-sm">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-warm" />
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-[var(--text-secondary)]">
                {language === "en" ? "Open to work" : "Disponible"}
              </span>
            </div>
          </div>
        </header>

        {/* Editorial Intro */}
        <section className="mb-32">

          {/* Eyebrow — masthead-style role tag */}
          <p
            ref={(el) => { elementsRef.current[1] = el; }}
            className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-warm mb-10 md:mb-14"
          >
            {about.subtitle}
          </p>

          {/* Title + Portrait — asymmetric editorial grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mb-20 md:mb-28 items-start">

            {/* Title + meta */}
            <div className="md:col-span-7 flex flex-col gap-12 md:order-1 order-2">
              <h1
                style={{ viewTransitionName: "about-title" }}
                ref={(el) => { elementsRef.current[0] = el; }}
                className="font-serif text-6xl md:text-[7.5rem] leading-[0.92] tracking-tight text-[var(--text-primary)]"
              >
                {titleFirst}
                {titleMid && (
                  <>
                    <br />
                    <span className="italic text-[var(--text-secondary)]">{titleMid}</span>
                  </>
                )}
                {titleLast && (
                  <>
                    <br />
                    <span className="font-light">{titleLast}</span>
                  </>
                )}
              </h1>

              {/* Meta block — magazine masthead */}
              <dl className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-8 font-mono text-[10px] uppercase tracking-[0.22em] max-w-sm border-t border-[var(--border-color)] pt-6">
                <dt className="text-[var(--text-muted)]">{meta.locationLabel}</dt>
                <dd className="text-[var(--text-secondary)]">{meta.locationValue}</dd>
                <dt className="text-[var(--text-muted)]">{meta.statusLabel}</dt>
                <dd className="text-warm">{meta.statusValue}</dd>
                <dt className="text-[var(--text-muted)]">{meta.roleLabel}</dt>
                <dd className="text-[var(--text-secondary)]">{about.subtitle.split("·")[0]?.trim()}</dd>
                <dt className="text-[var(--text-muted)]">{meta.studyingLabel}</dt>
                <dd className="text-[var(--text-secondary)]">{meta.studyingValue}</dd>
              </dl>
            </div>

            {/* Identity poster — monogram in place of portrait */}
            <div
              ref={(el) => { elementsRef.current[7] = el; }}
              className="md:col-span-5 md:order-2 order-1 relative"
            >
              <figure
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-2xl"
                aria-label={`${about.title} — identity card`}
              >
                {/* Warm radial wash */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 28% 18%, rgba(225,160,80,0.22) 0%, transparent 55%), radial-gradient(ellipse at 78% 88%, rgba(225,160,80,0.10) 0%, transparent 50%)",
                  }}
                  aria-hidden
                />
                {/* Faint grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                  aria-hidden
                />

                {/* Top corner credit line */}
                <div className="absolute top-5 inset-x-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--text-muted)] z-10">
                  <span>EST. 2024</span>
                  <span>MX · CDMX</span>
                </div>

                {/* Monogram — D + V overlapping */}
                <div className="absolute inset-0 flex items-center justify-center select-none">
                  <div className="relative" aria-hidden>
                    <span className="block font-serif text-[14rem] md:text-[18rem] leading-none text-[var(--text-primary)] font-medium tracking-tighter transition-transform duration-700 ease-out group-hover:-translate-x-3">
                      D
                    </span>
                    <span
                      className="absolute font-serif italic text-[14rem] md:text-[18rem] leading-none text-warm tracking-tighter transition-transform duration-700 ease-out group-hover:translate-x-3"
                      style={{ left: "52%", top: "18%" }}
                    >
                      V
                    </span>
                  </div>
                </div>

                {/* Bottom credit line */}
                <div className="absolute bottom-5 inset-x-5 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--text-muted)] z-10">
                  <span>N° 01 · IDENTITY</span>
                  <span>AI / SYSTEMS</span>
                </div>

                {/* Vignette to soften edges */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.20) 100%)",
                  }}
                  aria-hidden
                />
              </figure>
            </div>

          </div>

          {/* Intro paragraph — magazine lede with drop-cap, decorative quote, and highlighted keywords */}
          <div className="relative max-w-3xl">
            {/* Giant decorative opening quote — hangs in the margin */}
            <span
              aria-hidden
              className="pointer-events-none select-none absolute font-serif italic text-warm/20 leading-none -left-2 md:-left-16 -top-8 md:-top-16"
              style={{ fontSize: "clamp(7rem, 12vw, 14rem)" }}
            >
              &ldquo;
            </span>

            <p
              ref={(el) => { elementsRef.current[2] = el; }}
              className="relative drop-cap text-2xl md:text-4xl leading-relaxed md:leading-[1.4] text-[var(--text-primary)] font-medium text-balance"
            >
              {introNodes}
            </p>
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
            <div className="md:col-span-8 font-serif text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)] drop-cap">
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

        {/* Full-bleed Thesis — mid-page rupture */}
        <section
          ref={(el) => { elementsRef.current[9] = el; }}
          className="relative left-1/2 -translate-x-1/2 w-screen my-32 md:my-44 py-28 md:py-40 overflow-hidden"
          aria-label="Thesis statement"
        >
          {/* Base wash */}
          <div className="absolute inset-0 bg-[var(--bg-secondary)]" aria-hidden />
          {/* Warm radial spotlight */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(225,160,80,0.10) 0%, transparent 65%)",
            }}
            aria-hidden
          />
          {/* Faint grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
            aria-hidden
          />
          {/* Top & bottom hairlines */}
          <div className="absolute top-0 inset-x-0 h-px bg-[var(--border-color)]" aria-hidden />
          <div className="absolute bottom-0 inset-x-0 h-px bg-[var(--border-color)]" aria-hidden />

          <div className="relative max-w-5xl mx-auto px-8 md:px-16 text-center">
            {/* Eyebrow */}
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-warm mb-10">
              {language === "en" ? "Thesis" : "Tesis"}
            </p>

            {/* Giant opening quote glyph */}
            <span
              className="block font-serif italic text-warm/35 leading-none mb-[-0.35em]"
              style={{ fontSize: "clamp(8rem, 16vw, 16rem)" }}
              aria-hidden
            >
              &ldquo;
            </span>

            {/* Thesis — declarative serif */}
            <blockquote
              className="font-serif font-medium leading-[1.15] tracking-tight text-[var(--text-primary)] text-balance"
              style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
            >
              {closureText}
            </blockquote>

            {/* Signature line */}
            <div className="mt-14 md:mt-20 flex items-center justify-center gap-5">
              <div className="h-px w-16 bg-[var(--border-color)]" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--text-muted)]">
                DV · {language === "en" ? "On building" : "Sobre construir"}
              </span>
              <div className="h-px w-16 bg-[var(--border-color)]" aria-hidden />
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <div className="flex flex-col gap-32 pt-24">
          <Certifications />
        </div>

        {/* Closure — CTAs only (thesis lives in the full-bleed mid-page) */}
        <section
          ref={(el) => { elementsRef.current[6] = el; }}
          className="mt-40 mb-20 text-center max-w-2xl mx-auto"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-warm mb-8">
            {language === "en" ? "Get in touch" : "Hablemos"}
          </p>

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
