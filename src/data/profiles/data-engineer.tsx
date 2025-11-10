import { ProfileData } from "./types";

export const dataEngineerProfile: ProfileData = {
  hero: {
    eyebrow: "Data Pipelines & Modeling",
    title: "Pipelines que no se rompen. Datos modelados para durar.",
    subtitle: "Diseño pipelines que son fáciles de entender, mantener y pasar a otro equipo. Me importa el orden, la trazabilidad y que el sistema envejezca bien.",
    credentials: "dbt · BigQuery / PostgreSQL · Airflow / n8n · Tests + Contratos de datos",
    badge: "Linaje vivo · Tests de datos · Costos bajo control",
    persona: "Me obsesiona que cada dato tenga dueño, pruebas y destino trazable.",
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: "Throughput diario",
        value: "2M filas",
        description: "Procesadas sin fallos en pipelines productivos",
      },
      {
        label: "Cobertura de tests",
        value: "92%",
        description: "dbt + contratos de esquema con CI",
      },
      {
        label: "Costo por TB",
        value: "-28%",
        description: "Optimización de partición y cacheo",
      },
    ],
    ctas: [
      {
        label: "Ver casos",
        href: "#casos",
        type: "primary",
      },
      {
        label: "Revisar tu pipeline",
        href: "https://cal.com/diegovillagran/data",
        type: "secondary",
        target: "_blank",
        description: "Sesión de auditoría de linaje y contratos",
      },
    ],
  },
  problems: [
    {
      title: "Pipelines frágiles",
      description: "Automatizo orquestación con control de versiones y alertas específicas por dataset.",
      metric: "Fallos críticos -80%",
    },
    {
      title: "Contratos invisibles",
      description: "Implemento pruebas de datos, contratos y versionado de esquemas en CI.",
      metric: "Coverage 90%+ columnas críticas",
    },
    {
      title: "Costo sin visibilidad",
      description: "Particiono, materializo y monitoreo costos por modelo e informe.",
      metric: "-28% costo BigQuery mensual",
    },
    {
      title: "Linaje desactualizado",
      description: "Genero linaje vivo con documentación dbt y dashboards interactivos.",
      metric: "Actualización en tiempo real",
    },
  ],
  metrics: [
    {
      label: "Pipelines en producción",
      value: "14",
      description: "Batch, streaming y near real-time",
    },
    {
      label: "SLAs cumplidos",
      value: "98%",
      description: "Entrega de datasets listos antes de 7am",
    },
    {
      label: "Modelos gobernados",
      value: "26",
      description: "Con owners y documentación al día",
    },
  ],
  process: [
    {
      icon: "pipeline",
      title: "Descubrir & Documentar",
      description: "Inventario de fuentes, owners y SLAs actuales.",
      detail: "Data contracts, definición de KPIs y riesgos de calidad.",
    },
    {
      icon: "quality",
      title: "Modelar & Orquestar",
      description: "Diseño modelos robustos con tests, partición y monitoreo.",
      detail: "dbt, Airflow/Prefect, linaje automatizado y data quality checks.",
    },
    {
      icon: "insights",
      title: "Servir & Iterar",
      description: "Datasets listos para BI/ML con gobernanza y costos optimizados.",
      detail: "Catálogo de métricas, reportes de uso y roadmap trimestral.",
    },
  ],
  caseStudies: [
    {
      title: "Plataforma EEG en Supabase",
      category: "Real-time data + batch analytics",
      timeframe: "2025",
      summary: "Pipeline híbrido que ingiere señales EEG y entrega datasets modelados para IA y BI.",
      context: "La startup procesaba datos en notebooks manuales. Sin versionado ni histórico confiable.",
      action: "Construí servicios FastAPI + workers, normalicé flujos en PostgreSQL/Supabase y diseñé modelos estrella con dbt.",
      result: "Latencia <100ms, datasets diarios listos a las 6am y dashboards con métricas de bienestar en vivo.",
      metric: "Disponibilidad 99.9% · 0 filas huérfanas",
      tags: ["FastAPI", "Supabase", "dbt", "Prefect", "PostgreSQL"],
      proof: [
        {
          label: "Repositorio completo",
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
      title: "Sistema nacional de calidad del aire",
      category: "Datos geoespaciales + alertas",
      timeframe: "2024",
      summary: "Pipeline que integra 2M lecturas IoT diarias con modelos de alerta y dashboards listos para política pública.",
      context: "Lecturas en CSV dispersos, sin schema ni trazabilidad; reportes manuales demorados.",
      action: "Orquesté ingestas con Databricks + PySpark, normalicé en warehouse PostgreSQL y modelé KPIs con Power BI.",
      result: "Reportes automáticos cada 30 min, alertas de PM2.5 en <5 min y trazabilidad completa del linaje.",
      metric: "Cobertura de sensores 100%",
      tags: ["Databricks", "PySpark", "PostgreSQL", "Power BI", "Azure"],
      proof: [
        {
          label: "Notebook ETL",
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
      title: "Contratos y linaje vivos",
      category: "Data governance",
      timeframe: "2025",
      summary: "Data contracts, pruebas y linaje interactivo para un lago de datos con 30+ modelos.",
      context: "Los analistas rompían dashboards por cambios de esquema sin avisar.",
      action: "Introduje tests Great Expectations, contratos en CI y catálogo automático con dbt docs + Metabase.",
      result: "Fallas por esquema -85%, releases documentados y auditoría aprobada sin findings.",
      metric: "Tiempo de resolución 12 min",
      tags: ["Great Expectations", "dbt", "Metabase", "GitHub Actions"],
      proof: [
        {
          label: "Plantilla de contrato",
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
      title: "EyeNet: Automatización de reportes operativos",
      category: "Orquestación & Automatización",
      timeframe: "2024-2025",
      summary: "Pipeline end-to-end para automatizar reportes internos que antes se generaban manualmente con alto riesgo de error.",
      context: "EyeNet necesitaba automatizar sus procesos de reportería operativa. Los informes llegaban en distintos formatos y tiempos. El procesamiento manual implicaba riesgo de errores y era difícil replicar o modificar.",
      action: "Diseñé y orquesté pipelines de extracción → limpieza → estructuración → generación automatizada de reportes, usando n8n, validaciones, logs y control de flujo claro. Implementé controles de calidad en cada etapa y documentación viva del proceso.",
      result: "Automatización completa de reportes operativos recurrentes con mantenibilidad alta: cualquier persona puede revisar o modificar pasos. Errores reducidos al eliminar manipulación manual. Tiempo de entrega estable sin depender de una sola persona.",
      metric: "Tiempo de procesamiento: ~2hrs → 15min automatizado · Errores manuales eliminados",
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
      title: "Orquestación & Calidad",
      items: ["Airflow", "Prefect", "n8n", "dbt", "Great Expectations"],
    },
    {
      title: "Modelado & Almacenamiento",
      items: ["BigQuery", "Snowflake", "PostgreSQL", "DuckDB"],
    },
    {
      title: "Ingesta & Streaming",
      items: ["Kafka", "Pub/Sub", "Cloud Functions", "Fivetran"],
    },
    {
      title: "BI & Documentación",
      items: ["Looker Studio", "Power BI", "Metabase", "Notion"],
    },
  ],
  guarantees: [
    {
      label: "Linaje actualizado",
      value: "100%",
      description: "Cada modelo/documento ligado a owner y documentación viva.",
    },
    {
      label: "SLA de datasets",
      value: "98%",
      description: "Entrega puntual con alertas previas a la ventana crítica.",
    },
    {
      label: "Costo por TB",
      value: "-20%",
      description: "Materializaciones inteligentes + tuning de consultas.",
    },
  ],
  testimonials: [
    {
      quote: "Diego nos dio la seguridad de que cada dashboard parte del mismo 'dato fuente'. Las auditorías dejaron de ser una pesadilla.",
      author: "María López",
      role: "Lead Analytics",
      company: "GovTech Latam",
      highlight: true,
    },
    {
      quote: "Logró alinear a data, BI y producto con un linaje que se entiende en segundos. Los incidentes por data contracts se desplomaron.",
      author: "Pablo Ramírez",
      role: "Head of Data",
      company: "Qalma",
    },
  ],
  anecdote: {
    title: "El día que un CSV rompió Finanzas",
    story: "Una columna extra provocó números inconsistentes en finanzas. Nació el primer contrato de datos, y de ahí el sistema que hoy valida cada dataset antes de su publicación.",
    lesson: "Cada pipeline merece pruebas y owners explícitos. No se negocia.",
  },
  workingStyle: {
    availability: "Kickoff + cadencia semanal. Entregables diarios en Slack/Notion.",
    timezone: "CDMX (GMT-6) con solapamiento a US/EU.",
    communication: "Actualizaciones asíncronas, canal de incidentes dedicado cuando hay release.",
    handoff: "Tableros dbt docs, contratos, dashboards y backlog priorizado.",
    tools: ["dbt Cloud", "Notion", "Linear", "Metabase", "Slack"],
  },
  finalCta: {
    title: "Llevemos tus datos a producción sin sobresaltos",
    subtitle: "Auditoría rápida para mapear riesgos de calidad, linaje y costos.",
    primary: {
      label: "Agendar auditoría",
      href: "https://cal.com/diegovillagran/data",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: "Solicitar checklist de datos",
      href: "mailto:diegovillasal@gmail.com?subject=Checklist%20Data%20Pipelines",
      type: "ghost",
    },
    note: "Trabajo por bloques de 4 semanas con entregables semanales.",
    slots: ["Semana del 18 nov: 1 cupo", "Semana del 2 dic: 2 cupos"],
  },
};
