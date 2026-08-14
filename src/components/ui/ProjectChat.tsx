"use client";

import { Terminal } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useLanguage } from '@/i18n/LanguageContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// The chat panel carries react-markdown + the AI SDK data layer. It is loaded
// only after the trigger is opened for the first time so those dependencies
// stay off the initial bundle (Lighthouse: unused-javascript / bootup-time).
const ProjectChatPanel = dynamic(
  () => import("./ProjectChatPanel").then((mod) => ({ default: mod.ProjectChatPanel })),
  { ssr: false, loading: () => null }
);

export function ProjectChat({ context: _context }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [panelLoaded, setPanelLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const { language } = useLanguage();
  const reduced = useReducedMotion();

  const PROMPTS_EN = [
    "Ask about my work...",
    "What stack do you use?",
    "Show me your best project.",
    "What's your background?",
    "Are you available to hire?",
  ];

  const PROMPTS_ES = [
    "Pregunta sobre mi trabajo...",
    "¿Qué tecnologías usas?",
    "Muéstrame tu mejor proyecto.",
    "¿Cuál es tu experiencia?",
    "¿Estás disponible para contratar?",
  ];

  // Typewriter cycling animation using GSAP
  useEffect(() => {
    if (isOpen) return;
    const el = typingRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    const PROMPTS = language === 'es' ? PROMPTS_ES : PROMPTS_EN;
    if (reduced) {
      el.textContent = PROMPTS[0];
      gsap.set(cursor, { opacity: 0 });
      return;
    }

    let promptIdx = 0;
    const ctx = gsap.context(() => {
      // Blinking cursor
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
      });

      const playNextPrompt = () => {
        const text = PROMPTS[promptIdx];
        const timeline = gsap.timeline({
          onComplete: () => {
            promptIdx = (promptIdx + 1) % PROMPTS.length;
            gsap.delayedCall(1.5, playNextPrompt);
          }
        });

        // Type in
        timeline.to({}, {
          duration: text.length * 0.06,
          onUpdate: function() {
            const progress = this.progress();
            const charCount = Math.floor(progress * text.length);
            el.textContent = text.slice(0, charCount);
          },
          ease: "none"
        });

        // Pause at end
        timeline.to({}, { duration: 2 });

        // Type out
        timeline.to({}, {
          duration: text.length * 0.03,
          onUpdate: function() {
            const progress = this.progress();
            const charCount = Math.floor((1 - progress) * text.length);
            el.textContent = text.slice(0, charCount);
          },
          ease: "none"
        });
      };

      gsap.delayedCall(0.5, playNextPrompt);
    });

    return () => ctx.revert();
  }, [isOpen, language, reduced]);

  // Fade the trigger button out when the panel opens (button side only)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!buttonRef.current) return;
      if (isOpen) {
        if (reduced) {
          gsap.set(buttonRef.current, { opacity: 0, y: 20, scale: 0.95, pointerEvents: 'none' });
        } else {
          gsap.to(buttonRef.current, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            pointerEvents: 'none',
            duration: 0.4,
            ease: 'power2.inOut'
          });
        }
      } else {
        if (reduced) {
          gsap.set(buttonRef.current, { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' });
        } else {
          gsap.to(buttonRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: 'auto',
            duration: 0.6,
            ease: 'power3.out',
            delay: 0.2
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isOpen, reduced]);

  // Entrance animation for the button on initial mount only
  useEffect(() => {
    if (!buttonRef.current) return;
    if (reduced) {
      gsap.set(buttonRef.current, { opacity: 1, y: 0, scale: 1 });
      return;
    }
    // We only want this to run once when the whole component mounts
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out', delay: 1 }
    );
  }, [reduced]);

  const handleOpen = () => {
    setPanelLoaded(true);
    setIsOpen(true);
  };

  return (
    <>
      {/* Trigger Button - Always Mounted */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        aria-label="Open portfolio chat"
        style={{ opacity: 0 }}
        className="project-chat-trigger fixed z-50 inset-x-0 mx-auto w-fit bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex min-h-[52px] items-center gap-4 rounded-full border border-white/10 bg-charcoal/80 backdrop-blur-xl pl-2 pr-8 py-2 font-mono text-[12px] font-medium text-offwhite shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(201,125,53,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-500 hover:border-warm/50 hover:scale-[1.02] group spring-press"
      >
        {/* Scan-line texture on hover */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
          aria-hidden
        />

        <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-warm group-hover:border-warm transition-all duration-500 shadow-inner">
          <Terminal className="h-5 w-5 text-offwhite/80 group-hover:text-offwhite transition-colors" aria-hidden />
          {/* Warm amber glow on hover */}
          <span className="absolute inset-0 rounded-full bg-warm/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
          {/* Idle pulsing ring */}
          <span className="absolute inset-[-4px] rounded-full border border-warm/30 opacity-60 group-hover:opacity-0 animate-ping transition-opacity duration-500" style={{ animationDuration: '2.5s' }} aria-hidden />
        </span>

        <span className="flex items-center min-w-[240px] text-offwhite/60 group-hover:text-offwhite transition-colors duration-500 tracking-tight">
          <span ref={typingRef} className="mr-1"></span>
          <span ref={cursorRef} className="inline-block w-[2px] h-[16px] bg-warm rounded-full" aria-hidden />
        </span>
      </button>

      {panelLoaded && (
        <ProjectChatPanel
          open={isOpen}
          language={language}
          reduced={reduced}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
