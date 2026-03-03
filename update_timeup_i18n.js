const fs = require('fs');
const dictPath = 'src/i18n/dictionaries.ts';
let dicts = fs.readFileSync(dictPath, 'utf8');

const enTimeUp = `
  timeup: {
    back: "Back to Archive",
    subtitle: "Operational SaaS for the health and wellness sector.",
    tldr: {
      challenge: { title: "The Challenge", text1: "Local businesses operating blindly with ", bold: "WhatsApp and notebooks", text2: ". Owners permanently busy and an operative staff with low affinity for complex technological tools." },
      solution: { title: "The Solution", text1: "A ", bold: "Multi-tenant Cloud platform", text2: " with friendly onboarding, ", cyan: "biometric Passkeys", text3: " without cumbersome passwords and a kinetic Real-Time flow." },
      impact: { title: "The Impact", bold: "MVP built in 10 weeks", text1: " under an optimized architecture. Deployment with near-zero operating costs before gaining real production traction." }
    },
    meta: [
      { label: "Role", value: "Solo Developer / Architect" },
      { label: "Timeline", value: "10 Weeks (MVP)" },
      { label: "Architecture", value: "Serverless + Stateful VPS" },
      { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
    ],
    links: { public: "Public App", business: "Business Panel" },
    quote: { text: "If onboarding took more than ", bold: "ten minutes", text2: ", the implementation failed.", title: "The Functional Premise" },
    constraints: {
      title1: "01 // Inflexible Constraints",
      title2: "Retaining walls.",
      desc: "The context that defined the architecture and forced us to avoid over-engineering.",
      c1: { title: "Low Patience Users", text1: "Business owners aged 30 to 50. The flow could not assume ", bold1: "any prior technical knowledge", text2: ". That's why we transitioned from slow email schemes to using ", bold2: "Native Biometric Hardware (Passkeys)" },
      c2: { title: "MVP Against the Clock", text1: "Developed and modeled by a ", bold1: "single maintainer", text2: ", forcing the choice of hyper-productive tools (Turborepo + Next)." },
      c3: { title: "Tenant Quality", text1: "Semi-open onboarding system. Requires administrative approval in the Backend, creating complex database states ", tag: "PENDING" },
      c4: { title: "Serverless Zero-Cost", text1: "The app had to pivot with a dead burn rate. Pure deployment on ", bold1: "Vercel & Supabase Free", text2: " isolating demanding components." },
      c5: { title: "Strict Legal Module", text1: "Non-negotiable management of ", bold1: "Digital Informed Consents", text2: " with PDF electronic signatures for invasive medical treatments." }
    },
    interfaces: {
      title1: "02 // Ecosystem Interfaces",
      title2: "Dedicated tools by role.",
      admin: { tag: "MODULE : ADMIN", desc: "Global Analytics and Control Center." },
      owner: { tag: "MODULE : OWNER", desc: "Performance Metrics and Configuration." },
      staff: { tag: "MODULE : STAFF", desc: "Live Agenda and Client-Local Management." }
    },
    architecture: {
      title1: "03 // Architecture & Decisions",
      title2: "Trade-offs that give life to the business.",
      d1: { nav: "3.1 / REPOSITORY STRUCTURE", title: "Turborepo Monorepo", desc: "Building multiple React ecosystems forced crossing business logic, TypeScript types, and Prisma schemas. We opted for the initial rigidity of ", bold: "monorepositories to orchestrate", desc2: " multiple coupled bases with automatic caching.", costTitle: "The Operational Cost", costDesc: "Initial tooling delayed v.1, but scaling between deployments became completely instantaneous weeks later." },
      d2: { nav: "3.2 / STATEFUL SYNCHRONIZATION", title: "WebSocket Isolation", desc: "Platforms like Vercel and Edge Functions punish prolonged open connections (Timeouts and dead SSE in minutes). We extracted the bidirectional engine to a Virtual Machine with ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " acting as a real-time pipeline.", costTitle: "The Operational Cost", costDesc: "Monitoring fragmentation; we went from just looking at Vercel logs to having to constantly review metrics on an Ubuntu droplet." },
      d3: { nav: "3.3 / AUTHENTICATION EXPERIENCE", title: "Biometric WebAuthn Login", desc: "Forcing local staff to remember long strings interrupts their operational work. The strong implementation of hardware-integrated biometric APIs (FaceID / Fingerprint) cut access friction from ", bold: "several minutes to fractions of a second", desc2: " on the counter tablet.", costTitle: "The Operational Cost", costDesc: "Extremely high complexity in the fallback; forced maintaining an extra robust system via SMTP Magic Links." }
    },
    lessons: {
      title1: "04 // Post-Mortem System",
      title2: "Raw lessons upon hitting Production.",
      desc: "Pure technical implementations rarely survive the organic behavior of the end user and lower-tier Cloud limitations. What actually caught fire and how it was shielded.",
      l1: { title: "Connection Pooler Choking", desc: "Combining Serverless AWS with cold Database engines in Supabase ended up burning inefficient connection limits, destroying the pipelines.", tag: "URGENTLY MIGRATED TO ACTIVE TRANSACTION POOLERS" },
      l2: { title: "WebAuthn & Origin Mismatch", desc: "An insignificant extra slash '/' in the production CORS config collapsed the entire digital security key flow on the initial deploy because they break cryptographic security.", tag: "MANDATORY MIRRORING OF CI/CD PREVIEW ENVIRONMENT" },
      l3: { title: "State Purgatories & Ghost Users", desc: "Semi-approved entities created inconsistencies by dragging values that contaminated metrics of subsequent cohorts in KPIs.", tag: "ABSOLUTE RESTRICTION OF INTERMEDIATE STATES (BOOLEANS TO THE EXTREME)" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG", status: "STATUS: IN CONSTANT PRODUCTION" }
  },`;

const esTimeUp = `
  timeup: {
    back: "Volver al Archivo",
    subtitle: "SaaS Operativo para el sector de la salud y bienestar.",
    tldr: {
      challenge: { title: "El Reto", text1: "Negocios locales operando ciegamente con ", bold: "WhatsApp y libretas", text2: ". Dueños ocupados permanentemente y un staff de atención con baja afinidad a herramientas tecnológicas complejas." },
      solution: { title: "La Solución", text1: "Plataforma ", bold: "Multi-tenant Cloud", text2: " con onboarding amigable, acceso ", cyan: "Passkeys biométrico", text3: " sin contraseñas engorrosas y flujo kinético Real-Time." },
      impact: { title: "El Impacto", bold: "MVP construido en 10 semanas", text1: " bajo una arquitectura optimizada. Despliegue con costos operativos cercanos a cero antes de traccionar volumen productivo." }
    },
    meta: [
      { label: "Role", value: "Solo Developer / Architect" },
      { label: "Timeline", value: "10 Semanas (MVP)" },
      { label: "Architecture", value: "Serverless + Stateful VPS" },
      { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
    ],
    links: { public: "App Pública", business: "Panel Negocios" },
    quote: { text: "Si el onboarding tomaba más de ", bold: "diez minutos", text2: ", la implementación fracasaba.", title: "La Premisa Funcional" },
    constraints: {
      title1: "01 // Restricciones Inflexibles",
      title2: "Muros de contención.",
      desc: "El contexto que definió la arquitectura y nos obligó a evitar la sobree-ingeniería.",
      c1: { title: "Usuarios de Baja Paciencia", text1: "Dueños de negocios de 30 a 50 años. El flujo no podía asumir ", bold1: "ningún conocimiento técnico previo", text2: ". Por eso transicionamos de esquemas lentos de email a utilizar ", bold2: "Hardware Biométrico nativo (Passkeys)" },
      c2: { title: "MVP a Contrarreloj", text1: "Desarrollado y modelado por un ", bold1: "solo mantenedor", text2: ", obligando a elegir herramientas hiper-productivas (Turborepo + Next)." },
      c3: { title: "Calidad del Tenant", text1: "Sistema de Onboarding semi-abierto. Requiere aprobación administrativa en el Backend, generando estados complejos en BD ", tag: "PENDING" },
      c4: { title: "Serverless Zero-Cost", text1: "La app debía poder pivotear con un burn rate muerto. Despliegue puro en ", bold1: "Vercel & Supabase Free", text2: " aislando los componentes demandantes." },
      c5: { title: "Módulo Legal Estricto", text1: "Gestión innegociable de ", bold1: "Consentimientos Informados Digitales", text2: " con firmas electrónicas en PDF para tratamientos médicos invasivos." }
    },
    interfaces: {
      title1: "02 // Interfaces Ecosistema",
      title2: "Herramientas dedicadas por rol.",
      admin: { tag: "MÓDULO : ADMIN", desc: "Centro de Control y Analíticas Globales." },
      owner: { tag: "MÓDULO : OWNER", desc: "Métricas de Rendimiento y Configuración." },
      staff: { tag: "MÓDULO : STAFF", desc: "Agenda Viva y Manejo Cliente-Local." }
    },
    architecture: {
      title1: "03 // Arquitectura y Decisiones",
      title2: "Trade-offs que dan vida al negocio.",
      d1: { nav: "3.1 / ESTRUCTURA DE REPOSITORIO", title: "Monorepositorio Turborepo", desc: "Construir múltiples ecosistemas React obligaba a cruzar lógicas de negocio, tipos en TypeScript y esquemas Prisma. Optamos por la rigidez inicial de ", bold: "monorepositorios para orquestar", desc2: " múltiples bases acopladas con cacherréo automático.", costTitle: "El Costo Operativo", costDesc: "El tooling de arranque retrasó la v.1, pero escalar entre un despliegue y otro fue totalmente instantáneo semanas después." },
      d2: { nav: "3.2 / SINCRONIZACIÓN STATEFUL", title: "Aislamiento de WebSockets", desc: "Plataformas como Vercel y Edge Functions castigan las conexiones abiertas prolongadas (Timeouts y SSE muertos en minutos). Extrajimos el motor bidireccional a una Máquina Virtual con ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " actuando como pipeline en tiempo real.", costTitle: "El Costo Operativo", costDesc: "Fragmentación de monitoreo; pasamos de solo mirar logs de Vercel a tener que revisar métricas en un droplet de Ubuntu constantemente." },
      d3: { nav: "3.3 / EXPERIENCIA DE AUTENTICACIÓN", title: "Ingreso Biométrico WebAuthn", desc: "Obligar al staff local a recordar strings largos interrumpe su labor operativa. La implementación fuerte de APIs de biometría integradas en el hardware (FaceID / Fingerprint) cortó la fricción de acceso desde ", bold: "varios minutos a fracciones de segundo", desc2: " en la tablet del mostrador.", costTitle: "El Costo Operativo", costDesc: "Altísima complejidad en el fallback; obligó a mantener un robusto sistema extra por Magic Links SMTP." }
    },
    lessons: {
      title1: "04 // Post-Mortem System",
      title2: "Aprendizajes crudos al golpear Producción.",
      desc: "Las implementaciones técnicas puras raramente sobreviven al comportamiento orgánico del usuario final y de las limitaciones Cloud de cueto inferior. Lo que realmente se incendió y cómo fue blindado.",
      l1: { title: "Asfixia del Connection Pooler", desc: "Combinar AWS Serverless con motores de Base de Datos fríos en Supabase terminaba quemando cuotas de conexión ineficientes destrozando los pipelines.", tag: "MIGRADO DE URGENCIA A TRANSACTION POOLERS ACTIVOS" },
      l2: { title: "WebAuthn & Origin Mismatch", desc: "Un insignificante slash '/' sobrante en la terminación CORS del proyecto en producción colapsó todo el flujo de llaves digitales de seguridad en el deploy inicial porque rompen la seguridad criptográfica.", tag: "ESPEJADO OBLIGATORIO DE ENTORNO PREVIEW CI/CD" },
      l3: { title: "Purgatorios de Estado y Usuarios Fantasma", desc: "Entidades semi-aprobadas creaban inconsistencia al arrastrar valores que contaminaban las métricas de cohortes posteriores en KPIs.", tag: "RESTRICCIÓN ABSOLUTA DE ESTADOS INTERMEDIOS (BOOLEANS AL EXTREMO)" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG", status: "ESTADO: EN PRODUCCIÓN CONSTANTE" }
  },`;

let enIndex = dicts.indexOf('export const en = {');
let esIndex = dicts.indexOf('export const es = {');

// Insert english dict
let insertEnPos = dicts.indexOf('}', esIndex - 20); // End of en object
dicts = dicts.slice(0, insertEnPos) + enTimeUp + dicts.slice(insertEnPos);

// Re-evaluate es index since length changed
esIndex = dicts.indexOf('export const es = {');
let insertEsPos = dicts.lastIndexOf('}'); // End of es object (assuming it's at the end of file)
dicts = dicts.slice(0, insertEsPos) + esTimeUp + dicts.slice(insertEsPos);

fs.writeFileSync(dictPath, dicts);
