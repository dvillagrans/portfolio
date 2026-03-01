const fs = require('fs');
const filepath = 'src/app/projects/timeup/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(
  'import { ArrowLeft } from "lucide-react";',
  'import { ArrowLeft, ArrowUpRight } from "lucide-react";'
);

const target = `      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 border-t border-b border-white/10 py-8 reveal-fade font-mono text-sm">
        {meta.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40">{item.label}</span>
            <span className="normal-case text-white/90">{item.value}</span>
          </div>
        ))}
      </section>`;

const replacement = `      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-t border-b border-white/10 py-8 reveal-fade font-mono text-sm">
        {meta.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40">{item.label}</span>
            <span className="normal-case text-white/90">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Live URLs */}
      <section className="flex flex-wrap gap-4 mb-32 reveal-fade">
        <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black">
          App Usuarios [LIVE]
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black">
          App Negocios [LIVE]
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </section>`;

if(content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Updated case study page with buttons");
} else {
    console.log("Target not found");
}
