const fs = require('fs');

let content = fs.readFileSync('src/app/api/chat/route.ts', 'utf-8');
content = content.replace('toTextStreamResponse', 'toDataStreamResponse'); // wait, ai streamText provides \`toDataStreamResponse\` in recent versions, maybe we should just return \`result.textStream\` ? Let's check api.
// If ai package version is <3.2.0, it's `toTextStreamResponse()`.
// Since \`ai\` latest is 3.x, let's stick to \`toTextStreamResponse()\` or \`toDataStreamResponse()\` depending on version. The compiler says "Did you mean 'toTextStreamResponse'?", so let's keep that.
