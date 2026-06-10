"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ToggleOrigin {
  x: number;
  y: number;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: ToggleOrigin) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    const initial = stored ?? getSystemTheme();
    setThemeState(initial);
    document.documentElement.classList.remove("no-transition");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        setThemeState(e.matches ? "light" : "dark");
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const toggleTheme = useCallback((origin?: ToggleOrigin) => {
    const root = document.documentElement;

    // Anchor the radial wipe to the click point. Without an origin we fall back
    // to viewport center. The radius is the distance to the farthest corner so
    // the circle always covers the full viewport.
    if (origin) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = Math.max(origin.x, w - origin.x);
      const dy = Math.max(origin.y, h - origin.y);
      const r = Math.hypot(dx, dy);
      root.style.setProperty("--theme-x", `${origin.x}px`);
      root.style.setProperty("--theme-y", `${origin.y}px`);
      root.style.setProperty("--theme-r", `${r}px`);
    } else {
      root.style.setProperty("--theme-x", "50vw");
      root.style.setProperty("--theme-y", "50vh");
      root.style.setProperty("--theme-r", "100vmax");
    }

    if (!document.startViewTransition) {
      setThemeState(prev => prev === "dark" ? "light" : "dark");
      return;
    }
    root.classList.add("theme-toggling");
    const transition = document.startViewTransition(() => {
      setThemeState(prev => prev === "dark" ? "light" : "dark");
    });
    transition.finished.then(() => {
      root.classList.remove("theme-toggling");
    });
  }, []);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
