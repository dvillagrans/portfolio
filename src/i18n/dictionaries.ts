export const en = {
  nav: { projects: "Projects", systems: "Capabilities", contact: "Contact", about: "About" },
  hero: {
    title1: "Data Science meets",
    title2: "Full-Stack Execution.",
    subtitle1: "Diego Villagran Salazar — Data Scientist & Full-Stack Developer.",
    subtitle2: "I build machine learning systems, analytics products, and scalable web apps that create measurable business impact.",
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
        title: "TimeUp // Time Tracking SaaS",
        problem: "Businesses and employees needed an agile, frictionless system to manage time logs and payments, replacing paper completely.",
        system: "Built a two-way architecture (Business Portal & Employee Landing) with dashboards, automated calculations, and cloud infrastructure.",
        outcome: "Delivered a stable, production-adopted system that reduces payroll administrative work by up to 80%.",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ],
        href: "/projects/timeup"
      },
      {
        id: "01",
        title: "NYC Ride-Hailing Analytics Dashboard",
        problem: "Transportation stakeholders needed reliable insights across Uber and Lyft trip patterns, pricing, and airport operations in New York City.",
        system: "Built an interactive Streamlit analytics platform with predictive ML models, geospatial maps, and multi-tab operational dashboards.",
        outcome: "Delivered fare prediction with R² > 0.85 and airport classification with 92% accuracy for practical decision support.",
        href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
      },
      {
        id: "02",
        title: "India Air Quality ETL Intelligence System",
        problem: "Raw environmental data from hundreds of IoT sensors was fragmented and difficult to convert into policy-ready insights.",
        system: "Designed a cloud ETL architecture using Azure Databricks, PySpark, PostgreSQL, and BI reporting for continuous analytics.",
        outcome: "Processed 2M+ daily records from 500+ sensors and transformed noisy streams into consistent, actionable health indicators.",
        href: "https://github.com/dvillagrans/india-air-quality-etl",
      },
      {
        id: "03",
        title: "Code Master — Interactive Learning Platform",
        problem: "Students needed a more engaging and structured way to practice coding with feedback and measurable progress.",
        system: "Developed a gamified full-stack platform with Astro/Django architecture, secure auth, and learning-oriented UX.",
        outcome: "Scaled to 10k+ users and earned 2nd place in the 2024 EdTech Innovation Awards.",
        href: "https://github.com/dvillagrans/Code-Master",
      }
    ]
  },
  systems: {
    title: "Systems & Capabilities",
    items: [
      { title: "Machine Learning Pipelines", description: "From preprocessing and feature engineering to training, evaluation, and deployment of predictive models." },
      { title: "Data Engineering", description: "ETL orchestration with Python, PySpark, SQL, and cloud platforms for reliable high-volume analytics workflows." },
      { title: "Analytics Products", description: "Interactive dashboards and decision systems with Streamlit and Power BI focused on real-world business metrics." },
      { title: "Web Platform Development", description: "Scalable full-stack applications with Next.js, React, TypeScript, and cloud-ready deployment practices." }
    ]
  },
  philosophy: {
    tag: "Working Principles",
    quote: "“Turn complex data into clear decisions and scalable products.”",
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
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "PySpark",
      "SQL",
      "PostgreSQL",
      "Power BI",
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
    subtitle: "Data Scientist & Full-Stack Developer",
    intro: "I specialize in building intelligent systems that connect data science, product thinking, and software engineering. Currently studying Data Science at ESCOM-IPN, I focus on turning complex datasets into products that teams can trust and scale.",
    sections: {
      systems: {
        title: "How I build systems",
        content: "My process is end-to-end: define the business question, build robust data pipelines, train and validate models, and deliver interfaces where non-technical stakeholders can act on insights. I care deeply about reliability, maintainability, and practical adoption."
      },
      optimization: {
        title: "What I optimize for",
        items: [
          { label: "Accuracy with explainability", desc: "Strong metrics matter, but model outputs must remain understandable to business users and collaborators." },
          { label: "Automation with control", desc: "I automate repetitive workflows while preserving visibility, alerting, and quality checks for safe operations." },
          { label: "Scalable foundations", desc: "The goal is systems that keep working as data volume, users, and product complexity grow." }
        ]
      },
      decisions: {
        title: "Current focus",
        items: [
          { title: "AI & Automation at Eyenet", desc: "Designing automation pipelines with Python, n8n, Docker, and LLM APIs that reduce manual effort and improve data quality." },
          { title: "Analytics products with measurable value", desc: "Building dashboards and intelligent applications that shorten time-to-insight and support operational decisions." }
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
        title: "TimeUp // Time Tracking SaaS", 
        domain: "SaaS / Full Stack", 
        isFeatured: true,
        caseStudy: "/projects/timeup",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ]
      },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", link: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" },
      { year: "2025", title: "Métodos de Optimización No Lineal", domain: "Optimization / Flask", link: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" },
      { year: "2025", title: "Matemáticas Avanzadas - Métodos de Optimización", domain: "Optimization / Education", link: "https://github.com/dvillagrans/Metodos-de-optimizacion" },
      { year: "2025", title: "Population Dashboard", domain: "Analytics / Power BI", link: "https://github.com/dvillagrans/population-dashboard" },
      { year: "2025", title: "Global Health Analytics Dashboard", domain: "Analytics / Power BI", link: "https://github.com/dvillagrans/health-analytics-dashboard" },
      { year: "2025", title: "Video Game Market Intelligence", domain: "Analytics / Power BI", link: "https://github.com/dvillagrans/videogames-dashboard" },
      { year: "2024", title: "India Air Quality ETL", domain: "Data Engineering / Azure", link: "https://github.com/dvillagrans/india-air-quality-etl" },
      { year: "2024", title: "Code Master", domain: "EdTech / Full Stack", link: "https://github.com/dvillagrans/Code-Master" },
      { year: "2024", title: "Technical Portfolio Platform", domain: "Web Development / Next.js", link: "https://github.com/dvillagrans/portfolio" },
      { year: "2024", title: "Houses Prices Prediction", domain: "Machine Learning / Flask", link: "https://github.com/dvillagrans/Houses-Prices-Prediction" },
      { year: "2024", title: "Dashboard Financial", domain: "Data Analysis / Excel VBA", link: "https://github.com/dvillagrans/Dashboard-Financial" },
      { year: "2023", title: "Melari Spa", domain: "Web Development / Astro", link: "https://melarispa.com" },
      { year: "2023", title: "Prediction of Passengers for Mexican Airlines", domain: "Time Series / Data Science", link: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }
    ]
  },
  contact: {
    title1: "Let’s build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    bookSession: "Book a Session",
    bookDesc: "Schedule a 30-min discovery call.",
    formName: "Your Name",
    formEmail: "Your Email",
    formMessage: "What would you like to discuss?",
    formSubmit: "Send Request",
    formSuccess: "Message sent! I'll get back to you shortly.",
    formError: "Something went wrong. Please email directly.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  }
};

export const es = {
  nav: { projects: "Proyectos", systems: "Capacidades", contact: "Contacto", about: "Sobre mí" },
  hero: {
    title1: "Data Science con",
    title2: "ejecución Full-Stack.",
    subtitle1: "Diego Villagran Salazar — Data Scientist & Full-Stack Developer.",
    subtitle2: "Construyo sistemas de machine learning, productos analíticos y aplicaciones web escalables con impacto medible.",
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
        title: "TimeUp // SaaS para Control de Tiempos",
        problem: "Negocios y empleados necesitaban un sistema ágil, sin fricción, para gestionar el registro de horas y pagos, reemplazando el papel.",
        system: "Construimos una arquitectura de dos vías (Portal de Negocios y Landing de Empleados) con dashboards, cálculo automatizado e infraestructura cloud.",
        outcome: "Entregamos un sistema estable, adoptado en entornos de producción que reduce hasta un 80% el trabajo administrativo de nóminas.",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ],
        href: "/projects/timeup"
      },
      {
        id: "01",
        title: "NYC Ride-Hailing Analytics Dashboard",
        problem: "Los equipos necesitaban insights confiables sobre patrones de viaje, tarifas y operación aeroportuaria de Uber/Lyft en NYC.",
        system: "Desarrollé una plataforma interactiva en Streamlit con modelos predictivos, mapas geoespaciales y tableros operativos.",
        outcome: "Se logró predicción de tarifas con R² > 0.85 y clasificación de viajes al aeropuerto con 92% de accuracy.",
        href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
      },
      {
        id: "02",
        title: "Sistema de Inteligencia ETL de Calidad del Aire (India)",
        problem: "Los datos ambientales de cientos de sensores IoT estaban fragmentados y eran difíciles de convertir en insights accionables.",
        system: "Diseñé una arquitectura ETL en la nube con Azure Databricks, PySpark, PostgreSQL y visualización en BI.",
        outcome: "Procesamiento de más de 2M de registros diarios de 500+ sensores para crear indicadores de salud consistentes.",
        href: "https://github.com/dvillagrans/india-air-quality-etl",
      },
      {
        id: "03",
        title: "Code Master — Plataforma Interactiva de Aprendizaje",
        problem: "Los estudiantes necesitaban una forma más atractiva y estructurada de practicar programación con retroalimentación.",
        system: "Construí una plataforma gamificada full-stack con arquitectura Astro/Django, autenticación segura y UX educativa.",
        outcome: "Escaló a más de 10k usuarios y obtuvo 2º lugar en los EdTech Innovation Awards 2024.",
        href: "https://github.com/dvillagrans/Code-Master",
      }
    ]
  },
  systems: {
    title: "Sistemas y Capacidades",
    items: [
      { title: "Pipelines de Machine Learning", description: "Desde preprocesamiento e ingeniería de variables hasta entrenamiento, validación y despliegue de modelos." },
      { title: "Data Engineering", description: "Orquestación ETL con Python, PySpark, SQL y servicios cloud para flujos analíticos confiables a gran escala." },
      { title: "Productos de Analítica", description: "Dashboards interactivos y sistemas de decisión con Streamlit y Power BI orientados a métricas de negocio." },
      { title: "Desarrollo Web de Plataforma", description: "Aplicaciones full-stack escalables con Next.js, React, TypeScript y prácticas listas para producción." }
    ]
  },
  philosophy: {
    tag: "Principios de trabajo",
    quote: "“Convertir datos complejos en decisiones claras y productos escalables.”",
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
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "PySpark",
      "SQL",
      "PostgreSQL",
      "Power BI",
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
    subtitle: "Data Scientist & Full-Stack Developer",
    intro: "Me especializo en construir sistemas inteligentes que conectan ciencia de datos, producto e ingeniería de software. Actualmente estudio Data Science en ESCOM-IPN y me enfoco en convertir datos complejos en productos confiables y escalables.",
    sections: {
      systems: {
        title: "Cómo construyo sistemas",
        content: "Mi proceso es end-to-end: definir la pregunta de negocio, diseñar pipelines robustos, entrenar y validar modelos, y entregar interfaces donde equipos no técnicos puedan actuar sobre los insights. Priorizo confiabilidad, mantenibilidad y adopción real."
      },
      optimization: {
        title: "Qué optimizo",
        items: [
          { label: "Accuracy con explicabilidad", desc: "Las métricas importan, pero las salidas del modelo deben ser entendibles para negocio y colaboradores." },
          { label: "Automatización con control", desc: "Automatizo tareas repetitivas manteniendo visibilidad, alertas y validaciones para operación segura." },
          { label: "Fundamentos escalables", desc: "El objetivo es que el sistema siga funcionando cuando crecen volumen de datos, usuarios y complejidad." }
        ]
      },
      decisions: {
        title: "Enfoque actual",
        items: [
          { title: "IA y automatización en Eyenet", desc: "Diseño pipelines de automatización con Python, n8n, Docker y APIs de LLM para reducir trabajo manual y mejorar calidad de datos." },
          { title: "Productos analíticos con valor medible", desc: "Desarrollo dashboards y aplicaciones inteligentes que aceleran el tiempo a insight y respaldan decisiones operativas." }
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
        title: "TimeUp // SaaS para Control de Tiempos", 
        domain: "SaaS / Full Stack", 
        isFeatured: true,
        caseStudy: "/projects/timeup",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ]
      },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", link: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" },
      { year: "2025", title: "Métodos de Optimización No Lineal", domain: "Optimización / Flask", link: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" },
      { year: "2025", title: "Matemáticas Avanzadas - Métodos de Optimización", domain: "Optimización / Educación", link: "https://github.com/dvillagrans/Metodos-de-optimizacion" },
      { year: "2025", title: "Dashboard de Población por Continente", domain: "Analítica / Power BI", link: "https://github.com/dvillagrans/population-dashboard" },
      { year: "2025", title: "Global Health Analytics Dashboard", domain: "Analítica / Power BI", link: "https://github.com/dvillagrans/health-analytics-dashboard" },
      { year: "2025", title: "Video Game Market Intelligence", domain: "Analítica / Power BI", link: "https://github.com/dvillagrans/videogames-dashboard" },
      { year: "2024", title: "India Air Quality ETL", domain: "Data Engineering / Azure", link: "https://github.com/dvillagrans/india-air-quality-etl" },
      { year: "2024", title: "Code Master", domain: "EdTech / Full Stack", link: "https://github.com/dvillagrans/Code-Master" },
      { year: "2024", title: "Technical Portfolio Platform", domain: "Desarrollo Web / Next.js", link: "https://github.com/dvillagrans/portfolio" },
      { year: "2024", title: "Predicción de precios de casas", domain: "Machine Learning / Flask", link: "https://github.com/dvillagrans/Houses-Prices-Prediction" },
      { year: "2024", title: "Dashboard Financial", domain: "Análisis de Datos / Excel VBA", link: "https://github.com/dvillagrans/Dashboard-Financial" },
      { year: "2023", title: "Melari Spa", domain: "Desarrollo Web / Astro", link: "https://melarispa.com" },
      { year: "2023", title: "Predicción de pasajeros para aerolíneas mexicanas", domain: "Series de tiempo / Data Science", link: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }
    ]
  },
  contact: {
    title1: "Construyamos algo",
    title2: "inteligente y útil.",
    email: "diegovillasal@gmail.com",
    bookSession: "Agendar Sesión",
    bookDesc: "Programa una llamada breve de 30 mins conmigo.",
    formName: "Tu Nombre",
    formEmail: "Tu Correo",
    formMessage: "¿De qué te gustaría hablar?",
    formSubmit: "Enviar Solicitud",
    formSuccess: "¡Mensaje enviado! Te contactaré pronto.",
    formError: "Hubo un error. Por favor, envía un correo.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  }
};
