'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PortfolioMetric, PortfolioProblem } from "@/data/profiles/types";

interface ProblemsSectionProps {
  problems: PortfolioProblem[];
  metrics: PortfolioMetric[];
  onSectionView?: (section: string) => void;
}

export function ProblemsSection({ problems, metrics, onSectionView }: ProblemsSectionProps) {
  useEffect(() => {
    onSectionView?.("problems");
  }, [onSectionView]);

  return (
    <section id="problemas" className="space-y-8 sm:space-y-10">
      <motion.div
        className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/50">
            Qué problemas resuelvo
          </p>
          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-white">Resultados medibles, no promesas.</h2>
          <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-white/65">
            Cada engagement inicia entendiendo los riesgos reales: dónde se rompen tus pipelines, qué
            métricas duelen y cómo se mide el éxito.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm text-white/60">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 px-3 sm:px-4 py-4 sm:py-5 text-center backdrop-blur"
            >
              <p className="text-xl sm:text-2xl font-semibold text-white">{metric.value}</p>
              <p className="mt-1 uppercase tracking-wide text-[10px] sm:text-xs text-white/55">{metric.label}</p>
              {metric.description && (
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/50">{metric.description}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {problems.map((problem) => (
          <motion.article
            key={problem.title}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/3 to-transparent p-5 sm:p-6 md:p-7 backdrop-blur transition-transform duration-300 hover:-translate-y-2"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[hsla(var(--portfolio-primary),0.12)] blur-2xl transition-all duration-500 group-hover:scale-125" />
            <div className="space-y-2 sm:space-y-3">
              {problem.metric && (
                <span className="inline-flex rounded-full bg-[hsla(var(--portfolio-accent),0.18)] px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70">
                  {problem.metric}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-white">{problem.title}</h3>
              <p className="text-xs sm:text-sm text-white/70">{problem.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

