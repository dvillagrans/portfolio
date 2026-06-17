export interface ExampleJd {
  label: string;
  text: string;
}

export const CV_EXAMPLE_JDS: Record<"en" | "es", ExampleJd[]> = {
  en: [
    {
      label: "Data Scientist",
      text: `Data Scientist (Junior/Mid) — Mexico City (hybrid)
Requirements: Python, Pandas, scikit-learn, SQL, experimentation, dashboards.
Build predictive models, run A/B analyses, partner with product on metrics.
Nice to have: PySpark, cloud (Azure/AWS), MLOps, communication with stakeholders.`,
    },
    {
      label: "ML Engineer",
      text: `Machine Learning Engineer — Remote LATAM
Ship production ML pipelines (training, evaluation, deployment).
Stack: Python, FastAPI, Docker, PostgreSQL, feature stores, monitoring.
Experience with LLMs/RAG, embeddings, and GPU inference is a plus.`,
    },
    {
      label: "Full-Stack",
      text: `Full-Stack Engineer (Next.js) — Startup
Build customer-facing web apps end-to-end: Next.js, TypeScript, PostgreSQL, Prisma.
Own API design, auth, CI/CD, and observability. SaaS/multi-tenant experience preferred.`,
    },
    {
      label: "Data Engineer",
      text: `Data Engineer — IoT / Environmental data
Design ETL/ELT pipelines at scale (PySpark, Databricks, Azure).
Ingest sensor streams, normalize schemas, serve analytics layers (SQL + BI).
Strong Python, SQL, and data quality practices required.`,
    },
  ],
  es: [
    {
      label: "Data Scientist",
      text: `Data Scientist (Junior/Mid) — CDMX (híbrido)
Requisitos: Python, Pandas, scikit-learn, SQL, experimentación, dashboards.
Construir modelos predictivos, análisis A/B y métricas con producto.
Deseable: PySpark, cloud (Azure/AWS), MLOps.`,
    },
    {
      label: "ML Engineer",
      text: `Machine Learning Engineer — Remoto LATAM
Pipelines ML en producción (entrenamiento, evaluación, despliegue).
Stack: Python, FastAPI, Docker, PostgreSQL, monitoreo.
Plus: LLMs/RAG, embeddings, inferencia en GPU.`,
    },
    {
      label: "Full-Stack",
      text: `Full-Stack (Next.js) — Startup
Apps web end-to-end: Next.js, TypeScript, PostgreSQL, Prisma.
APIs, auth, CI/CD y observabilidad. Experiencia SaaS/multi-tenant deseable.`,
    },
    {
      label: "Data Engineer",
      text: `Data Engineer — IoT / datos ambientales
ETL/ELT a escala (PySpark, Databricks, Azure).
Ingesta de sensores, normalización de esquemas, capas analíticas (SQL + BI).
Python, SQL y calidad de datos sólidos.`,
    },
  ],
};
