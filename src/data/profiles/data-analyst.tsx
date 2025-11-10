import { ProfileData } from "./types";

export const dataAnalystProfile: ProfileData = {
  hero: {
    eyebrow: "Dashboards & Analytics",
    title: "Insights que provocan decisiones, no slides bonitas.",
    subtitle: "Conecto métricas con acciones: data storytelling, adopción y seguimiento real.",
    credentials: "Power BI · Streamlit · SQL avanzado · 30+ stakeholders impactados",
    badge: "Adopción medida · Historias accionables · KPIs alineados",
    persona: "Analista que combina UX, narrativa y datos para mover indicadores.",
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: "Tiempo a insight",
        value: "-65%",
        description: "Desde datos crudos a decisión ejecutiva",
      },
      {
        label: "Adopción dashboards",
        value: "82%",
        description: "Usuarios activos mensuales medidos",
      },
      {
        label: "Decisiones estratégicas",
        value: "14",
        description: "Iniciativas influenciadas con evidencia",
      },
    ],
    ctas: [
      {
        label: "Ver casos",
        href: "#casos",
        type: "primary",
      },
      {
        label: "Revisar tu dashboard",
        href: "https://cal.com/diegovillagran/analytics",
        type: "secondary",
        target: "_blank",
        description: "Sesión para evaluar storytelling y adopción",
      },
    ],
  },
  problems: [
    {
      title: "Dashboards que no se usan",
      description: "Diseño tableros con propósito, métricas accionables y UX basada en preguntas reales.",
      metric: "+40 pts en adopción",
    },
    {
      title: "KPI sin contexto",
      description: "Creo narrativas con benchmarks, explicación de drivers y plan de acción recomendado.",
      metric: "Decisiones ejecutivas en 1 sesión",
    },
    {
      title: "Datos en silos",
      description: "Integro fuentes múltiples, modelo vistas analíticas y automatizo refresh con control.",
      metric: "Freshness garantizada <15 min",
    },
    {
      title: "Falta de seguimiento",
      description: "Configuro métricas de adopción, anotaciones y alertas para iterar con evidencia.",
      metric: "Ciclo de mejora mensual",
    },
  ],
  metrics: [
    {
      label: "Dashboards vivos",
      value: "18",
      description: "Con storytelling, anotaciones y alertas",
    },
    {
      label: "Ahorro en horas manuales",
      value: "120h/mes",
      description: "Automatización de reportes recurrentes",
    },
    {
      label: "NPS stakeholders",
      value: "9.1/10",
      description: "Encuestas post-entrega 2024-25",
    },
  ],
  process: [
    {
      icon: "insights",
      title: "Descubrir preguntas",
      description: "Workshops con stakeholders, definición de métricas y decisiones objetivo.",
      detail: "Brief de decisión + mapa de usuarios y cadencia.",
    },
    {
      icon: "dashboard",
      title: "Diseñar historias",
      description: "Data modeling, prototipos y narrativa visual iterada con usuarios.",
      detail: "Wireframes, pruebas de usabilidad y feedback temprano.",
    },
    {
      icon: "automation",
      title: "Activar adopción",
      description: "Documentación, capacitaciones, alertas y seguimiento de uso.",
      detail: "Playbook de lanzamiento + métricas de adopción instrumentadas.",
    },
  ],
  caseStudies: [
    {
      title: "Streamlit NYC Ride-Hailing",
      category: "Analytics app interactiva",
      timeframe: "2025",
      summary: "Aplicación analítica self-service con storytelling para movilidad urbana.",
      context: "Operaciones no tenía visión unificada de demanda y pricing entre Uber/Lyft.",
      action: "Modelé datasets, construí app Streamlit con escenarios y sensibilidad KPI.",
      result: "Reducción 22% tiempo de análisis semanal y decisiones basadas en escenarios simulados.",
      metric: "Adopción 78% usuarios objetivo",
      tags: ["Streamlit", "Python", "Plotly", "SQL"],
      proof: [
        {
          label: "Repositorio",
          href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
          type: "secondary",
          icon: "github",
          target: "_blank",
        },
        {
          label: "Demo en vivo",
          href: "https://nyc-ridehailing-dashboard.vercel.app",
          type: "soft",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/nyc-ridehailing-dashboard.webp",
        alt: "Dashboard ride-hailing NYC",
      },
      highlight: true,
    },
    {
      title: "Population Pulse BI",
      category: "BI corporativo",
      timeframe: "2024",
      summary: "Tablero Power BI con drill-down para demografía y planeación regional.",
      context: "Datos de población en Excel generaban reportes estáticos con retraso de semanas.",
      action: "Modelé data warehouse, definí métricas y construí experiencia narrativa con bookmarks.",
      result: "Decisiones de expansión tomadas 3 semanas antes gracias a comparativas y proyecciones.",
      metric: "Tiempo a decisión -60%",
      tags: ["Power BI", "DAX", "SQL", "Data Modeling"],
      proof: [
        {
          label: "GitHub",
          href: "https://github.com/dvillagrans/population-dashboard",
          type: "ghost",
          icon: "github",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/dash-population.webp",
        alt: "Dashboard población",
      },
      highlight: true,
    },
    {
      title: "Analytics Ops para gaming",
      category: "Insight rápido",
      timeframe: "2025",
      summary: "Sistema de insights para revenue gaming con alertas y anotaciones.",
      context: "El equipo de producto tomaba decisiones sin entender drivers geográficos.",
      action: "Integré ventas multi-plataforma, construí dashboards comparativos y panel de anotaciones.",
      result: "Roadmap priorizado con base en géneros rentables, +18% reservas trimestrales.",
      metric: "Alertas adoptadas 100%",
      tags: ["Power BI", "Automations", "SQL"],
      proof: [
        {
          label: "Dashboard demo",
          href: "https://github.com/dvillagrans/videogames-dashboard",
          type: "soft",
          icon: "github",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/dash-videojuegos.webp",
        alt: "Dashboard videojuegos",
      },
      quickRead: true,
    },
  ],
  toolbox: [
    {
      title: "Storytelling & BI",
      items: ["Power BI", "Looker Studio", "Tableau", "Streamlit"],
    },
    {
      title: "Modelado & SQL",
      items: ["dbt", "SQL Server", "PostgreSQL", "DuckDB"],
    },
    {
      title: "Análisis Avanzado",
      items: ["Python", "Pandas", "Scikit-learn", "A/B Testing"],
    },
    {
      title: "Colaboración",
      items: ["Figma", "Notion", "Miro", "Plausible"],
    },
  ],
  guarantees: [
    {
      label: "Adopción medida",
      value: "80%+",
      description: "Seguimiento de uso + capacitaciones personalizadas.",
    },
    {
      label: "Decision ready",
      value: "< 10 días",
      description: "Desde kickoff hasta tablero accionable con narrativa.",
    },
    {
      label: "Iteraciones guiadas",
      value: "Mensual",
      description: "Revisión de insights y ajustes según feedback real.",
    },
  ],
  testimonials: [
    {
      quote: "No solo entregó dashboards; construyó una narrativa que ayudó al CEO a decidir inversiones sin pedir más datos.",
      author: "Andrea Sosa",
      role: "Directora de Estrategia",
      company: "Melari",
      highlight: true,
    },
    {
      quote: "Los tableros de Diego tienen CTA claros, alertas y documentación. Hoy mi equipo sabe qué hacer cada lunes con los números.",
      author: "Carlos Núñez",
      role: "Head of Product",
      company: "Codemaster",
    },
  ],
  anecdote: {
    title: "El dashboard que cambió un roadmap",
    story: "Al visualizar la adopción por segmento descubrimos que un feature “estrella” era irrelevante. Cancelarlo liberó presupuesto para una iniciativa que hoy representa 18% de ingresos.",
    lesson: "Un buen insight siempre viene con contexto y plan de acción.",
  },
  workingStyle: {
    availability: "Iteraciones quincenales con demos semanales cortas.",
    timezone: "CDMX (GMT-6) con cobertura LATAM/EU.",
    communication: "Canal dedicado, actualizaciones asíncronas, workshops de descubrimiento.",
    handoff: "Guías de uso, video walkthrough, documentación en Notion.",
    tools: ["Power BI Service", "Notion", "Figma", "Slack", "Loom"],
  },
  finalCta: {
    title: "Convirtamos tus datos en decisiones",
    subtitle: "Evaluemos tus dashboards actuales y desbloqueemos adopción y acción.",
    primary: {
      label: "Reservar sesión de diagnóstico",
      href: "https://cal.com/diegovillagran/analytics",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: "Descargar playbook de adopción",
      href: "mailto:diegovillasal@gmail.com?subject=Playbook%20Dashboards",
      type: "ghost",
    },
    note: "Proyectos típicos 4-6 semanas con impacto medido.",
    slots: ["Semana del 18 nov: 2 cupos", "Semana del 2 dic: 1 cupo"],
  },
};
