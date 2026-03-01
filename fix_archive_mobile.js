const fs = require('fs');
const filepath = 'src/app/projects/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Base Container margins and padding
content = content.replace(
  'className="relative z-10 mx-auto max-w-6xl px-8 py-16 md:px-24 md:py-32" ref={containerRef}',
  'className="relative z-10 mx-auto max-w-6xl px-5 py-12 md:px-24 md:py-32" ref={containerRef}'
);

// Header margins
content = content.replace(
  'className="mb-24 flex items-center justify-between"',
  'className="mb-16 md:mb-24 flex items-center justify-between"'
);

// Title margins & sizes
content = content.replace(
  'className="mb-24"',
  'className="mb-16 md:mb-24"'
);
content = content.replace(
  'className="font-serif text-5xl italic tracking-tight text-offwhite md:text-7xl"',
  'className="font-serif text-4xl sm:text-5xl italic tracking-tight text-offwhite md:text-7xl"'
);

// 2. The Table - By default tables are horrible on mobile. Since it has `overflow-x-auto` and `min-w-[800px]`, users have to scroll horizontally on phones.
// Let's modify the table so that on mobile it acts as a stacked flex grid, and only behaves as a traditional table on `md:` breakpoints.

// Make the scroll container purely block on mobile, overflow-auto only if absolutely needed but better to break it down
content = content.replace(
  '<div className="w-full overflow-x-auto">',
  '<div className="w-full">'
);

// Redefine table layout
content = content.replace(
  'className="w-full text-left font-mono text-sm col-span-full border-collapse min-w-[800px]"',
  'className="w-full text-left font-mono text-sm col-span-full border-collapse block md:table"'
);

content = content.replace(
  '<thead>',
  '<thead className="hidden md:table-header-group">'
);

content = content.replace(
  '<tbody className="text-gray-300">',
  '<tbody className="text-gray-300 block md:table-row-group">'
);

// Modify the TR loop to act as a stackable block on mobile
content = content.replace(
  'className={`group border-b transition-colors ${',
  'className={`group border-b transition-colors block md:table-row relative pb-6 md:pb-0 pt-4 md:pt-0 ${'
);

// First cell (Year & Case Study badge)
content = content.replace(
  '<td className="py-6 pl-2 pr-6 align-top">',
  '<td className="md:py-6 md:pl-2 md:pr-6 align-top block md:table-cell mb-2 md:mb-0 text-gray-500 md:text-gray-300">'
);

// Second cell (Project Title)
content = content.replace(
  '<td className={`py-6 px-6 align-top font-sans text-lg font-medium ${project.isFeatured ? \'text-accent font-bold\' : \'text-offwhite\'}`}>',
  '<td className={`md:py-6 md:px-6 align-top font-sans text-xl md:text-lg font-medium block md:table-cell mb-1 md:mb-0 ${project.isFeatured ? \'text-accent font-bold\' : \'text-offwhite\'}`}>'
);

// Third cell (Domain)
content = content.replace(
  '<td className="py-6 px-6 align-top text-gray-500">',
  '<td className="md:py-6 md:px-6 align-top text-xs md:text-sm text-gray-500 block md:table-cell mb-4 md:mb-0">'
);

// Fourth cell (Links)
content = content.replace(
  '<td className="py-6 px-6 text-right align-top">',
  '<td className="md:py-6 md:px-6 text-left md:text-right align-top block md:table-cell">'
);

// Force the flex col inside the last cell to align left on mobile, right on desktop
content = content.replace(
  '<div className="flex flex-col items-end gap-3">',
  '<div className="flex flex-row md:flex-col items-center md:items-end flex-wrap gap-4 md:gap-3">'
);

fs.writeFileSync(filepath, content, 'utf8');
console.log("Archive Mobile layout applied!");
