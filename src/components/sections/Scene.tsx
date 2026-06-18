"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/i18n/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { resolveCaseStudyMediaFromProject } from "@/data/case-study-media";
import { CaseStudyHeroMedia } from "@/components/case-study/CaseStudyHeroMedia";
import { CountUp } from "./CountUp";

const EyeNetPipelineViz = dynamic(
  () =>
    import("@/components/portfolio/viz/EyeNetPipelineViz").then((mod) => ({
      default: mod.EyeNetPipelineViz,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full min-h-[148px] w-full animate-pulse rounded-lg"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />
    ),
  }
);

function isEyeNetProject(project: ProjectItem): boolean {
  const path = project.caseStudy ?? project.href;
  return path.includes("/projects/eyenet");
}

export interface SceneAccent {
  fg: string;
  bg: string;
  ink: string;
}

export const SCENE_ACCENTS: Record<string, SceneAccent> = {
  "00": { fg: "#c8a96e", bg: "#111318", ink: "#ece8e0" },
  "01": { fg: "#6db88a", bg: "#101210", ink: "#ece8e0" },
  "02": { fg: "oklch(52% 0.12 155)", bg: "oklch(97% 0.004 155)", ink: "#1c1c1e" },
  "03": { fg: "oklch(55% 0.14 35)", bg: "oklch(96% 0.008 35)", ink: "#1c1c1e" },
  "04": { fg: "oklch(55% 0.12 50)", bg: "oklch(96% 0.006 50)", ink: "#1c1c1e" },
};

export const DEFAULT_ACCENT: SceneAccent = {
  fg: "oklch(50% 0.12 240)",
  bg: "oklch(97% 0.004 100)",
  ink: "#1c1c1e",
};

export function getAccent(id: string): SceneAccent {
  return SCENE_ACCENTS[id] ?? DEFAULT_ACCENT;
}

/** Alpha for hex or oklch accent tokens (avoids invalid `oklch(...)50` suffixes). */
export function accentAlpha(color: string, alpha: number): string {
  if (color.startsWith("#")) {
    const a = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    const base = color.length === 4 ? color : color.slice(0, 7);
    return `${base}${a}`;
  }
  if (color.startsWith("oklch")) {
    return color.includes("/") ? color : color.replace(")", ` / ${alpha})`);
  }
  return color;
}

const VISIBLE_TAGS = 5;

function resolveImageSrc(image: string): string {
  if (image.startsWith("/")) return image;
  return "/img/microservices.webp";
}

function ProjectEvidence({
  project,
  accent,
  evidenceLabel,
  isActive,
  reducedMotion,
}: {
  project: ProjectItem;
  accent: SceneAccent;
  evidenceLabel: string;
  isActive: boolean;
  reducedMotion: boolean;
}) {
  const registryMedia = resolveCaseStudyMediaFromProject(project);
  const src = resolveImageSrc(project.image);
  const isExternal = project.href.startsWith("http");
  const usePipelineEvidence = isEyeNetProject(project);
  const media = registryMedia
    ? { ...registryMedia, alt: project.title }
    : null;

  const frame = (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border"
      style={{
        borderColor: usePipelineEvidence ? `${accent.fg}28` : `${accent.ink}12`,
        background: usePipelineEvidence ? "#0d1117" : `${accent.ink}04`,
      }}
    >
      {media ? (
        <CaseStudyHeroMedia
          media={media}
          layout="embedded"
          playback={media.video && !reducedMotion ? "active-scene" : "static-image"}
          isActive={isActive}
          reducedMotion={reducedMotion}
          showControls={false}
          sizes="(max-width: 1024px) 90vw, 45vw"
          imageStyle={{ viewTransitionName: `project-img-${project.id}` }}
        />
      ) : usePipelineEvidence ? (
        <div
          className={`absolute inset-0 flex items-center px-2 py-3 md:px-3 ${isActive ? "" : "[&_*]:!animation-none"}`}
          style={{ viewTransitionName: `project-img-${project.id}` }}
        >
          <EyeNetPipelineViz />
        </div>
      ) : (
        <Image
          src={src}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="object-cover object-top"
          style={{ viewTransitionName: `project-img-${project.id}` }}
        />
      )}
    </div>
  );

  return (
    <figure className="flex flex-col gap-2">
      <figcaption
        className="font-mono text-[9px] font-bold uppercase tracking-[0.28em]"
        style={{ color: `${accent.ink}45` }}
      >
        {evidenceLabel}
      </figcaption>

      {isExternal ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="block">
          {frame}
        </a>
      ) : (
        <Link href={project.href} className="block">
          {frame}
        </Link>
      )}
    </figure>
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

export function Scene({
  project,
  accent,
  language,
  isActive,
  index,
  onOpenSpotlight,
  reduced,
}: SceneProps) {
  const [activeKey, setActiveKey] = useState(0);
  const { t } = useLanguage();
  const labels = t.work;
  const isEn = language === "en";
  const caseNumber = String(index + 1).padStart(2, "0");
  const visibleTags = project.tags.slice(0, VISIBLE_TAGS);
  const hiddenTagCount = Math.max(0, project.tags.length - VISIBLE_TAGS);

  useEffect(() => {
    if (isActive) setActiveKey((k) => k + 1);
  }, [isActive]);

  return (
    <div
      className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14"
      style={{ color: accent.ink }}
    >
      {/* LEFT — scan layer: identity → impact → one line → role */}
      <div className="flex max-w-lg flex-col gap-6">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[9px] font-bold uppercase tracking-[0.28em]">
          <span style={{ color: accent.fg }}>
            {isEn ? "Case" : "Caso"} {caseNumber}
          </span>
          <span style={{ color: `${accent.ink}22` }}>·</span>
          <span style={{ color: `${accent.ink}50` }}>{project.context}</span>
          {project.date && (
            <>
              <span style={{ color: `${accent.ink}22` }}>·</span>
              <span style={{ color: `${accent.ink}40` }}>{project.date}</span>
            </>
          )}
        </div>

        <div>
          <h3
            className="font-display text-4xl leading-[1.02] tracking-tight md:text-5xl lg:text-[3.25rem]"
            style={{ color: accent.ink }}
          >
            {project.title}
          </h3>
          <p
            className="mt-3 max-w-md font-sans text-[15px] leading-relaxed md:text-base"
            style={{ color: `${accent.ink}62` }}
          >
            {project.subtitle}
          </p>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div
            className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4"
          >
            {project.metrics.slice(0, 4).map((m, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <CountUp
                  value={m.value}
                  triggerKey={activeKey}
                  reduced={reduced}
                  className="font-mono text-2xl font-bold tabular-nums tracking-tight md:text-[1.75rem]"
                  style={{ color: i === 0 ? accent.fg : accent.ink }}
                />
                <span
                  className="font-mono text-[8px] font-bold uppercase leading-tight tracking-wider"
                  style={{ color: `${accent.ink}45` }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p
          className="max-w-md font-sans text-sm leading-relaxed"
          style={{ color: `${accent.ink}55` }}
        >
          {project.role}
        </p>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded px-1.5 py-0.5 font-mono text-[8px] font-medium uppercase tracking-wider"
                style={{ color: `${accent.ink}50`, background: `${accent.ink}05` }}
              >
                {tag}
              </span>
            ))}
            {hiddenTagCount > 0 && (
              <span className="font-mono text-[8px]" style={{ color: `${accent.ink}35` }}>
                +{hiddenTagCount}
              </span>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Link
            href={project.caseStudy ?? project.href}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-sans text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ background: accent.fg, color: accent.bg }}
          >
            {isEn ? "Read case study" : "Leer caso de estudio"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => onOpenSpotlight(project)}
            className="font-sans text-xs font-medium underline-offset-4 transition-colors hover:underline"
            style={{ color: `${accent.ink}45` }}
          >
            {labels.inspect}
          </button>
        </div>
      </div>

      {/* RIGHT — single evidence frame */}
      <ProjectEvidence
        project={project}
        accent={accent}
        evidenceLabel={labels.labelEvidence}
        isActive={isActive}
        reducedMotion={reduced}
      />
    </div>
  );
}
