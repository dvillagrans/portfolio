import { Icons } from "@/components/icons";
import { ProfileData } from "./types";

export const dataEngineerProfile: ProfileData = {
  summary: "Data Science student with hands-on experience building ETL pipelines, orchestration workflows, and automated data integration systems in production environments. Skilled in SQL optimization, Python-based data processing, and containerized data infrastructure handling 300+ daily inputs and 10K+ service requests. Strong foundation in data modeling, batch processing, and monitoring for reliability at scale. Currently expanding into enterprise ETL tools such as Ab Initio.",

  summaryEs: "Estudiante de Ciencia de Datos con experiencia práctica construyendo pipelines ETL, flujos de orquestación y sistemas automatizados de integración de datos en entornos de producción. Experto en optimización SQL, procesamiento de datos basado en Python e infraestructura de datos en contenedores manejando 300+ entradas diarias y 10K+ solicitudes de servicio. Sólida base en modelado de datos, procesamiento por lotes y monitoreo para confiabilidad a escala. Actualmente expandiéndome a herramientas ETL empresariales como Ab Initio.",

  highlightedSkills: [
    "PostgreSQL",
    "SQL",
    "Python",
    "Pandas",
    "MongoDB",
    "Redis",
    "Docker",
    "PySpark",
    "Azure",
    "AmazonAWS",
    "Git",
    "Grafana"
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
      description: "Designed and maintained ETL pipelines using Python and orchestration workflows to process 300+ documents daily with 92% extraction accuracy, transforming unstructured data into PostgreSQL databases. Built data integration workflows connecting OpenAI and Gemini APIs with database systems, automating extraction and transformation of 200+ documents per day. Developed containerized data services with PostgreSQL, Redis, and MongoDB, supporting 5+ services handling 10K+ daily requests with optimized query performance. Implemented CI/CD pipelines and monitoring systems with automated alerts, reducing deployment time by 50% and catching 95%+ of data quality issues before production. Created SQL optimization strategies and database indexing improvements, reducing query response times by 40% (850ms to 510ms).",
    },
  ],

  projects: [
    {
      title: "Qalma - Data Processing Platform for Wellness Analytics",
      href: "https://github.com/dvillagrans/qalma",
      dates: "2025",
      active: true,
      role: "Data Engineering",
      description: "Built real-time data ingestion pipeline processing 256 Hz EEG signal streams from 4 channels with <100ms latency, serving 50+ users. Developed ETL workflows using Python-based data services (Flask/FastAPI) to extract, transform, and load sensor data into PostgreSQL, handling 1K+ daily data points per user. Implemented batch processing jobs for historical data analysis and aggregation, enabling predictive analytics with 85%+ accuracy. Designed cloud data infrastructure with Supabase and PostgreSQL achieving 99.9% uptime, with automated backup strategies using 3-2-1 methodology.",
      technologies: ["Python", "PostgreSQL", "FastAPI", "Docker", "Redis", "Supabase"],
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
      title: "India National Air Quality Intelligence System",
      href: "https://github.com/dvillagrans/india-air-quality-etl",
      dates: "Dec 2024",
      active: false,
      role: "Data Engineer",
      description: "Designed end-to-end ETL pipeline processing 2M+ daily readings from 500+ IoT sensors across India. Implemented cloud-based data architecture using Azure Databricks for spark processing (PySpark) and Jupyter notebooks for anomaly detection models. Transformed raw sensor data into policy-ready insights through PostgreSQL geospatial warehousing and Power BI dashboards with live pollution heatmaps.",
      technologies: ["Azure", "PySpark", "PostgreSQL", "Power BI", "Databricks"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/india-air-quality-etl",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/etl.webp",
      },
    },
    {
      title: "Microservices Data Orchestration & Monitoring",
      href: "#",
      dates: "2025",
      active: true,
      role: "Data Engineering",
      description: "Orchestrated Docker Compose environment with 8+ data services (PostgreSQL, Redis, Nginx, APIs) achieving 99.5% uptime with automated health checks. Built automated backup and recovery system using pg_dump and rsync with 3-2-1 strategy, reducing recovery time from 2 hours to 15 minutes. Designed monitoring infrastructure with Grafana and Prometheus tracking 25+ data pipeline metrics, detecting 95%+ of issues before production impact. Performed load testing and optimization using Apache Bench, improving data throughput and reducing API response time by 40%.",
      technologies: ["Docker", "PostgreSQL", "Redis", "Grafana", "Prometheus", "Nginx"],
      links: [],
      image: {
        src: "/img/microservices.webp",
      },
    },
  ],

  relevantCertifications: [
    "Build a Data Warehouse with BigQuery",
    "Engineer Data for Predictive Modeling with BigQuery ML",
    "Manage Kubernetes in Google Cloud",
    "Google AI Essentials",
  ],
};
