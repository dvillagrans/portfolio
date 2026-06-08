import React from "react";
import { Icons } from "./icons";
import { CodeIcon, HomeIcon, NotebookIcon, PencilLine } from "lucide-react";

export const DATA = {
  name: "Diego Villagran Salazar",
  initials: "DV",
  url: "https://www.dvillagrans.dev/",
  location: "Mexico City, MX",
  locationLink: "",
  description:
    "Data Scientist & Full-Stack Developer.",
  summary:
  "",
  avatarUrl: "/img/optimized/me-128.webp",
  skills: [
    "Python",
    "Pandas",
    "Numpy",
    "Matplotlib",
    "Seaborn",
    "anaconda",
    "Scikit-learn",
    "Tensorflow",
    "Keras",
    "PyTorch",
    "Yolo",
    "PostgreSQL",
    "SQL",
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "AmazonAWS",
    "Azure",
    "googlecloud",
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Astro",
    "Vercel",
    "googlecolab"
  ],
  contact: {
    email: "dvillagrans11@gmail.com",
    tel: "+525572071183",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/dvillagrans",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/dvillagrans",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "#",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },


  projects: [
    {
      title: "Bouquet — Hospitality OS",
      caseStudy: true,
      href: "/projects/bouquet",
      dates: "Jan 2026 – Dec 2026",
      active: true,
      role: "Full-Stack Architect · Thesis Project (ESCOM-IPN 2026-B142)",
      badges: ["Thesis", "Multi-tenant SaaS", "Production-ready", "Team of 2"],
      metrics: [
        { value: "52", label: "KPIs across 3 roles" },
        { value: "3", label: "Role-based dashboards" },
        { value: "<30s", label: "Data refresh latency" }
      ],
      features: [
        { name: "Architecture", value: "Multi-tenant: Chain → Zone → Restaurant with RLS" },
        { name: "Analytics", value: "Apache Spark pipeline with Gold tables + 52 operational KPIs" },
        { name: "Guest Experience", value: "QR menu, real-time orders, split-bill, digital receipt" }
      ],
      description: "Full-stack Hospitality OS for restaurant chain management. Multi-tenant architecture with role-based dashboards (Super Admin, Zone Manager, Branch Manager), real-time order tracking, Apache Spark analytics pipeline, and guest-facing QR menu with digital payments. Thesis project at ESCOM-IPN.",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "PostgreSQL",
        "Prisma 7",
        "Supabase",
        "Apache Spark",
        "Tailwind CSS 4",
        "shadcn/ui",
        "Recharts",
        "GSAP",
        "Framer Motion",
        "Docker",
        "Vercel",
        "Zod",
        "Vercel AI SDK",
        "DeepSeek",
        "OpenAI"
      ],
      links: [
        {
          type: "Landing",
          href: "https://bouquet-psi.vercel.app/",
          icon: <Icons.globe className="size-3" />
        }
      ],
      image: { src: "/img/bouquet.webp" },
      video: ""
    },
    {
      title: "Sports Analytics Platform",
      href: "https://github.com/dvillagrans/analisis-apuestas-futbol",
      dates: "May 2026",
      active: true,
      role: "Full-Stack Dev · AI-Powered Sports Intelligence",
      badges: ["AI", "Monorepo", "Production-ready", "SSE Streaming"],
      metrics: [
        { value: "7", label: "Leagues covered" },
        { value: "$2-3", label: "USD/month operating cost" },
        { value: "<15s", label: "AI analysis via SSE" }
      ],
      features: [
        { name: "AI Engine", value: "DeepSeek Reasoner generates picks with confidence scores, parlays, and transparent reasoning" },
        { name: "Data Pipeline", value: "3 APIs (football-data.org, TheSportsDB, API-Football) with Supabase caching and TTL management" },
        { name: "World Cup 2026", value: "Full bracket visualization with native SVG connector engine — zero external chart libraries" }
      ],
      description: "Personal sports betting analysis platform combining real-time cold stats with AI-generated picks. Monorepo (Turborepo) with Next.js frontend, Express backend, Supabase, and SSE streaming. Covers LaLiga, Premier League, Serie A, Bundesliga, Liga MX, and World Cup 2026. ROI tracking, confidence-based pick history, and parlay builder.",
      technologies: [
        "Turborepo",
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Express",
        "Supabase",
        "PostgreSQL",
        "DeepSeek Reasoner",
        "SSE",
        "Docker",
        "GitHub Actions",
        "Tailwind CSS",
        "Framer Motion",
        "Vercel"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/analisis-apuestas-futbol",
          icon: <Icons.github className="size-3" />
        }
      ],
      image: { src: "/img/sports-analytics.webp" },
      video: ""
    },
    {
      title: "TimeUp",
      caseStudy: true,
      href: "/projects/timeup",
      dates: "2025",
      active: true,
      role: "Founder · Built in 10 weeks",
      badges: ["LIVE", "Multi-tenant SaaS", "Production-ready"],
      metrics: [
        { value: "<500ms", label: "Dashboard" },
        { value: "0", label: "Overbooking" }
      ],
      features: [
        { name: "What it replaces", value: "WhatsApp + Libreta + Excel" },
        { name: "What it enables", value: "Mobile-first operations, Real-time availability" },
        { name: "Performance", value: "Passkeys login, Guided onboarding" }
      ],
      description: "A frictionless time tracking system that modernizes how businesses and employees log hours and calculate payrolls.",
      technologies: [
        "Next.js 16",
        "React 19",
        "TypeScript 5.3",
        "PostgreSQL 15",
        "Prisma 7",
        "Tailwind CSS 4",
        "Turborepo",
        "Vercel",
        "Supabase",
        "NextAuth.js",
        "WebAuthn/Passkeys",
        "WebSockets + Socket.IO",
        "Redis Pub/Sub",
        "Radix UI",
        "Recharts",
        "Web Push API",
        "Docker",
        "Stripe",
        "Resend (Email)",
        "Cypress (E2E Testing)",
        "Jest",
        "ESLint",
        "AWS VPS",
        "GitHub Actions"
      ],
      links: [
        {
          type: "timeup.mx",
          href: "https://timeup.mx",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "negocios.timeup.mx",
          href: "https://negocios.timeup.mx",
          icon: <Icons.globe className="size-3" />
        }
      ],
      image: {
        src: "/img/timeup-mock.webp" // Assuming this or similar exists
      },
      video: ""
    },
    {
      title: "COVID-19 Risk Profiles (Mexico)",
      caseStudy: true,
      href: "https://covid.dvillagrans.dev",
      dates: "2025",
      active: true,
      role: "Data Science · Clustering & Analytics",
      badges: ["Academic", "K-Means", "Fuzzy C-Means", "ESCOM-IPN"],
      metrics: [
        { value: "9", label: "K-Means profiles" },
        { value: "30M+", label: "SSA records" }
      ],
      features: [
        { name: "Scope", value: "Stratified sampling, 17 variables, PCA for viz" },
        { name: "Deliverables", value: "LaTeX report, Next.js portfolio, notebooks" },
        { name: "Impact", value: "Interpretable risk profiles for triage and policy" }
      ],
      description: "Identification of COVID-19 risk profiles from Mexican open health data using K-Means and Fuzzy C-Means. Advanced Data Analytics final project.",
      technologies: [
        "Python",
        "Pandas",
        "scikit-learn",
        "scikit-fuzzy",
        "Jupyter",
        "LaTeX",
        "Next.js",
        "Recharts"
      ],
      links: [
        {
          type: "Dashboard",
          href: "https://covid.dvillagrans.dev",
          icon: <Icons.globe className="size-3" />
        }
      ],
      image: { src: "/img/dashboard-covid-19.webp" },
      video: ""
    },
    {
      title: "NYC Ride-Hailing Analytics Dashboard",
      href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
      dates: "June 2025",
      active: true,
      role: "Data Scientist · End-to-end ML Pipeline",
      description: "Comprehensive interactive dashboard for analyzing Uber and Lyft trip patterns, revenue, and geographic distribution in NYC.",
      badges: ["Machine Learning", "Big Data", "Geospatial"],
      metrics: [
        { value: "0.85+", label: "R² Fare Predict" },
        { value: "92%", label: "Classification" }
      ],
      features: [
        { name: "Models deployed", value: "Fare prediction, Airport trip classification" },
        { name: "Visualizations", value: "Interactive 3D PyDeck maps, dynamic heatmaps" },
        { name: "Scale", value: "Millions of records processed natively" }
      ],
      technologies: [
        "Streamlit",
        "Python",
        "Pandas",
        "Plotly",
        "+7"
      ],
      links: [
        {
          type: "Live app",
          href: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/nyc-ridehailing-dashboard.webp",
      },
      video: "",
    },
    {
      title: "Métodos de Optimización No Lineal",
      href: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal",
      dates: "June 2025",
      active: true,
      role: "Solo Dev · Algorithm Visualizer",
      description: "Interactive web application implementing and explaining main non-linear optimization algorithms with a dynamic interface.",
      badges: ["Math Optimization", "Academic", "Data Viz"],
      metrics: [
        { value: "10+", label: "Algorithms" },
        { value: "0ms", label: "Real-time graphs" }
      ],
      features: [
        { name: "Line Search", value: "Golden Section, Fibonacci, Armijo" },
        { name: "Gradient Descent", value: "Basic, Momentum, Adam, Newton" },
        { name: "Rendering", value: "Mathematical visualizations and step-by-step convergence" }
      ],
      technologies: [
        "Flask",
        "Python",
        "NumPy",
        "+6"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/metodos-optimizacion-no-lineal.webp",
      },
      video: "",
    },
    {
      title: "Matemáticas Avanzadas - Métodos de Optimización",
      href: "https://github.com/dvillagrans/Metodos-de-optimizacion",
      dates: "May 2025",
      active: true,
      role: "Mathematical Optimization",
      description:
        "Flask app to solve linear programming using Simplex, Big M, and Two Phases with Manim-generated mathematical animations and visual insights.",
      technologies: [
        "Flask",
        "Python",
        "Manim",
        "+6"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/Metodos-de-optimizacion",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/metodos-optimizacion.webp",
      },
      video: "",
    },
    {
      title: "Dashboard of Population by Continent",
      href: "https://github.com/dvillagrans/population-dashboard",
      dates: "Feb 2025",
      active: false,
      role: "Data Analyst",
      description:
        "Power BI Dashboard analyzing population trends and dynamic demographic shifts.",
      technologies: [
        "Power BI",
        "DAX",
        "Data Modeling",
        "+2"
      ],
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
      video: "",
    },
    {
      title: "Global Health Analytics: Life Expectancy & Infant Mortality Dashboard",
      href: "https://github.com/dvillagrans/health-analytics-dashboard",
      dates: "Feb 2025",
      active: false,
      role: "Data Analyst",
      description:
        "Health analytics dashboard to analyze life expectancy and infant mortality rates, featuring socioeconomic factor integration.",
      technologies: [
        "Power BI",
        "Statistical Analysis",
        "Data Modeling",
        "+2"
      ],
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
      video: "",
    },
    {
      title: "Video Game Market Intelligence Dashboard",
      href: "https://github.com/dvillagrans/videogames-dashboard",
      dates: "Jan 2025",
      active: false,
      role: "Data Analyst",
      description:
        "Power BI dashboard analyzing global gaming market trends, integrating sales data from major platforms for regional analytics.",
      technologies: [
        "Power BI",
        "DAX",
        "ETL",
        "+2"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/videogames-dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/dash-videojuegos.webp",
      }
    },
    {
      title: "India National Air Quality Intelligence System",
      href: "https://aqi-india.dvillagrans.dev",
      dates: "Dec 2024",
      active: false,
      role: "Data Engineer",
      description:
        "End-to-end ETL pipeline processing 2M+ daily readings. Cloud data architecture using Azure Databricks with Jupyter notebooks for anomaly detection models.",
      technologies: [
        "Azure",
        "PySpark",
        "PostgreSQL",
        "+4"
      ],
      links: [
        {
          type: "Live",
          href: "https://aqi-india.dvillagrans.dev",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: {
        src: "/img/etl.webp",
      },
      video: "",
    },
    {
      title: "Code Master - Interactive Learning Platform",
      href: "https://codemaster-two.vercel.app",
      dates: "Nov 2024 - Current",
      active: true,
      role: "Full-stack Dev",
      description:
        "Gamified coding platform with Django backend. Features code playgrounds and AI-assisted feedback. 2nd place in 2024 EdTech Innovation Awards.",
      technologies: [
        "Django",
        "Astro",
        "JWT",
        "+2"
      ],
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
      video: "",
    },
    {
      title: "Technical Portfolio Platform",
      href: "https://portfolio-pi-vert-92.vercel.app/",
      dates: "July 2024",
      active: true,
      role: "Full-stack Dev",
      description:
        "Performant portfolio using Next.js SSG with perfect Lighthouse scores. Includes project showcases and MDX-based content system.",
      technologies: [
        "Next.js 14",
        "React",
        "TypeScript",
        "+2"
      ],
      links: [
        {
          type: "Website",
          href: "https://www.dvillagrans.dev/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dvillagrans/portfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/portfolio.webp",
      },
      video: "",
    },
    {
      title: "Prediction of the price of houses in Mexico City",
      href: "https://github.com/dvillagrans/Houses-Prices-Prediction",
      dates: "June 2024",
      active: false,
      role: "Data Science",
      description:
        "Machine learning pipeline (Random Forest) predicting property values with 88% R² score. Deployed as a Flask API.",
      technologies: [
        "Scikit-learn",
        "Python",
        "Flask",
        "+2"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/dvillagrans/Houses-Prices-Prediction",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/output-houses.webp",
      },
      video: "",

    },
    {
      title: "Dashboard Financial",
      href: "https://github.com/dvillagrans/Dashboard-Financial",
      dates: "February 2024 -  March 2024",
      active: false,
      role: "Data Analyst",
      description:
        "Automated financial system using Excel VBA, reducing process time by 15 hours/week. Featured P&L visualizations in dashboards.",
      technologies: [
        "VBA",
        "Excel",
        "Dashboard",
        "+1"
      ],
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
      video: "",
    },
    {
      title: "Melari Spa",
      href: "https://melari-spa.vercel.app/",
      dates: "September 2023 - July 2024",
      active: true,
      role: "Full-stack Dev",
      description:
        "Full-stack development of an SEO-optimized wellness platform using Astro, React, and Tailwind CSS with multi-language support.",
      technologies: ["Astro", "React", "Tailwind CSS", "+2"],
      links: [
        {
          type: "Website",
          href: "https://melarispa.com",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "/img/melari.webp",
      },
      video: "",
    },
    {
      title: "Prediction of passengers for mexican airlines",
      href: "https://passenger-volume-prediction-in-mexi.vercel.app/",
      dates: "September 2023 - November 2023",
      active: true,
      role: "Data Science",
      description:
        "Time series predictive models using SARIMA to forecast passenger demand for Mexican airlines with high accuracy.",
      technologies: [
        "Python",
        "Pandas",
        "SARIMA",
        "+3"
      ],
      links: [
        {
          type: "Website",
          href: "https://passenger-volume-prediction-in-mexi.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: {
        src: "https://i.postimg.cc/C1WGbtNq/Airlines-Pre.png",
      },
      video: "/videos/airlines.mp4",
    },
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
      description:
        "Designed and deployed end-to-end automation workflows using n8n and Python, reducing manual processing time by 70%. Implemented AI/ML deployment with OpenAI and Gemini APIs for document processing, achieving 60% reduction in data capture errors. Built production-ready Docker infrastructure with PostgreSQL databases, automated CI/CD pipelines, and Telegram alerting systems. Developed intelligent data processing pipelines using machine learning algorithms, improving accuracy by 45%. Architected scalable microservices architecture with Redis caching and MongoDB integration, handling 10,000+ daily transactions.",
    },
    {
      company: "Spa & Wellness",
      href: "https://www.melarispa.com/",
      badges: ["Freelance", "Remote", "Part-time"],
      location: "Remote",
      title: "Web Developer",
      logoUrl: "/img/melari.webp",
      start: "Nov 2023",
      end: "July 2024",
      description:
        "Creation of a website for a spa in Mexico City, with the purpose of increasing the number of clients and the visibility of the spa.",
    },

  ],

  certifications: [
    {
      name: "Generative AI with LLMs",
      issuer: "AWS + DeepLearning.AI (Coursera)",
      date: "Nov 2024",
      href: "https://coursera.org/share/670b15ffaa93a2b32ef0bc8803b48fa0",
      description: "Especialización en Large Language Models, fine-tuning, RLHF y despliegue en AWS Bedrock.",
    },
    {
      name: "Google AI Essentials V1",
      issuer: "Google (Coursera)",
      date: "Oct 2024",
      href: "https://www.credly.com/badges/1e3dfdbc-ec96-4e7c-a6e6-351eefae2390",
      description: "Fundamentos de IA generativa, prompt engineering y ética de IA.",
    },
    {
      name: "Introduction to Docker",
      issuer: "DataCamp",
      date: "Oct 2024",
      href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/987dd238b61eaad76c0784e8bed1511c3eba9e78",
      description: "Fundamentos de contenedores Docker, DevOps y CI/CD.",
    },
    {
      name: "GitHub Actions",
      issuer: "GitHub",
      date: "Sep 2024",
      description: "Automatización de flujos CI/CD con GitHub Actions y DevOps.",
    },
    {
      name: "Docker & Docker Compose",
      issuer: "Udemy",
      date: "Aug 2024",
      description: "Curso práctico de Docker, contenedores y orquestación con Docker Compose.",
    },
    {
      name: "Intermediate SQL",
      issuer: "DataCamp",
      date: "Jun 2024",
      href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/9513ed23df423a9d3cc9dbdaf50e3e801f0e2541",
      description: "SQL intermedio: joins, subconsultas, agregaciones y optimización de queries.",
    },
    {
      name: "Google Cloud Computing Foundations",
      issuer: "Google Cloud",
      date: "May 2023",
      href: "https://www.credly.com/badges/93bc9ccd-a8c6-4dca-b2e3-2b4d483beefe",
      description: "Cloud Computing, GCP, infraestructura y servicios cloud fundamentales.",
    },
    {
      name: "Base de Datos Oracle",
      issuer: "Oracle",
      date: "Mar 2023",
      description: "Fundamentos de bases de datos Oracle, SQL, PostgreSQL y diseño de bases de datos.",
    },
    {
      name: "Data Science en Python + ChatGPT",
      issuer: "Udemy",
      date: "Jan 2023",
      href: "https://www.udemy.com/certificate/UC-f5d5c1ca-020e-4281-aef7-cb02cb25d01d/",
      description: "Curso de data science en Python con integración de ChatGPT para productividad.",
    },
    {
      name: "Fundamentos de Docker",
      issuer: "Coursera",
      date: "Jan 2023",
      description: "Introducción a Docker, contenedores y pipelines CI/CD.",
    },
  ],
  education: [
    {
      school: "Escuela Superior de Computo",
      href: "https://www.escom.ipn.mx/",
      degree: "Data Science",
      logoUrl: "/img/escom.webp",
      start: "2022",
      end: "Expected 2026",
    },
    {
      school: "Centro de Estudios Cientificos y Tecnologicos No. 9 Juan de Dios Batiz",
      href: "https://www.cecyt9.ipn.mx/",
      degree: "Technician in Programming",
      logoUrl: "/img/batiz.webp",
      start: "2019",
      end: "2022",
    },
  ],

} as const;
