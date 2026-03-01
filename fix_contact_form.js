const fs = require('fs');
const filepath = 'src/components/sections/Contact.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const targetImport = `import { useLanguage } from "@/i18n/LanguageContext";`;
const replImport = `import { useLanguage } from "@/i18n/LanguageContext";\nimport { useState } from "react";`;

const targetFn = `export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();`;

const replFn = `export default function Contact() {
  const container = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { t } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showForm, setShowForm] = useState(false);

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
  };`;

const targetJSX = `        <a
          href={\`mailto:\${t.contact.email}\`}
          className="group relative mt-16 font-mono text-sm uppercase tracking-[0.2em] text-offwhite transition-colors hover:text-accent"
        >
          {t.contact.email}
          <div className="absolute -bottom-2 left-0 h-[1px] w-full bg-offwhite/20 transition-all duration-300 group-hover:bg-accent" />
          <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
        </a>

        <div className="mt-32 flex w-full items-center justify-between border-t border-offwhite/10 pt-8 font-mono text-xs uppercase tracking-widest text-gray-500">`;

const replJSX = `        <div className="mt-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <a
            href={\`mailto:\${t.contact.email}\`}
            className="group relative font-mono text-sm uppercase tracking-[0.2em] text-offwhite transition-colors hover:text-accent"
          >
            {t.contact.email}
            <div className="absolute -bottom-2 left-0 h-[1px] w-full bg-offwhite/20 transition-all duration-300 group-hover:bg-accent" />
            <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
          </a>
          
          <span className="hidden md:inline font-mono text-charcoal-400 opacity-50">/</span>

          <button
            onClick={() => setShowForm(!showForm)}
            className="group relative font-mono text-sm uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-80"
          >
            {t.contact.bookSession}
            <div className="absolute -bottom-2 left-0 h-[1px] w-full bg-accent/20 transition-all duration-300 group-hover:bg-accent" />
            <div className="absolute -bottom-2 left-0 h-[1px] w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
          </button>
        </div>

        {showForm && (
          <div className="mt-12 w-full max-w-md bg-graphite/50 p-8 rounded-2xl border border-offwhite/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-gray-400 mb-6 font-mono">{t.contact.bookDesc}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <div>
                <input 
                  type="text" required
                  placeholder={t.contact.formName}
                  value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-offwhite/10 focus:border-accent outline-none py-2 text-offwhite font-sans transition-colors"
                />
              </div>
              <div>
                <input 
                  type="email" required
                  placeholder={t.contact.formEmail}
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-offwhite/10 focus:border-accent outline-none py-2 text-offwhite font-sans transition-colors"
                />
              </div>
              <div>
                <textarea 
                  required rows={3}
                  placeholder={t.contact.formMessage}
                  value={message} onChange={e => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-offwhite/10 focus:border-accent outline-none py-2 text-offwhite font-sans transition-colors resize-none"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="mt-4 px-6 py-3 border border-offwhite/20 rounded-full font-mono text-xs uppercase tracking-widest text-offwhite hover:bg-offwhite hover:text-charcoal transition-all disabled:opacity-50"
              >
                {status === 'loading' ? '...' : status === 'success' ? t.contact.formSuccess : status === 'error' ? t.contact.formError : t.contact.formSubmit}
              </button>
            </form>
          </div>
        )}

        <div className="mt-24 md:mt-32 flex w-full items-center justify-between border-t border-offwhite/10 pt-8 font-mono text-xs uppercase tracking-widest text-gray-500">`;

content = content.replace(targetImport, replImport);
content = content.replace(targetFn, replFn);
content = content.replace(targetJSX, replJSX);

fs.writeFileSync(filepath, content, 'utf8');
