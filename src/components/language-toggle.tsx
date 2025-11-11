"use client";

import { Button } from "@/components/ui/button";
import { useI18n, type Language } from "@/contexts/i18n-context";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// SVG Flag Components
const USFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="3" fill="#B22234"/>
    <rect y="3" width="24" height="2" fill="white"/>
    <rect y="7" width="24" height="2" fill="white"/>
    <rect y="11" width="24" height="2" fill="white"/>
    <rect y="15" width="24" height="2" fill="white"/>
    <rect y="19" width="24" height="2" fill="white"/>
    <rect width="10" height="11" rx="1" fill="#3C3B6E"/>
    <circle cx="2.5" cy="2.5" r="0.5" fill="white"/>
    <circle cx="5" cy="2.5" r="0.5" fill="white"/>
    <circle cx="7.5" cy="2.5" r="0.5" fill="white"/>
    <circle cx="2.5" cy="5" r="0.5" fill="white"/>
    <circle cx="5" cy="5" r="0.5" fill="white"/>
    <circle cx="7.5" cy="5" r="0.5" fill="white"/>
    <circle cx="2.5" cy="7.5" r="0.5" fill="white"/>
    <circle cx="5" cy="7.5" r="0.5" fill="white"/>
    <circle cx="7.5" cy="7.5" r="0.5" fill="white"/>
  </svg>
);

const SpainFlag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect width="24" height="24" rx="3" fill="#AA151B"/>
    <rect y="6" width="24" height="12" fill="#F1BF00"/>
    <path d="M8 12 L10 11 L10 13 Z" fill="#AA151B"/>
    <ellipse cx="9.5" cy="12" rx="1.5" ry="2" fill="none" stroke="#AA151B" strokeWidth="0.5"/>
  </svg>
);

export const LanguageToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  const { language, setLanguage, t } = useI18n();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  const getLanguageInfo = (lang: Language) => {
    return {
      en: {
        flag: <USFlag className="w-5 h-5" />,
        name: 'English',
        code: 'EN'
      },
      es: {
        flag: <SpainFlag className="w-5 h-5" />,
        name: 'Español',
        code: 'ES'
      }
    }[lang];
  };

  const currentLang = getLanguageInfo(language);
  const nextLang = getLanguageInfo(language === 'en' ? 'es' : 'en');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          type="button"
          size="icon"
          className="relative overflow-hidden group hover:bg-primary/10 transition-all duration-300"
          onClick={toggleLanguage}
          {...props}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Main content */}
          <div className="relative flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center gap-1.5"
              >
                {/* Static flag icon - no movement */}
                <div className="flex-shrink-0">
                  {currentLang.flag}
                </div>
                <span className="text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                  {currentLang.code}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-background/95 backdrop-blur-sm border border-border/50">
        <div className="flex items-center gap-2">
          <Globe className="h-3 w-3" />
          <div className="flex items-center gap-1.5">
            <span className="text-sm">Switch to {nextLang.name}</span>
            <div className="flex-shrink-0 scale-75">{nextLang.flag}</div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});

LanguageToggle.displayName = "LanguageToggle";