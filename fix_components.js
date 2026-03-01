const fs = require('fs');

// Add marquee to homepage
let page = fs.readFileSync('src/app/page.tsx', 'utf8');
if (!page.includes('<Marquee />')) {
  page = page.replace(
    'import Architecture from "@/components/sections/Systems";', // using Systems component in import list
    'import Architecture from "@/components/sections/Systems";'
  );
  page = page.replace(
    'import Hero from "@/components/sections/Hero";',
    'import Hero from "@/components/sections/Hero";\nimport Marquee from "@/components/ui/Marquee";'
  );
  page = page.replace(
    '<FeaturedWork />',
    '<FeaturedWork />\n      <Marquee />'
  );
  fs.writeFileSync('src/app/page.tsx', page);
}

// Enhance Hero text positioning with a data panel
let hero = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');
if (!hero.includes('System Status')) {
  hero = hero.replace(
    '</section>',
    `  {/* Minimalist Data HUD */}
      <div className="absolute bottom-12 right-8 md:right-24 font-mono text-[10px] tracking-widest text-gray-500 uppercase text-right leading-relaxed hidden md:block">
        <div>System Status // <span className="text-accent">Online</span></div>
        <div>LAT: 40.7128° N</div>
        <div>LNG: 74.0060° W</div>
        <div className="mt-2 opacity-50">v2.0.4.stable</div>
      </div>
    </section>`
  );
  fs.writeFileSync('src/components/sections/Hero.tsx', hero);
}
