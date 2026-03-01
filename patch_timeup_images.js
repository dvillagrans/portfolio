const fs = require('fs');

let content = fs.readFileSync('src/app/projects/timeup/page.tsx', 'utf8');

// We will inject an Image component import and update the Layout to include a dense visual grid.

if (!content.includes('import Image')) {
  content = content.replace(
    'import { ScrollTrigger } from "gsap/ScrollTrigger";',
    `import { ScrollTrigger } from "gsap/ScrollTrigger";\nimport Image from "next/image";`
  );
}

const visualGridHtml = `
      {/* Visual System Context */}
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
      </section>
`;

// Insert the visual grid right after the Constraints section
const insertTarget = `</section>\n\n      {/* 3. Architecture ASCII */}`;
content = content.replace(insertTarget, `</section>\n\n` + visualGridHtml + `\n      {/* 3. Architecture ASCII */}`);

fs.writeFileSync('src/app/projects/timeup/page.tsx', content);

