"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ProjectItem } from "@/i18n/types";

const ProjectSpotlight = dynamic(
  () => import("../portfolio/ProjectSpotlight"),
  { ssr: false }
);

const EyeNetCard = dynamic(() => import("../ui/EyeNetCard"), { ssr: false });
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

gsap.registerPlugin(ScrollTrigger);

interface SceneAccent {
  fg: string;
  bg: string;
  ink: string;
}

const SCENE_ACCENTS: Record<string, SceneAccent> = {
  "00": { fg: "oklch(70% 0.130 65)", bg: "oklch(18% 0.02 250)", ink: "#f0ead8" },
  "01": { fg: "oklch(54% 0.18 265)", bg: "oklch(96% 0.012 265)", ink: "#1c1c1e" },
  "02": { fg: "oklch(60% 0.15 155)", bg: "oklch(96% 0.012 155)", ink: "#1c1c1e" },
  "03": { fg: "oklch(58% 0.16 35)",  bg: "oklch(95% 0.018 35)",  ink: "#1c1c1e" },
  "04": { fg: "oklch(60% 0.14 50)",  bg: "oklch(96% 0.014 50)",  ink: "#1c1c1e" },
};

const DEFAULT_ACCENT: SceneAccent = {
  fg: "oklch(50% 0.12 240)",
  bg: "oklch(96% 0.005 100)",
  ink: "#1c1c1e",
};

function getAccent(id: string): SceneAccent {
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

interface CountUpProps {
  value: string;
  triggerKey: number;
  reduced: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function CountUp({ value, triggerKey, reduced, className, style }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match || reduced) {
      ref.current.textContent = value;
      return;
    }
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (!ref.current) return;
        const rounded = Number.isInteger(target)
          ? Math.round(obj.v)
          : obj.v.toFixed(1);
        ref.current.textContent = `${rounded}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, triggerKey, reduced]);

  return <span ref={ref} className={className} style={style}>{reduced ? value : "0"}</span>;
}

interface SceneProps {
  project: ProjectItem;
  accent: SceneAccent;
  language: string;
  isActive: boolean;
  index: number;
  onOpenSpotlight: (project: ProjectItem) => void;
  reduced: boolean;
}

function Scene({ project, accent, language, isActive, index, onOpenSpotlight, reduced }: SceneProps) {
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

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const staticCardRefs = useRef<(HTMLElement | null)[]>([]);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const [spotlight, setSpotlight] = useState<{ open: boolean; project: ProjectItem | null }>({
    open: false,
    project: null,
  });
  const [activeScene, setActiveScene] = useState(0);
  const [mode, setMode] = useState<"loading" | "cinematic" | "static">("loading");

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const apply = (matches: boolean) => {
      setMode(matches && !reduced ? "cinematic" : "static");
    };
    apply(mql.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [reduced]);

  const projects = t.work.projects;

  // ─── CINEMATIC MODE ─── pin + cross-fade scenes ──────────────────────────────
  useLayoutEffect(() => {
    if (mode !== "cinematic") return;
    if (!sectionRef.current || !stageRef.current) return;

    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    const ctx = gsap.context(() => {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      const firstAccent = getAccent(projects[0]?.id ?? "01");
      gsap.set(sectionRef.current, { backgroundColor: firstAccent.bg });

      const totalSlides = slides.length;
      const scrollDistance = (totalSlides - 1) * window.innerHeight * 1.4;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: stageRef.current,
          scrub: 0.4,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.4, max: 0.8 },
            ease: "power3.out",
            delay: 0.12,
            inertia: false,
            directional: false,
          },
          onUpdate: (self) => {
            const idx = Math.min(
              totalSlides - 1,
              Math.round(self.progress * (totalSlides - 1))
            );
            setActiveScene((curr) => (curr === idx ? curr : idx));
            slides.forEach((s, i) => {
              s.style.pointerEvents = i === idx ? "auto" : "none";
            });
          },
        },
      });

      const segment = 1 / (totalSlides - 1);
      const fadeFraction = 0.55;
      const fadeDur = segment * fadeFraction;

      for (let i = 1; i < totalSlides; i++) {
        const at = (i - 1) * segment;
        tl.to(
          slides[i - 1],
          { opacity: 0, y: -40, duration: fadeDur, ease: "power2.in" },
          at
        );
        tl.fromTo(
          slides[i],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: fadeDur, ease: "power2.out" },
          at
        );
        tl.to(
          sectionRef.current,
          {
            backgroundColor: getAccent(projects[i].id).bg,
            duration: fadeDur,
            ease: "none",
          },
          at
        );
      }

      const remaining = 1 - tl.duration();
      if (remaining > 0) {
        tl.to({}, { duration: remaining });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [mode, projects]);

  // ─── STATIC MODE ─── simple stagger reveal ─────────────────────────────────
  useEffect(() => {
    if (mode !== "static") return;
    if (reduced) {
      staticCardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 1, y: 0 });
      });
      return;
    }
    const ctx = gsap.context(() => {
      staticCardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode, reduced]);

  const handleOpenSpotlight = (project: ProjectItem) => {
    setSpotlight({ open: true, project });
  };

  const renderHeader = (variant: "cinematic" | "static") => (
    <header
      className={
        variant === "cinematic"
          ? "pointer-events-auto flex flex-col gap-2"
          : "mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      }
    >
      <div>
        <div className="mb-3 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-charcoal/20" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/40">
            02. {language === "en" ? "Featured Systems" : "Sistemas Destacados"}
          </span>
        </div>
        <h2
          className={
            variant === "cinematic"
              ? "font-serif text-2xl tracking-tight text-charcoal md:text-3xl"
              : "font-serif text-5xl tracking-tight text-charcoal md:text-7xl"
          }
        >
          {t.work.title}
        </h2>
        {variant === "static" && (
          <p className="mt-4 max-w-md font-sans text-sm text-charcoal/50">
            {t.work.subtitle}
          </p>
        )}
      </div>
      {variant === "static" && (
        <Link
          href="/projects"
          className="group flex min-h-[44px] items-center justify-center gap-3 rounded-full border border-charcoal/10 bg-white px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal shadow-sm transition-all hover:bg-charcoal hover:text-offwhite spring-press"
        >
          {language === "en" ? "Full Systems Archive" : "Archivo de Sistemas"}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
    </header>
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative text-charcoal"
      style={{
        backgroundColor: "var(--off-white, #f4f1ea)",
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
        transition: mode === "cinematic" ? undefined : "background-color 0.6s ease",
      }}
    >
      {/* CINEMATIC */}
      {mode === "cinematic" && (
        <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
          {/* Sticky chapter header */}
          <div className="pointer-events-none absolute left-12 top-12 z-30">
            {renderHeader("cinematic")}
          </div>

          {/* Progress rail */}
          <div className="absolute right-12 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-4">
            {projects.map((p, i) => {
              const isOn = i === activeScene;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const totalSlides = projects.length;
                    const scrollDistance = (totalSlides - 1) * window.innerHeight * 1.4;
                    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
                    const target = sectionTop + (i / (totalSlides - 1)) * scrollDistance;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  className="group flex items-center gap-3"
                  aria-label={`Go to ${p.title}`}
                >
                  <span
                    className="font-mono text-[9px] font-bold tracking-widest transition-opacity"
                    style={{ color: getAccent(p.id).ink, opacity: isOn ? 1 : 0.35 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="h-[2px] transition-all duration-500"
                    style={{
                      width: isOn ? 48 : 20,
                      background: isOn ? getAccent(p.id).fg : `${getAccent(p.id).ink}30`,
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Scene stage */}
          <div className="absolute inset-0 flex items-center px-12 pt-32 pb-12 lg:px-24">
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute inset-0 flex items-center px-12 pt-32 pb-12 lg:px-24"
                style={{ willChange: "opacity, transform" }}
              >
                {p.type === "special" ? (
                  <div className="mx-auto w-full max-w-5xl">
                    <EyeNetCard />
                  </div>
                ) : (
                  <div className="mx-auto w-full max-w-7xl">
                    <Scene
                      project={p}
                      accent={getAccent(p.id)}
                      language={language}
                      isActive={i === activeScene}
                      index={i}
                      onOpenSpotlight={handleOpenSpotlight}
                      reduced={reduced}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          {activeScene === 0 && (
            <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-charcoal/40">
                {language === "en" ? "Scroll to navigate systems" : "Hacé scroll para navegar"}
              </span>
              <div className="h-8 w-[1px] animate-pulse bg-charcoal/30" />
            </div>
          )}
        </div>
      )}

      {/* STATIC (mobile / tablet / reduced motion) */}
      {mode === "static" && (
        <div className="mx-auto max-w-7xl py-24 md:px-12">
          {renderHeader("static")}

          <div className="flex flex-col gap-12 md:gap-20">
            {projects.map((p, i) => {
              const accent = getAccent(p.id);
              return (
                <article
                  key={p.id}
                  ref={(el) => {
                    staticCardRefs.current[i] = el;
                  }}
                  className="relative"
                  style={{ opacity: 0 }}
                >
                  {p.type === "special" ? (
                    <EyeNetCard />
                  ) : (
                    <div
                      className="relative overflow-hidden rounded-[2.5rem] border p-6 md:p-10"
                      style={{
                        background: accent.bg,
                        borderColor: `${accent.ink}10`,
                      }}
                    >
                      <Scene
                        project={p}
                        accent={accent}
                        language={language}
                        isActive
                        index={i}
                        onOpenSpotlight={handleOpenSpotlight}
                        reduced={reduced}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <footer className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-charcoal/5 pt-12 md:flex-row">
            <div className="flex flex-col gap-1">
              <p className="font-sans text-sm font-medium text-charcoal">
                {language === "en" ? "Hungry for more systems?" : "¿Quieres ver más sistemas?"}
              </p>
              <p className="font-sans text-xs text-charcoal/40">
                {language === "en"
                  ? "Explore 12+ experimental notebooks and archive projects."
                  : "Explora más de 12 notebooks experimentales y proyectos de archivo."}
              </p>
            </div>
            <Link
              href="/projects"
              className="group flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-charcoal transition-colors hover:text-accent"
            >
              {language === "en" ? "View Archive" : "Ver Archivo"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </footer>
        </div>
      )}

      {/* Spotlight overlay shared by both modes */}
      <ProjectSpotlight
        project={spotlight.project}
        open={spotlight.open}
        onClose={() => setSpotlight({ open: false, project: null })}
      />
    </section>
  );
}
