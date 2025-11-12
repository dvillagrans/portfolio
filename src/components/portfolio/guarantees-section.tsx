'use client';

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioGuarantee, resolveText } from "@/data/profiles/types";
import { useI18n } from "@/contexts/i18n-context";

interface GuaranteesSectionProps {
  guarantees: PortfolioGuarantee[];
  onSectionView?: (section: string) => void;
}

export function GuaranteesSection({ guarantees, onSectionView }: GuaranteesSectionProps) {
  const { language } = useI18n();
  const localizedCopy = useMemo(
    () => ({
      eyebrow: {
        en: "Results & Guarantees",
        es: "Resultados y garantías",
      },
      headline: {
        en: "Clear commitments from day one.",
        es: "Compromisos claros desde el día uno.",
      },
      description: {
        en: "I work with SLOs, measured timelines, and deliverables validated in production.",
        es: "Trabajo con SLOs, tiempos medidos y entregables que se verifican en producción.",
      },
    }),
    [],
  );

  useEffect(() => {
    onSectionView?.("guarantees");
  }, [onSectionView]);

  return (
    <section id="garantias" className="space-y-8">
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
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {guarantees.map((guarantee) => (
          <motion.div
            key={resolveText(guarantee.label, language)}
            className="rounded-3xl border border-white/12 bg-gradient-to-br from-white/6 via-transparent to-white/2 p-6 backdrop-blur"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <p className="text-sm uppercase tracking-wide text-white/55">
              {resolveText(guarantee.label, language)}
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {resolveText(guarantee.value, language)}
            </p>
            <p className="mt-3 text-sm text-white/65">
              {resolveText(guarantee.description, language)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

