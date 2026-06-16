import type { EditorialCaseStudyDict } from "../types";

const DASHBOARD_URL =
  "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/";
const REPO_URL = "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard";

export const nycEn = {
  back: "Back to projects",
  eyebrow: "Analytics product · Mobility",
  title: "NYC Ride-Hailing Analytics",
  subtitle:
    "Operational dashboards and ML models for Uber/Lyft trip patterns, fare dynamics, and airport demand in New York City.",
  metrics: [
    { value: "R² .85", label: "Fare prediction" },
    { value: "92%", label: "Airport classification" },
    { value: "2", label: "Platforms (Uber/Lyft)" },
    { value: "Live", label: "Streamlit dashboard" },
  ],
  tldr: {
    challenge: {
      title: "The Challenge",
      text1: "Stakeholders needed ",
      bold: "explainable insights",
      text2:
        " across trip patterns, airport pricing, and demand peaks — not black-box scores buried in notebooks.",
    },
    solution: {
      title: "The Solution",
      text1: "A ",
      bold: "Streamlit analytics platform",
      text2: " with geospatial dashboards, fare regression, and ",
      cyan: "airport trip classification",
      text3: " models deployed as a live dashboard.",
    },
    impact: {
      title: "The Impact",
      bold: "Fare prediction R² > 0.85",
      text1:
        " and 92% airport classification accuracy — packaged for non-technical stakeholders with interactive exploration.",
    },
  },
  meta: [
    { label: "Role", value: "Data science · ML · Viz" },
    { label: "Timeline", value: "2025" },
    { label: "Stack", value: "Streamlit, Python, Scikit-learn" },
    { label: "Deliverables", value: "Live dashboard, repo" },
  ],
  links: { dashboard: "Live dashboard", repo: "Repository", report: "Report" },
  linkDashboard: DASHBOARD_URL,
  linkRepo: REPO_URL,
  quote: {
    text: "A model is only useful when a ",
    bold: "manager can explore the why",
    text2: " behind the prediction — not just the number.",
    title: "Design principle",
  },
  constraints: {
    title1: "Constraints",
    title2: "What shaped the product.",
    desc: "Data volume, explainability, and deployment limits defined scope.",
    c1: {
      title: "Massive trip tables",
      text1: "NYC TLC datasets are ",
      bold1: "large and messy",
      text2: "; aggregations and caching were required before any chart could feel responsive.",
    },
    c2: {
      title: "Explainability first",
      text1: "Stakeholders rejected opaque scores. Every model needed ",
      bold1: "interpretable features",
      text2: " and views tied to operational questions (airport, hour, borough).",
    },
    c3: {
      title: "Geospatial complexity",
      text1: "Maps and zone joins added ",
      bold1: "engineering overhead",
      text2: " compared to tabular-only dashboards — but were essential for adoption.",
    },
    c4: {
      title: "Streamlit deployment",
      text1: "Chose Streamlit Cloud for ",
      bold1: "fast iteration",
      text2: " over a custom React frontend — trading polish for time-to-insight.",
    },
    c5: {
      title: "Public data only",
      text1: "No proprietary ride feeds — all insights from ",
      bold1: "open TLC releases",
      text2: ", with documented lag and reporting limitations.",
    },
  },
  pipeline: {
    title1: "Product",
    title2: "Dashboard stakeholders actually open.",
    desc: "Interactive views for fare trends, airport classification, and geospatial demand — backed by scikit-learn models and Plotly maps. Deployed on Streamlit with a public URL for demos and portfolio evidence.",
  },
  architecture: {
    title1: "Key decisions",
    title2: "Models behind the charts.",
    d1: {
      nav: "Fare regression",
      title: "Gradient boosting for fares",
      desc: "Fare prediction used ",
      bold: "ensemble regression with engineered time and location features",
      desc2: " — prioritizing R² and residual analysis over model complexity.",
      costTitle: "Trade-off",
      costDesc: "More features improved accuracy but required careful leakage checks on temporal splits.",
    },
    d2: {
      nav: "Classification",
      title: "Airport trip detector",
      desc: "A separate classifier labels ",
      bold: "airport-bound trips",
      desc2: " to power pricing and demand widgets — validated at 92% accuracy on holdout data.",
      costTitle: "Trade-off",
      costDesc: "Class imbalance required weighted metrics and manual error review on edge zones.",
    },
    d3: {
      nav: "Geospatial",
      title: "Plotly over static maps",
      desc: "Interactive maps let users ",
      bold: "drill from city view to zones",
      desc2: " without exporting shapefiles — critical for stakeholder demos.",
      costTitle: "Trade-off",
      costDesc: "Heavier payloads on first load; mitigated with aggregated layers.",
    },
    d4: {
      nav: "Delivery",
      title: "Streamlit as product shell",
      desc: "Streamlit wrapped models and charts into ",
      bold: "one deployable artifact",
      desc2: " — ideal for analytics MVPs with minimal frontend work.",
      costTitle: "Trade-off",
      costDesc: "Limited branding and layout control vs. a custom Next.js app.",
    },
  },
  lessons: {
    title1: "Lessons learned",
    title2: "What I'd do differently.",
    desc: "Shipping analytics products surfaced process gaps early.",
    l1: {
      title: "Feature leakage in time splits",
      desc: "Early models leaked future information through poorly scoped rolling windows. Rebuilt splits with strict temporal cutoffs.",
      tag: "Validation",
    },
    l2: {
      title: "Dashboard performance",
      desc: "Full-table loads stalled Streamlit on cold start. Moved to pre-aggregated Parquet layers for common views.",
      tag: "Performance",
    },
    l3: {
      title: "Story before charts",
      desc: "First version was chart-heavy with no narrative path. Reordered pages to match stakeholder questions (where → when → how much).",
      tag: "UX",
    },
  },
  footer: {
    cta: "Need explainable analytics for operations?",
    contact: "Get in touch",
    note: "Open TLC data · public Streamlit deployment",
  },
} satisfies EditorialCaseStudyDict;

export const nycEs = {
  back: "Volver a proyectos",
  eyebrow: "Producto analítico · Movilidad",
  title: "Analytics NYC Ride-Hailing",
  subtitle:
    "Dashboards operativos y modelos ML para patrones de viaje Uber/Lyft, dinámica de tarifas y demanda en aeropuertos de NYC.",
  metrics: [
    { value: "R² .85", label: "Predicción tarifa" },
    { value: "92%", label: "Clasificación aeropuerto" },
    { value: "2", label: "Plataformas Uber/Lyft" },
    { value: "Live", label: "Dashboard Streamlit" },
  ],
  tldr: {
    challenge: {
      title: "El reto",
      text1: "Los stakeholders necesitaban ",
      bold: "insights explicables",
      text2:
        " sobre patrones de viaje, precios de aeropuerto y picos de demanda — no scores opacos en notebooks.",
    },
    solution: {
      title: "La solución",
      text1: "Una ",
      bold: "plataforma Streamlit",
      text2: " con dashboards geoespaciales, regresión de tarifas y ",
      cyan: "clasificación de viajes a aeropuerto",
      text3: " desplegada como dashboard en vivo.",
    },
    impact: {
      title: "El impacto",
      bold: "Predicción de tarifas R² > 0.85",
      text1:
        " y 92% de precisión en clasificación de aeropuertos — empaquetado para stakeholders no técnicos.",
    },
  },
  meta: [
    { label: "Rol", value: "Data science · ML · Viz" },
    { label: "Timeline", value: "2025" },
    { label: "Stack", value: "Streamlit, Python, Scikit-learn" },
    { label: "Entregables", value: "Dashboard live, repo" },
  ],
  links: { dashboard: "Dashboard en vivo", repo: "Repositorio", report: "Reporte" },
  linkDashboard: DASHBOARD_URL,
  linkRepo: REPO_URL,
  quote: {
    text: "Un modelo solo sirve cuando un ",
    bold: "gerente puede explorar el porqué",
    text2: " detrás de la predicción — no solo el número.",
    title: "Principio de diseño",
  },
  constraints: {
    title1: "Restricciones",
    title2: "Lo que moldeó el producto.",
    desc: "Volumen de datos, explicabilidad y límites de despliegue definieron el alcance.",
    c1: {
      title: "Tablas masivas de viajes",
      text1: "Los datasets TLC de NYC son ",
      bold1: "grandes y ruidosos",
      text2: "; hicieron falta agregaciones y caché antes de que los gráficos fueran fluidos.",
    },
    c2: {
      title: "Explicabilidad primero",
      text1: "Se rechazaron scores opacos. Cada modelo necesitaba ",
      bold1: "features interpretables",
      text2: " y vistas ligadas a preguntas operativas (aeropuerto, hora, borough).",
    },
    c3: {
      title: "Complejidad geoespacial",
      text1: "Mapas y joins zonales añadieron ",
      bold1: "overhead de ingeniería",
      text2: " frente a dashboards tabulares — pero fueron clave para adopción.",
    },
    c4: {
      title: "Despliegue Streamlit",
      text1: "Streamlit Cloud para ",
      bold1: "iteración rápida",
      text2: " en lugar de frontend React custom — menos pulido, más tiempo-a-insight.",
    },
    c5: {
      title: "Solo datos públicos",
      text1: "Sin feeds propietarios — todo desde ",
      bold1: "releases abiertos del TLC",
      text2: ", con lag y limitaciones de reporte documentadas.",
    },
  },
  pipeline: {
    title1: "Producto",
    title2: "Dashboard que sí abren los stakeholders.",
    desc: "Vistas interactivas de tarifas, clasificación de aeropuertos y demanda geoespacial — con modelos scikit-learn y mapas Plotly. Desplegado en Streamlit con URL pública.",
  },
  architecture: {
    title1: "Decisiones clave",
    title2: "Modelos detrás de los gráficos.",
    d1: {
      nav: "Regresión tarifas",
      title: "Gradient boosting para tarifas",
      desc: "La predicción usó ",
      bold: "regresión ensemble con features de tiempo y ubicación",
      desc2: " — priorizando R² y análisis de residuos sobre complejidad.",
      costTitle: "Trade-off",
      costDesc: "Más features mejoraron accuracy pero exigieron controles estrictos de leakage temporal.",
    },
    d2: {
      nav: "Clasificación",
      title: "Detector de viajes a aeropuerto",
      desc: "Un clasificador etiqueta ",
      bold: "viajes con destino aeropuerto",
      desc2: " para widgets de precio y demanda — 92% en holdout.",
      costTitle: "Trade-off",
      costDesc: "Desbalance de clases requirió métricas ponderadas y revisión manual en zonas límite.",
    },
    d3: {
      nav: "Geoespacial",
      title: "Plotly sobre mapas estáticos",
      desc: "Mapas interactivos permiten ",
      bold: "pasar de vista ciudad a zonas",
      desc2: " sin exportar shapefiles — clave en demos.",
      costTitle: "Trade-off",
      costDesc: "Payloads más pesados al inicio; mitigado con capas agregadas.",
    },
    d4: {
      nav: "Entrega",
      title: "Streamlit como shell de producto",
      desc: "Streamlit envolvió modelos y charts en ",
      bold: "un artefacto desplegable",
      desc2: " — ideal para MVPs analíticos con poco frontend.",
      costTitle: "Trade-off",
      costDesc: "Menos control de branding y layout que una app Next.js.",
    },
  },
  lessons: {
    title1: "Lecciones aprendidas",
    title2: "Qué haría distinto.",
    desc: "Productos analíticos expusieron huecos de proceso temprano.",
    l1: {
      title: "Leakage en splits temporales",
      desc: "Modelos tempranos filtraban información futura con ventanas mal definidas. Reconstruí splits con cortes temporales estrictos.",
      tag: "Validación",
    },
    l2: {
      title: "Rendimiento del dashboard",
      desc: "Cargas de tabla completa congelaban Streamlit. Pasé a capas Parquet pre-agregadas.",
      tag: "Rendimiento",
    },
    l3: {
      title: "Historia antes que charts",
      desc: "La primera versión era solo gráficos. Reordené páginas según preguntas del stakeholder (dónde → cuándo → cuánto).",
      tag: "UX",
    },
  },
  footer: {
    cta: "¿Necesitas analítica explicable para operaciones?",
    contact: "Escríbeme",
    note: "Datos TLC abiertos · Streamlit público",
  },
} satisfies EditorialCaseStudyDict;
