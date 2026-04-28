"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "next-view-transitions";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Animated counter that counts up from 0 to a numeric target
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Extract numeric part and suffix (e.g. "10k+" → num=10, suffix="k+")
  const match = value.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!ref.current || numericTarget === null) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericTarget,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.val) + suffix;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [numericTarget, suffix]);

  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl italic text-charcoal">
      {numericTarget !== null ? `0${suffix}` : value}
    </span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const { language, t } = useLanguage();

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
  }, []);

  const about = (t as { about?: Record<string, unknown> }).about as Record<string, unknown> | undefined;
  if (!about) return null;

  const sections = about.sections as Record<string, { title: string; content?: string; items?: Array<{ label: string; desc: string; title?: string }> }>;
  const closureText = about.closure as string;

  const stats = language === "es"
    ? [
        { value: "3+", label: "Años construyendo" },
        { value: "10k+", label: "Usuarios alcanzados" },
        { value: "10", label: "Sem. MVP TimeUp" },
      ]
    : [
        { value: "3+", label: "Years building" },
        { value: "10k+", label: "Users reached" },
        { value: "10", label: "Wks. TimeUp MVP" },
      ];

  return (
    <main
      id="main-content"
      className="min-h-screen w-full bg-offwhite text-charcoal font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite pb-[env(safe-area-inset-bottom)]"
      tabIndex={-1}
    >
      {/* Reading progress bar — 3px, warm amber fill, visible */}
      <div className="fixed top-0 left-0 z-[100] h-[3px] w-full bg-charcoal/5">
        <div
          ref={progressBarRef}
          className="h-full bg-warm origin-left"
          style={{ transform: `scaleX(${scrollPct / 100})` }}
          aria-hidden
        />
      </div>

      <Navbar theme="light" />
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 md:px-12 md:py-32" ref={containerRef}>

        {/* Header */}
        <header className="mb-24 mt-20 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center min-h-[44px] gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-charcoal/60 transition-colors hover:text-charcoal active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "Return" : "Volver"}
          </Link>

          {/* Live status badge */}
          <div className="flex items-center gap-2 border border-charcoal/10 rounded-full px-4 py-2 bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-warm" />
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              {language === "en" ? "Open to work" : "Disponible"}
            </span>
          </div>
        </header>

        {/* Editorial Intro */}
        <section className="mb-32">

          {/* Title + Avatar row */}
          <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-8 mb-16">
            <div className="flex-1">
              <h1
                style={{ viewTransitionName: "about-title" }}
                ref={(el) => { elementsRef.current[0] = el; }}
                className="font-serif text-5xl italic tracking-tight md:text-7xl mb-6 text-graphite"
              >
                {about.title as string}
              </h1>
              <p
                ref={(el) => { elementsRef.current[1] = el; }}
                className="font-sans text-sm font-medium uppercase tracking-widest text-charcoal/60"
              >
                {about.subtitle as string}
              </p>
            </div>

            {/* Avatar — warm ring on hover */}
            <div
              ref={(el) => { elementsRef.current[7] = el; }}
              className="group shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-charcoal/10 shadow-md self-start transition-all duration-500 hover:border-warm/50 hover:shadow-warm/10 hover:shadow-lg"
            >
              <Image
                src="/img/optimized/me-128.webp"
                alt="Diego Villagran"
                width={128}
                height={128}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div
            ref={(el) => { elementsRef.current[2] = el; }}
            className="text-2xl md:text-3xl leading-relaxed md:leading-[1.5] text-charcoal font-medium text-balance"
          >
            {about.intro as string}
          </div>

          {/* Stats strip — animated counters */}
          <div
            ref={(el) => { elementsRef.current[8] = el; }}
            className="mt-16 grid grid-cols-3 divide-x divide-charcoal/10 border border-charcoal/10 rounded-2xl overflow-hidden"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-white px-6 py-6 flex flex-col gap-1">
                <AnimatedStat value={stat.value} label={stat.label} />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/50 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Body Sections */}
        <div className="flex flex-col gap-32 border-t border-charcoal/10 pt-24">

          {/* How I build */}
          <section ref={(el) => { elementsRef.current[3] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-warm pt-2 border-t-2 border-warm/30 md:border-transparent md:pt-0">
              01 // {sections.systems.title}
            </h2>
            <div className="md:col-span-8 font-serif text-xl md:text-2xl leading-relaxed text-charcoal/80">
              {sections.systems.content}
            </div>
          </section>

          {/* What I optimize for */}
          <section ref={(el) => { elementsRef.current[4] = el; }} className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal/50 pt-2 border-t border-charcoal/10 md:border-transparent md:pt-0">
              02 // {sections.optimization.title}
            </h2>
            <div className="md:col-span-8 flex flex-col divide-y divide-charcoal/10">
              {sections.optimization.items?.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 py-8 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-warm/80">0{idx + 1}</span>
                    <h3 className="font-sans font-semibold tracking-wide text-charcoal">{item.label}</h3>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-charcoal/65 pl-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Decisions — dark block */}
          <section
            ref={(el) => { elementsRef.current[5] = el; }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-charcoal text-offwhite p-10 md:p-16 rounded-[2rem] shadow-2xl"
          >
            <h2 className="md:col-span-4 font-sans text-[10px] font-bold uppercase tracking-widest text-warm/70 pt-2 border-t border-warm/20 md:border-transparent md:pt-0">
              03 // {sections.decisions.title}
            </h2>
            <div className="md:col-span-8 flex flex-col gap-12">
              {sections.decisions.items?.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4 border-l-2 border-warm/40 pl-6">
                  <h3 className="font-serif text-2xl italic">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-offwhite/70">{item.desc}</p>
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
            &ldquo;{closureText}&rdquo;
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 bg-charcoal text-offwhite px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-warm hover:text-charcoal rounded-full active:scale-[0.98]"
            >
              {language === "en" ? "Start a conversation" : "Iniciar conversación"}
              <span className="h-1.5 w-1.5 rounded-full bg-warm group-hover:bg-charcoal animate-pulse transition-colors" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/dvillagrans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-charcoal/60 border border-charcoal/15 rounded-full hover:border-warm/50 hover:text-charcoal transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/dvillagrans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 font-sans text-xs font-semibold uppercase tracking-widest text-charcoal/60 border border-charcoal/15 rounded-full hover:border-warm/50 hover:text-charcoal transition-colors"
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
