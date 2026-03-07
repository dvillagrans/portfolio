"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Zap,
  Shield,
  Database,
  LayoutTemplate,
  Activity,
  AlertCircle,
  Quote,
  ArrowUp,
  FileStack,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#c9a227";
const ACCENT_MUTED = "#b8860b";
const BG = "#161410";
const CARD_BG = "rgba(26,22,16,0.6)";

export default function CovidPerfilesCaseStudy() {
  const { t, language } = useLanguage();
  const dict = t.covidPerfiles;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowScrollTop(scrolled > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".reveal-fade");
      elements.forEach((el: unknown) => {
        gsap.fromTo(
          el as HTMLElement,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el as HTMLElement, start: "top 85%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[9998] h-[2px] transition-none"
        style={{ width: `${scrollProgress}%`, backgroundColor: ACCENT }}
      />

      <Navbar />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed z-50 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ backgroundColor: `${ACCENT}15`, borderColor: `${ACCENT}40`, color: ACCENT }}
        aria-label="Back to top"
      >
        <ArrowUp size={16} aria-hidden />
      </button>

      <main
        ref={containerRef}
        className="min-h-screen pt-24 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pt-32 md:pb-[calc(8rem+env(safe-area-inset-bottom,0px))] text-zinc-300 selection:bg-amber-600/30 selection:text-white pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-12 lg:px-24"
        style={{ backgroundColor: BG }}
      >
        <div className="mb-12 reveal-fade">
          <Link
            href="/projects"
            className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 py-2 text-sm uppercase font-mono tracking-widest transition-colors hover:opacity-90 focus-visible:outline-none"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft size={16} aria-hidden /> {dict.back}
          </Link>
        </div>

        <header className="mb-12 reveal-fade max-w-5xl">
          <h1 className="mb-6 text-5xl font-semibold tracking-tight leading-none md:text-7xl font-serif text-white/95" style={{ color: "rgba(255,255,255,0.95)" }}>
            {language === "es" ? "Perfiles de riesgo " : "Risk profiles "}
            <span style={{ color: ACCENT }}>COVID-19</span>
          </h1>
          <p className="text-xl tracking-normal font-serif italic md:text-2xl mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
            {dict.subtitle}
          </p>
        </header>

        <section className="mb-16 grid grid-cols-1 gap-4 reveal-fade xl:grid-cols-3" aria-labelledby="tldr-heading">
          <h2 id="tldr-heading" className="sr-only">
            {language === "es" ? "Resumen" : "Summary"}
          </h2>
          <div className="rounded-2xl border p-6 transition-all duration-500" style={{ backgroundColor: `${ACCENT}08`, borderColor: "rgba(255,255,255,0.08)" }}>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
              <AlertCircle size={14} /> {dict.tldr.challenge.title}
            </h3>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {dict.tldr.challenge.text1}<span className="font-medium text-white">{dict.tldr.challenge.bold}</span>{dict.tldr.challenge.text2}
            </p>
          </div>
          <div className="rounded-2xl border p-6 transition-all duration-500" style={{ backgroundColor: `${ACCENT}06`, borderColor: "rgba(255,255,255,0.08)" }}>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT_MUTED }}>
              <Zap size={14} /> {dict.tldr.solution.title}
            </h3>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              {dict.tldr.solution.text1}<span className="font-medium text-white">{dict.tldr.solution.bold}</span>{dict.tldr.solution.text2}
              <span style={{ color: ACCENT }}>{dict.tldr.solution.cyan}</span>{dict.tldr.solution.text3}
            </p>
          </div>
          <div className="rounded-2xl border p-6 transition-all duration-500" style={{ backgroundColor: `${ACCENT}10`, borderColor: `${ACCENT}25` }}>
            <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white">
              <Activity size={14} /> {dict.tldr.impact.title}
            </h3>
            <p className="font-sans text-sm leading-relaxed text-white/90">
              <span className="font-medium text-white">{dict.tldr.impact.bold}</span> {dict.tldr.impact.text1}
            </p>
          </div>
        </section>

        <section className="mb-16 grid grid-cols-2 gap-6 border-y py-8 font-mono text-xs reveal-fade md:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {dict.meta.map((item: { label: string; value: string }, idx: number) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="relative flex items-center gap-2 uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} aria-hidden />
                {item.label}
              </span>
              <span className="text-white/90">{item.value}</span>
            </div>
          ))}
        </section>

        {/* Live dashboard link */}
        {"linkDashboard" in dict && dict.linkDashboard && (
          <section className="mb-24 flex flex-wrap gap-4 reveal-fade">
            <a
              href={dict.linkDashboard as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98] sm:justify-start"
              style={{ backgroundColor: `${ACCENT}20`, borderColor: `${ACCENT}50`, color: ACCENT }}
            >
              {dict.links.dashboard}
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
            </a>
          </section>
        )}

        <section className="mb-24 max-w-4xl px-4 text-center reveal-fade">
          <Quote className="mx-auto mb-8 h-12 w-12 md:h-16 md:w-16 opacity-30" style={{ color: ACCENT }} />
          <h2 className="mb-8 font-serif text-3xl leading-tight text-white/90 md:text-5xl lg:text-6xl">
            "{dict.quote.text}<span className="font-medium italic" style={{ color: ACCENT }}>{dict.quote.bold}</span>{dict.quote.text2}"
          </h2>
          <div className="mx-auto mb-6 h-1 w-12 rounded-full" style={{ backgroundColor: ACCENT }} />
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">{dict.quote.title}</p>
        </section>

        <section className="mb-32 reveal-fade">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
                {dict.constraints.title1}
              </h2>
              <p className="font-serif text-3xl leading-tight text-white/80 md:text-4xl">{dict.constraints.title2}</p>
            </div>
            <p className="font-mono text-xs text-white/40 md:max-w-[200px] border-l border-white/20 py-1 pl-4">
              {dict.constraints.desc}
            </p>
          </div>

          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-3xl border p-8 transition-all duration-500" style={{ backgroundColor: CARD_BG, borderColor: "rgba(255,255,255,0.06)" }}>
              <h3 className="relative z-10 mb-4 font-serif text-2xl text-white lg:text-3xl">{dict.constraints.c1.title}</h3>
              <p className="relative z-10 max-w-lg font-sans text-sm leading-relaxed text-white/60 lg:text-base">
                {dict.constraints.c1.text1}<span className="font-medium" style={{ color: ACCENT }}>{dict.constraints.c1.bold1}</span>{dict.constraints.c1.text2}
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl border p-8 transition-all duration-500" style={{ backgroundColor: CARD_BG, borderColor: "rgba(255,255,255,0.06)" }}>
              <h3 className="mb-4 flex items-center gap-3 font-serif text-xl text-white">
                <Clock size={24} style={{ color: ACCENT_MUTED }} /> {dict.constraints.c2.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">
                {dict.constraints.c2.text1}<span className="font-medium" style={{ color: ACCENT_MUTED }}>{dict.constraints.c2.bold1}</span>{dict.constraints.c2.text2}
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl border p-8 transition-all duration-500" style={{ backgroundColor: `${ACCENT}08`, borderColor: `${ACCENT}20` }}>
              <h3 className="mb-4 flex items-center gap-3 font-serif text-xl text-white">
                <Shield size={24} style={{ color: ACCENT }} /> {dict.constraints.c3.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">
                {dict.constraints.c3.text1}<span className="font-medium" style={{ color: ACCENT }}>{dict.constraints.c3.bold1}</span>{dict.constraints.c3.text2}
                <span className="ml-1 rounded bg-white/10 px-2 py-1 font-mono text-[10px]" style={{ color: ACCENT }}>{dict.constraints.c3.tag}</span>
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl border p-8 transition-all duration-500 md:col-span-2" style={{ backgroundColor: CARD_BG, borderColor: "rgba(255,255,255,0.06)" }}>
              <h3 className="mb-4 flex items-center gap-3 font-serif text-xl text-white md:text-2xl">
                <Zap size={24} style={{ color: ACCENT }} /> {dict.constraints.c4.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">
                {dict.constraints.c4.text1}<span className="font-medium text-white">{dict.constraints.c4.bold1}</span>{dict.constraints.c4.text2}
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-3xl border p-8 transition-all duration-500" style={{ backgroundColor: CARD_BG, borderColor: "rgba(255,255,255,0.06)" }}>
              <h3 className="mb-4 flex items-center gap-3 font-serif text-xl text-white">
                <FileStack size={24} style={{ color: ACCENT_MUTED }} /> {dict.constraints.c5.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-white/60">
                {dict.constraints.c5.text1}<span className="font-medium" style={{ color: ACCENT_MUTED }}>{dict.constraints.c5.bold1}</span>{dict.constraints.c5.text2}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32 reveal-fade">
          <div className="mb-10 text-center md:text-left">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
              {dict.pipeline.title1}
            </h2>
            <p className="font-serif text-3xl leading-tight text-white/80 md:text-4xl">{dict.pipeline.title2}</p>
          </div>
          <div className="overflow-x-auto rounded-3xl border p-6 md:p-10" style={{ backgroundColor: CARD_BG, borderColor: "rgba(255,255,255,0.08)" }}>
            <PipelineDiagram accent={ACCENT} />
          </div>
          <p className="mt-6 max-w-3xl font-sans text-sm leading-relaxed text-white/55">{dict.pipeline.desc}</p>
        </section>

        <section className="mb-32 reveal-fade">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
                {dict.architecture.title1}
              </h2>
              <p className="font-serif text-3xl leading-tight text-white/80 md:text-4xl">{dict.architecture.title2}</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {([1, 2, 3, 4] as const).map((i) => {
              const d = dict.architecture[`d${i}` as keyof typeof dict.architecture] as { nav: string; title: string; desc: string; bold: string; desc2: string; costTitle: string; costDesc: string };
              const icons = [LayoutTemplate, Database, Activity, FileStack];
              const Icon = icons[i - 1];
              return (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 md:flex-row"
                  style={{ backgroundColor: `${ACCENT}06`, borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex flex-col justify-between border-b p-8 md:w-1/3 md:border-b-0 md:border-r" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <div>
                      <span className="mb-3 block font-mono text-[10px] tracking-widest" style={{ color: ACCENT }}>{d.nav}</span>
                      <h3 className="mb-2 font-serif text-2xl text-white">{d.title}</h3>
                    </div>
                    <Icon className="mt-12 opacity-20" size={64} strokeWidth={1} style={{ color: ACCENT }} />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-6 p-8 md:p-12 md:w-2/3">
                    <p className="font-sans text-sm leading-relaxed text-white/70 lg:text-base">
                      {d.desc}<span className="text-white">{d.bold}</span>{d.desc2}
                    </p>
                    <div className="rounded-r-xl border-l-2 p-6" style={{ borderColor: ACCENT, backgroundColor: `${ACCENT}10` }}>
                      <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest" style={{ color: ACCENT }}>
                        <Activity size={12} /> {d.costTitle}
                      </h4>
                      <p className="font-sans text-sm opacity-90" style={{ color: ACCENT }}>{d.costDesc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-32 grid gap-12 reveal-fade md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: ACCENT_MUTED }}>
              {dict.lessons.title1}
            </h2>
            <p className="mb-6 font-serif text-3xl leading-tight text-white/80 md:text-4xl">{dict.lessons.title2}</p>
            <p className="font-sans text-sm leading-relaxed text-white/50">{dict.lessons.desc}</p>
          </div>
          <div className="md:col-span-7">
            <div className="flex flex-col gap-4">
              {([1, 2, 3] as const).map((i) => {
                const l = dict.lessons[`l${i}` as keyof typeof dict.lessons] as { title: string; desc: string; tag: string };
                return (
                  <div
                    key={i}
                    className="rounded-2xl border p-6 transition-colors md:p-8"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <h3 className="mb-3 flex items-center gap-3 font-serif text-xl text-white">
                      {l.title} <AlertCircle className="text-red-400/60 opacity-60" size={18} />
                    </h3>
                    <p className="mb-5 font-sans text-sm leading-relaxed text-white/50">{l.desc}</p>
                    <span
                      className="inline-block rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-widest"
                      style={{ color: ACCENT_MUTED, backgroundColor: `${ACCENT}15`, borderColor: `${ACCENT}30` }}
                    >
                      {l.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer
          className="flex flex-col items-center justify-between gap-4 border-t py-12 font-mono text-[10px] uppercase tracking-widest reveal-fade sm:flex-row"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
        >
          <span>{dict.footer.text}</span>
          <span className="rounded-full border px-4 py-2" style={{ borderColor: `${ACCENT}40`, color: `${ACCENT}99` }}>
            {dict.footer.status}
          </span>
        </footer>
      </main>
    </>
  );
}

function PipelineDiagram({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 800 320"
      className="mx-auto w-full max-w-3xl"
      aria-label="Pipeline: Fuentes, Pipeline analítico, Artefactos, Salidas"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke={accent} strokeWidth="1.5" opacity="0.9">
        <rect x="40" y="20" width="120" height="50" rx="6" fill="rgba(0,0,0,0.2)" />
        <text x="100" y="52" fill="rgba(255,255,255,0.9)" fontSize="11" textAnchor="middle" fontFamily="system-ui">Fuentes</text>
        <rect x="50" y="85" width="100" height="36" rx="4" fill="rgba(0,0,0,0.2)" />
        <text x="100" y="107" fill="rgba(255,255,255,0.85)" fontSize="10" textAnchor="middle" fontFamily="system-ui">Dataset SSA 30M+</text>

        <rect x="220" y="20" width="360" height="50" rx="6" fill="rgba(0,0,0,0.2)" />
        <text x="400" y="52" fill="rgba(255,255,255,0.9)" fontSize="11" textAnchor="middle" fontFamily="system-ui">Pipeline analítico</text>
        <g fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="system-ui">
          <rect x="240" y="85" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="282" y="103">00 Carga</text>
          <rect x="340" y="85" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="382" y="103">01 EDA</text>
          <rect x="440" y="85" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="482" y="103">02 Prep</text>
          <rect x="540" y="85" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="582" y="103">03 K-Means</text>
          <rect x="620" y="85" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="662" y="103">04 FCM</text>
          <rect x="700" y="85" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="742" y="103">05 Comp</text>
        </g>

        <rect x="240" y="160" width="120" height="50" rx="6" fill="rgba(0,0,0,0.2)" />
        <text x="300" y="192" fill="rgba(255,255,255,0.9)" fontSize="11" textAnchor="middle" fontFamily="system-ui">Artefactos</text>
        <rect x="250" y="225" width="100" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
        <text x="300" y="243" fill="rgba(255,255,255,0.8)" fontSize="9" textAnchor="middle" fontFamily="system-ui">.pkl, figuras/</text>

        <rect x="440" y="160" width="120" height="50" rx="6" fill="rgba(0,0,0,0.2)" />
        <text x="500" y="192" fill="rgba(255,255,255,0.9)" fontSize="11" textAnchor="middle" fontFamily="system-ui">Salidas</text>
        <g fontSize="9" fill="rgba(255,255,255,0.8)" textAnchor="middle" fontFamily="system-ui">
          <rect x="450" y="225" width="95" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="497" y="243">Reporte LaTeX</text>
          <rect x="455" y="258" width="85" height="28" rx="4" fill="rgba(0,0,0,0.2)" />
          <text x="497" y="276">Portfolio Next.js</text>
        </g>
      </g>
      <g stroke={accent} strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M100 70 L100 85" />
        <path d="M100 121 L100 140 L300 140 L300 160" />
        <path d="M170 85 L170 140 L240 140 L240 160" />
        <path d="M400 113 L400 140 L440 140 L440 160" />
        <path d="M500 210 L500 225" />
        <path d="M300 210 L300 240 L400 240 L400 225" />
      </g>
    </svg>
  );
}
