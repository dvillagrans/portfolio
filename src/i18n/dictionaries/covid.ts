import type { CovidDict } from "../types";

export const covidEn = {
  back: "Back to Archive",
  subtitle: "Risk profiling from open COVID-19 data using K-Means and Fuzzy C-Means. Advanced Data Analytics, ESCOM-IPN.",
  tldr: {
    challenge: { title: "The Challenge", text1: "The problem was not just \"analyzing COVID data\"; it was ", bold: "reducing uncertainty in triage", text2: " and resource prioritization when ICU beds, ventilators, and capacity are scarce. Stakeholders: public health, academic evaluation, and—in perspective—clinical teams needing interpretable risk profiles." },
    solution: { title: "The Solution", text1: "We combined ", bold: "K-Means and Fuzzy C-Means", text2: " on stratified samples from 30M+ SSA records: clear assignment for triage plus ", cyan: "partial memberships for borderline cases", text3: ". Pipeline from raw data to LaTeX report and Next.js portfolio." },
    impact: { title: "The Impact", bold: "9 profiles (K-Means) and 2 risk groups (FCM)", text1: " characterized by age, comorbidities, hospitalization, and severity. Identified clusters such as young patients with high hospitalization and low comorbidity (Clusters 4 and 6), useful for health policy. Reproducible pipeline and documented limitations." }
  },
  meta: [
    { label: "Role", value: "Data Science / Clustering" },
    { label: "Timeline", value: "Academic (Jan 2026)" },
    { label: "Stack", value: "Python, scikit-learn, scikit-fuzzy" },
    { label: "Deliverables", value: "LaTeX report, Next.js portfolio" }
  ],
  links: { dashboard: "View Dashboard", repo: "Repository", report: "Report (if available)" },
  linkDashboard: "https://covid.dvillagrans.dev",
  quote: { text: "What really hurt was not having ", bold: "multivariate risk profiles", text2: ": isolated factors were known (age, diabetes, etc.), but not how they combine in practice.", title: "The Real Pain Point" },
  constraints: {
    title1: "01 // Hard Constraints",
    title2: "What shaped the pipeline.",
    desc: "Academic deadline, infra limits, and data quality defined scope.",
    c1: { title: "Time & Scope", text1: "Fixed delivery (9 Jan 2026). Scope limited to ", bold1: "clustering, report, and portfolio", text2: "; no operational deployment. Three-person team; task split (notebooks, document, portfolio) conditioned scope." },
    c2: { title: "Infrastructure", text1: "GitHub 100 MB file limit. Raw data and ", bold1: ".pkl not versioned", text2: "; anyone cloning must run descargar_datos.py and notebooks. README recommends 16 GB+ RAM for the sample." },
    c3: { title: "No Real End Users", text1: "No hospital deployment. \"Users\" are ", bold1: "evaluators and portfolio readers", text2: ".", tag: "ACADEMIC" },
    c4: { title: "Costs", text1: "No cloud budget. ", bold1: "Everything local", text2: ": Conda, Jupyter, downloaded data." },
    c5: { title: "Data Legacy", text1: "Official data with ", bold1: "reporting bias", text2: ", missing variables (vaccination, variants, treatments), temporal heterogeneity 2020–2024, and limited geographic granularity." }
  },
  pipeline: {
    title1: "02 // System & Pipeline",
    title2: "From sources to deliverables.",
    desc: "Notebooks 00–02 take raw data to a stratified sample, cleaning, derived variables, and scaling. Notebooks 03–05 run clustering (K-Means and FCM), evaluation (Silhouette, Davies-Bouldin, ARI, NMI), and comparison. Artifacts (.pkl and figures) feed the LaTeX report and Next.js portfolio. The portfolio is public presentation with static/exported data; no live connection to .pkl."
  },
  architecture: {
    title1: "03 // Key Decisions",
    title2: "The heart of the design.",
    d1: { nav: "3.1 / ALGORITHMS", title: "K-Means and FCM (not just one)", desc: "We needed both clear classification for triage and identification of borderline cases. ", bold: "K-Means for definitive assignment and efficiency", desc2: " on millions of records; FCM for mixed profiles and prioritization via partial memberships.", costTitle: "Trade-off", costDesc: "More clusters give more detail but more complexity to communicate; we chose k=9 and c=2." },
    d2: { nav: "3.2 / SAMPLE", title: "Stratified sampling", desc: "Given size (30M+ records) and memory/time limits, we used ", bold: "stratified sampling", desc2: " to preserve representativeness without collapsing the pipeline.", costTitle: "Trade-off", costDesc: "Full-dataset clustering was not feasible; sample size and strata were documented." },
    d3: { nav: "3.3 / PCA", title: "PCA only for visualization", desc: "We trained clustering on ", bold: "17 standardized variables", desc2: " and used PCA only to reduce dimension in plots, not as clustering space.", costTitle: "Trade-off", costDesc: "Keeps interpretability in original feature space; visuals in 2D." },
    d4: { nav: "3.4 / PRESENTATION", title: "Portfolio in Next.js", desc: "Results had to reach ", bold: "non-technical audiences and faculty", desc2: ". We added a web layer (Next.js, React, Recharts) alongside the LaTeX report: narrative, gallery, and interactive charts.", costTitle: "Trade-off", costDesc: "Static exports; no live connection to models." }
  },
  lessons: {
    title1: "04 // What Went Wrong",
    title2: "Documented limitations.",
    desc: "Issues we had to acknowledge before closing the project.",
    l1: { title: "100% lethality in all clusters", desc: "All clusters showed 100% lethality, which forced us to document the need to validate the dataset and review the FALLECIDO variable. Not fixed before deadline; assumed as a known limitation.", tag: "DATA QUALITY" },
    l2: { title: "Outcome variable quality", desc: "We trusted FALLECIDO to characterize clusters without early cross-check with the data dictionary and possible reporting bias. That weakened the mortality interpretation.", tag: "VALIDATION" },
    l3: { title: "Dual source of figures", desc: "Visualizations were generated in notebooks for LaTeX and then reused in the portfolio without a single \"source of truth\"; the portfolio gallery could drift from the report figures.", tag: "PROCESS" }
  },
  footer: { text: "LAST UPDATED: Q1 2026 // COVID-19 RISK PROFILES — ESCOM-IPN", status: "ACADEMIC DELIVERABLE" }
} satisfies CovidDict;

export const covidEs = {
  back: "Volver al Archivo",
  subtitle: "Identificación de perfiles de riesgo en pacientes COVID-19 a partir de datos abiertos SSA, mediante clustering (K-means y Fuzzy C-Means). Analítica Avanzada de Datos, ESCOM-IPN.",
  tldr: {
    challenge: { title: "El Reto", text1: "El problema no era solo \"analizar datos de COVID\"; era ", bold: "reducir la incertidumbre en el triage", text2: " y en la priorización de recursos cuando UCI, ventiladores y camas son escasos. Stakeholders: salud pública, evaluación académica y, en perspectiva, equipos clínicos con necesidad de perfiles interpretables." },
    solution: { title: "La Solución", text1: "Combinamos ", bold: "K-Means y Fuzzy C-Means", text2: " sobre muestras estratificadas de 30M+ registros SSA: asignación clara para triage más ", cyan: "pertenencias parciales para casos límite", text3: ". Pipeline de datos crudos a reporte LaTeX y portfolio Next.js." },
    impact: { title: "El Impacto", bold: "9 perfiles (K-Means) y 2 grupos de riesgo (FCM)", text1: " caracterizados por edad, comorbilidades, hospitalización y severidad. Se identificaron clusters como jóvenes con alta hospitalización y baja comorbilidad (Clusters 4 y 6), útiles para políticas de salud. Pipeline reproducible y limitaciones documentadas." }
  },
  meta: [
    { label: "Rol", value: "Data Science / Clustering" },
    { label: "Timeline", value: "Académico (ene 2026)" },
    { label: "Stack", value: "Python, scikit-learn, scikit-fuzzy" },
    { label: "Entregables", value: "Reporte LaTeX, portfolio Next.js" }
  ],
  links: { dashboard: "Ver Dashboard", repo: "Repositorio", report: "Reporte (si aplica)" },
  linkDashboard: "https://covid.dvillagrans.dev",
  quote: { text: "Lo que dolía de verdad era no tener ", bold: "perfiles de riesgo multivariados", text2: ": se conocían factores aislados (edad, diabetes, etc.), pero no cómo se combinan en la realidad.", title: "El Dolor Real" },
  constraints: {
    title1: "01 // Restricciones Duras",
    title2: "Lo que definió el pipeline.",
    desc: "Fecha académica, límites de infra y calidad de datos definieron el alcance.",
    c1: { title: "Tiempo y Alcance", text1: "Entrega fija (9 ene 2026). Alcance acotado a ", bold1: "clustering, reporte y portfolio", text2: "; sin despliegue operativo. Equipo de tres personas; reparto de tareas (notebooks, documento, portfolio) condicionó el alcance." },
    c2: { title: "Infraestructura", text1: "Límite GitHub 100 MB por archivo. Datos crudos y ", bold1: ".pkl no versionados", text2: "; quien clona debe ejecutar descargar_datos.py y notebooks. README recomienda 16 GB+ RAM para la muestra." },
    c3: { title: "Sin Usuarios Reales", text1: "No hay despliegue en hospitales. Los \"usuarios\" son ", bold1: "evaluadores y quien consulte el portfolio", text2: ".", tag: "ACADÉMICO" },
    c4: { title: "Costos", text1: "Sin presupuesto de nube. ", bold1: "Todo local", text2: ": Conda, Jupyter, datos descargados." },
    c5: { title: "Legacy de Datos", text1: "Datos oficiales con ", bold1: "sesgo de reporte", text2: ", variables faltantes (vacunación, variantes, tratamientos), heterogeneidad temporal 2020–2024 y granularidad geográfica limitada." }
  },
  pipeline: {
    title1: "02 // Sistema y Pipeline",
    title2: "De fuentes a entregables.",
    desc: "Los notebooks 00–02 llevan los datos crudos a una muestra estratificada, limpieza, variables derivadas y escalado. Los notebooks 03–05 ejecutan el clustering (K-Means y FCM), evaluación (Silhouette, Davies-Bouldin, ARI, NMI) y comparación. Los artefactos (.pkl y figuras) alimentan el reporte LaTeX y el portfolio Next.js. El portfolio es presentación pública con datos estáticos/exportados; sin conexión en vivo a los .pkl."
  },
  architecture: {
    title1: "03 // Decisiones Clave",
    title2: "El corazón del diseño.",
    d1: { nav: "3.1 / ALGORITMOS", title: "K-Means y FCM (y no solo uno)", desc: "Hacía falta clasificación clara para triage e identificación de casos fronterizos. ", bold: "K-Means para asignación definitiva y eficiencia", desc2: " sobre millones de registros; FCM para perfiles mixtos y priorización por pertenencias parciales.", costTitle: "Trade-off", costDesc: "Más clusters dan más detalle pero más complejidad al comunicar; elegimos k=9 y c=2." },
    d2: { nav: "3.2 / MUESTRA", title: "Muestreo estratificado", desc: "Dado el tamaño (30M+ registros) y límites de memoria y tiempo, usamos ", bold: "muestreo estratificado", desc2: " para mantener representatividad sin colapsar el pipeline.", costTitle: "Trade-off", costDesc: "Clustering sobre el dataset completo no era viable; tamaño y estratos quedaron documentados." },
    d3: { nav: "3.3 / PCA", title: "PCA solo para visualización", desc: "Entrenamos el clustering con ", bold: "17 variables estandarizadas", desc2: " y usamos PCA solo para reducir dimensión en gráficos, no como espacio de clustering.", costTitle: "Trade-off", costDesc: "Interpretabilidad en el espacio original; visuales en 2D." },
    d4: { nav: "3.4 / PRESENTACIÓN", title: "Portfolio en Next.js", desc: "Los resultados debían llegar a ", bold: "no técnicos y profesorado", desc2: ". Añadimos capa web (Next.js, React, Recharts) además del reporte LaTeX: narrativa, galería y gráficos interactivos.", costTitle: "Trade-off", costDesc: "Exportaciones estáticas; sin conexión en vivo a modelos." }
  },
  lessons: {
    title1: "04 // Qué Salió Mal",
    title2: "Limitaciones documentadas.",
    desc: "Problemas que tuvimos que reconocer antes de cerrar el proyecto.",
    l1: { title: "Letalidad 100 % en todos los clusters", desc: "Todos los clusters mostraban letalidad 100 %, lo que obligó a documentar la necesidad de validar el dataset y revisar la variable FALLECIDO. No se corrigió antes del cierre; se asumió como limitación conocida.", tag: "CALIDAD DE DATOS" },
    l2: { title: "Calidad de la variable de desenlace", desc: "Confiamos en FALLECIDO para caracterizar los clusters sin validación cruzada temprana con el diccionario de datos y posibles sesgos de registro. Eso restó fuerza a la interpretación en mortalidad.", tag: "VALIDACIÓN" },
    l3: { title: "Doble fuente de figuras", desc: "Las visualizaciones se generaron en los notebooks para LaTeX y luego se reutilizaron en el portfolio sin una única “fuente de verdad”; la galería del portfolio pudo quedar desfasada respecto a las figuras del reporte.", tag: "PROCESO" }
  },
  footer: { text: "LAST UPDATED: Q1 2026 // PERFILES DE RIESGO COVID-19 — ESCOM-IPN", status: "ENTREGABLE ACADÉMICO" }
} satisfies CovidDict;
