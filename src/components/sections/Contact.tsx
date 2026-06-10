"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Colophon from "@/components/ui/Colophon";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name: boolean; email: boolean; message: boolean }>({
    name: false, email: false, message: false
  });
  const [shakeForm, setShakeForm] = useState(false);
  const magneticEmail = useMagnetic({ strength: 10, radius: 150 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        if (container.current) {
          const charcoal = getComputedStyle(document.documentElement).getPropertyValue("--color-charcoal").trim() || "#090a0a";
          gsap.set(container.current, { backgroundColor: charcoal });
        }
        if (textRef.current) {
          gsap.set(textRef.current.children, { opacity: 1, y: 0, rotateX: 0 });
        }
        return;
      }

      const charcoal = getComputedStyle(document.documentElement).getPropertyValue("--color-charcoal").trim() || "#090a0a";
      const graphite = getComputedStyle(document.documentElement).getPropertyValue("--color-graphite").trim() || "#1a1b1e";
      gsap.fromTo(
        container.current,
        { backgroundColor: graphite },
        {
          backgroundColor: charcoal,
          scrollTrigger: {
            trigger: container.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 100, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 60%",
            },
          }
        );
      }
    }, container);
    return () => ctx.revert();
  }, [reduced]);

  // Animate form in when it appears
  useEffect(() => {
    if (showForm && formRef.current) {
      const children = Array.from(formRef.current.children) as HTMLElement[];
      if (reduced) {
        gsap.set(formRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(children, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        formRef.current,
        { opacity: 0, scale: 0.97, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "expo.out" }
      );
      gsap.fromTo(
        children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [showForm, reduced]);

  function validateField(field: "name" | "email" | "message", value: string): string | undefined {
    switch (field) {
      case "name":
        if (!value.trim()) return t.contact.errorRequired || "Name is required";
        if (value.trim().length < 2) return t.contact.errorNameShort || "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value.trim()) return t.contact.errorRequired || "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t.contact.errorEmailInvalid || "Please enter a valid email";
        return undefined;
      case "message":
        if (!value.trim()) return t.contact.errorRequired || "Message is required";
        if (value.trim().length < 10) return t.contact.errorMessageShort || "Message must be at least 10 characters";
        return undefined;
    }
  }

  function validateAll(): boolean {
    const newErrors: typeof errors = {};
    newErrors.name = validateField("name", name);
    newErrors.email = validateField("email", email);
    newErrors.message = validateField("message", message);
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
      setName(""); setEmail(""); setMessage("");
      setErrors({});
      setTouched({ name: false, email: false, message: false });
      setTimeout(() => { setStatus("idle"); setShowForm(false) }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-center bg-charcoal py-32 text-offwhite pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Dynamic Grid Overlay for Contact */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none" aria-hidden="true"></div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-accent/10 blur-[150px] opacity-50 rounded-full pointer-events-none" aria-hidden="true"></div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl">

        {/* Typographic Hero */}
        <h2
          ref={textRef}
          className="mb-16 flex flex-col gap-2 font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight lg:text-[7rem] leading-[1.1] perspective-[1000px]"
        >
          <span className="block">{t.contact.title1}</span>
          <span className="block text-offwhite/60 italic">{t.contact.title2}</span>
        </h2>

        {/* Action Buttons */}
        {!showForm ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            <a
              href={`mailto:${t.contact.email}`}
              ref={magneticEmail.ref as React.RefObject<HTMLAnchorElement>}
              className="group relative inline-flex items-center min-h-[44px] gap-4 overflow-hidden border border-offwhite/20 bg-transparent px-8 py-4 font-sans text-sm font-semibold tracking-[0.1em] text-offwhite transition-all duration-500 hover:border-warm hover:bg-warm hover:text-charcoal spring-press"
            >
              <span className="relative z-10 font-bold uppercase">{t.contact.email}</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            </a>

            <div className="h-8 w-[1px] bg-warm/30 hidden sm:block"></div>

            <button
              onClick={() => setShowForm(true)}
              type="button"
              className="group inline-flex items-center min-h-[44px] gap-3 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-offwhite/60 hover:text-warm transition-all duration-300 spring-press"
            >
              {t.contact.bookSession}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <div
            ref={formRef}
            className="mt-8 w-full max-w-lg bg-graphite p-5 sm:p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl text-left"
          >
            <div className="flex items-center justify-between mb-8">
               <span className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase text-warm/80">
                 {t.contact.formLabel}
               </span>
               <button type="button" onClick={() => setShowForm(false)} aria-label="Close form" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-offwhite/50 hover:text-white text-2xl font-light leading-none transition-colors">
                 &times;
               </button>
            </div>

            <p className="text-base text-offwhite/70 mb-8 font-sans">{t.contact.bookDesc}</p>

            <form onSubmit={handleSubmit} noValidate className={`flex flex-col gap-6 ${shakeForm ? "form-shake" : ""}`} onAnimationEnd={() => setShakeForm(false)}>
              <div className="relative group">
                <input
                  type="text" required id="name"
                  placeholder=" "
                  value={name}
                  onChange={e => {
                    const val = e.target.value;
                    setName(val);
                    const err = validateField("name", val);
                    setErrors(prev => ({ ...prev, name: err }));
                  }}
                  onBlur={() => {
                    setTouched(prev => ({ ...prev, name: true }));
                    setErrors(prev => ({ ...prev, name: validateField("name", name) }));
                  }}
                  className={`peer w-full bg-transparent border-b focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none py-3 text-white font-sans text-lg transition-colors placeholder-transparent focus:bg-white/[0.02] px-2 rounded-t-lg ${
                    touched.name && errors.name
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/20 focus:border-accent"
                  }`}
                />
                <label htmlFor="name" className="absolute left-2 top-3 font-mono text-xs text-offwhite/60 uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px]">
                  {t.contact.formName}
                </label>
                {touched.name && errors.name && (
                  <p className="mt-1.5 text-xs text-red-400/90 font-sans flex items-center gap-1.5">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="relative group mt-2">
                <input
                  type="email" required id="email"
                  placeholder=" "
                  value={email}
                  onChange={e => {
                    const val = e.target.value;
                    setEmail(val);
                    const err = validateField("email", val);
                    setErrors(prev => ({ ...prev, email: err }));
                  }}
                  onBlur={() => {
                    setTouched(prev => ({ ...prev, email: true }));
                    setErrors(prev => ({ ...prev, email: validateField("email", email) }));
                  }}
                  className={`peer w-full bg-transparent border-b focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none py-3 text-white font-sans text-lg transition-colors placeholder-transparent focus:bg-white/[0.02] px-2 rounded-t-lg ${
                    touched.email && errors.email
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/20 focus:border-accent"
                  }`}
                />
                <label htmlFor="email" className="absolute left-2 top-3 font-mono text-xs text-offwhite/60 uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px]">
                  {t.contact.formEmail}
                </label>
                {touched.email && errors.email && (
                  <p className="mt-1.5 text-xs text-red-400/90 font-sans flex items-center gap-1.5">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative group mt-2">
                <textarea
                  required id="message" rows={3}
                  placeholder=" "
                  value={message}
                  onChange={e => {
                    const val = e.target.value;
                    setMessage(val);
                    const err = validateField("message", val);
                    setErrors(prev => ({ ...prev, message: err }));
                  }}
                  onBlur={() => {
                    setTouched(prev => ({ ...prev, message: true }));
                    setErrors(prev => ({ ...prev, message: validateField("message", message) }));
                  }}
                  className={`peer w-full bg-transparent border-b focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none py-3 text-white font-sans text-lg transition-colors resize-none placeholder-transparent focus:bg-white/[0.02] px-2 rounded-t-lg ${
                    touched.message && errors.message
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/20 focus:border-accent"
                  }`}
                />
                <label htmlFor="message" className="absolute left-2 top-3 font-mono text-xs text-offwhite/60 uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px]">
                  {t.contact.formMessage}
                </label>
                {touched.message && errors.message && (
                  <p className="mt-1.5 text-xs text-red-400/90 font-sans flex items-center gap-1.5">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.message}
                  </p>
                )}
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm text-green-400 font-sans">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {t.contact.formSuccess}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400 font-sans">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {t.contact.formError}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`mt-6 flex min-h-[44px] items-center justify-center gap-3 px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.15em] transition-all disabled:opacity-50 spring-press ${
                  status === 'success'
                    ? 'bg-warm text-charcoal shadow-lg shadow-warm/20'
                    : status === 'error'
                    ? 'bg-red-500/80 text-white'
                    : 'bg-offwhite text-charcoal hover:bg-warm hover:shadow-lg hover:shadow-warm/20'
                }`}
              >
                {status === 'loading' ? t.contact.formLoading : status === 'success' ? t.contact.formSuccess : status === 'error' ? t.contact.formError : t.contact.formSubmit}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Footer Ribbon */}
        <Colophon />

      </div>
    </section>
  );
}
