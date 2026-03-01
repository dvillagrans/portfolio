const fs = require('fs');

let t = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// The arrays start right after `projects: [`
// Let's use a simpler replace strategy for the very first instance inside EN and ES

const enInsert = `projects: [
      {
        id: "01",
        title: "TimeUp // Operational SaaS",
        problem: "Local service businesses operate with zero digital infrastructure, relying on WhatsApp and notebooks.",
        system: "A multi-tenant production-ready platform with Passkey authentication, WebSockets, and role-based routing.",
        outcome: "Autonomous SaaS deployed, mapping internal clinic operations and public bookings simultaneously.",
        caseStudy: "/projects/timeup",
      },`;

const esInsert = `projects: [
      {
        id: "01",
        title: "TimeUp // SaaS Operativo",
        problem: "Negocios locales sin infraestructura digital operando con flujos propensos al error vía WhatsApp y calendarios físicos.",
        system: "Plataforma multi-tenant serverless con auth vía Passkeys, WebSockets en VPS y consentimientos médicos digitales.",
        outcome: "SaaS escalable en producción manejando facturación cronometrada y reservas públicas con latencia mínima.",
        caseStudy: "/projects/timeup",
      },`;

// Replace first occurrence of projects: [ for EN
t = t.replace('projects: [', enInsert);

// Now the next occurrence will be in the ES block
t = t.replace('projects: [', esInsert);

// Fix duplicated `id: "01"` in the original first items by running a quick regex on the IDs
// So the second item becomes 02, third becomes 03, etc.
let idCounter = 1;
t = t.replace(/id: "01"/, 'id: "01"'); // leave first intact
t = t.replace(/id: "01"/g, 'id: "02"'); // fix the displaced one
t = t.replace(/id: "02"/g, (match, offset, string) => {
    if (offset > 1000) return 'id: "03"'; // crude but effective for the 3rd item
    return match;
});

fs.writeFileSync('src/i18n/dictionaries.ts', t);
