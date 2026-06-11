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
import { Scene, getAccent } from "./Scene";
import { BespokeCovidScene } from "./BespokeCovidScene";

const ProjectSpotlight = dynamic(
  () => import("../portfolio/ProjectSpotlight"),
  { ssr: false }
);

const EyeNetCard = dynamic(() => import("../ui/EyeNetCard"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

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
          scrub: 0.15,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: "power3.out",
            delay: 0.15,
            inertia: false,
            directional: true,
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
      const fadeFraction = 0.35;
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

  const renderHeader = (variant: "cinematic" | "static", inkOverride?: string) => {
    const ink = inkOverride ?? "#1c1c1e";
    const inkSoft = `${ink}66`;
    const inkLine = `${ink}33`;
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
              style={{ background: inkLine, transition: "background-color 0.6s ease" }}
            />
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ color: inkSoft, transition: "color 0.6s ease" }}
            >
              02. {language === "en" ? "Featured Systems" : "Sistemas Destacados"}
            </span>
          </div>
          <h2
            className={
              variant === "cinematic"
                ? "font-serif text-2xl tracking-tight md:text-3xl"
                : "font-serif text-5xl tracking-tight md:text-7xl"
            }
            style={{ color: ink, transition: "color 0.6s ease" }}
          >
            {t.work.title}
          </h2>
          {variant === "static" && (
            <p className="mt-4 max-w-md font-sans text-sm" style={{ color: inkSoft }}>
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
          <div className="pointer-events-none absolute left-12 top-12 z-30">
            {renderHeader(
              "cinematic",
              getAccent(projects[activeScene]?.id ?? "00").ink
            )}
          </div>

          {/* Progress rail — local to the pinned stage (right side).
              The global ScrollProgressRail (layout, left side, z-40) serves
              a different purpose and does not visually overlap. */}
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
          <div className="absolute inset-0">
            {projects.map((p, i) => {
              const isBespoke = p.id === "01" || p.type === "special";
              return (
                <div
                  key={p.id}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className={
                    isBespoke
                      ? "absolute inset-0"
                      : "absolute inset-0 flex items-center px-12 pt-32 pb-12 lg:px-24"
                  }
                  style={{ willChange: "opacity, transform" }}
                >
                  {p.type === "special" ? (
                    <EyeNetCard variant="bespoke" />
                  ) : p.id === "01" ? (
                    <BespokeCovidScene
                      project={p}
                      language={language}
                      isActive={i === activeScene}
                      index={i}
                      onOpenSpotlight={handleOpenSpotlight}
                      reduced={reduced}
                    />
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
              );
            })}
          </div>

          {/* Scroll hint */}
          {activeScene === 0 && (
            <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2">
              <span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.3em]"
                style={{
                  color: `${getAccent(projects[0]?.id ?? "00").ink}66`,
                  transition: "color 0.6s ease",
                }}
              >
                {language === "en" ? "Scroll to navigate systems" : "Hacé scroll para navegar"}
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
