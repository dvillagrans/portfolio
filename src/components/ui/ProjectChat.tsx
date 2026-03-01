"use client";

import { useChat } from '@ai-sdk/react';
import { Bot, Send, User, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ProjectChat({ context }: { context?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const initialMessages = [];
  if (context) {
    initialMessages.push({
      id: 'system-1',
      role: 'system',
      content: `The user is currently viewing the following context/project: ${context}. Consider this when answering.`
    });
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading } : any = useChat({
    initialMessages: initialMessages as any,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
    <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col rounded-xl border border-charcoal/20 bg-offwhite shadow-2xl">
      <div className="flex items-center justify-between border-b border-charcoal/10 px-4 py-3 bg-charcoal text-offwhite rounded-t-xl">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest">Portfolio AI</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-offwhite/70 hover:text-offwhite transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
        {messages.filter(m => m.role !== 'system').length === 0 && (
          <div className="text-center text-gray-500 mt-10 font-mono text-xs">
            I can answer technical questions, explain architecture decisions, and summarize the projects documented here.
          </div>
        )}
        
        {messages.filter(m => m.role !== 'system').map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg px-3 py-2 ${m.role === 'user' ? 'bg-charcoal text-offwhite' : 'bg-gray-100 text-charcoal'}`}>
              <div className="flex items-center gap-2 mb-1 opacity-50">
                {m.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                <span className="text-[10px] font-mono uppercase tracking-wider">{m.role}</span>
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg px-3 py-2 bg-gray-100 text-charcoal flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-charcoal/50 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-charcoal/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-charcoal/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-charcoal/10 p-3 bg-white rounded-b-xl flex gap-2">
        <input
          className="flex-1 rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-charcoal"
          value={input}
          placeholder="Ask a question..."
          onChange={handleInputChange}
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
