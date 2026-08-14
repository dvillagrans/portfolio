"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { Link } from "next-view-transitions";
import { ArrowLeft, ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { accentAlpha } from "@/components/sections/Scene";
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

function featuredRank(title: string): number {
  if (title.includes("EyeNet")) return 0;
  if (title.includes("COVID") || title.includes("riesgo")) return 1;
  if (title.includes("NYC") || title.includes("Ride-Hailing")) return 2;
  if (title.includes("India") || title.includes("Air Quality")) return 3;
  if (title.includes("Bouquet")) return 4;
  if (title.includes("TimeUp")) return 5;
  return 99;
}

function shortTitle(title: string): string {
  const parts = title.split(/\s*[—–-]\s*/);
  return parts[0]?.trim() || title;
}

function ProjectCtas({
  project,
  caseStudyLabel,
  viewProjectLabel,
  compact = false,
}: {
  project: ArchiveProject;
  caseStudyLabel: string;
  viewProjectLabel: string;
  compact?: boolean;
}) {
  const hasLinks =
    project.caseStudy ||
    (project.links && project.links.length > 0) ||
    project.link;
  if (!hasLinks) return null;

  const btnBase = compact
    ? "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] transition-all"
    : "inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.caseStudy &&
        (project.caseStudy.startsWith("http") ? (
          <a
            href={project.caseStudy}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} bg-warm text-charcoal hover:bg-warm/90`}
          >
            {caseStudyLabel}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        ) : (
          <Link
            href={project.caseStudy}
            className={`${btnBase} bg-warm text-charcoal hover:bg-warm/90`}
          >
            {caseStudyLabel}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        ))}
      {project.links?.map((lnk, li) => (
        <a
          key={li}
          href={lnk.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} border border-offwhite/15 text-offwhite/70 hover:border-offwhite/35 hover:text-offwhite`}
        >
          {lnk.label}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      ))}
      {!project.links && project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnBase} border border-offwhite/15 text-offwhite/70 hover:border-offwhite/35 hover:text-offwhite`}
        >
          {viewProjectLabel}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const archive = t.archive;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<string | null>(null);

  const allDomains = useMemo(() => {
    if (!archive) return [];
    const set = new Set<string>();
    archive.projects.forEach((p) => {
      const primary = p.domain.split("/")[0].trim();
      if (primary) set.add(primary);
    });
    return Array.from(set).sort();
  }, [archive]);

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
          p.summary ?? "",
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

  const featuredProjects = useMemo(() => {
    if (!archive) return [];
    return archive.projects
      .filter((p) => p.isFeatured)
      .sort((a, b) => featuredRank(a.title) - featuredRank(b.title));
  }, [archive]);

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
  }, [reduced]);

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

  if (!archive) return null;

  const total = archive.projects.length;
  const showing = filtered.length;
  const hasActiveFilters = searchQuery !== "" || selectedDomains.size > 0;

  return (
    <main
      id="main-content"
      className="relative min-h-screen w-full overflow-x-hidden font-sans pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      tabIndex={-1}
    >
      <div className="fixed inset-0 z-0 bg-charcoal">
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
        <header className="mb-10 flex items-center justify-between md:mb-12">
          <Link
            href="/"
            className="group inline-flex min-h-[44px] items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-offwhite/70 transition-colors hover:text-offwhite"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {archive.back}
          </Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/40">
            {total} {archive.metaLine}
          </span>
        </header>

        <div className="mb-12 md:mb-16">
          <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-warm/80">
            {archive.eyebrow}
          </p>
          <h1
            className="font-display italic tracking-tight text-offwhite"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              viewTransitionName: "page-title",
            }}
          >
            {archive.title}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-offwhite/55 md:text-lg">
            {archive.subtitle}
          </p>
        </div>

        {!hasActiveFilters && featuredProjects.length > 0 && (
          <section className="mb-14 md:mb-20" aria-labelledby="featured-case-studies">
            <h2
              id="featured-case-studies"
              className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-offwhite/45"
            >
              {archive.featuredTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, idx) => {
                const key = projectKey(project, idx);
                const topMetric = project.metrics?.[0];
                const blurb =
                  project.summary ||
                  project.description?.slice(0, 120) ||
                  project.domain;

                return (
                  <article
                    key={key}
                    className="flex flex-col justify-between rounded-2xl border border-offwhite/10 p-5 transition-colors hover:border-offwhite/20"
                    style={{ background: accentAlpha("#f0ead8", 0.03) }}
                  >
                    <div>
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/40">
                        {project.domain.split("/")[0].trim()}
                      </p>
                      <h3 className="mt-2 font-display text-xl tracking-tight text-offwhite">
                        {shortTitle(project.title)}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-offwhite/55">
                        {blurb}
                      </p>
                      {topMetric && (
                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="font-mono text-lg font-bold tabular-nums text-offwhite">
                            {topMetric.value}
                          </span>
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-offwhite/40">
                            {topMetric.label}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-5 border-t border-offwhite/[0.06] pt-4">
                      <ProjectCtas
                        project={project}
                        caseStudyLabel={archive.caseStudyLabel}
                        viewProjectLabel={archive.viewProject}
                        compact
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <div className="sticky top-16 z-20 -mx-6 mb-12 border-y border-offwhite/10 bg-charcoal/85 px-6 py-5 backdrop-blur-md md:-mx-12 md:px-12 lg:-mx-16 lg:px-16">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-offwhite/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={archive.searchPlaceholder}
                className="w-full rounded-full border border-offwhite/15 bg-offwhite/[0.03] py-3 pl-12 pr-12 font-mono text-sm text-offwhite placeholder:text-offwhite/35 focus:border-warm/40 focus:bg-offwhite/[0.06] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-offwhite/50 transition-colors hover:bg-offwhite/10 hover:text-offwhite"
                  aria-label={archive.clearLabel}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/35">
                {archive.filterLabel}
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
                  {archive.clearLabel}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-offwhite/[0.06] pt-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/40">
                {archive.showingLabel}{" "}
                <span className="text-offwhite/90">{showing}</span> / {total}
              </span>
              {hasActiveFilters && showing !== total && (
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-warm/70">
                  {archive.filteredLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        <div ref={indexRef}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-32 text-center">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/35">
                {archive.emptyTitle}
              </span>
              <p className="max-w-xl font-display text-2xl italic leading-snug text-offwhite/55 md:text-3xl">
                {archive.emptyHint}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-full border border-warm/40 bg-warm/10 px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-warm transition-all hover:bg-warm/20"
              >
                <X className="h-3 w-3" />
                {archive.clearFiltersLabel}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-12 md:gap-16">
              {years.map((year) => (
                <section key={year} aria-labelledby={`year-${year}`}>
                  <div className="mb-6 flex items-end justify-between border-b border-offwhite/8 pb-4">
                    <h2
                      id={`year-${year}`}
                      className="font-display italic leading-none tracking-tight text-offwhite/85"
                      style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                    >
                      {year}
                    </h2>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/45">
                      {byYear[year].length}{" "}
                      {byYear[year].length === 1
                        ? archive.yearProjectOne
                        : archive.yearProjectMany}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    {byYear[year].map((project, _pidx) => {
                      const globalIdx = archive.projects.indexOf(project);
                      const key = projectKey(project, globalIdx);
                      const isOpen = expanded === key;
                      const showExpand = hasDetails(project);

                      return (
                        <article
                          key={key}
                          className="archive-row group relative border-b border-offwhite/[0.06] last:border-b-0"
                        >
                          <div className="relative flex flex-col gap-4 py-6 md:py-7">
                            <div
                              className={`flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${
                                showExpand ? "cursor-pointer" : ""
                              }`}
                              onClick={() =>
                                showExpand && setExpanded((p) => (p === key ? null : key))
                              }
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                  {project.isFeatured && (
                                    <span className="inline-flex items-center rounded-full border border-warm/30 bg-warm/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-warm/90">
                                      {archive.featuredBadge}
                                    </span>
                                  )}
                                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/45">
                                    {project.domain}
                                  </p>
                                </div>
                                <h3
                                  className="mt-2 font-display tracking-tight text-offwhite/95 transition-colors group-hover:text-white"
                                  style={{
                                    fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {project.title}
                                </h3>
                                {project.summary && !isOpen && (
                                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-offwhite/50">
                                    {project.summary}
                                  </p>
                                )}
                              </div>

                              {showExpand && (
                                <ChevronDown
                                  className={`h-4 w-4 shrink-0 text-offwhite/40 transition-all duration-300 sm:mt-1 ${
                                    isOpen ? "rotate-180 text-warm" : ""
                                  }`}
                                />
                              )}
                            </div>

                            <div onClick={(e) => e.stopPropagation()}>
                              <ProjectCtas
                                project={project}
                                caseStudyLabel={archive.caseStudyLabel}
                                viewProjectLabel={archive.viewProject}
                              />
                            </div>
                          </div>

                          {showExpand && (
                            <div
                              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                              style={{ maxHeight: isOpen ? "500px" : "0" }}
                            >
                              <div className="pb-8 pt-1">
                                {project.description && (
                                  <p className="mb-6 max-w-3xl font-display text-base leading-relaxed text-offwhite/70 md:text-lg">
                                    {project.description}
                                  </p>
                                )}

                                <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-10">
                                  {project.technologies && project.technologies.length > 0 && (
                                    <div className="flex-1">
                                      <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-offwhite/35">
                                        {archive.labelStack}
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
                                        {archive.labelMetrics}
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
                              </div>
                            </div>
                          )}

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

        <footer className="mt-24 flex flex-col items-start gap-4 border-t border-offwhite/8 pt-12 md:mt-32">
          <p className="font-display text-lg italic text-offwhite/70 md:text-xl">
            {archive.footerCta}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-warm px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal transition-all hover:bg-warm/90"
          >
            {archive.footerContact}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
