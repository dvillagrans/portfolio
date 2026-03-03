const fs = require('fs');

const file = 'src/app/projects/timeup/page.tsx';
let data = fs.readFileSync(file, 'utf8');

// The original base uses `#1A1A1A` or pure black and `#E5E4E2` for text in places.
// We can gently inject some cyan (`#00C9FF`) and violet (`#4B5DFF`) by updating `accent` colors 
// specifically inside the TimeUp case study or by replacing some hardcoded colors.

// We will inject a custom style block to override root styles for this specific page, or applying 
// inline classes that match the branding while keeping the portfolio dark motif.

// Replace arbitrary "accent" variables in className with custom ones like `text-[#00C9FF]`

// Backgrounds
data = data.replace(/bg-zinc-900\/50/g, 'bg-[#020406]/50'); // deepBlue shadow
data = data.replace(/bg-black\/50/g, 'bg-[#0A0A0A]/50'); // obsidian
data = data.replace(/bg-zinc-900/g, 'bg-[#1A1A1A]'); // charcoal base

// Colors
data = data.replace(/text-zinc-500/g, 'text-[#71797E]'); // steel
data = data.replace(/text-zinc-400/g, 'text-[#A8A9AD]'); // chrome
data = data.replace(/text-gray-400/g, 'text-[#A8A9AD]'); // chrome
data = data.replace(/text-gray-300/g, 'text-[#E5E4E2]'); // platinum

// Borders
data = data.replace(/border-white\/10/g, 'border-[#2A2A2A]'); // slate border
data = data.replace(/border-zinc-800/g, 'border-[#2A2A2A]');

// Accent Replacements
data = data.replace(/text-white/g, 'text-[#FFFFFF]'); // enforce true white on headers

// Hero Title
data = data.replace(
  /<h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight mb-6">/g, 
  '<h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,#00C9FF,#00E3CC,#4B5DFF)] drop-shadow-2xl">'
);

// We keep the logic structural but adjust pure tailwind utilities to the palette 

fs.writeFileSync(file, data);

