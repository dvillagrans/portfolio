"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "next-view-transitions";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, Copy, Check, RotateCcw, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cvBuilderEn, cvBuilderEs } from "@/i18n/dictionaries/cv-builder";
import type { CvBuilderDict } from "@/i18n/types";
import ReactMarkdown from "react-markdown";

type CvState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; markdown: string }
  | { status: "error"; message: string; retryAfter?: number };

export default function CvBuilderPage() {
  const { language } = useLanguage();
  const dict: CvBuilderDict = language === "es" ? cvBuilderEs : cvBuilderEn;

  const [jd, setJd] = useState("");
  const [state, setState] = useState<CvState>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Countdown timer for rate limit
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setState({ status: "idle" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Scroll to result on success
  useEffect(() => {
    if (state.status === "success" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state]);

  const isInputValid = jd.trim().length >= 10 && jd.length <= 10_000;

  const handleGenerate = useCallback(async () => {
    if (!isInputValid || state.status === "loading") return;

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/cv-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });

      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get("Retry-After") || "60", 10);
        setCountdown(retryAfter);
        setState({
          status: "error",
          message: dict.errorRateLimit.replace("{seconds}", String(retryAfter)),
          retryAfter,
        });
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", message: data.error || dict.errorGeneric });
        return;
      }

      setState({ status: "success", markdown: data.markdown });
    } catch {
      setState({ status: "error", message: dict.errorGeneric });
    }
  }, [isInputValid, state.status, jd, dict]);

  const handleCopy = useCallback(async () => {
    if (state.status !== "success") return;
    try {
      await navigator.clipboard.writeText(state.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text from a hidden pre element
      const pre = document.createElement("pre");
      pre.textContent = state.markdown;
      document.body.appendChild(pre);
      const range = document.createRange();
      range.selectNode(pre);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
      document.body.removeChild(pre);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [state]);

  const handleReset = useCallback(() => {
    setState({ status: "idle" });
    setCountdown(0);
    setCopied(false);
  }, []);

  const charCountText = dict.charCount
    .replace("{current}", String(jd.length))
    .replace("{max}", "10,000");

  return (
    <main
      id="main-content"
      className="min-h-screen w-full font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite pb-[env(safe-area-inset-bottom)]"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
      tabIndex={-1}
    >
      <Navbar />
      <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 md:px-12 md:py-32">
        {/* Header */}
        <header className="mb-16 mt-20 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/"
            className="group flex items-center min-h-[44px] gap-3 font-sans text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] spring-press"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">{dict.back}</span>
          </Link>
        </header>

        {/* Title */}
        <section className="mb-12">
          <h1
            className="font-serif text-4xl italic tracking-tight md:text-6xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {dict.title}
          </h1>
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-warm">
            {dict.subtitle}
          </p>
        </section>

        {/* Input Section */}
        <section className="mb-8">
          <label
            htmlFor="jd-input"
            className="block font-sans text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {dict.inputLabel}
          </label>
          <textarea
            ref={textareaRef}
            id="jd-input"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder={dict.inputPlaceholder}
            rows={8}
            maxLength={10_000}
            className="w-full resize-y rounded-2xl border px-5 py-4 font-sans text-sm leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-warm/30"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
            disabled={state.status === "loading"}
          />

          {/* Character count + validation */}
          <div className="mt-2 flex items-center justify-between">
            <span
              className="font-mono text-[10px]"
              style={{ color: jd.length > 10_000 ? "#ef4444" : "var(--text-muted)" }}
            >
              {charCountText}
            </span>
            {jd.length > 0 && jd.length < 10 && (
              <span className="font-sans text-[10px] text-amber-500">
                {dict.errorEmpty}
              </span>
            )}
          </div>
        </section>

        {/* Generate Button */}
        <section className="mb-12">
          {state.status === "error" && countdown > 0 ? (
            <div className="flex items-center gap-3">
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full font-sans text-xs font-bold uppercase tracking-widest opacity-50 cursor-not-allowed"
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {dict.retryAfter.replace("{seconds}", String(countdown))}
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={!isInputValid || state.status === "loading"}
              className="group inline-flex items-center justify-center gap-2 min-h-[48px] px-8 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all spring-press disabled:opacity-40 disabled:cursor-not-allowed bg-warm text-charcoal hover:bg-warm/90 shadow-[0_10px_30px_rgba(201,125,53,0.25)]"
            >
              {state.status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-charcoal/30 border-t-charcoal" />
                  {dict.generating}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {dict.generateButton}
                </>
              )}
            </button>
          )}
        </section>

        {/* Error State */}
        {state.status === "error" && countdown === 0 && (
          <section className="mb-12">
            <div
              className="rounded-2xl border px-6 py-5 font-sans text-sm"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.05)",
                borderColor: "rgba(239, 68, 68, 0.2)",
                color: "var(--text-primary)",
              }}
            >
              <p className="mb-3">{state.message}</p>
              <button
                onClick={handleGenerate}
                disabled={!isInputValid}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-warm hover:text-warm/80 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                {dict.generateAgain}
              </button>
            </div>
          </section>
        )}

        {/* Result Section */}
        {state.status === "success" && (
          <section ref={resultRef}>
            {/* Action bar */}
            <div className="mb-6 flex items-center gap-3 flex-wrap">
              <button
                onClick={handleCopy}
                className="group inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all spring-press border"
                style={{
                  backgroundColor: copied ? "rgba(34, 197, 94, 0.1)" : "var(--card)",
                  borderColor: copied ? "rgba(34, 197, 94, 0.3)" : "var(--border-color)",
                  color: copied ? "#22c55e" : "var(--text-secondary)",
                }}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    {dict.copied}
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    {dict.copyButton}
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="group inline-flex items-center justify-center gap-2 min-h-[44px] px-6 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all spring-press border"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border-color)",
                  color: "var(--text-secondary)",
                }}
              >
                <RotateCcw className="h-3.5 w-3.5 transition-transform group-hover:-rotate-180" />
                {dict.generateAgain}
              </button>
            </div>

            {/* Markdown rendered CV */}
            <div
              className="rounded-2xl border px-8 py-8 md:px-12 md:py-10 prose-cv"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border-color)",
              }}
            >
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2
                      className="font-sans text-[10px] font-bold uppercase tracking-widest mt-10 mb-4 pb-2 first:mt-0"
                      style={{
                        color: "var(--text-primary)",
                        borderBottom: "1px solid var(--border-color)",
                      }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3
                      className="font-sans text-sm font-bold mt-6 mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p
                      className="font-sans text-sm leading-relaxed mb-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-1.5 pl-5 font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-1.5 pl-5 font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="font-bold" style={{ color: "var(--text-primary)" }}>
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic" style={{ color: "var(--text-secondary)" }}>
                      {children}
                    </em>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-warm/40 hover:decoration-warm transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {state.markdown}
              </ReactMarkdown>
            </div>

            {/* Powered by */}
            <p
              className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {dict.poweredBy}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
