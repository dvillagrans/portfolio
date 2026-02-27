"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useI18n } from "@/contexts/i18n-context";
import { ProfileType } from "@/contexts/profile-context";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { getLandingCards } from "@/data/landing-cards";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

/* Per-card ambient glow color (rgb) matching each profile's accent */
const CARD_GLOWS = [
  "145,112,255", // ml-engineer    – violet
  "31,217,211",  // data-engineer  – cyan
  "71,207,132",  // devops-engineer– emerald
  "244,184,96",  // data-analyst   – amber
] as const;

/* ─── Main page ─────────────────────────────────────────────────── */
export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const cards = useMemo(() => getLandingCards(language), [language]);

  // Mouse tracking for the ambient orb
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSelect = (profile: ProfileType) => {
    localStorage.setItem("profile", profile);
    router.push(`/${profile}`);
  };

  return (
    <div className="relative min-h-dvh w-full bg-[#020204] overflow-x-hidden text-white selection:bg-white/20 flex flex-col lg:flex-row items-center justify-center max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-20 py-10 lg:py-0 gap-8 lg:gap-20">
      
      {/* ── Ambient Mouse Orb ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] opacity-30 mix-blend-screen z-0"
        style={{
          x: useTransform(smoothX, (v) => v - 400),
          y: useTransform(smoothY, (v) => v - 400),
          background: hovered !== null
            ? `radial-gradient(circle, rgba(${CARD_GLOWS[hovered]}, 0.6) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(255,255,255, 0.15) 0%, transparent 70%)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* ── Grid / Noise Overlay ── */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.015] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      {/* ════ LEFT COLUMN: DYNAMIC SHOWCASE ════ */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center relative min-h-[30vh] lg:min-h-0 lg:h-full z-10">
        <AnimatePresence mode="wait">
          {hovered === null ? (
            <motion.div
              key="default"
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)", y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  {isMounted && <Image src={DATA.avatarUrl} alt="Diego" fill className="object-cover" />}
                </div>
                <span className="text-xs font-medium tracking-wide text-white/80">Diego Villagran</span>
                <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-white/40">Available</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tighter leading-[0.9]">
                {language === "en" ? "Build" : "Crea"} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/80 italic font-serif font-light">
                  {language === "en" ? "with purpose." : "con propósito."}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/40 max-w-md leading-relaxed">
                {language === "en"
                  ? "I engineer data systems, deploy machine learning models, and build robust infrastructure. Select a profile to explore my work."
                  : "Diseño sistemas de datos, despliego modelos de ML y construyo infraestructura robusta. Selecciona un perfil para explorar."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-6 relative z-10"
            >
              {/* Massive Background Decoration for the hovered item */}
              <div 
                className="absolute -inset-20 -z-10 opacity-30 pointer-events-none scale-150 origin-left"
                style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)' }}
              >
                {cards[hovered].decoration}
              </div>

              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color: `rgb(${CARD_GLOWS[hovered]})` }}>
                <Sparkles className="w-3 h-3" />
                {language === "en" ? "Profile Selected" : "Perfil Seleccionado"}
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-black tracking-tighter leading-[0.95]">
                {cards[hovered].title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>

              <p className="text-base sm:text-lg text-white/60 max-w-md leading-relaxed border-l-2 pl-4" style={{ borderColor: `rgba(${CARD_GLOWS[hovered]}, 0.5)` }}>
                {cards[hovered].description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {cards[hovered].tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ════ RIGHT COLUMN: INTERACTIVE STACK ════ */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-4 relative z-20 pb-20 lg:pb-0">
        {cards.map((card, i) => {
          const Icon = card.icon;
          const isActive = hovered === i;
          const isDimmed = hovered !== null && hovered !== i;

          return (
            <motion.button
              key={card.profile}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(card.profile)}
              animate={{
                height: isActive ? (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 160 : 120) : 80,
                opacity: isDimmed ? 0.4 : 1,
                scale: isActive ? 1.02 : isDimmed ? 0.98 : 1,
                x: isActive ? -10 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="group relative w-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden text-left flex flex-col justify-center px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              style={{
                boxShadow: isActive ? `0 20px 40px -10px rgba(${CARD_GLOWS[i]}, 0.3), inset 0 0 0 1px rgba(${CARD_GLOWS[i]}, 0.5)` : 'none'
              }}
            >
              {/* Hover Gradient Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, rgba(${CARD_GLOWS[i]}, 0.15) 0%, transparent 100%)` }}
              />

              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl border shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                      card.iconWrapper
                    )}
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                      {card.title}
                    </h3>
                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs lg:text-sm text-white/50 mt-1 max-w-[80%]">
                            {language === "en" ? "Click to enter this profile" : "Haz clic para entrar a este perfil"}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-300"
                  style={{
                    transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                    opacity: isActive ? 1 : 0.5
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
