import { ProfileData, type LocalizedText } from "./types";

const l = (en: string, es: string): LocalizedText => ({ en, es });

export const devopsEngineerProfile: ProfileData = {
  hero: {
    eyebrow: l("Infra & Observability", "Infra & Observabilidad"),
    title: l("Boring deploys, brief incidents, clear metrics.", "Deploys aburridos, incidentes breves, métricas claras."),
    subtitle: l(
      "I design platforms that explain themselves—from IaC to SLO dashboards ready for on-call.",
      "Diseño plataformas que se autoexplican: desde IaC hasta tableros SLO listos para on-call.",
    ),
    credentials: l("Terraform · Docker · Grafana · 8+ critical services", "Terraform · Docker · Grafana · 8+ servicios críticos"),
    badge: l("Visible SLOs · 3-2-1 backups · On-call ready", "SLOs visibles · Backups 3-2-1 · On-call preparado"),
    persona: l("I build environments where every alert arrives with context and an action plan.", "Construyo entornos donde cada alerta llega con contexto y plan de acción."),
    photo: "/img/optimized/me-128.webp",
    metrics: [
      {
        label: l("SLO uptime", "SLO uptime"),
        value: l("99.9%", "99.9%"),
        description: l("Multi-service platforms in 2024-25", "Plataformas multi-servicio en 2024-25"),
      },
      {
        label: l("Average MTTR", "MTTR promedio"),
        value: l("18 min", "18 min"),
        description: l("Incidents resolved following playbooks", "Incidentes resueltos siguiendo playbooks"),
      },
      {
        label: l("Deploys per month", "Deploys al mes"),
        value: l("35", "35"),
        description: l("No manual windows or downtime", "Sin ventanas manuales ni downtimes"),
      },
    ],
    ctas: [
      {
        label: l("View cases", "Ver casos"),
        href: "#casos",
        type: "primary",
      },
      {
        label: l("Audit your observability", "Auditar tu observabilidad"),
        href: "https://cal.com/diegovillagran/infrastructure",
        type: "secondary",
        target: "_blank",
        description: l("30' session to map SLOs and gaps", "Sesión 30' para mapear SLOs y gaps"),
      },
    ],
  },
  problems: [
    {
      title: l("Fearful deploys", "Deploys con miedo"),
      description: l("I automate pipelines with validations, consistent environments, and clear release policies.", "Automatizo pipelines con validaciones, environments consistentes y release policies claras."),
      metric: l("-50% deploy time", "-50% tiempo de despliegue"),
    },
    {
      title: l("Alerts without context", "Alertas sin contexto"),
      description: l("I define SLO/SLI, dashboards, and semantic alerts pointing to root cause and next steps.", "Defino SLO/SLI, tableros y alertas semánticas que indican causa raíz y próximos pasos."),
      metric: l("-70% alert noise", "Ruido de alertas -70%"),
    },
    {
      title: l("Untested backups", "Backups sin ensayo"),
      description: l("I implement 3-2-1 strategy with recurring restore tests and documented tabletops.", "Implemento estrategia 3-2-1 con pruebas de restauración recurrentes y tabletops documentados."),
      metric: l("Restore rehearsed in 15 min", "Restore probado en 15 min"),
    },
    {
      title: l("Runaway costs", "Costos fuera de control"),
      description: l("I orchestrate cost monitoring and resource optimization with limits and right-sizing.", "Orquesto monitoreo de costos y optimización de recursos con límites automáticos y right-sizing."),
      metric: l("-25% monthly infra cost", "-25% costo infra mensual"),
    },
  ],
  metrics: [
    {
      label: l("Managed services", "Servicios gestionados"),
      value: l("12", "12"),
      description: l("Production APIs, workers, and data pipelines", "APIs, workers y data pipelines productivos"),
    },
    {
      label: l("IaC coverage", "Cobertura IaC"),
      value: l("95%", "95%"),
      description: l("Versioned and tested resources", "Recursos versionados y testeados"),
    },
    {
      label: l("Operational playbooks", "Playbooks operativos"),
      value: l("8", "8"),
      description: l("Incident response plus up-to-date runbooks", "Incident response + runbooks actualizados"),
    },
  ],
  process: [
    {
      icon: "automation",
      title: l("Discover & Prioritize", "Descubrir & Priorizar"),
      description: l("I map services, dependencies, and current SLOs.", "Mapeo servicios, dependencias y SLOs actuales."),
      detail: l("Asset inventory, criticality matrix, and operational debt.", "Asset inventory, matriz de criticidad y deuda operativa."),
    },
    {
      icon: "delivery",
      title: l("Automate & Harden", "Automatizar & Fortalecer"),
      description: l("Infrastructure as code, CI/CD, and end-to-end observability.", "Infraestructura como código, CI/CD y observabilidad integral."),
      detail: l("Terraform/Ansible, health checks, unified logging, context-rich alerts.", "Terraform/Ansible, health checks, logging unificado y alertas con contexto."),
    },
    {
      icon: "recovery",
      title: l("Execute & Iterate", "Ejecutar & Iterar"),
      description: l("Simulations, cost optimization, continuous improvement.", "Simulacros, optimización de costos y mejoras continuas."),
      detail: l("Game days, reliability reports, quarterly roadmap.", "Game days, reportes de fiabilidad y roadmap trimestral."),
    },
  ],
  caseStudies: [
    {
      title: l("Observable microservices stack", "Stack de microservicios observable"),
      category: l("DevOps platform", "Plataforma DevOps"),
      timeframe: l("2024", "2024"),
      summary: l(
        "Consolidated eight containerized services with actionable monitoring and fearless deploys.",
        "Consolidé 8 servicios en contenedores con monitoreo accionable y deploys sin sustos.",
      ),
      context: l(
        "Each service had its own scripts and no health checks. Alerts were manual logs.",
        "Cada servicio tenía scripts distintos y sin health checks. Alertas eran logs manuales.",
      ),
      action: l(
        "Implemented Docker Compose + GitHub Actions, Nginx load balancer, resource limits, and Prometheus/Grafana dashboards per service.",
        "Implementé Docker Compose + GitHub Actions, balanceador Nginx, límites de recursos y tablero Prometheus/Grafana por servicio.",
      ),
      result: l(
        "99.5% uptime, 12-minute MTTR, automated rollback with versioned artifacts.",
        "99.5% uptime, MTTR 12 min y rollback automático respaldado por artefactos versionados.",
      ),
      metric: l("Deploys 4× faster", "Deploys 4x más rápidos"),
      tags: ["Docker", "GitHub Actions", "Grafana", "Prometheus", "Nginx"],
      proof: [
        {
          label: l("Full playbook", "Playbook completo"),
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
      title: l("Tested 3-2-1 backups", "Backups 3-2-1 probados"),
      category: l("Resilience & Recovery", "Resiliencia & Recuperación"),
      timeframe: l("2025", "2025"),
      summary: l(
        "Implemented and validated a 3-2-1 strategy with time-boxed restores for critical services.",
        "Implementé y validé estrategia 3-2-1 con restauración bajo reloj para servicios críticos.",
      ),
      context: l(
        "Backups existed but lacked testing and documentation; estimated RTO was hours.",
        "Backups existían pero sin pruebas ni documentación; RTO estimado en horas.",
      ),
      action: l(
        "Automated pg_dump + rsync to cold storage, added checksum verification, and a step-by-step runbook.",
        "Automatice pg_dump + rsync a almacenamiento frío, sumé verificaciones checksum y runbook paso a paso.",
      ),
      result: l(
        "Restore validated in 15 minutes, audit passed, on-call equipped with a checklist in Notion.",
        "Restauración validada en 15 min, auditoría aprobada y on-call con checklist en Notion.",
      ),
      metric: l("30-min contractual RTO achieved", "RTO contractual 30 min cumplido"),
      tags: ["PostgreSQL", "Bash", "AWS S3", "Runbooks"],
      proof: [
        {
          label: l("Restore checklist", "Checklist de restore"),
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
      title: l("SLO dashboards for CodeMaster", "Tableros SLO para CodeMaster"),
      category: l("Observability & Costs", "Observabilidad & Costos"),
      timeframe: l("2024", "2024"),
      summary: l(
        "Delivered user-experience and cost dashboards for an education platform with 10K+ users.",
        "Tableros de experiencia de usuario y costos para plataforma educativa con 10K+ usuarios.",
      ),
      context: l(
        "The team only tracked hosting metrics. No defined SLOs or prioritized alerts.",
        "El equipo solo veía métricas de hosting. No había SLO definidos ni alertas priorizadas.",
      ),
      action: l(
        "Defined availability and latency SLOs, instrumented traces, and cost monitoring with automatic budgets.",
        "Definí SLO disponibilidad y latencia, instrumenté traces y monitoreo de costos con budgets automáticos.",
      ),
      result: l(
        "-70% noisy alerts, P1 incidents closed in <20 minutes, 22% monthly infra savings.",
        "Alertas ruidosas -70%, incidentes P1 cerrados en <20 min y ahorro 22% mensual en infraestructura.",
      ),
      metric: l("Support NPS +12 pts", "NPS soporte +12 pts"),
      tags: ["Grafana", "New Relic", "Cost Explorer", "Vercel"],
      proof: [
        {
          label: l("Dashboard demo", "Demo dashboard"),
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
      title: l("Infrastructure as Code", "Infraestructura como Código"),
      items: ["Terraform", "Pulumi", "Ansible", "Docker Compose"],
    },
    {
      title: l("CI/CD & Release Engineering", "CI/CD & Release Engineering"),
      items: ["GitHub Actions", "ArgoCD", "Flux", "Vercel"],
    },
    {
      title: l("Observability", "Observabilidad"),
      items: ["Grafana", "Prometheus", "Loki", "OpenTelemetry"],
    },
    {
      title: l("Incident Response", "Respuesta a Incidentes"),
      items: ["PagerDuty", "Statuspage", "Runbooks", "Game Days"],
    },
  ],
  guarantees: [
    {
      label: l("Downtime-free deploys", "Deploys sin downtime"),
      value: l("100%", "100%"),
      description: l("Documented blue/green or canary plus health checks before closing.", "Blue/green o canary documentado + health checks antes de finalizar."),
    },
    {
      label: l("Useful alerts", "Alertas útiles"),
      value: l("-70% noise", "-70% ruido"),
      description: l("Alerts tagged by severity with clear next steps.", "Alertas etiquetadas por severidad y con próximos pasos claros."),
    },
    {
      label: l("Controlled costs", "Costos controlados"),
      value: l("-20%", "-20%"),
      description: l("Rightsizing and automated limits with monthly reporting.", "Rightsizing y límites automáticos con reporting mensual."),
    },
  ],
  testimonials: [
    {
      quote: l(
        "We moved from midnight deploys to daily releases without breaking anything. Diego’s dashboards became our single source of truth.",
        "Pasamos de tener deploys de madrugada a releases diarios sin romper nada. Los tableros de Diego se volvieron nuestra única fuente de verdad.",
      ),
      author: l("Laura Fernández", "Laura Fernández"),
      role: l("Engineering Manager", "Engineering Manager"),
      company: l("CodeMaster", "CodeMaster"),
      highlight: true,
    },
    {
      quote: l(
        "His operational documentation saved us in our first external audit. Every runbook has steps, context, and owners.",
        "Su documentación operativa nos salvó en la primera auditoría externa. Cada runbook tiene paso, contexto y dueños.",
      ),
      author: l("Héctor Rivera", "Héctor Rivera"),
      role: l("Head of Platform", "Head of Platform"),
      company: l("Eyenet", "Eyenet"),
    },
  ],
  anecdote: {
    title: l("When the cluster cried for help", "Cuando el cluster gritó por ayuda"),
    story: l(
      "During an unexpected spike the cluster exhausted connections. I triggered the scaling runbook, enforced limits, and wrote the post-mortem with preventive actions. That's where my obsession with 'boring deploys' started.",
      "Durante un pico inesperado, el cluster agotó conexiones. Activé el runbook de scaling, apliqué límites y en paralelo redacté post-mortem con acciones preventivas. De ahí salió mi obsesión por 'deploys aburridos'.",
    ),
    lesson: l("Incidents aren’t avoided by luck but by rehearsed playbooks and readable metrics.", "Los incidentes no se evitan con suerte, sino con playbooks ensayados y métricas legibles."),
  },
  workingStyle: {
    availability: l("Shared rotating on-call · guaranteed response in extended hours.", "On-call rotativo compartido · respuesta garantizada en horario extendido."),
    timezone: l("CDMX (GMT-6) · coverage for US Central/Pacific.", "CDMX (GMT-6) · cobertura a US Central / Pacific."),
    communication: l("Dedicated Slack channels with <2h response SLA during business hours.", "Canales dedicados en Slack con SLA de respuesta < 2h laboral."),
    handoff: l("Runbooks, dashboards, and weekly reports in Notion/Linear.", "Runbooks, tableros y reportes semanales en Notion/Linear."),
    tools: ["Terraform Cloud", "Grafana", "PagerDuty", "Linear", "Slack"],
  },
  finalCta: {
    title: l("Let's optimize your platform", "Optimicemos tu plataforma"),
    subtitle: l("I'll review your SLOs, alerts, and pipelines to surface risks before the next release.", "Reviso tus SLOs, alertas y pipelines para detectar riesgos antes del próximo release."),
    primary: {
      label: l("Schedule audit", "Agendar auditoría"),
      href: "https://cal.com/diegovillagran/infrastructure",
      type: "primary",
      target: "_blank",
    },
    secondary: {
      label: l("Request SLO checklist", "Solicitar checklist de SLOs"),
      href: "mailto:diegovillasal@gmail.com?subject=Checklist%20SLO%20DevOps",
      type: "ghost",
    },
    note: l("I partner with at most 2 teams in parallel to maintain operational focus.", "Trabajo con máximo 2 equipos en paralelo para mantener foco operativo."),
    slots: [
      l("Week of Nov 18: booked", "Semana del 18 nov: completo"),
      l("Week of Nov 25: 1 spot", "Semana del 25 nov: 1 cupo"),
    ],
  },
};
