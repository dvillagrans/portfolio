'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { PortfolioToolboxGroup } from "@/data/profiles/types";

interface ToolboxSectionProps {
  toolbox: PortfolioToolboxGroup[];
  onSectionView?: (section: string) => void;
}

export function ToolboxSection({ toolbox, onSectionView }: ToolboxSectionProps) {
  useEffect(() => {
    onSectionView?.("toolbox");
  }, [onSectionView]);

  return (
    <section id="toolbox" className="space-y-8">
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">Toolbox</p>
        <h2 className="text-3xl font-semibold text-white">Herramientas seleccionadas por impacto.</h2>
        <p className="max-w-2xl text-base text-white/65">
          No es una lista infinita; es el stack que uso recurrentemente para entregar valor en tu dominio.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {toolbox.map((group) => (
          <motion.div
            key={group.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="portfolio-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

