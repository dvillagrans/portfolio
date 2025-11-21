'use client';

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioProcessStep, resolveText } from "@/data/profiles/types";
import { useI18n } from "@/contexts/i18n-context";
import { ThematicProcess } from "./features/thematic-process";

interface ProcessTimelineProps {
  steps: PortfolioProcessStep[];
  onSectionView?: (section: string) => void;
}

export function ProcessTimeline({ steps, onSectionView }: ProcessTimelineProps) {
  const { language } = useI18n();

  const localizedCopy = useMemo(
    () => ({
      eyebrow: {
        en: "My Process",
        es: "Mi proceso",
      },
      headline: {
        en: "Clear milestones, visible deliverables.",
        es: "Tramos claros, entregables visibles.",
      },
      description: {
        en: "Three phases repeated in every engagement, adapted to your stack and team so nobody gets lost along the way.",
        es: "Tres fases que se repiten en cada engagement, ajustadas a tu stack y equipo para que nadie se pierda en el camino.",
      },
    }),
    [],
  );

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
          {resolveText(localizedCopy.eyebrow, language)}
        </p>
        <h2 className="text-3xl font-semibold text-white">
          {resolveText(localizedCopy.headline, language)}
        </h2>
        <p className="max-w-2xl text-base text-white/65">
          {resolveText(localizedCopy.description, language)}
        </p>
      </motion.div>

      <motion.div
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
        <ThematicProcess steps={steps} />
      </motion.div>
    </section>
  );
}

