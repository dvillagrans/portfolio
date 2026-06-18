"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { accentAlpha } from "@/components/sections/Scene";
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

function projectShortTitle(title: string): string {
  return title.split(/[—–-]/)[0]?.trim() ?? title;
}

export default function Stack() {
  const container = useRef<HTMLElement>(null);
  const bandsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const { t } = useLanguage();
  const labels = t.stack;
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

  const tools = labels.tools;

  const inSet = (tool: string, set: string[]) =>
    set.some((s) => s.toLowerCase() === tool.toLowerCase());

  const bands: BandConfig[] = useMemo(
    () =>
      [
        {
          name: labels.bands.dataScience,
          accent: "oklch(72% 0.16 285)",
          accentSoft: "oklch(72% 0.16 285 / 0.18)",
          tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.dataScience)),
          direction: "rtl" as const,
          speed: 60,
        },
        {
          name: labels.bands.infrastructure,
          accent: "oklch(72% 0.13 195)",
          accentSoft: "oklch(72% 0.13 195 / 0.18)",
          tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.infrastructure)),
          direction: "ltr" as const,
          speed: 72,
        },
        {
          name: labels.bands.platform,
          accent: "oklch(68% 0.14 150)",
          accentSoft: "oklch(68% 0.14 150 / 0.18)",
          tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.platform)),
          direction: "rtl" as const,
          speed: 52,
        },
        {
          name: labels.bands.core,
          accent: "oklch(74% 0.15 65)",
          accentSoft: "oklch(74% 0.15 65 / 0.18)",
          tools: tools.filter((tool) => inSet(tool, CATEGORY_SETS.core)),
          direction: "ltr" as const,
          speed: 64,
        },
      ].filter((b) => b.tools.length > 0),
    [tools, labels.bands]
  );

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
    const key = normalize(tool);
    const direct = toolUsage.get(key);
    if (direct?.length) return direct;

    const matches: ProjectItem[] = [];
    t.work.projects.forEach((project) => {
      const hit = project.tags?.some((tag) => {
        const tk = normalize(tag);
        return tk.length > 2 && (tk.includes(key) || key.includes(tk));
      });
      if (hit && !matches.some((p) => p.id === project.id)) matches.push(project);
    });
    return matches;
  };

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

  const activeProjects = activeTool ? getProjectsForTool(activeTool.tool) : [];
  const activeBand = activeTool ? bands[activeTool.bandIdx] : null;

  const projectCountLabel =
    activeProjects.length === 1
      ? `1 ${labels.projectOne}`
      : `${activeProjects.length} ${labels.projectMany}`;

  return (
    <section
      ref={container}
      id="stack"
      className="relative overflow-hidden border-t border-offwhite/6 bg-charcoal py-20 text-offwhite md:py-28"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl lg:px-12">
        <header className="mb-12 md:mb-14">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-offwhite/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/50">
              {labels.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-4xl tracking-tight text-offwhite md:text-5xl lg:text-6xl">
            {labels.title}
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm text-offwhite/55 md:text-base">
            {labels.subtitle}
          </p>
        </header>

        <div className="space-y-7 md:space-y-8">
          {bands.map((config, bandIdx) => {
            const showStatic = reduced || isCoarse;
            const isFocusedBand = activeTool?.bandIdx === bandIdx;

            return (
              <div key={config.name} className="relative">
                <div className="mb-2.5 flex items-center gap-3">
                  <span
                    className="block h-1.5 w-1.5 rounded-full transition-all duration-500"
                    style={{
                      background: config.accent,
                      boxShadow: isFocusedBand ? `0 0 10px ${accentAlpha(config.accent, 0.6)}` : "none",
                    }}
                  />
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] transition-colors duration-500"
                    style={{ color: isFocusedBand ? config.accent : "rgba(240,234,216,0.42)" }}
                  >
                    {config.name}
                  </span>
                  <div
                    className="ml-auto h-px flex-1"
                    style={{
                      background: isFocusedBand
                        ? `linear-gradient(90deg, ${accentAlpha(config.accent, 0.45)}, transparent)`
                        : "rgba(240,234,216,0.06)",
                    }}
                  />
                </div>

                <div
                  className="relative overflow-hidden py-1"
                  style={{
                    maskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
                  }}
                >
                  {showStatic ? (
                    <div className="flex flex-wrap gap-2">
                      {config.tools.map((tool) => {
                        const isActive = activeTool?.bandIdx === bandIdx && activeTool?.tool === tool;
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
                      <div className="band-inner flex w-max gap-2.5 will-change-transform">
                        {[...config.tools, ...config.tools].map((tool, i) => {
                          const isActive = activeTool?.bandIdx === bandIdx && activeTool?.tool === tool;
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

        <p className="mt-8 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/28">
          {isCoarse ? labels.hintTap : labels.hintHover}
        </p>

        <div className="mt-10 md:mt-12">
          <div
            className="relative min-h-[180px] rounded-2xl border bg-white/[0.02] p-6 md:p-8"
            style={{
              borderColor: activeBand ? accentAlpha(activeBand.accent, 0.28) : "rgba(240,234,216,0.08)",
              transition: "border-color 0.4s ease",
            }}
          >
            {activeTool && activeBand ? (
              <div key={activeTool.tool}>
                <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.28em]"
                    style={{ color: activeBand.accent }}
                  >
                    {activeBand.name}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-offwhite md:text-3xl">
                    {activeTool.tool}
                  </h3>
                </div>

                {activeProjects.length > 0 ? (
                  <>
                    <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/38">
                      {labels.labelUsedIn} · {projectCountLabel}
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                      {activeProjects.map((project) => (
                        <a
                          key={project.id}
                          href={project.href}
                          target={project.href.startsWith("http") ? "_blank" : undefined}
                          rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-offwhite/8 bg-offwhite/[0.02] px-4 py-3 transition-all hover:border-offwhite/16 hover:bg-offwhite/[0.04]"
                        >
                          <div className="min-w-0">
                            <div className="font-mono text-[8px] font-bold uppercase tracking-[0.24em] text-offwhite/38">
                              {project.context}
                            </div>
                            <div className="mt-0.5 font-sans text-sm font-medium text-offwhite/85 group-hover:text-white">
                              {projectShortTitle(project.title)}
                            </div>
                          </div>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-offwhite/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-offwhite/80" />
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/38">
                      {labels.labelExploration}
                    </p>
                    <p className="max-w-xl font-sans text-sm leading-relaxed text-offwhite/58 md:text-[15px]">
                      {labels.explorationNote.replace("{tool}", activeTool.tool)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex min-h-[120px] flex-col justify-center gap-2">
                <p className="font-sans text-sm font-medium text-offwhite/50">{labels.emptyTitle}</p>
                <p className="max-w-lg font-sans text-sm text-offwhite/38">{labels.emptyHint}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3.5 py-2 font-mono text-[11px] tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-warm/30"
      style={{
        borderColor: isActive ? accentAlpha(accent, 0.5) : "rgba(240,234,216,0.1)",
        background: isActive ? accentSoft : "rgba(240,234,216,0.02)",
        color: isActive ? "#fff" : isDimmed ? "rgba(240,234,216,0.32)" : "rgba(240,234,216,0.72)",
        opacity: isDimmed ? 0.45 : 1,
      }}
    >
      {tool}
    </button>
  );
}
