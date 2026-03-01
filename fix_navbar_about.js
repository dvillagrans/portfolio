const fs = require('fs');

let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// Ensure the new "About" dictionary key is mapped properly in the nav
if(!code.includes('t.nav.about')) {
  let listSearch = `        <li>
          <a href="#systems" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.systems}
          </a>
        </li>`;
  
  let appendAbout = `        <li>
          <a href="#systems" className="hover:opacity-60 transition-opacity duration-300">
            {t.nav.systems}
          </a>
        </li>
        <li>
          <a href="/about" className="hover:opacity-60 transition-opacity duration-300">
             {(t.nav as any).about || (language === 'en' ? 'Thinking' : 'Criterio')}
          </a>
        </li>`;

  code = code.replace(listSearch, appendAbout);
  fs.writeFileSync('src/components/layout/Navbar.tsx', code);
}

