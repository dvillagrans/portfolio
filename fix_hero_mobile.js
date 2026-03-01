const fs = require('fs');
const filepath = 'src/components/sections/Hero.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// Container fixes
content = content.replace(
  'className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden pb-32 pl-8 md:pl-24"',
  'className="relative flex h-[100dvh] w-full flex-col justify-end overflow-hidden pb-20 md:pb-32 px-6 sm:pl-8 md:pl-24"'
);

// Title sizes (even more compact on mobile)
content = content.replace(
  'className="font-sans text-5xl font-medium tracking-tight text-offwhite md:text-[5.5rem] md:leading-[1.05]"',
  'className="font-sans text-4xl sm:text-5xl font-medium tracking-tight text-offwhite md:text-[5.5rem] md:leading-[1.05]"'
);

// Paragraph text readability on mobile
content = content.replace(
  'className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-gray-400 md:text-base selection:text-offwhite selection:bg-accent"',
  'className="mt-6 md:mt-8 max-w-2xl font-mono text-xs sm:text-sm leading-relaxed text-gray-400 md:text-base selection:text-offwhite selection:bg-accent"'
);

// Buttons on small screens can be full width
content = content.replace(
  'className="group mt-14 inline-flex items-center gap-3 border border-offwhite/20 px-8 py-4 font-mono text-xs uppercase tracking-widest text-offwhite transition-all hover:bg-offwhite hover:text-charcoal"',
  'className="group mt-10 md:mt-14 inline-flex items-center justify-center sm:justify-start w-full sm:w-auto gap-3 border border-offwhite/20 px-6 py-4 md:px-8 font-mono text-xs uppercase tracking-widest text-offwhite transition-all hover:bg-offwhite hover:text-charcoal"'
);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Hero Mobile layout applied!");
