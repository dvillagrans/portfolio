"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "next-view-transitions";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      className={`fixed top-4 md:top-6 left-1/2 z-50 flex flex-col -translate-x-1/2 rounded-[2rem] transition-all duration-500 will-change-transform ${
        (scrolled || mobileMenuOpen)
          ? "w-[95%] sm:w-[90%] max-w-4xl bg-offwhite/95 text-charcoal backdrop-blur-xl border border-charcoal/10 shadow-lg md:w-[600px]"
          : `w-[95%] sm:w-[90%] max-w-4xl bg-transparent ${theme === 'light' ? 'text-charcoal' : 'text-offwhite'} border border-transparent md:w-[600px]`
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-6 py-3 w-full">
        <div className="text-xs md:text-sm font-semibold tracking-wide uppercase font-sans">
          DIEGO VILLAGRAN 
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li><Link href="/#projects" className="hover:opacity-60 transition-opacity duration-300">{t.nav.projects}</Link></li>
            <li><Link href="/#systems" className="hover:opacity-60 transition-opacity duration-300">{t.nav.systems}</Link></li>
            <li><Link href="/about" className="hover:opacity-60 transition-opacity duration-300">{t.nav.about}</Link></li>
            <li><Link href="/#contact" className="hover:opacity-60 transition-opacity duration-300">{t.nav.contact}</Link></li>
          </ul>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className={`font-mono text-[10px] md:text-xs border rounded-full px-2 py-1 md:px-3 md:py-1 transition-colors ${
                (scrolled || mobileMenuOpen)
                  ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
                  : "border-offwhite/20 hover:bg-offwhite hover:text-charcoal"
              }`}
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col items-center gap-4 py-6 px-6 border-t border-charcoal/5">
          <li className="w-full text-center">
            <Link href="/#projects" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.projects}
            </Link>
          </li>
          <li className="w-full text-center">
            <Link href="/#systems" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.systems}
            </Link>
          </li>
          <li className="w-full text-center">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.about}
            </Link>
          </li>
          <li className="w-full text-center">
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.contact}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
