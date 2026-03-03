const fs = require('fs');

const file = 'src/app/projects/timeup/page.tsx';
let data = fs.readFileSync(file, 'utf8');


// Add shimmering title explicitly
data = data.replace(
  /<h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-none">/g,
  '<h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 md:mb-8 leading-none bg-clip-text text-transparent bg-[linear-gradient(135deg,#00C9FF,#00E3CC,#4B5DFF)] drop-shadow-2xl" style={{textShadow:"0 0 40px rgba(0,201,255,0.4)"}}>'
);


fs.writeFileSync(file, data);

