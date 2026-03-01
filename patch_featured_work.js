const fs = require('fs');

let content = fs.readFileSync('src/i18n/dictionaries.ts', 'utf8');

// We need to replace the old featured work projects array in both English and Spanish dictionaries.

const enWorkProjectsOld = `projects: [
      {
        id: "01",
        title: "Global FinTech Architecture",
        problem: "A fragmented user experience across 4 distinct financial products under one brand, leading to high drop-off rates.",
        system: "Unified component library mapping directly to an event-driven micro-frontend architecture.",
        outcome: "Reduced deployment cycles by 40% and established a cohesive brand interaction language.",
      },
      {
        id: "02",
        title: "AI-Driven Product Lab",
        problem: "Research teams lacked a standardized sandbox to prototype LLM integrations into existing SaaS platforms.",
        system: "A Next.js & Python orchestration layer with modular context nodes, allowing rapid interface experimentation.",
        outcome: "Deployed 3 enterprise features globally in under 6 months; established the internal 'Intelligence Design System'.",
      },
      {
        id: "03",
        title: "Editorial Commerce Engine",
        problem: "High-end fashion brand's digital presence did not match their physical retail experience, relying on rigid templates.",
        system: "A headless CMS integration (Sanity) feeding incredibly performant, WebGL-enhanced dynamic routes.",
        outcome: "Won Awwwards Site of the Month; increased engagement time by 120%, bridging narrative with conversion.",
      }
    ]`;

const esWorkProjectsOld = `projects: [
      {
        id: "01",
        title: "Arquitectura FinTech Global",
        problem: "Una experiencia de usuario fragmentada en 4 productos financieros distintos bajo una marca, generando altas tasas de abandono.",
        system: "Biblioteca de componentes unificada mapeada directamente a una arquitectura de micro-frontends impulsada por eventos.",
        outcome: "Reducción del 40% en ciclos de despliegue y establecimiento de un lenguaje de interacción de marca cohesivo.",
      },
      {
        id: "02",
        title: "Laboratorio de Producto con IA",
        problem: "Los equipos carecían de un entorno estandarizado para prototipar integraciones de LLM en plataformas existentes.",
        system: "Capa de orquestación (Next.js/Python) con nodos de contexto modulares, permitiendo experimentación rápida.",
        outcome: "Despliegue de 3 funciones globales en menos de 6 meses; establecimiento del 'Sistema de Diseño de Inteligencia' interno.",
      },
      {
        id: "03",
        title: "Motor de Comercio Editorial",
        problem: "La presencia digital de la marca no reflejaba su experiencia en tiendas físicas al depender de plantillas rígidas.",
        system: "Integración de CMS headless (Sanity) alimentando rutas dinámicas ultra-rápidas, enriquecidas con WebGL.",
        outcome: "Ganador del Site of the Month en Awwwards; aumento del tiempo de interacción en 120%.",
      }
    ]`;

const enWorkProjectsNew = `projects: [
      {
        id: "01",
        title: "TimeUp // Operational SaaS",
        problem: "Local service businesses (barbershops, clinics) operate with zero digital infrastructure, relying manually on WhatsApp and notebooks.",
        system: "A multi-tenant production-ready platform with Passkey authentication, node VPS WebSockets, and complex role-based routing.",
        outcome: "Fully autonomous SaaS deployed, mapping internal clinic operations and public bookings simultaneously.",
        caseStudy: "/projects/timeup",
      },
      {
        id: "02",
        title: "Global FinTech Architecture",
        problem: "A fragmented user experience across 4 distinct financial products under one brand, leading to high drop-off rates.",
        system: "Unified component library mapping directly to an event-driven micro-frontend architecture.",
        outcome: "Reduced deployment cycles by 40% and established a cohesive brand interaction language.",
      },
      {
        id: "03",
        title: "AI-Driven Product Lab",
        problem: "Research teams lacked a standardized sandbox to prototype LLM integrations into existing SaaS platforms.",
        system: "A Next.js & Python orchestration layer with modular context nodes, allowing rapid interface experimentation.",
        outcome: "Deployed 3 enterprise features globally in under 6 months; established the internal 'Intelligence Design System'.",
      }
    ]`;

const esWorkProjectsNew = `projects: [
      {
        id: "01",
        title: "TimeUp // SaaS Operativo",
        problem: "Negocios locales sin infraestructura digital operando con flujos propensos al error vía WhatsApp y calendarios físicos.",
        system: "Plataforma multi-tenant serverless con auth vía Passkeys, WebSockets en VPS y control de consentimientos médicos digitales.",
        outcome: "SaaS escalable corriendo en producción manejando facturación cronometrada y reservas públicas con latencia mínima.",
        caseStudy: "/projects/timeup",
      },
      {
        id: "02",
        title: "Arquitectura FinTech Global",
        problem: "Una experiencia de usuario fragmentada en 4 productos financieros distintos bajo una marca, generando altas tasas de abandono.",
        system: "Biblioteca de componentes unificada mapeada directamente a una arquitectura de micro-frontends impulsada por eventos.",
        outcome: "Reducción del 40% en ciclos de despliegue y establecimiento de un lenguaje de interacción de marca cohesivo.",
      },
      {
        id: "03",
        title: "Laboratorio de Producto con IA",
        problem: "Los equipos carecían de un entorno estandarizado para prototipar integraciones de LLM en plataformas existentes.",
        system: "Capa de orquestación (Next.js/Python) con nodos de contexto modulares, permitiendo experimentación rápida.",
        outcome: "Despliegue de 3 funciones globales en menos de 6 meses; establecimiento del 'Sistema de Diseño de Inteligencia' interno.",
      }
    ]`;

content = content.replace(enWorkProjectsOld, enWorkProjectsNew);
content = content.replace(esWorkProjectsOld, esWorkProjectsNew);

fs.writeFileSync('src/i18n/dictionaries.ts', content);
