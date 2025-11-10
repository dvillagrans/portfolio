import { ProfileData } from "./types";

export const mlEngineerProfile: ProfileData = {
  hero: {
    eyebrow: "MLOps · Model Deployment",
    title: "Ship models to prod, safely.",
    subtitle: "Transformo notebooks en servicios reproducibles con monitoreo desde el día uno.",
    credentials: "FastAPI · Docker · Grafana · 7+ despliegues productivos",
    badge: "Model registry · Feature store · Canary releases",
    persona: "Ex-Eyenet, obsesionado con despliegues aburridos y sin sorpresas.",
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: "TTD notebook→API",
        value: "48h",
        description: "Promedio en migraciones productivas",
      },
      {
        label: "Latencia P95",
        value: "180ms",
        description: "Servicios ML monitorizados en prod",
      },
      {
        label: "Alertas útilmente resueltas",
        value: "92%",
        description: "Antes de impacto en usuarios",
      },
    ],
    ctas: [
      {
        label: "Ver casos",
        href: "#casos",
        type: "primary",
      },
      {
        label: "Agenda sesión MLOps",
        href: "https://cal.com/diegovillagran/mlops",
        type: "secondary",
        target: "_blank",
        description: "30 minutos para auditar tu pipeline",
      },
    ],
  },
  problems: [
    {
      title: "Modelos que no pasan de notebook",
      description: "Defino pipelines CI/CD con pruebas, empaquetado y versiones para repetir releases sin sorpresas.",
      metric: "De 3 semanas a 48h TTD",
    },
    {
      title: "Inferencias lentas o con drift",
      description: "Instrumento métricas P50/P95, monitoreo de drift y retraining programado con alertas útiles.",
      metric: "-40% latencia, 0 regresiones P0",
    },
    {
      title: "Stack improvisado",
      description: "Integro registry, feature store y observabilidad para controlar qué modelo sirve qué datos.",
      metric: "Release check-list 100% trazable",
    },
    {
      title: "Rollback costoso",
      description: "Uso canary + blue/green y pruebas smoke automáticas para revertir en minutos.",
      metric: "Rollback < 5min documentado",
    },
  ],
  metrics: [
    {
      label: "Despliegues/año",
      value: "18",
      description: "Entre APIs, cron jobs y servicios batch",
    },
    {
      label: "Cobertura de tests",
      value: "85%",
      description: "Pipelines con unit + smoke + contrato",
    },
    {
      label: "Incidentes críticos",
      value: "0",
      description: "En releases dirigidos por mí en 2024-25",
    },
  ],
  process: [
    {
      icon: "pipeline",
      title: "Audit & Align",
      description: "Mapeo notebooks, datasets y contratos existentes.",
      detail: "Checklist de reproducibilidad, dependency graph y riesgos de drift.",
    },
    {
      icon: "automation",
      title: "Ship & Observe",
      description: "Empaquetado, CI/CD y despliegue escalonado.",
      detail: "Feature flags, canary releases y health-checks con métricas accionables.",
    },
    {
      icon: "monitoring",
      title: "Optimize & Retrain",
      description: "Monitoreo en vivo y ciclos de retraining automatizados.",
      detail: "Alertas útiles, dashboards de drift y roadmap de mejoras trimestral.",
    },
  ],
  caseStudies: [
    {
      title: "Qalma · Streaming EEG",
      category: "Migración notebook → plataforma ML",
      timeframe: "2025",
      summary: "Convertí un prototipo de clasificación de emociones en un servicio reproducible y monitoreado.",
      context: "La startup procesaba señales EEG en notebooks manuales, sin versionado ni seguimiento de calidad.",
      action: "Orquesté pipelines de entrenamiento con Prefect, empaqueté el modelo en FastAPI dentro de Docker y levanté registry + feature store en Supabase.",
      result: "Latencia P95 140ms, 85% accuracy consistente y alertas de drift directo a Slack con retraining semanal automatizado.",
      metric: "5 releases canary sin incidentes · uptime 99.9%",
      tags: ["FastAPI", "TensorFlow", "Prefect", "Supabase", "Grafana"],
      proof: [
        {
          label: "Repo público",
          href: "https://github.com/dvillagrans/qalma",
          type: "secondary",
          icon: "github",
          target: "_blank",
        },
        {
          label: "Demo notebooks",
          href: "https://github.com/dvillagrans/qalma/tree/main/notebooks",
          type: "ghost",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/qalma.webp",
        alt: "Panel de monitoreo Qalma",
      },
      highlight: true,
    },
    {
      title: "Microservicios observables",
      category: "MLOps & Platform",
      timeframe: "2024",
      summary: "Diseñé un stack con 8 servicios ML y data con despliegues aburridos y métricas claras.",
      context: "Ecosistema de APIs sin health checks ni trazabilidad entre modelo, datos y versión de código.",
      action: "Compuse Docker stack con Nginx, Redis, PostgreSQL y workers ML; habilité CI/CD, tests contractuales y tableros Prometheus/Grafana por servicio.",
      result: "99.5% uptime, errores P0 reducidos 95% y tiempo de rollback real < 4 minutos.",
      metric: "25 métricas + alertas semánticas",
      tags: ["Docker", "Prometheus", "Grafana", "PostgreSQL", "Redis"],
      proof: [
        {
          label: "Infra snapshot",
          href: "https://github.com/dvillagrans/microservices-starter",
          type: "ghost",
          icon: "github",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/microservices.webp",
        alt: "Arquitectura observabilidad microservicios",
      },
      highlight: true,
    },
    {
      title: "Canary + drift radar",
      category: "MLOps quick win",
      timeframe: "2025",
      summary: "Implementé canary releases y monitoreo de drift para un modelo de clasificación de tickets.",
      context: "Modelo legacy con degradación silenciosa y solo alertas de CPU.",
      action: "Creé feature store ligero, comparación de distribución y canary 10% con reglas automáticas.",
      result: "Drift detectado 14 días antes, rollback automatizado en 3 minutos y reporte semanal a stakeholders.",
      metric: "Alertas precisas 100% (sin ruido)",
      tags: ["MLflow", "Evidently", "ArgoCD"],
      proof: [
        {
          label: "Guía técnica",
          href: "https://dvillagrans.notion.site/canary-mlops",
          type: "soft",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/dash-esperanzavida-mortalidad.webp",
        alt: "Dashboard de drift y canary",
      },
      quickRead: true,
    },
  ],
  toolbox: [
    {
      title: "Model Serving",
      items: ["FastAPI", "TensorFlow Serving", "KServe", "Docker"],
    },
    {
      title: "Pipelines & Orquestación",
      items: ["Prefect", "Airflow", "Argo Workflows", "Github Actions"],
    },
    {
      title: "Observabilidad",
      items: ["Prometheus", "Grafana", "OpenTelemetry", "Evidently"],
    },
    {
      title: "Feature Store & Registry",
      items: ["MLflow", "Feast", "Supabase", "PostgreSQL"],
    },
  ],
  guarantees: [
    {
      label: "Time-to-deploy",
      value: "≤ 48h",
      description: "De notebook o checkpoint a API versionada con CI/CD y monitoreo básico.",
    },
    {
      label: "Latencia P95",
      value: "< 200ms",
      description: "Benchmarks + ajustes de infra y caching para cumplir SLO.",
    },
    {
      label: "Incident Response",
      value: "< 30 min MTTR",
      description: "Playbooks y alertas accionables; canales listos antes del go-live.",
    },
  ],
  testimonials: [
    {
      quote: "Diego industrializó nuestro prototipo en tiempo récord. Ahora los releases se sienten rutinarios y tenemos visibilidad total del modelo.",
      author: "Miguel Arriaga",
      role: "CTO",
      company: "Qalma",
      highlight: true,
    },
    {
      quote: "Implementó monitoreo de drift y canaries sin interrumpir al equipo de data. Hoy sabemos cuándo actuar antes de que el cliente note algo.",
      author: "Karla Jiménez",
      role: "Head of Data",
      company: "Eyenet",
    },
  ],
  anecdote: {
    title: "Incidente 2am, lección de SLOs",
    story: "Una pipeline de inferencia se cicló a las 2am por un esquema mal versionado. En 18 minutos monté rollback + validaciones de contrato automatizadas. Desde entonces ningún release sale sin canary y test de contratos.",
    lesson: "Las alertas deben ser accionables y los contratos versionados junto al modelo.",
  },
  workingStyle: {
    availability: "Sprints de 2–3 semanas con demos semanales.",
    timezone: "CDMX (GMT-6) · solapamiento con US & LatAm.",
    communication: "Asíncrono en Slack/Notion, daily breve cuando estamos en lanzamiento.",
    handoff: "Docs en Notion + tableros Grafana listos + checklist de operación.",
    tools: ["Notion", "Linear", "GitHub Projects", "Plausible", "Slack"],
  },
  finalCta: {
    title: "Hablemos de tu despliegue ML",
    subtitle: "Diagnóstico sin costo para evaluar reproducibilidad, monitoreo y ciclo de releases.",
    primary: {
      label: "Agendar diagnóstico",
      href: "https://cal.com/diegovillagran/mlops",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: "Solicitar referencias",
      href: "mailto:diegovillasal@gmail.com?subject=Referencias%20MLOps",
      type: "ghost",
    },
    note: "Slots limitados por sprint (máx. 2 proyectos paralelos).",
    slots: ["Semana del 18 nov: 1 cupo", "Semana del 25 nov: 2 cupos"],
  },
};
