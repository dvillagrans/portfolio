"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Brain, Database, BarChart3, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LayerMeta {
  icon: React.ReactNode;
  accent: string;
  accentSoft: string;
}

const LAYER_META: LayerMeta[] = [
  {
    icon: <Brain className="h-6 w-6" />,
    accent: "oklch(68% 0.18 285)",
    accentSoft: "oklch(68% 0.18 285 / 0.18)",
  },
  {
    icon: <Database className="h-6 w-6" />,
    accent: "oklch(70% 0.14 195)",
    accentSoft: "oklch(70% 0.14 195 / 0.18)",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    accent: "oklch(72% 0.15 60)",
    accentSoft: "oklch(72% 0.15 60 / 0.18)",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    accent: "oklch(65% 0.14 150)",
    accentSoft: "oklch(65% 0.14 150 / 0.18)",
  },
];

export default function Systems() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
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
        { opacity: 0, y: -80, z: -120 },
        {
          opacity: 1,
          y: 0,
          z: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stackRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
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

  const items = t.systems.items;

  const computeLayerTransform = (idx: number) => {
    if (isCoarse || reduced) return undefined;
    if (active === null) {
      return "translate3d(0, 0, 0)";
    }
    if (active === idx) {
      return "translate3d(0, -16px, 100px)";
    }
    return "translate3d(0, 0, -30px)";
  };

  const computeLayerOpacity = (idx: number) => {
    if (active === null) return 1;
    if (active === idx) return 1;
    return 0.28;
  };

  const renderLayer = (cap: typeof items[number], idx: number) => {
    const meta = LAYER_META[idx % LAYER_META.length];
    const isActive = active === idx;

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
        className="layer-panel group relative cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md transition-all duration-700 ease-out hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        style={{
          transform: computeLayerTransform(idx),
          opacity: computeLayerOpacity(idx),
          transformStyle: "preserve-3d",
          boxShadow: isActive
            ? `0 30px 80px -20px ${meta.accentSoft}, 0 0 0 1px ${meta.accent}40 inset`
            : "0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
          willChange: "transform, opacity",
        }}
      >
        {/* Accent edge glow on active */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          aria-hidden="true"
          style={{
            background: `linear-gradient(135deg, ${meta.accentSoft} 0%, transparent 50%)`,
            opacity: isActive ? 1 : 0,
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute left-6 right-6 top-0 h-[2px] rounded-full transition-all duration-500"
          aria-hidden="true"
          style={{
            background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
            opacity: isActive ? 1 : 0.4,
            transform: isActive ? "scaleX(1)" : "scaleX(0.5)",
          }}
        />

        {/* Compact / collapsed view (always visible) */}
        <div className="relative z-10 flex items-center justify-between gap-6 px-6 py-5 md:px-8 md:py-7">
          <div className="flex min-w-0 items-center gap-5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-500"
              style={{
                background: isActive ? meta.accentSoft : "rgba(255,255,255,0.03)",
                borderColor: isActive ? `${meta.accent}50` : "rgba(255,255,255,0.08)",
                color: isActive ? meta.accent : "rgba(240,234,216,0.55)",
              }}
            >
              {meta.icon}
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-3">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] transition-colors duration-300"
                  style={{ color: isActive ? meta.accent : "rgba(240,234,216,0.4)" }}
                >
                  SYS_0{idx + 1}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                  style={{
                    background: meta.accent,
                    boxShadow: isActive ? `0 0 12px ${meta.accent}` : `0 0 4px ${meta.accent}80`,
                  }}
                />
              </div>
              <h3
                className="font-serif text-2xl tracking-tight text-offwhite md:text-3xl"
                style={{ color: isActive ? "#fff" : "rgba(240,234,216,0.92)" }}
              >
                {cap.title}
              </h3>
            </div>
          </div>

          {/* Right-side indicator + chevron */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex flex-col items-end gap-1">
              <span
                className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-300"
                style={{ color: isActive ? meta.accent : "rgba(240,234,216,0.35)" }}
              >
                {isActive
                  ? language === "en"
                    ? "Layer Online"
                    : "Capa Activa"
                  : language === "en"
                  ? "Idle"
                  : "En Reposo"}
              </span>
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-[3px] w-[3px] rounded-full transition-all duration-300"
                    style={{
                      background: meta.accent,
                      opacity: isActive ? 1 : 0.35,
                      animation: isActive
                        ? `pulse-dot 1.4s ease-in-out ${i * 0.18}s infinite`
                        : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="transition-all duration-500"
              style={{
                transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                color: isActive ? meta.accent : "rgba(240,234,216,0.3)",
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
        </div>

        {/* Expanded view (revealed on active) */}
        <div
          className="overflow-hidden transition-all duration-700 ease-out"
          style={{
            maxHeight: isActive ? "320px" : "0px",
            opacity: isActive ? 1 : 0,
          }}
        >
          <div className="px-6 pb-7 md:px-8 md:pb-9">
            <div
              className="mb-5 h-[1px] w-full"
              style={{
                background: `linear-gradient(90deg, ${meta.accent}40, transparent)`,
              }}
            />
            <p className="mb-6 max-w-2xl font-sans text-base leading-relaxed text-offwhite/75 md:text-lg">
              {cap.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {cap.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-all"
                  style={{
                    color: meta.accent,
                    borderColor: `${meta.accent}30`,
                    background: meta.accentSoft,
                  }}
                >
                  {tag}
                </span>
              ))}
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
      className="relative overflow-hidden bg-charcoal py-24 text-offwhite md:py-32"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      {/* Ambient grid + gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,234,216,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,234,216,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[1px] w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-offwhite/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl md:px-6 lg:px-12">
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-warm opacity-60" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/70">
              03. {t.systems.title}
            </span>
          </div>
          <h2 className="mb-6 font-serif text-5xl tracking-tight text-offwhite lg:text-7xl">
            {language === "es" ? (
              <>
                Arquitectura{" "}
                <span className="font-light italic text-offwhite/50">&</span> Escala
              </>
            ) : (
              <>
                Architecture{" "}
                <span className="font-light italic text-offwhite/50">&</span> Scale
              </>
            )}
          </h2>
          <p className="max-w-xl font-sans text-sm text-offwhite/55 md:text-base">
            {language === "es"
              ? "Cuatro capas que se apoyan unas en otras. Pasá el cursor por encima para inspeccionar cada una."
              : "Four layers that stack on top of each other. Hover any to inspect it."}
          </p>
        </header>

        {/* Stack + flow rail */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_88px] lg:gap-12">
          {/* The 3D stack */}
          <div
            className="stack-stage"
            style={{
              perspective: isCoarse || reduced ? "none" : "1800px",
              perspectiveOrigin: "50% 30%",
            }}
          >
            <div
              ref={stackRef}
              className="flex flex-col gap-3"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {items.map((cap, idx) => renderLayer(cap, idx))}
            </div>
          </div>

          {/* Flow rail */}
          <div
            ref={railRef}
            className="hidden lg:flex flex-col items-center justify-between py-8"
            aria-hidden="true"
          >
            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-offwhite/30">
              {language === "es" ? "FLUJO" : "FLOW"}
            </span>

            <div className="relative flex h-full flex-col items-center py-4">
              {/* Vertical line */}
              <div
                className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(240,234,216,0.18) 15%, rgba(240,234,216,0.18) 85%, transparent)",
                }}
              />
              {/* Pulsing dots per layer */}
              {items.map((_, idx) => {
                const meta = LAYER_META[idx % LAYER_META.length];
                const isOn = active === idx;
                return (
                  <div
                    key={idx}
                    className="relative my-auto flex h-16 items-center justify-center"
                  >
                    <div
                      className="absolute h-3 w-3 rounded-full transition-all duration-500"
                      style={{
                        background: isOn ? meta.accent : `${meta.accent}40`,
                        boxShadow: isOn
                          ? `0 0 16px ${meta.accent}, 0 0 32px ${meta.accent}80`
                          : `0 0 6px ${meta.accent}40`,
                        animation: !reduced
                          ? `pulse-dot 2s ease-in-out ${idx * 0.4}s infinite`
                          : undefined,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <span className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-offwhite/30">
              {language === "es" ? "BASE" : "BASE"}
            </span>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-12 flex items-center gap-3 text-offwhite/35">
          <div className="h-[1px] w-8 bg-offwhite/20" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
            {language === "es"
              ? isCoarse
                ? "TOCAR PARA INSPECCIONAR"
                : "HOVER · INSPECT · CLICK"
              : isCoarse
              ? "TAP TO INSPECT"
              : "HOVER · INSPECT · CLICK"}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .layer-panel {
          transform-origin: center center;
        }
      `}</style>
    </section>
  );
}
