import { ProfileData } from "./types";

export const devopsEngineerProfile: ProfileData = {
  hero: {
    eyebrow: "Infra & Observabilidad",
    title: "Deploys aburridos, incidentes breves, métricas claras.",
    subtitle: "Diseño plataformas que se autoexplican: desde IaC hasta tableros SLO listos para on-call.",
    credentials: "Terraform · Docker · Grafana · 8+ servicios críticos",
    badge: "SLOs visibles · Backups 3-2-1 · On-call preparado",
    persona: "Construyo entornos donde cada alerta llega con contexto y plan de acción.",
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: "SLO uptime",
        value: "99.9%",
        description: "Plataformas multi-servicio en 2024-25",
      },
      {
        label: "MTTR promedio",
        value: "18 min",
        description: "Incidentes resueltos siguiendo playbooks",
      },
      {
        label: "Deploys al mes",
        value: "35",
        description: "Sin ventanas manuales ni downtimes",
      },
    ],
    ctas: [
      {
        label: "Ver casos",
        href: "#casos",
        type: "primary",
      },
      {
        label: "Auditar tu observabilidad",
        href: "https://cal.com/diegovillagran/infrastructure",
        type: "secondary",
        target: "_blank",
        description: "Sesión 30' para mapear SLOs y gaps",
      },
    ],
  },
  problems: [
    {
      title: "Deploys con miedo",
      description: "Automatizo pipelines con validaciones, environments consistentes y release policies claras.",
      metric: "-50% tiempo de despliegue",
    },
    {
      title: "Alertas sin contexto",
      description: "Defino SLO/SLI, tableros y alertas semánticas que indican causa raíz y próximos pasos.",
      metric: "Ruido de alertas -70%",
    },
    {
      title: "Backups sin ensayo",
      description: "Implemento estrategia 3-2-1 con pruebas de restauración recurrentes y tabletops documentados.",
      metric: "Restore probado en 15 min",
    },
    {
      title: "Costos fuera de control",
      description: "Orquesto monitoreo de costos y optimización de recursos con límites automáticos y right-sizing.",
      metric: "-25% costo infra mensual",
    },
  ],
  metrics: [
    {
      label: "Servicios gestionados",
      value: "12",
      description: "APIs, workers y data pipelines productivos",
    },
    {
      label: "Cobertura IaC",
      value: "95%",
      description: "Recursos versionados y testeados",
    },
    {
      label: "Playbooks operativos",
      value: "8",
      description: "Incident response + runbooks actualizados",
    },
  ],
  process: [
    {
      icon: "automation",
      title: "Descubrir & Priorizar",
      description: "Mapeo servicios, dependencias y SLOs actuales.",
      detail: "Asset inventory, matriz de criticidad y deuda operativa.",
    },
    {
      icon: "delivery",
      title: "Automatizar & Fortalecer",
      description: "Infraestructura como código, CI/CD y observabilidad integral.",
      detail: "Terraform/Ansible, health checks, logging unificado y alertas con contexto.",
    },
    {
      icon: "recovery",
      title: "Ejecutar & Iterar",
      description: "Simulacros, optimización de costos y mejoras continuas.",
      detail: "Game days, reportes de fiabilidad y roadmap trimestral.",
    },
  ],
  caseStudies: [
    {
      title: "Stack de microservicios observable",
      category: "Plataforma DevOps",
      timeframe: "2024",
      summary: "Consolidé 8 servicios en contenedores con monitoreo accionable y deploys sin sustos.",
      context: "Cada servicio tenía scripts distintos y sin health checks. Alertas eran logs manuales.",
      action: "Implementé Docker Compose + GitHub Actions, balanceador Nginx, límites de recursos y tablero Prometheus/Grafana por servicio.",
      result: "99.5% uptime, MTTR 12 min y rollback automático respaldado por artefactos versionados.",
      metric: "Deploys 4x más rápidos",
      tags: ["Docker", "GitHub Actions", "Grafana", "Prometheus", "Nginx"],
      proof: [
        {
          label: "Playbook completo",
          href: "https://dvillagrans.notion.site/infra-microservices",
          type: "secondary",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/microservices.webp",
        alt: "Dashboard de microservicios",
      },
      highlight: true,
    },
    {
      title: "Backups 3-2-1 probados",
      category: "Resiliencia & Recuperación",
      timeframe: "2025",
      summary: "Implementé y validé estrategia 3-2-1 con restauración bajo reloj para servicios críticos.",
      context: "Backups existían pero sin pruebas ni documentación; RTO estimado en horas.",
      action: "Automatice pg_dump + rsync a almacenamiento frío, sumé verificaciones checksum y runbook paso a paso.",
      result: "Restauración validada en 15 min, auditoría aprobada y on-call con checklist en Notion.",
      metric: "RTO contractual 30 min cumplido",
      tags: ["PostgreSQL", "Bash", "AWS S3", "Runbooks"],
      proof: [
        {
          label: "Checklist de restore",
          href: "https://dvillagrans.notion.site/playbook-restore",
          type: "ghost",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/docker.webp",
        alt: "Proceso de restauración documentado",
      },
      highlight: true,
    },
    {
      title: "Tableros SLO para CodeMaster",
      category: "Observabilidad & Costos",
      timeframe: "2024",
      summary: "Tableros de experiencia de usuario y costos para plataforma educativa con 10K+ usuarios.",
      context: "El equipo solo veía métricas de hosting. No había SLO definidos ni alertas priorizadas.",
      action: "Definí SLO disponibilidad y latencia, instrumenté traces y monitoreo de costos con budgets automáticos.",
      result: "Alertas ruidosas -70%, incidentes P1 cerrados en <20 min y ahorro 22% mensual en infraestructura.",
      metric: "NPS soporte +12 pts",
      tags: ["Grafana", "New Relic", "Cost Explorer", "Vercel"],
      proof: [
        {
          label: "Demo dashboard",
          href: "https://codemaster-two.vercel.app",
          type: "soft",
          target: "_blank",
        },
      ],
      media: {
        type: "image",
        src: "/img/codemaster.webp",
        alt: "Dashboard SLO y costos",
      },
      quickRead: true,
    },
  ],
  toolbox: [
    {
      title: "Infraestructura como Código",
      items: ["Terraform", "Pulumi", "Ansible", "Docker Compose"],
    },
    {
      title: "CI/CD & Release Engineering",
      items: ["GitHub Actions", "ArgoCD", "Flux", "Vercel"],
    },
    {
      title: "Observabilidad",
      items: ["Grafana", "Prometheus", "Loki", "OpenTelemetry"],
    },
    {
      title: "Respuesta a Incidentes",
      items: ["PagerDuty", "Statuspage", "Runbooks", "Game Days"],
    },
  ],
  guarantees: [
    {
      label: "Deploys sin downtime",
      value: "100%",
      description: "Blue/green o canary documentado + health checks antes de finalizar.",
    },
    {
      label: "Alertas útiles",
      value: "-70% ruido",
      description: "Alertas etiquetadas por severidad y con próximos pasos claros.",
    },
    {
      label: "Costos controlados",
      value: "-20%",
      description: "Rightsizing y límites automáticos con reporting mensual.",
    },
  ],
  testimonials: [
    {
      quote: "Pasamos de tener deploys de madrugada a releases diarios sin romper nada. Los tableros de Diego se volvieron nuestra única fuente de verdad.",
      author: "Laura Fernández",
      role: "Engineering Manager",
      company: "CodeMaster",
      highlight: true,
    },
    {
      quote: "Su documentación operativa nos salvó en la primera auditoría externa. Cada runbook tiene paso, contexto y dueños.",
      author: "Héctor Rivera",
      role: "Head of Platform",
      company: "Eyenet",
    },
  ],
  anecdote: {
    title: "Cuando el cluster gritó por ayuda",
    story: "Durante un pico inesperado, el cluster agotó conexiones. Activé el runbook de scaling, apliqué límites y en paralelo redacté post-mortem con acciones preventivas. De ahí salió mi obsesión por 'deploys aburridos'.",
    lesson: "Los incidentes no se evitan con suerte, sino con playbooks ensayados y métricas legibles.",
  },
  workingStyle: {
    availability: "On-call rotativo compartido · respuesta garantizada en horario extendido.",
    timezone: "CDMX (GMT-6) · cobertura a US Central / Pacific.",
    communication: "Canales dedicados en Slack con SLA de respuesta < 2h laboral.",
    handoff: "Runbooks, tableros y reportes semanales en Notion/Linear.",
    tools: ["Terraform Cloud", "Grafana", "PagerDuty", "Linear", "Slack"],
  },
  finalCta: {
    title: "Optimicemos tu plataforma",
    subtitle: "Reviso tus SLOs, alertas y pipelines para detectar riesgos antes del próximo release.",
    primary: {
      label: "Agendar auditoría",
      href: "https://cal.com/diegovillagran/infrastructure",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: "Solicitar checklist de SLOs",
      href: "mailto:diegovillasal@gmail.com?subject=Checklist%20SLO%20DevOps",
      type: "ghost",
    },
    note: "Trabajo con máximo 2 equipos en paralelo para mantener foco operativo.",
    slots: ["Semana del 18 nov: completo", "Semana del 25 nov: 1 cupo"],
  },
};
