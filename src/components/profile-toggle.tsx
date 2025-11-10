"use client";

import { Button } from "@/components/ui/button";
import { useProfile, PROFILE_METADATA, ProfileType } from "@/contexts/profile-context";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useI18n } from "@/contexts/i18n-context";

export const ProfileToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  const { profile, setProfile, getProfileMetadata } = useProfile();
  const { language } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentProfile = getProfileMetadata(profile);
  const profiles: ProfileType[] = ['ml-engineer', 'data-engineer', 'devops-engineer', 'data-analyst'];

  const handleProfileSelect = (selectedProfile: ProfileType) => {
    setProfile(selectedProfile);
    setOpen(false);

    // If not on landing page, navigate to profile page
    if (pathname !== '/') {
      router.push(`/${selectedProfile}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="ghost"
              type="button"
              size="icon"
              className="relative overflow-hidden group hover:bg-primary/10 transition-all duration-300"
              {...props}
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Main content */}
              <div className="relative flex items-center justify-center w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={profile}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <motion.span
                      className="text-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      {currentProfile.icon}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Hover indicator */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${currentProfile.color}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-background/95 backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3" />
            <span className="text-sm">
              {language === 'en' ? 'Switch Profile' : 'Cambiar Perfil'}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>

      <PopoverContent className="w-80 p-2" align="center" side="top">
        <div className="space-y-2">
          <div className="px-2 py-1.5">
            <p className="text-sm font-semibold">
              {language === 'en' ? 'Select Profile' : 'Seleccionar Perfil'}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' ? 'Choose your professional focus' : 'Elige tu enfoque profesional'}
            </p>
          </div>

          <div className="space-y-1">
            {profiles.map((profileId) => {
              const metadata = PROFILE_METADATA[profileId];
              const isActive = profile === profileId;
              const title = language === 'en' ? metadata.title : metadata.titleEs;

              return (
                <button
                  key={profileId}
                  onClick={() => handleProfileSelect(profileId)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 border-2 border-primary/50'
                      : 'hover:bg-muted border-2 border-transparent'
                  }`}
                >
                  <span className="text-2xl">{metadata.icon}</span>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-medium ${isActive ? 'text-primary' : ''}`}>
                      {title}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-primary/70' : 'text-muted-foreground'}`}>
                      {metadata.tagline.split('|')[0].trim()}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});

ProfileToggle.displayName = "ProfileToggle";
