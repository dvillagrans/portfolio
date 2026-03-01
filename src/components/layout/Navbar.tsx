"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-full px-6 py-3 transition-all duration-500 will-change-transform ${
        scrolled
          ? "w-[90%] max-w-4xl bg-offwhite/90 text-charcoal backdrop-blur-md border border-charcoal/10 shadow-sm md:w-[600px]"
          : "w-[90%] max-w-4xl bg-transparent text-offwhite border border-transparent md:w-[600px]"
      }`}
    >
      <div className="text-sm font-semibold tracking-wide uppercase font-sans">
        DV // <span className="font-mono text-xs opacity-70 ml-1">v2.0</span>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <li>
          <a href="#projects" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.projects}
          </a>
        </li>
        <li>
          <a href="#systems" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.systems}
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.contact}
          </a>
        </li>
      </ul>
      <button
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className={`ml-4 font-mono text-xs border rounded-full px-3 py-1 transition-colors ${
          scrolled
            ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
            : "border-offwhite/20 hover:bg-offwhite hover:text-charcoal"
        }`}
      >
        {language === "en" ? "ES" : "EN"}
      </button>
    </div>
    </nav>
  );
}
