"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight, ArrowRight, CheckCircle2, AlertCircle, Github, Linkedin } from "lucide-react";
import Colophon from "@/components/ui/Colophon";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const labels = t.contact;
  const reduced = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [shakeForm, setShakeForm] = useState(false);
  const magneticEmail = useMagnetic({ strength: 8, radius: 120 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;
      if (reduced) {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 72%",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (showForm && formRef.current) {
      const children = Array.from(formRef.current.children) as HTMLElement[];
      if (reduced) {
        gsap.set(formRef.current, { opacity: 1, y: 0 });
        gsap.set(children, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
      gsap.fromTo(
        children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.08 }
      );
    }
  }, [showForm, reduced]);

  function validateField(field: "name" | "email" | "message", value: string): string | undefined {
    switch (field) {
      case "name":
        if (!value.trim()) return labels.errorRequired;
        if (value.trim().length < 2) return labels.errorNameShort;
        return undefined;
      case "email":
        if (!value.trim()) return labels.errorRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return labels.errorEmailInvalid;
        return undefined;
      case "message":
        if (!value.trim()) return labels.errorRequired;
        if (value.trim().length < 10) return labels.errorMessageShort;
        return undefined;
    }
  }

  function validateAll(): boolean {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!validateAll()) {
      setShakeForm(true);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
      setTouched({ name: false, email: false, message: false });
      setTimeout(() => {
        setStatus("idle");
        setShowForm(false);
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      ref={container}
      className="relative flex min-h-[85vh] flex-col items-center justify-center border-t border-offwhite/6 bg-charcoal py-24 text-offwhite md:py-32"
      style={{
        paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
        paddingRight: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      <div ref={contentRef} className="relative z-10 w-full max-w-3xl">
        <header className="mb-10 text-center md:mb-12">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-offwhite/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-offwhite/50">
              {labels.eyebrow}
            </span>
            <div className="h-px w-8 bg-offwhite/20" />
          </div>
          <h2 className="font-serif text-4xl tracking-tight text-offwhite md:text-5xl lg:text-6xl">
            {labels.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-offwhite/55 md:text-base">
            {labels.subtitle}
          </p>
          <p className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/35">
            {labels.focusLine}
          </p>
        </header>

        {!showForm ? (
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={`mailto:${labels.email}`}
                ref={magneticEmail.ref as React.RefObject<HTMLAnchorElement>}
                className="group inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg bg-warm px-8 py-3.5 font-sans text-sm font-semibold text-charcoal transition-opacity hover:opacity-90 spring-press"
              >
                {labels.email}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={() => setShowForm(true)}
                type="button"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-offwhite/15 px-8 py-3.5 font-sans text-sm font-medium text-offwhite/75 transition-colors hover:border-offwhite/30 hover:text-offwhite spring-press"
              >
                {labels.bookSession}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/30">
                {labels.labelSocial}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={labels.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-offwhite/10 text-offwhite/55 transition-colors hover:border-offwhite/25 hover:text-offwhite"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={labels.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-offwhite/10 text-offwhite/55 transition-colors hover:border-offwhite/25 hover:text-offwhite"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={formRef}
            className="mx-auto w-full max-w-lg rounded-2xl border border-offwhite/10 bg-white/[0.03] p-6 text-left md:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-offwhite/45">
                {labels.formLabel}
              </span>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-offwhite/45 transition-colors hover:text-offwhite"
              >
                &times;
              </button>
            </div>

            <p className="mb-6 font-sans text-sm text-offwhite/58">{labels.bookDesc}</p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className={`flex flex-col gap-5 ${shakeForm ? "form-shake" : ""}`}
              onAnimationEnd={() => setShakeForm(false)}
            >
              <FieldInput
                id="name"
                label={labels.formName}
                value={name}
                error={touched.name ? errors.name : undefined}
                onChange={(val) => {
                  setName(val);
                  setErrors((prev) => ({ ...prev, name: validateField("name", val) }));
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, name: true }));
                  setErrors((prev) => ({ ...prev, name: validateField("name", name) }));
                }}
              />
              <FieldInput
                id="email"
                type="email"
                label={labels.formEmail}
                value={email}
                error={touched.email ? errors.email : undefined}
                onChange={(val) => {
                  setEmail(val);
                  setErrors((prev) => ({ ...prev, email: validateField("email", val) }));
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, email: true }));
                  setErrors((prev) => ({ ...prev, email: validateField("email", email) }));
                }}
              />
              <FieldTextarea
                id="message"
                label={labels.formMessage}
                value={message}
                error={touched.message ? errors.message : undefined}
                onChange={(val) => {
                  setMessage(val);
                  setErrors((prev) => ({ ...prev, message: validateField("message", val) }));
                }}
                onBlur={() => {
                  setTouched((prev) => ({ ...prev, message: true }));
                  setErrors((prev) => ({ ...prev, message: validateField("message", message) }));
                }}
              />

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-green-400/90 font-sans">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {labels.formSuccess}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400/90 font-sans">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {labels.formError}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`mt-2 flex min-h-[48px] items-center justify-center gap-2 rounded-lg px-8 py-3.5 font-sans text-sm font-semibold transition-all disabled:opacity-50 spring-press ${
                  status === "success"
                    ? "bg-warm text-charcoal"
                    : status === "error"
                      ? "bg-red-500/80 text-white"
                      : "bg-offwhite text-charcoal hover:bg-warm"
                }`}
              >
                {status === "loading"
                  ? labels.formLoading
                  : status === "success"
                    ? labels.formSuccess
                    : status === "error"
                      ? labels.formError
                      : labels.formSubmit}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        <Colophon />
      </div>
    </section>
  );
}

function FieldInput({
  id,
  label,
  value,
  error,
  type = "text",
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-offwhite/40">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full rounded-lg border bg-white/[0.02] px-3 py-3 font-sans text-base text-offwhite transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm/40 ${
          error ? "border-red-400/50" : "border-offwhite/12 focus:border-offwhite/25"
        }`}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400/90 font-sans">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function FieldTextarea({
  id,
  label,
  value,
  error,
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-offwhite/40">
        {label}
      </label>
      <textarea
        id={id}
        required
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full resize-none rounded-lg border bg-white/[0.02] px-3 py-3 font-sans text-base text-offwhite transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-warm/40 ${
          error ? "border-red-400/50" : "border-offwhite/12 focus:border-offwhite/25"
        }`}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400/90 font-sans">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
