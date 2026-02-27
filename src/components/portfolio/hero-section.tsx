'use client';

import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PortfolioHero, PortfolioLink, resolveText } from "@/data/profiles/types";
import type { ProfileMetadata } from "@/data/profiles/metadata";
import { PortfolioCtaButton } from "./cta-button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/i18n-context";
import { Download, Sparkles, Activity, Target, Zap, Code2, Terminal, Cpu, Network, Globe } from "lucide-react";

interface HeroSectionProps {
  hero: PortfolioHero;
  metadata: ProfileMetadata;
  onCtaClick?: (label: string) => void;
  onSectionView?: (section: string) => void;
}

export function HeroSection({ hero, metadata, onCtaClick, onSectionView }: HeroSectionProps) {
  const { language } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for ambient light
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

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

  useEffect(() => {
    onSectionView?.("hero");
  }, [onSectionView]);

  const icons = [Activity, Network, Cpu, Globe];

  return (
    <section
      id="hero"
      className="relative w-full rounded-[2.5rem] border border-white/10 bg-[#05010a]/60 p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_0_100px_-20px_rgba(147,51,234,0.15)] backdrop-blur-3xl"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Dynamic Ambient Light tracking mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-50 transition-opacity duration-300"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(147,51,234,0.15), transparent 40%)`
          ),
        }}
      />

      {/* Static Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/img/patterns/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Content: Typography & CTAs */}
        <div className="flex-1 flex flex-col items-start gap-8 w-full">
          {/* Eyebrow & Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300 backdrop-blur-md shadow-[0_0_20px_rgba(147,51,234,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              {resolveText(hero.eyebrow, language)}
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md">
              <span className="text-lg leading-none">{metadata.icon}</span>
              {language === "en" ? metadata.title : metadata.titleEs}
            </div>
          </motion.div>

          {/* Titles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="space-y-6 w-full"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tighter text-white leading-[1.05]">
              {resolveText(hero.title, language).split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed font-light border-l-2 border-white/10 pl-6">
              {resolveText(hero.subtitle, language)}
            </p>
          </motion.div>

          {/* Credentials & Persona */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-purple-300 font-mono bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20">
                <Terminal className="w-4 h-4" />
                {resolveText(hero.credentials, language)}
              </div>
              <div className="flex items-center gap-2 text-blue-300 font-mono bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
                <Code2 className="w-4 h-4" />
                {resolveText(hero.badge, language)}
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            {hero.ctas.map((cta) => {
              const ctaLabel = resolveText(cta.label, language);
              return (
                <PortfolioCtaButton
                  key={ctaLabel}
                  link={cta}
                  onClick={() => onCtaClick?.(ctaLabel)}
                  className={cn(
                    "px-8 py-6 text-base rounded-2xl font-bold transition-all duration-300",
                    cta.type === "primary" 
                      ? "bg-white text-black hover:bg-white/90 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  )}
                />
              );
            })}
            <PortfolioCtaButton
              link={resumeLink}
              size="lg"
              className="px-6 py-6 text-base rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300"
              onClick={() => onCtaClick?.(resumeLinkLabel)}
              icon={<Download className="mr-2 h-5 w-5" />}
            />
          </motion.div>
        </div>

        {/* Right Content: Abstract Data Core & Metrics */}
        <motion.div 
          className="w-full lg:w-[480px] relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          {/* Abstract Core Visualization */}
          <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div 
              className="absolute inset-0 rounded-full border border-white/5 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            {/* Middle Ring */}
            <motion.div 
              className="absolute inset-8 rounded-full border border-purple-500/20 border-t-purple-500/60"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner Core */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.3)]">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
            </div>

            {/* Floating Metrics */}
            {hero.metrics.map((metric, i) => {
              const Icon = icons[i % icons.length];
              // Position metrics in a circle around the core
              const angle = (i * (360 / hero.metrics.length)) * (Math.PI / 180);
              const radius = 160; // Distance from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={resolveText(metric.label, language)}
                  className="absolute flex flex-col items-center justify-center gap-1 p-4 rounded-2xl bg-[#05010a]/80 border border-white/10 backdrop-blur-xl shadow-xl min-w-[120px]"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x, y, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), type: "spring" }}
                  whileHover={{ scale: 1.1, zIndex: 20, borderColor: "rgba(147,51,234,0.5)" }}
                >
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-xl font-black text-white tracking-tight">{resolveText(metric.value, language)}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold text-center">
                    {resolveText(metric.label, language)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
