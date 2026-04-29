"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import PipelineFlow from "@/components/ui/PipelineFlow";
import {
  ArrowLeft,
  ArrowUp,
  AlertCircle,
  Zap,
  Shield,
  Database,
  LayoutTemplate,
  Activity,
  Quote,
  Globe,
  Server,
  Cpu,
  Radio,
  Lock,
  Brain,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated metric count-up ─── */
function MetricValue({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : null;
    const suffix = match ? match[2] : "";
    if (target === null) {
      ref.current.textContent = value;
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          delay: delay * 0.15,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
    return () => trigger.kill();
  }, [value, delay, reduced]);

  return (
    <div className="flex flex-col items-center md:items-start gap-1.5">
      <span ref={ref} className="text-3xl md:text-4xl font-bold tracking-tighter text-white font-sans tabular-nums">
        {reduced ? value : "0"}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 leading-tight text-center md:text-left">
        {label}
      </span>
    </div>
  );
}

export default function EyeNetCaseStudy() {
  const { t, language } = useLanguage();
  const dict = (t as any).eyenet;
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
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
      if (reduced) {
        elements.forEach((el: any) => gsap.set(el, { y: 0, opacity: 1 }));
        return;
      }
      elements.forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  if (!dict) return null;
  const isEn = language === "en";

  return (
    <>
      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 z-[9998] h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 transition-none"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 backdrop-blur-sm hover:bg-amber-500/20 active:scale-95 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={16} />
      </button>

      <main
        ref={containerRef}
        className="min-h-screen pt-24 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pt-32 md:pb-[calc(8rem+env(safe-area-inset-bottom,0px))] px-5 md:px-12 lg:px-24 text-zinc-300 bg-[#0d0d0d] selection:bg-amber-500/30 selection:text-white"
      >
        {/* Navigation */}
        <div className="mb-12 reveal-fade">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-amber-400 transition-colors uppercase font-mono tracking-widest"
          >
            <ArrowLeft size={16} /> {dict.back}
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 reveal-fade max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              SYS_000
            </span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Radio size={10} className="text-red-400" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-400 font-bold animate-pulse">
                LIVE
              </span>
            </span>
          </div>
          <h1
            className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none text-white"
            style={{ viewTransitionName: "page-title" }}
          >
            EyeNet
            <span className="text-white/30 font-light text-2xl md:text-3xl ml-3 align-top">—</span>
            <span className="text-white/40 font-light text-2xl md:text-3xl ml-1">AI &amp; Automation</span>
          </h1>
          <p className="text-xl md:text-3xl text-white/70 tracking-normal font-serif italic mb-6">
            {dict.subtitle}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-bold tracking-tight">
              {isEn ? "Apr 2025 – May 2026" : "Abr 2025 – May 2026"}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-[10px] font-bold tracking-tight">
              {isEn ? "Remote" : "Remoto"}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-amber-500/20 text-amber-400/60 text-[10px] font-bold tracking-tight flex items-center gap-1.5">
              <Lock size={10} />
              {isEn ? "Partial NDA" : "NDA Parcial"}
            </span>
          </div>
        </header>

        {/* Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade">
          <MetricValue value="65%" label={isEn ? "Less Manual Work" : "Menos Trabajo Manual"} delay={0} />
          <MetricValue value="300+" label={isEn ? "Docs / Week" : "Docs / Semana"} delay={1} />
          <MetricValue value="10K+" label={isEn ? "Daily Requests" : "Requests Diarios"} delay={2} />
          <MetricValue value="92%" label={isEn ? "Extraction Accuracy" : "Precisión Extracción"} delay={3} />
        </section>

        {/* TL;DR Cards */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-16 reveal-fade" aria-labelledby="tldr-heading">
          <h2 id="tldr-heading" className="sr-only">{isEn ? "Summary" : "Resumen"}</h2>
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-500">
            <h3 className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <AlertCircle size={14} /> {dict.tldr.challenge.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              {dict.tldr.challenge.text1}
              <span className="text-white font-medium">{dict.tldr.challenge.bold}</span>
              {dict.tldr.challenge.text2}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl hover:border-amber-400/30 transition-all duration-500">
            <h3 className="text-amber-300 font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap size={14} /> {dict.tldr.solution.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              {dict.tldr.solution.text1}
              <span className="text-white font-medium">{dict.tldr.solution.bold}</span>
              {dict.tldr.solution.text2}
              <span className="text-amber-300">{dict.tldr.solution.cyan}</span>
              {dict.tldr.solution.text3}
            </p>
          </div>
          <div className="bg-amber-500/[0.04] border border-amber-500/20 p-6 rounded-2xl hover:border-amber-500/40 transition-all duration-500">
            <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <Activity size={14} /> {dict.tldr.impact.title}
            </h3>
            <p className="text-sm text-white/90 leading-relaxed font-sans">
              <span className="text-white font-medium">{dict.tldr.impact.bold}</span>
              {dict.tldr.impact.text1}
            </p>
          </div>
        </section>

        {/* Meta Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-y border-white/10 py-8 reveal-fade font-mono text-xs">
          {dict.meta.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-white/40 uppercase relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-amber-500 before:rounded-full">
                {item.label}
              </span>
              <span className="text-white/90">{item.value}</span>
            </div>
          ))}
        </section>

        {/* Pull Quote */}
        <section className="mb-32 reveal-fade max-w-4xl mx-auto text-center px-4">
          <Quote className="text-amber-500/20 w-12 h-12 md:w-16 md:h-16 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-tight mb-8">
            &ldquo;{dict.quote.text}
            <span className="text-amber-400 italic font-medium">{dict.quote.bold}</span>
            {dict.quote.text2}&rdquo;
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mb-6 rounded-full" />
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">{dict.quote.title}</p>
        </section>

        {/* Challenge Cards */}
        <section className="mb-32 reveal-fade">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-sm text-amber-500 font-mono tracking-widest uppercase mb-3">
                {dict.constraints.title1}
              </h2>
              <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.constraints.title2}</p>
            </div>
            <p className="font-mono text-xs text-white/40 md:max-w-[200px] border-l border-white/20 pl-4 py-1">
              {dict.constraints.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Database size={24} />, data: dict.constraints.c1, color: "amber" },
              { icon: <Server size={24} />, data: dict.constraints.c2, color: "yellow" },
              { icon: <Brain size={24} />, data: dict.constraints.c3, color: "orange" },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white/[0.015] border border-white/[0.06] p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/20 transition-all duration-500 hover:bg-white/[0.03]"
              >
                <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                  <span className="text-amber-500/60">{card.icon}</span>
                  {card.data.title}
                </h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm mb-5">
                  {card.data.text1}
                  <span className="text-white font-medium">{card.data.bold1}</span>
                  {card.data.text2}
                </p>
                <span className="text-[10px] font-mono tracking-widest text-amber-500/60 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full inline-block">
                  {card.data.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Systems — React Flow */}
        <section className="mb-32 reveal-fade">
          <div className="mb-10">
            <h2 className="text-sm text-amber-500 font-mono tracking-widest uppercase mb-3">
              {dict.systems.title1}
            </h2>
            <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight mb-4">
              {dict.systems.title2}
            </p>
            <p className="font-mono text-xs text-white/40 max-w-2xl leading-relaxed">
              {dict.systems.desc}
            </p>
          </div>
          <PipelineFlow lang={language as "en" | "es"} />
        </section>

        {/* Architecture Decisions */}
        <section className="mb-32 reveal-fade">
          <div className="mb-12">
            <h2 className="text-sm text-amber-500 font-mono tracking-widest uppercase mb-3">
              {dict.architecture.title1}
            </h2>
            <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">
              {dict.architecture.title2}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {[dict.architecture.d1, dict.architecture.d2, dict.architecture.d3, dict.architecture.d4].map(
              (d: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/[0.015] border border-white/[0.06] rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-amber-500/15 transition-all duration-500"
                >
                  <div className="p-8 md:w-1/3 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/[0.05] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-amber-500/60 mb-3 block">
                        {d.nav}
                      </span>
                      <h3 className="text-2xl font-serif text-white mb-2">{d.title}</h3>
                    </div>
                    <LayoutTemplate
                      className="text-white/10 mt-12 group-hover:text-amber-500/15 transition-colors"
                      size={64}
                      strokeWidth={1}
                    />
                  </div>
                  <div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center">
                    <p className="text-white/60 leading-relaxed font-sans text-sm lg:text-base">
                      {d.desc}
                      <span className="text-white font-medium">{d.bold}</span>
                      {d.desc2}
                    </p>
                    <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500 rounded-r-xl p-6">
                      <h4 className="text-amber-500 uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2">
                        <Activity size={12} /> {d.costTitle}
                      </h4>
                      <p className="text-sm text-amber-400/70 font-sans">{d.costDesc}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Stack */}
        <section className="mb-32 reveal-fade">
          <div className="mb-10">
            <h2 className="text-sm text-amber-500 font-mono tracking-widest uppercase mb-3">
              {dict.stack.title1}
            </h2>
            <p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.stack.title2}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {dict.stack.layers.map((layer: any, idx: number) => (
              <div
                key={idx}
                className="bg-white/[0.015] border border-white/[0.06] rounded-2xl p-6 hover:border-amber-500/15 transition-all duration-500"
              >
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                  {layer.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item: string) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[10px] font-bold text-white/40 tracking-wider"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {dict.stack.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[10px] font-bold text-white/30 tracking-wider uppercase hover:border-amber-500/20 hover:text-amber-400/50 transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* What Went Wrong */}
        <section className="mb-32 grid md:grid-cols-12 gap-12 md:gap-20 reveal-fade">
          <div className="md:col-span-5">
            <h2 className="text-sm text-amber-400 font-mono tracking-widest uppercase mb-3">
              {dict.lessons.title1}
            </h2>
            <p className="text-3xl md:text-4xl font-serif text-white/80 mb-6 leading-tight">
              {dict.lessons.title2}
            </p>
            <p className="text-sm font-sans text-white/50 leading-relaxed">{dict.lessons.desc}</p>
          </div>
          <div className="md:col-span-7">
            <div className="flex flex-col gap-4">
              {[dict.lessons.l1, dict.lessons.l2, dict.lessons.l3].map((l: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white/[0.015] hover:bg-white/[0.03] border border-white/[0.05] transition-colors p-6 md:p-8 rounded-2xl group"
                >
                  <h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">
                    {l.title}
                    <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18} />
                  </h3>
                  <p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{l.desc}</p>
                  <span className="text-[10px] font-mono tracking-widest text-amber-500/60 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full inline-block">
                    {l.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-12 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 font-mono tracking-widest uppercase border-t border-white/10 reveal-fade">
          <span className="mb-4 sm:mb-0">{dict.footer.text}</span>
          <div className="flex items-center gap-3">
            <Lock size={12} className="text-white/20" />
            <span className="text-amber-500/50 border border-amber-500/20 px-4 py-2 rounded-full">
              {dict.footer.status}
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
