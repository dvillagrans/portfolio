const fs = require('fs');

let content = fs.readFileSync('src/components/ui/ProjectChat.tsx', 'utf-8');
content = content.replace("const { messages, input, handleInputChange, handleSubmit, isLoading }", "const { messages, input, handleInputChange, handleSubmit, isLoading } : any");
fs.writeFileSync('src/components/ui/ProjectChat.tsx', content);

