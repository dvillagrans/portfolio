const fs = require('fs');

let content = fs.readFileSync('src/app/layout.tsx', 'utf8');

if (!content.includes('CustomCursor')) {
  // Add imports
  content = content.replace(
    'import { LanguageProvider } from "@/i18n/LanguageContext";',
    'import { LanguageProvider } from "@/i18n/LanguageContext";\nimport CustomCursor from "@/components/ui/CustomCursor";\nimport GridOverlay from "@/components/ui/GridOverlay";'
  );

  // Add into body before children
  content = content.replace(
    '<LanguageProvider>\n          {children}\n        </LanguageProvider>',
    '<LanguageProvider>\n          <CustomCursor />\n          <GridOverlay />\n          {children}\n        </LanguageProvider>'
  );

  fs.writeFileSync('src/app/layout.tsx', content);
}
