import { DATA } from '../data/resume';

export const en = {
  nav: { projects: "Projects", systems: "Capabilities", contact: "Contact", about: "About" },
  hero: {
    title1: "Data Science meets",
    title2: "Full-Stack Execution.",
    subtitle1: DATA.description,
    subtitle2: DATA.summary,
    cta: "View Projects",
  },
  work: {
    title: "Featured Projects",
    subtitle: "Selected systems // 2024—2025",
    labelScope: "Role",
    labelSystem: "Description",
    labelOutcome: "Tech Stack",
    inspect: "Open Project",
    projects: DATA.projects.filter(p => p.active).slice(0, 5).map((p, i) => ({
      id: "0" + i,
      title: p.title,
      problem: p.role,
      system: p.description,
      outcome: p.technologies ? p.technologies.join(', ') : "",
      href: p.href,
      caseStudy: (p as any).caseStudy ? p.href : undefined,
      links: p.links?.map((l:any) => ({ label: l.type, url: l.href }))
    }))
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
    tools: DATA.skills
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
    projects: DATA.projects.map(p => ({
      year: (p.dates || "").split(' ').pop() || "",
      title: p.title,
      domain: p.role,
      caseStudy: (p as any).caseStudy ? p.href : undefined,
      isFeatured: (p as any).caseStudy || false,
      link: p.href,
      links: p.links?.map((l:any) => ({ label: l.type, url: l.href }))
    }))
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
    subtitle1: DATA.description,
    subtitle2: DATA.summary,
    cta: "Ver Proyectos",
  },
  work: {
    title: "Proyectos Destacados",
    subtitle: "Sistemas seleccionados // 2024—2025",
    labelScope: "Rol",
    labelSystem: "Descripción",
    labelOutcome: "Tecnologías",
    inspect: "Ver Proyecto",
    projects: DATA.projects.filter(p => p.active).slice(0, 5).map((p, i) => ({
      id: "0" + i,
      title: p.title,
      problem: p.role,
      system: p.description,
      outcome: p.technologies ? p.technologies.join(', ') : "",
      href: p.href,
      caseStudy: (p as any).caseStudy ? p.href : undefined,
      links: p.links?.map((l:any) => ({ label: l.type, url: l.href }))
    }))
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
    tools: DATA.skills
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
    projects: DATA.projects.map(p => ({
      year: (p.dates || "").split(' ').pop() || "",
      title: p.title,
      domain: p.role,
      caseStudy: (p as any).caseStudy ? p.href : undefined,
      isFeatured: (p as any).caseStudy || false,
      link: p.href,
      links: p.links?.map((l:any) => ({ label: l.type, url: l.href }))
    }))
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
