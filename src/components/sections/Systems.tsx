"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { accentAlpha } from "@/components/sections/Scene";
import { Brain, Database, BarChart3, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LayerMeta {
  icon: React.ReactNode;
  accent: string;
  accentSoft: string;
}

const LAYER_META: LayerMeta[] = [
  {
    icon: <Brain className="h-5 w-5" />,
    accent: "oklch(68% 0.18 285)",
    accentSoft: "oklch(68% 0.18 285 / 0.18)",
  },
  {
    icon: <Database className="h-5 w-5" />,
    accent: "oklch(70% 0.14 195)",
    accentSoft: "oklch(70% 0.14 195 / 0.18)",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    accent: "oklch(72% 0.15 60)",
    accentSoft: "oklch(72% 0.15 60 / 0.18)",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    accent: "oklch(65% 0.14 150)",
    accentSoft: "oklch(65% 0.14 150 / 0.18)",
  },
];

export default function Systems() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const labels = t.systems;
  const reduced = useReducedMotion();

  const [active, setActive] = useState<number | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: none), (max-width: 767px)");
    setIsCoarse(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
      if (reduced) {
        layers.forEach((l) => gsap.set(l, { opacity: 1, y: 0, z: 0 }));
        if (railRef.current) gsap.set(railRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        layers,
        { opacity: 0, y: -60, z: -80 },
        {
          opacity: 1,
          y: 0,
          z: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const items = labels.items;

  const computeLayerTransform = (idx: number) => {
    if (isCoarse || reduced) return undefined;
    if (active === null) return "translate3d(0, 0, 0)";
    if (active === idx) return "translate3d(0, -12px, 80px)";
    return "translate3d(0, 0, -24px)";
  };

  const computeLayerOpacity = (idx: number) => {
    if (active === null) return 1;
    if (active === idx) return 1;
    return 0.32;
  };

  const renderLayer = (cap: (typeof items)[number], idx: number) => {
    const meta = LAYER_META[idx % LAYER_META.length];
    const isActive = active === idx;
    const caseNumber = String(idx + 1).padStart(2, "0");

    return (
      <div
        key={cap.title}
        ref={(el) => {
          layerRefs.current[idx] = el;
        }}
        onMouseEnter={() => !isCoarse && setActive(idx)}
        onMouseLeave={() => !isCoarse && setActive(null)}
        onClick={() => isCoarse && setActive(isActive ? null : idx)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActive(isActive ? null : idx);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-label={cap.title}
        className="layer-panel group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-700 ease-out hover:border-white/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm/40 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        style={{
          transform: computeLayerTransform(idx),
          opacity: computeLayerOpacity(idx),
          transformStyle: "preserve-3d",
          boxShadow: isActive
            ? `0 24px 60px -20px ${meta.accentSoft}, 0 0 0 1px ${accentAlpha(meta.accent, 0.35)} inset`
            : "0 8px 24px -12px rgba(0,0,0,0.45)",
          willChange: "transform, opacity",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          aria-hidden="true"
          style={{
            background: `linear-gradient(135deg, ${meta.accentSoft} 0%, transparent 55%)`,
            opacity: isActive ? 1 : 0,
          }}
        />

        <div className="relative z-10 px-6 py-5 md:px-8 md:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-start gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500"
                style={{
                  background: isActive ? meta.accentSoft : "rgba(255,255,255,0.04)",
                  borderColor: isActive ? accentAlpha(meta.accent, 0.45) : "rgba(255,255,255,0.08)",
                  color: isActive ? meta.accent : "rgba(240,234,216,0.55)",
                }}
              >
                {meta.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/40">
                  {labels.labelCapability} {caseNumber}
                </div>
                <h3 className="font-serif text-xl tracking-tight text-offwhite md:text-2xl">
                  {cap.title}
                </h3>
                <p className="mt-1.5 font-sans text-sm leading-snug text-offwhite/55">
                  {cap.summary}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-offwhite/38">
                  <span className="text-offwhite/50">{labels.labelUsedIn}</span>{" "}
                  {cap.usedIn.join(" · ")}
                </p>
              </div>
            </div>

            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              className="mt-1 hidden shrink-0 transition-transform duration-500 md:block"
              style={{
                transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                color: isActive ? meta.accent : "rgba(240,234,216,0.28)",
              }}
              aria-hidden="true"
            >
              <path
                d="M8 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            className="overflow-hidden transition-all duration-700 ease-out"
            style={{
              maxHeight: isActive ? "240px" : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <div className="pt-5 md:pt-6">
              <div
                className="mb-4 h-px w-full"
                style={{ background: `linear-gradient(90deg, ${accentAlpha(meta.accent, 0.4)}, transparent)` }}
              />
              <p className="mb-4 max-w-2xl font-sans text-sm leading-relaxed text-offwhite/70 md:text-[15px]">
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md px-2 py-1 font-mono text-[8px] font-medium uppercase tracking-wider"
                    style={{
                      color: meta.accent,
                      background: meta.accentSoft,
                      border: `1px solid ${accentAlpha(meta.accent, 0.25)}`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="systems"
      className="relative overflow-hidden bg-charcoal py-20 text-offwhite md:py-28"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,234,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,234,216,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 50% 20%, black, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl lg:px-12">
        <header className="mb-12 md:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-offwhite/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/50">
              {labels.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-4xl tracking-tight text-offwhite md:text-5xl lg:text-6xl">
            {labels.title}
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm text-offwhite/55 md:text-base">
            {labels.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_72px] lg:gap-10">
          <div
            className="stack-stage"
            style={{
              perspective: isCoarse || reduced ? "none" : "1600px",
              perspectiveOrigin: "50% 28%",
            }}
          >
            <div ref={stackRef} className="flex flex-col gap-2.5" style={{ transformStyle: "preserve-3d" }}>
              {items.map((cap, idx) => renderLayer(cap, idx))}
            </div>
          </div>

          <div ref={railRef} className="hidden lg:flex flex-col items-center justify-between py-6" aria-hidden="true">
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-offwhite/28">
              {labels.railTop}
            </span>

            <div className="relative flex h-full flex-col items-center py-4">
              <div
                className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(240,234,216,0.14) 18%, rgba(240,234,216,0.14) 82%, transparent)",
                }}
              />
              {items.map((_, idx) => {
                const meta = LAYER_META[idx % LAYER_META.length];
                const isOn = active === idx;
                return (
                  <div key={idx} className="relative my-auto flex h-14 items-center justify-center">
                    <div
                      className="h-2.5 w-2.5 rounded-full transition-all duration-500"
                      style={{
                        background: isOn ? meta.accent : accentAlpha(meta.accent, 0.35),
                        boxShadow: isOn ? `0 0 14px ${accentAlpha(meta.accent, 0.65)}` : undefined,
                        animation: !reduced && isOn ? `pulse-dot 2s ease-in-out infinite` : undefined,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.28em] text-offwhite/28">
              {labels.railBottom}
            </span>
          </div>
        </div>

        <p className="mt-10 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/30">
          {isCoarse ? labels.hintTap : labels.hintHover}
        </p>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.45; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        .layer-panel {
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}
