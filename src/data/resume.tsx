import { Icons } from "@/components/icons";
import { CodeIcon, HomeIcon, NotebookIcon, PencilLine } from "lucide-react";

export const DATA = {
  name: "Diego Villagran Salazar",
  initials: "DV",
  url: "https://portfolio-pi-vert-92.vercel.app/",
  location: "Mexico City, MX",
  locationLink: "",
  description:
    "Data Scientist & Full-Stack Developer specializing in machine learning, data visualization, and scalable web solutions. Currently pursuing Data Science at ESCOM-IPN with 3+ years of hands-on experience delivering data-driven insights and production-ready applications.",
  summary:
    "Passionate data scientist and full-stack developer with a proven track record of transforming complex datasets into actionable business insights. Expert in building end-to-end machine learning pipelines, from data collection and preprocessing to model deployment and monitoring. My experience spans predictive analytics (92% forecasting accuracy in aviation demand), web development (40% conversion rate improvements), and cloud-based ETL systems processing millions of daily records. I thrive at the intersection of data science and software engineering, creating scalable solutions that drive real business value.",
  avatarUrl: "/img/me.webp",
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
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#skills", icon: NotebookIcon, label: "Skills" },
    { href: "/projects", icon: CodeIcon, label: "Projects" },
    { href: "#contact", icon: PencilLine, label: "Contact" },
  ],
  contact: {
    email: "diegovillasal@gmail.com",
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
      title: "Prediction of passengers for mexican airlines",
      href: "https://github.com/dvillagrans/Passenger-Volume-Prediction-in-Mexico",
      dates: "September 2023 - November 2023",
      active: true,
      description:
        "Developed SARIMA time series model to forecast domestic air travel demand over 5 years, analyzing 36 years of historical data from Mexican aviation authorities. Achieved 92% forecasting accuracy through cross-validation, enabling capacity planning optimization for major carriers.",
      technologies: [
        "Python",
        "Pandas",
        "Time Series Analysis",
        "SARIMA Modeling",
        "Matplotlib",
        "Seaborn",
        "Statistical Forecasting"
      ],
      links: [
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
    {
      title: "Melari Spa",
      href: "https://melarispa.com",
      dates: "September 2023 -  July 2024",
      active: true,
      description:
        "Led full-stack development of SEO-optimized wellness platform using Astro/React, resulting in 40% increased booking conversions. Implemented CI/CD pipeline with Vercel achieving 99.9% uptime. Integrated headless CMS for dynamic content management.",
      technologies: [
        "Astro",
        "React",
        "Tailwind CSS",
        "Vercel",
        "Performance Optimization",
        "Responsive Design"
      ],
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
      title: "Dashboard Financial",
      href: "https://github.com/dvillagrans/Dashboard-Financial",
      dates: "February 2024 -  March 2024",
      active: false,
      description:
        "Designed automated financial reporting system using Excel VBA, reducing manual processing time by 15 hours/week. Featured dynamic P&L visualizations, cash flow forecasting modules, and KPI tracking for 200+ branch locations.",
      technologies: [
        "VBA Automation",
        "Financial Data Visualization",
        "Dashboard Design",
        "Pivot Table Reporting"
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
      title: "Prediction of the price of houses in Mexico City",
      href: "https://github.com/dvillagrans/Houses-Prices-Prediction",
      dates: "June 2024",
      active: false,
      description:
        "Built machine learning pipeline (Random Forest Regressor) predicting property values with 88% R² score. Engineered features from geospatial data and market trends. Deployed as Flask API for real-time valuation estimates.",
      technologies: [
        "Scikit-learn",
        "Feature Engineering",
        "Geospatial Analysis",
        "Model Deployment",
        "Hyperparameter Tuning"
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

    }, {
      title: "Video Game Market Intelligence Dashboard",
      href: "https://github.com/dvillagrans/videogames-dashboard",
      dates: "Jan 2025",
      active: false,
      description:
        "Created interactive Power BI dashboard analyzing $60B global gaming market. Integrated sales data from 15 platforms, enabling product strategy insights through genre trends and regional performance analytics.",
      technologies: [
        "Power BI DAX",
        "Data Modeling",
        "Market Intelligence",
        "ETL Processes",
        "Interactive Visualizations"
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
      title: "Technical Portfolio Platform",
      href: "https://portfolio-pi-vert-92.vercel.app/",
      dates: "July 2024",
      active: true,
      description:
        "Architected performant portfolio using Next.js SSG, achieving perfect Lighthouse scores. Implemented dark mode, project showcases, and MDX-based content system. Serves as production-grade template for developer portfolios.",
      technologies: [
        "Next.js 14",
        "App Router Architecture",
        "Performance Optimization",
        "Responsive Design",
        "Vercel"
      ],
      links: [
        {
          type: "Website",
          href: "https://portfolio-pi-vert-92.vercel.app/",
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
      title: "Code Master - Interactive Learning Platform",
      href: "https://codemaster-two.vercel.app",
      dates: "Nov 2024 - Current",
      active: true,
      description:
        "Pioneered gamified coding education platform with Django backend supporting 10k+ users. Features include code playgrounds, AI-assisted feedback, and progress tracking. Won 2nd place in 2024 EdTech Innovation Awards.",
      technologies: [
        "Django REST Framework",
        "Astro",
        "Interactive Learning Tools",
        "JWT Authentication",
        "Microservices Architecture"
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
    }, {
      title: "India National Air Quality Intelligence System",
      href: "https://github.com/dvillagrans/india-air-quality-etl",
      dates: "Dec 2024",
      active: false,
      description:
        "Designed end-to-end ETL pipeline processing 2M+ daily readings from 500+ IoT sensors across India. Implemented cloud-based data architecture using Azure Databricks for spark processing (PySpark) and Jupyter notebooks for anomaly detection models. Transformed raw sensor data into policy-ready insights through PostgreSQL geospatial warehousing and Power BI dashboards with live pollution heatmaps.",
      technologies: [
        "ETL Architecture",
        "Azure Cloud Services (Data Factory, Databricks)",
        "PySpark Data Processing",
        "Jupyter Notebooks (Python)",
        "PostgreSQL Geospatial DB",
        "Power BI Real-time Dashboards",
        "IoT Sensor Integration",
      ],
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
      video: "",
    }, {
      title: "Dashboard of Population by Continent",
      href: "https://github.com/dvillagrans/population-dashboard",
      dates: "Feb 2025",
      active: false,
      description:
        "Developed interactive Dashboard with Power BI to analyze population trends, demographic shifts, and continental comparisons with dynamic filtering and drill-down capabilities.",
      technologies: [
        "Power BI",
        "Data Modeling",
        "Data Visualization",
        "Interactive Visualizations",
        "DAX"
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
      description:
        "Built comprehensive health analytics dashboard analyzing life expectancy trends and infant mortality rates across 195+ countries. Features correlation analysis, time-series forecasting, and socioeconomic factor integration.",
      technologies: [
        "Power BI",
        "Data Modeling",
        "Statistical Analysis",
        "Interactive Visualizations",
        "Health Data Analytics"
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
      title: "NYC Ride-Hailing Analytics Dashboard",
      href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
      dates: "June 2025",
      active: true,
      description:
        "Comprehensive interactive dashboard built with Streamlit for analyzing Uber and Lyft trip patterns, revenue, and geographic distribution in NYC. Features machine learning models for fare prediction (R² > 0.85) and airport trip classification (92% accuracy), along with advanced visualizations including heat maps, 3D PyDeck maps, and real-time analytics across 8 specialized tabs covering peak hours, accessibility services, and competitive analysis.",
      technologies: [
        "Streamlit",
        "Python",
        "Pandas",
        "Plotly",
        "Machine Learning",
        "TensorFlow",
        "Scikit-learn",
        "Folium",
        "PyDeck",
        "Data Visualization",
        "Geospatial Analysis"
      ],
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
      video: "",
    },
    {
      title: "Matemáticas Avanzadas - Métodos de Optimización",
      href: "https://github.com/dvillagrans/Metodos-de-optimizacion",
      dates: "May 2025",
      active: true,
      description:
        "Aplicación Flask para resolver problemas de programación lineal usando diferentes métodos de optimización (Simplex, Gran M, Dos Fases) con animaciones visuales generadas usando Manim. Incluye API REST, interfaz web interactiva y generación automática de videos explicativos de los algoritmos.",
      technologies: [
        "Flask",
        "Python",
        "Manim",
        "NumPy",
        "Linear Programming",
        "Mathematical Optimization",
        "API REST",
        "HTML Templates",
        "Mathematical Visualization"
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
      title: "Métodos de Optimización No Lineal",
      href: "https://github.com/dvillagrans/Metodos-de-optimizacion-no-lineal",
      dates: "June 2025",
      active: true,
      description:
        "Interactive Flask web application implementing and visualizing main non-linear optimization algorithms with modern dynamic interface. Features Line Search (Golden Section, Fibonacci, Armijo), Gradient Descent (Basic, Momentum, Adam), Newton Method variants, and constrained optimization methods with real-time convergence graphs and mathematical visualizations.",
      technologies: [
        "Flask",
        "Python",
        "NumPy",
        "Chart.js",
        "Bootstrap 5",
        "MathJax",
        "Non-linear Optimization",
        "Mathematical Visualization",
        "API REST"
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
      name: "Python for Data Science, AI & Development",
      issuer: "Coursera - IBM",
      date: "2024",
      credentialId: "ZGJQUCOZZ70M",
      logo: "/img/coursera.webp",
      href: "https://coursera.org/verify/ZGJQUCOZZ70M",
      description: "Comprehensive course covering Python fundamentals for data science, artificial intelligence, and development applications.",
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
