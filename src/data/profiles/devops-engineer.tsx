import { Icons } from "@/components/icons";
import { ProfileData } from "./types";

export const devopsEngineerProfile: ProfileData = {
  summary: "Engineer with hands-on experience designing and operating containerized services, CI/CD pipelines, observability, and operational automation. Achieved 99.5% uptime across 8+ services with Docker Compose, improved deployment time by 50% with automated pipelines, and reduced recovery time from 2 hours to 15 minutes with a 3-2-1 backup strategy. Seeking a DevOps role focused on platform reliability, scalability, and developer velocity.",

  summaryEs: "Ingeniero con experiencia práctica diseñando y operando servicios en contenedores, pipelines CI/CD, observabilidad y automatización operacional. Logré 99.5% de tiempo de actividad en 8+ servicios con Docker Compose, mejoré el tiempo de despliegue en 50% con pipelines automatizados, y reduje el tiempo de recuperación de 2 horas a 15 minutos con una estrategia de backup 3-2-1. Buscando un rol DevOps enfocado en confiabilidad de plataforma, escalabilidad y velocidad de desarrollo.",

  highlightedSkills: [
    "Docker",
    "Kubernetes",
    "Git",
    "GitHub",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Python",
    "Linux",
    "Nginx",
    "AmazonAWS",
    "Azure"
  ],

  work: [
    {
      company: "Eyenet",
      href: "https://eyenet.com",
      badges: ["Internship", "Remote", "Full-time"],
      location: "Remote",
      title: "AI & Automation Intern",
      logoUrl: "/img/eyenet.webp",
      start: "April 2025",
      end: "Present",
      description: "Built CI/CD pipelines and proactive monitoring/alerting, reducing deployment time by 50% and preventing 95%+ of incidents before production. Designed and operated containerized data services with PostgreSQL, Redis, and MongoDB, scaling to 10K+ daily requests with health checks and resource limits. Automated data workflows with Python and orchestration to process 300+ documents per day with 92% extraction accuracy. Implemented backup and restore procedures and playbooks to accelerate recovery and reduce operational toil.",
    },
  ],

  projects: [
    {
      title: "Microservices Orchestration & Monitoring",
      href: "#",
      dates: "2025",
      active: true,
      role: "DevOps",
      description: "Deployed 8+ services (PostgreSQL, Redis, Nginx, APIs) using Docker Compose with automated health checks, achieving 99.5% uptime. Implemented 3-2-1 backups with pg_dump and rsync, reducing recovery time from 2 hours to 15 minutes. Built observability stack with Grafana and Prometheus tracking 25+ metrics; performed load testing with Apache Bench to reduce latency by 40%.",
      technologies: ["Docker", "Grafana", "Prometheus", "PostgreSQL", "Redis", "Nginx"],
      links: [],
      image: {
        src: "/img/microservices.webp",
      },
    },
    {
      title: "Qalma - Reliable Data Platform",
      href: "https://github.com/dvillagrans/qalma",
      dates: "2025",
      active: true,
      role: "Infrastructure",
      description: "Designed cloud data infrastructure on Supabase/PostgreSQL with 99.9% uptime and automated maintenance tasks. Hardened services with containerization, network reverse proxy (Nginx), and runtime monitoring.",
      technologies: ["Docker", "Supabase", "PostgreSQL", "Nginx", "Monitoring"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/qalma",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/qalma.webp",
      },
    },
    {
      title: "Code Master - Platform Reliability",
      href: "https://codemaster-two.vercel.app",
      dates: "Nov 2024 - Current",
      active: true,
      role: "DevOps",
      description: "Implemented CI/CD pipeline with Vercel achieving 99.9% uptime for Django backend supporting 10k+ users. Automated deployment workflows and monitoring for gamified coding education platform.",
      technologies: ["Django", "Vercel", "CI/CD", "Monitoring"],
      links: [
        {
          type: "Website",
          href: "https://codemaster-two.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dvillagrans/Code-Master",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/codemaster.webp",
      },
    },
  ],

  relevantCertifications: [
    "Manage Kubernetes in Google Cloud",
    "Build a Data Warehouse with BigQuery",
    "Engineer Data for Predictive Modeling with BigQuery ML",
    "Google AI Essentials",
  ],
};
