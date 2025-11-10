'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PortfolioGuarantee } from "@/data/profiles/types";

interface GuaranteesSectionProps {
  guarantees: PortfolioGuarantee[];
  onSectionView?: (section: string) => void;
}

export function GuaranteesSection({ guarantees, onSectionView }: GuaranteesSectionProps) {
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
          Resultados y garantías
        </p>
        <h2 className="text-3xl font-semibold text-white">Compromisos claros desde el día uno.</h2>
        <p className="max-w-2xl text-base text-white/65">
          Trabajo con SLOs, tiempos medidos y entregables que se verifican en producción.
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
            key={guarantee.label}
            className="rounded-3xl border border-white/12 bg-gradient-to-br from-white/6 via-transparent to-white/2 p-6 backdrop-blur"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <p className="text-sm uppercase tracking-wide text-white/55">{guarantee.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{guarantee.value}</p>
            <p className="mt-3 text-sm text-white/65">{guarantee.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

