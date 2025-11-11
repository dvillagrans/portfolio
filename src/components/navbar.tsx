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
          // Liquid glass effect
          isLandingPage
            ? "bg-white/5 dark:bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]"
            : "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
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
          <ModeToggle />
        </DockIcon>
      </Dock>
    </div>
  );
}
