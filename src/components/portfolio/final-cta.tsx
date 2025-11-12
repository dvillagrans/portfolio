'use client';

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioFinalCTA, resolveText } from "@/data/profiles/types";
import { PortfolioCtaButton } from "./cta-button";
import { useI18n } from "@/contexts/i18n-context";

interface FinalCtaProps {
  cta: PortfolioFinalCTA;
  onCtaClick?: (label: string) => void;
  onSectionView?: (section: string) => void;
}

export function FinalCta({ cta, onCtaClick, onSectionView }: FinalCtaProps) {
  const { language } = useI18n();
  const copy = useMemo(
    () => ({
      eyebrow: {
        en: "Next Step",
        es: "Próximo paso",
      },
    }),
    [],
  );

  useEffect(() => {
    onSectionView?.("final-cta");
  }, [onSectionView]);

  const primaryLabel = resolveText(cta.primary.label, language);
  const secondaryLabel = cta.secondary ? resolveText(cta.secondary.label, language) : undefined;

  return (
    <motion.section
      id="cta-final"
      className="relative overflow-hidden rounded-3xl border border-white/15 p-10 text-white shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, hsla(var(--portfolio-primary),0.28) 0%, transparent 55%), radial-gradient(circle at 80% 0%, hsla(var(--portfolio-accent),0.28) 0%, transparent 45%), linear-gradient(135deg, rgba(10,12,24,0.92) 0%, rgba(15,16,32,0.96) 100%)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
          {resolveText(copy.eyebrow, language)}
        </p>
        <h2 className="text-3xl font-semibold leading-tight">{resolveText(cta.title, language)}</h2>
        <p className="max-w-2xl text-base text-white/80">{resolveText(cta.subtitle, language)}</p>
        <div className="flex flex-wrap gap-4">
          <PortfolioCtaButton
            link={cta.primary}
            onClick={() => onCtaClick?.(primaryLabel)}
          />
          {cta.secondary && secondaryLabel && (
            <PortfolioCtaButton
              link={cta.secondary}
              className="bg-white/5 text-white/80 hover:bg-white/10"
              onClick={() => onCtaClick?.(secondaryLabel)}
            />
          )}
        </div>
        {cta.note && <p className="text-sm text-white/60">{resolveText(cta.note, language)}</p>}
        {cta.slots && (
          <div className="flex flex-wrap gap-3 text-sm text-white/60">
            {cta.slots.map((slot) => {
              const slotText = resolveText(slot, language);
              return (
                <span key={slotText} className="rounded-full border border-white/15 px-4 py-2">
                  {slotText}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
}

