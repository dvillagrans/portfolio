export const en = {
  nav: { projects: "Projects", systems: "Capabilities", contact: "Contact", about: "About" },
  hero: {
    title1: "ML pipelines. LLM automation.",
    title2: "Production systems.",
    subtitle1: "Data Science student building real infrastructure —",
    subtitle2: "from EEG signal processing to open-source LLM clusters.",
    cta: "View Projects",
  },
  work: {
    title: "Featured Projects",
    subtitle: "Selected systems // 2024—2025",
    labelScope: "Challenge",
    labelSystem: "Solution",
    labelOutcome: "Impact",
    inspect: "Open Project",
    projects: [
      {
        id: "00",
        type: "special",
        category: "Professional Experience",
        title: "EyeNet — AI & Automation",
        problem: "Full automation infrastructure with LLMs, ETL/ELT pipelines, containerized microservices, AI assistants, and production web/mobile apps.",
        system: "Multi-layered orchestration: Ingestion (APIs, n8n, ETL), Processing (OpenAI, Gemini, Custom LLM Cluster), and Delivery (Docker, Microservices, Apps).",
        outcome: "Production system — Partial NDA",
        image: "eyenet",
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
        href: "#"
      },
      {
        id: "01",
        type: "grid",
        category: "Advanced Analytics / ML",
        title: "COVID-19 Risk Profiles",
        problem: "Identifying multivariate risk patterns in 30M+ open health records for ICU prioritization.",
        system: "K-Means and Fuzzy C-Means on stratified samples; reproducible pipeline from raw data to report.",
        outcome: "Identified 9 interpretable risk profiles with documented limitations and reproducible notebooks.",
        image: "/img/dashboard-covid-19.webp",
        tags: ["Python", "K-Means", "Fuzzy C-Means", "Next.js"],
        metrics: [
          { value: "30M+", label: "records analyzed" },
          { value: "9", label: "risk profiles" }
        ],
        links: [{ label: "Dashboard", url: "https://identificaci-on-de-perfiles-de-ries.vercel.app/" }],
        href: "/projects/covid-perfiles",
        caseStudy: "/projects/covid-perfiles"
      },
      {
        id: "02",
        type: "grid",
        category: "Mobility / Data Viz",
        title: "NYC Ride-Hailing Analytics",
        problem: "Stakeholders needed reliable insights across Uber/Lyft trip patterns and airport pricing.",
        system: "Interactive Streamlit platform with predictive ML models and geospatial operational dashboards.",
        outcome: "Delivered fare prediction (R² > 0.85) and airport classification (92% accuracy).",
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
        type: "wide",
        category: "Data Engineering / ETL",
        title: "India Air Quality Intelligence",
        problem: "Fragmented IoT data from hundreds of sensors needed policy-ready data consolidation.",
        system: "Cloud ETL architecture using Azure Databricks, PySpark, and PostgreSQL for continuous analytics.",
        outcome: "Processed 2M+ daily records from 500+ sensors into consistent health indicators.",
        image: "/img/india-air-quality.webp",
        tags: ["Azure", "PySpark", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "daily records" },
          { value: "500+", label: "IoT sensors" }
        ],
        links: [
          { label: "Live view", url: "https://app.powerbi.com/view?r=eyJrIjoiOTQ4NmZlMjItMDU0YS00YTMxLThkNDEtNWZjYWRmNTM4Njg1IiwidCI6IjY3ZGU4N2FjLWRhYzgtNDYwNy05NGE0LWM4YTM3YmYwMmE2MSIsImMiOjR9" },
          { label: "Documentation", url: "https://dvillagrans.github.io/India-Air-Quality-ETL-Project/" }
        ],
        href: "https://app.powerbi.com/view?r=eyJrIjoiOTQ4NmZlMjItMDU0YS00YTMxLThkNDEtNWZjYWRmNTM4Njg1IiwidCI6IjY3ZGU4N2FjLWRhYzgtNDYwNy05NGE0LWM4YTM3YmYwMmE2MSIsImMiOjR9",
      }
    ]
  },
  systems: {
    title: "Systems & Capabilities",
    items: [
      { 
        title: "Machine Learning Pipelines", 
        description: "End-to-end orchestration: from EEG signal processing and feature engineering to production-ready LLM clusters and model deployment.",
        tags: ["Scikit-learn", "PyTorch", "MLflow", "GPU Clusters"]
      },
      { 
        title: "Data Engineering & Infrastructure", 
        description: "ETL pipelines with PySpark and SQL, automated with n8n and Grafana, backed by Redis and high-performance GPU clusters.",
        tags: ["PySpark", "Redis", "n8n", "Docker"]
      },
      { 
        title: "Analytics Products", 
        description: "High-accuracy decision systems and predictive dashboards built with FastAPI, Streamlit and Power BI for real-world impact.",
        tags: ["FastAPI", "Streamlit", "Power BI", "SQL"]
      },
      { 
        title: "Scalable Web Platforms", 
        description: "Modern full-stack ecosystems using Next.js, React, and TypeScript, optimized for high performance and seamless AI integrations.",
        tags: ["Next.js", "TypeScript", "Vercel", "Tailwind"]
      }
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
        title: "EyeNet — AI & Automation Systems",
        domain: "AI / Automation",
        isFeatured: true,
        caseStudy: "/projects/eyenet",
        links: []
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
        ]
      },
      { year: "2025", title: "COVID-19 Risk Profiles (Mexico)", domain: "Data Science / Clustering", isFeatured: true, caseStudy: "/projects/covid-perfiles", links: [{ label: "Dashboard", url: "https://identificaci-on-de-perfiles-de-ries.vercel.app/" }] },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", links: [ { label: "Dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" } ] },
      { year: "2025", title: "Métodos de Optimización No Lineal", domain: "Optimization / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" } ] },
      { year: "2025", title: "Matemáticas Avanzadas - Métodos de Optimización", domain: "Optimization / Education", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion" } ] },
      { year: "2025", title: "Population Dashboard", domain: "Analytics / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/population-dashboard" } ] },
      { year: "2025", title: "Global Health Analytics Dashboard", domain: "Analytics / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/health-analytics-dashboard" } ] },
      { year: "2025", title: "Video Game Market Intelligence", domain: "Analytics / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/videogames-dashboard" } ] },
      { year: "2024", title: "India Air Quality ETL", domain: "Data Engineering / Azure", links: [ { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" } ] },
      { year: "2024", title: "Code Master", domain: "EdTech / Full Stack", links: [ { label: "Website", url: "https://codemaster-two.vercel.app" }, { label: "Repo", url: "https://github.com/dvillagrans/Code-Master" } ] },
      { year: "2024", title: "Technical Portfolio Platform", domain: "Web Development / Next.js", links: [ { label: "Website", url: "https://www.dvillagrans.dev/" }, { label: "Repo", url: "https://github.com/dvillagrans/portfolio" } ] },
      { year: "2024", title: "Houses Prices Prediction", domain: "Machine Learning / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Houses-Prices-Prediction" } ] },
      { year: "2024", title: "Dashboard Financial", domain: "Data Analysis / Excel VBA", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Dashboard-Financial" } ] },
      { year: "2023", title: "Melari Spa", domain: "Web Development / Astro", links: [ { label: "Website", url: "https://melarispa.com" } ] },
      { year: "2023", title: "Prediction of Passengers for Mexican Airlines", domain: "Time Series / Data Science", links: [ { label: "Dashboard", url: "https://passenger-volume-prediction-in-mexi.vercel.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" } ] }
    ]
  },
  contact: {
    title1: "Let’s build something",
    title2: "intelligent and useful.",
    email: "diegovillasal@gmail.com",
    bookSession: "Let's talk",
    bookDesc: "Reach out for collaborations, job opportunities, or technical inquiries.",
    formName: "Your Name",
    formEmail: "Your Email",
    formMessage: "What would you like to discuss?",
    formSubmit: "Send Request",
    formLoading: "Sending…",
    formLabel: "New Message /",
    formSuccess: "Message sent! I'll get back to you shortly.",
    formError: "Something went wrong. Please email directly.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://linkedin.com/in/dvillagrans",
    footerText: "— Diego Villagran"
  },
  
  timeup: {
    back: "Back to Archive",
    subtitle: "Operational SaaS for the health and wellness sector.",
    tldr: {
      challenge: { title: "The Challenge", text1: "Local businesses operating blindly with ", bold: "WhatsApp and notebooks", text2: ". Owners permanently busy and an operative staff with low affinity for complex technological tools." },
      solution: { title: "The Solution", text1: "A ", bold: "Multi-tenant Cloud platform", text2: " with friendly onboarding, ", cyan: "biometric Passkeys", text3: " without cumbersome passwords and a kinetic Real-Time flow." },
      impact: { title: "The Impact", bold: "MVP built in 10 weeks", text1: " under an optimized architecture. Deployment with near-zero operating costs before gaining real production traction." }
    },
    meta: [
      { label: "Role", value: "Solo Developer / Architect" },
      { label: "Timeline", value: "10 Weeks (MVP)" },
      { label: "Architecture", value: "Serverless + Stateful VPS" },
      { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
    ],
    links: { public: "Public App", business: "Business Panel" },
    quote: { text: "If onboarding took more than ", bold: "ten minutes", text2: ", the implementation failed.", title: "The Functional Premise" },
    constraints: {
      title1: "01 // Inflexible Constraints",
      title2: "Retaining walls.",
      desc: "The context that defined the architecture and forced us to avoid over-engineering.",
      c1: { title: "Low Patience Users", text1: "Business owners aged 30 to 50. The flow could not assume ", bold1: "any prior technical knowledge", text2: ". That's why we transitioned from slow email schemes to using ", bold2: "Native Biometric Hardware (Passkeys)" },
      c2: { title: "MVP Against the Clock", text1: "Developed and modeled by a ", bold1: "single maintainer", text2: ", forcing the choice of hyper-productive tools (Turborepo + Next)." },
      c3: { title: "Tenant Quality", text1: "Semi-open onboarding system. Requires administrative approval in the Backend, creating complex database states ", tag: "PENDING" },
      c4: { title: "Serverless Zero-Cost", text1: "The app had to pivot with a dead burn rate. Pure deployment on ", bold1: "Vercel & Supabase Free", text2: " isolating demanding components." },
      c5: { title: "Strict Legal Module", text1: "Non-negotiable management of ", bold1: "Digital Informed Consents", text2: " with PDF electronic signatures for invasive medical treatments." }
    },
    interfaces: {
      title1: "02 // Ecosystem Interfaces",
      title2: "Dedicated tools by role.",
      admin: { tag: "MODULE : ADMIN", desc: "Global Analytics and Control Center." },
      owner: { tag: "MODULE : OWNER", desc: "Performance Metrics and Configuration." },
      staff: { tag: "MODULE : STAFF", desc: "Live Agenda and Client-Local Management." }
    },
    architecture: {
      title1: "03 // Architecture & Decisions",
      title2: "Trade-offs that give life to the business.",
      d1: { nav: "3.1 / REPOSITORY STRUCTURE", title: "Turborepo Monorepo", desc: "Building multiple React ecosystems forced crossing business logic, TypeScript types, and Prisma schemas. We opted for the initial rigidity of ", bold: "monorepositories to orchestrate", desc2: " multiple coupled bases with automatic caching.", costTitle: "The Operational Cost", costDesc: "Initial tooling delayed v.1, but scaling between deployments became completely instantaneous weeks later." },
      d2: { nav: "3.2 / STATEFUL SYNCHRONIZATION", title: "WebSocket Isolation", desc: "Platforms like Vercel and Edge Functions punish prolonged open connections (Timeouts and dead SSE in minutes). We extracted the bidirectional engine to a Virtual Machine with ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " acting as a real-time pipeline.", costTitle: "The Operational Cost", costDesc: "Monitoring fragmentation; we went from just looking at Vercel logs to having to constantly review metrics on an Ubuntu droplet." },
      d3: { nav: "3.3 / AUTHENTICATION EXPERIENCE", title: "Biometric WebAuthn Login", desc: "Forcing local staff to remember long strings interrupts their operational work. The strong implementation of hardware-integrated biometric APIs (FaceID / Fingerprint) cut access friction from ", bold: "several minutes to fractions of a second", desc2: " on the counter tablet.", costTitle: "The Operational Cost", costDesc: "Extremely high complexity in the fallback; forced maintaining an extra robust system via SMTP Magic Links." }
    },
    lessons: {
      title1: "04 // Post-Mortem System",
      title2: "Raw lessons upon hitting Production.",
      desc: "Pure technical implementations rarely survive the organic behavior of the end user and lower-tier Cloud limitations. What actually caught fire and how it was shielded.",
      l1: { title: "Connection Pooler Choking", desc: "Combining Serverless AWS with cold Database engines in Supabase ended up burning inefficient connection limits, destroying the pipelines.", tag: "URGENTLY MIGRATED TO ACTIVE TRANSACTION POOLERS" },
      l2: { title: "WebAuthn & Origin Mismatch", desc: "An insignificant extra slash '/' in the production CORS config collapsed the entire digital security key flow on the initial deploy because they break cryptographic security.", tag: "MANDATORY MIRRORING OF CI/CD PREVIEW ENVIRONMENT" },
      l3: { title: "State Purgatories & Ghost Users", desc: "Semi-approved entities created inconsistencies by dragging values that contaminated metrics of subsequent cohorts in KPIs.", tag: "ABSOLUTE RESTRICTION OF INTERMEDIATE STATES (BOOLEANS TO THE EXTREME)" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG", status: "STATUS: IN CONSTANT PRODUCTION" }
  },

  eyenet: {
    back: "Back to Archive",
    subtitle: "AI & Automation Systems. Full infrastructure: LLM pipelines, ETL/ELT, containerized microservices, and production apps.",
    tldr: {
      challenge: { title: "The Challenge", text1: "Hooks and events arrived with ", bold: "inconsistent schemas", text2: " — missing fields, wrong types, variable structures. Impossible to store for KPIs without a robust normalization layer." },
      solution: { title: "The Solution", text1: "A ", bold: "hybrid AI infrastructure", text2: " combining proprietary APIs with a ", cyan: "self-hosted GPU cluster", text3: ". Sub-agent architecture for memory, context, and specialized delegation." },
      impact: { title: "The Impact", bold: "65% reduction in manual work", text1: ", 300+ docs processed weekly, 10K+ daily requests, and 92% extraction accuracy across two production systems." }
    },
    meta: [
      { label: "Role", value: "AI Systems Engineer" },
      { label: "Timeline", value: "Apr 2025 – May 2026" },
      { label: "Architecture", value: "Hybrid Cloud + GPU Cluster" },
      { label: "Core Stack", value: "Python, n8n, Docker, DeepSeek" }
    ],
    links: { systemA: "System A Pipeline", systemB: "System B Workflow" },
    quote: { text: "Using proprietary APIs for everything was ", bold: "not viable at scale", text2: ". The decision to build our own GPU cluster changed the economics of the entire operation.", title: "The Infrastructure Bet" },
    constraints: {
      title1: "01 // The Real Challenge",
      title2: "What forced the architecture.",
      desc: "Three hard problems that shaped every technical decision.",
      c1: { title: "Unnormalized Data", text1: "External hooks arrived with ", bold1: "no fixed schema", text2: ". Fields missing, types inconsistent, structures variable. We had to build a normalization layer before any AI could process the data.", tag: "DATA QUALITY" },
      c2: { title: "Controlled AI Costs", text1: "Using OpenAI/Gemini for everything scaled ", bold1: "linearly in cost", text2: ". We built a GPU cluster with open-source models and reserved proprietary APIs only where ROI justified it.", tag: "INFRASTRUCTURE" },
      c3: { title: "Agents with Memory", text1: "Assistants had to handle ", bold1: "multiple intents, remember context", text2: ", and delegate to specialized sub-agents without losing coherence in long conversations.", tag: "AI SYSTEMS" }
    },
    systems: {
      title1: "02 // The Systems",
      title2: "From sources to deliverables.",
      desc: "Two production systems. Different architecture, same principle: clean data → intelligent processing → actionable output.",
      tabA: "System A — Document Processing",
      tabB: "System B — AI Assistant",
      mobileHint: "Pinch to zoom · Drag to pan"
    },
    architecture: {
      title1: "03 // Key Decisions",
      title2: "Trade-offs that shaped the systems.",
      d1: { nav: "3.1 / MODELS", title: "Own Cluster vs External APIs", desc: "For high-volume and repetitive use cases, proprietary API costs scale linearly. We mounted a ", bold: "GPU cluster with open-source models", desc2: " (LLaMA, Mistral, DeepSeek) for base workloads, reserving OpenAI/Gemini for cases where quality justified cost.", costTitle: "Trade-off", costDesc: "Higher operational complexity in exchange for full control over latency, cost, and data privacy." },
      d2: { nav: "3.2 / NORMALIZATION", title: "Schema-First from Day One", desc: "Hooks arrived with variable structures. The temptation was to process and move on — but that would have made KPIs impossible. We designed the MongoDB schema ", bold: "thinking about future aggregations", desc2: " before writing the first pipeline.", costTitle: "Trade-off", costDesc: "More initial design time, zero technical debt in later analytics." },
      d3: { nav: "3.3 / AGENTS", title: "Sub-Agents vs Monolith", desc: "A single agent with all tools collapsed in long contexts and made routing errors. We separated into ", bold: "specialized sub-agents by domain", desc2: " (calendar, documents, data, general response) with a central orchestrator that delegates.", costTitle: "Trade-off", costDesc: "More nodes in the graph, explicit routing logic, but predictable and debuggable behavior." },
      d4: { nav: "3.4 / MONITORING", title: "Telegram as Alert System", desc: "Instead of building a monitoring dashboard from scratch, we integrated ", bold: "Telegram notifications directly into workflows", desc2: ". Every critical pipeline reports success/failure to the operator in real time.", costTitle: "Trade-off", costDesc: "Not Grafana, but instant, zero overhead, and the team already uses Telegram." }
    },
    stack: {
      title1: "04 // Full Stack",
      title2: "Technologies and tools.",
      layers: [
        { label: "Ingestion", items: ["Webhooks", "REST APIs", "Telegram", "n8n workflows"] },
        { label: "Processing", items: ["DeepSeek", "LLaMA", "Mistral", "OpenAI", "Gemini", "GPU Cluster"] },
        { label: "Storage", items: ["MongoDB", "PostgreSQL", "Redis", "Google Drive"] },
        { label: "Delivery", items: ["Docker", "CI/CD", "FastAPI", "React Native", "Next.js", "Telegram"] },
        { label: "Monitoring", items: ["Telegram alerts", "Grafana", "Prometheus", "Structured logging"] }
      ],
      tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "DeepSeek", "LLaMA", "Mistral", "PostgreSQL", "MongoDB", "Redis", "CI/CD", "React Native", "Nginx", "Grafana"]
    },
    lessons: {
      title1: "05 // What Went Wrong",
      title2: "Documented limitations.",
      desc: "Problems we had to recognize and fix in production.",
      l1: { title: "Dirty Data in Production", desc: "The first production webhooks arrived with fields in unexpected formats that the normalization schema didn't anticipate. Required rapid iterations on the Code layer before stabilizing.", tag: "DATA QUALITY" },
      l2: { title: "Cluster vs Production Gap", desc: "Models that worked well on the local cluster failed in production due to quantization differences and available memory. We learned to separate model evaluation environments from production inference.", tag: "INFRASTRUCTURE" },
      l3: { title: "Context Window in Long Conversations", desc: "In long conversations, the main agent lost relevant context. Simple memory wasn't enough — we had to implement sliding window memory with context summarization.", tag: "AI SYSTEMS" }
    },
    footer: { text: "LAST UPDATED: Q2 2026 // EYENET — AI & AUTOMATION SYSTEMS", status: "PARTIAL NDA — Architecture shown, client details omitted" }
  },

  covidPerfiles: {
    back: "Back to Archive",
    subtitle: "Risk profiling from open COVID-19 data using K-Means and Fuzzy C-Means. Advanced Data Analytics, ESCOM-IPN.",
    tldr: {
      challenge: { title: "The Challenge", text1: "The problem was not just “analyzing COVID data”; it was ", bold: "reducing uncertainty in triage", text2: " and resource prioritization when ICU beds, ventilators, and capacity are scarce. Stakeholders: public health, academic evaluation, and—in perspective—clinical teams needing interpretable risk profiles." },
      solution: { title: "The Solution", text1: "We combined ", bold: "K-Means and Fuzzy C-Means", text2: " on stratified samples from 30M+ SSA records: clear assignment for triage plus ", cyan: "partial memberships for borderline cases", text3: ". Pipeline from raw data to LaTeX report and Next.js portfolio." },
      impact: { title: "The Impact", bold: "9 profiles (K-Means) and 2 risk groups (FCM)", text1: " characterized by age, comorbidities, hospitalization, and severity. Identified clusters such as young patients with high hospitalization and low comorbidity (Clusters 4 and 6), useful for health policy. Reproducible pipeline and documented limitations." }
    },
    meta: [
      { label: "Role", value: "Data Science / Clustering" },
      { label: "Timeline", value: "Academic (Jan 2026)" },
      { label: "Stack", value: "Python, scikit-learn, scikit-fuzzy" },
      { label: "Deliverables", value: "LaTeX report, Next.js portfolio" }
    ],
    links: { dashboard: "View Dashboard", repo: "Repository", report: "Report (if available)" },
    linkDashboard: "https://identificaci-on-de-perfiles-de-ries.vercel.app/",
    quote: { text: "What really hurt was not having ", bold: "multivariate risk profiles", text2: ": isolated factors were known (age, diabetes, etc.), but not how they combine in practice.", title: "The Real Pain Point" },
    constraints: {
      title1: "01 // Hard Constraints",
      title2: "What shaped the pipeline.",
      desc: "Academic deadline, infra limits, and data quality defined scope.",
      c1: { title: "Time & Scope", text1: "Fixed delivery (9 Jan 2026). Scope limited to ", bold1: "clustering, report, and portfolio", text2: "; no operational deployment. Three-person team; task split (notebooks, document, portfolio) conditioned scope." },
      c2: { title: "Infrastructure", text1: "GitHub 100 MB file limit. Raw data and ", bold1: ".pkl not versioned", text2: "; anyone cloning must run descargar_datos.py and notebooks. README recommends 16 GB+ RAM for the sample." },
      c3: { title: "No Real End Users", text1: "No hospital deployment. “Users” are ", bold1: "evaluators and portfolio readers", text2: ".", tag: "ACADEMIC" },
      c4: { title: "Costs", text1: "No cloud budget. ", bold1: "Everything local", text2: ": Conda, Jupyter, downloaded data." },
      c5: { title: "Data Legacy", text1: "Official data with ", bold1: "reporting bias", text2: ", missing variables (vaccination, variants, treatments), temporal heterogeneity 2020–2024, and limited geographic granularity." }
    },
    pipeline: {
      title1: "02 // System & Pipeline",
      title2: "From sources to deliverables.",
      desc: "Notebooks 00–02 take raw data to a stratified sample, cleaning, derived variables, and scaling. Notebooks 03–05 run clustering (K-Means and FCM), evaluation (Silhouette, Davies-Bouldin, ARI, NMI), and comparison. Artifacts (.pkl and figures) feed the LaTeX report and Next.js portfolio. The portfolio is public presentation with static/exported data; no live connection to .pkl."
    },
    architecture: {
      title1: "03 // Key Decisions",
      title2: "The heart of the design.",
      d1: { nav: "3.1 / ALGORITHMS", title: "K-Means and FCM (not just one)", desc: "We needed both clear classification for triage and identification of borderline cases. ", bold: "K-Means for definitive assignment and efficiency", desc2: " on millions of records; FCM for mixed profiles and prioritization via partial memberships.", costTitle: "Trade-off", costDesc: "More clusters give more detail but more complexity to communicate; we chose k=9 and c=2." },
      d2: { nav: "3.2 / SAMPLE", title: "Stratified sampling", desc: "Given size (30M+ records) and memory/time limits, we used ", bold: "stratified sampling", desc2: " to preserve representativeness without collapsing the pipeline.", costTitle: "Trade-off", costDesc: "Full-dataset clustering was not feasible; sample size and strata were documented." },
      d3: { nav: "3.3 / PCA", title: "PCA only for visualization", desc: "We trained clustering on ", bold: "17 standardized variables", desc2: " and used PCA only to reduce dimension in plots, not as clustering space.", costTitle: "Trade-off", costDesc: "Keeps interpretability in original feature space; visuals in 2D." },
      d4: { nav: "3.4 / PRESENTATION", title: "Portfolio in Next.js", desc: "Results had to reach ", bold: "non-technical audiences and faculty", desc2: ". We added a web layer (Next.js, React, Recharts) alongside the LaTeX report: narrative, gallery, and interactive charts.", costTitle: "Trade-off", costDesc: "Static exports; no live connection to models." }
    },
    lessons: {
      title1: "04 // What Went Wrong",
      title2: "Documented limitations.",
      desc: "Issues we had to acknowledge before closing the project.",
      l1: { title: "100% lethality in all clusters", desc: "All clusters showed 100% lethality, which forced us to document the need to validate the dataset and review the FALLECIDO variable. Not fixed before deadline; assumed as a known limitation.", tag: "DATA QUALITY" },
      l2: { title: "Outcome variable quality", desc: "We trusted FALLECIDO to characterize clusters without early cross-check with the data dictionary and possible reporting bias. That weakened the mortality interpretation.", tag: "VALIDATION" },
      l3: { title: "Dual source of figures", desc: "Visualizations were generated in notebooks for LaTeX and then reused in the portfolio without a single “source of truth”; the portfolio gallery could drift from the report figures.", tag: "PROCESS" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // COVID-19 RISK PROFILES — ESCOM-IPN", status: "ACADEMIC DELIVERABLE" }
  }
};

export const es = {
  nav: { projects: "Proyectos", systems: "Capacidades", contact: "Contacto", about: "Sobre mí" },
  hero: {
    title1: "ML pipelines. LLM automation.",
    title2: "Sistemas de producción.",
    subtitle1: "Estudiante de Ciencia de Datos construyendo infraestructura real —",
    subtitle2: "desde procesamiento de señales EEG hasta clústeres de LLMs de código abierto.",
    cta: "Ver Proyectos",
  },
  work: {
    title: "Proyectos Destacados",
    subtitle: "Sistemas seleccionados // 2024—2025",
    labelScope: "Reto",
    labelSystem: "Solución",
    labelOutcome: "Impacto",
    inspect: "Ver Proyecto",
    projects: [
      {
        id: "00",
        type: "special",
        category: "Experiencia Profesional",
        title: "EyeNet — AI & Automation",
        problem: "Infraestructura completa de automatización con LLMs, pipelines ETL/ELT, microservicios containerizados, asistentes de IA y apps móviles/web en producción.",
        system: "Arquitectura multicapa: Ingesta (APIs, n8n, ETL), Procesamiento (OpenAI, Gemini, Cluster LLM propio) y Delivery (Docker, Microservicios, Apps).",
        outcome: "Sistema en producción — NDA parcial",
        image: "eyenet",
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
        href: "#"
      },
      {
        id: "01",
        type: "grid",
        category: "Analítica Avanzada / ML",
        title: "Perfiles de Riesgo COVID-19",
        problem: "Identificación de patrones de riesgo multivariados en 30M+ registros para priorización de UCI.",
        system: "K-Means y Fuzzy C-Means en muestras estratificadas; pipeline reproducible desde datos crudos.",
        outcome: "9 perfiles de riesgo interpretables con limitaciones documentadas y notebooks reproducibles.",
        image: "/img/dashboard-covid-19.webp",
        tags: ["Python", "K-Means", "Fuzzy C-Means", "Next.js"],
        metrics: [
          { value: "30M+", label: "registros analizados" },
          { value: "9", label: "perfiles de riesgo" }
        ],
        links: [{ label: "Dashboard", url: "https://identificaci-on-de-perfiles-de-ries.vercel.app/" }],
        href: "/projects/covid-perfiles",
        caseStudy: "/projects/covid-perfiles"
      },
      {
        id: "02",
        type: "grid",
        category: "Movilidad / Data Viz",
        title: "Analytics NYC Ride-Hailing",
        problem: "Necesidad de insights confiables sobre patrones de viaje y precios de aeropuertos en Uber/Lyft.",
        system: "Plataforma interactiva en Streamlit con modelos predictivos y dashboards geoespaciales.",
        outcome: "Predicción de tarifas (R² > 0.85) y clasificación de aeropuertos (92% precisión).",
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
        type: "wide",
        category: "Data Engineering / ETL",
        title: "IA Calidad del Aire (India)",
        problem: "Datos IoT fragmentados de cientos de sensores requerían consolidación para políticas públicas.",
        system: "Arquitectura ETL cloud usando Azure Databricks, PySpark y PostgreSQL para analítica continua.",
        outcome: "Procesamiento de 2M+ registros diarios de 500+ sensores en indicadores de salud consistentes.",
        image: "/img/india-air-quality.webp",
        tags: ["Azure", "PySpark", "Databricks", "Power BI"],
        metrics: [
          { value: "2M+", label: "registros diarios" },
          { value: "500+", label: "sensores IoT" }
        ],
        links: [
          { label: "Vista en vivo", url: "https://app.powerbi.com/view?r=eyJrIjoiOTQ4NmZlMjItMDU0YS00YTMxLThkNDEtNWZjYWRmNTM4Njg1IiwidCI6IjY3ZGU4N2FjLWRhYzgtNDYwNy05NGE0LWM4YTM3YmYwMmE2MSIsImMiOjR9" },
          { label: "Documentación", url: "https://dvillagrans.github.io/India-Air-Quality-ETL-Project/" }
        ],
        href: "https://app.powerbi.com/view?r=eyJrIjoiOTQ4NmZlMjItMDU0YS00YTMxLThkNDEtNWZjYWRmNTM4Njg1IiwidCI6IjY3ZGU4N2FjLWRhYzgtNDYwNy05NGE0LWM4YTM3YmYwMmE2MSIsImMiOjR9",
      }
    ]
  },
  systems: {
    title: "Sistemas y Capacidades",
    items: [
      { 
        title: "Pipelines de Machine Learning", 
        description: "Orquestación de extremo a extremo: desde procesamiento de señales EEG hasta despliegue de clústeres de LLMs en producción.",
        tags: ["Scikit-learn", "PyTorch", "MLflow", "Clústeres GPU"]
      },
      { 
        title: "Ingeniería de Datos e Infraestructura", 
        description: "Pipelines ETL con PySpark y SQL, automatizados con n8n y Grafana, respaldados por Redis y clústeres GPU de alto rendimiento.",
        tags: ["PySpark", "Redis", "n8n", "Docker"]
      },
      { 
        title: "Productos de Analítica", 
        description: "Sistemas de decisión de alta precisión y dashboards predictivos construidos con FastAPI, Streamlit y Power BI.",
        tags: ["FastAPI", "Streamlit", "Power BI", "SQL"]
      },
      { 
        title: "Plataformas Web Escalables", 
        description: "Ecosistemas full-stack modernos usando Next.js, React y TypeScript, optimizados para integraciones de IA sin fricciones.",
        tags: ["Next.js", "TypeScript", "Vercel", "Tailwind"]
      }
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
        title: "EyeNet — Sistemas de IA y Automatización",
        domain: "IA / Automatización",
        isFeatured: true,
        caseStudy: "/projects/eyenet",
        links: []
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
        ]
      },
      { year: "2025", title: "Perfiles de riesgo COVID-19 (México)", domain: "Data Science / Clustering", isFeatured: true, caseStudy: "/projects/covid-perfiles", links: [{ label: "Dashboard", url: "https://identificaci-on-de-perfiles-de-ries.vercel.app/" }] },
      { year: "2025", title: "NYC Ride-Hailing Analytics Dashboard", domain: "Data Science / Streamlit", links: [ { label: "Dashboard", url: "https://nyc-ride-hailing-analytics-dashboard-8ef5n9wjmxxxa8ymaxw9vh.streamlit.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard" } ] },
      { year: "2025", title: "Métodos de Optimización No Lineal", domain: "Optimización / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal" } ] },
      { year: "2025", title: "Matemáticas Avanzadas - Métodos de Optimización", domain: "Optimización / Educación", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Metodos-de-optimizacion" } ] },
      { year: "2025", title: "Dashboard de Población por Continente", domain: "Analítica / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/population-dashboard" } ] },
      { year: "2025", title: "Global Health Analytics Dashboard", domain: "Analítica / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/health-analytics-dashboard" } ] },
      { year: "2025", title: "Video Game Market Intelligence", domain: "Analítica / Power BI", links: [ { label: "Repo", url: "https://github.com/dvillagrans/videogames-dashboard" } ] },
      { year: "2024", title: "India Air Quality ETL", domain: "Data Engineering / Azure", links: [ { label: "Repo", url: "https://github.com/dvillagrans/india-air-quality-etl" } ] },
      { year: "2024", title: "Code Master", domain: "EdTech / Full Stack", links: [ { label: "Website", url: "https://codemaster-two.vercel.app" }, { label: "Repo", url: "https://github.com/dvillagrans/Code-Master" } ] },
      { year: "2024", title: "Technical Portfolio Platform", domain: "Desarrollo Web / Next.js", links: [ { label: "Website", url: "https://www.dvillagrans.dev/" }, { label: "Repo", url: "https://github.com/dvillagrans/portfolio" } ] },
      { year: "2024", title: "Predicción de precios de casas", domain: "Machine Learning / Flask", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Houses-Prices-Prediction" } ] },
      { year: "2024", title: "Dashboard Financial", domain: "Análisis de Datos / Excel VBA", links: [ { label: "Repo", url: "https://github.com/dvillagrans/Dashboard-Financial" } ] },
      { year: "2023", title: "Melari Spa", domain: "Desarrollo Web / Astro", links: [ { label: "Website", url: "https://melarispa.com" } ] },
      { year: "2023", title: "Predicción de pasajeros para aerolíneas mexicanas", domain: "Series de tiempo / Data Science", links: [ { label: "Dashboard", url: "https://passenger-volume-prediction-in-mexi.vercel.app/" }, { label: "Repo", url: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico" } ] }
    ]
  },
  contact: {
    title1: "Construyamos algo",
    title2: "inteligente y útil.",
    email: "diegovillasal@gmail.com",
    bookSession: "Hablemos",
    bookDesc: "Contáctame para colaboraciones, oportunidades laborales o consultas técnicas.",
    formName: "Tu Nombre",
    formEmail: "Tu Correo",
    formMessage: "¿De qué te gustaría hablar?",
    formSubmit: "Enviar Solicitud",
    formLoading: "Enviando…",
    formLabel: "Nuevo Mensaje /",
    formSuccess: "¡Mensaje enviado! Te contactaré pronto.",
    formError: "Hubo un error. Por favor, envía un correo.",
    github: "https://github.com/dvillagrans",
    linkedin: "https://www.linkedin.com/in/diegovillagrans/",
    footerText: "— Diego Villagran"
  },
  timeup: {
    back: "Volver al Archivo",
    subtitle: "SaaS Operativo para el sector de la salud y bienestar.",
    tldr: {
      challenge: { title: "El Reto", text1: "Negocios locales operando ciegamente con ", bold: "WhatsApp y libretas", text2: ". Dueños ocupados permanentemente y un staff de atención con baja afinidad a herramientas tecnológicas complejas." },
      solution: { title: "La Solución", text1: "Plataforma ", bold: "Multi-tenant Cloud", text2: " con onboarding amigable, acceso ", cyan: "Passkeys biométrico", text3: " sin contraseñas engorrosas y flujo kinético Real-Time." },
      impact: { title: "El Impacto", bold: "MVP construido en 10 semanas", text1: " bajo una arquitectura optimizada. Despliegue con costos operativos cercanos a cero antes de traccionar volumen productivo." }
    },
    meta: [
      { label: "Role", value: "Solo Developer / Architect" },
      { label: "Timeline", value: "10 Semanas (MVP)" },
      { label: "Architecture", value: "Serverless + Stateful VPS" },
      { label: "Core Stack", value: "Next.js, Supabase, Passkeys" }
    ],
    links: { public: "App Pública", business: "Panel Negocios" },
    quote: { text: "Si el onboarding tomaba más de ", bold: "diez minutos", text2: ", la implementación fracasaba.", title: "La Premisa Funcional" },
    constraints: {
      title1: "01 // Restricciones Inflexibles",
      title2: "Muros de contención.",
      desc: "El contexto que definió la arquitectura y nos obligó a evitar la sobree-ingeniería.",
      c1: { title: "Usuarios de Baja Paciencia", text1: "Dueños de negocios de 30 a 50 años. El flujo no podía asumir ", bold1: "ningún conocimiento técnico previo", text2: ". Por eso transicionamos de esquemas lentos de email a utilizar ", bold2: "Hardware Biométrico nativo (Passkeys)" },
      c2: { title: "MVP a Contrarreloj", text1: "Desarrollado y modelado por un ", bold1: "solo mantenedor", text2: ", obligando a elegir herramientas hiper-productivas (Turborepo + Next)." },
      c3: { title: "Calidad del Tenant", text1: "Sistema de Onboarding semi-abierto. Requiere aprobación administrativa en el Backend, generando estados complejos en BD ", tag: "PENDING" },
      c4: { title: "Serverless Zero-Cost", text1: "La app debía poder pivotear con un burn rate muerto. Despliegue puro en ", bold1: "Vercel & Supabase Free", text2: " aislando los componentes demandantes." },
      c5: { title: "Módulo Legal Estricto", text1: "Gestión innegociable de ", bold1: "Consentimientos Informados Digitales", text2: " con firmas electrónicas en PDF para tratamientos médicos invasivos." }
    },
    interfaces: {
      title1: "02 // Interfaces Ecosistema",
      title2: "Herramientas dedicadas por rol.",
      admin: { tag: "MÓDULO : ADMIN", desc: "Centro de Control y Analíticas Globales." },
      owner: { tag: "MÓDULO : OWNER", desc: "Métricas de Rendimiento y Configuración." },
      staff: { tag: "MÓDULO : STAFF", desc: "Agenda Viva y Manejo Cliente-Local." }
    },
    architecture: {
      title1: "03 // Arquitectura y Decisiones",
      title2: "Trade-offs que dan vida al negocio.",
      d1: { nav: "3.1 / ESTRUCTURA DE REPOSITORIO", title: "Monorepositorio Turborepo", desc: "Construir múltiples ecosistemas React obligaba a cruzar lógicas de negocio, tipos en TypeScript y esquemas Prisma. Optamos por la rigidez inicial de ", bold: "monorepositorios para orquestar", desc2: " múltiples bases acopladas con cacherréo automático.", costTitle: "El Costo Operativo", costDesc: "El tooling de arranque retrasó la v.1, pero escalar entre un despliegue y otro fue totalmente instantáneo semanas después." },
      d2: { nav: "3.2 / SINCRONIZACIÓN STATEFUL", title: "Aislamiento de WebSockets", desc: "Plataformas como Vercel y Edge Functions castigan las conexiones abiertas prolongadas (Timeouts y SSE muertos en minutos). Extrajimos el motor bidireccional a una Máquina Virtual con ", bold: "NodeJS + pm2 + Redis PubSub", desc2: " actuando como pipeline en tiempo real.", costTitle: "El Costo Operativo", costDesc: "Fragmentación de monitoreo; pasamos de solo mirar logs de Vercel a tener que revisar métricas en un droplet de Ubuntu constantemente." },
      d3: { nav: "3.3 / EXPERIENCIA DE AUTENTICACIÓN", title: "Ingreso Biométrico WebAuthn", desc: "Obligar al staff local a recordar strings largos interrumpe su labor operativa. La implementación fuerte de APIs de biometría integradas en el hardware (FaceID / Fingerprint) cortó la fricción de acceso desde ", bold: "varios minutos a fracciones de segundo", desc2: " en la tablet del mostrador.", costTitle: "El Costo Operativo", costDesc: "Altísima complejidad en el fallback; obligó a mantener un robusto sistema extra por Magic Links SMTP." }
    },
    lessons: {
      title1: "04 // Post-Mortem System",
      title2: "Aprendizajes crudos al golpear Producción.",
      desc: "Las implementaciones técnicas puras raramente sobreviven al comportamiento orgánico del usuario final y de las limitaciones Cloud de cueto inferior. Lo que realmente se incendió y cómo fue blindado.",
      l1: { title: "Asfixia del Connection Pooler", desc: "Combinar AWS Serverless con motores de Base de Datos fríos en Supabase terminaba quemando cuotas de conexión ineficientes destrozando los pipelines.", tag: "MIGRADO DE URGENCIA A TRANSACTION POOLERS ACTIVOS" },
      l2: { title: "WebAuthn & Origin Mismatch", desc: "Un insignificante slash '/' sobrante en la terminación CORS del proyecto en producción colapsó todo el flujo de llaves digitales de seguridad en el deploy inicial porque rompen la seguridad criptográfica.", tag: "ESPEJADO OBLIGATORIO DE ENTORNO PREVIEW CI/CD" },
      l3: { title: "Purgatorios de Estado y Usuarios Fantasma", desc: "Entidades semi-aprobadas creaban inconsistencia al arrastrar valores que contaminaban las métricas de cohortes posteriores en KPIs.", tag: "RESTRICCIÓN ABSOLUTA DE ESTADOS INTERMEDIOS (BOOLEANS AL EXTREMO)" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // TIMEUP SYSTEM ARCHITECTURE LOG", status: "ESTADO: EN PRODUCCIÓN CONSTANTE" }
  },

  eyenet: {
    back: "Volver al Archivo",
    subtitle: "Sistemas de IA y Automatización. Infraestructura completa: pipelines LLM, ETL/ELT, microservicios containerizados y apps en producción.",
    tldr: {
      challenge: { title: "El Reto", text1: "Los hooks y eventos llegaban con ", bold: "esquemas inconsistentes", text2: " — campos faltantes, tipos incorrectos, estructuras variables. Imposible almacenar para KPIs sin una capa de normalización robusta." },
      solution: { title: "La Solución", text1: "Una ", bold: "infraestructura híbrida de IA", text2: " combinando APIs propietarias con un ", cyan: "cluster GPU propio", text3: ". Arquitectura de sub-agentes para memoria, contexto y delegación especializada." },
      impact: { title: "El Impacto", bold: "65% de reducción en trabajo manual", text1: ", 300+ docs procesados semanalmente, 10K+ requests diarios y 92% de precisión en extracción entre dos sistemas en producción." }
    },
    meta: [
      { label: "Rol", value: "AI Systems Engineer" },
      { label: "Timeline", value: "Abr 2025 – May 2026" },
      { label: "Arquitectura", value: "Hybrid Cloud + GPU Cluster" },
      { label: "Stack Core", value: "Python, n8n, Docker, DeepSeek" }
    ],
    links: { systemA: "Pipeline Sistema A", systemB: "Workflow Sistema B" },
    quote: { text: "Usar APIs propietarias para todo era ", bold: "inviable a escala", text2: ". La decisión de construir nuestro propio cluster GPU cambió la economía de toda la operación.", title: "La Apuesta de Infraestructura" },
    constraints: {
      title1: "01 // El Reto Real",
      title2: "Lo que forzó la arquitectura.",
      desc: "Tres problemas difíciles que moldearon cada decisión técnica.",
      c1: { title: "Datos No Normalizados", text1: "Los hooks externos llegaban con ", bold1: "esquema fijo inexistente", text2: ". Campos faltantes, tipos inconsistentes, estructuras variables. Tuvimos que construir una capa de normalización antes de que cualquier IA pudiera procesar los datos.", tag: "DATA QUALITY" },
      c2: { title: "Costos de IA Controlados", text1: "Usar OpenAI/Gemini para todo escalaba ", bold1: "linealmente en costo", text2: ". Construimos un cluster GPU con modelos open-source y reservamos APIs propietarias solo donde el ROI lo justificaba.", tag: "INFRAESTRUCTURA" },
      c3: { title: "Agentes con Memoria", text1: "Los asistentes debían manejar ", bold1: "múltiples intenciones, recordar contexto", text2: " y delegar a sub-agentes especializados sin perder coherencia en conversaciones largas.", tag: "AI SYSTEMS" }
    },
    systems: {
      title1: "02 // Los Sistemas",
      title2: "De fuentes a entregables.",
      desc: "Dos sistemas en producción. Arquitectura distinta, mismo principio: datos limpios → procesamiento inteligente → output accionable.",
      tabA: "Sistema A — Procesamiento de Documentos",
      tabB: "Sistema B — Asistente de IA",
      mobileHint: "Pellizca para zoom · Arrastra para mover"
    },
    architecture: {
      title1: "03 // Decisiones Clave",
      title2: "Trade-offs que moldearon los sistemas.",
      d1: { nav: "3.1 / MODELOS", title: "Cluster Propio vs APIs Externas", desc: "Para volúmenes altos y casos de uso repetitivos, el costo de APIs propietarias escala linealmente. Montamos un ", bold: "cluster GPU con modelos open-source", desc2: " (LLaMA, Mistral, DeepSeek) para workloads base, reservando OpenAI/Gemini para casos donde la calidad justificaba el costo.", costTitle: "Trade-off", costDesc: "Mayor complejidad operativa a cambio de control total sobre latencia, costo y privacidad de datos." },
      d2: { nav: "3.2 / NORMALIZACIÓN", title: "Schema-First desde el Día Uno", desc: "Los hooks llegaban con estructuras variables. La tentación era procesar y ya — pero eso habría hecho imposible los KPIs. Diseñamos el schema de MongoDB ", bold: "pensando en las agregaciones futuras", desc2: " antes de escribir el primer pipeline.", costTitle: "Trade-off", costDesc: "Más tiempo de diseño inicial, cero deuda técnica en analytics posterior." },
      d3: { nav: "3.3 / AGENTES", title: "Sub-Agentes vs Monolito", desc: "Un solo agente con todas las herramientas colapsaba en contextos largos y cometía errores de routing. Separamos en ", bold: "sub-agentes especializados por dominio", desc2: " (calendario, documentos, datos, respuesta general) con un orquestador central que delega.", costTitle: "Trade-off", costDesc: "Más nodos en el grafo, lógica de routing explícita, pero comportamiento predecible y debuggeable." },
      d4: { nav: "3.4 / MONITOREO", title: "Telegram como Sistema de Alertas", desc: "En lugar de construir un dashboard de monitoreo desde cero, integramos ", bold: "notificaciones en Telegram directamente en los workflows", desc2: ". Cada pipeline crítico notifica éxito/fallo al operador en tiempo real.", costTitle: "Trade-off", costDesc: "No es Grafana, pero es instantáneo, cero overhead, y el equipo ya usa Telegram." }
    },
    stack: {
      title1: "04 // Stack Completo",
      title2: "Tecnologías y herramientas.",
      layers: [
        { label: "Ingesta", items: ["Webhooks", "REST APIs", "Telegram", "n8n workflows"] },
        { label: "Procesamiento", items: ["DeepSeek", "LLaMA", "Mistral", "OpenAI", "Gemini", "GPU Cluster"] },
        { label: "Almacenamiento", items: ["MongoDB", "PostgreSQL", "Redis", "Google Drive"] },
        { label: "Entrega", items: ["Docker", "CI/CD", "FastAPI", "React Native", "Next.js", "Telegram"] },
        { label: "Monitoreo", items: ["Telegram alerts", "Grafana", "Prometheus", "Structured logging"] }
      ],
      tags: ["Python", "n8n", "Docker", "FastAPI", "OpenAI", "Gemini", "DeepSeek", "LLaMA", "Mistral", "PostgreSQL", "MongoDB", "Redis", "CI/CD", "React Native", "Nginx", "Grafana"]
    },
    lessons: {
      title1: "05 // Lo que Salió Mal",
      title2: "Limitaciones documentadas.",
      desc: "Problemas que tuvimos que reconocer y corregir en producción.",
      l1: { title: "Datos Sucios en Producción", desc: "Los primeros webhooks en producción llegaban con campos en formatos inesperados que el schema de normalización no anticipaba. Requirió iteraciones rápidas en la capa de Code antes de estabilizar.", tag: "DATA QUALITY" },
      l2: { title: "Brecha Cluster vs Producción", desc: "Los modelos que funcionaban bien en el cluster local fallaban en producción por diferencias de cuantización y memoria disponible. Aprendimos a separar ambientes de evaluación de modelos del ambiente de inferencia productivo.", tag: "INFRAESTRUCTURA" },
      l3: { title: "Context Window en Conversaciones Largas", desc: "En conversaciones largas, el agente principal perdía contexto relevante. La memoria simple no era suficiente — tuvimos que implementar memoria con ventana deslizante y resumen de contexto.", tag: "AI SYSTEMS" }
    },
    footer: { text: "LAST UPDATED: Q2 2026 // EYENET — AI & AUTOMATION SYSTEMS", status: "NDA PARCIAL — Arquitectura mostrada, detalles de cliente omitidos" }
  },

  covidPerfiles: {
    back: "Volver al Archivo",
    subtitle: "Identificación de perfiles de riesgo en pacientes COVID-19 a partir de datos abiertos SSA, mediante clustering (K-means y Fuzzy C-Means). Analítica Avanzada de Datos, ESCOM-IPN.",
    tldr: {
      challenge: { title: "El Reto", text1: "El problema no era solo “analizar datos de COVID”; era ", bold: "reducir la incertidumbre en el triage", text2: " y en la priorización de recursos cuando UCI, ventiladores y camas son escasos. Stakeholders: salud pública, evaluación académica y, en perspectiva, equipos clínicos con necesidad de perfiles interpretables." },
      solution: { title: "La Solución", text1: "Combinamos ", bold: "K-Means y Fuzzy C-Means", text2: " sobre muestras estratificadas de 30M+ registros SSA: asignación clara para triage más ", cyan: "pertenencias parciales para casos límite", text3: ". Pipeline de datos crudos a reporte LaTeX y portfolio Next.js." },
      impact: { title: "El Impacto", bold: "9 perfiles (K-Means) y 2 grupos de riesgo (FCM)", text1: " caracterizados por edad, comorbilidades, hospitalización y severidad. Se identificaron clusters como jóvenes con alta hospitalización y baja comorbilidad (Clusters 4 y 6), útiles para políticas de salud. Pipeline reproducible y limitaciones documentadas." }
    },
    meta: [
      { label: "Rol", value: "Data Science / Clustering" },
      { label: "Timeline", value: "Académico (ene 2026)" },
      { label: "Stack", value: "Python, scikit-learn, scikit-fuzzy" },
      { label: "Entregables", value: "Reporte LaTeX, portfolio Next.js" }
    ],
    links: { dashboard: "Ver Dashboard", repo: "Repositorio", report: "Reporte (si aplica)" },
    linkDashboard: "https://identificaci-on-de-perfiles-de-ries.vercel.app/",
    quote: { text: "Lo que dolía de verdad era no tener ", bold: "perfiles de riesgo multivariados", text2: ": se conocían factores aislados (edad, diabetes, etc.), pero no cómo se combinan en la realidad.", title: "El Dolor Real" },
    constraints: {
      title1: "01 // Restricciones Duras",
      title2: "Lo que definió el pipeline.",
      desc: "Fecha académica, límites de infra y calidad de datos definieron el alcance.",
      c1: { title: "Tiempo y Alcance", text1: "Entrega fija (9 ene 2026). Alcance acotado a ", bold1: "clustering, reporte y portfolio", text2: "; sin despliegue operativo. Equipo de tres personas; reparto de tareas (notebooks, documento, portfolio) condicionó el alcance." },
      c2: { title: "Infraestructura", text1: "Límite GitHub 100 MB por archivo. Datos crudos y ", bold1: ".pkl no versionados", text2: "; quien clona debe ejecutar descargar_datos.py y notebooks. README recomienda 16 GB+ RAM para la muestra." },
      c3: { title: "Sin Usuarios Reales", text1: "No hay despliegue en hospitales. Los “usuarios” son ", bold1: "evaluadores y quien consulte el portfolio", text2: ".", tag: "ACADÉMICO" },
      c4: { title: "Costos", text1: "Sin presupuesto de nube. ", bold1: "Todo local", text2: ": Conda, Jupyter, datos descargados." },
      c5: { title: "Legacy de Datos", text1: "Datos oficiales con ", bold1: "sesgo de reporte", text2: ", variables faltantes (vacunación, variantes, tratamientos), heterogeneidad temporal 2020–2024 y granularidad geográfica limitada." }
    },
    pipeline: {
      title1: "02 // Sistema y Pipeline",
      title2: "De fuentes a entregables.",
      desc: "Los notebooks 00–02 llevan los datos crudos a una muestra estratificada, limpieza, variables derivadas y escalado. Los notebooks 03–05 ejecutan el clustering (K-Means y FCM), evaluación (Silhouette, Davies-Bouldin, ARI, NMI) y comparación. Los artefactos (.pkl y figuras) alimentan el reporte LaTeX y el portfolio Next.js. El portfolio es presentación pública con datos estáticos/exportados; sin conexión en vivo a los .pkl."
    },
    architecture: {
      title1: "03 // Decisiones Clave",
      title2: "El corazón del diseño.",
      d1: { nav: "3.1 / ALGORITMOS", title: "K-Means y FCM (y no solo uno)", desc: "Hacía falta clasificación clara para triage e identificación de casos fronterizos. ", bold: "K-Means para asignación definitiva y eficiencia", desc2: " sobre millones de registros; FCM para perfiles mixtos y priorización por pertenencias parciales.", costTitle: "Trade-off", costDesc: "Más clusters dan más detalle pero más complejidad al comunicar; elegimos k=9 y c=2." },
      d2: { nav: "3.2 / MUESTRA", title: "Muestreo estratificado", desc: "Dado el tamaño (30M+ registros) y límites de memoria y tiempo, usamos ", bold: "muestreo estratificado", desc2: " para mantener representatividad sin colapsar el pipeline.", costTitle: "Trade-off", costDesc: "Clustering sobre el dataset completo no era viable; tamaño y estratos quedaron documentados." },
      d3: { nav: "3.3 / PCA", title: "PCA solo para visualización", desc: "Entrenamos el clustering con ", bold: "17 variables estandarizadas", desc2: " y usamos PCA solo para reducir dimensión en gráficos, no como espacio de clustering.", costTitle: "Trade-off", costDesc: "Interpretabilidad en el espacio original; visuales en 2D." },
      d4: { nav: "3.4 / PRESENTACIÓN", title: "Portfolio en Next.js", desc: "Los resultados debían llegar a ", bold: "no técnicos y profesorado", desc2: ". Añadimos capa web (Next.js, React, Recharts) además del reporte LaTeX: narrativa, galería y gráficos interactivos.", costTitle: "Trade-off", costDesc: "Exportaciones estáticas; sin conexión en vivo a modelos." }
    },
    lessons: {
      title1: "04 // Qué Salió Mal",
      title2: "Limitaciones documentadas.",
      desc: "Problemas que tuvimos que reconocer antes de cerrar el proyecto.",
      l1: { title: "Letalidad 100 % en todos los clusters", desc: "Todos los clusters mostraban letalidad 100 %, lo que obligó a documentar la necesidad de validar el dataset y revisar la variable FALLECIDO. No se corrigió antes del cierre; se asumió como limitación conocida.", tag: "CALIDAD DE DATOS" },
      l2: { title: "Calidad de la variable de desenlace", desc: "Confiamos en FALLECIDO para caracterizar los clusters sin validación cruzada temprana con el diccionario de datos y posibles sesgos de registro. Eso restó fuerza a la interpretación en mortalidad.", tag: "VALIDACIÓN" },
      l3: { title: "Doble fuente de figuras", desc: "Las visualizaciones se generaron en los notebooks para LaTeX y luego se reutilizaron en el portfolio sin una única “fuente de verdad”; la galería del portfolio pudo quedar desfasada respecto a las figuras del reporte.", tag: "PROCESO" }
    },
    footer: { text: "LAST UPDATED: Q1 2026 // PERFILES DE RIESGO COVID-19 — ESCOM-IPN", status: "ENTREGABLE ACADÉMICO" }
  }
};
