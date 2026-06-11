"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { ProjectItem } from "@/i18n/types";
import { CountUp } from "./CountUp";

const VizContainer = dynamic(
  () =>
    import("../portfolio/viz/VizContainer").then((m) => ({
      default: m.VizContainer,
    })),
  { ssr: false }
);
const CovidClusterViz = dynamic(
  () =>
    import("../portfolio/viz/CovidClusterViz").then((m) => ({
      default: m.CovidClusterViz,
    })),
  { ssr: false }
);
const NYCFareViz = dynamic(
  () =>
    import("../portfolio/viz/NYCFareViz").then((m) => ({
      default: m.NYCFareViz,
    })),
  { ssr: false }
);
const IndiaAQIViz = dynamic(
  () =>
    import("../portfolio/viz/IndiaAQIViz").then((m) => ({
      default: m.IndiaAQIViz,
    })),
  { ssr: false }
);

export interface SceneAccent {
  fg: string;
  bg: string;
  ink: string;
}

export const SCENE_ACCENTS: Record<string, SceneAccent> = {
  "00": { fg: "#c8a96e", bg: "#0d1117", ink: "#f0ead8" },
  "01": { fg: "#7dd49a", bg: "#0c100c", ink: "#f0ead8" },
  "02": { fg: "oklch(60% 0.15 155)", bg: "oklch(96% 0.012 155)", ink: "#1c1c1e" },
  "03": { fg: "oklch(58% 0.16 35)",  bg: "oklch(95% 0.018 35)",  ink: "#1c1c1e" },
  "04": { fg: "oklch(60% 0.14 50)",  bg: "oklch(96% 0.014 50)",  ink: "#1c1c1e" },
};

export const DEFAULT_ACCENT: SceneAccent = {
  fg: "oklch(50% 0.12 240)",
  bg: "oklch(96% 0.005 100)",
  ink: "#1c1c1e",
};

export function getAccent(id: string): SceneAccent {
  return SCENE_ACCENTS[id] ?? DEFAULT_ACCENT;
}

function pickViz(id: string, image: string, title: string) {
  if (id === "01") {
    return (
      <VizContainer height={320}>
        <CovidClusterViz />
      </VizContainer>
    );
  }
  if (id === "02") {
    return (
      <VizContainer height={300}>
        <NYCFareViz />
      </VizContainer>
    );
  }
  if (id === "03") {
    return (
      <VizContainer height={340}>
        <IndiaAQIViz />
      </VizContainer>
    );
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-charcoal/5">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 1024px) 90vw, 50vw"
        className="object-cover"
        style={{ viewTransitionName: `project-img-${id}` }}
      />
    </div>
  );
}

export interface SceneProps {
  project: ProjectItem;
  accent: SceneAccent;
  language: string;
  isActive: boolean;
  index: number;
  onOpenSpotlight: (project: ProjectItem) => void;
  reduced: boolean;
}

export function Scene({ project, accent, language, isActive, index, onOpenSpotlight, reduced }: SceneProps) {
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    if (isActive) setActiveKey((k) => k + 1);
  }, [isActive]);

  return (
    <div
      className="grid h-full w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
      style={{ color: accent.ink }}
    >
      {/* LEFT — narrative column */}
      <div className="flex flex-col gap-6 max-w-xl">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{ color: accent.fg }}
          >
            SYS_0{project.id}
          </span>
          <span className="h-[1px] w-10" style={{ background: `${accent.ink}25` }} />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.32em]"
            style={{ color: `${accent.ink}55` }}
          >
            {project.category}
          </span>
        </div>

        <h3
          className="font-serif text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
          style={{ color: accent.ink }}
        >
          {project.title}
        </h3>

        <div className="flex gap-4">
          <span
            className="w-[3px] shrink-0 rounded-full"
            style={{ background: accent.fg }}
          />
          <p
            className="font-sans text-base leading-relaxed md:text-lg"
            style={{ color: `${accent.ink}99` }}
          >
            {project.problem}
          </p>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-2 flex flex-wrap items-end gap-8">
            <div className="flex flex-col">
              <CountUp
                value={project.metrics[0].value}
                triggerKey={activeKey}
                reduced={reduced}
                className="font-mono text-6xl font-black tabular-nums tracking-tighter md:text-7xl"
                style={{ color: accent.fg }}
              />
              <span
                className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest"
                style={{ color: `${accent.ink}55` }}
              >
                {project.metrics[0].label}
              </span>
            </div>
            {project.metrics.slice(1, 3).map((m, i) => (
              <div key={i} className="flex flex-col">
                <CountUp
                  value={m.value}
                  triggerKey={activeKey}
                  reduced={reduced}
                  className="font-mono text-2xl font-bold tabular-nums tracking-tight"
                  style={{ color: accent.ink }}
                />
                <span
                  className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: `${accent.ink}55` }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenSpotlight(project)}
            className="inline-flex items-center gap-3 rounded-full border px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5"
            style={{
              borderColor: `${accent.ink}20`,
              color: accent.ink,
              background: `${accent.ink}05`,
            }}
          >
            {language === "en" ? "Inspect System" : "Inspeccionar"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <Link
            href={project.href}
            className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
            style={{ color: `${accent.ink}55` }}
          >
            {language === "en" ? "Case study" : "Caso de estudio"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest"
                style={{
                  color: `${accent.ink}70`,
                  background: `${accent.ink}06`,
                  border: `1px solid ${accent.ink}10`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT — visual column */}
      <div className="relative">
        <div
          className="absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
          style={{ background: `radial-gradient(circle at 60% 40%, ${accent.fg}30, transparent 65%)` }}
          aria-hidden="true"
        />
        <div
          className="relative rounded-[2rem] border bg-white/60 p-5 backdrop-blur-sm md:p-7"
          style={{ borderColor: `${accent.ink}10` }}
        >
          <div className="mb-4 flex items-center justify-between">
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-[0.32em]"
              style={{ color: `${accent.ink}55` }}
            >
              {language === "en" ? "Visualization" : "Visualización"}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: accent.fg, boxShadow: `0 0 8px ${accent.fg}` }}
              />
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-widest"
                style={{ color: `${accent.ink}45` }}
              >
                {String(index + 1).padStart(2, "0")} / LIVE
              </span>
            </div>
          </div>
          {pickViz(project.id, project.image, project.title)}
        </div>
      </div>
    </div>
  );
}
