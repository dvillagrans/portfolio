"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Link } from "next-view-transitions";
import { ArrowLeft, ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ArchiveProject } from "@/i18n/types";

function projectKey(project: ArchiveProject, idx: number): string {
  return `${project.year}-${idx}-${project.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

function hasDetails(p: ArchiveProject): boolean {
  return Boolean(
    p.description ||
    (p.technologies && p.technologies.length > 0) ||
    (p.metrics && p.metrics.length > 0)
  );
}

export default function SystemArchive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();
  const archive = t.archive;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  /* ─── Unique primary domains for filter pills ─── */
  const allDomains = useMemo(() => {
    if (!archive) return [];
    const set = new Set<string>();
    archive.projects.forEach((p) => {
      const primary = p.domain.split("/")[0].trim();
      if (primary) set.add(primary);
    });
    return Array.from(set).sort();
  }, [archive]);

  /* ─── Filter logic ─── */
  const filtered = useMemo(() => {
    if (!archive) return [];
    const q = searchQuery.trim().toLowerCase();
    return archive.projects.filter((p) => {
      if (selectedDomains.size > 0) {
        const primary = p.domain.split("/")[0].trim();
        if (!selectedDomains.has(primary)) return false;
      }
      if (q) {
        const hay = [
          p.title,
          p.domain,
          p.description ?? "",
          ...(p.technologies ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [archive, searchQuery, selectedDomains]);

  /* ─── Group by year ─── */
  const byYear = useMemo(() => {
    const grouped: Record<string, ArchiveProject[]> = {};
    filtered.forEach((p) => {
      if (!grouped[p.year]) grouped[p.year] = [];
      grouped[p.year].push(p);
    });
    return grouped;
  }, [filtered]);

  const years = useMemo(
    () => Object.keys(byYear).sort((a, b) => Number(b) - Number(a)),
    [byYear]
  );

  /* ─── Archive numbers: stable, descending order ─── */
  const projectArchiveNumber = useMemo(() => {
    const map = new Map<string, string>();
    if (!archive) return map;
    archive.projects.forEach((p, idx) => {
      const num = String(archive.projects.length - idx).padStart(3, "0");
      map.set(projectKey(p, idx), num);
    });
    return map;
  }, [archive]);

  /* ─── Entry animation ─── */
  useEffect(() => {
    if (!indexRef.current) return;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".archive-row", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".archive-row",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }, indexRef);
    return () => ctx.revert();
  }, [reduced, filtered.length]);

  const toggleDomain = useCallback((domain: string) => {
    setSelectedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedDomains(new Set());
  }, []);

  const hasActiveFilters = searchQuery !== "" || selectedDomains.size > 0;

  if (!archive) return null;

  const total = archive.projects.length;
  const showing = filtered.length;

  return (
    <main
      id="main-content"
      className="relative min-h-screen w-full overflow-x-hidden font-sans pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      tabIndex={-1}
    >
      {/* Background — bg-charcoal + subtle scan-line */}
      <div className="fixed inset-0 z-0 bg-charcoal">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(240,234,216,0.4) 3px, rgba(240,234,216,0.4) 4px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(240,234,216,0.04), transparent)",
          }}
        />
      </div>

      <Navbar />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-6xl px-6 pt-28 md:px-12 md:pt-32 lg:px-16"
      >
        {/* Top meta strip */}
        <header className="mb-12 flex items-center justify-between md:mb-16">
          <Link
            href="/"
            className="group inline-flex min-h-[44px] items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-offwhite/70 transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {archive.back}
          </Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/40">
            {total} {language === "es" ? "proyectos" : "projects"} · 2023—2026 ·{" "}
            <span className="text-warm/70">indexed live</span>
          </span>
        </header>

        {/* Title */}
        <div className="mb-16 md:mb-20">
          <h1
            className="font-serif italic tracking-tight text-offwhite"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
              lineHeight: 1,
              viewTransitionName: "page-title",
            }}
          >
            {archive.title}
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-offwhite/55 md:text-lg">
            {archive.subtitle}
          </p>
        </div>

        {/* ── Tools bar — sticky search + filters ── */}
        <div className="sticky top-16 z-20 -mx-6 mb-12 border-y border-offwhite/10 bg-charcoal/85 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:-mx-16 lg:px-16">
          <div className="flex flex-col gap-4">
            {/* Search input */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-offwhite/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === "es"
                    ? "Buscar en el archivo… (título, tech, descripción)"
                    : "Search the archive… (title, tech, description)"
                }
                className="w-full rounded-full border border-offwhite/15 bg-offwhite/[0.03] py-3 pl-12 pr-12 font-mono text-sm text-offwhite placeholder:text-offwhite/35 focus:border-warm/40 focus:bg-offwhite/[0.06] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-offwhite/50 transition-colors hover:bg-offwhite/10 hover:text-offwhite"
                  aria-label={language === "es" ? "Limpiar búsqueda" : "Clear search"}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/35 mr-1">
                {language === "es" ? "FILTRAR" : "FILTER"}
              </span>
              {allDomains.map((domain) => {
                const isOn = selectedDomains.has(domain);
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => toggleDomain(domain)}
                    className="rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                    style={{
                      borderColor: isOn ? "rgba(245,158,11,0.5)" : "rgba(240,234,216,0.1)",
                      background: isOn ? "rgba(245,158,11,0.12)" : "rgba(240,234,216,0.02)",
                      color: isOn ? "rgb(245,158,11)" : "rgba(240,234,216,0.55)",
                    }}
                  >
                    {domain}
                  </button>
                );
              })}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-offwhite/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-offwhite/60 transition-colors hover:border-offwhite/30 hover:text-offwhite"
                >
                  <X className="h-3 w-3" />
                  {language === "es" ? "LIMPIAR" : "CLEAR"}
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between border-t border-offwhite/[0.06] pt-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/40">
                {language === "es" ? "MOSTRANDO" : "SHOWING"}{" "}
                <span className="text-offwhite/90">
                  {String(showing).padStart(2, "0")}
                </span>{" "}
                / {String(total).padStart(2, "0")}
              </span>
              {hasActiveFilters && showing !== total && (
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-warm/70">
                  {language === "es" ? "FILTRADO" : "FILTERED"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Index ── */}
        <div ref={indexRef}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-32 text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/35">
                {language === "es" ? "ARCHIVO VACÍO" : "EMPTY ARCHIVE"}
              </span>
              <p className="max-w-xl font-serif text-2xl italic leading-snug text-offwhite/55 md:text-3xl">
                {language === "es"
                  ? "No hay nada en el archivo que coincida con esta búsqueda."
                  : "Nothing in the archive matches that query."}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm/10 px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-warm transition-all hover:bg-warm/20"
              >
                <X className="h-3 w-3" />
                {language === "es" ? "QUITAR FILTROS" : "CLEAR FILTERS"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-16 md:gap-24">
              {years.map((year) => (
                <section key={year} aria-labelledby={`year-${year}`}>
                  {/* Year divider */}
                  <div className="mb-8 flex items-end justify-between border-b border-offwhite/8 pb-6 md:mb-10">
                    <h2
                      id={`year-${year}`}
                      className="font-serif italic leading-none tracking-tight text-offwhite/90"
                      style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                    >
                      {year}
                    </h2>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/45">
                      {byYear[year].length}{" "}
                      {language === "es"
                        ? byYear[year].length === 1
                          ? "PROYECTO"
                          : "PROYECTOS"
                        : byYear[year].length === 1
                        ? "PROJECT"
                        : "PROJECTS"}
                    </span>
                  </div>

                  {/* Project rows */}
                  <div className="flex flex-col">
                    {byYear[year].map((project, pidx) => {
                      const globalIdx = archive.projects.indexOf(project);
                      const key = projectKey(project, globalIdx);
                      const isOpen = expanded === key;
                      const archiveNum = projectArchiveNumber.get(key) ?? "000";
                      const showExpand = hasDetails(project);

                      return (
                        <article
                          key={key}
                          className="archive-row group relative border-b border-offwhite/[0.06] last:border-b-0"
                        >
                          <div
                            className={`relative flex flex-col gap-3 py-6 transition-all duration-300 sm:flex-row sm:items-start sm:gap-6 md:py-7 ${
                              showExpand ? "cursor-pointer" : ""
                            }`}
                            onClick={() =>
                              showExpand && setExpanded((p) => (p === key ? null : key))
                            }
                          >
                            {/* Archive number */}
                            <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-2 sm:pt-1">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/35 group-hover:text-warm/80 transition-colors">
                                #{archiveNum}
                              </span>
                              {project.isFeatured && (
                                <span className="inline-flex items-center gap-1.5">
                                  <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warm opacity-60" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warm" />
                                  </span>
                                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-warm/80">
                                    {language === "es" ? "DESTACADO" : "FEATURED"}
                                  </span>
                                </span>
                              )}
                            </div>

                            {/* Title + Domain */}
                            <div className="min-w-0 flex-1">
                              <h3
                                className="font-serif tracking-tight text-offwhite/95 transition-colors group-hover:text-white"
                                style={{
                                  fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                                  lineHeight: 1.15,
                                }}
                              >
                                {project.title}
                              </h3>
                              <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/50">
                                {project.domain}
                              </p>
                            </div>

                            {/* Right side: chevron + quick links */}
                            <div
                              className="flex shrink-0 items-center gap-2 sm:pt-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {!showExpand && project.links && project.links.length > 0 && (
                                project.links.slice(0, 1).map((lnk, li) => (
                                  <a
                                    key={li}
                                    href={lnk.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-offwhite/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-offwhite/70 transition-all hover:border-warm/40 hover:text-warm"
                                  >
                                    {lnk.label}
                                    <ArrowUpRight className="h-3 w-3" />
                                  </a>
                                ))
                              )}
                              {showExpand && (
                                <ChevronDown
                                  className={`h-4 w-4 text-offwhite/40 transition-all duration-300 ${
                                    isOpen ? "rotate-180 text-warm" : ""
                                  }`}
                                />
                              )}
                            </div>
                          </div>

                          {/* Expanded detail panel */}
                          {showExpand && (
                            <div
                              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                              style={{ maxHeight: isOpen ? "500px" : "0" }}
                            >
                              <div className="pb-8 pl-0 pr-0 pt-2 sm:pl-28">
                                {project.description && (
                                  <p className="mb-6 max-w-3xl font-serif text-base leading-relaxed text-offwhite/70 md:text-lg">
                                    {project.description}
                                  </p>
                                )}

                                <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
                                  {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex-1">
                                      <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/35">
                                        {language === "es" ? "STACK" : "STACK"}
                                      </p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {project.technologies.map((tech) => (
                                          <span
                                            key={tech}
                                            className="rounded-full border border-offwhite/10 bg-offwhite/[0.03] px-2.5 py-1 font-mono text-[10px] text-offwhite/65"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {project.metrics && project.metrics.length > 0 && (
                                    <div>
                                      <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/35">
                                        {language === "es" ? "MÉTRICAS" : "METRICS"}
                                      </p>
                                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                                        {project.metrics.map((m, mi) => (
                                          <div key={mi} className="flex flex-col">
                                            <span className="font-mono text-xl font-bold tabular-nums text-offwhite md:text-2xl">
                                              {m.value}
                                            </span>
                                            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/40">
                                              {m.label}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* CTAs */}
                                {(project.caseStudy ||
                                  (project.links && project.links.length > 0) ||
                                  project.link) && (
                                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-offwhite/[0.06] pt-6">
                                    {project.caseStudy && (
                                      <Link
                                        href={project.caseStudy}
                                        className="inline-flex items-center gap-2 rounded-full bg-warm px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal transition-all hover:bg-warm/90"
                                      >
                                        {language === "es" ? "Caso de Estudio" : "Case Study"}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                      </Link>
                                    )}
                                    {project.links?.map((lnk, li) => (
                                      <a
                                        key={li}
                                        href={lnk.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-offwhite/15 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-offwhite/70 transition-all hover:border-offwhite/40 hover:text-offwhite"
                                      >
                                        {lnk.label}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                      </a>
                                    ))}
                                    {!project.links && project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-offwhite/15 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-offwhite/70 transition-all hover:border-offwhite/40 hover:text-offwhite"
                                      >
                                        {archive.viewProject}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Hover accent line */}
                          <div
                            className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-warm transition-transform duration-500 group-hover:scale-y-100"
                            aria-hidden="true"
                          />
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Closing signature */}
        <footer className="mt-32 flex flex-col items-end gap-3 border-t border-offwhite/8 pt-12 md:mt-44">
          <div className="h-[1px] w-24 bg-warm/30 md:w-32" />
          <p className="font-serif italic text-sm text-warm/70 md:text-base">
            — {language === "es" ? "Fin del archivo" : "End of archive"}
          </p>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/30">
            {language === "es" ? "DIEGO VILLAGRAN · 2026" : "DIEGO VILLAGRAN · 2026"}
          </p>
        </footer>
      </div>
    </main>
  );
}
