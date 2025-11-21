"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useI18n } from "@/contexts/i18n-context";
import { ProfileType } from "@/contexts/profile-context";
import Image from "next/image";
import { BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { getLandingCards, LandingCard } from "@/data/landing-cards";
import { LandingCardComponent } from "@/components/landing/landing-card";

export default function LandingPage() {
  const router = useRouter();
  const { language } = useI18n();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProfileSelect = (profile: ProfileType) => {
    localStorage.setItem("profile", profile);
    router.push(`/${profile}`);
  };

  const cards = useMemo<LandingCard[]>(() => getLandingCards(language), [language]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background text-foreground">
      {/* Scrollable container for mobile, fixed for desktop if it fits */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5">
        <div className="mx-auto flex min-h-full max-w-7xl flex-col rounded-2xl sm:rounded-3xl border border-white/10 bg-black/25 p-3 sm:p-5 md:p-6 lg:p-7 backdrop-blur-2xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-3.5"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-500/15 via-blue-500/12 to-cyan-500/12 blur-lg opacity-45" />
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16" suppressHydrationWarning>
                {isMounted ? (
                  <Image
                    src={DATA.avatarUrl}
                    alt="Diego Villagran"
                    fill
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/15 animate-pulse" />
                )}
              </div>
            </div>

            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-lg font-extrabold leading-tight sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px]">
                {language === "en" ? "Hi, I'm Diego" : "Hola, soy Diego"}
              </h1>
              <p className="mx-auto max-w-xl px-2 text-[11px] text-muted-foreground/80 leading-relaxed sm:text-xs md:text-sm lg:text-base">
                {language === "en"
                  ? "I build data systems that feel calm in production."
                  : "Construyo sistemas de datos que se sienten tranquilos en producción."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 text-[9px] text-muted-foreground/65 sm:gap-1.5 sm:text-[10px] md:gap-2 md:text-xs">
              <span>{language === "en" ? "Transparency" : "Transparencia"}</span>
              <span className="text-muted-foreground/35">•</span>
              <span>{language === "en" ? "Documentation" : "Documentación"}</span>
              <span className="text-muted-foreground/35">•</span>
              <span>{language === "en" ? "Easy maintenance" : "Mantenimiento sencillo"}</span>
            </div>
          </motion.div>

          <div className="mt-3 flex flex-1 flex-col sm:mt-4 md:mt-5">
            <BentoGrid className="landing-bento grid w-full flex-1 grid-cols-1 gap-3 auto-rows-[11rem] sm:auto-rows-[22rem] sm:grid-cols-2 sm:grid-rows-2 sm:gap-3 md:gap-3.5">
              {cards.map((card, index) => (
                <LandingCardComponent
                  key={card.profile}
                  card={card}
                  index={index}
                  onClick={() => handleProfileSelect(card.profile)}
                />
              ))}
            </BentoGrid>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="mt-2.5 flex items-center justify-center gap-3 text-[9px] text-muted-foreground/60 sm:mt-3 sm:gap-4 sm:text-[10px] md:mt-4 md:gap-5 md:text-xs"
          >
            <button
              onClick={() => router.push("/projects")}
              className="transition-colors duration-200 hover:text-foreground"
              aria-label={language === "en" ? "View Projects" : "Ver Proyectos"}
            >
              {language === "en" ? "Projects" : "Proyectos"}
            </button>
            <span className="text-muted-foreground/30">•</span>
            <button
              onClick={() => router.push("/ml-engineer")}
              className="transition-colors duration-200 hover:text-foreground"
              aria-label={language === "en" ? "View Experience" : "Ver Experiencia"}
            >
              {language === "en" ? "Experience" : "Experiencia"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
