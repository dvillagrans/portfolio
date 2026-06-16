import type { TimeUpDict } from "../types";

export const timeupEn = {
  back: "Back to projects",
  eyebrow: "Product · Time tracking SaaS",
  title: "TimeUp",
  subtitle: "Multi-tenant time tracking for wellness businesses — passkeys, real-time scheduling, and payroll-ready hours.",
  metrics: [
    { value: "<500ms", label: "Dashboard load" },
    { value: "10", label: "Weeks to MVP" },
    { value: "0", label: "Overbooking" },
    { value: "3", label: "Role interfaces" },
  ],
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
    title1: "Constraints",
    title2: "What shaped the architecture.",
    desc: "The context that defined the architecture and forced us to avoid over-engineering.",
    c1: { title: "Low Patience Users", text1: "Business owners aged 30 to 50. The flow could not assume ", bold1: "any prior technical knowledge", text2: ". That's why we transitioned from slow email schemes to using ", bold2: "Native Biometric Hardware (Passkeys)" },
    c2: { title: "MVP Against the Clock", text1: "Developed and modeled by a ", bold1: "single maintainer", text2: ", forcing the choice of hyper-productive tools (Turborepo + Next)." },
    c3: { title: "Tenant Quality", text1: "Semi-open onboarding system. Requires administrative approval in the Backend, creating complex database states ", tag: "PENDING" },
    c4: { title: "Serverless Zero-Cost", text1: "The app had to pivot with a dead burn rate. Pure deployment on ", bold1: "Vercel & Supabase Free", text2: " isolating demanding components." },
    c5: { title: "Strict Legal Module", text1: "Non-negotiable management of ", bold1: "Digital Informed Consents", text2: " with PDF electronic signatures for invasive medical treatments." }
  },
  interfaces: {
    title1: "Product screenshots",
    title2: "Dedicated tools by role.",
    admin: { tag: "Admin", desc: "Global analytics and control center." },
    owner: { tag: "Owner", desc: "Performance metrics and configuration." },
    staff: { tag: "Staff", desc: "Live agenda and client management." }
  },
  architecture: {
    title1: "Key decisions",
    title2: "Trade-offs that keep the product running.",
    d1: { nav: "Monorepo", title: "Turborepo Monorepo", desc: "Building multiple React ecosystems forced crossing business logic, TypeScript types, and Prisma schemas. We opted for the initial rigidity of ", bold: "monorepositories to orchestrate", desc2: " multiple coupled bases with automatic caching.", costTitle: "The Operational Cost", costDesc: "Initial tooling delayed v.1, but scaling between deployments became completely instantaneous weeks later." },
    d2: { nav: "Realtime", title: "WebSocket Isolation", desc: "Platforms like Vercel and Edge Functions punish prolonged open connections (Timeouts and dead SSE in minutes). We extracted the bidirectional engine to a Virtual Machine with ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " acting as a real-time pipeline.", costTitle: "The Operational Cost", costDesc: "Monitoring fragmentation; we went from just looking at Vercel logs to having to constantly review metrics on an Ubuntu droplet." },
    d3: { nav: "Auth", title: "Biometric WebAuthn Login", desc: "Forcing local staff to remember long strings interrupts their operational work. The strong implementation of hardware-integrated biometric APIs (FaceID / Fingerprint) cut access friction from ", bold: "several minutes to fractions of a second", desc2: " on the counter tablet.", costTitle: "The Operational Cost", costDesc: "Extremely high complexity in the fallback; forced maintaining an extra robust system via SMTP Magic Links." }
  },
  lessons: {
    title1: "Lessons learned",
    title2: "What broke in production.",
    desc: "Technical implementations rarely survive real user behavior and cloud limits. What caught fire and how we fixed it.",
    l1: { title: "Connection Pooler Choking", desc: "Combining serverless with cold database engines burned connection limits and broke pipelines.", tag: "Migrated to active transaction poolers" },
    l2: { title: "WebAuthn & Origin Mismatch", desc: "An extra slash in production CORS config collapsed the passkey flow on first deploy — cryptographic origins must match exactly.", tag: "Mirror preview env in CI/CD" },
    l3: { title: "State Purgatories & Ghost Users", desc: "Semi-approved entities dragged values that contaminated cohort metrics in later KPIs.", tag: "Strict boolean state machine" }
  },
  footer: {
    cta: "Building a vertical SaaS?",
    contact: "Get in touch",
    note: "In active production at timeup.mx",
  },
} satisfies TimeUpDict;

export const timeupEs = {
  back: "Volver a proyectos",
  eyebrow: "Producto · SaaS control de tiempos",
  title: "TimeUp",
  subtitle:
    "Control de tiempos multi-tenant para negocios de bienestar — passkeys, agenda en tiempo real y horas listas para nómina.",
  metrics: [
    { value: "<500ms", label: "Carga dashboard" },
    { value: "10", label: "Semanas al MVP" },
    { value: "0", label: "Sobre-reservas" },
    { value: "3", label: "Interfaces por rol" },
  ],
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
    title1: "Restricciones",
    title2: "Lo que moldeó la arquitectura.",
    desc: "El contexto que definió la arquitectura y nos obligó a evitar la sobree-ingeniería.",
    c1: { title: "Usuarios de Baja Paciencia", text1: "Dueños de negocios de 30 a 50 años. El flujo no podía asumir ", bold1: "ningún conocimiento técnico previo", text2: ". Por eso transicionamos de esquemas lentos de email a utilizar ", bold2: "Hardware Biométrico nativo (Passkeys)" },
    c2: { title: "MVP a Contrarreloj", text1: "Desarrollado y modelado por un ", bold1: "solo mantenedor", text2: ", obligando a elegir herramientas hiper-productivas (Turborepo + Next)." },
    c3: { title: "Calidad del Tenant", text1: "Sistema de Onboarding semi-abierto. Requiere aprobación administrativa en el Backend, generando estados complejos en BD ", tag: "PENDING" },
    c4: { title: "Serverless Zero-Cost", text1: "La app debía poder pivotear con un burn rate muerto. Despliegue puro en ", bold1: "Vercel & Supabase Free", text2: " aislando los componentes demandantes." },
    c5: { title: "Módulo Legal Estricto", text1: "Gestión innegociable de ", bold1: "Consentimientos Informados Digitales", text2: " con firmas electrónicas en PDF para tratamientos médicos invasivos." }
  },
  interfaces: {
    title1: "Capturas del producto",
    title2: "Herramientas por rol.",
    admin: { tag: "Admin", desc: "Centro de control y analíticas globales." },
    owner: { tag: "Dueño", desc: "Métricas de rendimiento y configuración." },
    staff: { tag: "Staff", desc: "Agenda en vivo y gestión de clientes." }
  },
  architecture: {
    title1: "Decisiones clave",
    title2: "Trade-offs que mantienen el producto en marcha.",
    d1: { nav: "Monorepo", title: "Monorepositorio Turborepo", desc: "Construir múltiples ecosistemas React obligaba a cruzar lógicas de negocio, tipos en TypeScript y esquemas Prisma. Optamos por la rigidez inicial de ", bold: "monorepositorios para orquestar", desc2: " múltiples bases acopladas con cacherréo automático.", costTitle: "El Costo Operativo", costDesc: "El tooling de arranque retrasó la v.1, pero escalar entre un despliegue y otro fue totalmente instantáneo semanas después." },
    d2: { nav: "Tiempo real", title: "Aislamiento de WebSockets", desc: "Plataformas como Vercel y Edge Functions castigan las conexiones abiertas prolongadas (Timeouts y SSE muertos en minutos). Extrajimos el motor bidireccional a una Máquina Virtual con ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " actuando como pipeline en tiempo real.", costTitle: "El Costo Operativo", costDesc: "Fragmentación de monitoreo; pasamos de solo mirar logs de Vercel a tener que revisar métricas en un droplet de Ubuntu constantemente." },
    d3: { nav: "Auth", title: "Ingreso Biométrico WebAuthn", desc: "Obligar al staff local a recordar strings largos interrumpe su labor operativa. La implementación fuerte de APIs de biometría integradas en el hardware (FaceID / Fingerprint) cortó la fricción de acceso desde ", bold: "varios minutos a fracciones de segundo", desc2: " en la tablet del mostrador.", costTitle: "El Costo Operativo", costDesc: "Altísima complejidad en el fallback; obligó a mantener un robusto sistema extra por Magic Links SMTP." }
  },
  lessons: {
    title1: "Lecciones aprendidas",
    title2: "Lo que falló en producción.",
    desc: "Las implementaciones técnicas rara vez sobreviven al comportamiento real del usuario y a los límites del cloud.",
    l1: { title: "Asfixia del Connection Pooler", desc: "Combinar serverless con motores fríos en Supabase quemó límites de conexión y rompió pipelines.", tag: "Migrado a transaction poolers activos" },
    l2: { title: "WebAuthn & Origin Mismatch", desc: "Un slash extra en CORS de producción colapsó el flujo de passkeys en el primer deploy — los orígenes criptográficos deben coincidir exactamente.", tag: "Espejar preview en CI/CD" },
    l3: { title: "Estados intermedios y usuarios fantasma", desc: "Entidades semi-aprobadas contaminaron métricas de cohortes posteriores.", tag: "Máquina de estados estricta" }
  },
  footer: {
    cta: "¿Construyes un SaaS vertical?",
    contact: "Escríbeme",
    note: "En producción activa en timeup.mx",
  },
} satisfies TimeUpDict;
