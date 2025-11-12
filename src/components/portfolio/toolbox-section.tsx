'use client';

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioToolboxGroup, resolveText } from "@/data/profiles/types";
import { IconCloud } from "@/components/ui/icon-cloud";
import { createToolIconNode } from "./tool-icon-utils";
import { TechSphere } from "./tech-sphere";
import { useI18n } from "@/contexts/i18n-context";

interface ToolboxSectionProps {
  toolbox: PortfolioToolboxGroup[];
  coreTools?: string[];
  onSectionView?: (section: string) => void;
}

export function ToolboxSection({ toolbox, coreTools = [], onSectionView }: ToolboxSectionProps) {
  const { language } = useI18n();

  const localizedCopy = useMemo(
    () => ({
      eyebrow: {
        en: "Toolbox",
        es: "Toolbox",
      },
      headlineCore: {
        en: "I don't just know tools—I design coherent systems.",
        es: "No solo sé herramientas, sé diseñar sistemas coherentes.",
      },
      descriptionCore: {
        en: "These are my non-negotiable technical pillars. Everything else adapts to the problem.",
        es: "Estas son mis pilares técnicos no negociables. Lo demás se adapta según el problema.",
      },
      headlineNoCore: {
        en: "Tools selected for impact.",
        es: "Herramientas seleccionadas por impacto.",
      },
      descriptionNoCore: {
        en: "Not an infinite list; it's the stack I reuse to deliver value in your domain.",
        es: "No es una lista infinita; es el stack que uso recurrentemente para entregar valor en tu dominio.",
      },
      pillarsTitle: {
        en: "Technical pillars",
        es: "Pilares técnicos",
      },
      pillarsDescription: {
        en: "Core tools that define my data architecture: modeling, orchestration, and quality.",
        es: "Herramientas core que definen mi arquitectura de datos: modelado, orquestación y calidad.",
      },
      ecosystemTitle: {
        en: "Complementary ecosystem",
        es: "Ecosistema complementario",
      },
      ecosystemDescription: {
        en: "Flexible stack I adapt per challenge: streaming, BI, warehousing, and more.",
        es: "Stack flexible que adapto según el problema: streaming, BI, warehousing y más.",
      },
      ecosystemHeading: {
        en: "Ecosystem in motion",
        es: "Ecosistema en movimiento",
      },
      ecosystemCopy: {
        en: "Explore the tools I activate based on the challenge: data, infrastructure, automation, and BI without silos.",
        es: "Explora las herramientas que activo según el reto: datos, infraestructura, automatización y BI sin silos.",
      },
      interactionHint: {
        en: "Drag to rotate • Click to center",
        es: "Arrastra para rotar • Click para centrar",
      },
      moreSuffix: {
        en: "more",
        es: "más",
      },
    }),
    [],
  );
  useEffect(() => {
    onSectionView?.("toolbox");
  }, [onSectionView]);

  // Flatten all tools for display
  const allTools = toolbox.flatMap(group => group.items);
  const hasCore = coreTools.length > 0;
  const toolboxIcons = useMemo(
    () =>
      toolbox.flatMap((group, groupIndex) =>
        group.items.map((item, itemIndex) =>
          createToolIconNode(item, {
            accentIndex: groupIndex * 4 + itemIndex,
          }),
        ),
      ),
    [toolbox],
  );

  return (
    <section id="toolbox" className="space-y-8">
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
          {resolveText(hasCore ? localizedCopy.headlineCore : localizedCopy.headlineNoCore, language)}
        </h2>
        <p className="max-w-2xl text-base text-white/65">
          {resolveText(hasCore ? localizedCopy.descriptionCore : localizedCopy.descriptionNoCore, language)}
        </p>
      </motion.div>

      {hasCore ? (
        <motion.div
          className="space-y-12"
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
          {/* TechSphere - Interactive 3D visualization */}
          <motion.div
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-8 backdrop-blur"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <TechSphere
              coreTools={coreTools}
              ecosystemTools={allTools.filter(tool => !coreTools.includes(tool))}
            />
          </motion.div>

          {/* Legend / Info */}
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-3 w-3 rounded-full bg-white/80 animate-pulse" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                  {resolveText(localizedCopy.pillarsTitle, language)}
                </h3>
              </div>
              <p className="text-sm text-white/60">
                {resolveText(localizedCopy.pillarsDescription, language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {coreTools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-semibold text-white/80"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                  {resolveText(localizedCopy.ecosystemTitle, language)}
                </h3>
              </div>
              <p className="text-sm text-white/60">
                {resolveText(localizedCopy.ecosystemDescription, language)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {allTools.filter(tool => !coreTools.includes(tool)).slice(0, 8).map((tool) => (
                  <span
                    key={tool}
                    className="text-xs text-white/50"
                  >
                    {tool}
                  </span>
                ))}
                {allTools.filter(tool => !coreTools.includes(tool)).length > 8 && (
                  <span className="text-xs text-white/40">
                    +
                    {allTools.filter(tool => !coreTools.includes(tool)).length - 8}{" "}
                    {resolveText(localizedCopy.moreSuffix, language)}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
              },
            },
          }}
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent p-6 backdrop-blur"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]" />
            <div className="relative flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center">
                <IconCloud icons={toolboxIcons} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/50">
                  {resolveText(localizedCopy.ecosystemHeading, language)}
                </p>
                <p className="mt-2 text-base text-white/65">
                  {resolveText(localizedCopy.ecosystemCopy, language)}
                </p>
              </div>
              <motion.span
                className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs text-white/50"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {resolveText(localizedCopy.interactionHint, language)}
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {toolbox.map((group, groupIndex) => (
              <motion.div
                key={resolveText(group.title, language)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-white/20"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="h-full w-full bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent" />
                </div>
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">
                    {resolveText(group.title, language)}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="portfolio-chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75 transition group-hover:border-white/20 group-hover:text-white/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/[0.04] blur-2xl transition group-hover:bg-white/[0.06]" />
                <div className="pointer-events-none absolute -right-16 -bottom-16 h-36 w-36 rounded-full bg-white/[0.03] blur-3xl transition group-hover:bg-white/[0.06]" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

