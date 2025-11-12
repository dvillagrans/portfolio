'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PortfolioLink, resolveText } from "@/data/profiles/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/i18n-context";

const variantMap: Record<string, "default" | "secondary" | "outline" | "ghost"> = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
  soft: "outline",
};

interface PortfolioCtaButtonProps {
  link: PortfolioLink;
  className?: string;
  size?: "default" | "lg" | "sm";
  onClick?: () => void;
}

export function PortfolioCtaButton({ link, className, size = "lg", onClick }: PortfolioCtaButtonProps) {
  const variant = variantMap[link.type ?? "primary"] ?? "default";
  const { language } = useI18n();
  const label = resolveText(link.label, language);

  if (link.href.startsWith("http") || link.href.startsWith("mailto:")) {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        onClick={onClick}
        className={cn(
          "relative overflow-hidden rounded-full border border-white/10 bg-white/5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
          variant === "default" && "bg-gradient-to-r from-[hsla(var(--portfolio-primary),0.85)] to-[hsla(var(--portfolio-accent),0.75)] shadow-[0_18px_35px_rgba(0,0,0,0.35)] hover:scale-[1.01]",
          variant === "secondary" && "bg-gradient-to-r from-[hsla(var(--portfolio-accent),0.45)] to-transparent text-white/90",
          variant === "ghost" && "bg-transparent text-white/80 hover:bg-white/10",
          variant === "outline" && "border-white/20 bg-white/5 text-white/85 hover:bg-white/10",
          className
        )}
      >
        <Link
          href={link.href}
          target={link.target ?? (link.href.startsWith("http") ? "_blank" : undefined)}
          rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {label}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-full border border-white/10 bg-white/5 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
        variant === "default" && "bg-gradient-to-r from-[hsla(var(--portfolio-primary),0.85)] to-[hsla(var(--portfolio-accent),0.75)] shadow-[0_18px_35px_rgba(0,0,0,0.35)] hover:scale-[1.01]",
        variant === "secondary" && "bg-gradient-to-r from-[hsla(var(--portfolio-accent),0.45)] to-transparent text-white/90",
        variant === "ghost" && "bg-transparent text-white/80 hover:bg-white/10",
        variant === "outline" && "border-white/20 bg-white/5 text-white/85 hover:bg-white/10",
        className
      )}
    >
      <Link href={link.href} download={link.download}>
        {label}
      </Link>
    </Button>
  );
}

