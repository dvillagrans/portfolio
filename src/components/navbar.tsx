"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { ProfileToggle } from "@/components/profile-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/i18n-context";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock
        className={cn(
          "z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 transform-gpu",
          // Enhanced Liquid glass effect
          isLandingPage
            ? [
                // Base glass effect
                "bg-gradient-to-b from-white/10 via-white/5 to-white/10",
                "dark:from-white/8 dark:via-white/3 dark:to-white/8",
                // Blur and backdrop
                "backdrop-blur-3xl backdrop-saturate-150",
                // Borders with gradient
                "border border-white/20 dark:border-white/15",
                // Soft shadows
                "shadow-[0_8px_32px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
                "dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(255,255,255,0.05)]",
                // Subtle glow
                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50",
                "dark:before:from-white/5"
              ].join(" ")
            : [
                // Base glass effect for non-landing pages
                "bg-gradient-to-b from-background/95 via-background/90 to-background/95",
                "backdrop-blur-xl backdrop-saturate-150",
                // Refined borders
                "border border-border/50 dark:border-white/10",
                // Layered shadows
                "shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_8px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)]",
                "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_8px_rgba(0,0,0,0.3),0_-20px_80px_-20px_rgba(255,255,255,0.08)_inset]",
                // Inner glow
                "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-background/50 before:to-transparent before:opacity-30",
              ].join(" ")
        )}
      >
        {/* Navigation tabs - hidden on landing page */}
        {!isLandingPage &&
          DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

        {/* Separator - only show if not landing page */}
        {!isLandingPage && (
          <Separator orientation="vertical" className="h-full" />
        )}

        {/* Social links - GitHub & LinkedIn */}
        {Object.entries(DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

        <Separator orientation="vertical" className="h-full py-2" />

        {/* Profile toggle - hidden on landing page */}
        {!isLandingPage && (
          <DockIcon>
            <ProfileToggle />
          </DockIcon>
        )}

        {/* Language toggle */}
        <DockIcon>
          <LanguageToggle />
        </DockIcon>

        {/* Theme toggle */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("nav.theme")}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
