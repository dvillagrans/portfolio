'use client';

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioAnecdote, PortfolioWorkingStyle, resolveText } from "@/data/profiles/types";
import { useI18n } from "@/contexts/i18n-context";

interface HumanSectionProps {
  anecdote: PortfolioAnecdote;
  workingStyle: PortfolioWorkingStyle;
  onSectionView?: (section: string) => void;
}

export function HumanSection({ anecdote, workingStyle, onSectionView }: HumanSectionProps) {
  const { language } = useI18n();
  const localizedCopy = useMemo(
    () => ({
      eyebrow: {
        en: "Human signals",
        es: "Señales humanas",
      },
      lesson: {
        en: "What I learned",
        es: "Lo que aprendí",
      },
      howIWork: {
        en: "How I work",
        es: "Cómo trabajo",
      },
      availability: {
        en: "Availability:",
        es: "Disponibilidad:",
      },
      timezone: {
        en: "Timezone:",
        es: "Zona horaria:",
      },
      communication: {
        en: "Communication:",
        es: "Comunicación:",
      },
      handoff: {
        en: "Handoff:",
        es: "Handoff:",
      },
      tools: {
        en: "Tools",
        es: "Herramientas",
      },
    }),
    [],
  );

  useEffect(() => {
    onSectionView?.("human");
  }, [onSectionView]);

  return (
    <section id="humano" className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <motion.article
        className="rounded-3xl border border-white/12 bg-gradient-to-br from-white/7 via-white/3 to-transparent p-6 text-white backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">
          {resolveText(localizedCopy.eyebrow, language)}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{resolveText(anecdote.title, language)}</h3>
        <p className="mt-4 text-base text-white/70">{resolveText(anecdote.story, language)}</p>
        <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/55">
            {resolveText(localizedCopy.lesson, language)}
          </p>
          <p className="mt-2 text-sm text-white/75">{resolveText(anecdote.lesson, language)}</p>
        </div>
      </motion.article>

      <motion.aside
        className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">
          {resolveText(localizedCopy.howIWork, language)}
        </p>
        <ul className="mt-5 space-y-4 text-sm text-white/70">
          <li>
            <span className="text-white/55">{resolveText(localizedCopy.availability, language)}</span>{" "}
            {resolveText(workingStyle.availability, language)}
          </li>
          <li>
            <span className="text-white/55">{resolveText(localizedCopy.timezone, language)}</span>{" "}
            {resolveText(workingStyle.timezone, language)}
          </li>
          <li>
            <span className="text-white/55">{resolveText(localizedCopy.communication, language)}</span>{" "}
            {resolveText(workingStyle.communication, language)}
          </li>
          <li>
            <span className="text-white/55">{resolveText(localizedCopy.handoff, language)}</span>{" "}
            {resolveText(workingStyle.handoff, language)}
          </li>
        </ul>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wide text-white/55">
            {resolveText(localizedCopy.tools, language)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {workingStyle.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.aside>
    </section>
  );
}

