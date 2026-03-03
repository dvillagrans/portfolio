const fs = require('fs');

const file = 'src/app/projects/timeup/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldSection = `<section className="flex flex-col sm:flex-row flex-wrap gap-4 mb-24 reveal-fade px-2">
        <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 border border-[#00C9FF]/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#00C9FF] transition-all hover:bg-[#00C9FF] hover:text-[#020406] hover:shadow-[0_0_20px_rgba(0,201,255,0.4)] rounded-full w-full sm:w-auto">
          {dict.links.public}
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 border border-[#4B5DFF]/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#4B5DFF] transition-all hover:bg-[#4B5DFF] hover:text-[#020406] hover:shadow-[0_0_20px_rgba(75,93,255,0.4)] rounded-full w-full sm:w-auto">
          {dict.links.business}
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>`;

const newSection = `<section className="flex flex-col sm:flex-row flex-wrap gap-5 mb-24 reveal-fade px-2">
        <a href="https://timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 bg-[linear-gradient(135deg,#00C9FF,#0088FF)] text-[#020406] px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 hover:bg-[linear-gradient(135deg,#00E3CC,#00C9FF)] shadow-[0_0_20px_rgba(0,201,255,0.4)] hover:shadow-[0_0_35px_rgba(0,201,255,0.7)] rounded-full w-full sm:w-auto">
          {dict.links.public}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
        <a href="https://negocios.timeup.mx" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center sm:justify-start gap-3 bg-white/[0.03] border border-[#4B5DFF]/40 text-[#4B5DFF] px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#4B5DFF] hover:text-white shadow-[0_0_15px_rgba(75,93,255,0.1)] hover:shadow-[0_0_30px_rgba(75,93,255,0.5)] rounded-full w-full sm:w-auto">
          {dict.links.business}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </section>`;

content = content.replace(oldSection, newSection);

fs.writeFileSync(file, content);
