const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

// Ensure correct Link components
content = content.replace(/<a href/g, '<Link href');
content = content.replace(/<\/a>/g, '</Link>');

fs.writeFileSync('src/components/layout/Navbar.tsx', content);
