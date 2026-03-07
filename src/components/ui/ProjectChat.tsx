"use client";

import { useChat } from '@ai-sdk/react';
import { Bot, Maximize2, Minimize2, Send, User, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const CHAT_INPUT_ID = 'project-chat-input';
const CHAT_TITLE_ID = 'project-chat-title';

type ChatMessagePart = { type: string; text?: string };
type ChatMessage = {
  id: string;
  role: string;
  content?: string;
  parts?: ChatMessagePart[];
};

export function ProjectChat({ context }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat() as {
    messages?: ChatMessage[];
    sendMessage: (opts: { text: string }) => void;
    status?: string;
  };
  const isLoading = status === 'streaming' || status === 'submitted';

  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const visibleMessages = (messages ?? []).filter((m) => m.role !== 'system');
  const hasMessages = visibleMessages.length > 0;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open portfolio chat"
        className="fixed z-50 flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border border-charcoal/20 bg-offwhite px-4 py-3 font-mono text-xs text-charcoal shadow-xl transition-all hover:bg-charcoal hover:text-offwhite right-[max(1.5rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <Bot className="h-4 w-4" aria-hidden />
        <span>Ask about my work</span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={CHAT_TITLE_ID}
      aria-label="Chat about Diego's work"
      className={`fixed z-50 flex flex-col bg-offwhite shadow-2xl transition-all duration-300 ease-in-out
      ${isExpanded
        ? 'inset-0 rounded-none border-0 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]'
        : 'rounded-xl border border-charcoal/20 right-[max(1.5rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] h-[min(500px,85vh)] w-[min(350px,calc(100vw-2rem))]'
      }`}
    >
      <div className="flex items-center justify-between rounded-t-xl border-b border-charcoal/10 bg-charcoal px-4 py-3 text-offwhite">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent" aria-hidden />
          <span id={CHAT_TITLE_ID} className="font-mono text-xs uppercase tracking-widest">
            Ask about Diego's work
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-offwhite/70 transition-colors hover:text-offwhite focus-visible:outline-none"
            aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsExpanded(false);
            }}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-offwhite/70 transition-colors hover:text-offwhite focus-visible:outline-none"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        role="log"
        aria-label="Chat messages"
        className={`flex-1 space-y-4 overflow-y-auto p-4 font-sans text-base sm:text-sm ${isExpanded ? 'mx-auto w-full max-w-3xl' : ''}`}
      >
        {!hasMessages && (
          <div className="mt-10 text-center font-mono text-xs text-charcoal/60">
            Ask anything about Diego's work.
          </div>
        )}

        {visibleMessages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 ${m.role === 'user' ? 'bg-charcoal text-offwhite' : 'bg-charcoal/5 text-charcoal border border-charcoal/10'}`}
            >
              <div className="mb-1 flex items-center gap-2 opacity-50">
                {m.role === 'user' ? <User className="h-3 w-3" aria-hidden /> : <Bot className="h-3 w-3" aria-hidden />}
                <span className="font-mono text-[10px] uppercase tracking-wider">{m.role}</span>
              </div>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-1 list-disc space-y-0.5 pl-4">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-1 list-decimal space-y-0.5 pl-4">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children }) => <code className="rounded bg-black/10 px-1 font-mono text-xs">{children}</code>,
                }}
              >
                {(m.parts ?? []).filter((p) => p.type === 'text').map((p) => p.text).join('') || m.content || ''}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[85%] items-center gap-1 rounded-lg border border-charcoal/10 bg-charcoal/5 px-3 py-2 text-charcoal">
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-charcoal/50" />
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-charcoal/50" style={{ animationDelay: '0.15s' }} />
              <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-charcoal/50" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`flex gap-2 rounded-b-xl border-t border-charcoal/10 bg-white p-3 ${isExpanded ? 'mx-auto w-full max-w-3xl' : ''}`}
      >
        <label htmlFor={CHAT_INPUT_ID} className="sr-only">
          Ask about a project or my stack
        </label>
        <input
          id={CHAT_INPUT_ID}
          type="text"
          className="flex-1 min-h-[44px] rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-base sm:text-sm text-charcoal placeholder:text-charcoal/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-offwhite"
          value={input}
          placeholder="Ask about a project or my stack"
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          autoComplete="off"
          aria-label="Ask about a project or my stack"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md bg-accent text-charcoal transition-colors hover:bg-accent/80 disabled:opacity-50 focus-visible:outline-none"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
