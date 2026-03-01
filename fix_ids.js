const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// Quick pass to overwrite dictionary safely using plain object generation and stringify to avoid partial match issues

