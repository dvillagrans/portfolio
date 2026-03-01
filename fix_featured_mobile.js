const fs = require('fs');
const filepath = 'src/components/sections/FeaturedWork.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// padding fixes
content = content.replace(
  'className="relative bg-offwhite px-8 py-32 text-charcoal md:px-24"',
  'className="relative bg-offwhite px-5 py-24 md:py-32 text-charcoal md:px-24"'
);
content = content.replace(
  'className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-charcoal/10 pb-12"',
  'className="mb-16 md:mb-24 flex flex-col gap-4 md:gap-6 md:flex-row md:items-end md:justify-between border-b border-charcoal/10 pb-8 md:pb-12"'
);
content = content.replace(
  'className="flex flex-col gap-12 border-t border-charcoal/10 pt-12"',
  'className="flex flex-col gap-8 md:gap-12 border-t border-charcoal/10 pt-8 md:pt-12"'
);
content = content.replace(
  'className="group relative flex flex-col gap-8 md:flex-row md:items-start p-8 transition-colors duration-500 hover:bg-gray-100/50 rounded-3xl"',
  'className="group relative flex flex-col gap-8 md:flex-row md:items-start p-6 md:p-8 transition-colors duration-500 hover:bg-gray-100/50 rounded-3xl"'
);

// We need the link reveal animation to always show on mobile. `opacity-0` and `group-hover:opacity-100` makes it unclickable/invisible on mobile touch devices unless tapped first.
// Solution: add `md:` prefix to the opacity hover state so on mobile it's always visible.
content = content.replaceAll(
  'className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"',
  'className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent opacity-100 translate-x-0 md:opacity-0 transform md:translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"'
);

content = content.replaceAll(
  'className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"',
  'className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal opacity-100 translate-x-0 md:opacity-0 transform md:translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"'
);


fs.writeFileSync(filepath, content, 'utf8');
console.log("Featured Mobile layout applied!");
