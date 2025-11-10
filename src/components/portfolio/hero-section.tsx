'use client';

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PortfolioHero } from "@/data/profiles/types";
import { ProfileMetadata } from "@/contexts/profile-context";
import { PortfolioCtaButton } from "./cta-button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  hero: PortfolioHero;
  metadata: ProfileMetadata;
  onCtaClick?: (label: string) => void;
  onSectionView?: (section: string) => void;
}

export function HeroSection({ hero, metadata, onCtaClick, onSectionView }: HeroSectionProps) {
  const resumeLink = {
    label: "Descargar CV",
    href: metadata.resumePdf,
    type: "ghost" as const,
    download: true,
  };

  useEffect(() => {
    onSectionView?.("hero");
  }, [onSectionView]);

  return (
    <section
      id="hero"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-12",
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
        className="relative flex flex-col gap-10 lg:flex-row lg:items-end"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex-1 space-y-8 text-white">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 backdrop-blur">
            <span>{hero.eyebrow}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-lg text-white/70">
              <span className="text-3xl">{metadata.icon}</span>
              <span>{metadata.titleEs}</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-lg text-white/80">{hero.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="rounded-full border border-white/20 px-3 py-1.5 font-medium">
              {hero.credentials}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1.5 font-medium text-white/80">
              {hero.badge}
            </span>
          </div>

          <p className="text-base text-white/60">{hero.persona}</p>

          <div className="flex flex-wrap gap-4">
            {hero.ctas.map((cta) => (
              <PortfolioCtaButton
                key={cta.label}
                link={cta}
                onClick={() => onCtaClick?.(cta.label)}
              />
            ))}
            <PortfolioCtaButton
              link={resumeLink}
              size="default"
              className="text-sm font-medium uppercase tracking-wide"
              onClick={() => onCtaClick?.(resumeLink.label)}
            />
          </div>
        </div>

        <motion.div
          className="flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/10/70 p-6 text-center text-white backdrop-blur"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-4 border-white/30 shadow-[0_20px_35px_rgba(0,0,0,0.45)]">
            <Image
              src={hero.photo}
              alt={hero.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <p className="font-semibold text-white/90">Indicadores clave</p>
            <ul className="space-y-2 text-left">
              {hero.metrics.map((metric) => (
                <li key={metric.label} className="flex items-start gap-3">
                  <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-[hsla(var(--portfolio-accent),0.9)]"></span>
                  <div>
                    <p className="text-sm font-semibold text-white">{metric.value}</p>
                    <p className="text-xs uppercase tracking-wide text-white/60">
                      {metric.label}
                    </p>
                    {metric.description && (
                      <p className="mt-1 text-xs text-white/55">{metric.description}</p>
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

