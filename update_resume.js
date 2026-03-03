const fs = require('fs');

let content = fs.readFileSync('src/data/resume.tsx', 'utf8');

// Update TimeUp
content = content.replace(
  'role: "SaaS / Full Stack",\n      description: "Agile system to manage time logs, replacing paper. Two-way architecture (Business Portal & Employee Landing) with automated calculations.",',
  `role: "Founder · Built in 10 weeks",
      description: "A frictionless time tracking system that modernizes how businesses and employees log hours and calculate payrolls.",
      badges: ["LIVE", "Multi-tenant SaaS", "Production-ready"],
      metrics: [
        { value: "<500ms", label: "Dashboard Load" },
        { value: "100%", label: "Paperless" }
      ],
      features: [
        { name: "What it replaces", value: "WhatsApp, notebooks & Excel" },
        { name: "What it enables", value: "Mobile-first operations, automated calculations" },
        { name: "Architecture", value: "Two-way system (Business Portal + Employee Landing)" }
      ],`
);

// Update NYC Ride-Hailing
content = content.replace(
  'role: "Data Science",\n      description:\n        "Streamlit dashboard for Uber/Lyft trip patterns in NYC. Features fare prediction (R² > 0.85) and airport trip classification (92% accuracy) with real-time analytics.",',
  `role: "Data Scientist · End-to-end ML Pipeline",
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
      ],`
);

// Update Optimization
content = content.replace(
  'role: "Mathematical Optimization",\n      description:\n        "Flask web application visualizing non-linear optimization algorithms. Features Line Search, Gradient Descent, and Newton variants with real-time convergence graphs.",',
  `role: "Solo Dev · Algorithm Visualizer",
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
      ],`
);

fs.writeFileSync('src/data/resume.tsx', content);
