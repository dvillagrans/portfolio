"use client";

import { useChat } from '@ai-sdk/react';
import { Bot, Maximize2, Minimize2, Send, User, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export function ProjectChat({ context }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat() as any;
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-charcoal/20 bg-offwhite px-4 py-3 font-mono text-xs text-charcoal shadow-xl transition-all hover:bg-charcoal hover:text-offwhite"
      >
        <Bot className="h-4 w-4" />
        <span>Ask about my work</span>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 flex flex-col bg-offwhite shadow-2xl transition-all duration-300 ease-in-out
      ${isExpanded
        ? 'inset-0 rounded-none border-0'
        : 'bottom-6 right-6 h-[500px] w-[350px] rounded-xl border border-charcoal/20'
      }`}>
      <div className="flex items-center justify-between border-b border-charcoal/10 px-4 py-3 bg-charcoal text-offwhite rounded-t-xl">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest">Portfolio AI</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-offwhite/70 hover:text-offwhite transition-colors"
            title={isExpanded ? 'Minimize' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="text-offwhite/70 hover:text-offwhite transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm ${isExpanded ? 'max-w-3xl w-full mx-auto' : ''}`}>
        {(messages ?? []).filter((m: any) => m.role !== 'system').length === 0 && (
          <div className="text-center text-gray-500 mt-10 font-mono text-xs">
            Ask anything about Diego's work.
          </div>
        )}

        {(messages ?? []).filter((m: any) => m.role !== 'system').map((m: any) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 ${m.role === 'user' ? 'bg-charcoal text-offwhite' : 'bg-gray-100 text-charcoal'}`}>
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {m.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                <span className="text-[10px] font-mono uppercase tracking-wider">{m.role}</span>
              </div>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 mb-1 space-y-0.5">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 mb-1 space-y-0.5">{children}</ol>,
                  li: ({ children }) => <li>{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children }) => <code className="bg-black/10 rounded px-1 font-mono text-xs">{children}</code>,
                }}
              >
                {(m.parts ?? []).filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || m.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg px-3 py-2 bg-gray-100 text-charcoal flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-charcoal/50 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-charcoal/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 bg-charcoal/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={`border-t border-charcoal/10 p-3 bg-white rounded-b-xl flex gap-2 ${isExpanded ? 'max-w-3xl w-full mx-auto' : ''}`}>
        <input
          className="flex-1 rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal"
          value={input}
          placeholder="Ask a question..."
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex items-center justify-center rounded-md bg-accent px-3 py-2 text-charcoal transition-colors hover:bg-accent/80 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
