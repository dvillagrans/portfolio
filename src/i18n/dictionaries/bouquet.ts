import type { BouquetDict } from "../types";

export const bouquetEn = {
  back: "Back to projects",
  eyebrow: "Thesis project · Hospitality SaaS",
  title: "Bouquet",
  subtitle: "Multi-tenant hospitality OS for restaurant chains — role dashboards, Spark analytics, and guest QR ordering.",
  metrics: [
    { value: "52", label: "Documented KPIs" },
    { value: "3", label: "Role dashboards" },
    { value: "<30s", label: "Data refresh" },
    { value: "RLS", label: "Tenant isolation" },
  ],
  tldr: {
    challenge: {
      title: "The Challenge",
      text1: "Restaurant chains operating with ",
      bold: "fragmented tools and zero visibility",
      text2:
        " across locations. Owners had no unified view of performance, and managers relied on spreadsheets for critical decisions.",
    },
    solution: {
      title: "The Solution",
      text1: "A ",
      bold: "multi-tenant Hospitality OS",
      text2: " with role-based dashboards, ",
      cyan: "Apache Spark analytics",
      text3:
        ", and a guest-facing QR ordering system — all powered by real-time data pipelines.",
    },
    impact: {
      title: "The Impact",
      bold: "52 documented KPIs across 3 roles",
      text1:
        " with <30s data refresh latency. A complete platform from strategic chain vision to individual table orders.",
    },
  },
  meta: [
    { label: "Role", value: "Full-Stack Architect · Thesis (ESCOM-IPN)" },
    { label: "Team", value: "Diego Villagran + Natalia Anaya" },
    { label: "Timeline", value: "Jan 2026 – Dec 2026" },
    { label: "Core Stack", value: "Next.js 16, Prisma 7, Spark" },
  ],
  links: { landing: "Live Landing" },
  quote: {
    text: "Every data point should answer a question a ",
    bold: "restaurant manager actually asks",
    text2: ".",
    title: "The Design Principle",
  },
  constraints: {
    title1: "Constraints",
    title2: "What shaped the architecture.",
    desc: "The context that shaped every architectural decision in the platform.",
    c1: {
      title: "Multi-Tenant Data Isolation",
      text1:
        "Three distinct roles (Super Admin, Zone Manager, Branch Manager) each need ",
      bold1: "completely different views",
      text2:
        " of the same data. We implemented ",
      bold2: "PostgreSQL Row Level Security (RLS)",
      tag: "RLS",
    },
    c2: {
      title: "Real-Time Kitchen Operations",
      text1: "Kitchen orders flow through ",
      bold1: "PENDIENTE → EN_PREPARACIÓN → LISTA",
      text2:
        " states in real time. Branch managers see live status without page refresh.",
    },
    c3: {
      title: "52 Operational KPIs",
      text1:
        "Each KPI has a documented SQL formula. The Spark pipeline processes raw transactions into ",
      bold1: "Gold analytics tables",
      text2: " that power every dashboard metric.",
    },
    c4: {
      title: "Zero-Friction Guest Experience",
      text1: "Guests scan a ",
      bold1: "QR code per table",
      text2:
        " — no app download, no account creation. Browse menu, track orders, split bills, and get a digital receipt.",
    },
  },
  dashboards: {
    title1: "Product screenshots",
    title2: "Three views, one data source.",
    superAdmin: {
      tag: "Super Admin",
      desc: "Strategic vision of the entire chain — GMV, zone comparison, top products.",
    },
    zoneManager: {
      tag: "Zone Manager",
      desc: "Comparative view across branches — trends, staff performance, payment methods.",
    },
    branchManager: {
      tag: "Branch Manager",
      desc: "Operational control of a single location — kitchen status, table occupancy, waiter performance.",
    },
  },
  architecture: {
    title1: "Key decisions",
    title2: "Trade-offs behind the platform.",
    d1: {
      nav: "Multi-tenant RLS",
      title: "Row Level Security",
      desc: "Each role sees only their data. Super Admins see the full chain, Zone Managers see their region, and Branch Managers see their restaurant. We enforced this at the ",
      bold: "database level with Supabase RLS policies",
      desc2:
        " rather than application-level filtering — a single policy bug cannot leak data across tenants.",
      costTitle: "The Operational Cost",
      costDesc:
        "RLS policies must be written for every new table. Migration complexity increases significantly, and debugging permission issues requires deep PostgreSQL knowledge.",
    },
    d2: {
      nav: "Analytics pipeline",
      title: "Spark + Gold Tables",
      desc: "Raw transactional data flows through an ",
      bold: "Apache Spark pipeline",
      desc2:
        " that aggregates, cleans, and materializes Gold tables. Dashboards query pre-computed aggregations instead of scanning millions of raw rows — keeping refresh latency under 30 seconds.",
      costTitle: "The Operational Cost",
      costDesc:
        "Pipeline orchestration adds infrastructure complexity. Schema changes in raw data must propagate through Bronze → Silver → Gold layers, requiring coordinated deployments.",
    },
    d3: {
      nav: "Guest ordering",
      title: "QR Menu Flow",
      desc: "Each table has a unique QR code that resolves to a ",
      bold: "session-less guest interface",
      desc2:
        " — no login, no app download. The guest browses the menu, places orders, and tracks preparation status in real time. Split-bill functionality was the hardest UX challenge.",
      costTitle: "The Operational Cost",
      costDesc:
        "Anonymous sessions require careful state management. The split-bill feature alone added three new database tables and complex transaction logic to handle partial payments.",
    },
  },
  lessons: {
    title1: "Lessons learned",
    title2: "What broke while building a thesis platform.",
    desc: "Building a production-grade platform as a thesis project taught us that academic rigor and real-world engineering have very different failure modes.",
    l1: {
      title: "RLS Policy Explosion",
      desc: "Every new feature added 3-5 RLS policies. We ended up with over 60 policies across 20+ tables. A single misconfigured policy caused Zone Managers to see other zones' data in staging.",
      tag: "AUTOMATED RLS TESTING IN CI/CD PIPELINE",
    },
    l2: {
      title: "Spark Pipeline Cold Starts",
      desc: "The first Spark job after a schema change took 3x longer due to cache invalidation. We learned to version Gold table schemas and run parallel pipelines during migrations.",
      tag: "SCHEMA VERSIONING FOR ANALYTICS TABLES",
    },
    l3: {
      title: "Guest Session Orphaning",
      desc: "QR sessions that expired mid-order created orphaned records. The kitchen would receive orders with no valid session to send status updates to. We added a cleanup cron job and session extension logic.",
      tag: "HEARTBEAT-BASED SESSION KEEPALIVE",
    },
  },
  footer: {
    cta: "Building a multi-tenant product?",
    contact: "Get in touch",
    note: "Thesis project (ESCOM-IPN) — in active development",
  },
} satisfies BouquetDict;

export const bouquetEs = {
  back: "Volver a proyectos",
  eyebrow: "Proyecto de tesis · SaaS hotelero",
  title: "Bouquet",
  subtitle:
    "OS hotelero multi-tenant para cadenas de restaurantes — dashboards por rol, analítica Spark y pedidos QR para clientes.",
  metrics: [
    { value: "52", label: "KPIs documentados" },
    { value: "3", label: "Dashboards por rol" },
    { value: "<30s", label: "Refresh de datos" },
    { value: "RLS", label: "Aislamiento tenant" },
  ],
  tldr: {
    challenge: {
      title: "El Reto",
      text1: "Cadenas de restaurantes operando con ",
      bold: "herramientas fragmentadas y cero visibilidad",
      text2:
        " entre sedes. Los dueños no tenían una vista unificada del rendimiento y los gerentes dependían de hojas de cálculo para decisiones críticas.",
    },
    solution: {
      title: "La Solución",
      text1: "Un ",
      bold: "Hospitality OS multi-tenant",
      text2: " con dashboards por rol, ",
      cyan: "analíticas con Apache Spark",
      text3:
        " y un sistema de pedidos QR para clientes — todo impulsado por pipelines de datos en tiempo real.",
    },
    impact: {
      title: "El Impacto",
      bold: "52 KPIs documentados en 3 roles",
      text1:
        " con <30s de latencia de actualización. Una plataforma completa desde la visión estratégica de la cadena hasta pedidos individuales por mesa.",
    },
  },
  meta: [
    { label: "Rol", value: "Arquitecto Full-Stack · Tesis (ESCOM-IPN)" },
    { label: "Equipo", value: "Diego Villagran + Natalia Anaya" },
    { label: "Timeline", value: "Ene 2026 – Dic 2026" },
    { label: "Stack", value: "Next.js 16, Prisma 7, Spark" },
  ],
  links: { landing: "Landing en Vivo" },
  quote: {
    text: "Cada dato debe responder una pregunta que un ",
    bold: "gerente de restaurante realmente se hace",
    text2: ".",
    title: "El Principio de Diseño",
  },
  constraints: {
    title1: "Restricciones",
    title2: "Lo que moldeó la arquitectura.",
    desc: "El contexto que definió cada decisión arquitectónica en la plataforma.",
    c1: {
      title: "Aislamiento Multi-Tenant",
      text1:
        "Tres roles distintos (Super Admin, Gerente de Zona, Gerente de Sucursal) necesitan ",
      bold1: "vistas completamente diferentes",
      text2: " de los mismos datos. Implementamos ",
      bold2: "Row Level Security (RLS) en PostgreSQL",
      tag: "RLS",
    },
    c2: {
      title: "Operaciones de Cocina en Tiempo Real",
      text1: "Los pedidos fluyen por estados ",
      bold1: "PENDIENTE → EN_PREPARACIÓN → LISTA",
      text2:
        " en tiempo real. Los gerentes ven el estado actualizado sin recargar la página.",
    },
    c3: {
      title: "52 KPIs Operativos",
      text1:
        "Cada KPI tiene una fórmula SQL documentada. El pipeline de Spark procesa transacciones crudas en ",
      bold1: "tablas de analíticas Gold",
      text2: " que alimentan cada métrica del dashboard.",
    },
    c4: {
      title: "Experiencia Sin Fricción para el Cliente",
      text1: "Los clientes escanean un ",
      bold1: "código QR por mesa",
      text2:
        " — sin descargar app, sin crear cuenta. Ven el menú, rastrean pedidos, dividen la cuenta y reciben un recibo digital.",
    },
  },
  dashboards: {
    title1: "Capturas del producto",
    title2: "Tres vistas, una fuente de datos.",
    superAdmin: {
      tag: "Super Admin",
      desc: "Visión estratégica de toda la cadena — GMV, comparación por zona, productos top.",
    },
    zoneManager: {
      tag: "Gerente de zona",
      desc: "Vista comparativa entre sucursales — tendencias, rendimiento del staff, métodos de pago.",
    },
    branchManager: {
      tag: "Gerente de sucursal",
      desc: "Control operativo de una sola ubicación — estado de cocina, ocupación de mesas, rendimiento de meseros.",
    },
  },
  architecture: {
    title1: "Decisiones clave",
    title2: "Trade-offs detrás de la plataforma.",
    d1: {
      nav: "Multi-tenant RLS",
      title: "Row Level Security",
      desc: "Cada rol solo ve sus datos. Los Super Admins ven toda la cadena, los Gerentes de Zona ven su región y los Gerentes de Sucursal ven su restaurante. Lo implementamos a ",
      bold: "nivel de base de datos con políticas RLS de Supabase",
      desc2:
        " en vez de filtrar a nivel de aplicación — un solo bug en una política no puede filtrar datos entre tenants.",
      costTitle: "El Costo Operativo",
      costDesc:
        "Las políticas RLS deben escribirse para cada tabla nueva. La complejidad de migraciones aumenta significativamente, y depurar problemas de permisos requiere conocimiento profundo de PostgreSQL.",
    },
    d2: {
      nav: "Pipeline analítico",
      title: "Spark + Tablas Gold",
      desc: "Los datos transaccionales crudos fluyen por un ",
      bold: "pipeline de Apache Spark",
      desc2:
        " que agrega, limpia y materializa tablas Gold. Los dashboards consultan agregaciones precomputadas en vez de escanear millones de filas crudas — manteniendo la latencia de actualización bajo 30 segundos.",
      costTitle: "El Costo Operativo",
      costDesc:
        "La orquestación del pipeline agrega complejidad de infraestructura. Los cambios de esquema en datos crudos deben propagarse por las capas Bronze → Silver → Gold, requiriendo despliegues coordinados.",
    },
    d3: {
      nav: "Pedidos QR",
      title: "Flujo de Menú QR",
      desc: "Cada mesa tiene un código QR único que resuelve a una ",
      bold: "interfaz de cliente sin sesión",
      desc2:
        " — sin login, sin descargar app. El cliente navega el menú, hace pedidos y rastrea el estado de preparación en tiempo real. La función de dividir cuenta fue el mayor desafío de UX.",
      costTitle: "El Costo Operativo",
      costDesc:
        "Las sesiones anónimas requieren gestión cuidadosa de estado. La función de dividir cuenta sola agregó tres tablas nuevas y lógica compleja de transacciones para manejar pagos parciales.",
    },
  },
  lessons: {
    title1: "Lecciones aprendidas",
    title2: "Lo que falló al construir una tesis productiva.",
    desc: "Construir una plataforma de grado productivo como proyecto de tesis nos enseñó que el rigor académico y la ingeniería del mundo real tienen modos de falla muy diferentes.",
    l1: {
      title: "Explosión de Políticas RLS",
      desc: "Cada nueva función agregaba 3-5 políticas RLS. Terminamos con más de 60 políticas en 20+ tablas. Una sola política mal configurada hizo que Gerentes de Zona vieran datos de otras zonas en staging.",
      tag: "TESTING AUTOMATIZADO DE RLS EN CI/CD",
    },
    l2: {
      title: "Cold Starts del Pipeline Spark",
      desc: "El primer job de Spark después de un cambio de esquema tomaba 3x más tiempo por invalidación de caché. Aprendimos a versionar esquemas de tablas Gold y ejecutar pipelines paralelos durante migraciones.",
      tag: "VERSIONAMIENTO DE ESQUEMAS PARA TABLAS ANALÍTICAS",
    },
    l3: {
      title: "Sesiones de Cliente Huérfanas",
      desc: "Las sesiones QR que expiraban a mitad de pedido creaban registros huérfanos. La cocina recibía pedidos sin sesión válida para enviar actualizaciones de estado. Agregamos un cron de limpieza y lógica de extensión de sesión.",
      tag: "KEEPALIVE DE SESIÓN CON HEARTBEAT",
    },
  },
  footer: {
    cta: "¿Construyes un producto multi-tenant?",
    contact: "Escríbeme",
    note: "Proyecto de tesis (ESCOM-IPN) — en desarrollo activo",
  },
} satisfies BouquetDict;
