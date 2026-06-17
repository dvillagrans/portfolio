"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import {
  ArrowRight,
  Sun,
  Moon,
  Languages,
  Download,
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  FolderGit2,
  FileText,
  Layers,
  Compass,
  Quote,
  Wrench,
  Send,
  Command as CommandIcon,
  Search,
  CornerDownLeft,
  Clock,
} from "lucide-react";
import { useCommandPalette } from "@/hooks/CommandPaletteContext";
import { smoothScrollToHash } from "@/lib/scroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/hooks/ThemeContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CommandGroup = "navigation" | "sections" | "actions" | "external";

interface CommandItem {
  id: string;
  label: { en: string; es: string };
  group: CommandGroup;
  icon: React.ComponentType<{ className?: string }>;
  keywords?: string[];
  shortcut?: string;
  run: () => void;
}

interface PaletteCopy {
  placeholder: string;
  empty: string;
  groups: Record<CommandGroup, string>;
  hintNavigate: string;
  hintSelect: string;
  hintClose: string;
}

const COPY: Record<"en" | "es", PaletteCopy> = {
  en: {
    placeholder: "Search commands, sections, links…",
    empty: "No matches",
    groups: {
      navigation: "Pages",
      sections: "Sections",
      actions: "Actions",
      external: "External",
    },
    hintNavigate: "navigate",
    hintSelect: "select",
    hintClose: "close",
  },
  es: {
    placeholder: "Buscar comandos, secciones, links…",
    empty: "Sin resultados",
    groups: {
      navigation: "Páginas",
      sections: "Secciones",
      actions: "Acciones",
      external: "Externos",
    },
    hintNavigate: "navegar",
    hintSelect: "elegir",
    hintClose: "cerrar",
  },
};

const GROUP_ORDER: CommandGroup[] = ["navigation", "sections", "actions", "external"];

function fuzzyScore(query: string, label: string, keywords: string[] = []): number {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const l = label.toLowerCase();
  if (l === q) return 1000;
  if (l.startsWith(q)) return 700;
  const idx = l.indexOf(q);
  if (idx >= 0) return 400 - idx;
  for (const kw of keywords) {
    const ki = kw.toLowerCase().indexOf(q);
    if (ki >= 0) return 200 - ki;
  }
  let prev = -1;
  let score = 0;
  for (const ch of q) {
    const next = l.indexOf(ch, prev + 1);
    if (next === -1) return 0;
    score += next - prev;
    prev = next;
  }
  return Math.max(1, 100 - score);
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();
  const router = useTransitionRouter();

  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = COPY[language];

  const close = useCallback(() => setOpen(false), [setOpen]);

  const navigate = useCallback(
    (href: string) => {
      close();
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(href);
    },
    [router, close]
  );

  const scrollToHash = useCallback(
    (hash: string) => {
      close();
      if (typeof window === "undefined") return;
      const onHome = window.location.pathname === "/";
      if (!onHome) {
        router.push(`/${hash}`);
        return;
      }
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        if (reduced) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        } else {
          smoothScrollToHash(hash, { duration: 1.15, ease: "power2.inOut" });
        }
      }
    },
    [router, reduced, close]
  );

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "nav-home",
        label: { en: "Home", es: "Inicio" },
        group: "navigation",
        icon: Home,
        keywords: ["start", "landing"],
        run: () => navigate("/"),
      },
      {
        id: "nav-about",
        label: { en: "About", es: "Sobre mí" },
        group: "navigation",
        icon: User,
        keywords: ["bio", "perfil"],
        run: () => navigate("/about"),
      },
      {
        id: "nav-projects",
        label: { en: "Project Archive", es: "Archivo de Proyectos" },
        group: "navigation",
        icon: FolderGit2,
        keywords: ["work", "trabajos", "list"],
        run: () => navigate("/projects"),
      },
      {
        id: "nav-eyenet",
        label: { en: "Case Study — EyeNet", es: "Caso — EyeNet" },
        group: "navigation",
        icon: FileText,
        keywords: ["ai", "automation"],
        run: () => navigate("/projects/eyenet"),
      },
      {
        id: "nav-timeup",
        label: { en: "Case Study — TimeUp", es: "Caso — TimeUp" },
        group: "navigation",
        icon: FileText,
        keywords: ["saas", "tiempos"],
        run: () => navigate("/projects/timeup"),
      },
      {
        id: "nav-covid",
        label: { en: "Case Study — COVID Profiles", es: "Caso — Perfiles COVID" },
        group: "navigation",
        icon: FileText,
        keywords: ["covid", "clustering", "salud"],
        run: () => navigate("/projects/covid"),
      },
      {
        id: "nav-nyc",
        label: { en: "Case Study — NYC Ride-Hailing", es: "Caso — NYC Ride-Hailing" },
        group: "navigation",
        icon: FileText,
        keywords: ["nyc", "uber", "lyft"],
        run: () => navigate("/projects/nyc"),
      },
      {
        id: "nav-india",
        label: { en: "Case Study — India Air Quality", es: "Caso — Calidad del aire India" },
        group: "navigation",
        icon: FileText,
        keywords: ["india", "aqi", "pyspark"],
        run: () => navigate("/projects/india"),
      },
      {
        id: "nav-bouquet",
        label: { en: "Case Study — Bouquet", es: "Caso — Bouquet" },
        group: "navigation",
        icon: FileText,
        keywords: ["hospitality", "restaurantes"],
        run: () => navigate("/projects/bouquet"),
      },
      {
        id: "nav-cv-builder",
        label: { en: "CV Builder", es: "CV Builder" },
        group: "navigation",
        icon: FileText,
        keywords: ["resume", "currículum"],
        run: () => navigate("/cv-builder"),
      },
      {
        id: "nav-now",
        label: { en: "Now", es: "Ahora" },
        group: "navigation",
        icon: Clock,
        keywords: ["focus", "current", "enfoque", "actual"],
        run: () => navigate("/now"),
      },
      // Sections (home)
      {
        id: "sec-projects",
        label: { en: "Featured Work", es: "Trabajos Destacados" },
        group: "sections",
        icon: Layers,
        run: () => scrollToHash("#projects"),
      },
      {
        id: "sec-systems",
        label: { en: "Systems & Capabilities", es: "Sistemas y Capacidades" },
        group: "sections",
        icon: Compass,
        run: () => scrollToHash("#systems"),
      },
      {
        id: "sec-philosophy",
        label: { en: "Philosophy", es: "Filosofía" },
        group: "sections",
        icon: Quote,
        keywords: ["principles", "principios"],
        run: () => scrollToHash("#principles"),
      },
      {
        id: "sec-stack",
        label: { en: "Technical Stack", es: "Stack Técnico" },
        group: "sections",
        icon: Wrench,
        keywords: ["tools", "herramientas"],
        run: () => scrollToHash("#stack"),
      },
      {
        id: "sec-contact",
        label: { en: "Contact", es: "Contacto" },
        group: "sections",
        icon: Send,
        run: () => scrollToHash("#contact"),
      },
      // Actions
      {
        id: "act-theme",
        label: {
          en: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
          es: theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
        },
        group: "actions",
        icon: theme === "dark" ? Sun : Moon,
        keywords: ["theme", "dark", "light", "tema"],
        run: () => {
          close();
          toggleTheme();
        },
      },
      {
        id: "act-lang",
        label: {
          en: language === "en" ? "Switch to Spanish" : "Switch to English",
          es: language === "en" ? "Cambiar a Español" : "Cambiar a Inglés",
        },
        group: "actions",
        icon: Languages,
        keywords: ["language", "idioma", "en", "es"],
        run: () => {
          close();
          setLanguage(language === "en" ? "es" : "en");
        },
      },
      {
        id: "act-cv",
        label: { en: "Download CV (PDF)", es: "Descargar CV (PDF)" },
        group: "actions",
        icon: Download,
        keywords: ["resume", "currículum", "pdf"],
        run: () => {
          close();
          const a = document.createElement("a");
          a.href = "/resume/resume-banca.pdf";
          a.download = "Diego-Villagran-CV.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      // External
      {
        id: "ext-github",
        label: { en: "GitHub", es: "GitHub" },
        group: "external",
        icon: Github,
        run: () => navigate("https://github.com/dvillagrans"),
      },
      {
        id: "ext-linkedin",
        label: { en: "LinkedIn", es: "LinkedIn" },
        group: "external",
        icon: Linkedin,
        run: () => navigate("https://www.linkedin.com/in/diegovillagrans/"),
      },
      {
        id: "ext-email",
        label: { en: "Send email", es: "Enviar correo" },
        group: "external",
        icon: Mail,
        keywords: ["mail", "contact"],
        run: () => navigate("mailto:diegovillasal@gmail.com"),
      },
    ],
    [navigate, scrollToHash, theme, toggleTheme, language, setLanguage, close]
  );

  const filtered = useMemo(() => {
    const scored = commands
      .map((cmd) => ({ cmd, score: fuzzyScore(query, cmd.label[language], cmd.keywords) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.map((s) => s.cmd);
  }, [commands, query, language]);

  const grouped = useMemo(() => {
    const map = new Map<CommandGroup, CommandItem[]>();
    for (const g of GROUP_ORDER) map.set(g, []);
    for (const cmd of filtered) map.get(cmd.group)!.push(cmd);
    return GROUP_ORDER.filter((g) => (map.get(g)?.length ?? 0) > 0).map((g) => ({
      group: g,
      items: map.get(g)!,
    }));
  }, [filtered]);

  const flatIds = useMemo(() => filtered.map((c) => c.id), [filtered]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query, open]);

  // Open: GSAP entrance, focus input, lock scroll
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    inputRef.current?.focus();

    if (reduced) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { opacity: 1, y: 0, scale: 1 });
    } else {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, y: -12, scale: 0.98, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "expo.out",
        }
      );
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open, reduced]);

  // Reset query on close (after fade)
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setQuery(""), 250);
    return () => clearTimeout(t);
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, Math.max(flatIds.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[activeIdx];
        if (cmd) cmd.run();
      } else if (e.key === "Tab") {
        // Focus trap: keep focus on input
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, activeIdx, filtered, flatIds.length, close]);

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.querySelector<HTMLLIElement>(`[data-cmd-idx="${activeIdx}"]`);
    if (node) node.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
    >
      <div
        ref={overlayRef}
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-offwhite/15 bg-graphite/95 backdrop-blur-xl shadow-2xl"
        style={{ willChange: "transform, opacity, filter" }}
      >
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b border-offwhite/10 px-4 py-3.5">
          <Search className="h-4 w-4 text-offwhite/40 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            aria-controls="cmd-list"
            aria-activedescendant={filtered[activeIdx] ? `cmd-${filtered[activeIdx].id}` : undefined}
            className="flex-1 bg-transparent font-sans text-sm text-offwhite placeholder:text-offwhite/35 focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-flex items-center font-mono text-[10px] text-offwhite/40 border border-offwhite/15 rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto">
          {grouped.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs uppercase tracking-[0.18em] text-offwhite/35">
              {copy.empty}
            </div>
          ) : (
            <ul id="cmd-list" ref={listRef} role="listbox" className="p-2">
              {grouped.map(({ group, items }) => (
                <li key={group} className="mb-2 last:mb-0">
                  <div className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/30">
                    {copy.groups[group]}
                  </div>
                  <ul>
                    {items.map((cmd) => {
                      const flatIdx = flatIds.indexOf(cmd.id);
                      const isActive = flatIdx === activeIdx;
                      const Icon = cmd.icon;
                      return (
                        <li
                          key={cmd.id}
                          id={`cmd-${cmd.id}`}
                          data-cmd-idx={flatIdx}
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIdx(flatIdx)}
                          onClick={() => cmd.run()}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                            isActive
                              ? "bg-offwhite/10 text-offwhite"
                              : "text-offwhite/70 hover:bg-offwhite/5"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                          <span className="flex-1 font-sans text-sm">{cmd.label[language]}</span>
                          {isActive && (
                            <ArrowRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between gap-4 border-t border-offwhite/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/40">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="border border-offwhite/15 rounded px-1 py-0.5">↑↓</kbd>
              {copy.hintNavigate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="border border-offwhite/15 rounded px-1 py-0.5 inline-flex items-center gap-0.5">
                <CornerDownLeft className="h-2.5 w-2.5" />
              </kbd>
              {copy.hintSelect}
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CommandIcon className="h-3 w-3" aria-hidden="true" />
            <span>K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
