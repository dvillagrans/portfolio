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
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stagger mobile menu items on open
  useEffect(() => {
    if (!menuItemsRef.current) return;
    const items = Array.from(menuItemsRef.current.children) as HTMLElement[];
    if (mobileMenuOpen) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.06,
          ease: "expo.out",
          delay: 0.12,
        }
      );
    } else {
      gsap.set(items, { opacity: 0, y: 12 });
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed left-1/2 z-50 flex flex-col -translate-x-1/2 rounded-[2rem] top-[max(1rem,env(safe-area-inset-top))] md:top-6 transition-all duration-500 will-change-transform ${
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
            <li><Link href="/#projects" className="min-h-[44px] inline-flex items-center py-2 hover:opacity-60 transition-opacity duration-300">{t.nav.projects}</Link></li>
            <li><Link href="/#systems" className="min-h-[44px] inline-flex items-center py-2 hover:opacity-60 transition-opacity duration-300">{t.nav.systems}</Link></li>
            <li><Link href="/about" className="min-h-[44px] inline-flex items-center py-2 hover:opacity-60 transition-opacity duration-300">{t.nav.about}</Link></li>
            <li><Link href="/#contact" className="min-h-[44px] inline-flex items-center py-2 hover:opacity-60 transition-opacity duration-300">{t.nav.contact}</Link></li>
          </ul>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              aria-label={language === "en" ? "ES, Switch to Spanish" : "EN, Cambiar a inglés"}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-[10px] md:text-xs border rounded-full px-3 py-2 md:px-3 md:py-1 transition-colors ${
                (scrolled || mobileMenuOpen)
                  ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
                  : "border-offwhite/20 hover:bg-offwhite hover:text-charcoal"
              }`}
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="nav-mobile-menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown — grid-template-rows to avoid animating height */}
      <div
        id="nav-mobile-menu"
        className="md:hidden grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: mobileMenuOpen ? "1fr" : "0fr" }}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="overflow-hidden min-h-0">
        <ul ref={menuItemsRef} className="flex flex-col items-center gap-1 py-6 px-6 border-t border-charcoal/5">
          <li className="w-full">
            <Link href="/#projects" onClick={() => setMobileMenuOpen(false)} tabIndex={mobileMenuOpen ? 0 : -1} className="flex min-h-[44px] w-full items-center justify-center font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:text-warm transition-colors py-2">
              {t.nav.projects}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/#systems" onClick={() => setMobileMenuOpen(false)} tabIndex={mobileMenuOpen ? 0 : -1} className="flex min-h-[44px] w-full items-center justify-center font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:text-warm transition-colors py-2">
              {t.nav.systems}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} tabIndex={mobileMenuOpen ? 0 : -1} className="flex min-h-[44px] w-full items-center justify-center font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:text-warm transition-colors py-2">
              {t.nav.about}
            </Link>
          </li>
          <li className="w-full">
            <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} tabIndex={mobileMenuOpen ? 0 : -1} className="flex min-h-[44px] w-full items-center justify-center font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:text-warm transition-colors py-2">
              {t.nav.contact}
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
}
