"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { X, ArrowUpRight, ExternalLink } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { ProjectItem } from "@/i18n/types";

interface ProjectSpotlightProps {
  project: ProjectItem | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectSpotlight({ project, open, onClose }: ProjectSpotlightProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { t, language } = useLanguage();
  const labels = t.work;
  const isEn = language === "en";

  // ESC handler
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // GSAP entrance animation (fallback for non-Chromium)
  useEffect(() => {
    if (!open || !overlayRef.current || !contentRef.current) return;

    // Try View Transition API first
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(() => {
        // DOM is already updated; the transition captures the state change
      });
    } else {
      // GSAP fallback
      if (reduced) {
        gsap.set(overlayRef.current, { opacity: 1 });
        gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out", delay: 0.1 }
        );
      }
    }
  }, [open, reduced]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!open || !project) return null;

  const isExternal = project.href.startsWith("http");

  return (
    <div
      ref={overlayRef}
      data-spotlight-backdrop
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-graphite rounded-[2rem] border border-white/10 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close spotlight"
          className="absolute top-4 right-4 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/10 text-offwhite hover:bg-white/20 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-offwhite/40">
            <span className="text-warm/70">{project.context}</span>
            {project.date && (
              <>
                <span>·</span>
                <span>{project.date}</span>
              </>
            )}
          </div>

          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-offwhite mb-2">
            {project.title}
          </h2>
          <p className="font-sans text-sm text-offwhite/55 leading-relaxed mb-8">
            {project.subtitle}
          </p>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 pb-8 border-b border-white/10">
              {project.metrics.map((m, i) => (
                <div key={i}>
                  <p className="font-mono text-2xl font-bold tabular-nums text-warm">{m.value}</p>
                  <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-offwhite/40 mt-1">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-6 mb-8">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/35 mb-2">
                {labels.labelScope}
              </p>
              <p className="font-sans text-sm text-offwhite/65 leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/35 mb-2">
                {labels.labelSystem}
              </p>
              <p className="font-sans text-sm text-offwhite/65 leading-relaxed">{project.system}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/35 mb-2">
                {labels.labelOutcome}
              </p>
              <p className="font-sans text-sm text-offwhite/65 leading-relaxed">{project.outcome}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/35 mb-2">
                {labels.labelRole}
              </p>
              <p className="font-sans text-sm text-offwhite/65 leading-relaxed">{project.role}</p>
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[9px] font-medium uppercase tracking-wider text-offwhite/45 bg-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {isExternal ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-3 bg-warm text-charcoal px-8 py-4 rounded-xl font-sans text-xs font-semibold transition-all hover:bg-warm/80 spring-press"
              >
                {isEn ? "Open project" : "Abrir proyecto"}
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <a
                href={project.caseStudy ?? project.href}
                className="inline-flex min-h-[44px] items-center gap-3 bg-warm text-charcoal px-8 py-4 rounded-xl font-sans text-xs font-semibold transition-all hover:bg-warm/80 spring-press"
              >
                {isEn ? "Read case study" : "Leer caso de estudio"}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
