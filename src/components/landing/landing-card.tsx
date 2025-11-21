"use client";

import { useRef, useState, MouseEvent, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { LandingCard } from "@/data/landing-cards";
import { useI18n } from "@/contexts/i18n-context";

interface LandingCardProps {
    card: LandingCard;
    onClick: () => void;
    index: number;
}

export function LandingCardComponent({ card, onClick, index }: LandingCardProps) {
    const { language } = useI18n();
    const ref = useRef<HTMLButtonElement>(null);

    // Mouse position for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

    const handleMouseMove = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();

            // Spotlight coordinates
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top;
            mouseX.set(clientX);
            mouseY.set(clientY);

            // Tilt coordinates
            const width = rect.width;
            const height = rect.height;

            const mouseXFromCenter = clientX - width / 2;
            const mouseYFromCenter = clientY - height / 2;

            const rotateXValue = (mouseYFromCenter / height) * -8; // Max rotation deg
            const rotateYValue = (mouseXFromCenter / width) * 8;

            rotateX.set(rotateXValue);
            rotateY.set(rotateYValue);
        },
        [mouseX, mouseY, rotateX, rotateY]
    );

    const handleMouseLeave = useCallback(() => {
        rotateX.set(0);
        rotateY.set(0);
    }, [rotateX, rotateY]);

    return (
        <motion.button
            ref={ref}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.delay }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
            }}
            className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-white/[0.08] bg-white/[0.035] p-3 text-left backdrop-blur-[26px] sm:p-4 md:p-5",
                "transition-colors duration-300",
                "hover:border-white/[0.18] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                card.colSpan
            )}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />

            {/* Background & Decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] opacity-95 transition-opacity duration-[900ms] group-hover:opacity-100" style={{ transform: "translateZ(0)" }}>
                {card.decoration || (
                    <>
                        <div
                            className="absolute inset-0 transition duration-[1200ms] ease-out"
                            style={{ background: card.background }}
                        />
                        {card.texture ? (
                            <div
                                className={cn(
                                    "absolute inset-0 bg-cover bg-center animate-[texture-pan_36s_ease-in-out_infinite]",
                                    card.textureBlend
                                )}
                                style={{ backgroundImage: `url(${card.texture})` }}
                            />
                        ) : null}
                    </>
                )}

                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_68%)] opacity-70" />

                {/* Directional light glow */}
                <div className="absolute -top-20 -left-20 w-[200px] h-[200px] bg-white/10 blur-[80px] rounded-full" />
            </div>

            {/* Content Container with 3D depth */}
            <div className="relative flex h-full flex-col gap-2 sm:gap-2.5 md:gap-3" style={{ transform: "translateZ(20px)" }}>
                <div
                    className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-xl border text-base font-semibold shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 sm:rounded-2xl md:h-11 md:w-11 md:text-lg",
                        card.iconWrapper
                    )}
                >
                    <card.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>

                <div
                    className={cn(
                        "flex flex-1 flex-col gap-1.5 sm:gap-2",
                        card.align === "center" && "items-center text-center"
                    )}
                >
                    <h3 className="text-sm font-semibold text-white/95 sm:text-base md:text-lg lg:text-xl leading-tight">
                        {card.title}
                    </h3>
                    <p className="max-w-xs text-[11px] leading-relaxed text-white/75 sm:text-xs md:text-sm">
                        {card.description}
                    </p>
                </div>

                <div
                    className={cn(
                        "flex flex-wrap gap-1 sm:gap-1.5",
                        card.align === "center" ? "justify-center" : ""
                    )}
                >
                    {card.tags.map((tech) => (
                        <span key={tech} className={cn("rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide transition sm:px-2.5 sm:py-1 sm:text-[10px] md:text-xs", card.tagClass)}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* CTA Arrow */}
            <div className="pointer-events-none absolute bottom-3 right-4 sm:bottom-4 sm:right-5" style={{ transform: "translateZ(10px)" }}>
                <div className={cn(
                    "flex items-center gap-1 text-[9px] uppercase tracking-[0.3em] transition-colors duration-300 sm:text-[10px]",
                    card.labelClass
                )}>
                    <span>{language === "en" ? "Discover" : "Entrar"}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
            </div>
        </motion.button>
    );
}
