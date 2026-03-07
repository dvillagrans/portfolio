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

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [scrollPct, setScrollPct] = useState(0);
  const { language, t } = useLanguage();

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollPct(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const about = (t as any).about;
  if (!about) return null;

  const stats = language === "es"
    ? [
        { value: "3+", label: "Años construyendo" },
        { value: "10k+", label: "Usuarios alcanzados" },
        { value: "10 sem", label: "MVP TimeUp" },
      ]
    : [
        { value: "3+", label: "Years building" },
        { value: "10k+", label: "Users reached" },
        { value: "10 wks", label: "TimeUp MVP" },
      ];

  return (
    <main className="min-h-screen w-full bg-offwhite text-charcoal font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite">

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 z-[100] h-[2px] w-full bg-charcoal/5">
        <div
          className="h-full bg-accent transition-[width] duration-75 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <Navbar theme="light" />
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 md:px-12 md:py-32" ref={containerRef}>

        {/* Header / Nav */}
        <header className="mb-24 mt-20 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "Return" : "Volver"}
          </Link>

          {/* Live status badge */}
          <div className="flex items-center gap-2 border border-charcoal/10 rounded-full px-4 py-2 bg-white shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
              Eyenet · {language === "en" ? "Open to work" : "Disponible"}
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
                {about.title}
              </h1>
              <p
                ref={(el) => { elementsRef.current[1] = el; }}
                className="font-mono text-sm uppercase tracking-widest text-gray-500"
              >
                {about.subtitle}
              </p>
            </div>
            <div
              ref={(el) => { elementsRef.current[7] = el; }}
              className="shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-charcoal/10 shadow-md self-start"
            >
              <Image
                src="/img/optimized/me-128.webp"
                alt="Diego Villagran"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            ref={(el) => { elementsRef.current[2] = el; }}
            className="text-2xl md:text-3xl leading-relaxed md:leading-[1.5] text-charcoal font-medium text-balance"
          >
            {about.intro}
          </div>

          {/* Stats strip */}
          <div
            ref={(el) => { elementsRef.current[8] = el; }}
            className="mt-16 grid grid-cols-3 divide-x divide-charcoal/10 border border-charcoal/10 rounded-2xl overflow-hidden"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-white px-6 py-6 flex flex-col gap-1">
                <span className="font-serif text-3xl md:text-4xl italic text-charcoal">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Body Sections */}
        <div className="flex flex-col gap-32 border-t border-charcoal/10 pt-24">

          {/* How I build */}
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
            <div className="md:col-span-8 flex flex-col divide-y divide-charcoal/10">
              {about.sections.optimization.items.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-2 py-8 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-accent/80">0{idx + 1}</span>
                    <h3 className="font-sans font-semibold tracking-wide text-charcoal">{item.label}</h3>
                  </div>
                  <p className="font-mono text-sm leading-relaxed text-gray-600 pl-7">{item.desc}</p>
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
            &ldquo;{about.closure}&rdquo;
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-charcoal text-offwhite px-8 py-4 font-mono text-xs uppercase tracking-widest transition-transform hover:scale-105 rounded-full"
            >
              {language === "en" ? "Start a conversation" : "Iniciar conversación"}
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/dvillagrans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 font-mono text-xs uppercase tracking-widest text-gray-500 border border-charcoal/15 rounded-full hover:border-charcoal/40 hover:text-charcoal transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/dvillagrans"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-4 font-mono text-xs uppercase tracking-widest text-gray-500 border border-charcoal/15 rounded-full hover:border-charcoal/40 hover:text-charcoal transition-colors"
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
