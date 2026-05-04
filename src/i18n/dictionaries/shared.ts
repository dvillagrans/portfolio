import type {
  NavDict,
  HeroDict,
  WorkDict,
  SystemsDict,
  PhilosophyDict,
  StackDict,
  AboutDict,
  ArchiveDict,
  ContactDict,
} from "../types";

export type {
  NavDict,
  HeroDict,
  WorkDict,
  SystemsDict,
  PhilosophyDict,
  StackDict,
  AboutDict,
  ArchiveDict,
  ContactDict,
} from "../types";

export const sharedEn = {
  nav: { projects: "Projects", systems: "Capabilities", contact: "Contact", about: "About" },
  hero: {
    title1: "ML pipelines. LLM automation.",
    title2: "Production systems.",
    subtitle1: "Data Science student building real infrastructure —",
    subtitle2: "from EEG signal processing to open-source LLM clusters.",
    cta: "View Projects",
  },
  work: {
    title: "Featured Projects",
    subtitle: "Selected systems // 2024—2025",
    labelScope: "Challenge",
    labelSystem: "Solution",
    labelOutcome: "Impact",
    inspect: "Open Project",
    projects: [
      {
        id: "00",
        type: "special" as const,
        category: "Professional Experience",
        title: "EyeNet — AI & Automation",
        problem: "Full automation infrastructure with LLMs, ETL/ELT pipelines, containerized microservices, AI assistants, and production web/mobile apps.",
        system: "Multi-layered orchestration: Ingestion (APIs, n8n, ETL), Processing (OpenAI, Gemini, Custom LLM Cluster), and Delivery (Docker, Microservices, Apps).",
        outcome: "Production system — Partial NDA",
        image: "eyenet",
        tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"],
        metrics: [
          { value: "65%", label: "less manual work" },
          { value: "300+", label: "docs processed / week" },
          { value: "10K+", label: "daily requests" },
          { value: "92%", label: "extraction accuracy" }
        ],
        date: "April 2025 - Present",
        location: "Remote",
        links: [],
        href: "#"
      },
      {
        id: "01",
        type: "grid" as const,
        category: "Advanced Analytics / ML",
        title: "COVID-19 Risk Profiles",
        problem: "Identifying multivariate risk patterns in 30M+ open health records for ICU prioritization.",
        system: "K-Means and Fuzzy C-Means on stratified samples; reproducible pipeline from raw data to report.",
        outcome: "Identified 9 interpretable risk profiles with documented limitations and reproducible notebooks.",
        image: "/img/dashboard-covid-19.webp",
        tags: ["Python", "K-Means", "Fuzzy C-Means", "Next.js"],
        metrics: [
          { value: "30M+", label: "records analyzed" },
          { value: "9", label: "risk profiles" }
        ],
        links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }],
        href: "https://covid.dvillagrans.dev",
        caseStudy: "https://covid.dvillagrans.dev"
      },
      {
        id: "02",
        type: "grid" as const,
        category: "Mobility / Data Viz",
        title: "NYC Ride-Hailing Analytics",
        problem: "Stakeholders needed reliable insights across Uber/Lyft trip patterns and airport pricing.",
        system: "Interactive Streamlit platform with predictive ML models and geospatial operational dashboards.",
        outcome: "Delivered fare prediction (R² > 0.85) and airport classification (92% accuracy).",
        image: "/img/nyc-ridehailing-dashboard.webp",
        tags: ["Streamlit", "Scikit-learn", "Python", "Geospatial"],
        metrics: [
          { value: "R² .85", label: "fare prediction" },
          { value: "92%", label: "classification acc." }
        ],
        links: [
          { label: "Live dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" },
          { label: "Code", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" }
        ],
        href: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/",
      },
      {
        id: "03",
        type: "wide" as const,
        category: "Data Engineering / ETL",
        title: "India Air Quality Intelligence",
        problem: "Fragmented IoT data from hundreds of sensors needed policy-ready data consolidation.",
        system: "Cloud ETL architecture using Azure Databricks, PySpark, and PostgreSQL for continuous analytics.",
        outcome: "Processed 2M+ daily records from 500+ sensors into consistent health indicators.",
        image: "/img/india-air-quality.webp",
        tags: ["Azure", "PySpark", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "daily records" },
          { value: "500+", label: "IoT sensors" }
        ],
        links: [
          { label: "Live view", url: "https://aqi-india.dvillagrans.dev" },
          { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" }
        ],
        href: "https://aqi-india.dvillagrans.dev",
      }
    ]
  },
  systems: {
    title: "Systems & Capabilities",
    items: [
      {
        title: "Machine Learning Pipelines",
        description: "End-to-end orchestration: from EEG signal processing and feature engineering to production-ready LLM clusters and model deployment.",
        tags: ["Scikit-learn", "PyTorch", "MLflow", "GPU Clusters"]
      },
      {
        title: "Data Engineering & Infrastructure",
        description: "ETL pipelines with PySpark and SQL, automated with n8n and Grafana, backed by Redis and high-performance GPU clusters.",
        tags: ["PySpark", "Redis", "n8n", "Docker"]
      },
      {
        title: "Analytics Products",
        description: "High-accuracy decision systems and predictive dashboards built with FastAPI, Streamlit and Power BI for real-world impact.",
        tags: ["FastAPI", "Streamlit", "Power BI", "SQL"]
      },
      {
        title: "Scalable Web Platforms",
        description: "Modern full-stack ecosystems using Next.js, React, and TypeScript, optimized for high performance and seamless AI integrations.",
        tags: ["Next.js", "TypeScript", "Vercel", "Tailwind"]
      }
    ]
  },
  philosophy: {
    tag: "Working Principles",
    quote: "\"Turn complex data into clear decisions and scalable products.\"",
    items: [
      { title: "01. Impact over output", description: "I prioritize measurable outcomes: model accuracy, decision quality, processing speed, and business value." },
      { title: "02. End-to-end ownership", description: "I build complete systems, from data collection and cleaning to production deployment and monitoring." },
      { title: "03. Clarity at scale", description: "Good architecture keeps complexity contained so teams can iterate quickly without breaking reliability." }
    ]
  },
  stack: {
    title: "Technical Stack & Tooling",
    tools: [
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "LLaMA / Mistral",
      "OpenAI API",
      "Gemini",
      "PySpark",
      "SQL",
      "PostgreSQL",
      "Redis",
      "n8n",
      "Power BI",
      "Grafana",
      "Streamlit",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "Kubernetes",
      "Azure",
      "AWS",
      "Google Cloud",
      "Git",
      "GitHub"
    ]
  },
  about: {
    title: "Diego Villagran Salazar",
    subtitle: "AI & Data Engineer · ML Systems Builder",
    intro: "I build intelligent systems that go from raw data to production — ML pipelines, LLM automation, and scalable infrastructure that teams can actually trust and ship with. Currently studying Data Science at ESCOM-IPN while working full-time on AI automation at EyeNet and managing a private GPU cluster for open-source LLM deployment.",
    metrics: [
      { value: "10K+", label: "Daily requests handled" },
      { value: "2M+", label: "Records processed" },
      { value: "4+", label: "Production systems deployed" }
    ],
    sections: {
      systems: {
        title: "01 // How I build systems",
        content: "End-to-end: define the problem, engineer the data pipeline, train and validate the model, deploy with monitoring. I don't hand off — I own the full stack from ingestion to the interface where someone makes a decision."
      },
      optimization: {
        title: "02 // What I optimize for",
        items: [
          { label: "Accuracy with explainability", desc: "Strong metrics matter, but outputs need to be understandable to the people acting on them." },
          { label: "Automation with control", desc: "I automate workflows while keeping visibility, alerting, and quality checks in place." },
          { label: "Scalable foundations", desc: "Systems that keep working as data volume, users, and complexity grow." }
        ]
      },
      decisions: {
        title: "03 // Current focus",
        items: [
          { title: "AI & Automation at EyeNet", desc: "Building document processing pipelines with LLMs, n8n, and containerized microservices handling 10K+ daily requests." },
          { title: "Private GPU Cluster", desc: "Deploying and benchmarking open-source models (LLaMA, Mistral) for internal company AI projects — evaluating performance vs. cost vs. proprietary APIs." },
          { title: "Analytics products with measurable value", desc: "Dashboards and decision systems that shorten time-to-insight for real operational decisions." }
        ]
      }
    },
    closure: "I build technology that is practical, measurable, and ready for production from day one."
  },
  archive: {
    title: "Project Archive",
    subtitle: "Complete index of data science, analytics, and full-stack projects.",
    back: "Return",
    headers: { year: "Year", project: "Project", domain: "Domain", link: "Link" },
    viewProject: "Visit",
    projects: [
      {
        year: "2025",
        title: "EyeNet — AI & Automation Systems",
        domain: "AI / Automation",
        isFeatured: true,
        caseStudy: "/projects/eyenet",
        links: []
      },
      {
        year: "2025",
        title: "TimeUp // Time Tracking SaaS",
        domain: "SaaS / Full Stack",
        isFeatured: true,
        caseStudy: "/projects/timeup",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ]
      },
      { year: "2025", title: "COVID-19 Risk Profiles (Mexico)", domain: "Data Science / Clustering", isFeatured: true, caseStudy: "https://covid.dvillagrans.dev", links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }] },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", links: [ { label: "Dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" } ] },
      { year: "2025", title: "Métodos de Optimización No Lineal", domain: "Optimization / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" } ] },
      { year: "2025", title: "Matemáticas Avanzadas - Métodos de Optimización", domain: "Optimization / Education", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion" } ] },
      { year: "2025", title: "Population Dashboard", domain: "Analytics / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/population-dashboard" } ] },
      { year: "2025", title: "Global Health Analytics Dashboard", domain: "Analytics / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/health-analytics-dashboard" } ] },
      { year: "2025", title: "Video Game Market Intelligence", domain: "Analytics / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/videogames-dashboard" } ] },
      { year: "2024", title: "India Air Quality ETL", domain: "Data Engineering / Azure", links: [ { label: "Live", url: "https://aqi-india.dvillagrans.dev" }, { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" } ] },
      { year: "2024", title: "Code Master", domain: "EdTech / Full Stack", links: [ { label: "Website", url: "https://codemaster-two.vercel.app" }, { label: "Repo", url: "https://github.com/dvillagrans/Code-Master" } ] },
      { year: "2024", title: "Technical Portfolio Platform", domain: "Web Development / Next.js", links: [ { label: "Website", url: "https://www.dvillagrans.dev/" }, { label: "Repo", url: "https://github.com/dvillagrans/portfolio" } ] },
      { year: "2024", title: "Houses Prices Prediction", domain: "Machine Learning / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Houses-Prices-Prediction" } ] },
      { year: "2024", title: "Dashboard Financial", domain: "Data Analysis / Excel VBA", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Dashboard-Financial" } ] },
      { year: "2023", title: "Melari Spa", domain: "Web Development / Astro", links: [ { label: "Website", url: "https://melarispa.com" } ] },
      { year: "2023", title: "Prediction of Passengers for Mexican Airlines", domain: "Time Series / Data Science", links: [ { label: "Dashboard", url: "https://passenger-volume-prediction-in-mexi.vercel.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" } ] }
    ]
  },
  contact: {
    title1: "Let's build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    bookSession: "Let's talk",
    bookDesc: "Reach out for collaborations, job opportunities, or technical inquiries.",
    formName: "Your Name",
    formEmail: "Your Email",
    formMessage: "What would you like to discuss?",
    formSubmit: "Send Request",
    formLoading: "Sending…",
    formLabel: "New Message /",
    formSuccess: "Message sent! I'll get back to you shortly.",
    formError: "Something went wrong. Please email directly.",
    errorRequired: "This field is required",
    errorNameShort: "Name must be at least 2 characters",
    errorEmailInvalid: "Please enter a valid email address",
    errorMessageShort: "Message must be at least 10 characters",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  },
} satisfies {
  nav: NavDict;
  hero: HeroDict;
  work: WorkDict;
  systems: SystemsDict;
  philosophy: PhilosophyDict;
  stack: StackDict;
  about: AboutDict;
  archive: ArchiveDict;
  contact: ContactDict;
};

export const sharedEs = {
  nav: { projects: "Proyectos", systems: "Capacidades", contact: "Contacto", about: "Sobre mí" },
  hero: {
    title1: "ML pipelines. LLM automation.",
    title2: "Sistemas de producción.",
    subtitle1: "Estudiante de Ciencia de Datos construyendo infraestructura real —",
    subtitle2: "desde procesamiento de señales EEG hasta clústeres de LLMs de código abierto.",
    cta: "Ver Proyectos",
  },
  work: {
    title: "Proyectos Destacados",
    subtitle: "Sistemas seleccionados // 2024—2025",
    labelScope: "Reto",
    labelSystem: "Solución",
    labelOutcome: "Impacto",
    inspect: "Ver Proyecto",
    projects: [
      {
        id: "00",
        type: "special" as const,
        category: "Experiencia Profesional",
        title: "EyeNet — AI & Automation",
        problem: "Infraestructura completa de automatización con LLMs, pipelines ETL/ELT, microservicios containerizados, asistentes de IA y apps móviles/web en producción.",
        system: "Arquitectura multicapa: Ingesta (APIs, n8n, ETL), Procesamiento (OpenAI, Gemini, Cluster LLM propio) y Delivery (Docker, Microservicios, Apps).",
        outcome: "Sistema en producción — NDA parcial",
        image: "eyenet",
        tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"],
        metrics: [
          { value: "65%", label: "menos trabajo manual" },
          { value: "300+", label: "docs procesados / semana" },
          { value: "10K+", label: "requests diarios" },
          { value: "92%", label: "precisión extracción" }
        ],
        date: "Abril 2025 - Presente",
        location: "Remoto",
        links: [],
        href: "#"
      },
      {
        id: "01",
        type: "grid" as const,
        category: "Analítica Avanzada / ML",
        title: "Perfiles de Riesgo COVID-19",
        problem: "Identificación de patrones de riesgo multivariados en 30M+ registros para priorización de UCI.",
        system: "K-Means y Fuzzy C-Means en muestras estratificadas; pipeline reproducible desde datos crudos.",
        outcome: "9 perfiles de riesgo interpretables con limitaciones documentadas y notebooks reproducibles.",
        image: "/img/dashboard-covid-19.webp",
        tags: ["Python", "K-Means", "Fuzzy C-Means", "Next.js"],
        metrics: [
          { value: "30M+", label: "registros analizados" },
          { value: "9", label: "perfiles de riesgo" }
        ],
        links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }],
        href: "https://covid.dvillagrans.dev",
        caseStudy: "https://covid.dvillagrans.dev"
      },
      {
        id: "02",
        type: "grid" as const,
        category: "Movilidad / Data Viz",
        title: "Analytics NYC Ride-Hailing",
        problem: "Necesidad de insights confiables sobre patrones de viaje y precios de aeropuertos en Uber/Lyft.",
        system: "Plataforma interactiva en Streamlit con modelos predictivos y dashboards geoespaciales.",
        outcome: "Predicción de tarifas (R² > 0.85) y clasificación de aeropuertos (92% precisión).",
        image: "/img/nyc-ridehailing-dashboard.webp",
        tags: ["Streamlit", "Scikit-learn", "Python", "Geospatial"],
        metrics: [
          { value: "R² .85", label: "predicción tarifa" },
          { value: "92%", label: "precisión clasif." }
        ],
        links: [
          { label: "Dashboard en vivo", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" },
          { label: "Código", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" }
        ],
        href: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/",
      },
      {
        id: "03",
        type: "wide" as const,
        category: "Data Engineering / ETL",
        title: "IA Calidad del Aire (India)",
        problem: "Datos IoT fragmentados de cientos de sensores requerían consolidación para políticas públicas.",
        system: "Arquitectura ETL cloud usando Azure Databricks, PySpark y PostgreSQL para analítica continua.",
        outcome: "Procesamiento de 2M+ registros diarios de 500+ sensores en indicadores de salud consistentes.",
        image: "/img/india-air-quality.webp",
        tags: ["Azure", "PySpark", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "registros diarios" },
          { value: "500+", label: "sensores IoT" }
        ],
        links: [
          { label: "Vista en vivo", url: "https://aqi-india.dvillagrans.dev" },
          { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" }
        ],
        href: "https://aqi-india.dvillagrans.dev",
      }
    ]
  },
  systems: {
    title: "Sistemas y Capacidades",
    items: [
      {
        title: "Pipelines de Machine Learning",
        description: "Orquestación de extremo a extremo: desde procesamiento de señales EEG hasta despliegue de clústeres de LLMs en producción.",
        tags: ["Scikit-learn", "PyTorch", "MLflow", "Clústeres GPU"]
      },
      {
        title: "Ingeniería de Datos e Infraestructura",
        description: "Pipelines ETL con PySpark y SQL, automatizados con n8n y Grafana, respaldados por Redis y clústeres GPU de alto rendimiento.",
        tags: ["PySpark", "Redis", "n8n", "Docker"]
      },
      {
        title: "Productos de Analítica",
        description: "Sistemas de decisión de alta precisión y dashboards predictivos construidos con FastAPI, Streamlit y Power BI.",
        tags: ["FastAPI", "Streamlit", "Power BI", "SQL"]
      },
      {
        title: "Plataformas Web Escalables",
        description: "Ecosistemas full-stack modernos usando Next.js, React y TypeScript, optimizados para integraciones de IA sin fricciones.",
        tags: ["Next.js", "TypeScript", "Vercel", "Tailwind"]
      }
    ]
  },
  philosophy: {
    tag: "Principios de trabajo",
    quote: "\"Convertir datos complejos en decisiones claras y productos escalables.\"",
    items: [
      { title: "01. Impacto sobre volumen", description: "Priorizo resultados medibles: accuracy, calidad de decisión, velocidad de procesamiento y valor de negocio." },
      { title: "02. Ownership de extremo a extremo", description: "Construyo sistemas completos: captura de datos, limpieza, modelado, despliegue y monitoreo." },
      { title: "03. Claridad al escalar", description: "Una buena arquitectura encapsula complejidad para que los equipos iteren rápido sin perder confiabilidad." }
    ]
  },
  stack: {
    title: "Stack Técnico y Herramientas",
    tools: [
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "LLaMA / Mistral",
      "OpenAI API",
      "Gemini",
      "PySpark",
      "SQL",
      "PostgreSQL",
      "Redis",
      "n8n",
      "Power BI",
      "Grafana",
      "Streamlit",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "Kubernetes",
      "Azure",
      "AWS",
      "Google Cloud",
      "Git",
      "GitHub"
    ]
  },
  about: {
    title: "Diego Villagran Salazar",
    subtitle: "Ingeniero de IA y Datos · Constructor de Sistemas de ML",
    intro: "Construyo sistemas inteligentes que van desde los datos crudos hasta la producción: pipelines de ML, automatización con LLMs e infraestructura escalable en la que los equipos realmente pueden confiar. Actualmente estudio Ciencia de Datos en ESCOM-IPN mientras trabajo a tiempo completo en automatización de IA en EyeNet y gestiono un clúster de GPU privado para el despliegue de LLMs de código abierto.",
    metrics: [
      { value: "10K+", label: "Solicitudes diarias" },
      { value: "2M+", label: "Registros procesados" },
      { value: "4+", label: "Sistemas en producción" }
    ],
    sections: {
      systems: {
        title: "01 // Cómo construyo sistemas",
        content: "End-to-end: definir el problema, diseñar el pipeline de datos, entrenar y validar el modelo, y desplegar con monitoreo. No hago entregas parciales: soy dueño del stack completo desde la ingesta hasta la interfaz donde alguien toma una decisión."
      },
      optimization: {
        title: "02 // Qué optimizo",
        items: [
          { label: "Precisión con explicabilidad", desc: "Las métricas fuertes importan, pero los resultados deben ser comprensibles para las personas que actúan sobre ellos." },
          { label: "Automatización con control", desc: "Automatizo flujos de trabajo manteniendo visibilidad, alertas y verificaciones de calidad en todo momento." },
          { label: "Fundamentos escalables", desc: "Sistemas que siguen funcionando a medida que crecen el volumen de datos, los usuarios y la complejidad." }
        ]
      },
      decisions: {
        title: "03 // Enfoque actual",
        items: [
          { title: "IA y Automatización en EyeNet", desc: "Construcción de pipelines de procesamiento de documentos con LLMs, n8n y microservicios containerizados que manejan más de 10K solicitudes diarias." },
          { title: "Clúster de GPU Privado", desc: "Despliegue y benchmarking de modelos de código abierto (LLaMA, Mistral) para proyectos internos de IA, evaluando rendimiento vs. costo vs. APIs propietarias." },
          { title: "Productos analíticos con valor medible", desc: "Dashboards y sistemas de decisión que acortan el tiempo de obtención de insights para decisiones operativas reales." }
        ]
      }
    },
    closure: "Construyo tecnología práctica, medible y lista para producción desde el primer día."
  },
  archive: {
    title: "Archivo de Proyectos",
    subtitle: "Índice completo de proyectos de ciencia de datos, analítica y desarrollo full-stack.",
    back: "Volver",
    headers: { year: "Año", project: "Proyecto", domain: "Dominio", link: "Enlace" },
    viewProject: "Visitar",
    projects: [
      {
        year: "2025",
        title: "EyeNet — Sistemas de IA y Automatización",
        domain: "IA / Automatización",
        isFeatured: true,
        caseStudy: "/projects/eyenet",
        links: []
      },
      {
        year: "2025",
        title: "TimeUp // SaaS para Control de Tiempos",
        domain: "SaaS / Full Stack",
        isFeatured: true,
        caseStudy: "/projects/timeup",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ]
      },
      { year: "2025", title: "Perfiles de riesgo COVID-19 (México)", domain: "Data Science / Clustering", isFeatured: true, caseStudy: "https://covid.dvillagrans.dev", links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }] },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", links: [ { label: "Dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" } ] },
      { year: "2025", title: "Métodos de Optimización No Lineal", domain: "Optimización / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" } ] },
      { year: "2025", title: "Matemáticas Avanzadas - Métodos de Optimización", domain: "Optimización / Educación", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion" } ] },
      { year: "2025", title: "Dashboard de Población por Continente", domain: "Analítica / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/population-dashboard" } ] },
      { year: "2025", title: "Global Health Analytics Dashboard", domain: "Analítica / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/health-analytics-dashboard" } ] },
      { year: "2025", title: "Video Game Market Intelligence", domain: "Analítica / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/videogames-dashboard" } ] },
      { year: "2024", title: "India Air Quality ETL", domain: "Data Engineering / Azure", links: [ { label: "Live", url: "https://aqi-india.dvillagrans.dev" }, { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" } ] },
      { year: "2024", title: "Code Master", domain: "EdTech / Full Stack", links: [ { label: "Website", url: "https://codemaster-two.vercel.app" }, { label: "Repo", url: "https://github.com/dvillagrans/Code-Master" } ] },
      { year: "2024", title: "Technical Portfolio Platform", domain: "Desarrollo Web / Next.js", links: [ { label: "Website", url: "https://www.dvillagrans.dev/" }, { label: "Repo", url: "https://github.com/dvillagrans/portfolio" } ] },
      { year: "2024", title: "Predicción de precios de casas", domain: "Machine Learning / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Houses-Prices-Prediction" } ] },
      { year: "2024", title: "Dashboard Financial", domain: "Análisis de Datos / Excel VBA", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Dashboard-Financial" } ] },
      { year: "2023", title: "Melari Spa", domain: "Desarrollo Web / Astro", links: [ { label: "Website", url: "https://melarispa.com" } ] },
      { year: "2023", title: "Predicción de pasajeros para aerolíneas mexicanas", domain: "Series de tiempo / Data Science", links: [ { label: "Dashboard", url: "https://passenger-volume-prediction-in-mexi.vercel.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" } ] }
    ]
  },
  contact: {
    title1: "Construyamos algo",
    title2: "inteligente y útil.",
    email: "diegovillasal@gmail.com",
    bookSession: "Hablemos",
    bookDesc: "Contáctame para colaboraciones, oportunidades laborales o consultas técnicas.",
    formName: "Tu Nombre",
    formEmail: "Tu Correo",
    formMessage: "¿De qué te gustaría hablar?",
    formSubmit: "Enviar Solicitud",
    formLoading: "Enviando…",
    formLabel: "Nuevo Mensaje /",
    formSuccess: "¡Mensaje enviado! Te contactaré pronto.",
    formError: "Hubo un error. Por favor, envía un correo.",
    errorRequired: "Este campo es obligatorio",
    errorNameShort: "El nombre debe tener al menos 2 caracteres",
    errorEmailInvalid: "Ingresa un correo electrónico válido",
    errorMessageShort: "El mensaje debe tener al menos 10 caracteres",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  },
} satisfies {
  nav: NavDict;
  hero: HeroDict;
  work: WorkDict;
  systems: SystemsDict;
  philosophy: PhilosophyDict;
  stack: StackDict;
  about: AboutDict;
  archive: ArchiveDict;
  contact: ContactDict;
};
