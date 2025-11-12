'use client';

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PortfolioHero, PortfolioLink, resolveText } from "@/data/profiles/types";
import type { ProfileMetadata } from "@/data/profiles/metadata";
import { PortfolioCtaButton } from "./cta-button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/i18n-context";

interface HeroSectionProps {
  hero: PortfolioHero;
  metadata: ProfileMetadata;
  onCtaClick?: (label: string) => void;
  onSectionView?: (section: string) => void;
}

export function HeroSection({ hero, metadata, onCtaClick, onSectionView }: HeroSectionProps) {
  const { language } = useI18n();

  const resumeLink: PortfolioLink = useMemo(
    () => ({
      label: {
        en: "Download Resume",
        es: "Descargar CV",
      },
      href: metadata.resumePdf,
      type: "ghost",
      download: true,
    }),
    [metadata.resumePdf],
  );
  const resumeLinkLabel = resolveText(resumeLink.label, language);

  const keyIndicatorsLabel = useMemo(
    () => ({
      en: "Key Indicators",
      es: "Indicadores clave",
    }),
    [],
  );

  useEffect(() => {
    onSectionView?.("hero");
  }, [onSectionView]);

  return (
    <section
      id="hero"
      className={cn(
        "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 lg:p-12",
        "shadow-[0_30px_80px_rgba(8,8,16,0.6)]"
      )}
      style={{
        backgroundImage: `var(--portfolio-hero-gradient), var(--portfolio-illustration)`,
        backgroundSize: "cover, 420px",
        backgroundRepeat: "no-repeat, repeat",
        backgroundPosition: "center, top right",
      }}
    >
      <motion.div
        className="relative flex flex-col gap-6 sm:gap-8 lg:gap-10 lg:flex-row lg:items-end"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex-1 space-y-5 sm:space-y-6 md:space-y-8 text-white">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
            <span>{resolveText(hero.eyebrow, language)}</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-white/70">
              <span className="text-2xl sm:text-3xl">{metadata.icon}</span>
              <span className="text-sm sm:text-base md:text-lg">
                {language === "en" ? metadata.title : metadata.titleEs}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              {resolveText(hero.title, language)}
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-white/80">
              {resolveText(hero.subtitle, language)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="rounded-full border border-white/20 px-3 py-1.5 font-medium">
              {resolveText(hero.credentials, language)}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white/80">
              {resolveText(hero.badge, language)}
            </span>
          </div>

          <p className="text-base text-white/60">{resolveText(hero.persona, language)}</p>

          <div className="flex flex-wrap gap-4">
            {hero.ctas.map((cta) => {
              const ctaLabel = resolveText(cta.label, language);
              return (
                <PortfolioCtaButton
                  key={ctaLabel}
                  link={cta}
                  onClick={() => onCtaClick?.(ctaLabel)}
                />
              );
            })}
            <PortfolioCtaButton
              link={resumeLink}
              size="default"
              className="text-sm font-medium uppercase tracking-wide"
              onClick={() => onCtaClick?.(resumeLinkLabel)}
            />
          </div>
        </div>

        <motion.div
          className="flex w-full sm:max-w-sm lg:max-w-xs flex-col items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10/70 p-5 sm:p-6 text-center text-white backdrop-blur"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-2xl sm:rounded-3xl border-4 border-white/30 shadow-[0_20px_35px_rgba(0,0,0,0.45)]">
              <Image
                src={hero.photo}
                alt={resolveText(hero.title, language)}
                fill
                className="object-cover"
                priority
              />
          </div>
          <div className="space-y-2 text-sm text-white/70">
              <p className="font-semibold text-white/90">{resolveText(keyIndicatorsLabel, language)}</p>
            <ul className="space-y-2 text-left">
                {hero.metrics.map((metric) => (
                  <li key={resolveText(metric.label, language)} className="flex items-start gap-3">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-[hsla(var(--portfolio-accent),0.9)]"></span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {resolveText(metric.value, language)}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-white/60">
                        {resolveText(metric.label, language)}
                      </p>
                      {metric.description && (
                        <p className="mt-1 text-xs text-white/55">
                          {resolveText(metric.description, language)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

