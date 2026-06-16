import type { EyeNetDict } from "../types";

export const eyenetEn = {
  back: "Back to projects",
  eyebrow: "Client project · AI automation",
  title: "EyeNet",
  subtitle:
    "AI & automation infrastructure — LLM pipelines, ETL/ELT, containerized microservices, and production web/mobile apps.",
  metrics: [
    { value: "65%", label: "Less manual work" },
    { value: "300+", label: "Docs / week" },
    { value: "10K+", label: "Daily requests" },
    { value: "92%", label: "Extraction accuracy" },
  ],
  tldr: {
    challenge: { title: "The Challenge", text1: "Hooks and events arrived with ", bold: "inconsistent schemas", text2: " — missing fields, wrong types, variable structures. Impossible to store for KPIs without a robust normalization layer." },
    solution: { title: "The Solution", text1: "A ", bold: "hybrid AI infrastructure", text2: " combining proprietary APIs with a ", cyan: "self-hosted GPU cluster", text3: ". Sub-agent architecture for memory, context, and specialized delegation." },
    impact: { title: "The Impact", bold: "65% reduction in manual work", text1: ", 300+ docs processed weekly, 10K+ daily requests, and 92% extraction accuracy across two production systems." }
  },
  meta: [
    { label: "Role", value: "AI Systems Engineer" },
    { label: "Timeline", value: "Apr 2025 – May 2026" },
    { label: "Architecture", value: "Hybrid Cloud + GPU Cluster" },
    { label: "Core Stack", value: "Python, n8n, Docker, DeepSeek" }
  ],
  links: { systemA: "System A Pipeline", systemB: "System B Workflow" },
  quote: { text: "Using proprietary APIs for everything was ", bold: "not viable at scale", text2: ". The decision to build our own GPU cluster changed the economics of the entire operation.", title: "The Infrastructure Bet" },
  constraints: {
    title1: "The problem",
    title2: "What forced the architecture.",
    desc: "Three hard problems that shaped every technical decision.",
    c1: { title: "Unnormalized Data", text1: "External hooks arrived with ", bold1: "no fixed schema", text2: ". Fields missing, types inconsistent, structures variable. We had to build a normalization layer before any AI could process the data.", tag: "Data quality" },
    c2: { title: "Controlled AI Costs", text1: "Using OpenAI/Gemini for everything scaled ", bold1: "linearly in cost", text2: ". We built a GPU cluster with open-source models and reserved proprietary APIs only where ROI justified it.", tag: "Infrastructure" },
    c3: { title: "Agents with Memory", text1: "Assistants had to handle ", bold1: "multiple intents, remember context", text2: ", and delegate to specialized sub-agents without losing coherence in long conversations.", tag: "AI systems" }
  },
  systems: {
    title1: "How it works",
    title2: "From sources to deliverables.",
    desc: "Two production systems. Different architecture, same principle: clean data → intelligent processing → actionable output.",
    tabA: "System A — Document Processing",
    tabB: "System B — AI Assistant",
    mobileHint: "Pinch to zoom · Drag to pan"
  },
  architecture: {
    title1: "Key decisions",
    title2: "Trade-offs that shaped the systems.",
    d1: { nav: "Models", title: "Own Cluster vs External APIs", desc: "For high-volume and repetitive use cases, proprietary API costs scale linearly. We mounted a ", bold: "GPU cluster with open-source models", desc2: " (LLaMA, Mistral, DeepSeek) for base workloads, reserving OpenAI/Gemini for cases where quality justified cost.", costTitle: "Trade-off", costDesc: "Higher operational complexity in exchange for full control over latency, cost, and data privacy." },
    d2: { nav: "Normalization", title: "Schema-First from Day One", desc: "Hooks arrived with variable structures. The temptation was to process and move on — but that would have made KPIs impossible. We designed the MongoDB schema ", bold: "thinking about future aggregations", desc2: " before writing the first pipeline.", costTitle: "Trade-off", costDesc: "More initial design time, zero technical debt in later analytics." },
    d3: { nav: "Agents", title: "Sub-Agents vs Monolith", desc: "A single agent with all tools collapsed in long contexts and made routing errors. We separated into ", bold: "specialized sub-agents by domain", desc2: " (calendar, documents, data, general response) with a central orchestrator that delegates.", costTitle: "Trade-off", costDesc: "More nodes in the graph, explicit routing logic, but predictable and debuggable behavior." },
    d4: { nav: "Monitoring", title: "Telegram as Alert System", desc: "Instead of building a monitoring dashboard from scratch, we integrated ", bold: "Telegram notifications directly into workflows", desc2: ". Every critical pipeline reports success/failure to the operator in real time.", costTitle: "Trade-off", costDesc: "Not Grafana, but instant, zero overhead, and the team already uses Telegram." }
  },
  stack: {
    title1: "Stack",
    title2: "Technologies and tools.",
    layers: [
      { label: "Ingestion", items: ["Webhooks", "REST APIs", "Telegram", "n8n workflows"] },
      { label: "Processing", items: ["DeepSeek", "LLaMA", "Mistral", "OpenAI", "Gemini", "GPU Cluster"] },
      { label: "Storage", items: ["MongoDB", "PostgreSQL", "Redis", "Google Drive"] },
      { label: "Delivery", items: ["Docker", "CI/CD", "FastAPI", "React Native", "Next.js", "Telegram"] },
      { label: "Monitoring", items: ["Telegram alerts", "Grafana", "Prometheus", "Structured logging"] }
    ],
    tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "DeepSeek", "LLaMA", "Mistral", "PostgreSQL", "MongoDB", "Redis", "CI/CD", "React Native", "Nginx", "Grafana"]
  },
  lessons: {
    title1: "Lessons learned",
    title2: "What broke in production.",
    desc: "Problems we had to recognize and fix in production.",
    l1: { title: "Dirty Data in Production", desc: "The first production webhooks arrived with fields in unexpected formats that the normalization schema didn't anticipate. Required rapid iterations on the Code layer before stabilizing.", tag: "Data quality" },
    l2: { title: "Cluster vs Production Gap", desc: "Models that worked well on the local cluster failed in production due to quantization differences and available memory. We learned to separate model evaluation environments from production inference.", tag: "Infrastructure" },
    l3: { title: "Context Window in Long Conversations", desc: "In long conversations, the main agent lost relevant context. Simple memory wasn't enough — we had to implement sliding window memory with context summarization.", tag: "AI systems" }
  },
  footer: {
    cta: "Building automation at scale?",
    contact: "Get in touch",
    note: "Partial NDA — architecture shown, client details omitted",
  },
} satisfies EyeNetDict;

export const eyenetEs = {
  back: "Volver a proyectos",
  eyebrow: "Proyecto cliente · Automatización IA",
  title: "EyeNet",
  subtitle:
    "Infraestructura de IA y automatización — pipelines LLM, ETL/ELT, microservicios containerizados y apps web/móviles en producción.",
  metrics: [
    { value: "65%", label: "Menos trabajo manual" },
    { value: "300+", label: "Docs / semana" },
    { value: "10K+", label: "Requests diarios" },
    { value: "92%", label: "Precisión extracción" },
  ],
  tldr: {
    challenge: { title: "El Reto", text1: "Los hooks y eventos llegaban con ", bold: "esquemas inconsistentes", text2: " — campos faltantes, tipos incorrectos, estructuras variables. Imposible almacenar para KPIs sin una capa de normalización robusta." },
    solution: { title: "La Solución", text1: "Una ", bold: "infraestructura híbrida de IA", text2: " combinando APIs propietarias con un ", cyan: "cluster GPU propio", text3: ". Arquitectura de sub-agentes para memoria, contexto y delegación especializada." },
    impact: { title: "El Impacto", bold: "65% de reducción en trabajo manual", text1: ", 300+ docs procesados semanalmente, 10K+ requests diarios y 92% de precisión en extracción entre dos sistemas en producción." }
  },
  meta: [
    { label: "Rol", value: "AI Systems Engineer" },
    { label: "Timeline", value: "Abr 2025 – May 2026" },
    { label: "Arquitectura", value: "Hybrid Cloud + GPU Cluster" },
    { label: "Stack Core", value: "Python, n8n, Docker, DeepSeek" }
  ],
  links: { systemA: "Pipeline Sistema A", systemB: "Workflow Sistema B" },
  quote: { text: "Usar APIs propietarias para todo era ", bold: "inviable a escala", text2: ". La decisión de construir nuestro propio cluster GPU cambió la economía de toda la operación.", title: "La Apuesta de Infraestructura" },
  constraints: {
    title1: "El problema",
    title2: "Lo que forzó la arquitectura.",
    desc: "Tres problemas difíciles que moldearon cada decisión técnica.",
    c1: { title: "Datos No Normalizados", text1: "Los hooks externos llegaban con ", bold1: "esquema fijo inexistente", text2: ". Campos faltantes, tipos inconsistentes, estructuras variables. Tuvimos que construir una capa de normalización antes de que cualquier IA pudiera procesar los datos.", tag: "Calidad de datos" },
    c2: { title: "Costos de IA Controlados", text1: "Usar OpenAI/Gemini para todo escalaba ", bold1: "linealmente en costo", text2: ". Construimos un cluster GPU con modelos open-source y reservamos APIs propietarias solo donde el ROI lo justificaba.", tag: "Infraestructura" },
    c3: { title: "Agentes con Memoria", text1: "Los asistentes debían manejar ", bold1: "múltiples intenciones, recordar contexto", text2: " y delegar a sub-agentes especializados sin perder coherencia en conversaciones largas.", tag: "Sistemas IA" }
  },
  systems: {
    title1: "Cómo funciona",
    title2: "De fuentes a entregables.",
    desc: "Dos sistemas en producción. Arquitectura distinta, mismo principio: datos limpios → procesamiento inteligente → output accionable.",
    tabA: "Sistema A — Procesamiento de Documentos",
    tabB: "Sistema B — Asistente de IA",
    mobileHint: "Pellizca para zoom · Arrastra para mover"
  },
  architecture: {
    title1: "Decisiones clave",
    title2: "Trade-offs que moldearon los sistemas.",
    d1: { nav: "Modelos", title: "Cluster Propio vs APIs Externas", desc: "Para volúmenes altos y casos de uso repetitivos, el costo de APIs propietarias escala linealmente. Montamos un ", bold: "cluster GPU con modelos open-source", desc2: " (LLaMA, Mistral, DeepSeek) para workloads base, reservando OpenAI/Gemini para casos donde la calidad justificaba el costo.", costTitle: "Trade-off", costDesc: "Mayor complejidad operativa a cambio de control total sobre latencia, costo y privacidad de datos." },
    d2: { nav: "Normalización", title: "Schema-First desde el Día Uno", desc: "Los hooks llegaban con estructuras variables. La tentación era procesar y ya — pero eso habría hecho imposible los KPIs. Diseñamos el schema de MongoDB ", bold: "pensando en las agregaciones futuras", desc2: " antes de escribir el primer pipeline.", costTitle: "Trade-off", costDesc: "Más tiempo de diseño inicial, cero deuda técnica en analytics posterior." },
    d3: { nav: "Agentes", title: "Sub-Agentes vs Monolito", desc: "Un solo agente con todas las herramientas colapsaba en contextos largos y cometía errores de routing. Separamos en ", bold: "sub-agentes especializados por dominio", desc2: " (calendario, documentos, datos, respuesta general) con un orquestador central que delega.", costTitle: "Trade-off", costDesc: "Más nodos en el grafo, lógica de routing explícita, pero comportamiento predecible y debuggeable." },
    d4: { nav: "Monitoreo", title: "Telegram como Sistema de Alertas", desc: "En lugar de construir un dashboard de monitoreo desde cero, integramos ", bold: "notificaciones en Telegram directamente en los workflows", desc2: ". Cada pipeline crítico notifica éxito/fallo al operador en tiempo real.", costTitle: "Trade-off", costDesc: "No es Grafana, pero es instantáneo, cero overhead, y el equipo ya usa Telegram." }
  },
  stack: {
    title1: "Stack",
    title2: "Tecnologías y herramientas.",
    layers: [
      { label: "Ingesta", items: ["Webhooks", "REST APIs", "Telegram", "n8n workflows"] },
      { label: "Procesamiento", items: ["DeepSeek", "LLaMA", "Mistral", "OpenAI", "Gemini", "GPU Cluster"] },
      { label: "Almacenamiento", items: ["MongoDB", "PostgreSQL", "Redis", "Google Drive"] },
      { label: "Entrega", items: ["Docker", "CI/CD", "FastAPI", "React Native", "Next.js", "Telegram"] },
      { label: "Monitoreo", items: ["Telegram alerts", "Grafana", "Prometheus", "Structured logging"] }
    ],
    tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "DeepSeek", "LLaMA", "Mistral", "PostgreSQL", "MongoDB", "Redis", "CI/CD", "React Native", "Nginx", "Grafana"]
  },
  lessons: {
    title1: "Lecciones aprendidas",
    title2: "Lo que falló en producción.",
    desc: "Problemas que tuvimos que reconocer y corregir en producción.",
    l1: { title: "Datos Sucios en Producción", desc: "Los primeros webhooks en producción llegaban con campos en formatos inesperados que el schema de normalización no anticipaba. Requirió iteraciones rápidas en la capa de Code antes de estabilizar.", tag: "Calidad de datos" },
    l2: { title: "Brecha Cluster vs Producción", desc: "Los modelos que funcionaban bien en el cluster local fallaban en producción por diferencias de cuantización y memoria disponible. Aprendimos a separar ambientes de evaluación de modelos del ambiente de inferencia productivo.", tag: "Infraestructura" },
    l3: { title: "Context Window en Conversaciones Largas", desc: "En conversaciones largas, el agente principal perdió contexto relevante. La memoria simple no era suficiente — tuvimos que implementar memoria con ventana deslizante y resumen de contexto.", tag: "Sistemas IA" }
  },
  footer: {
    cta: "¿Construyes automatización a escala?",
    contact: "Escríbeme",
    note: "NDA parcial — arquitectura mostrada, detalles de cliente omitidos",
  },
} satisfies EyeNetDict;
