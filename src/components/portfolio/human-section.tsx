'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PortfolioAnecdote, PortfolioWorkingStyle } from "@/data/profiles/types";

interface HumanSectionProps {
  anecdote: PortfolioAnecdote;
  workingStyle: PortfolioWorkingStyle;
  onSectionView?: (section: string) => void;
}

export function HumanSection({ anecdote, workingStyle, onSectionView }: HumanSectionProps) {
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
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">Señales humanas</p>
        <h3 className="mt-3 text-2xl font-semibold text-white">{anecdote.title}</h3>
        <p className="mt-4 text-base text-white/70">{anecdote.story}</p>
        <div className="mt-6 rounded-2xl border border-white/12 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/55">Lo que aprendí</p>
          <p className="mt-2 text-sm text-white/75">{anecdote.lesson}</p>
        </div>
      </motion.article>

      <motion.aside
        className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">Cómo trabajo</p>
        <ul className="mt-5 space-y-4 text-sm text-white/70">
          <li>
            <span className="text-white/55">Disponibilidad:</span> {workingStyle.availability}
          </li>
          <li>
            <span className="text-white/55">Zona horaria:</span> {workingStyle.timezone}
          </li>
          <li>
            <span className="text-white/55">Comunicación:</span> {workingStyle.communication}
          </li>
          <li>
            <span className="text-white/55">Handoff:</span> {workingStyle.handoff}
          </li>
        </ul>
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wide text-white/55">Herramientas</p>
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

