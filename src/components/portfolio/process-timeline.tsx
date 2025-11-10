'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PortfolioProcessStep } from "@/data/profiles/types";
import { resolveIcon } from "./icon-map";

interface ProcessTimelineProps {
  steps: PortfolioProcessStep[];
  onSectionView?: (section: string) => void;
}

export function ProcessTimeline({ steps, onSectionView }: ProcessTimelineProps) {
  useEffect(() => {
    onSectionView?.("process");
  }, [onSectionView]);

  return (
    <section id="proceso" className="space-y-10">
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">
          Mi proceso
        </p>
        <h2 className="text-3xl font-semibold text-white">Tramos claros, entregables visibles.</h2>
        <p className="max-w-2xl text-base text-white/65">
          Tres fases que se repiten en cada engagement, ajustadas a tu stack y equipo para que nadie se
          pierda en el camino.
        </p>
      </motion.div>

      <motion.ol
        className="relative grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {steps.map((step, index) => (
          <motion.li
            key={step.title}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.08]"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="absolute inset-x-0 -top-[1px] h-[3px] rounded-full bg-gradient-to-r from-[hsla(var(--portfolio-primary),0.6)] to-[hsla(var(--portfolio-accent),0.5)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white">
                {index + 1}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsla(var(--portfolio-primary),0.12)] text-white/80">
                {resolveIcon(step.icon, "h-5 w-5")}
              </span>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/70">{step.description}</p>
              <p className="text-sm text-white/55">{step.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

