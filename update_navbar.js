const fs = require('fs');
const filepath = 'src/components/layout/Navbar.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// The fundamental issue is there's no hamburger menu or mobile-visible links.
// Let's add a Lucide-react Menu icon and a conditional mobile menu.
// First, update imports
content = content.replace(
  'import { useLanguage } from "@/i18n/LanguageContext";',
  'import { useLanguage } from "@/i18n/LanguageContext";\nimport { Menu, X } from "lucide-react";'
);

// Add mobileMenu state
content = content.replace(
  'const [scrolled, setScrolled] = useState(false);',
  'const [scrolled, setScrolled] = useState(false);\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);'
);

// Re-write the returned JSX to include a hamburger toggle and an absolute drop-down menu on mobile
const targetRender = `  return (
    <nav
      ref={navRef}
      className={\`fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-full px-6 py-3 transition-all duration-500 will-change-transform \${
        scrolled
          ? "w-[90%] max-w-4xl bg-offwhite/90 text-charcoal backdrop-blur-md border border-charcoal/10 shadow-sm md:w-[600px]"
          : "w-[90%] max-w-4xl bg-transparent text-offwhite border border-transparent md:w-[600px]"
      }\`}
    >
      <div className="text-sm font-semibold tracking-wide uppercase font-sans">
        DIEGO VILLAGRAN // <span className="font-mono text-xs opacity-70 ml-1">v2.0</span>
      </div>
      <div className="flex items-center gap-2 md:gap-6">
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        <li>
          <a href="#projects" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.projects}
          </a>
        </li>
        <li>
          <a href="#systems" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.systems}
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.contact}
          </a>
        </li>
      </ul>
      <button
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className={\`ml-4 font-mono text-xs border rounded-full px-3 py-1 transition-colors \${
          scrolled
            ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
            : "border-offwhite/20 hover:bg-offwhite hover:text-charcoal"
        }\`}
      >
        {language === "en" ? "ES" : "EN"}
      </button>
    </div>
    </nav>
  );`;

const newRender = `  return (
    <nav
      ref={navRef}
      className={\`fixed top-4 md:top-6 left-1/2 z-50 flex flex-col -translate-x-1/2 rounded-[2rem] transition-all duration-500 will-change-transform \${
        (scrolled || mobileMenuOpen)
          ? "w-[95%] sm:w-[90%] max-w-4xl bg-offwhite/95 text-charcoal backdrop-blur-xl border border-charcoal/10 shadow-lg md:w-[600px]"
          : "w-[95%] sm:w-[90%] max-w-4xl bg-transparent text-offwhite border border-transparent md:w-[600px]"
      }\`}
    >
      <div className="flex items-center justify-between px-5 md:px-6 py-3 w-full">
        <div className="text-xs md:text-sm font-semibold tracking-wide uppercase font-sans">
          DIEGO VILLAGRAN <span className="hidden sm:inline">// </span><span className="font-mono text-[10px] md:text-xs opacity-70 sm:ml-1">v2.0</span>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li><a href="#projects" className="hover:opacity-60 transition-opacity duration-300">{t.nav.projects}</a></li>
            <li><a href="#systems" className="hover:opacity-60 transition-opacity duration-300">{t.nav.systems}</a></li>
            <li><a href="#contact" className="hover:opacity-60 transition-opacity duration-300">{t.nav.contact}</a></li>
          </ul>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className={\`font-mono text-[10px] md:text-xs border rounded-full px-2 py-1 md:px-3 md:py-1 transition-colors \${
                (scrolled || mobileMenuOpen)
                  ? "border-charcoal/20 hover:bg-charcoal hover:text-offwhite"
                  : "border-offwhite/20 hover:bg-offwhite hover:text-charcoal"
              }\`}
            >
              {language === "en" ? "ES" : "EN"}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={\`md:hidden overflow-hidden transition-all duration-500 ease-in-out \${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}\`}>
        <ul className="flex flex-col items-center gap-4 py-6 px-6 border-t border-charcoal/5">
          <li className="w-full text-center">
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.projects}
            </a>
          </li>
          <li className="w-full text-center">
            <a href="#systems" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.systems}
            </a>
          </li>
          <li className="w-full text-center">
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-sm font-semibold tracking-widest uppercase hover:text-accent transition-colors">
              {t.nav.contact}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );`;

if(content.includes(targetRender)) {
    content = content.replace(targetRender, newRender);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Navbar mobile menu added!");
} else {
    console.log("Navbar target not found.");
}
