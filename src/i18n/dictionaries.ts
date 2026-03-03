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
  },
  
  timeup: {
    back: "Back to Archive",
    subtitle: "Operational SaaS for the health and wellness sector.",
    tldr: {
      challenge: { title: "The Challenge", text1: "Local businesses operating blindly with ", bold: "WhatsApp and notebooks", text2: ". Owners permanently busy and an operative staff with low affinity for complex technological tools." },
      solution: { title: "The Solution", text1: "A ", bold: "Multi-tenant Cloud platform", text2: " with friendly onboarding, ", cyan: "biometric Passkeys", text3: " without cumbersome passwords and a kinetic Real-Time flow." },
      impact: { title: "The Impact", bold: "MVP built in 10 weeks", text1: " under an optimized architecture. Deployment with near-zero operating costs before gaining real production traction." }
    },
    meta: [
      { label: "Role", value: "Solo Developer / Architect" },
      { label: "Timeline", value: "10 Weeks (MVP)" },
      { label: "Architecture", value: "Serverless + Stateful VPS" },
      { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
    ],
    links: { public: "Public App", business: "Business Panel" },
    quote: { text: "If onboarding took more than ", bold: "ten minutes", text2: ", the implementation failed.", title: "The Functional Premise" },
    constraints: {
      title1: "01 // Inflexible Constraints",
      title2: "Retaining walls.",
      desc: "The context that defined the architecture and forced us to avoid over-engineering.",
      c1: { title: "Low Patience Users", text1: "Business owners aged 30 to 50. The flow could not assume ", bold1: "any prior technical knowledge", text2: ". That's why we transitioned from slow email schemes to using ", bold2: "Native Biometric Hardware (Passkeys)" },
      c2: { title: "MVP Against the Clock", text1: "Developed and modeled by a ", bold1: "single maintainer", text2: ", forcing the choice of hyper-productive tools (Turborepo + Next)." },
      c3: { title: "Tenant Quality", text1: "Semi-open onboarding system. Requires administrative approval in the Backend, creating complex database states ", tag: "PENDING" },
      c4: { title: "Serverless Zero-Cost", text1: "The app had to pivot with a dead burn rate. Pure deployment on ", bold1: "Vercel & Supabase Free", text2: " isolating demanding components." },
      c5: { title: "Strict Legal Module", text1: "Non-negotiable management of ", bold1: "Digital Informed Consents", text2: " with PDF electronic signatures for invasive medical treatments." }
    },
    interfaces: {
      title1: "02 // Ecosystem Interfaces",
      title2: "Dedicated tools by role.",
      admin: { tag: "MODULE : ADMIN", desc: "Global Analytics and Control Center." },
      owner: { tag: "MODULE : OWNER", desc: "Performance Metrics and Configuration." },
      staff: { tag: "MODULE : STAFF", desc: "Live Agenda and Client-Local Management." }
    },
    architecture: {
      title1: "03 // Architecture & Decisions",
      title2: "Trade-offs that give life to the business.",
      d1: { nav: "3.1 / REPOSITORY STRUCTURE", title: "Turborepo Monorepo", desc: "Building multiple React ecosystems forced crossing business logic, TypeScript types, and Prisma schemas. We opted for the initial rigidity of ", bold: "monorepositories to orchestrate", desc2: " multiple coupled bases with automatic caching.", costTitle: "The Operational Cost", costDesc: "Initial tooling delayed v.1, but scaling between deployments became completely instantaneous weeks later." },
      d2: { nav: "3.2 / STATEFUL SYNCHRONIZATION", title: "WebSocket Isolation", desc: "Platforms like Vercel and Edge Functions punish prolonged open connections (Timeouts and dead SSE in minutes). We extracted the bidirectional engine to a Virtual Machine with ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " acting as a real-time pipeline.", costTitle: "The Operational Cost", costDesc: "Monitoring fragmentation; we went from just looking at Vercel logs to having to constantly review metrics on an Ubuntu droplet." },
      d3: { nav: "3.3 / AUTHENTICATION EXPERIENCE", title: "Biometric WebAuthn Login", desc: "Forcing local staff to remember long strings interrupts their operational work. The strong implementation of hardware-integrated biometric APIs (FaceID / Fingerprint) cut access friction from ", bold: "several minutes to fractions of a second", desc2: " on the counter tablet.", costTitle: "The Operational Cost", costDesc: "Extremely high complexity in the fallback; forced maintaining an extra robust system via SMTP Magic Links." }
    },
    lessons: {
      title1: "04 // Post-Mortem System",
      title2: "Raw lessons upon hitting Production.",
      desc: "Pure technical implementations rarely survive the organic behavior of the end user and lower-tier Cloud limitations. What actually caught fire and how it was shielded.",
      l1: { title: "Connection Pooler Choking", desc: "Combining Serverless AWS with cold Database engines in Supabase ended up burning inefficient connection limits, destroying the pipelines.", tag: "URGENTLY MIGRATED TO ACTIVE TRANSACTION POOLERS" },
      l2: { title: "WebAuthn & Origin Mismatch", desc: "An insignificant extra slash '/' in the production CORS config collapsed the entire digital security key flow on the initial deploy because they break cryptographic security.", tag: "MANDATORY MIRRORING OF CI/CD PREVIEW ENVIRONMENT" },
      l3: { title: "State Purgatories & Ghost Users", desc: "Semi-approved entities created inconsistencies by dragging values that contaminated metrics of subsequent cohorts in KPIs.", tag: "ABSOLUTE RESTRICTION OF INTERMEDIATE STATES (BOOLEANS TO THE EXTREME)" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG", status: "STATUS: IN CONSTANT PRODUCTION" }
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
  },
  timeup: {
    back: "Volver al Archivo",
    subtitle: "SaaS Operativo para el sector de la salud y bienestar.",
    tldr: {
      challenge: { title: "El Reto", text1: "Negocios locales operando ciegamente con ", bold: "WhatsApp y libretas", text2: ". Dueños ocupados permanentemente y un staff de atención con baja afinidad a herramientas tecnológicas complejas." },
      solution: { title: "La Solución", text1: "Plataforma ", bold: "Multi-tenant Cloud", text2: " con onboarding amigable, acceso ", cyan: "Passkeys biométrico", text3: " sin contraseñas engorrosas y flujo kinético Real-Time." },
      impact: { title: "El Impacto", bold: "MVP construido en 10 semanas", text1: " bajo una arquitectura optimizada. Despliegue con costos operativos cercanos a cero antes de traccionar volumen productivo." }
    },
    meta: [
      { label: "Role", value: "Solo Developer / Architect" },
      { label: "Timeline", value: "10 Semanas (MVP)" },
      { label: "Architecture", value: "Serverless + Stateful VPS" },
      { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
    ],
    links: { public: "App Pública", business: "Panel Negocios" },
    quote: { text: "Si el onboarding tomaba más de ", bold: "diez minutos", text2: ", la implementación fracasaba.", title: "La Premisa Funcional" },
    constraints: {
      title1: "01 // Restricciones Inflexibles",
      title2: "Muros de contención.",
      desc: "El contexto que definió la arquitectura y nos obligó a evitar la sobree-ingeniería.",
      c1: { title: "Usuarios de Baja Paciencia", text1: "Dueños de negocios de 30 a 50 años. El flujo no podía asumir ", bold1: "ningún conocimiento técnico previo", text2: ". Por eso transicionamos de esquemas lentos de email a utilizar ", bold2: "Hardware Biométrico nativo (Passkeys)" },
      c2: { title: "MVP a Contrarreloj", text1: "Desarrollado y modelado por un ", bold1: "solo mantenedor", text2: ", obligando a elegir herramientas hiper-productivas (Turborepo + Next)." },
      c3: { title: "Calidad del Tenant", text1: "Sistema de Onboarding semi-abierto. Requiere aprobación administrativa en el Backend, generando estados complejos en BD ", tag: "PENDING" },
      c4: { title: "Serverless Zero-Cost", text1: "La app debía poder pivotear con un burn rate muerto. Despliegue puro en ", bold1: "Vercel & Supabase Free", text2: " aislando los componentes demandantes." },
      c5: { title: "Módulo Legal Estricto", text1: "Gestión innegociable de ", bold1: "Consentimientos Informados Digitales", text2: " con firmas electrónicas en PDF para tratamientos médicos invasivos." }
    },
    interfaces: {
      title1: "02 // Interfaces Ecosistema",
      title2: "Herramientas dedicadas por rol.",
      admin: { tag: "MÓDULO : ADMIN", desc: "Centro de Control y Analíticas Globales." },
      owner: { tag: "MÓDULO : OWNER", desc: "Métricas de Rendimiento y Configuración." },
      staff: { tag: "MÓDULO : STAFF", desc: "Agenda Viva y Manejo Cliente-Local." }
    },
    architecture: {
      title1: "03 // Arquitectura y Decisiones",
      title2: "Trade-offs que dan vida al negocio.",
      d1: { nav: "3.1 / ESTRUCTURA DE REPOSITORIO", title: "Monorepositorio Turborepo", desc: "Construir múltiples ecosistemas React obligaba a cruzar lógicas de negocio, tipos en TypeScript y esquemas Prisma. Optamos por la rigidez inicial de ", bold: "monorepositorios para orquestar", desc2: " múltiples bases acopladas con cacherréo automático.", costTitle: "El Costo Operativo", costDesc: "El tooling de arranque retrasó la v.1, pero escalar entre un despliegue y otro fue totalmente instantáneo semanas después." },
      d2: { nav: "3.2 / SINCRONIZACIÓN STATEFUL", title: "Aislamiento de WebSockets", desc: "Plataformas como Vercel y Edge Functions castigan las conexiones abiertas prolongadas (Timeouts y SSE muertos en minutos). Extrajimos el motor bidireccional a una Máquina Virtual con ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " actuando como pipeline en tiempo real.", costTitle: "El Costo Operativo", costDesc: "Fragmentación de monitoreo; pasamos de solo mirar logs de Vercel a tener que revisar métricas en un droplet de Ubuntu constantemente." },
      d3: { nav: "3.3 / EXPERIENCIA DE AUTENTICACIÓN", title: "Ingreso Biométrico WebAuthn", desc: "Obligar al staff local a recordar strings largos interrumpe su labor operativa. La implementación fuerte de APIs de biometría integradas en el hardware (FaceID / Fingerprint) cortó la fricción de acceso desde ", bold: "varios minutos a fracciones de segundo", desc2: " en la tablet del mostrador.", costTitle: "El Costo Operativo", costDesc: "Altísima complejidad en el fallback; obligó a mantener un robusto sistema extra por Magic Links SMTP." }
    },
    lessons: {
      title1: "04 // Post-Mortem System",
      title2: "Aprendizajes crudos al golpear Producción.",
      desc: "Las implementaciones técnicas puras raramente sobreviven al comportamiento orgánico del usuario final y de las limitaciones Cloud de cueto inferior. Lo que realmente se incendió y cómo fue blindado.",
      l1: { title: "Asfixia del Connection Pooler", desc: "Combinar AWS Serverless con motores de Base de Datos fríos en Supabase terminaba quemando cuotas de conexión ineficientes destrozando los pipelines.", tag: "MIGRADO DE URGENCIA A TRANSACTION POOLERS ACTIVOS" },
      l2: { title: "WebAuthn & Origin Mismatch", desc: "Un insignificante slash '/' sobrante en la terminación CORS del proyecto en producción colapsó todo el flujo de llaves digitales de seguridad en el deploy inicial porque rompen la seguridad criptográfica.", tag: "ESPEJADO OBLIGATORIO DE ENTORNO PREVIEW CI/CD" },
      l3: { title: "Purgatorios de Estado y Usuarios Fantasma", desc: "Entidades semi-aprobadas creaban inconsistencia al arrastrar valores que contaminaban las métricas de cohortes posteriores en KPIs.", tag: "RESTRICCIÓN ABSOLUTA DE ESTADOS INTERMEDIOS (BOOLEANS AL EXTREMO)" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG", status: "ESTADO: EN PRODUCCIÓN CONSTANTE" }
  },};
