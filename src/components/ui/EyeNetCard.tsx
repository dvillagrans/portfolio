"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import { EyeNetPipelineFlow } from "@/components/portfolio/viz/eyenetPipelineShared";

gsap.registerPlugin(ScrollTrigger);

const TAGS = ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"];

function OrbVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="pointer-events-none absolute top-4 right-4 hidden md:block md:top-6 md:right-8"
      aria-hidden="true"
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="oklch(40% 0.085 195)" strokeWidth="0.5" opacity="0.12" />
        <circle cx="36" cy="36" r="24" stroke="oklch(40% 0.085 195)" strokeWidth="0.5" opacity="0.2" />
        <circle cx="36" cy="36" r="14" stroke="oklch(70% 0.130 65)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="36" cy="36" r="3" fill="oklch(70% 0.130 65)" opacity="0.5" />
        {!reduced && (
          <>
            <circle cx="36" cy="36" r="34" stroke="oklch(40% 0.085 195)" strokeWidth="0.5" opacity="0">
              <animate attributeName="r" values="28;38;28" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0;0.2" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="36" cy="36" r="24" stroke="oklch(70% 0.130 65)" strokeWidth="0.5" opacity="0">
              <animate attributeName="r" values="16;28;16" dur="3s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

export default function EyeNetCard() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const isEn = language === "en";

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: cardRef.current, start: "top 80%", once: true },
        delay: 0.3,
      });

      tl.from(".eyenet-meta", { opacity: 0, y: -8, duration: 0.4, ease: "power2.out" });
      tl.from(".eyenet-title", { opacity: 0, y: 12, duration: 0.5, ease: "power3.out" }, "-=0.1");
      tl.from(".eyenet-metric", { opacity: 0, y: 10, stagger: 0.08, duration: 0.4, ease: "power2.out" }, "-=0.2");
      tl.from(".eyenet-flow", { opacity: 0, scale: 0.98, duration: 0.6, ease: "power2.out" }, "-=0.25");
      tl.from(".eyenet-footer", { opacity: 0, duration: 0.3, ease: "power2.out" }, "-=0.2");
    }, cardRef);

    return () => ctx.revert();
  }, [reduced]);

  const visibleTags = TAGS.slice(0, 7);
  const extraCount = TAGS.length - visibleTags.length;

  return (
    <article ref={cardRef} className="relative w-full eyenet-card">
      <div
        className="relative overflow-hidden rounded-2xl transition-all"
        style={{
          background: "#0d1117",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.4)",
            duration: 0.3,
            ease: "power2.out",
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)",
            duration: 0.4,
            ease: "power2.inOut",
          });
        }}
      >
        <header className="relative overflow-hidden p-6 pb-3 md:p-8 md:pb-4">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, #0d1117 0%, #0a0f14 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
            }}
          />
          <OrbVisual reduced={reduced} />

          <div className="relative z-10">
            <div
              className="eyenet-meta mb-6 flex items-center justify-between pl-3"
              style={{ borderLeft: "2px solid oklch(40% 0.085 195 / 0.25)" }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] tracking-widest text-white/30">SYS_000</span>
                <span className="text-white/15">·</span>
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {!reduced && (
                      <div className="absolute inset-0 h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400 opacity-75" />
                    )}
                  </div>
                  <span className="font-mono text-[11px] tracking-widest text-emerald-400">LIVE</span>
                </div>
              </div>
              <span className="hidden font-mono text-[11px] text-white/40 sm:block">
                {isEn ? "Apr 2025 – May 2026" : "Abr 2025 – May 2026"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:mb-5 md:grid-cols-[3fr_2fr]">
              <div className="eyenet-title">
                <h2
                  className="mb-2 font-sans font-black leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(56px, 6vw, 80px)", textShadow: "0 0 40px rgba(96,165,250,0.15)" }}
                >
                  EyeNet
                </h2>
                <p className="font-sans text-[14px] text-[#888]">AI &amp; Automation Platform</p>
                <p className="mt-3 font-sans text-[13px] leading-relaxed text-[#aaa]">
                  {isEn
                    ? "Document flow automation with LLMs and autonomous agents on a private GPU cluster."
                    : "Automatización de flujos documentales con LLMs y agentes autónomos en cluster GPU privado."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-5 self-center">
                {[
                  { value: "65%", label: isEn ? "Less Manual Work" : "Menos Trabajo Manual", border: false },
                  { value: "300+", label: isEn ? "Docs / Week" : "Docs / Semana", border: true },
                  { value: "10K+", label: isEn ? "Daily Requests" : "Requests Diarios", border: false },
                  { value: "92%", label: isEn ? "NER Accuracy" : "Precisión NER", border: true },
                ].map((m) => (
                  <div
                    key={m.label}
                    className={`eyenet-metric ${m.border ? "border-l border-[#222] pl-4" : ""}`}
                  >
                    <span className="font-mono text-[28px] font-bold tabular-nums leading-none text-white">
                      {m.value}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#666]">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div
          className="eyenet-flow border-t border-white/[0.08] px-6 pb-6 md:px-8 md:pb-8"
        >
          <EyeNetPipelineFlow isEn={isEn} showLegend framed />
        </div>

        <footer className="eyenet-footer flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] px-6 py-4 md:px-8">
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-white/30"
              >
                {tag}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-sm border border-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-white/20">
                +{extraCount}
              </span>
            )}
          </div>
          <Link
            href="/projects/eyenet"
            className="group flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/50 transition-colors duration-200 hover:text-white"
          >
            <span>{isEn ? "VIEW SYSTEM" : "VER SISTEMA"}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
