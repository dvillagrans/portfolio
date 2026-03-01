const fs = require('fs');
let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// The safest way is to ensure all objects in work.projects have both caseStudy and href explicitly.
// Let's just do a clean string replacement block for the entire EN and ES work sections to bypass fragile regex edge cases.

const enWorkNew = `work: {
    title: "Proof of Execution",
    subtitle: "Selected Systems // 2021—Present",
    labelScope: "Problem Space",
    labelSystem: "System Built",
    labelOutcome: "Outcome",
    inspect: "Inspect Architecture",
    projects: [
      {
        id: "01",
        title: "TimeUp // Operational SaaS",
        problem: "Local service businesses operate with zero digital infrastructure, relying on WhatsApp and notebooks.",
        system: "A multi-tenant production-ready platform with Passkey authentication, WebSockets, and role-based routing.",
        outcome: "Autonomous SaaS deployed, mapping internal clinic operations and public bookings simultaneously.",
        href: "https://timeup.mx",
        caseStudy: "/projects/timeup"
      },
      {
        id: "02",
        title: "NYC Ride-Hailing Analytics",
        problem: "Transportation stakeholders needed reliable insights across Uber and Lyft trip patterns, pricing, and airport operations in New York City.",
        system: "Built an interactive Streamlit analytics platform with predictive ML models, geospatial maps, and multi-tab operational dashboards.",
        outcome: "Delivered fare prediction with R² > 0.85 and classification with 92% accuracy.",
        href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
        caseStudy: undefined
      },
      {
        id: "03",
        title: "AI-Driven Product Lab",
        problem: "Research teams lacked a standardized sandbox to prototype LLM integrations into existing SaaS platforms.",
        system: "A Next.js & Python orchestration layer with modular context nodes, allowing rapid interface experimentation.",
        outcome: "Deployed 3 enterprise features globally in under 6 months; established the internal 'Intelligence Design System'.",
        href: "#",
        caseStudy: undefined
      }
    ]
  },`;

const esWorkNew = `work: {
    title: "Prueba de Ejecución",
    subtitle: "Sistemas Seleccionados // 2021—Presente",
    labelScope: "Espacio del Problema",
    labelSystem: "Sistema Construido",
    labelOutcome: "Resultado",
    inspect: "Inspeccionar Arq.",
    projects: [
      {
        id: "01",
        title: "TimeUp // SaaS Operativo",
        problem: "Negocios locales sin infraestructura operando con flujos propensos al error vía WhatsApp y libretas.",
        system: "Plataforma multi-tenant serverless con auth vía Passkeys, WebSockets en VPS y consentimientos médicos digitales.",
        outcome: "SaaS en producción manejando facturación cronometrada y reservas públicas con latencia mínima.",
        href: "https://timeup.mx",
        caseStudy: "/projects/timeup"
      },
      {
        id: "02",
        title: "NYC Ride-Hailing Analytics",
        problem: "Equipos necesitaban insights confiables sobre patrones de viaje, tarifas y operación aeroportuaria en NYC.",
        system: "Desarrollo de plataforma interactiva en Streamlit con modelos predictivos y mapas geoespaciales.",
        outcome: "Predicción de tarifas con R² > 0.85 y clasificación de viajes al aeropuerto con 92% de accuracy.",
        href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
        caseStudy: undefined
      },
      {
        id: "03",
        title: "Laboratorio IA de Producto",
        problem: "Los equipos carecían de un entorno para prototipar integraciones de LLM en plataformas existentes.",
        system: "Capa de orquestación (Next.js/Python) con nodos de contexto modulares.",
        outcome: "Despliegue de 3 funciones globales en 6 meses; creación del 'Sistema de IA' interno.",
        href: "#",
        caseStudy: undefined
      }
    ]
  },`;

// Replace entire work block for English
content = content.replace(/work: {[\s\S]*?projects: \[[\s\S]*?\]\n  },/g, (match, offset) => {
   if (offset < content.indexOf('es = {')) return enWorkNew;
   return esWorkNew;
});

fs.writeFileSync('src/i18n/dictionaries.ts', content);
