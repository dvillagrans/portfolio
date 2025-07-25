"use client";

import { Button } from "@/components/ui/button";
import { useI18n, type Language } from "@/contexts/i18n-context";
import React from "react";
import { motion } from "framer-motion";

export const LanguageToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className="px-2 relative overflow-hidden"
      onClick={toggleLanguage}
      {...props}
    >
      <motion.div
        key={language}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center w-full h-full"
      >
        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {language.toUpperCase()}
        </span>
      </motion.div>
      
      {/* Flag icons as background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        {language === 'en' ? (
          <span className="text-xs">🇺🇸</span>
        ) : (
          <span className="text-xs">🇪🇸</span>
        )}
      </div>
    </Button>
  );
});

LanguageToggle.displayName = "LanguageToggle";