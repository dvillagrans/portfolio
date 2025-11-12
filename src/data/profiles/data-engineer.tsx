import { ProfileData, type LocalizedText } from "./types";

const l = (en: string, es: string): LocalizedText => ({ en, es });

export const dataEngineerProfile: ProfileData = {
  hero: {
    eyebrow: l("Data Pipelines & Modeling", "Pipelines de Datos y Modelado"),
    title: l("Pipelines that don't break. Data modeled to last.", "Pipelines que no se rompen. Datos modelados para durar."),
    subtitle: l(
      "I design pipelines that are easy to understand, maintain, and hand off. I care about order, traceability, and building systems that age well.",
      "Diseño pipelines que son fáciles de entender, mantener y pasar a otro equipo. Me importa el orden, la trazabilidad y que el sistema envejezca bien.",
    ),
    credentials: l(
      "dbt · BigQuery / PostgreSQL · Airflow / n8n · Tests + Data Contracts",
      "dbt · BigQuery / PostgreSQL · Airflow / n8n · Tests + Contratos de datos",
    ),
    badge: l("Living lineage · Data tests · Costs under control", "Linaje vivo · Tests de datos · Costos bajo control"),
    persona: l(
      "I obsess over making every datapoint owned, tested, and traceable.",
      "Me obsesiona que cada dato tenga dueño, pruebas y destino trazable.",
    ),
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: l("Daily throughput", "Throughput diario"),
        value: l("2M rows", "2M filas"),
        description: l("Processed without failures in production pipelines", "Procesadas sin fallos en pipelines productivos"),
      },
      {
        label: l("Test coverage", "Cobertura de tests"),
        value: l("92%", "92%"),
        description: l("dbt + schema contracts backed by CI", "dbt + contratos de esquema con CI"),
      },
      {
        label: l("Cost per TB", "Costo por TB"),
        value: l("-28%", "-28%"),
        description: l("Partition and caching optimization", "Optimización de partición y cacheo"),
      },
    ],
    ctas: [
      {
        label: l("View cases", "Ver casos"),
        href: "#casos",
        type: "primary",
      },
      {
        label: l("Review your pipeline", "Revisar tu pipeline"),
        href: "https://cal.com/diegovillagran/data",
        type: "secondary",
        target: "_blank",
        description: l("Lineage & data-contract audit session", "Sesión de auditoría de linaje y contratos"),
      },
    ],
  },
  problems: [
    {
      title: l("Pipelines break and nobody knows why", "Los pipelines se rompen y nadie sabe por qué"),
      description: l(
        "Orchestration with clear alerts before failure, structured logs, and explicit ownership.",
        "Orquestación con alertas claras antes del fallo, logs estructurados y ownership explícito.",
      ),
      metric: l("Critical failures -80% · Resolution time <15min", "Fallos críticos -80% · Tiempo de resolución <15min"),
    },
    {
      title: l("Schema changes kill dashboards without notice", "Cambios de esquema rompen dashboards sin avisar"),
      description: l(
        "Automated tests, CI-backed data contracts, and a living catalog so nothing stays implicit.",
        "Tests automáticos, contratos de datos en CI y catálogo vivo para que nada quede implícito.",
      ),
      metric: l("Schema incidents -85% · 100% critical columns under contract", "Incidentes por esquema -85% · 100% columnas críticas bajo contrato"),
    },
    {
      title: l("Costs grow and nobody knows where", "El costo crece pero nadie sabe dónde"),
      description: l(
        "Smart partitioning, usage-based materializations, and a cost dashboard per model/team.",
        "Particionado inteligente, materializaciones por uso y dashboard de costos por modelo/equipo.",
      ),
      metric: l("-28% monthly BigQuery spend · Visible costs per dataset", "-28% BigQuery mensual · Costos visibles por dataset"),
    },
  ],
  metrics: [
    {
      label: l("Pipelines in production", "Pipelines en producción"),
      value: l("14", "14"),
      description: l("Batch, streaming, and near real-time", "Batch, streaming y near real-time"),
    },
    {
      label: l("SLAs met", "SLAs cumplidos"),
      value: l("98%", "98%"),
      description: l("Deliveries ready before 7am", "Entrega de datasets listos antes de 7am"),
    },
    {
      label: l("Governed models", "Modelos gobernados"),
      value: l("26", "26"),
      description: l("With owners and up-to-date documentation", "Con owners y documentación al día"),
    },
  ],
  process: [
    {
      icon: "pipeline",
      title: l("Understand the terrain", "Entender el terreno"),
      description: l("What sources exist, who uses them, what hurts, and why.", "Qué fuentes existen, quién las usa, qué duele y por qué."),
      detail: l("Data contracts, KPI definitions, and quality risks.", "Data contracts, definición de KPIs y riesgos de calidad."),
    },
    {
      icon: "quality",
      title: l("Design so anyone can maintain it", "Diseñar para que otro lo pueda mantener"),
      description: l("Tests, contracts, and living lineage. Clarity is cheaper.", "Tests, contratos y linaje vivo. La claridad sale más barata."),
      detail: l("dbt, Airflow/Prefect, automated lineage, and data quality checks.", "dbt, Airflow/Prefect, linaje automatizado y data quality checks."),
    },
    {
      icon: "insights",
      title: l("Ship to production without drama", "Ponerlo en producción sin drama"),
      description: l("Alerts before failure, transparent costs, dashboards you can vouch for.", "Alertas antes del fallo, costos claros y tableros que se pueden contar."),
      detail: l("Metrics catalog, usage reports, and a quarterly roadmap.", "Catálogo de métricas, reportes de uso y roadmap trimestral."),
    },
  ],
  caseStudies: [
    {
      title: l("EEG platform on Supabase", "Plataforma EEG en Supabase"),
      category: l("Real-time data + batch analytics", "Real-time data + batch analytics"),
      timeframe: l("2025", "2025"),
      summary: l(
        "Hybrid pipeline ingesting EEG signals and delivering modeled datasets for AI and BI.",
        "Pipeline híbrido que ingiere señales EEG y entrega datasets modelados para IA y BI.",
      ),
      context: l(
        "The startup processed data manually in notebooks—no versioning or reliable history.",
        "La startup procesaba datos en notebooks manuales. Sin versionado ni histórico confiable.",
      ),
      action: l(
        "Built FastAPI services and workers, normalized flows in PostgreSQL/Supabase, and designed star models with dbt.",
        "Construí servicios FastAPI + workers, normalicé flujos en PostgreSQL/Supabase y diseñé modelos estrella con dbt.",
      ),
      result: l(
        "<100ms latency, daily datasets ready by 6am, and live wellness dashboards.",
        "Latencia <100ms, datasets diarios listos a las 6am y dashboards con métricas de bienestar en vivo.",
      ),
      metric: l("99.9% availability · 0 orphan rows", "Disponibilidad 99.9% · 0 filas huérfanas"),
      tags: ["FastAPI", "Supabase", "dbt", "Prefect", "PostgreSQL"],
      proof: [
        {
          label: l("Full repository", "Repositorio completo"),
          href: "https://github.com/dvillagrans/qalma",
          type: "secondary",
          icon: "github",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/qalma.webp",
        alt: "Arquitectura pipeline EEG",
      },
      highlight: true,
    },
    {
      title: l("National air-quality system", "Sistema nacional de calidad del aire"),
      category: l("Geospatial data + alerts", "Datos geoespaciales + alertas"),
      timeframe: l("2024", "2024"),
      summary: l(
        "Pipeline integrating 2M daily IoT readings with alert models and dashboards ready for public policy.",
        "Pipeline que integra 2M lecturas IoT diarias con modelos de alerta y dashboards listos para política pública.",
      ),
      context: l(
        "Readings lived in scattered CSVs with no schema or lineage; manual reports were delayed.",
        "Lecturas en CSV dispersos, sin schema ni trazabilidad; reportes manuales demorados.",
      ),
      action: l(
        "Orchestrated ingestion with Databricks + PySpark, normalized into a PostgreSQL warehouse, modeled KPIs with Power BI.",
        "Orquesté ingestas con Databricks + PySpark, normalicé en warehouse PostgreSQL y modelé KPIs con Power BI.",
      ),
      result: l(
        "Automated reports every 30 minutes, PM2.5 alerts in under 5 minutes, full lineage visibility.",
        "Reportes automáticos cada 30 min, alertas de PM2.5 en <5 min y trazabilidad completa del linaje.",
      ),
      metric: l("100% sensor coverage", "Cobertura de sensores 100%"),
      tags: ["Databricks", "PySpark", "PostgreSQL", "Power BI", "Azure"],
      proof: [
        {
          label: l("ETL notebook", "Notebook ETL"),
          href: "https://github.com/dvillagrans/india-air-quality-etl",
          type: "ghost",
          icon: "github",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/etl.webp",
        alt: "Pipeline calidad del aire",
      },
      highlight: true,
    },
    {
      title: l("Living contracts & lineage", "Contratos y linaje vivos"),
      category: l("Data governance", "Data governance"),
      timeframe: l("2025", "2025"),
      summary: l(
        "Data contracts, tests, and interactive lineage for a lake with 30+ models.",
        "Data contracts, pruebas y linaje interactivo para un lago de datos con 30+ modelos.",
      ),
      context: l(
        "Analysts broke dashboards with unannounced schema changes.",
        "Los analistas rompían dashboards por cambios de esquema sin avisar.",
      ),
      action: l(
        "Introduced Great Expectations tests, CI contracts, and auto-generated catalog with dbt docs + Metabase.",
        "Introduje tests Great Expectations, contratos en CI y catálogo automático con dbt docs + Metabase.",
      ),
      result: l(
        "Schema failures -85%, documented releases, audit passed with zero findings.",
        "Fallas por esquema -85%, releases documentados y auditoría aprobada sin findings.",
      ),
      metric: l("12 min resolution time", "Tiempo de resolución 12 min"),
      tags: ["Great Expectations", "dbt", "Metabase", "GitHub Actions"],
      proof: [
        {
          label: l("Contract template", "Plantilla de contrato"),
          href: "https://dvillagrans.notion.site/data-contract-template",
          type: "soft",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/dash-population.webp",
        alt: "Linaje y contratos",
      },
      quickRead: true,
    },
    {
      title: l("EyeNet: Automated operational reports", "EyeNet: Automatización de reportes operativos"),
      category: l("Orchestration & Automation", "Orquestación & Automatización"),
      timeframe: l("2024-2025", "2024-2025"),
      summary: l(
        "End-to-end pipeline automating reports that were previously manual and error-prone.",
        "Pipeline end-to-end para automatizar reportes internos que antes se generaban manualmente con alto riesgo de error.",
      ),
      context: l(
        "EyeNet needed to automate operational reporting. Inputs arrived in different formats and times; manual processing was error-prone and hard to replicate.",
        "EyeNet necesitaba automatizar sus procesos de reportería operativa. Los informes llegaban en distintos formatos y tiempos. El procesamiento manual implicaba riesgo de errores y era difícil replicar o modificar.",
      ),
      action: l(
        "Designed pipelines for extraction → cleaning → structuring → automated report generation using n8n, validations, logging, and clear flow control. Added quality gates at every stage with living documentation.",
        "Diseñé y orquesté pipelines de extracción → limpieza → estructuración → generación automatizada de reportes, usando n8n, validaciones, logs y control de flujo claro. Implementé controles de calidad en cada etapa y documentación viva del proceso.",
      ),
      result: l(
        "Full automation with high maintainability—anyone can review or adjust steps. Manual errors eliminated and delivery time stabilized without relying on a single person.",
        "Automatización completa de reportes operativos recurrentes con mantenibilidad alta: cualquier persona puede revisar o modificar pasos. Errores reducidos al eliminar manipulación manual. Tiempo de entrega estable sin depender de una sola persona.",
      ),
      metric: l("Processing time: ~2hrs → 15min automated · Manual errors eliminated", "Tiempo de procesamiento: ~2hrs → 15min automatizado · Errores manuales eliminados"),
      tags: ["n8n", "PostgreSQL", "Validación de datos", "Logs estructurados", "Documentación"],
      proof: [],
      media: {
        type: "image",
        src: "/img/dash-population.webp",
        alt: "Pipeline automatizado EyeNet",
      },
      quickRead: false,
    },
  ],
  toolbox: [
    {
      title: l("Orchestration & Quality", "Orquestación & Calidad"),
      items: ["Airflow", "Prefect", "n8n", "dbt", "Great Expectations"],
    },
    {
      title: l("Modeling & Storage", "Modelado & Almacenamiento"),
      items: ["BigQuery", "Snowflake", "PostgreSQL", "DuckDB"],
    },
    {
      title: l("Ingestion & Streaming", "Ingesta & Streaming"),
      items: ["Kafka", "Pub/Sub", "Cloud Functions", "Fivetran"],
    },
    {
      title: l("BI & Documentation", "BI & Documentación"),
      items: ["Looker Studio", "Power BI", "Metabase", "Notion"],
    },
  ],
  coreTools: ["dbt", "Airflow", "n8n", "BigQuery", "PostgreSQL", "Great Expectations"],
  guarantees: [
    {
      label: l("Lineage up to date", "Linaje actualizado"),
      value: l("100%", "100%"),
      description: l("Every model/document tied to an owner and living documentation.", "Cada modelo/documento ligado a owner y documentación viva."),
    },
    {
      label: l("Dataset SLA", "SLA de datasets"),
      value: l("98%", "98%"),
      description: l("On-time delivery with alerts before critical windows.", "Entrega puntual con alertas previas a la ventana crítica."),
    },
    {
      label: l("Cost per TB", "Costo por TB"),
      value: l("-20%", "-20%"),
      description: l("Smart materializations plus query tuning.", "Materializaciones inteligentes + tuning de consultas."),
    },
  ],
  testimonials: [
    {
      quote: l(
        "Diego gave us confidence that every dashboard starts from the same source of truth. Audits stopped being a nightmare.",
        "Diego nos dio la seguridad de que cada dashboard parte del mismo 'dato fuente'. Las auditorías dejaron de ser una pesadilla.",
      ),
      author: l("María López", "María López"),
      role: l("Lead Analytics", "Lead Analytics"),
      company: l("GovTech Latam", "GovTech Latam"),
      highlight: true,
    },
    {
      quote: l(
        "He aligned data, BI, and product with lineage you understand in seconds. Incidents tied to data contracts collapsed.",
        "Logró alinear a data, BI y producto con un linaje que se entiende en segundos. Los incidentes por data contracts se desplomaron.",
      ),
      author: l("Pablo Ramírez", "Pablo Ramírez"),
      role: l("Head of Data", "Head of Data"),
      company: l("Qalma", "Qalma"),
    },
  ],
  anecdote: {
    title: l("The day a CSV broke Finance", "El día que un CSV rompió Finanzas"),
    story: l(
      "One extra column generated inconsistent financial numbers. That sparked the first data contract, which evolved into the system that now validates every dataset before publishing.",
      "Una columna extra provocó números inconsistentes en finanzas. Nació el primer contrato de datos, y de ahí el sistema que hoy valida cada dataset antes de su publicación.",
    ),
    lesson: l("Every pipeline deserves tests and explicit owners. Non-negotiable.", "Cada pipeline merece pruebas y owners explícitos. No se negocia."),
  },
  workingStyle: {
    availability: l("Kickoff + weekly cadence. Daily deliverables in Slack/Notion.", "Kickoff + cadencia semanal. Entregables diarios en Slack/Notion."),
    timezone: l("CDMX (GMT-6) with overlap to US/EU.", "CDMX (GMT-6) con solapamiento a US/EU."),
    communication: l("Async updates, dedicated incident channel during releases.", "Actualizaciones asíncronas, canal de incidentes dedicado cuando hay release."),
    handoff: l("dbt docs boards, contracts, dashboards, and prioritized backlog.", "Tableros dbt docs, contratos, dashboards y backlog priorizado."),
    tools: ["dbt Cloud", "Notion", "Linear", "Metabase", "Slack"],
  },
  finalCta: {
    title: l("Let's get your data to production without surprises", "Llevemos tus datos a producción sin sobresaltos"),
    subtitle: l("Quick audit to map quality, lineage, and cost risks.", "Auditoría rápida para mapear riesgos de calidad, linaje y costos."),
    primary: {
      label: l("Schedule audit", "Agendar auditoría"),
      href: "https://cal.com/diegovillagran/data",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: l("Request data checklist", "Solicitar checklist de datos"),
      href: "mailto:diegovillasal@gmail.com?subject=Checklist%20Data%20Pipelines",
      type: "ghost",
    },
    note: l("I work in 4-week blocks with weekly deliverables.", "Trabajo por bloques de 4 semanas con entregables semanales."),
    slots: [
      l("Week of Nov 18: 1 spot", "Semana del 18 nov: 1 cupo"),
      l("Week of Dec 2: 2 spots", "Semana del 2 dic: 2 cupos"),
    ],
  },
};
