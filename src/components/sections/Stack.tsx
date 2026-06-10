"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ProjectItem } from "@/i18n/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BandConfig {
  name: string;
  accent: string;
  accentSoft: string;
  tools: string[];
  direction: "ltr" | "rtl";
  speed: number;
}

const CATEGORY_SETS = {
  dataScience: [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "LLaMA / Mistral",
    "OpenAI API",
    "Gemini",
  ],
  infrastructure: [
    "PySpark",
    "SQL",
    "PostgreSQL",
    "Redis",
    "n8n",
    "Docker",
    "Kubernetes",
    "Azure",
    "AWS",
    "Google Cloud",
  ],
  platform: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Streamlit"],
  core: ["Power BI", "Grafana", "Git", "GitHub"],
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s\/.-]+/g, "")
    .replace(/(api|css|js)$/, "");
}

export default function Stack() {
  const container = useRef<HTMLElement>(null);
  const bandsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const [activeTool, setActiveTool] = useState<{ bandIdx: number; tool: string } | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px), (hover: none)");
    setIsCoarse(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const tools = t.stack.tools;

  const inSet = (tool: string, set: string[]) =>
    set.some((s) => s.toLowerCase() === tool.toLowerCase());

  const bands: BandConfig[] = useMemo(() => {
    return [
      {
        name: language === "es" ? "Ciencia de Datos & IA" : "Data Science & AI",
        accent: "oklch(72% 0.16 285)",
        accentSoft: "oklch(72% 0.16 285 / 0.18)",
        tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.dataScience)),
        direction: "rtl" as const,
        speed: 60,
      },
      {
        name: language === "es" ? "Infraestructura & Nube" : "Infrastructure & Cloud",
        accent: "oklch(72% 0.13 195)",
        accentSoft: "oklch(72% 0.13 195 / 0.18)",
        tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.infrastructure)),
        direction: "ltr" as const,
        speed: 72,
      },
      {
        name: language === "es" ? "Plataforma & Producto" : "Platform & Product",
        accent: "oklch(68% 0.14 150)",
        accentSoft: "oklch(68% 0.14 150 / 0.18)",
        tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.platform)),
        direction: "rtl" as const,
        speed: 52,
      },
      {
        name: language === "es" ? "Herramientas Base" : "Core Tooling",
        accent: "oklch(74% 0.15 65)",
        accentSoft: "oklch(74% 0.15 65 / 0.18)",
        tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.core)),
        direction: "ltr" as const,
        speed: 64,
      },
    ].filter((b) => b.tools.length > 0);
  }, [tools, language]);

  /* ─── Build tool → projects map from project tags ─── */
  const toolUsage = useMemo(() => {
    const map = new Map<string, ProjectItem[]>();
    t.work.projects.forEach((project) => {
      project.tags?.forEach((tag) => {
        const key = normalize(tag);
        if (!key) return;
        if (!map.has(key)) map.set(key, []);
        const list = map.get(key)!;
        if (!list.some((p) => p.id === project.id)) list.push(project);
      });
    });
    return map;
  }, [t.work.projects]);

  const getProjectsForTool = (tool: string): ProjectItem[] => {
    return toolUsage.get(normalize(tool)) ?? [];
  };

  /* ─── Marquee animation per band ─── */
  useGSAP(
    () => {
      tweensRef.current.forEach((tw) => tw?.kill());
      tweensRef.current = [];

      if (reduced || isCoarse) return;

      bandsRef.current.forEach((band, idx) => {
        if (!band) return;
        const config = bands[idx];
        if (!config) return;
        const inner = band.querySelector<HTMLDivElement>(".band-inner");
        if (!inner) return;

        const fromX = config.direction === "rtl" ? "0%" : "-50%";
        const toX = config.direction === "rtl" ? "-50%" : "0%";

        gsap.set(inner, { x: fromX });
        const tween = gsap.to(inner, {
          x: toX,
          duration: config.speed,
          ease: "none",
          repeat: -1,
        });
        tweensRef.current[idx] = tween;
      });
    },
    { scope: container, dependencies: [bands, reduced, isCoarse], revertOnUpdate: true }
  );

  const handleToolActivate = (bandIdx: number, tool: string) => {
    setActiveTool({ bandIdx, tool });
    tweensRef.current[bandIdx]?.pause();
  };

  const handleToolDeactivate = (bandIdx: number) => {
    setActiveTool(null);
    tweensRef.current[bandIdx]?.resume();
  };

  const handleToolToggle = (bandIdx: number, tool: string) => {
    if (activeTool?.bandIdx === bandIdx && activeTool?.tool === tool) {
      handleToolDeactivate(bandIdx);
    } else {
      if (activeTool && activeTool.bandIdx !== bandIdx) {
        tweensRef.current[activeTool.bandIdx]?.resume();
      }
      handleToolActivate(bandIdx, tool);
    }
  };

  /* ─── Detail panel data ─── */
  const activeProjects = activeTool ? getProjectsForTool(activeTool.tool) : [];
  const activeBand = activeTool ? bands[activeTool.bandIdx] : null;

  return (
    <section
      ref={container}
      id="stack"
      className="relative overflow-hidden border-t border-b border-offwhite/5 bg-charcoal py-24 text-offwhite md:py-32"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      {/* Subtle scan-line texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(240,234,216,0.4) 3px, rgba(240,234,216,0.4) 4px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl md:px-12 lg:px-16">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-warm/60" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-offwhite/70">
              05. {t.stack.title}
            </span>
          </div>
          <h2 className="font-serif text-5xl tracking-tight text-offwhite md:text-6xl lg:text-7xl">
            {language === "es" ? (
              <>
                El sistema{" "}
                <span className="italic text-offwhite/50">en vivo</span>
              </>
            ) : (
              <>
                The stack{" "}
                <span className="italic text-offwhite/50">in motion</span>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-xl font-sans text-sm text-offwhite/55 md:text-base">
            {language === "es"
              ? isCoarse
                ? "Tocá una herramienta para ver en qué proyectos del portfolio se usa."
                : "Pasá el cursor sobre cualquier herramienta para ver en qué proyectos del portfolio se usa."
              : isCoarse
              ? "Tap any tool to see which portfolio projects use it."
              : "Hover any tool to see which portfolio projects use it."}
          </p>
        </header>

        {/* Bands */}
        <div className="space-y-8 md:space-y-10">
          {bands.map((config, bandIdx) => {
            const showStatic = reduced || isCoarse;
            const isFocusedBand = activeTool?.bandIdx === bandIdx;

            return (
              <div key={config.name} className="relative">
                {/* Band label */}
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="block h-1.5 w-1.5 rounded-full transition-all duration-500"
                    style={{
                      background: config.accent,
                      boxShadow: isFocusedBand ? `0 0 12px ${config.accent}` : "none",
                    }}
                  />
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] transition-colors duration-500"
                    style={{ color: isFocusedBand ? config.accent : "rgba(240,234,216,0.4)" }}
                  >
                    {config.name}
                  </span>
                  <div
                    className="ml-auto h-[1px] flex-1 transition-all duration-500"
                    style={{
                      background: isFocusedBand
                        ? `linear-gradient(90deg, ${config.accent}50, transparent)`
                        : "rgba(240,234,216,0.06)",
                    }}
                  />
                </div>

                {/* Band */}
                <div
                  className="relative overflow-hidden py-1"
                  style={{
                    maskImage:
                      "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, transparent, black 5%, black 95%, transparent)",
                  }}
                >
                  {showStatic ? (
                    <div className="flex flex-wrap gap-2">
                      {config.tools.map((tool) => {
                        const isActive =
                          activeTool?.bandIdx === bandIdx && activeTool?.tool === tool;
                        return (
                          <ToolPill
                            key={tool}
                            tool={tool}
                            accent={config.accent}
                            accentSoft={config.accentSoft}
                            isActive={isActive}
                            isDimmed={isFocusedBand && !isActive}
                            onClick={() => handleToolToggle(bandIdx, tool)}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      ref={(el) => {
                        bandsRef.current[bandIdx] = el;
                      }}
                      className="relative"
                    >
                      <div className="band-inner flex w-max gap-3 will-change-transform">
                        {[...config.tools, ...config.tools].map((tool, i) => {
                          const isActive =
                            activeTool?.bandIdx === bandIdx && activeTool?.tool === tool;
                          return (
                            <ToolPill
                              key={`${tool}-${i}`}
                              tool={tool}
                              accent={config.accent}
                              accentSoft={config.accentSoft}
                              isActive={isActive}
                              isDimmed={isFocusedBand && !isActive}
                              onMouseEnter={() => handleToolActivate(bandIdx, tool)}
                              onMouseLeave={() => handleToolDeactivate(bandIdx)}
                              onFocus={() => handleToolActivate(bandIdx, tool)}
                              onBlur={() => handleToolDeactivate(bandIdx)}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel — always present (fixed slot) to avoid layout shift */}
        <div className="mt-16 md:mt-20">
          <div
            className="relative min-h-[200px] rounded-2xl border border-offwhite/8 bg-graphite/30 p-6 backdrop-blur-sm md:p-8 lg:p-10"
            style={{
              borderColor: activeBand ? `${activeBand.accent}30` : "rgba(240,234,216,0.08)",
              transition: "border-color 0.5s ease",
            }}
          >
            {/* Top accent rule */}
            <div
              className="absolute left-6 right-6 top-0 h-[2px] rounded-full transition-all duration-500"
              aria-hidden="true"
              style={{
                background: activeBand
                  ? `linear-gradient(90deg, transparent, ${activeBand.accent}, transparent)`
                  : "rgba(240,234,216,0.08)",
                opacity: activeBand ? 1 : 0.3,
              }}
            />

            {activeTool && activeBand ? (
              <div key={activeTool.tool}>
                <div className="mb-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.32em]"
                    style={{ color: activeBand.accent }}
                  >
                    {activeBand.name}
                  </span>
                  <h3
                    className="font-serif text-3xl tracking-tight md:text-4xl"
                    style={{ color: "#fff" }}
                  >
                    {activeTool.tool}
                  </h3>
                </div>

                {activeProjects.length > 0 ? (
                  <>
                    <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-offwhite/40">
                      {language === "es"
                        ? `EN USO · ${activeProjects.length} ${activeProjects.length === 1 ? "PROYECTO" : "PROYECTOS"}`
                        : `IN PRODUCTION · ${activeProjects.length} ${activeProjects.length === 1 ? "PROJECT" : "PROJECTS"}`}
                    </p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {activeProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.href}
                          target={project.href.startsWith("http") ? "_blank" : undefined}
                          rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-center justify-between gap-4 rounded-xl border border-offwhite/8 bg-offwhite/[0.02] px-4 py-3 transition-all hover:border-offwhite/20 hover:bg-offwhite/[0.05]"
                        >
                          <div className="min-w-0">
                            <div
                              className="font-mono text-[9px] font-bold uppercase tracking-[0.3em]"
                              style={{ color: activeBand.accent }}
                            >
                              SYS_0{project.id}
                            </div>
                            <div className="mt-1 font-sans text-sm font-medium text-offwhite/85 group-hover:text-white">
                              {project.title}
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-offwhite/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-offwhite/90" />
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-offwhite/40">
                      {language === "es" ? "EXPLORACIÓN PERSONAL" : "PERSONAL EXPLORATION"}
                    </p>
                    <p className="max-w-xl font-sans text-sm text-offwhite/65 md:text-base">
                      {language === "es"
                        ? `${activeTool.tool} no aparece etiquetado en los proyectos destacados del portfolio, pero forma parte del stack que uso para investigación, prototipos y proyectos internos.`
                        : `${activeTool.tool} isn't tagged on any featured portfolio project, but it's part of the stack I use for research, prototypes, and internal work.`}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full min-h-[140px] flex-col items-start justify-center gap-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-offwhite/30">
                  {language === "es" ? "ESPERANDO INTERACCIÓN" : "AWAITING INPUT"}
                </p>
                <p className="max-w-xl font-serif text-xl italic tracking-tight text-offwhite/45 md:text-2xl">
                  {language === "es"
                    ? isCoarse
                      ? "Tocá cualquier herramienta de las bandas para ver dónde la uso en el portfolio."
                      : "Pasá el cursor sobre cualquier herramienta para ver dónde la uso en el portfolio."
                    : isCoarse
                    ? "Tap any tool above to see where it lives across the portfolio."
                    : "Hover any tool above to see where it lives across the portfolio."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Tool pill (mono, minimal) ─── */
interface ToolPillProps {
  tool: string;
  accent: string;
  accentSoft: string;
  isActive: boolean;
  isDimmed: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
}

function ToolPill({
  tool,
  accent,
  accentSoft,
  isActive,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: ToolPillProps) {
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[12px] tracking-tight transition-all duration-300 focus:outline-none"
      style={{
        borderColor: isActive ? accent : "rgba(240,234,216,0.1)",
        background: isActive ? accentSoft : "rgba(240,234,216,0.02)",
        color: isActive ? "#fff" : isDimmed ? "rgba(240,234,216,0.3)" : "rgba(240,234,216,0.75)",
        opacity: isDimmed ? 0.4 : 1,
        boxShadow: isActive ? `0 0 24px -8px ${accent}` : "none",
      }}
    >
      <span
        className="block h-1 w-1 rounded-full transition-all duration-300"
        style={{
          background: accent,
          opacity: isActive ? 1 : 0.6,
          boxShadow: isActive ? `0 0 6px ${accent}` : "none",
        }}
      />
      {tool}
    </button>
  );
}
