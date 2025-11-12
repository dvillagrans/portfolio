import { ProfileData, type LocalizedText } from "./types";

const l = (en: string, es: string): LocalizedText => ({ en, es });

export const dataAnalystProfile: ProfileData = {
  hero: {
    eyebrow: l("Dashboards & Analytics", "Dashboards & Analytics"),
    title: l("Insights that trigger decisions, not pretty slides.", "Insights que provocan decisiones, no slides bonitas."),
    subtitle: l(
      "I connect metrics with action: data storytelling, adoption, and real follow-up.",
      "Conecto métricas con acciones: data storytelling, adopción y seguimiento real.",
    ),
    credentials: l("Power BI · Streamlit · Advanced SQL · 30+ stakeholders impacted", "Power BI · Streamlit · SQL avanzado · 30+ stakeholders impactados"),
    badge: l("Measured adoption · Actionable stories · Aligned KPIs", "Adopción medida · Historias accionables · KPIs alineados"),
    persona: l("Analyst blending UX, narrative, and data to move key metrics.", "Analista que combina UX, narrativa y datos para mover indicadores."),
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: l("Time to insight", "Tiempo a insight"),
        value: l("-65%", "-65%"),
        description: l("From raw data to executive decision", "Desde datos crudos a decisión ejecutiva"),
      },
      {
        label: l("Dashboard adoption", "Adopción dashboards"),
        value: l("82%", "82%"),
        description: l("Measured monthly active users", "Usuarios activos mensuales medidos"),
      },
      {
        label: l("Strategic decisions", "Decisiones estratégicas"),
        value: l("14", "14"),
        description: l("Initiatives influenced with evidence", "Iniciativas influenciadas con evidencia"),
      },
    ],
    ctas: [
      {
        label: l("View cases", "Ver casos"),
        href: "#casos",
        type: "primary",
      },
      {
        label: l("Review your dashboard", "Revisar tu dashboard"),
        href: "https://cal.com/diegovillagran/analytics",
        type: "secondary",
        target: "_blank",
        description: l("Session to assess storytelling and adoption", "Sesión para evaluar storytelling y adopción"),
      },
    ],
  },
  problems: [
    {
      title: l("Dashboards nobody uses", "Dashboards que no se usan"),
      description: l("I design purposeful dashboards with actionable metrics and UX grounded in real questions.", "Diseño tableros con propósito, métricas accionables y UX basada en preguntas reales."),
      metric: l("+40 pts adoption", "+40 pts en adopción"),
    },
    {
      title: l("KPIs without context", "KPI sin contexto"),
      description: l("I craft narratives with benchmarks, driver explanations, and recommended action plans.", "Creo narrativas con benchmarks, explicación de drivers y plan de acción recomendado."),
      metric: l("Executive decisions in one session", "Decisiones ejecutivas en 1 sesión"),
    },
    {
      title: l("Data in silos", "Datos en silos"),
      description: l("I integrate multiple sources, model analytical views, and automate refresh with control.", "Integro fuentes múltiples, modelo vistas analíticas y automatizo refresh con control."),
      metric: l("Guaranteed freshness <15 min", "Freshness garantizada <15 min"),
    },
    {
      title: l("No follow-through", "Falta de seguimiento"),
      description: l("I set up adoption metrics, annotations, and alerts to iterate with evidence.", "Configuro métricas de adopción, anotaciones y alertas para iterar con evidencia."),
      metric: l("Monthly improvement cycle", "Ciclo de mejora mensual"),
    },
  ],
  metrics: [
    {
      label: l("Living dashboards", "Dashboards vivos"),
      value: l("18", "18"),
      description: l("Storytelling, annotations, and alerts included", "Con storytelling, anotaciones y alertas"),
    },
    {
      label: l("Manual hours saved", "Ahorro en horas manuales"),
      value: l("120h/mo", "120h/mes"),
      description: l("Automation of recurring reports", "Automatización de reportes recurrentes"),
    },
    {
      label: l("Stakeholder NPS", "NPS stakeholders"),
      value: l("9.1/10", "9.1/10"),
      description: l("Post-delivery surveys 2024-25", "Encuestas post-entrega 2024-25"),
    },
  ],
  process: [
    {
      icon: "insights",
      title: l("Discover questions", "Descubrir preguntas"),
      description: l("Stakeholder workshops, metric definitions, and target decisions.", "Workshops con stakeholders, definición de métricas y decisiones objetivo."),
      detail: l("Decision brief plus user map and cadence.", "Brief de decisión + mapa de usuarios y cadencia."),
    },
    {
      icon: "dashboard",
      title: l("Design stories", "Diseñar historias"),
      description: l("Data modeling, prototypes, and visual narrative iterated with users.", "Data modeling, prototipos y narrativa visual iterada con usuarios."),
      detail: l("Wireframes, usability tests, and early feedback.", "Wireframes, pruebas de usabilidad y feedback temprano."),
    },
    {
      icon: "automation",
      title: l("Activate adoption", "Activar adopción"),
      description: l("Documentation, trainings, alerts, and usage tracking.", "Documentación, capacitaciones, alertas y seguimiento de uso."),
      detail: l("Launch playbook plus instrumented adoption metrics.", "Playbook de lanzamiento + métricas de adopción instrumentadas."),
    },
  ],
  caseStudies: [
    {
      title: l("Streamlit NYC Ride-Hailing", "Streamlit NYC Ride-Hailing"),
      category: l("Interactive analytics app", "Analytics app interactiva"),
      timeframe: l("2025", "2025"),
      summary: l("Self-service analytics app with storytelling for urban mobility.", "Aplicación analítica self-service con storytelling para movilidad urbana."),
      context: l("Operations lacked a unified view of demand and pricing across Uber/Lyft.", "Operaciones no tenía visión unificada de demanda y pricing entre Uber/Lyft."),
      action: l("Modeled datasets, built a Streamlit app with scenarios and KPI sensitivity.", "Modelé datasets, construí app Streamlit con escenarios y sensibilidad KPI."),
      result: l("22% reduction in weekly analysis time; decisions driven by simulated scenarios.", "Reducción 22% tiempo de análisis semanal y decisiones basadas en escenarios simulados."),
      metric: l("78% adoption among target users", "Adopción 78% usuarios objetivo"),
      tags: ["Streamlit", "Python", "Plotly", "SQL"],
      proof: [
        {
          label: l("Repository", "Repositorio"),
          href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
          type: "secondary",
          icon: "github",
          target: "_blank",
        },
        {
          label: l("Live demo", "Demo en vivo"),
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
      title: l("Population Pulse BI", "Population Pulse BI"),
      category: l("Corporate BI", "BI corporativo"),
      timeframe: l("2024", "2024"),
      summary: l("Power BI board with drill-down for demographics and regional planning.", "Tablero Power BI con drill-down para demografía y planeación regional."),
      context: l("Population data in Excel produced static reports delayed by weeks.", "Datos de población en Excel generaban reportes estáticos con retraso de semanas."),
      action: l("Modeled a data warehouse, defined metrics, and built narrative experience with bookmarks.", "Modelé data warehouse, definí métricas y construí experiencia narrativa con bookmarks."),
      result: l("Expansion decisions taken 3 weeks earlier thanks to comparisons and projections.", "Decisiones de expansión tomadas 3 semanas antes gracias a comparativas y proyecciones."),
      metric: l("Time to decision -60%", "Tiempo a decisión -60%"),
      tags: ["Power BI", "DAX", "SQL", "Data Modeling"],
      proof: [
        {
          label: l("GitHub", "GitHub"),
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
      title: l("Analytics Ops for gaming", "Analytics Ops para gaming"),
      category: l("Rapid insight", "Insight rápido"),
      timeframe: l("2025", "2025"),
      summary: l("Insight system for gaming revenue with alerts and annotations.", "Sistema de insights para revenue gaming con alertas y anotaciones."),
      context: l("Product team made decisions without understanding geographic drivers.", "El equipo de producto tomaba decisiones sin entender drivers geográficos."),
      action: l("Integrated multi-platform sales, built comparative dashboards, and an annotation panel.", "Integré ventas multi-plataforma, construí dashboards comparativos y panel de anotaciones."),
      result: l("Roadmap prioritized around profitable genres, +18% quarterly bookings.", "Roadmap priorizado con base en géneros rentables, +18% reservas trimestrales."),
      metric: l("Alerts adopted 100%", "Alertas adoptadas 100%"),
      tags: ["Power BI", "Automations", "SQL"],
      proof: [
        {
          label: l("Dashboard demo", "Dashboard demo"),
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
      title: l("Storytelling & BI", "Storytelling & BI"),
      items: ["Power BI", "Looker Studio", "Tableau", "Streamlit"],
    },
    {
      title: l("Modeling & SQL", "Modelado & SQL"),
      items: ["dbt", "SQL Server", "PostgreSQL", "DuckDB"],
    },
    {
      title: l("Advanced analysis", "Análisis Avanzado"),
      items: ["Python", "Pandas", "Scikit-learn", "A/B Testing"],
    },
    {
      title: l("Collaboration", "Colaboración"),
      items: ["Figma", "Notion", "Miro", "Plausible"],
    },
  ],
  guarantees: [
    {
      label: l("Measured adoption", "Adopción medida"),
      value: l("80%+", "80%+"),
      description: l("Usage tracking plus tailored trainings.", "Seguimiento de uso + capacitaciones personalizadas."),
    },
    {
      label: l("Decision ready", "Decision ready"),
      value: l("< 10 days", "< 10 días"),
      description: l("From kickoff to actionable, narrated dashboard.", "Desde kickoff hasta tablero accionable con narrativa."),
    },
    {
      label: l("Guided iterations", "Iteraciones guiadas"),
      value: l("Monthly", "Mensual"),
      description: l("Insight review and adjustments based on real feedback.", "Revisión de insights y ajustes según feedback real."),
    },
  ],
  testimonials: [
    {
      quote: l(
        "He didn't just deliver dashboards; he built a narrative that helped the CEO decide on investments without asking for more data.",
        "No solo entregó dashboards; construyó una narrativa que ayudó al CEO a decidir inversiones sin pedir más datos.",
      ),
      author: l("Andrea Sosa", "Andrea Sosa"),
      role: l("Strategy Director", "Directora de Estrategia"),
      company: l("Melari", "Melari"),
      highlight: true,
    },
    {
      quote: l(
        "Diego’s dashboards come with clear CTAs, alerts, and documentation. My team knows exactly what to do every Monday with the numbers.",
        "Los tableros de Diego tienen CTA claros, alertas y documentación. Hoy mi equipo sabe qué hacer cada lunes con los números.",
      ),
      author: l("Carlos Núñez", "Carlos Núñez"),
      role: l("Head of Product", "Head of Product"),
      company: l("Codemaster", "Codemaster"),
    },
  ],
  anecdote: {
    title: l("The dashboard that changed a roadmap", "El dashboard que cambió un roadmap"),
    story: l(
        "By visualizing adoption by segment we discovered a “flagship” feature was irrelevant. Cancelling it freed budget for an initiative now representing 18% of revenue.",
        "Al visualizar la adopción por segmento descubrimos que un feature “estrella” era irrelevante. Cancelarlo liberó presupuesto para una iniciativa que hoy representa 18% de ingresos.",
    ),
    lesson: l("A solid insight always comes with context and an action plan.", "Un buen insight siempre viene con contexto y plan de acción."),
  },
  workingStyle: {
    availability: l("Biweekly iterations with short weekly demos.", "Iteraciones quincenales con demos semanales cortas."),
    timezone: l("CDMX (GMT-6) with LATAM/EU coverage.", "CDMX (GMT-6) con cobertura LATAM/EU."),
    communication: l("Dedicated channel, async updates, discovery workshops.", "Canal dedicado, actualizaciones asíncronas, workshops de descubrimiento."),
    handoff: l("Usage guides, video walkthrough, documentation in Notion.", "Guías de uso, video walkthrough, documentación en Notion."),
    tools: ["Power BI Service", "Notion", "Figma", "Slack", "Loom"],
  },
  finalCta: {
    title: l("Turn your data into decisions", "Convirtamos tus datos en decisiones"),
    subtitle: l("Let's evaluate your current dashboards and unlock adoption and action.", "Evaluemos tus dashboards actuales y desbloqueemos adopción y acción."),
    primary: {
      label: l("Book diagnostic session", "Reservar sesión de diagnóstico"),
      href: "https://cal.com/diegovillagran/analytics",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: l("Download adoption playbook", "Descargar playbook de adopción"),
      href: "mailto:diegovillasal@gmail.com?subject=Playbook%20Dashboards",
      type: "ghost",
    },
    note: l("Typical projects run 4–6 weeks with measured impact.", "Proyectos típicos 4-6 semanas con impacto medido."),
    slots: [
      l("Week of Nov 18: 2 spots", "Semana del 18 nov: 2 cupos"),
      l("Week of Dec 2: 1 spot", "Semana del 2 dic: 1 cupo"),
    ],
  },
};
