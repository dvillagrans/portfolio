const fs = require('fs');
let code = fs.readFileSync('src/components/ui/ProjectChat.tsx', 'utf-8');
code = code.replace(/useChat\(\{[\s\S]*?\}\);/g, "useChat({ initialMessages: initialMessages as any } as any);");
fs.writeFileSync('src/components/ui/ProjectChat.tsx', code);
