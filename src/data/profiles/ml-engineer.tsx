import { ProfileData, type LocalizedText } from "./types";

const l = (en: string, es: string): LocalizedText => ({ en, es });

export const mlEngineerProfile: ProfileData = {
  hero: {
    eyebrow: l("MLOps · Model Deployment", "MLOps · Model Deployment"),
    title: l("Ship models to prod, safely.", "Ship models to prod, safely."),
    subtitle: l(
      "I turn notebooks into reproducible services with monitoring from day one.",
      "Transformo notebooks en servicios reproducibles con monitoreo desde el día uno.",
    ),
    credentials: l("FastAPI · Docker · Grafana · 7+ production deployments", "FastAPI · Docker · Grafana · 7+ despliegues productivos"),
    badge: l("Model registry · Feature store · Canary releases", "Model registry · Feature store · Canary releases"),
    persona: l("Former Eyenet, obsessed with boring, surprise-free deployments.", "Ex-Eyenet, obsesionado con despliegues aburridos y sin sorpresas."),
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: l("Notebook → API TTD", "TTD notebook→API"),
        value: l("48h", "48h"),
        description: l("Average in production migrations", "Promedio en migraciones productivas"),
      },
      {
        label: l("P95 latency", "Latencia P95"),
        value: l("180ms", "180ms"),
        description: l("Monitored ML services in production", "Servicios ML monitorizados en prod"),
      },
      {
        label: l("Alerts resolved usefully", "Alertas útilmente resueltas"),
        value: l("92%", "92%"),
        description: l("Before impacting users", "Antes de impacto en usuarios"),
      },
    ],
    ctas: [
      {
        label: l("View cases", "Ver casos"),
        href: "#casos",
        type: "primary",
      },
      {
        label: l("Book an MLOps session", "Agenda sesión MLOps"),
        href: "https://cal.com/diegovillagran/mlops",
        type: "secondary",
        target: "_blank",
        description: l("30 minutes to audit your pipeline", "30 minutos para auditar tu pipeline"),
      },
    ],
  },
  problems: [
    {
      title: l("Models stuck in notebooks", "Modelos que no pasan de notebook"),
      description: l("I define CI/CD pipelines with tests, packaging, and versioning to repeat releases without surprises.", "Defino pipelines CI/CD con pruebas, empaquetado y versiones para repetir releases sin sorpresas."),
      metric: l("From 3 weeks to 48h TTD", "De 3 semanas a 48h TTD"),
    },
    {
      title: l("Slow inference or drift", "Inferencias lentas o con drift"),
      description: l("I instrument P50/P95 metrics, drift monitoring, and scheduled retraining with actionable alerts.", "Instrumento métricas P50/P95, monitoreo de drift y retraining programado con alertas útiles."),
      metric: l("-40% latency, 0 P0 regressions", "-40% latencia, 0 regresiones P0"),
    },
    {
      title: l("Improvised stack", "Stack improvisado"),
      description: l("I integrate registry, feature store, and observability to control which model serves which data.", "Integro registry, feature store y observabilidad para controlar qué modelo sirve qué datos."),
      metric: l("Release checklist 100% traceable", "Release check-list 100% trazable"),
    },
    {
      title: l("Expensive rollbacks", "Rollback costoso"),
      description: l("I use canary + blue/green and automated smoke tests to revert within minutes.", "Uso canary + blue/green y pruebas smoke automáticas para revertir en minutos."),
      metric: l("Documented rollback in <5 min", "Rollback < 5min documentado"),
    },
  ],
  metrics: [
    {
      label: l("Deployments/year", "Despliegues/año"),
      value: l("18", "18"),
      description: l("Across APIs, cron jobs, and batch services", "Entre APIs, cron jobs y servicios batch"),
    },
    {
      label: l("Test coverage", "Cobertura de tests"),
      value: l("85%", "85%"),
      description: l("Pipelines with unit + smoke + contract tests", "Pipelines con unit + smoke + contrato"),
    },
    {
      label: l("Critical incidents", "Incidentes críticos"),
      value: l("0", "0"),
      description: l("In releases I led during 2024-25", "En releases dirigidos por mí en 2024-25"),
    },
  ],
  process: [
    {
      icon: "pipeline",
      title: l("Audit & Align", "Audit & Align"),
      description: l("I map notebooks, datasets, and existing contracts.", "Mapeo notebooks, datasets y contratos existentes."),
      detail: l("Reproducibility checklist, dependency graph, and drift risks.", "Checklist de reproducibilidad, dependency graph y riesgos de drift."),
    },
    {
      icon: "automation",
      title: l("Ship & Observe", "Ship & Observe"),
      description: l("Packaging, CI/CD, and staged deployment.", "Empaquetado, CI/CD y despliegue escalonado."),
      detail: l("Feature flags, canary releases, and health checks with actionable metrics.", "Feature flags, canary releases y health-checks con métricas accionables."),
    },
    {
      icon: "monitoring",
      title: l("Optimize & Retrain", "Optimize & Retrain"),
      description: l("Live monitoring and automated retraining cycles.", "Monitoreo en vivo y ciclos de retraining automatizados."),
      detail: l("Useful alerts, drift dashboards, and a quarterly improvement roadmap.", "Alertas útiles, dashboards de drift y roadmap de mejoras trimestral."),
    },
  ],
  caseStudies: [
    {
      title: l("Qalma · Streaming EEG", "Qalma · Streaming EEG"),
      category: l("Notebook → ML platform migration", "Migración notebook → plataforma ML"),
      timeframe: l("2025", "2025"),
      summary: l(
        "I turned an emotion-classification prototype into a reproducible, monitored service.",
        "Convertí un prototipo de clasificación de emociones en un servicio reproducible y monitoreado.",
      ),
      context: l(
        "The startup processed EEG signals manually in notebooks, with no versioning or quality tracking.",
        "La startup procesaba señales EEG en notebooks manuales, sin versionado ni seguimiento de calidad.",
      ),
      action: l(
        "Orchestrated training pipelines with Prefect, packaged the model in FastAPI inside Docker, and set up registry + feature store in Supabase.",
        "Orquesté pipelines de entrenamiento con Prefect, empaqueté el modelo en FastAPI dentro de Docker y levanté registry + feature store en Supabase.",
      ),
      result: l(
        "P95 latency 140ms, consistent 85% accuracy, drift alerts piped to Slack, and automated weekly retraining.",
        "Latencia P95 140ms, 85% accuracy consistente y alertas de drift directo a Slack con retraining semanal automatizado.",
      ),
      metric: l("5 canary releases without incidents · 99.9% uptime", "5 releases canary sin incidentes · uptime 99.9%"),
      tags: ["FastAPI", "TensorFlow", "Prefect", "Supabase", "Grafana"],
      proof: [
        {
          label: l("Public repo", "Repo público"),
          href: "https://github.com/dvillagrans/qalma",
          type: "secondary",
          icon: "github",
          target: "_blank",
        },
        {
          label: l("Demo notebooks", "Demo notebooks"),
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
      codeSnippet: {
        language: "python",
        file: "pipeline.py",
        code: `
@flow(name="eeg-training-pipeline")
def train_model(batch_id: str):
    # 1. Load validated data from Feature Store
    X, y = load_features(batch_id, version="prod")
    
    # 2. Train with experiment tracking
    with mlflow.start_run():
        model = TensorFlowClassifier()
        model.fit(X, y)
        
        # 3. Log metrics & artifacts
        mlflow.log_metrics({"accuracy": model.score(X, y)})
        mlflow.tensorflow.log_model(model, "model")
        
    # 4. Register if beats baseline
    if model.accuracy > 0.85:
        register_model(model, stage="Staging")
`
      }
    },
    {
      title: l("Observable microservices", "Microservicios observables"),
      category: l("MLOps & Platform", "MLOps & Platform"),
      timeframe: l("2024", "2024"),
      summary: l(
        "Designed a stack with eight ML and data services featuring boring deployments and clear metrics.",
        "Diseñé un stack con 8 servicios ML y data con despliegues aburridos y métricas claras.",
      ),
      context: l(
        "API ecosystem lacked health checks and traceability between model, data, and code version.",
        "Ecosistema de APIs sin health checks ni trazabilidad entre modelo, datos y versión de código.",
      ),
      action: l(
        "Composed a Docker stack with Nginx, Redis, PostgreSQL, and ML workers; enabled CI/CD, contract tests, and Prometheus/Grafana dashboards per service.",
        "Compuse Docker stack con Nginx, Redis, PostgreSQL y workers ML; habilité CI/CD, tests contractuales y tableros Prometheus/Grafana por servicio.",
      ),
      result: l(
        "99.5% uptime, P0 errors down by 95%, real rollback time under 4 minutes.",
        "99.5% uptime, errores P0 reducidos 95% y tiempo de rollback real < 4 minutos.",
      ),
      metric: l("25 metrics + semantic alerts", "25 métricas + alertas semánticas"),
      tags: ["Docker", "Prometheus", "Grafana", "PostgreSQL", "Redis"],
      proof: [
        {
          label: l("Infra snapshot", "Infra snapshot"),
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
      title: l("Canary + drift radar", "Canary + drift radar"),
      category: l("MLOps quick win", "MLOps quick win"),
      timeframe: l("2025", "2025"),
      summary: l(
        "Implemented canary releases and drift monitoring for a ticket-classification model.",
        "Implementé canary releases y monitoreo de drift para un modelo de clasificación de tickets.",
      ),
      context: l(
        "Legacy model suffered silent degradation with only CPU alerts.",
        "Modelo legacy con degradación silenciosa y solo alertas de CPU.",
      ),
      action: l(
        "Built a lightweight feature store, distribution comparisons, and 10% canary with automated rules.",
        "Creé feature store ligero, comparación de distribución y canary 10% con reglas automáticas.",
      ),
      result: l(
        "Detected drift 14 days earlier, automated rollback in 3 minutes, weekly report for stakeholders.",
        "Drift detectado 14 días antes, rollback automatizado en 3 minutos y reporte semanal a stakeholders.",
      ),
      metric: l("Alerts 100% precise (no noise)", "Alertas precisas 100% (sin ruido)"),
      tags: ["MLflow", "Evidently", "ArgoCD"],
      proof: [
        {
          label: l("Technical guide", "Guía técnica"),
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
      title: l("Model serving", "Model Serving"),
      items: ["FastAPI", "TensorFlow Serving", "KServe", "Docker"],
    },
    {
      title: l("Pipelines & orchestration", "Pipelines & Orquestación"),
      items: ["Prefect", "Airflow", "Argo Workflows", "Github Actions"],
    },
    {
      title: l("Observability", "Observabilidad"),
      items: ["Prometheus", "Grafana", "OpenTelemetry", "Evidently"],
    },
    {
      title: l("Feature store & registry", "Feature Store & Registry"),
      items: ["MLflow", "Feast", "Supabase", "PostgreSQL"],
    },
  ],
  guarantees: [
    {
      label: l("Time-to-deploy", "Time-to-deploy"),
      value: l("≤ 48h", "≤ 48h"),
      description: l("From notebook/checkpoint to versioned API with CI/CD and basic monitoring.", "De notebook o checkpoint a API versionada con CI/CD y monitoreo básico."),
    },
    {
      label: l("P95 latency", "Latencia P95"),
      value: l("< 200ms", "< 200ms"),
      description: l("Benchmarks plus infra/caching tweaks to meet SLOs.", "Benchmarks + ajustes de infra y caching para cumplir SLO."),
    },
    {
      label: l("Incident response", "Incident Response"),
      value: l("< 30 min MTTR", "< 30 min MTTR"),
      description: l("Playbooks and actionable alerts; channels ready before go-live.", "Playbooks y alertas accionables; canales listos antes del go-live."),
    },
  ],
  testimonials: [
    {
      quote: l(
        "Diego industrialized our prototype in record time. Releases feel routine now and we have full visibility of the model.",
        "Diego industrializó nuestro prototipo en tiempo récord. Ahora los releases se sienten rutinarios y tenemos visibilidad total del modelo.",
      ),
      author: l("Miguel Arriaga", "Miguel Arriaga"),
      role: l("CTO", "CTO"),
      company: l("Qalma", "Qalma"),
      highlight: true,
    },
    {
      quote: l(
        "He rolled out drift monitoring and canaries without interrupting the data team. Now we know when to act before customers notice anything.",
        "Implementó monitoreo de drift y canaries sin interrumpir al equipo de data. Hoy sabemos cuándo actuar antes de que el cliente note algo.",
      ),
      author: l("Karla Jiménez", "Karla Jiménez"),
      role: l("Head of Data", "Head of Data"),
      company: l("Eyenet", "Eyenet"),
    },
  ],
  anecdote: {
    title: l("2am incident, SLO lesson", "Incidente 2am, lección de SLOs"),
    story: l(
      "An inference pipeline looped at 2am due to an unversioned schema. In 18 minutes I rolled back and automated contract validations. Since then, no release ships without canary and contract tests.",
      "Una pipeline de inferencia se cicló a las 2am por un esquema mal versionado. En 18 minutos monté rollback + validaciones de contrato automatizadas. Desde entonces ningún release sale sin canary y test de contratos.",
    ),
    lesson: l("Alerts must be actionable and contracts versioned alongside the model.", "Las alertas deben ser accionables y los contratos versionados junto al modelo."),
  },
  workingStyle: {
    availability: l("2–3 week sprints with weekly demos.", "Sprints de 2–3 semanas con demos semanales."),
    timezone: l("CDMX (GMT-6) · overlap with US & LatAm.", "CDMX (GMT-6) · solapamiento con US & LatAm."),
    communication: l("Async Slack/Notion updates, brief daily during launch phases.", "Asíncrono en Slack/Notion, daily breve cuando estamos en lanzamiento."),
    handoff: l("Notion docs + ready Grafana dashboards + operations checklist.", "Docs en Notion + tableros Grafana listos + checklist de operación."),
    tools: ["Notion", "Linear", "GitHub Projects", "Plausible", "Slack"],
  },
  finalCta: {
    title: l("Let's talk about your ML deployment", "Hablemos de tu despliegue ML"),
    subtitle: l("Free diagnostic to assess reproducibility, monitoring, and release cadence.", "Diagnóstico sin costo para evaluar reproducibilidad, monitoreo y ciclo de releases."),
    primary: {
      label: l("Book diagnostic", "Agendar diagnóstico"),
      href: "https://cal.com/diegovillagran/mlops",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: l("Request references", "Solicitar referencias"),
      href: "mailto:diegovillasal@gmail.com?subject=Referencias%20MLOps",
      type: "ghost",
    },
    note: l("Limited slots per sprint (max 2 parallel projects).", "Slots limitados por sprint (máx. 2 proyectos paralelos)."),
    slots: [
      l("Week of Nov 18: 1 spot", "Semana del 18 nov: 1 cupo"),
      l("Week of Nov 25: 2 spots", "Semana del 25 nov: 2 cupos"),
    ],
  },
};
