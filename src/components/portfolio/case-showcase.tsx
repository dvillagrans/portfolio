'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioCaseStudy, resolveText, type LocalizedText } from "@/data/profiles/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/i18n-context";
import { Code2, X } from "lucide-react";

interface CaseShowcaseProps {
  studies: PortfolioCaseStudy[];
  onSectionView?: (section: string) => void;
  onProofClick?: (caseStudy: string, proof: string) => void;
}

export function CaseShowcase({ studies, onSectionView, onProofClick }: CaseShowcaseProps) {
  const { language } = useI18n();
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const localizedCopy = useMemo(
    () => ({
      eyebrow: {
        en: "Signature Cases",
        es: "Casos insignia",
      },
      headline: {
        en: "Context → Action → Outcome.",
        es: "Contexto → Acción → Resultado.",
      },
      description: {
        en: "I show how I move from problem to tangible value with metrics, live dashboards and production evidence.",
        es: "Muestro cómo paso del problema al valor tangible con métricas, tableros vivos y pruebas en producción.",
      },
      quickWin: {
        en: "Quick win",
        es: "Quick win",
      },
      context: {
        en: "Context",
        es: "Contexto",
      },
      action: {
        en: "Action",
        es: "Acción",
      },
      result: {
        en: "Result",
        es: "Resultado",
      },
      viewCode: {
        en: "View Code",
        es: "Ver Código",
      },
    }),
    [],
  );

  useEffect(() => {
    onSectionView?.("cases");
  }, [onSectionView]);

  return (
    <section id="casos" className="space-y-8 sm:space-y-10">
      <motion.div
        className="flex flex-col gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/50">
          {resolveText(localizedCopy.eyebrow, language)}
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          {resolveText(localizedCopy.headline, language)}
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-white/65">
          {resolveText(localizedCopy.description, language)}
        </p>
      </motion.div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 lg:grid-cols-2">
        {studies.map((study) => (
          <motion.article
            key={resolveText(study.title, language)}
            className={cn(
              "group relative flex flex-col gap-4 sm:gap-5 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/12 bg-white/[0.04] p-5 sm:p-6 backdrop-blur transition-all duration-500",
              study.highlight
                ? "lg:row-span-2 lg:p-8 lg:[grid-column:span_1/span_1]"
                : "border-dashed border-white/15 bg-transparent"
            )}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsla(var(--portfolio-primary),0.18)] to-transparent" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-wide text-white/50">
              <span className="rounded-full border border-white/10 px-2.5 sm:px-3 py-1 text-white/70">
                {resolveText(study.category, language)}
              </span>
              <span className="text-[10px] sm:text-xs">{resolveText(study.timeframe, language)}</span>
              {study.quickRead && (
                <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] sm:text-[10px] font-semibold text-white/70">
                  {resolveText(localizedCopy.quickWin, language)}
                </span>
              )}
            </div>

            <div className="relative aspect-[16/9] sm:aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-black">
              <AnimatePresence mode="wait">
                {activeCode === resolveText(study.title, language) && study.codeSnippet ? (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 z-20 flex flex-col bg-[#0d1117] p-4 text-left font-mono text-xs"
                  >
                    <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-white/50">{study.codeSnippet.file}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCode(null);
                        }}
                        className="rounded-full p-1 hover:bg-white/10"
                      >
                        <X className="h-4 w-4 text-white/70" />
                      </button>
                    </div>
                    <div className="overflow-auto text-blue-300">
                      <pre>
                        <code>{study.codeSnippet.code}</code>
                      </pre>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={study.media.src}
                      alt={study.media.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {study.codeSnippet && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCode(resolveText(study.title, language));
                        }}
                        className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-transform hover:scale-105 border border-white/20"
                      >
                        <Code2 className="h-3 w-3" />
                        {resolveText(localizedCopy.viewCode, language)}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {resolveText(study.title, language)}
              </h3>
              <p className="text-sm sm:text-base text-white/70">
                {resolveText(study.summary, language)}
              </p>
            </div>

            <div className="grid gap-2 sm:gap-3 text-xs sm:text-sm text-white/65">
              <InfoRow label={localizedCopy.context} value={study.context} />
              <InfoRow label={localizedCopy.action} value={study.action} />
              <InfoRow label={localizedCopy.result} value={study.result} />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-wide text-white/50">
              <span className="rounded-full bg-[hsla(var(--portfolio-accent),0.18)] px-2.5 sm:px-3 py-1 text-white/70">
                {resolveText(study.metric, language)}
              </span>
              {study.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/12 px-2.5 sm:px-3 py-1 text-white/60">
                  {tag}
                </span>
              ))}
            </div>

            {study.proof.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
                {study.proof.map((proof) => (
                  <Link
                    key={resolveText(proof.label, language)}
                    href={proof.href}
                    target={proof.target ?? "_blank"}
                    rel={proof.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="group/link inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-white/75 transition-all duration-200 hover:border-white/35 hover:bg-white/10 hover:text-white"
                    onClick={() =>
                      onProofClick?.(
                        resolveText(study.title, language),
                        resolveText(proof.label, language),
                      )
                    }
                  >
                    {proof.icon === "github" && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-3 w-3 sm:h-4 sm:w-4 opacity-70 group-hover/link:opacity-100"
                      >
                        <path
                          fill="currentColor"
                          d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.11.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.27-5.23-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 2.87-.39c.97.01 1.94.13 2.87.38 2.2-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.77.11 3.06.73.8 1.18 1.82 1.18 3.07 0 4.39-2.69 5.36-5.25 5.64.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.21.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                        />
                      </svg>
                    )}
                    <span>{resolveText(proof.label, language)}</span>
                  </Link>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: LocalizedText; value: LocalizedText }) {
  const { language } = useI18n();

  return (
    <div className="flex flex-col gap-1 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2.5 sm:py-3 text-white/65 md:flex-row md:items-start md:gap-3">
      <span className="text-[10px] sm:text-xs uppercase tracking-wide text-white/50 md:min-w-[90px]">
        {resolveText(label, language)}
      </span>
      <span className="text-xs sm:text-sm text-white/75">
        {resolveText(value, language)}
      </span>
    </div>
  );
}

