"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { ProjectItem } from "@/i18n/types";
import { CountUp } from "./CountUp";

const CovidClusterViz = dynamic(
  () =>
    import("../portfolio/viz/CovidClusterViz").then((m) => ({
      default: m.CovidClusterViz,
    })),
  { ssr: false }
);

export interface BespokeCovidSceneProps {
  project: ProjectItem;
  language: string;
  isActive: boolean;
  index: number;
  onOpenSpotlight: (project: ProjectItem) => void;
  reduced: boolean;
}

export function BespokeCovidScene({
  project,
  language,
  isActive,
  index,
  onOpenSpotlight,
  reduced,
}: BespokeCovidSceneProps) {
  const [activeKey, setActiveKey] = useState(0);

  useEffect(() => {
    if (isActive) setActiveKey((k) => k + 1);
  }, [isActive]);

  const ink = "#f0ead8";
  const accent = "#7dd49a";
  const inkSoft = "rgba(240,234,216,0.7)";
  const inkMute = "rgba(240,234,216,0.55)";

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #11140e 0%, #0a0b08 100%)",
      }}
    >
      {/* Layer 1 — full-bleed viz */}
      <div className="absolute inset-0">
        <CovidClusterViz />
      </div>

      {/* Layer 2 — soft focus vignette (depth, not contrast) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, transparent 50%, rgba(0,0,0,0.25) 90%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* Layer 3 — scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.4) 3px, rgba(255,255,255,0.4) 4px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />

      {/* Layer 4 — editorial HUD */}
      <div
        className="relative grid h-full grid-cols-12 grid-rows-12 gap-4 px-8 pt-28 pb-10 md:px-16 md:pt-32 md:pb-14 lg:px-24 lg:pt-36 lg:pb-16"
        style={{ color: ink }}
      >
        {/* Top-left — system badge */}
        <div className="col-span-7 row-start-1 flex items-center gap-3">
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{ color: accent }}
          >
            SYS_{project.id}
          </span>
          <span className="h-[1px] w-10 bg-white/20" />
          <span
            className="font-mono text-[9px] uppercase tracking-[0.32em]"
            style={{ color: inkMute }}
          >
            {project.category}
          </span>
        </div>

        {/* Top-right — live channel */}
        <div className="col-span-5 row-start-1 flex items-start justify-end gap-2">
          <span
            className="mt-[6px] block h-1.5 w-1.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
          />
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-widest"
            style={{ color: inkMute }}
          >
            {String(index + 1).padStart(2, "0")} / LIVE · K-MEANS · n=9
          </span>
        </div>

        {/* Title + problem — top-left block */}
        <div className="col-span-12 row-start-2 row-span-4 flex flex-col gap-5 md:col-span-7">
          <h3
            className="font-serif text-4xl leading-[0.92] tracking-tight md:text-6xl lg:text-7xl"
            style={{ color: ink }}
          >
            {project.title}
          </h3>
          <div className="flex max-w-md gap-4">
            <span
              className="w-[3px] shrink-0 rounded-full"
              style={{ background: accent }}
            />
            <p
              className="font-sans text-sm leading-relaxed md:text-base"
              style={{ color: inkSoft }}
            >
              {project.problem}
            </p>
          </div>
        </div>

        {/* GIANT metric — bottom-right, hugging the corner over the data */}
        {project.metrics && project.metrics[0] && (
          <div className="col-span-12 row-start-7 row-span-4 flex flex-col items-end justify-end md:col-span-7 md:col-start-6">
            <CountUp
              value={project.metrics[0].value}
              triggerKey={activeKey}
              reduced={reduced}
              className="font-mono font-black tabular-nums leading-[0.85] tracking-tighter text-[7rem] md:text-[11rem] lg:text-[14rem]"
              style={{
                color: accent,
                textShadow: `0 0 80px ${accent}40, 0 0 20px ${accent}30`,
              }}
            />
            <span
              className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: inkMute }}
            >
              {project.metrics[0].label}
            </span>
          </div>
        )}

        {/* Bottom-left — CTAs + tags */}
        <div className="col-span-12 row-start-11 row-span-2 flex flex-col justify-end gap-3 md:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenSpotlight(project)}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              {language === "en" ? "Inspect System" : "Inspeccionar"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <Link
              href={project.href}
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
            >
              {language === "en" ? "Case study" : "Caso de estudio"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
