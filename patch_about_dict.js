const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// Appending “about” inside “en” object:
const enAbout = `  about: {
    title: "Operative Logic",
    subtitle: "Not a biography. A systemic criterion.",
    intro: "I don't just write code; I architect environments. The difference between a fragile application and a scalable system is intention. Every interface, data flow, and interaction must have a justifiable reason to exist.",
    sections: {
      systems: {
        title: "How I Think About Systems",
        content: "A system is not a collection of fragmented features; it is a series of strict boundaries and data flows. I view the front-end not as static pages, but as reactive state machines governed by external pipelines. If the underlying data primitive is flawed or mutations are unmanaged, no amount of UI polish will fix the product."
      },
      optimization: {
        title: "What I Optimize For",
        items: [
          { label: "Resilience over cleverness", desc: "Architecture should be transparent and predictable. 'Clever' abstractions inevitably break when teams and systems scale." },
          { label: "Performance as accessibility", desc: "Speed is not a premium luxury. Unjustified latency is a failure of architectural design, not a network infrastructure issue." },
          { label: "Absolute modularity", desc: "Interfaces must be strictly decoupled. A state mutation in the header should never cascade into a failure in the footer." }
        ]
      },
      decisions: {
        title: "Architectural Decisions",
        items: [
          { title: "Push compute to the edge.", desc: "The client interface should only focus on rendering and immediate kinesthetic response. By migrating heavy logic and data hydration strictly to server boundaries, the browser layer remains frictionless." },
          { title: "Friction as a feature.", desc: "Seamless isn't always appropriate. I intentionally inject deliberate friction into flows to command attention during destructive actions, confirming human intent before system execution." }
        ]
      }
    },
    closure: "Ultimately, we are engineering tools to be leveraged by humans. The highest form of technical achievement is a system so robust and elegant that the user entirely forgets it exists."
  },
  archive: {`;

content = content.replace('  archive: {', enAbout);

// Appending “about” inside “es” object:
const esAbout = `  about: {
    title: "Lógica Operativa",
    subtitle: "No una biografía. Un criterio sistémico.",
    intro: "No solo escribo código; diseño entornos y arquitecturas. La diferencia entre una aplicación frágil y un sistema escalable radica en la intención. Cada interfaz, flujo de datos e interacción debe tener una razón justificable de existir.",
    sections: {
      systems: {
        title: "Cómo Entiendo los Sistemas",
        content: "Un sistema no es una colección de funciones fragmentadas; es una serie de límites estrictos y flujos de datos. No veo el front-end como 'páginas estáticas', sino como máquinas de estado reactivas gobernadas por pipelines externos. Si la estructura de datos subyacente es deficiente, ninguna cantidad de diseño visual podrá salvar el producto."
      },
      optimization: {
        title: "Qué Optimizo y Priorizo",
        items: [
          { label: "Resiliencia sobre ingeniosidad", desc: "La arquitectura debe ser transparente y predecible. Las abstracciones demasiado 'ingeniosas' se rompen cuando los equipos y sistemas escalan." },
          { label: "Rendimiento como accesibilidad", desc: "La velocidad no es un lujo. La latencia injustificada es un fracaso del diseño arquitectónico, no un problema de red." },
          { label: "Modularidad absoluta", desc: "Las interfaces deben estar estrictamente desacopladas. Una mutación de estado no debe generar efectos secundarios incontrolables." }
        ]
      },
      decisions: {
        title: "Decisiones Arquitectónicas",
        items: [
          { title: "Llevar la computación al origen.", desc: "El cliente solo debe enfocarse en renderizar y responder cinéticamente. Al migrar la lógica pesada y la hidratación de datos a los límites del servidor, la capa del navegador se mantiene ultraligera." },
          { title: "La fricción como característica.", desc: "Lo más fluido no siempre es lo mejor. Inyecto deliberadamente fricción en ciertos flujos para captar la atención durante acciones destructivas, confirmando la intención humana." }
        ]
      }
    },
    closure: "Al final del día, construimos herramientas para personas. La máxima forma de logro técnico es un sistema tan robusto y elegante que el usuario olvida por completo que existe."
  },
  archive: {`;

// Replace specifically the second '  archive: {' which belongs to ES
let archiveIndexes = [];
let idx = content.indexOf('  archive: {');
while (idx !== -1) {
  archiveIndexes.push(idx);
  idx = content.indexOf('  archive: {', idx + 1);
}

if (archiveIndexes.length === 2) {
  // Replace ES first (to not mess up the second index)
  content = content.substring(0, archiveIndexes[1]) + esAbout + content.substring(archiveIndexes[1] + 12);
  // Replace EN
  content = content.substring(0, archiveIndexes[0]) + enAbout + content.substring(archiveIndexes[0] + 12);
}

// Add nav.about
content = content.replace('systems: "Systems", contact: "Contact"', 'systems: "Systems", contact: "Contact", about: "Thinking"');
content = content.replace('systems: "Sistemas", contact: "Contacto"', 'systems: "Sistemas", contact: "Contacto", about: "Criterio"');

fs.writeFileSync('src/i18n/dictionaries.ts', content);
