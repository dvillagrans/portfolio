"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ProjectItem } from "@/i18n/types";
import {
  getFeaturedWorkSceneScrollY,
  smoothScrollTo,
} from "@/lib/scroll";
import {
  CINEMATIC_SCROLL,
  buildCinematicSnapPoints,
  getActiveSceneFromProgress,
  getIncomingFadeDelay,
  CHROME_TRANSITION_MS,
} from "@/lib/featuredWorkScrollConfig";
import { Scene, getAccent, accentAlpha } from "./Scene";

const ProjectSpotlight = dynamic(
  () => import("../portfolio/ProjectSpotlight"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

function projectNavLabel(title: string): string {
  return title.split(/[—–-]/)[0]?.trim() ?? title;
}

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const staticCardRefs = useRef<(HTMLElement | null)[]>([]);
  const navButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const reduced = useReducedMotion();
  const [spotlight, setSpotlight] = useState<{ open: boolean; project: ProjectItem | null }>({
    open: false,
    project: null,
  });
  const [activeScene, setActiveScene] = useState(0);
  // Default to "static" — safe fallback; upgraded to "cinematic" on desktop with motion enabled
  const [mode, setMode] = useState<"cinematic" | "static">("static");

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

  // Keyboard navigation between pinned scenes (desktop cinematic)
  useEffect(() => {
    if (mode !== "cinematic" || reduced) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      let next = activeScene;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        next = Math.min(projects.length - 1, activeScene + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        next = Math.max(0, activeScene - 1);
      } else if (/^[1-9]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        if (idx < projects.length) next = idx;
      } else {
        return;
      }

      if (next === activeScene || !sectionRef.current) return;
      e.preventDefault();
      smoothScrollTo(
        getFeaturedWorkSceneScrollY(sectionRef.current, next, projects.length),
        CINEMATIC_SCROLL.programmaticScroll
      );
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode, reduced, activeScene, projects.length]);

  // Keep active project tab visible in the horizontal nav — scroll the container only
  // (scrollIntoView on the button would scroll the page down to #projects on mount)
  useEffect(() => {
    if (mode !== "cinematic") return;
    const container = navScrollRef.current;
    const btn = navButtonRefs.current[activeScene];
    if (!container || !btn) return;

    const targetLeft =
      btn.offsetLeft - (container.clientWidth - btn.offsetWidth) / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeScene, mode]);

  // ─── CINEMATIC MODE ─── pin + cross-fade scenes ──────────────────────────────
  useLayoutEffect(() => {
    if (mode !== "cinematic") return;
    if (!sectionRef.current || !stageRef.current) return;

    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    let refreshSnap: (() => void) | undefined;

    const ctx = gsap.context(() => {
      slides.forEach((slide, i) => {
        gsap.set(slide, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : CINEMATIC_SCROLL.slideOffsetY,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      const firstAccent = getAccent(projects[0]?.id ?? "01");
      gsap.set(sectionRef.current, { backgroundColor: firstAccent.bg });

      const totalSlides = slides.length;
      const scrollDistance =
        (totalSlides - 1) * window.innerHeight * CINEMATIC_SCROLL.vhPerSlide;
      const segment = totalSlides > 1 ? 1 / (totalSlides - 1) : 1;
      const fadeDur = segment * CINEMATIC_SCROLL.fadeFraction;
      const snapPoints = buildCinematicSnapPoints(totalSlides);
      let snapToDirectional = ScrollTrigger.snapDirectional(snapPoints);

      refreshSnap = () => {
        snapToDirectional = ScrollTrigger.snapDirectional(snapPoints);
      };
      ScrollTrigger.addEventListener("refresh", refreshSnap);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: stageRef.current,
          pinSpacing: true,
          scrub: CINEMATIC_SCROLL.scrub,
          anticipatePin: 1,
          snap: {
            snapTo: (progress, self) =>
              snapToDirectional(progress, self?.direction ?? 1),
            duration: {
              min: CINEMATIC_SCROLL.snap.durationMin,
              max: CINEMATIC_SCROLL.snap.durationMax,
            },
            ease: CINEMATIC_SCROLL.snap.ease,
            delay: CINEMATIC_SCROLL.snap.delay,
            inertia: CINEMATIC_SCROLL.snap.inertia,
            directional: true,
          },
          onUpdate: (self) => {
            const idx = getActiveSceneFromProgress(self.progress, totalSlides);
            setActiveScene((curr) => (curr === idx ? curr : idx));
            slides.forEach((s, i) => {
              s.style.pointerEvents = i === idx ? "auto" : "none";
            });
          },
        },
      });

      const offsetY = CINEMATIC_SCROLL.slideOffsetY;

      for (let i = 1; i < totalSlides; i++) {
        const segmentStart = (i - 1) * segment;
        const fadeStart = segmentStart + segment * CINEMATIC_SCROLL.holdFraction;
        const incomingDelay = getIncomingFadeDelay(
          getAccent(projects[i - 1].id).bg,
          getAccent(projects[i].id).bg,
          fadeDur
        );

        tl.to(
          slides[i - 1],
          { opacity: 0, y: -offsetY, duration: fadeDur, ease: "power1.inOut" },
          fadeStart
        );
        tl.fromTo(
          slides[i],
          { opacity: 0, y: offsetY },
          { opacity: 1, y: 0, duration: fadeDur, ease: "power1.inOut" },
          fadeStart + incomingDelay
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      if (refreshSnap) ScrollTrigger.removeEventListener("refresh", refreshSnap);
      ctx.revert();
    };
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
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode, reduced]);

  const handleOpenSpotlight = (project: ProjectItem) => {
    setSpotlight({ open: true, project });
  };

  const renderHeader = (variant: "cinematic" | "static", inkOverride?: string, sceneIndex?: number) => {
    const ink = inkOverride ?? "#1c1c1e";
    const inkSoft = `${ink}66`;
    const inkLine = `${ink}33`;

    if (variant === "cinematic" && sceneIndex !== undefined) {
      return (
        <header className="pointer-events-auto font-mono text-[9px] font-bold uppercase tracking-[0.32em]">
          <span style={{ color: `${ink}40` }}>{t.work.title}</span>
          <span style={{ color: `${ink}25` }}> · </span>
          <span style={{ color: `${ink}55` }}>
            {String(sceneIndex + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
          </span>
        </header>
      );
    }

    return (
      <header
        className={
          variant === "cinematic"
            ? "pointer-events-auto flex flex-col gap-2"
            : "mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        }
      >
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div
              className="h-[1px] w-8"
              style={{
                background: inkLine,
                transition: `background-color ${CHROME_TRANSITION_MS}ms ease`,
              }}
            />
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: inkSoft, transition: `color ${CHROME_TRANSITION_MS}ms ease` }}
            >
              {language === "en" ? "Selected work" : "Trabajo seleccionado"}
            </span>
          </div>
          <h2
            className={
              variant === "cinematic"
                ? "font-display text-2xl tracking-tight md:text-3xl"
                : "font-display text-5xl tracking-tight md:text-7xl"
            }
            style={{ color: ink, transition: `color ${CHROME_TRANSITION_MS}ms ease` }}
          >
            {t.work.title}
          </h2>
          <p
            className={
              variant === "cinematic"
                ? "mt-1 max-w-md font-sans text-xs md:text-sm"
                : "mt-4 max-w-md font-sans text-sm"
            }
            style={{ color: inkSoft, transition: `color ${CHROME_TRANSITION_MS}ms ease` }}
          >
            {t.work.subtitle}
          </p>
        </div>
        {variant === "static" && (
          <Link
            href="/projects"
            className="group flex min-h-[44px] items-center justify-center gap-3 rounded-full border border-charcoal/10 bg-white px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal shadow-sm transition-all hover:bg-charcoal hover:text-offwhite spring-press"
          >
            {language === "en" ? "View all projects" : "Ver todos los proyectos"}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </header>
    );
  };

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
          <div className="pointer-events-none absolute left-6 top-8 z-30 lg:left-12 lg:top-10">
            {renderHeader(
              "cinematic",
              getAccent(projects[activeScene]?.id ?? "00").ink,
              activeScene
            )}
          </div>

          {/* Bottom project navigation — lifted above ProjectChat (z-50) */}
          <nav
            className="absolute left-0 right-0 z-[55] border-t px-4 py-3 lg:px-12"
            style={{
              bottom: "calc(5.25rem + env(safe-area-inset-bottom))",
              borderColor: accentAlpha(getAccent(projects[activeScene]?.id ?? "00").ink, 0.14),
              background: accentAlpha(getAccent(projects[activeScene]?.id ?? "00").bg, 0.94),
              backdropFilter: "blur(10px)",
              transition: `background-color ${CHROME_TRANSITION_MS}ms ease, border-color ${CHROME_TRANSITION_MS}ms ease`,
            }}
            aria-label={language === "en" ? "Project navigation" : "Navegación de proyectos"}
          >
            <div
              ref={navScrollRef}
              className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {projects.map((p, i) => {
                const projectAccent = getAccent(p.id);
                const sceneAccent = getAccent(projects[activeScene]?.id ?? "00");
                const isOn = i === activeScene;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      navButtonRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => {
                      if (!sectionRef.current) return;
                      smoothScrollTo(
                        getFeaturedWorkSceneScrollY(sectionRef.current, i, projects.length),
                        CINEMATIC_SCROLL.programmaticScroll
                      );
                    }}
                    className="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all duration-300"
                    style={{
                      borderColor: isOn
                        ? accentAlpha(projectAccent.fg, 0.55)
                        : accentAlpha(sceneAccent.ink, 0.14),
                      background: isOn
                        ? accentAlpha(sceneAccent.ink, 0.1)
                        : accentAlpha(sceneAccent.ink, 0.03),
                      boxShadow: isOn ? `0 0 0 1px ${accentAlpha(projectAccent.fg, 0.2)}` : undefined,
                    }}
                    aria-current={isOn ? "true" : undefined}
                    aria-label={`${projectNavLabel(p.title)} — ${p.context}`}
                  >
                    <span
                      className="font-mono text-[9px] font-bold tabular-nums"
                      style={{
                        color: isOn ? projectAccent.fg : accentAlpha(sceneAccent.ink, 0.5),
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span
                        className="font-sans text-xs font-semibold leading-none"
                        style={{ color: sceneAccent.ink }}
                      >
                        {projectNavLabel(p.title)}
                      </span>
                      <span
                        className="hidden font-mono text-[8px] uppercase tracking-wider sm:block"
                        style={{ color: accentAlpha(sceneAccent.ink, 0.48) }}
                      >
                        {p.context}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Scene stage */}
          <div className="absolute inset-0">
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute inset-0 flex items-center px-6 pt-16 pb-28 lg:px-12 lg:pt-20 lg:pb-36"
                style={{
                  willChange: "opacity, transform",
                  backgroundColor: getAccent(p.id).bg,
                }}
              >
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
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          {activeScene === 0 && (
            <div className="pointer-events-none absolute bottom-[calc(8.5rem+env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2">
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.3em]"
                style={{
                  color: `${getAccent(projects[0]?.id ?? "00").ink}50`,
                  transition: "color 0.6s ease",
                }}
              >
                {language === "en" ? "Scroll for next project" : "Scroll para el siguiente"}
              </span>
              <div
                className="h-8 w-[1px] animate-pulse"
                style={{
                  background: `${getAccent(projects[0]?.id ?? "00").ink}55`,
                  transition: "background-color 0.6s ease",
                }}
              />
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
                </article>
              );
            })}
          </div>

          <footer className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-charcoal/5 pt-12 md:flex-row">
            <div className="flex flex-col gap-1">
              <p className="font-sans text-sm font-medium text-charcoal">
                {language === "en" ? "More case studies in the archive" : "Más casos de estudio en el archivo"}
              </p>
              <p className="font-sans text-xs text-charcoal/40">
                {language === "en"
                  ? "12+ notebooks, experiments, and shipped systems."
                  : "12+ notebooks, experimentos y sistemas en producción."}
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
