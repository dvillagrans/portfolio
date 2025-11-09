import { Icons } from "@/components/icons";
import { ProfileData } from "./types";

export const dataAnalystProfile: ProfileData = {
  summary: "Data Analyst with strong SQL, data cleaning, and dashboarding skills. Experience turning unstructured data into analysis-ready tables and building automated datasets for reporting. Comfortable with A/B testing, statistical analysis, and KPIs to drive decisions. Built pipelines that process 300+ documents per day with 92% accuracy and dashboards tracking 25+ operational metrics. Seeking an analyst role focused on impact through clear, reliable insights.",

  summaryEs: "Analista de Datos con sólidas habilidades en SQL, limpieza de datos y creación de dashboards. Experiencia convirtiendo datos no estructurados en tablas listas para análisis y construyendo datasets automatizados para reportes. Cómodo con pruebas A/B, análisis estadístico y KPIs para impulsar decisiones. Construí pipelines que procesan 300+ documentos por día con 92% de precisión y dashboards rastreando 25+ métricas operacionales. Buscando un rol de analista enfocado en impacto a través de insights claros y confiables.",

  highlightedSkills: [
    "SQL",
    "PostgreSQL",
    "Python",
    "Pandas",
    "Numpy",
    "Matplotlib",
    "Seaborn",
    "Power BI",
    "Excel",
    "Git"
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
      description: "Built automated ingestion to transform 300+ documents per day into structured tables; achieved 92% extraction accuracy and reduced manual work by 65%. Designed SQL datasets and views for reporting on PostgreSQL and MongoDB; improved time-to-insight for operational stakeholders. Implemented KPIs and monitoring for data freshness, error rates, and throughput; detected 95%+ issues before production impact. Integrated external APIs (OpenAI, Gemini) to enrich datasets and standardize text fields for analytics.",
    },
  ],

  projects: [
    {
      title: "NYC Ride-Hailing Analytics Dashboard",
      href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
      dates: "June 2025",
      active: true,
      role: "Data Analyst",
      description: "Comprehensive interactive dashboard built with Streamlit for analyzing Uber and Lyft trip patterns, revenue, and geographic distribution in NYC. Features advanced visualizations including heat maps, 3D PyDeck maps, and real-time analytics across 8 specialized tabs covering peak hours, accessibility services, and competitive analysis.",
      technologies: ["Streamlit", "Python", "Pandas", "Plotly", "SQL"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/nyc-ridehailing-dashboard.webp",
      },
    },
    {
      title: "Dashboard of Population by Continent",
      href: "https://github.com/dvillagrans/population-dashboard",
      dates: "Feb 2025",
      active: false,
      role: "Data Analyst",
      description: "Developed interactive Dashboard with Power BI to analyze population trends, demographic shifts, and continental comparisons with dynamic filtering and drill-down capabilities.",
      technologies: ["Power BI", "DAX", "Data Modeling", "SQL"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/population-dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/dash-population.webp",
      },
    },
    {
      title: "Global Health Analytics Dashboard",
      href: "https://github.com/dvillagrans/health-analytics-dashboard",
      dates: "Feb 2025",
      active: false,
      role: "Data Analyst",
      description: "Built comprehensive health analytics dashboard analyzing life expectancy trends and infant mortality rates across 195+ countries. Features correlation analysis, time-series forecasting, and socioeconomic factor integration.",
      technologies: ["Power BI", "Statistical Analysis", "Data Modeling", "DAX"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/health-analytics-dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/dash-esperanzavida-mortalidad.webp",
      },
    },
    {
      title: "Video Game Market Intelligence Dashboard",
      href: "https://github.com/dvillagrans/videogames-dashboard",
      dates: "Jan 2025",
      active: false,
      role: "Data Analyst",
      description: "Created interactive Power BI dashboard analyzing $60B global gaming market. Integrated sales data from 15 platforms, enabling product strategy insights through genre trends and regional performance analytics.",
      technologies: ["Power BI", "DAX", "ETL", "Data Analysis"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/videogames-dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/dash-videojuegos.webp",
      },
    },
    {
      title: "Dashboard Financial",
      href: "https://github.com/dvillagrans/Dashboard-Financial",
      dates: "February 2024 - March 2024",
      active: false,
      role: "Data Analyst",
      description: "Designed automated financial reporting system using Excel VBA, reducing manual processing time by 15 hours/week. Featured dynamic P&L visualizations, cash flow forecasting modules, and KPI tracking for 200+ branch locations.",
      technologies: ["Excel", "VBA", "Dashboard", "Data Analysis"],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/Dashboard-Financial",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "https://i.postimg.cc/P5n0R86g/Dasboard.png",
      },
    },
  ],

  relevantCertifications: [
    "Build a Data Warehouse with BigQuery",
    "Engineer Data for Predictive Modeling with BigQuery ML",
    "Google AI Essentials",
    "Python for Data Science, AI & Development",
  ],
};
