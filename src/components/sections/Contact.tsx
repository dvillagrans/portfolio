"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowUpRight, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:120px_120px] pointer-events-none"></div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-accent/10 blur-[150px] opacity-50 rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl">
        
        {/* Typographic Hero */}
        <h2 
          ref={textRef} 
          className="mb-16 flex flex-col gap-2 font-serif text-5xl font-light tracking-tight md:text-7xl lg:text-[7rem] leading-[1.1] perspective-[1000px]"
        >
          <span className="block">{t.contact.title1}</span>
          <span className="block text-offwhite/60 italic">{t.contact.title2}</span>
        </h2>

        {/* Action Buttons */}
        {!showForm ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
            <a
              href={`mailto:${t.contact.email}`}
              className="group relative inline-flex items-center min-h-[44px] gap-4 overflow-hidden border border-offwhite/20 bg-transparent px-8 py-4 font-sans text-sm font-semibold tracking-[0.1em] text-offwhite transition-all duration-500 hover:border-warm hover:bg-warm hover:text-charcoal active:scale-[0.98]"
            >
              <span className="relative z-10 font-bold uppercase">{t.contact.email}</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            </a>

            <div className="h-8 w-[1px] bg-warm/30 hidden sm:block"></div>

            <button
              onClick={() => setShowForm(true)}
              type="button"
              className="group inline-flex items-center min-h-[44px] gap-3 px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-offwhite/60 hover:text-warm transition-all duration-300 active:scale-[0.98]"
            >
              {t.contact.bookSession}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ) : (
          <div
            ref={formRef}
            className="mt-8 w-full max-w-lg bg-graphite p-6 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl text-left"
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
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative group">
                  <input
                  type="text" required id="name"
                  placeholder=" "
                  value={name} onChange={e => setName(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/20 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none py-3 text-white font-sans text-lg transition-colors placeholder-transparent focus:bg-white/[0.02] px-2 rounded-t-lg"
                />
                <label htmlFor="name" className="absolute left-2 top-3 font-mono text-xs text-offwhite/60 uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px]">
                  {t.contact.formName}
                </label>
              </div>
              
              <div className="relative group mt-2">
                <input
                  type="email" required id="email"
                  placeholder=" "
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/20 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none py-3 text-white font-sans text-lg transition-colors placeholder-transparent focus:bg-white/[0.02] px-2 rounded-t-lg"
                />
                <label htmlFor="email" className="absolute left-2 top-3 font-mono text-xs text-offwhite/60 uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px]">
                  {t.contact.formEmail}
                </label>
              </div>

              <div className="relative group mt-2">
                <textarea
                  required id="message" rows={3}
                  placeholder=" "
                  value={message} onChange={e => setMessage(e.target.value)}
                  className="peer w-full bg-transparent border-b border-white/20 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal focus:outline-none py-3 text-white font-sans text-lg transition-colors resize-none placeholder-transparent focus:bg-white/[0.02] px-2 rounded-t-lg"
                />
                <label htmlFor="message" className="absolute left-2 top-3 font-mono text-xs text-offwhite/60 uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[10px]">
                  {t.contact.formMessage}
                </label>
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`mt-6 flex min-h-[44px] items-center justify-center gap-3 px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-[0.15em] transition-all disabled:opacity-50 active:scale-[0.98] ${
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
        <div className="mt-32 md:mt-48 flex flex-col md:flex-row w-full items-center justify-between border-t border-white/10 pt-10 font-sans text-xs text-offwhite/50 gap-6">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-warm rounded-full animate-pulse"></div>
             <span>{new Date().getFullYear()} {t.contact.footerText}</span>
          </div>
          <div className="flex gap-6 text-[11px] uppercase tracking-[0.2em] font-bold">
            <a href={t.contact.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center hover:text-accent transition-colors py-2">Github</a>
            <a href={t.contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center hover:text-accent transition-colors py-2">LinkedIn</a>
          </div>
        </div>

      </div>
    </section>
  );
}
