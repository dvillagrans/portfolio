const fs = require('fs');

const content = `"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const container = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const { t, language } = useLanguage();
  const tools = t.stack.tools;

  // Let's divide tools into intuitive categories just visually based on the list
  const dataScience = ["Python", "Pandas", "Numpy", "Matplotlib", "Seaborn", "Scikit-learn", "Tensorflow", "Keras", "PyTorch", "Yolo", "anaconda", "googlecolab"];
  const backend = ["PostgreSQL", "SQL", "Docker", "Kubernetes", "AmazonAWS", "Azure", "googlecloud"];
  const frontend = ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Astro", "Vercel"];
  
  // Categorize elements
  const categories = [
    {
       name: t.systems?.items?.[0]?.title || (language === 'es' ? 'Ciencia de Datos & IA' : 'Data Science & AI'),
       items: tools.filter(tool => dataScience.some(i => i.toLowerCase() === tool.toLowerCase()))
    },
    {
       name: t.systems?.items?.[1]?.title || (language === 'es' ? 'Infraestructura & Nube' : 'Infrastructure & Cloud'),
       items: tools.filter(tool => backend.some(i => i.toLowerCase() === tool.toLowerCase()))
    },
    {
       name: t.systems?.items?.[3]?.title || (language === 'es' ? 'Desarrollo de Plataforma' : 'Platform Development'),
       items: tools.filter(tool => frontend.some(i => i.toLowerCase() === tool.toLowerCase()))
    },
    {
       name: language === 'es' ? 'Herramientas Base' : 'Core Tools',
       items: tools.filter(tool => 
         !dataScience.some(i => i.toLowerCase() === tool.toLowerCase()) && 
         !backend.some(i => i.toLowerCase() === tool.toLowerCase()) && 
         !frontend.some(i => i.toLowerCase() === tool.toLowerCase())
       )
    }
  ].filter(c => c.items.length > 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate category blocks
      gsap.fromTo(
        ".stack-category",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        }
      );

      // Animate generic items (if flat list fallback)
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: container.current,
              start: "top 70%",
            },
            delay: (index % 10) * 0.03, 
          }
        );
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative bg-charcoal px-6 py-24 md:py-32 text-offwhite md:px-12 lg:px-24 overflow-hidden border-t border-offwhite/5 border-b">
      
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square rounded-full bg-accent/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-6 md:justify-center">
             <div className="h-[1px] w-12 bg-accent opacity-50 block md:hidden"></div>
             <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
               05. {t.stack.title}
             </span>
             <div className="h-[1px] w-12 bg-accent opacity-50 block md:hidden"></div>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl tracking-tight text-white mb-4 md:text-center">
             {language === 'es' ? (
                <>Tecnologías <span className="italic text-gray-500 font-light">&</span> Herramientas</>
             ) : (
                <>Technologies <span className="italic text-gray-500 font-light">&</span> Tooling</>
             )}
          </h2>
        </header>

        {/* Structured Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, cIdx) => (
             <div key={cIdx} className="stack-category group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-500"></span>
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                   {category.items.map((tool, iIdx) => (
                      <span
                        key={tool}
                        ref={(el) => {
                           if (cIdx === 0) itemsRef.current[iIdx] = el;
                        }}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 font-sans text-[13px] text-gray-300 hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 cursor-default"
                      >
                        {tool}
                      </span>
                   ))}
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/components/sections/Stack.tsx', content);
