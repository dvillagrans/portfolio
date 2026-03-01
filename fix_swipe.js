const fs = require('fs');

let content = fs.readFileSync('src/i18n/LanguageContext.tsx', 'utf8');

const hookCode = `
  useEffect(() => {
    const handlePopState = () => {
      document.documentElement.classList.add('back-transition');
      setTimeout(() => document.documentElement.classList.remove('back-transition'), 100);
    };
    
    const handleTouchStart = (e) => {
      if (e.touches[0].clientX < 30 || e.touches[0].clientX > window.innerWidth - 30) {
        document.documentElement.classList.add('back-transition');
        setTimeout(() => document.documentElement.classList.remove('back-transition'), 1500); 
      }
    };

    window.addEventListener('popstate', handlePopState, { capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    
    return () => {
      window.removeEventListener('popstate', handlePopState, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
`;

// Insert the new hook inside the LanguageProvider, right after setMounted(true);
content = content.replace(
  /const \[mounted, setMounted\] = useState\(false\);/,
  `const [mounted, setMounted] = useState(false);\n${hookCode}`
);

fs.writeFileSync('src/i18n/LanguageContext.tsx', content);

