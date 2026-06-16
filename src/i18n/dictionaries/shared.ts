import type {
  NavDict,
  HeroDict,
  WorkDict,
  MarqueeDict,
  SystemsDict,
  PhilosophyDict,
  StackDict,
  AboutDict,
  ArchiveDict,
  ContactDict,
  ColophonDict,
  NowDict,
} from "../types";

export type {
  NavDict,
  HeroDict,
  WorkDict,
  MarqueeDict,
  SystemsDict,
  PhilosophyDict,
  StackDict,
  AboutDict,
  ArchiveDict,
  ContactDict,
  ColophonDict,
  NowDict,
} from "../types";

export const sharedEn = {
  nav: { projects: "Projects", systems: "Capabilities", contact: "Contact", about: "About" },
  hero: {
    eyebrow: "AI & Data Engineer",
    title1: "Production ML systems",
    title2: "and AI automation.",
    subtitle: "I build infrastructure that ships — document pipelines, LLM agents, data platforms, and full-stack product surfaces.",
    focusLine: "Client work · research · 10K+ daily requests in production",
    cta: "View case studies",
    downloadCv: "Download CV",
    scrollHint: "Scroll to featured work",
  },
  work: {
    title: "Featured Projects",
    subtitle: "Production systems · measurable outcomes · 2024—2026",
    labelScope: "Problem",
    labelSystem: "Solution",
    labelOutcome: "Impact",
    labelRole: "My role",
    labelStack: "Stack",
    labelEvidence: "Product",
    inspect: "View details",
    projects: [
      {
        id: "00",
        type: "hero" as const,
        context: "Client project",
        category: "AI automation platform",
        title: "EyeNet",
        subtitle: "Document automation with AI agents, ETL pipelines, and containerized microservices.",
        problem: "Operations spent most of the week manually processing documents from email, webhooks, and uploads — with no shared schema or audit trail.",
        system: "Schema-first ingestion (n8n, FastAPI), private GPU inference, sub-agent routing, and parallel delivery to PDF, Drive, and ops alerts.",
        outcome: "Production system handling 10K+ daily requests with partial NDA.",
        role: "Architecture · Backend · AI agents · Infra · Deploy",
        image: "/img/microservices.webp",
        tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"],
        metrics: [
          { value: "65%", label: "less manual work" },
          { value: "300+", label: "docs processed / week" },
          { value: "10K+", label: "daily requests" },
          { value: "92%", label: "extraction accuracy" }
        ],
        date: "April 2025 - Present",
        location: "Remote",
        links: [],
        href: "/projects/eyenet"
      },
      {
        id: "01",
        type: "grid" as const,
        context: "Research",
        category: "Public health analytics",
        title: "COVID-19 Risk Profiles",
        subtitle: "Clustering 30M+ open health records to surface ICU risk patterns.",
        problem: "Hospitals needed interpretable risk groups from massive open datasets — not another black-box score.",
        system: "K-Means and Fuzzy C-Means on stratified samples with a reproducible notebook-to-dashboard pipeline.",
        outcome: "9 interpretable risk profiles with documented limitations and a public dashboard.",
        role: "ML pipeline · Analysis · Dashboard · Next.js",
        image: "/img/dashboard-covid-19.webp",
        tags: ["Python", "K-Means", "Fuzzy C-Means", "Next.js"],
        metrics: [
          { value: "30M+", label: "records analyzed" },
          { value: "9", label: "risk profiles" }
        ],
        links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }],
        href: "https://covid.dvillagrans.dev",
        caseStudy: "https://covid.dvillagrans.dev"
      },
      {
        id: "02",
        type: "grid" as const,
        context: "Analytics product",
        category: "Mobility / forecasting",
        title: "NYC Ride-Hailing Analytics",
        subtitle: "Operational dashboards and ML models for Uber/Lyft trip and fare patterns.",
        problem: "Stakeholders lacked reliable, explainable insights across trip patterns, airport pricing, and demand peaks.",
        system: "Streamlit platform with geospatial dashboards, fare regression, and airport trip classification models.",
        outcome: "Fare prediction R² > 0.85 and airport classification at 92% accuracy — deployed as live dashboard.",
        role: "Data science · Streamlit · ML models · Geospatial viz",
        image: "/img/nyc-ridehailing-dashboard.webp",
        tags: ["Streamlit", "Scikit-learn", "Python", "Geospatial"],
        metrics: [
          { value: "R² .85", label: "fare prediction" },
          { value: "92%", label: "classification acc." }
        ],
        links: [
          { label: "Live dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" },
          { label: "Code", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" }
        ],
        href: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/",
      },
      {
        id: "03",
        type: "wide" as const,
        context: "Data platform",
        category: "IoT / environmental data",
        title: "India Air Quality Intelligence",
        subtitle: "Cloud ETL consolidating 500+ sensor streams into policy-ready indicators.",
        problem: "Air quality data from hundreds of IoT sensors arrived fragmented — unusable for public-health decisions.",
        system: "Azure Databricks + PySpark ingestion, PostgreSQL serving layer, and Power BI operational views.",
        outcome: "2M+ daily records normalized into consistent AQI and health indicators.",
        role: "Data engineering · PySpark · Cloud architecture · Analytics",
        image: "/img/india-air-quality.webp",
        tags: ["Azure", "PySpark", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "daily records" },
          { value: "500+", label: "IoT sensors" }
        ],
        links: [
          { label: "Live view", url: "https://aqi-india.dvillagrans.dev" },
          { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" }
        ],
        href: "https://aqi-india.dvillagrans.dev",
      }
    ]
  },
  marquee: {
    ariaLabel: "Bridge from featured projects to capabilities",
    segments: [
      { text: "Every project shares one foundation" },
      { text: " · " },
      { text: "ML pipelines", warm: true },
      { text: " · " },
      { text: "data engineering" },
      { text: " · " },
      { text: "analytics products", warm: true },
      { text: " · " },
      { text: "production platforms" },
      { text: " · " },
    ],
  },
  systems: {
    eyebrow: "Capabilities",
    title: "How I ship systems",
    subtitle: "Four layers I combine on every engagement — hover or tap to explore each one.",
    labelCapability: "Capability",
    labelUsedIn: "Built in",
    hintHover: "Hover to explore",
    hintTap: "Tap to explore",
    railTop: "Product",
    railBottom: "Data",
    items: [
      {
        title: "Machine Learning Pipelines",
        summary: "Training, evaluation, and production deployment with monitoring.",
        description: "End-to-end orchestration: from EEG signal processing and feature engineering to production-ready LLM clusters and model deployment.",
        usedIn: ["EyeNet", "COVID Risk Profiles"],
        tags: ["Scikit-learn", "PyTorch", "MLflow", "GPU Clusters"]
      },
      {
        title: "Data Engineering & Infrastructure",
        summary: "ETL, orchestration, and infra that survives real load.",
        description: "ETL pipelines with PySpark and SQL, automated with n8n and Grafana, backed by Redis and high-performance GPU clusters.",
        usedIn: ["EyeNet", "India Air Quality"],
        tags: ["PySpark", "Redis", "n8n", "Docker"]
      },
      {
        title: "Analytics Products",
        summary: "Dashboards and models stakeholders can actually use.",
        description: "High-accuracy decision systems and predictive dashboards built with FastAPI, Streamlit and Power BI for real-world impact.",
        usedIn: ["NYC Ride-Hailing", "COVID Risk Profiles"],
        tags: ["FastAPI", "Streamlit", "Power BI", "SQL"]
      },
      {
        title: "Scalable Web Platforms",
        summary: "Full-stack interfaces wired to AI and data backends.",
        description: "Modern full-stack ecosystems using Next.js, React, and TypeScript, optimized for high performance and seamless AI integrations.",
        usedIn: ["EyeNet", "COVID Dashboard"],
        tags: ["Next.js", "TypeScript", "Vercel", "Tailwind"]
      }
    ]
  },
  philosophy: {
    eyebrow: "Working principles",
    title: "How I think",
    subtitle: "Three rules I apply on every production system — after the demos are over.",
    quote: "\"I don't build demos. I build systems that survive Monday morning.\"",
    quoteBy: "Diego Villagran",
    labelPrinciple: "Principle",
    hintHover: "Hover to read more",
    hintTap: "Tap to read more",
    readMore: "Full principle",
    closure: "Practical systems, measurable outcomes, production from day one.",
    items: [
      {
        title: "Ship the pipeline, not the notebook",
        summary: "Notebooks prototype. Pipelines with monitoring, alerts, and rollback are products.",
        description: "A Jupyter notebook is a prototype. A pipeline with monitoring, alerting, and a rollback plan is a product. I optimize for the person who gets paged at 3 AM, not the one clapping at the demo."
      },
      {
        title: "Infrastructure is a feature",
        summary: "Deploy speed, observability, and GPU utilization are first-class engineering work.",
        description: "Fast models mean nothing if your deployment takes 45 minutes and your GPU cluster idles at 12%. I treat provisioning, orchestration, and cost control as first-class engineering problems."
      },
      {
        title: "Explain it to the CEO or it didn't happen",
        summary: "If stakeholders can't understand the output, the model is broken — regardless of accuracy.",
        description: "If a stakeholder can't understand why the model made that decision, the model is broken — regardless of its accuracy. Clarity is not documentation. Clarity is design."
      }
    ]
  },
  stack: {
    eyebrow: "Technical stack",
    title: "Tools in production",
    subtitle: "Every tool maps to real portfolio work — hover or tap to see where it shows up.",
    hintHover: "Hover a tool to see projects",
    hintTap: "Tap a tool to see projects",
    labelUsedIn: "Used in",
    labelExploration: "Research & prototypes",
    explorationNote:
      "{tool} isn't on a featured case study, but it's part of my day-to-day stack for R&D and internal builds.",
    emptyTitle: "Pick a tool",
    emptyHint: "Select any tool from the bands above to see the featured projects that use it.",
    projectOne: "featured project",
    projectMany: "featured projects",
    bands: {
      dataScience: "Data science & AI",
      infrastructure: "Infrastructure & cloud",
      platform: "Platform & product",
      core: "Core tooling",
    },
    tools: [
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "LLaMA / Mistral",
      "OpenAI API",
      "Gemini",
      "PySpark",
      "SQL",
      "PostgreSQL",
      "Redis",
      "n8n",
      "Power BI",
      "Grafana",
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
    subtitle: "AI & Data Engineer · ML Systems Builder",
    intro: "I build intelligent systems that go from raw data to production — ML pipelines, LLM automation, and scalable infrastructure that teams can actually trust and ship with. Currently studying Data Science at ESCOM-IPN while working full-time on AI automation at EyeNet and managing a private GPU cluster for open-source LLM deployment.",
    introHighlights: [
      "ML pipelines",
      "LLM automation",
      "scalable infrastructure",
      "ESCOM-IPN",
      "EyeNet",
      "GPU cluster",
    ],
    meta: {
      locationLabel: "Based in",
      locationValue: "Mexico City",
      statusLabel: "Status",
      statusValue: "Open to work",
      roleLabel: "Role",
      studyingLabel: "Studying",
      studyingValue: "ESCOM-IPN",
    },
    metrics: [
      { value: "10K+", label: "Daily requests handled" },
      { value: "2M+", label: "Records processed" },
      { value: "4+", label: "Production systems deployed" }
    ],
    sections: {
      systems: {
        title: "01 // How I build systems",
        content: "End-to-end: define the problem, engineer the data pipeline, train and validate the model, deploy with monitoring. I don't hand off — I own the full stack from ingestion to the interface where someone makes a decision."
      },
      optimization: {
        title: "02 // What I optimize for",
        items: [
          { label: "Accuracy with explainability", desc: "Strong metrics matter, but outputs need to be understandable to the people acting on them." },
          { label: "Automation with control", desc: "I automate workflows while keeping visibility, alerting, and quality checks in place." },
          { label: "Scalable foundations", desc: "Systems that keep working as data volume, users, and complexity grow." }
        ]
      },
      decisions: {
        title: "03 // Current focus",
        items: [
          { title: "AI & Automation at EyeNet", desc: "Building document processing pipelines with LLMs, n8n, and containerized microservices handling 10K+ daily requests." },
          { title: "Private GPU Cluster", desc: "Deploying and benchmarking open-source models (LLaMA, Mistral) for internal company AI projects — evaluating performance vs. cost vs. proprietary APIs." },
          { title: "Analytics products with measurable value", desc: "Dashboards and decision systems that shorten time-to-insight for real operational decisions." }
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
        title: "InfraPilot — Network Infrastructure Manager",
        domain: "Networking / NETCONF / 6WIND",
        links: [],
        description: "Web platform for managing 6WIND network devices. Real-time metrics via Telegraf + InfluxDB, BGP/CGNAT monitoring, and NETCONF-based configuration with checkpoints and rollback.",
        technologies: ["React", "NETCONF", "InfluxDB", "Grafana", "PostgreSQL"],
        metrics: [
          { value: "5", label: "Dashboards" },
          { value: "4", label: "CGNAT tabs" }
        ]
      },
      {
        year: "2026",
        title: "Qalma — Personal Wellness Agent",
        domain: "AI / Wellness / React Native",
        links: [],
        description: "Personal wellness agent with EEG integration (Muse, Flowtime) and Apple HealthKit. Hypothesis-first approach — agent proposes, user validates.",
        technologies: ["React Native", "Claude API", "Supabase", "EEG", "HealthKit"],
        metrics: [
          { value: "6", label: "Agent tools" },
          { value: "4", label: "Phases" }
        ]
      },
      {
        year: "2026",
        title: "RAG Conversacional CIC",
        domain: "AI / Multi-Agent / RAG",
        links: [],
        description: "Multi-agent RAG system for graduate students at CIC-IPN. Agents specialize in state-of-the-art, prior works, and research using Bloom's taxonomy. Generates LaTeX protocol drafts.",
        technologies: ["FastAPI", "DeepSeek", "pgvector", "Supabase", "LaTeX"],
        metrics: [
          { value: "5+", label: "Agents" },
          { value: "Bloom", label: "Taxonomy" }
        ]
      },
      {
        year: "2026",
        title: "Bouquet — Hospitality OS",
        domain: "Full Stack / Multi-tenant SaaS",
        isFeatured: true,
        caseStudy: "/projects/bouquet",
        links: [
          { label: "bouquet-psi.vercel.app", url: "https://bouquet-psi.vercel.app/" }
        ],
        description: "Multi-tenant Hospitality OS for restaurant chains with role-based dashboards, Apache Spark analytics pipeline, and guest-facing QR menu with digital payments.",
        technologies: ["Next.js 16", "Prisma 7", "Supabase", "Apache Spark", "Docker"],
        metrics: [
          { value: "52", label: "KPIs" },
          { value: "3", label: "Dashboards" }
        ]
      },
      {
        year: "2026",
        title: "Sports Analytics Platform",
        domain: "IA / Inteligencia Deportiva",
        links: []
      },
      {
        year: "2026",
        title: "ARIA — Personal AI OS",
        domain: "IA / PWA / RAG",
        links: []
      },
      {
        year: "2026",
        title: "ARIA — Personal AI OS",
        domain: "AI / PWA / RAG",
        links: []
      },
      {
        year: "2026",
        title: "ARIA — Personal AI OS",
        domain: "AI / PWA / RAG",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/ARIA" }
        ],
        description: "Personal AI operating system as a PWA with natural language capture, automatic classification, RAG memory via 4096-dim embeddings, and study tools.",
        technologies: ["Next.js 16", "FastAPI", "Supabase", "pgvector", "DeepSeek"],
        metrics: [
          { value: "7", label: "Intent types" },
          { value: "229", label: "Tests" }
        ]
      },
      {
        year: "2025",
        title: "EyeNet — AI & Automation Systems",
        domain: "AI / Automation",
        isFeatured: true,
        caseStudy: "/projects/eyenet",
        links: [],
        description: "Full automation infrastructure with LLMs, ETL/ELT pipelines, containerized microservices, and production web/mobile apps handling 10K+ daily requests.",
        technologies: ["Python", "n8n", "Docker", "FastAPI", "OpenAI"],
        metrics: [
          { value: "10K+", label: "Daily requests" },
          { value: "65%", label: "Less manual work" }
        ]
      },
      {
        year: "2025",
        title: "TimeUp // Time Tracking SaaS",
        domain: "SaaS / Full Stack",
        isFeatured: true,
        caseStudy: "/projects/timeup",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ],
        description: "Frictionless time tracking system modernizing how businesses log hours and calculate payrolls. Multi-tenant SaaS with real-time availability and Passkeys login.",
        technologies: ["Next.js 16", "Prisma 7", "Supabase", "PostgreSQL", "Docker"],
        metrics: [
          { value: "<500ms", label: "Dashboard" },
          { value: "0", label: "Overbooking" }
        ]
      },
      {
        year: "2025",
        title: "COVID-19 Risk Profiles (Mexico)",
        domain: "Data Science / Clustering",
        isFeatured: true,
        caseStudy: "https://covid.dvillagrans.dev",
        links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }],
        description: "Identification of COVID-19 risk profiles from 30M+ Mexican open health records using K-Means and Fuzzy C-Means clustering.",
        technologies: ["Python", "scikit-learn", "scikit-fuzzy", "Next.js", "Recharts"],
        metrics: [
          { value: "30M+", label: "Records" },
          { value: "9", label: "Risk profiles" }
        ]
      },
      {
        year: "2025",
        title: "NYC Ride-Hailing Analytics Dashboard",
        domain: "Data Science / Streamlit",
        links: [
          { label: "Dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" },
          { label: "Repo", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" }
        ],
        description: "Interactive dashboard for analyzing Uber and Lyft trip patterns in NYC with fare prediction ML models and geospatial visualizations.",
        technologies: ["Streamlit", "Python", "Scikit-learn", "Plotly", "Pandas"],
        metrics: [
          { value: "R² .85", label: "Fare prediction" },
          { value: "92%", label: "Classification" }
        ]
      },
      {
        year: "2025",
        title: "Métodos de Optimización No Lineal",
        domain: "Optimization / Flask",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" }
        ],
        description: "Interactive web app implementing non-linear optimization algorithms with dynamic visualizations and step-by-step convergence rendering.",
        technologies: ["Flask", "Python", "NumPy"],
        metrics: [
          { value: "10+", label: "Algorithms" }
        ]
      },
      {
        year: "2025",
        title: "Matemáticas Avanzadas - Métodos de Optimización",
        domain: "Optimization / Education",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion" }
        ],
        description: "Flask app solving linear programming with Simplex, Big M, and Two Phases methods, featuring Manim-generated mathematical animations.",
        technologies: ["Flask", "Python", "Manim"],
        metrics: [
          { value: "3", label: "Methods" }
        ]
      },
      {
        year: "2025",
        title: "Population Dashboard",
        domain: "Analytics / Power BI",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/population-dashboard" }
        ],
        description: "Power BI dashboard analyzing population trends and dynamic demographic shifts across continents.",
        technologies: ["Power BI", "DAX", "Data Modeling"],
        metrics: [
          { value: "6", label: "Continents" }
        ]
      },
      {
        year: "2025",
        title: "Global Health Analytics Dashboard",
        domain: "Analytics / Power BI",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/health-analytics-dashboard" }
        ],
        description: "Health analytics dashboard analyzing life expectancy and infant mortality rates with socioeconomic factor integration.",
        technologies: ["Power BI", "Statistical Analysis", "Data Modeling"],
        metrics: [
          { value: "195", label: "Countries" }
        ]
      },
      {
        year: "2025",
        title: "Video Game Market Intelligence",
        domain: "Analytics / Power BI",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/videogames-dashboard" }
        ],
        description: "Power BI dashboard analyzing global gaming market trends with sales data from major platforms for regional analytics.",
        technologies: ["Power BI", "DAX", "ETL"],
        metrics: [
          { value: "5+", label: "Platforms" }
        ]
      },
      {
        year: "2024",
        title: "India Air Quality ETL",
        domain: "Data Engineering / Azure",
        links: [
          { label: "Live", url: "https://aqi-india.dvillagrans.dev" },
          { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" }
        ],
        description: "End-to-end ETL pipeline processing 2M+ daily readings from 500+ IoT sensors using Azure Databricks and PySpark.",
        technologies: ["Azure", "PySpark", "PostgreSQL", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "Daily records" },
          { value: "500+", label: "Sensors" }
        ]
      },
      {
        year: "2024",
        title: "Code Master",
        domain: "EdTech / Full Stack",
        links: [
          { label: "Website", url: "https://codemaster-two.vercel.app" },
          { label: "Repo", url: "https://github.com/dvillagrans/Code-Master" }
        ],
        description: "Gamified coding platform with Django backend, code playgrounds, and AI-assisted feedback. 2nd place in 2024 EdTech Innovation Awards.",
        technologies: ["Django", "Astro", "JWT"],
        metrics: [
          { value: "2nd", label: "EdTech Awards" }
        ]
      },
      {
        year: "2024",
        title: "Technical Portfolio Platform",
        domain: "Web Development / Next.js",
        links: [
          { label: "Website", url: "https://www.dvillagrans.dev/" },
          { label: "Repo", url: "https://github.com/dvillagrans/portfolio" }
        ],
        description: "Performant portfolio using Next.js SSG with perfect Lighthouse scores, project showcases, and MDX-based content system.",
        technologies: ["Next.js 14", "React", "TypeScript"],
        metrics: [
          { value: "100", label: "Lighthouse" }
        ]
      },
      {
        year: "2024",
        title: "Houses Prices Prediction",
        domain: "Machine Learning / Flask",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Houses-Prices-Prediction" }
        ],
        description: "ML pipeline using Random Forest to predict Mexico City property values with 88% R² score, deployed as a Flask API.",
        technologies: ["Scikit-learn", "Python", "Flask"],
        metrics: [
          { value: "88%", label: "R² score" }
        ]
      },
      {
        year: "2024",
        title: "Dashboard Financial",
        domain: "Data Analysis / Excel VBA",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Dashboard-Financial" }
        ],
        description: "Automated financial system using Excel VBA reducing process time by 15 hours/week with P&L visualizations.",
        technologies: ["VBA", "Excel", "Dashboard"],
        metrics: [
          { value: "15h", label: "Saved/week" }
        ]
      },
      {
        year: "2023",
        title: "Melari Spa",
        domain: "Web Development / Astro",
        links: [
          { label: "Website", url: "https://melarispa.com" }
        ],
        description: "SEO-optimized wellness platform built with Astro, React, and Tailwind CSS featuring multi-language support.",
        technologies: ["Astro", "React", "Tailwind CSS"],
        metrics: [
          { value: "SEO", label: "Optimized" }
        ]
      },
      {
        year: "2023",
        title: "Prediction of Passengers for Mexican Airlines",
        domain: "Time Series / Data Science",
        links: [
          { label: "Dashboard", url: "https://passenger-volume-prediction-in-mexi.vercel.app/" },
          { label: "Repo", url: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }
        ],
        description: "Time series predictive models using SARIMA to forecast passenger demand for Mexican airlines with interactive dashboard.",
        technologies: ["Python", "Pandas", "SARIMA"],
        metrics: [
          { value: "SARIMA", label: "Model" }
        ]
      }
    ]
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    subtitle: "Open to AI engineering, data platforms, and full-stack product builds.",
    focusLine: "Freelance · contract · full-time",
    email: "diegovillasal@gmail.com",
    bookSession: "Send a message",
    bookDesc: "Collaborations, roles, or technical questions — I reply within 48 hours.",
    formName: "Your name",
    formEmail: "Your email",
    formMessage: "What are you building?",
    formSubmit: "Send message",
    formLoading: "Sending…",
    formLabel: "Message",
    formSuccess: "Message sent — I'll get back to you shortly.",
    formError: "Something went wrong. Please email directly.",
    labelSocial: "Elsewhere",
    errorRequired: "This field is required",
    errorNameShort: "Name must be at least 2 characters",
    errorEmailInvalid: "Please enter a valid email address",
    errorMessageShort: "Message must be at least 10 characters",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  },
  colophon: {
    fontCredit: "Typography: EB Garamond — designed by Georg Duffner, Rodrigo Fuenzalida",
    deployLabel: "Last deploy",
    scoreLabel: "Lighthouse",
  },
  now: {
    title: "Now",
    subtitle: "What I'm focused on right now",
    lastUpdated: "June 2025",
    sections: [
      { heading: "Current Focus", content: "Building production ML pipelines and LLM automation systems at EyeNet. Managing a private GPU cluster for open-source model deployment (LLaMA, Mistral). Studying Data Science at ESCOM-IPN." },
      { heading: "Recent Learnings", content: "Deep-dive into FBM simplex noise for real-time graphics. Exploring view transition APIs for cinematic web experiences. Optimizing PySpark ETL pipelines for 2M+ daily records." },
      { heading: "What's Next", content: "Expanding the RAG multi-agent system at CIC-IPN. Benchmarking new open-source LLMs against proprietary APIs. Building more interactive data visualization tools." },
    ],
  },
} satisfies {
  nav: NavDict;
  hero: HeroDict;
  work: WorkDict;
  marquee: MarqueeDict;
  systems: SystemsDict;
  philosophy: PhilosophyDict;
  stack: StackDict;
  about: AboutDict;
  archive: ArchiveDict;
  contact: ContactDict;
  colophon: ColophonDict;
  now: NowDict;
};

export const sharedEs = {
  nav: { projects: "Proyectos", systems: "Capacidades", contact: "Contacto", about: "Sobre mí" },
  hero: {
    eyebrow: "Ingeniero de IA y Datos",
    title1: "Sistemas ML en producción",
    title2: "y automatización con IA.",
    subtitle: "Construyo infraestructura que llega a prod — pipelines documentales, agentes LLM, plataformas de datos y producto full-stack.",
    focusLine: "Trabajo cliente · investigación · 10K+ requests diarios en producción",
    cta: "Ver casos de estudio",
    downloadCv: "Descargar CV",
    scrollHint: "Scroll a proyectos destacados",
  },
  work: {
    title: "Proyectos Destacados",
    subtitle: "Sistemas en producción · impacto medible · 2024—2026",
    labelScope: "Problema",
    labelSystem: "Solución",
    labelOutcome: "Impacto",
    labelRole: "Mi rol",
    labelStack: "Stack",
    labelEvidence: "Producto",
    inspect: "Ver detalles",
    projects: [
      {
        id: "00",
        type: "hero" as const,
        context: "Proyecto cliente",
        category: "Plataforma de automatización IA",
        title: "EyeNet",
        subtitle: "Automatización documental con agentes IA, pipelines ETL y microservicios containerizados.",
        problem: "Operaciones dedicaba la mayor parte de la semana a procesar documentos de email, webhooks y cargas manuales — sin schema compartido ni trazabilidad.",
        system: "Ingesta schema-first (n8n, FastAPI), inferencia en cluster GPU privado, routing por sub-agentes y entrega paralela a PDF, Drive y alertas.",
        outcome: "Sistema en producción con 10K+ requests diarios — NDA parcial.",
        role: "Arquitectura · Backend · Agentes IA · Infra · Deploy",
        image: "/img/microservices.webp",
        tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "PostgreSQL", "Redis", "CI/CD"],
        metrics: [
          { value: "65%", label: "menos trabajo manual" },
          { value: "300+", label: "docs procesados / semana" },
          { value: "10K+", label: "requests diarios" },
          { value: "92%", label: "precisión extracción" }
        ],
        date: "Abril 2025 - Presente",
        location: "Remoto",
        links: [],
        href: "/projects/eyenet"
      },
      {
        id: "01",
        type: "grid" as const,
        context: "Investigación",
        category: "Salud pública / analytics",
        title: "Perfiles de Riesgo COVID-19",
        subtitle: "Clustering de 30M+ registros abiertos para patrones de riesgo UCI.",
        problem: "Hospitales necesitaban grupos de riesgo interpretables desde datasets masivos — no otro score caja negra.",
        system: "K-Means y Fuzzy C-Means en muestras estratificadas con pipeline reproducible de notebook a dashboard.",
        outcome: "9 perfiles de riesgo interpretables con limitaciones documentadas y dashboard público.",
        role: "Pipeline ML · Análisis · Dashboard · Next.js",
        image: "/img/dashboard-covid-19.webp",
        tags: ["Python", "K-Means", "Fuzzy C-Means", "Next.js"],
        metrics: [
          { value: "30M+", label: "registros analizados" },
          { value: "9", label: "perfiles de riesgo" }
        ],
        links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }],
        href: "https://covid.dvillagrans.dev",
        caseStudy: "https://covid.dvillagrans.dev"
      },
      {
        id: "02",
        type: "grid" as const,
        context: "Producto analítico",
        category: "Movilidad / forecasting",
        title: "Analytics NYC Ride-Hailing",
        subtitle: "Dashboards operativos y modelos ML para patrones de viaje y tarifas Uber/Lyft.",
        problem: "Stakeholders carecían de insights confiables y explicables sobre patrones de viaje, precios de aeropuerto y picos de demanda.",
        system: "Plataforma Streamlit con dashboards geoespaciales, regresión de tarifas y clasificación de viajes a aeropuerto.",
        outcome: "Predicción de tarifas R² > 0.85 y clasificación de aeropuertos al 92% — dashboard en vivo.",
        role: "Data science · Streamlit · Modelos ML · Viz geoespacial",
        image: "/img/nyc-ridehailing-dashboard.webp",
        tags: ["Streamlit", "Scikit-learn", "Python", "Geospatial"],
        metrics: [
          { value: "R² .85", label: "predicción tarifa" },
          { value: "92%", label: "precisión clasif." }
        ],
        links: [
          { label: "Dashboard en vivo", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" },
          { label: "Código", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" }
        ],
        href: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/",
      },
      {
        id: "03",
        type: "wide" as const,
        context: "Plataforma de datos",
        category: "IoT / datos ambientales",
        title: "IA Calidad del Aire (India)",
        subtitle: "ETL en la nube consolidando 500+ sensores en indicadores listos para política pública.",
        problem: "Datos de calidad del aire de cientos de sensores IoT llegaban fragmentados — inutilizables para decisiones de salud pública.",
        system: "Azure Databricks + ingesta PySpark, capa PostgreSQL y vistas operativas en Power BI.",
        outcome: "2M+ registros diarios normalizados en indicadores AQI y de salud consistentes.",
        role: "Data engineering · PySpark · Arquitectura cloud · Analytics",
        image: "/img/india-air-quality.webp",
        tags: ["Azure", "PySpark", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "registros diarios" },
          { value: "500+", label: "sensores IoT" }
        ],
        links: [
          { label: "Vista en vivo", url: "https://aqi-india.dvillagrans.dev" },
          { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" }
        ],
        href: "https://aqi-india.dvillagrans.dev",
      }
    ]
  },
  marquee: {
    ariaLabel: "Puente entre proyectos destacados y capacidades",
    segments: [
      { text: "Todos los proyectos comparten la misma base" },
      { text: " · " },
      { text: "pipelines ML", warm: true },
      { text: " · " },
      { text: "ingeniería de datos" },
      { text: " · " },
      { text: "productos analíticos", warm: true },
      { text: " · " },
      { text: "plataformas en producción" },
      { text: " · " },
    ],
  },
  systems: {
    eyebrow: "Capacidades",
    title: "Cómo entrego sistemas",
    subtitle: "Cuatro capas que combino en cada proyecto — pasá el cursor o tocá para explorar.",
    labelCapability: "Capacidad",
    labelUsedIn: "Usado en",
    hintHover: "Pasá el cursor para explorar",
    hintTap: "Tocá para explorar",
    railTop: "Producto",
    railBottom: "Datos",
    items: [
      {
        title: "Pipelines de Machine Learning",
        summary: "Entrenamiento, evaluación y despliegue en producción con monitoreo.",
        description: "Orquestación de extremo a extremo: desde procesamiento de señales EEG hasta despliegue de clústeres de LLMs en producción.",
        usedIn: ["EyeNet", "Perfiles COVID-19"],
        tags: ["Scikit-learn", "PyTorch", "MLflow", "Clústeres GPU"]
      },
      {
        title: "Ingeniería de Datos e Infraestructura",
        summary: "ETL, orquestación e infra que aguanta carga real.",
        description: "Pipelines ETL con PySpark y SQL, automatizados con n8n y Grafana, respaldados por Redis y clústeres GPU de alto rendimiento.",
        usedIn: ["EyeNet", "Calidad del Aire India"],
        tags: ["PySpark", "Redis", "n8n", "Docker"]
      },
      {
        title: "Productos de Analítica",
        summary: "Dashboards y modelos que los stakeholders pueden usar.",
        description: "Sistemas de decisión de alta precisión y dashboards predictivos construidos con FastAPI, Streamlit y Power BI.",
        usedIn: ["Analytics NYC", "Perfiles COVID-19"],
        tags: ["FastAPI", "Streamlit", "Power BI", "SQL"]
      },
      {
        title: "Plataformas Web Escalables",
        summary: "Interfaces full-stack conectadas a backends de IA y datos.",
        description: "Ecosistemas full-stack modernos usando Next.js, React y TypeScript, optimizados para integraciones de IA sin fricciones.",
        usedIn: ["EyeNet", "Dashboard COVID"],
        tags: ["Next.js", "TypeScript", "Vercel", "Tailwind"]
      }
    ]
  },
  philosophy: {
    eyebrow: "Principios de trabajo",
    title: "Cómo pienso",
    subtitle: "Tres reglas que aplico en cada sistema en producción — después de la demo.",
    quote: "\"No construyo demos. Construyo sistemas que sobreviven al lunes por la mañana.\"",
    quoteBy: "Diego Villagran",
    labelPrinciple: "Principio",
    hintHover: "Pasá el cursor para leer más",
    hintTap: "Tocá para leer más",
    readMore: "Principio completo",
    closure: "Sistemas prácticos, impacto medible, producción desde el día uno.",
    items: [
      {
        title: "Shippeá el pipeline, no el notebook",
        summary: "Los notebooks prototipan. Los pipelines con monitoreo, alertas y rollback son productos.",
        description: "Un Jupyter notebook es un prototipo. Un pipeline con monitoreo, alertas y un plan de rollback es un producto. Optimizo para la persona a la que le llega la alerta a las 3 AM, no para la que aplaude en la demo."
      },
      {
        title: "La infraestructura es un feature",
        summary: "Velocidad de deploy, observabilidad y uso de GPU son ingeniería de primer nivel.",
        description: "Modelos rápidos no sirven de nada si tu deploy tarda 45 minutos y tu clúster de GPU está al 12% de uso. Trato el provisioning, la orquestación y el control de costos como problemas de ingeniería de primer nivel."
      },
      {
        title: "Explicalo al CEO o no pasó",
        summary: "Si los stakeholders no entienden el output, el modelo está roto — sin importar el accuracy.",
        description: "Si un stakeholder no puede entender por qué el modelo tomó esa decisión, el modelo está roto — sin importar su accuracy. La claridad no es documentación. La claridad es diseño."
      }
    ]
  },
  stack: {
    eyebrow: "Stack técnico",
    title: "Herramientas en producción",
    subtitle: "Cada herramienta conecta con trabajo real del portfolio — pasá el cursor o tocá para ver dónde.",
    hintHover: "Pasá el cursor sobre una herramienta",
    hintTap: "Tocá una herramienta",
    labelUsedIn: "Usado en",
    labelExploration: "Investigación y prototipos",
    explorationNote:
      "{tool} no aparece en un caso destacado, pero forma parte de mi stack diario para I+D y builds internos.",
    emptyTitle: "Elegí una herramienta",
    emptyHint: "Seleccioná cualquier herramienta de las bandas para ver los proyectos destacados que la usan.",
    projectOne: "proyecto destacado",
    projectMany: "proyectos destacados",
    bands: {
      dataScience: "Ciencia de datos e IA",
      infrastructure: "Infraestructura y nube",
      platform: "Plataforma y producto",
      core: "Herramientas base",
    },
    tools: [
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "LLaMA / Mistral",
      "OpenAI API",
      "Gemini",
      "PySpark",
      "SQL",
      "PostgreSQL",
      "Redis",
      "n8n",
      "Power BI",
      "Grafana",
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
    subtitle: "Ingeniero de IA y Datos · Constructor de Sistemas de ML",
    intro: "Construyo sistemas inteligentes que van desde los datos crudos hasta la producción: pipelines de ML, automatización con LLMs e infraestructura escalable en la que los equipos realmente pueden confiar. Actualmente estudio Ciencia de Datos en ESCOM-IPN mientras trabajo a tiempo completo en automatización de IA en EyeNet y gestiono un clúster de GPU privado para el despliegue de LLMs de código abierto.",
    introHighlights: [
      "pipelines de ML",
      "automatización con LLMs",
      "infraestructura escalable",
      "ESCOM-IPN",
      "EyeNet",
      "clúster de GPU",
    ],
    meta: {
      locationLabel: "Desde",
      locationValue: "Ciudad de México",
      statusLabel: "Estado",
      statusValue: "Disponible",
      roleLabel: "Rol",
      studyingLabel: "Estudiando",
      studyingValue: "ESCOM-IPN",
    },
    metrics: [
      { value: "10K+", label: "Solicitudes diarias" },
      { value: "2M+", label: "Registros procesados" },
      { value: "4+", label: "Sistemas en producción" }
    ],
    sections: {
      systems: {
        title: "01 // Cómo construyo sistemas",
        content: "End-to-end: definir el problema, diseñar el pipeline de datos, entrenar y validar el modelo, y desplegar con monitoreo. No hago entregas parciales: soy dueño del stack completo desde la ingesta hasta la interfaz donde alguien toma una decisión."
      },
      optimization: {
        title: "02 // Qué optimizo",
        items: [
          { label: "Precisión con explicabilidad", desc: "Las métricas fuertes importan, pero los resultados deben ser comprensibles para las personas que actúan sobre ellos." },
          { label: "Automatización con control", desc: "Automatizo flujos de trabajo manteniendo visibilidad, alertas y verificaciones de calidad en todo momento." },
          { label: "Fundamentos escalables", desc: "Sistemas que siguen funcionando a medida que crecen el volumen de datos, los usuarios y la complejidad." }
        ]
      },
      decisions: {
        title: "03 // Enfoque actual",
        items: [
          { title: "IA y Automatización en EyeNet", desc: "Construcción de pipelines de procesamiento de documentos con LLMs, n8n y microservicios containerizados que manejan más de 10K solicitudes diarias." },
          { title: "Clúster de GPU Privado", desc: "Despliegue y benchmarking de modelos de código abierto (LLaMA, Mistral) para proyectos internos de IA, evaluando rendimiento vs. costo vs. APIs propietarias." },
          { title: "Productos analíticos con valor medible", desc: "Dashboards y sistemas de decisión que acortan el tiempo de obtención de insights para decisiones operativas reales." }
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
        title: "InfraPilot — Gestor de Infraestructura de Red",
        domain: "Redes / NETCONF / 6WIND",
        links: [],
        description: "Plataforma web para gestión de dispositivos 6WIND en producción. Métricas en tiempo real con Telegraf + InfluxDB, monitoreo BGP/CGNAT, y configuración NETCONF con checkpoints y rollback.",
        technologies: ["React", "NETCONF", "InfluxDB", "Grafana", "PostgreSQL"],
        metrics: [
          { value: "5", label: "Dashboards" },
          { value: "4", label: "Tabs CGNAT" }
        ]
      },
      {
        year: "2026",
        title: "Qalma — Agente de Bienestar Personal",
        domain: "IA / Wellness / React Native",
        links: [],
        description: "Agente de bienestar personal con integración EEG (Muse, Flowtime) y Apple HealthKit. Enfoque de hipótesis primero — el agente propone interpretaciones, el usuario valida.",
        technologies: ["React Native", "Claude API", "Supabase", "EEG", "HealthKit"],
        metrics: [
          { value: "6", label: "Herramientas" },
          { value: "4", label: "Fases" }
        ]
      },
      {
        year: "2026",
        title: "RAG Conversacional CIC",
        domain: "IA / Multi-Agente / RAG",
        links: [],
        description: "Sistema RAG multi-agente para estudiantes de posgrado en el CIC-IPN. Agentes especializados en estado del arte, trabajos previos e investigación usando taxonomía de Bloom. Genera protocolos en LaTeX.",
        technologies: ["FastAPI", "DeepSeek", "pgvector", "Supabase", "LaTeX"],
        metrics: [
          { value: "5+", label: "Agentes" },
          { value: "Bloom", label: "Taxonomía" }
        ]
      },
      {
        year: "2026",
        title: "Bouquet — Hospitality OS",
        domain: "Full Stack / SaaS Multi-tenant",
        isFeatured: true,
        caseStudy: "/projects/bouquet",
        links: [
          { label: "bouquet-psi.vercel.app", url: "https://bouquet-psi.vercel.app/" }
        ],
        description: "Sistema de gestión hotelera multi-tenant para cadenas de restaurantes con dashboards por rol, pipeline de analítica con Apache Spark y menú QR con pagos digitales.",
        technologies: ["Next.js 16", "Prisma 7", "Supabase", "Apache Spark", "Docker"],
        metrics: [
          { value: "52", label: "KPIs" },
          { value: "3", label: "Dashboards" }
        ]
      },
      {
        year: "2026",
        title: "Sports Analytics Platform",
        domain: "IA / Inteligencia Deportiva",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/analisis-apuestas-futbol" }
        ],
        description: "Plataforma de análisis deportivo con IA que combina estadísticas en tiempo real, picks generados por DeepSeek, streaming SSE y visualización del Mundial 2026.",
        technologies: ["Turborepo", "Next.js 16", "Express", "Supabase", "DeepSeek"],
        metrics: [
          { value: "7", label: "Ligas" },
          { value: "$2-3", label: "USD/mes" }
        ]
      },
      {
        year: "2026",
        title: "ARIA — Personal AI OS",
        domain: "IA / PWA / RAG",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/ARIA" }
        ],
        description: "Sistema operativo personal con IA como PWA. Captura en lenguaje natural, clasificación automática, memoria RAG con embeddings de 4096 dimensiones y herramientas de estudio.",
        technologies: ["Next.js 16", "FastAPI", "Supabase", "pgvector", "DeepSeek"],
        metrics: [
          { value: "7", label: "Tipos de intent" },
          { value: "229", label: "Tests" }
        ]
      },
      {
        year: "2025",
        title: "EyeNet — Sistemas de IA y Automatización",
        domain: "IA / Automatización",
        isFeatured: true,
        caseStudy: "/projects/eyenet",
        links: [],
        description: "Infraestructura completa de automatización con LLMs, pipelines ETL/ELT, microservicios containerizados y apps web/móviles en producción con 10K+ requests diarios.",
        technologies: ["Python", "n8n", "Docker", "FastAPI", "OpenAI"],
        metrics: [
          { value: "10K+", label: "Requests diarios" },
          { value: "65%", label: "Menos trabajo manual" }
        ]
      },
      {
        year: "2025",
        title: "TimeUp // SaaS para Control de Tiempos",
        domain: "SaaS / Full Stack",
        isFeatured: true,
        caseStudy: "/projects/timeup",
        links: [
          { label: "timeup.mx", url: "https://timeup.mx" },
          { label: "negocios.timeup.mx", url: "https://negocios.timeup.mx" }
        ],
        description: "Sistema de control de tiempos que moderniza cómo los negocios registran horas y calculan nóminas. SaaS multi-tenant con disponibilidad en tiempo real y login con Passkeys.",
        technologies: ["Next.js 16", "Prisma 7", "Supabase", "PostgreSQL", "Docker"],
        metrics: [
          { value: "<500ms", label: "Dashboard" },
          { value: "0", label: "Sobre-reservas" }
        ]
      },
      {
        year: "2025",
        title: "Perfiles de riesgo COVID-19 (México)",
        domain: "Data Science / Clustering",
        isFeatured: true,
        caseStudy: "https://covid.dvillagrans.dev",
        links: [{ label: "Dashboard", url: "https://covid.dvillagrans.dev" }],
        description: "Identificación de perfiles de riesgo de COVID-19 a partir de más de 30 millones de registros de salud abiertos mexicanos usando K-Means y Fuzzy C-Means.",
        technologies: ["Python", "scikit-learn", "scikit-fuzzy", "Next.js", "Recharts"],
        metrics: [
          { value: "30M+", label: "Registros" },
          { value: "9", label: "Perfiles de riesgo" }
        ]
      },
      {
        year: "2025",
        title: "NYC Ride-Hailing Analytics Dashboard",
        domain: "Data Science / Streamlit",
        links: [
          { label: "Dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" },
          { label: "Repo", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" }
        ],
        description: "Dashboard interactivo para analizar patrones de viaje de Uber y Lyft en NYC con modelos de predicción de tarifas y visualizaciones geoespaciales.",
        technologies: ["Streamlit", "Python", "Scikit-learn", "Plotly", "Pandas"],
        metrics: [
          { value: "R² .85", label: "Predicción tarifa" },
          { value: "92%", label: "Clasificación" }
        ]
      },
      {
        year: "2025",
        title: "Métodos de Optimización No Lineal",
        domain: "Optimización / Flask",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" }
        ],
        description: "App web interactiva que implementa algoritmos de optimización no lineal con visualizaciones dinámicas y renderizado paso a paso de la convergencia.",
        technologies: ["Flask", "Python", "NumPy"],
        metrics: [
          { value: "10+", label: "Algoritmos" }
        ]
      },
      {
        year: "2025",
        title: "Matemáticas Avanzadas - Métodos de Optimización",
        domain: "Optimización / Educación",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion" }
        ],
        description: "App Flask para resolver programación lineal con métodos Simplex, Big M y Dos Fases, con animaciones matemáticas generadas con Manim.",
        technologies: ["Flask", "Python", "Manim"],
        metrics: [
          { value: "3", label: "Métodos" }
        ]
      },
      {
        year: "2025",
        title: "Dashboard de Población por Continente",
        domain: "Analítica / Power BI",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/population-dashboard" }
        ],
        description: "Dashboard de Power BI que analiza tendencias poblacionales y cambios demográficos dinámicos por continente.",
        technologies: ["Power BI", "DAX", "Modelado de datos"],
        metrics: [
          { value: "6", label: "Continentes" }
        ]
      },
      {
        year: "2025",
        title: "Global Health Analytics Dashboard",
        domain: "Analítica / Power BI",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/health-analytics-dashboard" }
        ],
        description: "Dashboard de analítica de salud que analiza esperanza de vida y tasas de mortalidad infantil con integración de factores socioeconómicos.",
        technologies: ["Power BI", "Análisis estadístico", "Modelado de datos"],
        metrics: [
          { value: "195", label: "Países" }
        ]
      },
      {
        year: "2025",
        title: "Video Game Market Intelligence",
        domain: "Analítica / Power BI",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/videogames-dashboard" }
        ],
        description: "Dashboard de Power BI que analiza tendencias del mercado global de videojuegos con datos de ventas de las principales plataformas.",
        technologies: ["Power BI", "DAX", "ETL"],
        metrics: [
          { value: "5+", label: "Plataformas" }
        ]
      },
      {
        year: "2024",
        title: "India Air Quality ETL",
        domain: "Data Engineering / Azure",
        links: [
          { label: "Live", url: "https://aqi-india.dvillagrans.dev" },
          { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" }
        ],
        description: "Pipeline ETL de extremo a extremo que procesa más de 2 millones de lecturas diarias de más de 500 sensores IoT usando Azure Databricks y PySpark.",
        technologies: ["Azure", "PySpark", "PostgreSQL", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "Registros diarios" },
          { value: "500+", label: "Sensores" }
        ]
      },
      {
        year: "2024",
        title: "Code Master",
        domain: "EdTech / Full Stack",
        links: [
          { label: "Website", url: "https://codemaster-two.vercel.app" },
          { label: "Repo", url: "https://github.com/dvillagrans/Code-Master" }
        ],
        description: "Plataforma de programación gamificada con backend Django, playgrounds de código y retroalimentación asistida por IA. 2do lugar en EdTech Innovation Awards 2024.",
        technologies: ["Django", "Astro", "JWT"],
        metrics: [
          { value: "2do", label: "EdTech Awards" }
        ]
      },
      {
        year: "2024",
        title: "Technical Portfolio Platform",
        domain: "Desarrollo Web / Next.js",
        links: [
          { label: "Website", url: "https://www.dvillagrans.dev/" },
          { label: "Repo", url: "https://github.com/dvillagrans/portfolio" }
        ],
        description: "Portfolio de alto rendimiento con Next.js SSG, puntuaciones perfectas en Lighthouse, showcases de proyectos y sistema de contenido basado en MDX.",
        technologies: ["Next.js 14", "React", "TypeScript"],
        metrics: [
          { value: "100", label: "Lighthouse" }
        ]
      },
      {
        year: "2024",
        title: "Predicción de precios de casas",
        domain: "Machine Learning / Flask",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Houses-Prices-Prediction" }
        ],
        description: "Pipeline de ML con Random Forest para predecir valores de propiedades en la Ciudad de México con 88% de R², desplegado como API Flask.",
        technologies: ["Scikit-learn", "Python", "Flask"],
        metrics: [
          { value: "88%", label: "R² score" }
        ]
      },
      {
        year: "2024",
        title: "Dashboard Financial",
        domain: "Análisis de Datos / Excel VBA",
        links: [
          { label: "Repo", url: "https://github.com/dvillagrans/Dashboard-Financial" }
        ],
        description: "Sistema financiero automatizado con Excel VBA que reduce el tiempo de proceso en 15 horas semanales con visualizaciones de P&L.",
        technologies: ["VBA", "Excel", "Dashboard"],
        metrics: [
          { value: "15h", label: "Ahorradas/sem" }
        ]
      },
      {
        year: "2023",
        title: "Melari Spa",
        domain: "Desarrollo Web / Astro",
        links: [
          { label: "Website", url: "https://melarispa.com" }
        ],
        description: "Plataforma de bienestar optimizada para SEO construida con Astro, React y Tailwind CSS con soporte multi-idioma.",
        technologies: ["Astro", "React", "Tailwind CSS"],
        metrics: [
          { value: "SEO", label: "Optimizado" }
        ]
      },
      {
        year: "2023",
        title: "Predicción de pasajeros para aerolíneas mexicanas",
        domain: "Series de tiempo / Data Science",
        links: [
          { label: "Dashboard", url: "https://passenger-volume-prediction-in-mexi.vercel.app/" },
          { label: "Repo", url: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" }
        ],
        description: "Modelos predictivos de series de tiempo usando SARIMA para pronosticar la demanda de pasajeros en aerolíneas mexicanas con dashboard interactivo.",
        technologies: ["Python", "Pandas", "SARIMA"],
        metrics: [
          { value: "SARIMA", label: "Modelo" }
        ]
      }
    ]
  },
  contact: {
    eyebrow: "Contacto",
    title: "Trabajemos juntos",
    subtitle: "Abierto a ingeniería IA, plataformas de datos y producto full-stack.",
    focusLine: "Freelance · contrato · full-time",
    email: "diegovillasal@gmail.com",
    bookSession: "Enviar mensaje",
    bookDesc: "Colaboraciones, roles o consultas técnicas — respondo en 48 horas.",
    formName: "Tu nombre",
    formEmail: "Tu correo",
    formMessage: "¿Qué estás construyendo?",
    formSubmit: "Enviar mensaje",
    formLoading: "Enviando…",
    formLabel: "Mensaje",
    formSuccess: "Mensaje enviado — te contacto pronto.",
    formError: "Hubo un error. Por favor, envía un correo.",
    labelSocial: "Redes",
    errorRequired: "Este campo es obligatorio",
    errorNameShort: "El nombre debe tener al menos 2 caracteres",
    errorEmailInvalid: "Ingresa un correo electrónico válido",
    errorMessageShort: "El mensaje debe tener al menos 10 caracteres",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  },
  colophon: {
    fontCredit: "Tipografía: EB Garamond — diseñada por Georg Duffner, Rodrigo Fuenzalida",
    deployLabel: "Último deploy",
    scoreLabel: "Lighthouse",
  },
  now: {
    title: "Ahora",
    subtitle: "En lo que estoy enfocado ahora mismo",
    lastUpdated: "Junio 2025",
    sections: [
      { heading: "Enfoque Actual", content: "Construyendo pipelines de ML en producción y sistemas de automatización con LLMs en EyeNet. Gestionando un clúster de GPU privado para despliegue de modelos de código abierto (LLaMA, Mistral). Estudiando Ciencia de Datos en ESCOM-IPN." },
      { heading: "Aprendizajes Recientes", content: "Inmersión profunda en ruido simplex FBM para gráficos en tiempo real. Explorando APIs de transiciones de vista para experiencias web cinemáticas. Optimizando pipelines ETL con PySpark para más de 2M registros diarios." },
      { heading: "Qué Sigue", content: "Expandiendo el sistema RAG multi-agente en el CIC-IPN. Evaluando nuevos LLMs de código abierto contra APIs propietarias. Construyendo más herramientas interactivas de visualización de datos." },
    ],
  },
} satisfies {
  nav: NavDict;
  hero: HeroDict;
  work: WorkDict;
  marquee: MarqueeDict;
  systems: SystemsDict;
  philosophy: PhilosophyDict;
  stack: StackDict;
  about: AboutDict;
  archive: ArchiveDict;
  contact: ContactDict;
  colophon: ColophonDict;
  now: NowDict;
};
