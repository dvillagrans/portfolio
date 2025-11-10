import { Icons } from "@/components/icons";
import { ProfileData } from "./types";

export const mlEngineerProfile: ProfileData = {
  summary: "Data Science student with hands-on experience building machine learning pipelines, model training and serving, and data processing APIs in production. Skilled in Python (Pandas, NumPy, Scikit-learn, TensorFlow), feature engineering, evaluation, and containerized deployment with FastAPI/Flask and Docker. Delivered 85%+ accuracy on EEG-based emotion classification with real-time streaming under 100ms, and supported 10K+ daily requests across services. Seeking an ML Engineer role to scale training, inference, and monitoring in production.",

  summaryEs: "Estudiante de Ciencia de Datos con experiencia práctica construyendo pipelines de machine learning, entrenamiento y despliegue de modelos, y APIs de procesamiento de datos en producción. Experto en Python (Pandas, NumPy, Scikit-learn, TensorFlow), ingeniería de características, evaluación y despliegue en contenedores con FastAPI/Flask y Docker. Logré 85%+ de precisión en clasificación de emociones basada en EEG con streaming en tiempo real bajo 100ms, y soporté 10K+ solicitudes diarias a través de servicios. Buscando un rol de Ingeniero ML para escalar entrenamiento, inferencia y monitoreo en producción.",

  highlightedSkills: [
    "Python",
    "Pandas",
    "Numpy",
    "Scikit-learn",
    "Tensorflow",
    "Keras",
    "PyTorch",
    "FastAPI",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Redis",
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
      description: "Developed LLM-assisted document extraction pipelines integrating OpenAI and Gemini APIs with Python, structuring 200+ documents per day with 92% extraction accuracy. Built data processing APIs and services generating model-ready datasets on PostgreSQL, Redis, and MongoDB, supporting 10K+ daily requests. Containerized data and model services with Docker and implemented CI/CD and telemetry, reducing deployment time by 50% and detecting 95%+ issues pre-production. Created evaluation and monitoring dashboards with Grafana and Prometheus to track throughput, error rates, and data quality.",
    },
  ],

  projects: [
    {
      title: "Qalma - Applied ML on EEG Signals",
      href: "https://github.com/dvillagrans/qalma",
      dates: "2025",
      active: true,
      role: "Machine Learning",
      description: "Built end-to-end ML pipeline for EEG signals at 256 Hz: preprocessing, feature extraction, and classification achieving 85%+ accuracy. Implemented real-time streaming and inference with latency under 100ms; stored datasets and predictions in Supabase/PostgreSQL. Served models via FastAPI/Flask with Docker; added batch jobs for historical analysis and drift checks.",
      technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker", "Scikit-learn"],
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
      title: "NYC Ride-Hailing Analytics Dashboard",
      href: "https://github.com/dvillagrans/NYC-Ride-Hailing-Analytics-Dashboard",
      dates: "June 2025",
      active: true,
      role: "Machine Learning",
      description: "Comprehensive interactive dashboard built with Streamlit for analyzing Uber and Lyft trip patterns, revenue, and geographic distribution in NYC. Features machine learning models for fare prediction (R² > 0.85) and airport trip classification (92% accuracy), along with advanced visualizations including heat maps, 3D PyDeck maps, and real-time analytics.",
      technologies: ["Streamlit", "Python", "Pandas", "Scikit-learn", "Plotly"],
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
      title: "Prediction of the price of houses in Mexico City",
      href: "https://github.com/dvillagrans/Houses-Prices-Prediction",
      dates: "June 2024",
      active: false,
      role: "Machine Learning",
      description: "Built machine learning pipeline (Random Forest Regressor) predicting property values with 88% R² score. Engineered features from geospatial data and market trends. Deployed as Flask API for real-time valuation estimates.",
      technologies: ["Scikit-learn", "Python", "Flask", "Pandas"],
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
    },
    {
      title: "Microservices Orchestration & Monitoring",
      href: "#",
      dates: "2025",
      active: true,
      role: "MLOps",
      description: "Deployed 8+ services (APIs, PostgreSQL, Redis, Nginx) with Docker Compose, health checks, and automated recovery achieving 99.5% uptime. Built observability with Grafana/Prometheus exposing 25+ metrics; performed load testing (Apache Bench) reducing latency by 40%.",
      technologies: ["Docker", "Prometheus", "Grafana", "PostgreSQL", "Redis"],
      links: [],
      image: {
        src: "/img/microservices.webp",
      },
    },
  ],

  relevantCertifications: [
    "Google AI Essentials",
    "Build a Data Warehouse with BigQuery",
    "Engineer Data for Predictive Modeling with BigQuery ML",
    "Manage Kubernetes in Google Cloud",
  ],
};
