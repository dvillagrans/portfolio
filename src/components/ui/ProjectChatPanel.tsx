"use client";

import { useChat } from '@ai-sdk/react';
import { Terminal, Maximize2, Minimize2, Send, User, X } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';

const CHAT_INPUT_ID = 'project-chat-input';
const CHAT_TITLE_ID = 'project-chat-title';

type ChatMessagePart = { type: string; text?: string };
type ChatMessage = {
  id: string;
  role: string;
  content?: string;
  parts?: ChatMessagePart[];
};

interface ProjectChatPanelProps {
  open: boolean;
  language: string;
  reduced: boolean;
  onClose: () => void;
}

export function ProjectChatPanel({ open, language, reduced, onClose }: ProjectChatPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [greeting, setGreeting] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const PROMPTS_EN = useMemo(() => [
    "Ask about my work...",
    "What stack do you use?",
    "Show me your best project.",
    "What's your background?",
    "Are you available to hire?",
  ], []);

  const PROMPTS_ES = useMemo(() => [
    "Pregunta sobre mi trabajo...",
    "¿Qué tecnologías usas?",
    "Muéstrame tu mejor proyecto.",
    "¿Cuál es tu experiencia?",
    "¿Estás disponible para contratar?",
  ], []);

  const CHIP_LABELS_EN = useMemo(() => [
    "What's your tech stack?",
    "Best project?",
    "Background & experience",
    "Available to hire?",
  ], []);

  const CHIP_LABELS_ES = useMemo(() => [
    "¿Qué tecnologías usas?",
    "¿Mejor proyecto?",
    "Experiencia y trayectoria",
    "¿Disponible para contratar?",
  ], []);

  const { messages, sendMessage, status } = useChat() as {
    messages?: ChatMessage[];
    sendMessage: (opts: { text: string }) => void;
    status?: string;
  };
  const isLoading = status === 'streaming' || status === 'submitted';

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Time-of-day greeting
  useEffect(() => {
    const hour = new Date().getHours();
    const isEs = language === 'es';
    if (hour < 12) setGreeting(isEs ? 'Buenos días.' : 'Good morning.');
    else if (hour < 18) setGreeting(isEs ? 'Buenas tardes.' : 'Good afternoon.');
    else setGreeting(isEs ? 'Buenas noches.' : 'Good evening.');
  }, [language]);

  // Main Toggle Animation (panel side)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (open) {
        if (panelRef.current) {
          if (reduced) {
            gsap.set(panelRef.current, { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto', display: 'flex' });
          } else {
            gsap.fromTo(panelRef.current,
              { opacity: 0, scale: 0.9, y: 40 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: 'expo.out',
                pointerEvents: 'auto',
                display: 'flex',
                delay: 0.1
              }
            );
          }
        }
      } else {
        if (panelRef.current) {
          if (reduced) {
            gsap.set(panelRef.current, { opacity: 0, scale: 0.95, y: 30, pointerEvents: 'none' });
            if (panelRef.current) panelRef.current.style.display = 'none';
          } else {
            gsap.to(panelRef.current, {
              opacity: 0,
              scale: 0.95,
              y: 30,
              pointerEvents: 'none',
              duration: 0.4,
              ease: 'power2.inOut',
              onComplete: () => {
                if (panelRef.current) panelRef.current.style.display = 'none';
              }
            });
          }
        }
      }
    });

    return () => ctx.revert();
  }, [open, reduced]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input.trim() });
    setInput('');
  };

  const handleChipClick = (prompt: string) => {
    if (isLoading) return;
    sendMessage({ text: prompt });
  };

  const visibleMessages = (messages ?? []).filter((m) => m.role !== 'system');
  const hasMessages = visibleMessages.length > 0;

  const chipLabels = language === 'es' ? CHIP_LABELS_ES : CHIP_LABELS_EN;
  const chipPrompts = language === 'es' ? PROMPTS_ES : PROMPTS_EN;

  const emptyGreetingLine1 = language === 'es' ? '> Sistema listo.' : '> System ready.';
  const emptyGreetingLine2 = language === 'es'
    ? '> Pregúntame sobre pipelines, arquitectura o disponibilidad.'
    : '> Ask me about pipelines, architecture, or availability.';
  const inputHint = language === 'es'
    ? 'Presiona Enter para enviar · Shift+Enter para nueva línea'
    : 'Press Enter to send · Shift+Enter for new line';
  const footerLabel = language === 'es'
    ? 'Powered by DeepSeek-V3 · Respuestas sintéticas'
    : 'Powered by DeepSeek-V3 · Responses are synthetic';
  const ariaChatLabel = language === 'es' ? 'Chat sobre el trabajo de Diego' : "Chat about Diego's work";
  const srInputLabel = language === 'es' ? 'Pregunta sobre mi trabajo' : 'Ask about my work';

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={CHAT_TITLE_ID}
      aria-label={ariaChatLabel}
      style={{ opacity: 0, display: 'none', pointerEvents: 'none' }}
      className={`fixed z-50 flex flex-col bg-charcoal/95 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden
      ${isExpanded
        ? 'inset-0 rounded-none border-0 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]'
        : 'rounded-2xl inset-x-0 mx-auto bottom-[max(1.5rem,env(safe-area-inset-bottom))] h-[min(600px,80vh)] w-[min(450px,calc(100vw-2rem))]'
      }`}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none z-20"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,125,53,0.6) 20%, rgba(201,125,53,0.8) 50%, rgba(201,125,53,0.6) 80%, transparent 100%)' }}
        aria-hidden
      />

      {/* Subtle scan lines across panel */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)',
        }}
        aria-hidden
      />

      {/* Terminal title bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4 bg-charcoal/60">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warm/20 border border-warm/30">
            <Terminal className="h-4 w-4 text-warm" aria-hidden />
          </div>
          <div className="flex flex-col">
            <span id={CHAT_TITLE_ID} className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-offwhite">
              DV-OS Terminal
            </span>
            <span className="text-[10px] text-offwhite/40 uppercase tracking-widest font-mono">
              System Console v2.0
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full text-offwhite/40 transition-all hover:text-offwhite hover:bg-white/5"
            aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              onClose();
            }}
            className="flex min-w-[44px] min-h-[44px] items-center justify-center rounded-full text-offwhite/40 transition-all hover:text-offwhite hover:bg-white/5"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        role="log"
        aria-label="Chat messages"
        className={`relative z-10 flex-1 space-y-6 overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-white/10 ${isExpanded ? 'mx-auto w-full max-w-3xl' : ''}`}
      >
        {!hasMessages && (
          <div className="mt-12 flex flex-col items-center gap-5 px-4">
            <div className="h-px w-12 bg-warm/30"></div>
            <p className="font-garamond text-xl italic text-offwhite/90">{greeting}</p>

            {/* Terminal-style empty state */}
            <div className="flex flex-col items-start gap-1 font-mono text-[11px] text-offwhite/50 leading-relaxed max-w-[260px]">
              <span>{emptyGreetingLine1}</span>
              <span className="flex items-center">
                {emptyGreetingLine2}
                <span className="ml-1 inline-block w-[2px] h-[12px] bg-warm rounded-full animate-pulse" aria-hidden />
              </span>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-1 max-w-[320px]">
              {chipLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleChipClick(chipPrompts[i])}
                  className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-offwhite/50 hover:text-offwhite hover:border-warm/40 hover:bg-warm/10 transition-all duration-300"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="h-px w-12 bg-warm/30"></div>
          </div>
        )}

        {visibleMessages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] group ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-center gap-2 mb-2 opacity-30 group-hover:opacity-60 transition-opacity ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="h-4 w-4 rounded-full bg-white/10 flex items-center justify-center">
                  {m.role === 'user' ? <User className="h-2.5 w-2.5 text-offwhite" aria-hidden /> : <Terminal className="h-2.5 w-2.5 text-warm" aria-hidden />}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-offwhite">{m.role}</span>
              </div>

              <div className={`rounded-2xl px-4 py-3 font-sans text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-warm text-charcoal font-medium shadow-[0_10px_30px_rgba(201,125,53,0.25)]'
                  : 'bg-white/5 text-offwhite/90 border border-white/10 backdrop-blur-sm border-l-[2px] border-l-[var(--color-accent)]/30'
              }`}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4 opacity-90">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4 opacity-90">{children}</ol>,
                    li: ({ children }) => <li>{children}</li>,
                    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                    code: ({ children }) => <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-warm-light">{children}</code>,
                  }}
                >
                  {(m.parts ?? []).filter((p) => p.type === 'text').map((p) => p.text).join('') || m.content || ''}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-2.5">
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-warm" style={{ animationDelay: '0ms' }} />
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-warm" style={{ animationDelay: '150ms' }} />
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-warm" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`relative z-10 p-6 ${isExpanded ? 'mx-auto w-full max-w-3xl' : ''}`}>
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center"
        >
          <label htmlFor={CHAT_INPUT_ID} className="sr-only">
            {srInputLabel}
          </label>
          <input
            id={CHAT_INPUT_ID}
            type="text"
            className="w-full h-14 rounded-xl border border-white/10 bg-white/5 pl-5 pr-16 text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-warm/50 focus:bg-white/10 transition-all duration-300"
            value={input}
            placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-warm text-charcoal hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all duration-300 shadow-lg shadow-warm/20"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </form>
        <div className="mt-2 flex flex-col items-center gap-1">
          <p className="text-center font-mono text-[9px] uppercase tracking-[0.15em] text-offwhite/25">
            {inputHint}
          </p>
          <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-offwhite/20">
            {footerLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
