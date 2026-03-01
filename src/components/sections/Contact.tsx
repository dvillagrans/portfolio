"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background zoom on enter
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 0.1,
          duration: 3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      id="contact"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-graphite py-32 md:py-48 px-8 md:px-24"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 z-0 bg-charcoal"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, var(--color-accent) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <h2
          ref={textRef}
          className="font-sans text-3xl font-medium tracking-tight text-offwhite md:text-[3.5rem] md:leading-[1.1]"
          style={{ textWrap: "balance" }}
        >
          {t.contact.title1}
          <br />
          <span className="font-serif italic text-gray-400">{t.contact.title2}</span>
        </h2>

        <a
          href="mailto:contact@danielvillagran.com"
          className="group relative mt-16 font-mono text-sm uppercase tracking-[0.2em] text-offwhite transition-colors hover:text-accent"
        >
          contact@danielvillagran.com
          <div className="absolute -bottom-2 left-0 h-[1px] w-full bg-offwhite/20 transition-all duration-300 group-hover:bg-accent" />
          <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
        </a>

        <div className="mt-32 flex w-full items-center justify-between border-t border-offwhite/10 pt-8 font-mono text-xs uppercase tracking-widest text-gray-500">
          <span>{new Date().getFullYear()} {t.contact.footerText}</span>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">Github</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-offwhite transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
