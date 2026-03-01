const fs = require('fs');
const filepath = 'src/app/projects/timeup/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. App container: change pt-32 pb-32 to pt-24 pb-20 on mobile
content = content.replace(
  'className="min-h-screen pt-32 pb-32 px-6 md:px-12 lg:px-24 text-white uppercase tracking-wide"',
  'className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-32 px-5 md:px-12 lg:px-24 text-white uppercase tracking-wide"'
);

// 2. Reduce hero margins and font sizes on mobile
content = content.replace(
  'className="mb-24 reveal-fade max-w-5xl"',
  'className="mb-16 md:mb-24 reveal-fade max-w-5xl"'
);
content = content.replace(
  'className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-none"',
  'className="text-5xl md:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-none"'
);

// 3. Meta grid adjust spacing and text sizes
content = content.replace(
  'className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 border-t border-b border-white/10 py-8 reveal-fade font-mono text-sm"',
  'className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mb-12 md:mb-16 border-t border-b border-white/10 py-6 md:py-8 reveal-fade font-mono text-xs md:text-sm"'
);

// 4. Buttons group (Live URLs) scaling down horizontal padding slightly on mobile
// Make buttons full width on very small screens for easier tapping
content = content.replace(
  'className="flex flex-wrap gap-4 mb-32 reveal-fade"',
  'className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-20 md:mb-32 reveal-fade"'
);
content = content.replaceAll(
  'className="group flex items-center gap-3 border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"',
  'className="group flex items-center justify-center sm:justify-start gap-3 border border-white/20 px-4 py-3 md:px-6 md:py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black w-full sm:w-auto"'
);


// 5. Image sizes on mobile need to be more responsive, right now they are forced heavily via vh.
// h-[40vh] is probably too tall for mobile given the landscape nature of the dashboard
// Change h-[40vh] -> h-[25vh] (mobile)
content = content.replace(
  'className="md:col-span-12 relative h-[40vh] md:h-[70vh] w-full border border-white/10 bg-white/5 group overflow-hidden"',
  'className="md:col-span-12 relative h-[25vh] sm:h-[40vh] md:h-[70vh] w-full border border-white/10 bg-white/5 group overflow-hidden"'
);

// Change h-[30vh] -> h-[25vh] (mobile)
content = content.replaceAll(
  'className="md:col-span-6 relative h-[30vh] md:h-[50vh] w-full border border-white/10 bg-white/5 group overflow-hidden"',
  'className="md:col-span-6 relative h-[25vh] sm:h-[30vh] md:h-[50vh] w-full border border-white/10 bg-white/5 group overflow-hidden"'
);


// 6. Fix image container titles (ROLE_ADMIN, etc) covering too much on mobile
content = content.replaceAll(
  'className="text-[10px] text-white/50 mb-2 block border-l border-white/20 pl-2"',
  'className="text-[9px] md:text-[10px] text-white/50 mb-2 block border-l border-white/20 pl-2"'
);

content = content.replaceAll(
  'className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest border border-white/10 text-white/70"',
  'className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2 py-1 md:px-3 font-mono text-[9px] md:text-[10px] tracking-widest border border-white/10 text-white/70"'
);

// 7. Adjust section spacing heavily (mb-32 to mb-20 md:mb-32)
content = content.replaceAll('className="mb-32 grid', 'className="mb-20 md:mb-32 grid');
content = content.replaceAll('className="mb-32 reveal-fade"', 'className="mb-20 md:mb-32 reveal-fade"');

// 8. Architecture Block / Pre tags need proper overflow
content = content.replace(
  'className="bg-black/40 border border-white/10 p-8 font-mono text-[10px] md:text-xs text-white/60 overflow-x-auto whitespace-pre"',
  'className="bg-black/40 border border-white/10 p-4 md:p-8 font-mono text-[8px] md:text-xs text-white/60 overflow-x-auto whitespace-pre w-[85vw] md:w-full"'
);

// 9. Fix structural headings sticky positioning issues on mobile (unwanted overlaps)
content = content.replaceAll('sticky top-32', 'relative md:sticky md:top-32 mb-6 md:mb-0');

fs.writeFileSync(filepath, content, 'utf8');
console.log("Responsive changes applied to TimeUp case study!");
