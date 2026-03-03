const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

content = content.replace(
  '  },}\n};\n\nexport const es = {',
  '  }\n};\n\nexport const es = {'
);


content = content.replace(
  '  },}\n};\n',
  '  }\n};\n'
);


fs.writeFileSync('src/i18n/dictionaries.ts', content);
