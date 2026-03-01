const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// replace Link hrefs correctly without leaving malformed </a> tags
content = content.replace(/import \{ useLanguage \} from "@\/i18n\/LanguageContext";/g, 'import { useLanguage } from "@/i18n/LanguageContext";\nimport { Link } from "next-view-transitions";');

fs.writeFileSync('src/components/layout/Navbar.tsx', content);

