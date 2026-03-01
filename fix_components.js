const fs = require('fs');

let layout = fs.readFileSync('src/app/layout.tsx', 'utf-8');

if (!layout.includes('ProjectChat')) {
  layout = "import { ProjectChat } from '@/components/ui/ProjectChat';\n" + layout;
  
  // Insert <ProjectChat /> right before </body>
  layout = layout.replace('</body>', '  <ProjectChat />\n      </body>');
  fs.writeFileSync('src/app/layout.tsx', layout);
}

