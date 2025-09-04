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
      en: { flag: '🇺🇸', name: 'English', code: 'EN' },
      es: { flag: '🇪🇸', name: 'Español', code: 'ES' }
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
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center justify-center gap-1"
              >
                <motion.span 
                  className="text-lg"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  {currentLang.flag}
                </motion.span>
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
          <span className="text-sm">
            Switch to {nextLang.name} {nextLang.flag}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});

LanguageToggle.displayName = "LanguageToggle";