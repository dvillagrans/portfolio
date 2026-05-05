"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/hooks/ThemeContext";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  href: string;
  label: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const pathname = usePathname();

  /* Scroll handler */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when menu open */
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  /* Close on Escape */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);

  /* GSAP entrance for mobile menu */
  useEffect(() => {
    if (!menuItemsRef.current || !overlayRef.current || !menuPanelRef.current) return;
    const items = Array.from(menuItemsRef.current.children) as HTMLElement[];

    if (mobileMenuOpen) {
      setIsAnimating(true);

      // Overlay fade in
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Panel slide down
      gsap.set(menuPanelRef.current, { y: "-100%", opacity: 0.8 });
      gsap.to(menuPanelRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });

      // Items stagger
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.15,
            onComplete: () => setIsAnimating(false),
          }
        );
      }
    } else {
      // Closing animation
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
      }
      if (menuPanelRef.current) {
        gsap.to(menuPanelRef.current, {
          y: "-10%",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
      if (!reduced && items.length) {
        gsap.to(items, {
          opacity: 0,
          y: -15,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.in",
        });
      }
      const timer = setTimeout(() => setIsAnimating(false), 350);
      return () => clearTimeout(timer);
    }
  }, [mobileMenuOpen, reduced]);

  const navItems: NavItem[] = [
    { href: "/#projects", label: t.nav.projects },
    { href: "/#systems", label: t.nav.systems },
    { href: "/about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        return pathname === "/";
      }
      return pathname === href;
    },
    [pathname]
  );

  return (
    <>
      <nav
        ref={navRef}
        style={{ viewTransitionName: "nav-header" }}
        className={`fixed left-1/2 z-50 flex flex-col -translate-x-1/2 rounded-[2rem] top-[max(1rem,env(safe-area-inset-top))] md:top-6 transition-all duration-500 will-change-transform ${
          scrolled || mobileMenuOpen
            ? "w-[95%] sm:w-[90%] max-w-4xl bg-offwhite/95 text-charcoal backdrop-blur-xl border border-charcoal/10 shadow-lg md:w-[600px]"
            : `w-[95%] sm:w-[90%] max-w-4xl bg-transparent ${theme === "light" ? "text-charcoal" : "text-offwhite"} border border-transparent md:w-[600px]`
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-6 py-3 w-full">
          <Link
            href="/"
            className="text-xs md:text-sm font-semibold tracking-wide uppercase font-sans hover:opacity-60 transition-opacity duration-300"
          >
            DIEGO VILLAGRAN
          </Link>

          <div className="flex items-center gap-2 md:gap-6">
            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`min-h-[44px] inline-flex items-center py-2 transition-all duration-300 ${
                      isActive(item.href)
                        ? "opacity-100"
                        : "hover:opacity-60"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="ml-1.5 block w-1 h-1 rounded-full bg-current opacity-40" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5 md:gap-2">
              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors ${
                  scrolled || mobileMenuOpen
                    ? "text-charcoal hover:bg-charcoal/10"
                    : theme === "light"
                    ? "text-charcoal hover:bg-charcoal/10"
                    : "text-offwhite hover:bg-offwhite/10"
                }`}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Language toggle */}
              <button
                type="button"
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                aria-label={
                  language === "en"
                    ? "ES, Switch to Spanish"
                    : "EN, Cambiar a inglés"
                }
                className={`min-w-[44px] min-h-[44px] flex items-center justify-center font-mono text-[10px] md:text-xs border rounded-full px-3 py-2 md:px-3 md:py-1 transition-colors ${
                  scrolled || mobileMenuOpen
                    ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
                    : theme === "light"
                    ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
                    : "border-offwhite/20 hover:bg-offwhite hover:text-charcoal"
                }`}
              >
                {language === "en" ? "ES" : "EN"}
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="nav-mobile-menu"
              >
                <div className="relative w-5 h-5">
                  <span
                    className="absolute left-0 w-5 h-[1.5px] transition-all duration-300"
                    style={{
                      background: scrolled || mobileMenuOpen || theme === "light" ? "currentColor" : "currentColor",
                      top: mobileMenuOpen ? "50%" : "20%",
                      transform: mobileMenuOpen
                        ? "translateY(-50%) rotate(45deg)"
                        : "none",
                    }}
                  />
                  <span
                    className="absolute left-0 w-5 h-[1.5px] transition-all duration-300"
                    style={{
                      background: scrolled || mobileMenuOpen || theme === "light" ? "currentColor" : "currentColor",
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: mobileMenuOpen ? 0 : 1,
                    }}
                  />
                  <span
                    className="absolute left-0 w-5 h-[1.5px] transition-all duration-300"
                    style={{
                      background: scrolled || mobileMenuOpen || theme === "light" ? "currentColor" : "currentColor",
                      top: mobileMenuOpen ? "50%" : "80%",
                      transform: mobileMenuOpen
                        ? "translateY(-50%) rotate(-45deg)"
                        : "none",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          MOBILE MENU — Fullscreen overlay
         ═══════════════════════════════════════════ */}
      {(mobileMenuOpen || isAnimating) && (
        <>
          {/* Backdrop */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            ref={menuPanelRef}
            id="nav-mobile-menu"
            className="fixed inset-x-0 top-0 z-40 md:hidden overflow-hidden"
            style={{
              paddingTop: "max(5.5rem, env(safe-area-inset-top) + 4.5rem)",
              paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
              height: "100dvh",
            }}
          >
            <div className="h-full flex flex-col px-6 pb-8">
              {/* Nav items */}
              <ul ref={menuItemsRef} className="flex-1 flex flex-col justify-center gap-1">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href} className="w-full">
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        className={`group flex min-h-[56px] w-full items-center justify-between font-sans text-sm font-bold tracking-[0.2em] uppercase py-3 px-4 rounded-xl transition-all duration-300 ${
                          active
                            ? "text-[var(--text-primary)] bg-[var(--bg-secondary)]/90"
                            : "text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/5"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="font-mono text-[10px] tracking-widest opacity-30"
                          >
                            0{i + 1}
                          </span>
                          {item.label}
                        </span>
                        {active && (
                          <span className="block w-2 h-2 rounded-full bg-[var(--text-primary)]/40" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Footer info */}
              <div className="mt-auto pt-6 border-t border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
                    Diego Villagran Salazar
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
                      {language === "en" ? "EN" : "ES"}
                    </span>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      aria-label={
                        theme === "dark"
                          ? "Switch to light mode"
                          : "Switch to dark mode"
                      }
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/10 transition-colors"
                    >
                      {theme === "dark" ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
