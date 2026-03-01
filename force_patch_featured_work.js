const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// The grep check showed that the `work.projects` arrays have entirely different content than I expected (NYC Ride-Hailing, etc). It looks like the dictionary was updated externally or I used the wrong mock data earlier. Let's dynamically insert TimeUp at the top of the EN and ES `work` arrays.

// Match the English work projects array start
content = content.replace(
  /en = {[\s\S]*?work: {[\s\S]*?projects: \[\s*{/g,
  (match) => match.replace(/projects: \[\s*{/, `projects: [
      {
        id: "01",
        title: "TimeUp // Operational SaaS",
        problem: "Local service businesses (barbershops, clinics) operate with zero digital infrastructure, relying manually on WhatsApp and notebooks.",
        system: "A multi-tenant production-ready platform with Passkey authentication, node VPS WebSockets, and complex role-based routing.",
        outcome: "Fully autonomous SaaS deployed, mapping internal clinic operations and public bookings simultaneously.",
        caseStudy: "/projects/timeup",
      },
      {`)
);

// Match the Spanish work projects array start
content = content.replace(
  /es = {[\s\S]*?work: {[\s\S]*?projects: \[\s*{/g,
  (match) => match.replace(/projects: \[\s*{/, `projects: [
      {
        id: "01",
        title: "TimeUp // SaaS Operativo",
        problem: "Negocios locales sin infraestructura digital operando con flujos propensos al error vía WhatsApp y calendarios físicos.",
        system: "Plataforma multi-tenant serverless con auth vía Passkeys, WebSockets en VPS y control de consentimientos médicos digitales.",
        outcome: "SaaS escalable corriendo en producción manejando facturación cronometrada y reservas públicas con latencia mínima.",
        caseStudy: "/projects/timeup",
      },
      {`)
);

// Since we injected a new 01, we need to update the IDs of the subsequent ones manually or rewrite the array block.
// Since we don't want to parse AST manually in a quick terminal script, let's just do a specific rewrite of the arrays.

// Actually, I'll export a Node script that uses proper parsing to insert it at index 0 and re-index the rest to ensure it works flawlessly.

