const fs = require('fs');
const filepath = 'src/app/projects/timeup/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// Ensure links logic is reinstated first!
content = content.replace(
  'import { ArrowLeft } from "lucide-react";',
  'import { ArrowLeft, ArrowUpRight } from "lucide-react";'
);

const buttonTarget = `      {/* Meta Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 border-t border-b border-white/10 py-8 reveal-fade font-mono text-sm">
        {meta.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-white/40">{item.label}</span>
            <span className="normal-case text-white/90">{item.value}</span>
          </div>
        ))}
      </section>`;

const buttonReplacement = `      {/* Meta Grid */}
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
          App Usuarios
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black">
          App Negocios
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </section>`;

if(content.includes(buttonTarget)) {
    content = content.replace(buttonTarget, buttonReplacement);
}

const repeatedSectionTarget = `      {/* Visual System Context */}
      <section className="mb-32 reveal-fade">
        <h2 className="text-xs text-white/50 font-mono tracking-widest uppercase mb-12 border-b border-white/10 pb-4">02.5 // System Interfaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Hero Image - Admin Analytics */}
          <div className="md:col-span-12 relative h-[40vh] md:h-[70vh] w-full border border-white/10 bg-white/5 group overflow-hidden">
            <Image 
              src="/images/timeup/admin-analytics.png" 
              alt="TimeUp Admin Analytics Panel" 
              fill 
              className="object-cover object-left-top opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest border border-white/10 text-white/70">
              ROLE_ADMIN // ANALYTICS ENGINE
            </div>
          </div>

          {/* Sub Images - Staff & Owner */}
          <div className="md:col-span-6 relative h-[30vh] md:h-[50vh] w-full border border-white/10 bg-white/5 group overflow-hidden">
            <Image 
              src="/images/timeup/owner-finance.png" 
              alt="TimeUp Owner Financial Panel" 
              fill 
              className="object-cover object-left-top opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest border border-white/10 text-white/70">
              ROLE_OWNER // FINANCIAL METRICS
            </div>
          </div>

          <div className="md:col-span-6 relative h-[30vh] md:h-[50vh] w-full border border-white/10 bg-white/5 group overflow-hidden">
            <Image 
              src="/images/timeup/staff-dashboard.png" 
              alt="TimeUp Staff Daily Agenda" 
              fill 
              className="object-cover object-left-top opacity-60 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest border border-white/10 text-white/70">
              ROLE_STAFF // KINETIC AGENDA
            </div>
          </div>

        </div>
      </section>`;

// Replace second occurence but not first
const lastIndex = content.lastIndexOf(repeatedSectionTarget);
if (lastIndex !== -1 && content.indexOf(repeatedSectionTarget) !== lastIndex) {
    const beforeStr = content.substring(0, lastIndex);
    const afterStr = content.substring(lastIndex + repeatedSectionTarget.length);
    content = beforeStr + afterStr;
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n'); 
}

fs.writeFileSync(filepath, content, 'utf8');
console.log("Restored buttons and deleted duplicated interfaces section gracefully!");
