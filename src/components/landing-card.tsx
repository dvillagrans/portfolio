"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProfileType } from "@/contexts/profile-context";
import { ElementType, ReactNode, useState, useEffect } from "react";
import { useI18n } from "@/contexts/i18n-context";

export interface LandingCardProps {
  profile: ProfileType;
  icon: ElementType;
  colSpan: string;
  background: string;
  texture?: string;
  textureBlend?: string;
  iconWrapper: string;
  title: string;
  description: string;
  tags: string[];
  delay: number;
  align?: "left" | "center";
  tagClass: string;
  labelClass: string;
  decoration?: ReactNode;
  onClick: (profile: ProfileType) => void;
}

export function LandingCard({
  profile,
  icon: Icon,
  colSpan,
  background,
  texture,
  textureBlend,
  iconWrapper,
  title,
  description,
  tags,
  delay,
  align = "left",
  tagClass,
  labelClass,
  decoration,
  onClick,
}: LandingCardProps) {
  const { language } = useI18n();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={() => onClick(profile)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-3 text-left backdrop-blur-[26px] transition-all duration-500 sm:p-4 md:p-5",
        "hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:border-white/[0.18] hover:shadow-[0_24px_68px_-32px_rgba(4,9,26,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        colSpan
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] opacity-95 transition-opacity transition-duration-[900ms] group-hover:opacity-100">
        {/* Custom decoration (includes its own background) OR default background */}
        {decoration || (
          <>
            <div
              className="absolute inset-0 transition transition-duration-[1200ms] ease-out"
              style={isMounted ? { background } : undefined}
              suppressHydrationWarning
            />
            {texture ? (
              <div
                suppressHydrationWarning
                className={cn(
                  "absolute inset-0 bg-cover bg-center animate-[texture-pan_36s_ease-in-out_infinite]",
                  textureBlend
                )}
                style={{ backgroundImage: `url(${texture})` }}
              />
            ) : null}
          </>
        )}

        {/* Radial gradient overlay (always on top for all cards) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_68%)] opacity-70" />
      </div>

      <div className="relative flex h-full flex-col gap-2 sm:gap-2.5 md:gap-3">
        <div
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-xl border text-base font-semibold shadow-lg transition-transform duration-300 group-hover:scale-95 sm:h-10 sm:w-10 sm:rounded-2xl md:h-11 md:w-11 md:text-lg",
            iconWrapper
          )}
        >
          <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col gap-1.5 sm:gap-2",
            align === "center" && "items-center text-center"
          )}
        >
          <h3 className="text-sm font-semibold text-white sm:text-base md:text-lg lg:text-xl leading-tight">
            {title}
          </h3>
          <p className="max-w-xs text-[11px] leading-relaxed text-white/70 sm:text-xs md:text-sm">
            {description}
          </p>
        </div>

        <div
          className={cn(
            "flex flex-wrap gap-1 sm:gap-1.5",
            align === "center" ? "justify-center" : ""
          )}
        >
          {tags.map((tech) => (
            <span
              key={tech}
              className={cn(
                "rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide transition sm:px-2.5 sm:py-1 sm:text-[10px] md:text-xs",
                tagClass
              )}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <span
        className={cn(
          "pointer-events-none absolute bottom-3 right-4 text-[9px] uppercase tracking-[0.3em] transition-colors duration-500 sm:bottom-4 sm:right-5 sm:text-[10px]",
          labelClass
        )}
      >
        {language === "en" ? "Discover" : "Entrar"}
      </span>
    </motion.button>
  );
}
