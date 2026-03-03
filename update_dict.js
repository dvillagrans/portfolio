const fs = require('fs');
let content = fs.readFileSync('src/i18n/dictionaries.tsx', 'utf8');

content = content.replace(
  /image: \(p as any\)\.image\?\.src,\n\s*links: p\.links\?\.map\(\(l:any\) => \(\{ label: l\.type, url: l\.href \}\)\)/g,
  `image: (p as any).image?.src,
      links: p.links?.map((l:any) => ({ label: l.type, url: l.href })),
      features: (p as any).features,
      badges: (p as any).badges,
      metrics: (p as any).metrics`
);

fs.writeFileSync('src/i18n/dictionaries.tsx', content);
