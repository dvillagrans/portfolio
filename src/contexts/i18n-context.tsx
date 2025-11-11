'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isClient: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.theme': 'Theme',
    'nav.skills': 'Skills',
    
    // Hero Section
    'hero.greeting': 'Hi, I\'m Diego 👋',
    'hero.title': 'Data Scientist & Full-Stack Developer',
    'hero.description': 'Data Scientist and Full-Stack Developer specializing in machine learning, data visualization, and scalable web solutions. Currently studying Data Science at ESCOM-IPN with 3+ years of hands-on experience delivering data-driven insights and production-ready applications.',
    'hero.summary': 'Passionate data scientist and full-stack developer with a proven track record of transforming complex datasets into actionable business insights. Expert in building end-to-end machine learning pipelines, from data collection and preprocessing to model deployment and monitoring.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Get in Touch',
    
    // About Section
    'about.title': 'About Me',
    'about.description': 'I thrive at the intersection of data science and software engineering, creating scalable solutions that drive real business value.',
    
    // Skills Section
    'skills.title': 'Skills & Technologies',
    'skills.description': 'Technologies and tools I work with',
    'skills.categories.datascience': 'Data Science',
    'skills.categories.ml': 'Machine Learning',
    'skills.categories.databases': 'Databases',
    'skills.categories.versioncontrol': 'Version Control',
    'skills.categories.cloud': 'Cloud & DevOps',
    'skills.categories.web': 'Web Development',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Check out my latest work',
    'projects.viewall': 'View All Projects',
    'projects.totalProjects': 'total projects',
    'projects.total': 'total projects',
    'projects.filtering': 'Filtering by',
    'projects.search.placeholder': 'Search projects by name or technology...',
    'projects.search.clear': 'Clear search',
    'projects.search.notfound': 'No projects found',
    'projects.search.notfoundDesc': 'No projects found matching',
    'projects.filters.show': 'Show filters',
    'projects.filters.hide': 'Hide filters',
    'projects.filters.category': 'Filter by category',
    'projects.filters.clear': 'Clear filters',
    'projects.filters.showing': 'Showing',
    'projects.filters.of': 'of',
    'projects.cta.title': 'Let\'s build something amazing together?',
    'projects.cta.description': 'Interested in collaborating or want to discuss a project? I\'m always open to new opportunities and challenges.',
    'projects.cta.linkedin': 'Connect on LinkedIn',
    'projects.cta.github': 'View GitHub',
    'projects.cta.email': 'Send Email',
    'projects.viewproject': 'View Project',
    'projects.viewcode': 'View Code',
    'projects.technologies': 'Technologies',
    'projects.links': 'Project Links',
    'projects.active': 'Active',
    'projects.inactive': 'Completed',
    'projects.activeProject': 'Active Project',
    'projects.achievements': 'Outstanding Achievements',
    'projects.completedRequirements': 'Project completed meeting all requested requirements.',
    'projects.additionalFeatures': 'Implementation of additional features that improve user experience.',
    'projects.metricsDisclaimer': 'This section shows project metrics and impact. The data presented is based on real results or approximate estimates.',
    'projects.clickLinks': 'Click on the links to visit the project site or code repository.',
    'projects.card.clickToView': 'Click to view more',
    'projects.description': 'Explore my projects in data science, mathematical optimization and interactive dashboards.',
    'projects.preview': 'Preview',
    'projects.impact': 'Impact',
    'projects.metricsResults': 'Metrics and Results',
    'projects.completionRate': 'Completion Rate',
    'projects.clientRating': 'Client Rating',
    'projects.qualityGrade': 'Quality Grade',
    'projects.playVideo': 'Play the video to see a project demonstration.',
    'projects.previewDescription': 'Project preview. For more details, check the links in the description tab.',
    'projects.optimizedCode': 'Optimized code for maximum performance and scalability.',
    
    // Project Descriptions
    'projects.descriptions.sarima': 'Developed SARIMA time series model to forecast domestic air travel demand over 5 years, analyzing 36 years of historical data from Mexican aviation authorities. Achieved 92% forecasting accuracy through cross-validation, enabling capacity planning optimization for major carriers.',
    'projects.descriptions.melari': 'Led full-stack development of SEO-optimized wellness platform using Astro/React, resulting in 40% increased booking conversions. Implemented CI/CD pipeline with Vercel achieving 99.9% uptime. Integrated headless CMS for dynamic content management.',
    'projects.descriptions.financial': 'Designed automated financial reporting system using Excel VBA, reducing manual processing time by 15 hours/week. Featured dynamic P&L visualizations, cash flow forecasting modules, and KPI tracking for 200+ branch locations.',
    'projects.descriptions.houses': 'Built machine learning pipeline (Random Forest Regressor) predicting property values with 88% R² score. Engineered features from geospatial data and market trends. Deployed as Flask API for real-time valuation estimates.',
    'projects.descriptions.videogames': 'Created interactive Power BI dashboard analyzing $60B global gaming market. Integrated sales data from 15 platforms, enabling product strategy insights through genre trends and regional performance analytics.',
    'projects.descriptions.portfolio': 'Architected performant portfolio using Next.js SSG, achieving perfect Lighthouse scores. Implemented dark mode, project showcases, and MDX-based content system. Serves as production-grade template for developer portfolios.',
    'projects.descriptions.codemaster': 'Pioneered gamified coding education platform with Django backend supporting 10k+ users. Features include code playgrounds, AI-assisted feedback, and progress tracking. Won 2nd place in 2024 EdTech Innovation Awards.',
    'projects.descriptions.airquality': 'Engineered real-time ETL pipeline processing 2M+ daily air quality records from 500+ monitoring stations. Built geospatial analytics dashboard with PySpark, reducing data processing time by 75% and enabling predictive pollution modeling.',
    'projects.descriptions.population': 'Developed comprehensive demographic analytics dashboard tracking population trends across 7 continents. Integrated multiple data sources with automated ETL processes, featuring interactive visualizations and trend forecasting capabilities.',
    'projects.descriptions.health': 'Built comprehensive health analytics dashboard analyzing life expectancy trends and infant mortality rates across 195+ countries. Features correlation analysis, time-series forecasting, and socioeconomic factor integration.',
    'projects.descriptions.default': 'Innovative project showcasing technical expertise and problem-solving capabilities.',
    
    // Experience Section
    'experience.title': 'Experience',
    'experience.education': 'Education',
    'experience.work': 'Work Experience',
    
    // Contact Form
    'contact.title': 'Contact Me',
    'contact.description': 'Have a project in mind? I\'d love to hear from you and collaborate together!',
    'contact.name': 'Name',
    'contact.name.placeholder': 'Your name',
    'contact.email': 'Email',
    'contact.email.placeholder': 'your@email.com',
    'contact.subject': 'Subject',
    'contact.subject.placeholder': 'What would you like to talk about?',
    'contact.message': 'Message',
    'contact.message.placeholder': 'Tell me about your project or idea...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully. I\'ll get back to you soon!',
    'contact.error': 'Error sending message. Please try again.',
    
    // Validation messages
    'validation.name.min': 'Name must be at least 2 characters.',
    'validation.email.invalid': 'Please enter a valid email address.',
    'validation.subject.min': 'Subject must be at least 5 characters.',
    'validation.message.min': 'Message must be at least 10 characters.',
    
    // Status and Labels
    'status.available': 'Available for work',
    'status.experiences': 'Experiences',
    'status.degrees': 'Degrees',
    'status.certifications': 'Professional Growth',
    'status.present': 'Present',
    
    // Roles
    'roles.datascientist': 'Data Scientist',
    'roles.fullstack': 'Full-Stack Dev',
    'roles.mlengineer': 'ML Engineer',
    
    // Metrics
    'metrics.forecasting': 'Forecasting Accuracy',
    'metrics.conversion': 'Conversion Improvements',
    'metrics.experience': 'Years Experience',
    'metrics.records': 'Daily Records',
    
    // About quotes
    'about.quote': 'I thrive at the intersection of data science and software engineering, creating solutions that bridge complex algorithms with user-friendly applications.',
    'about.studying': 'Currently pursuing Data Science at',
    'about.currentlyPursuing': 'Currently pursuing Data Science at ESCOM-IPN',
    'about.opportunity': 'I\'m currently open to new opportunities in data science, machine learning, and full-stack development. Whether you need predictive analytics, web solutions, or data visualization dashboards, let\'s discuss how I can help drive your business forward.',
    
    // Contact Section
    'contact.hero.title': 'Ready to Transform Data into Impact?',
    'contact.hero.description': 'I\'m currently open to new opportunities in data science, machine learning, and full-stack development. Whether you need predictive analytics, web solutions, or data visualization dashboards, let\'s discuss how I can help drive your business forward.',
    'contact.status.available': 'Available for work',
    'contact.status.location': 'Mexico City, MX',
    'contact.status.student': 'Data Science Student',
    'contact.alternative.title': 'Or connect directly',
    'contact.response.time': 'Email responses within 24h',
    'contact.linkedin.note': 'LinkedIn for professional inquiries',
    'contact.remote.note': 'Open to remote & hybrid opportunities',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.readmore': 'Read More',
    'common.showless': 'Show Less',
    'common.learnmore': 'Learn More',
    'common.back': 'Back',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.theme': 'Tema',
    'nav.skills': 'Habilidades',
    
    // Hero Section
    'hero.greeting': 'Hola, soy Diego 👋',
    'hero.title': 'Científico de Datos y Desarrollador Full-Stack',
    'hero.description': 'Científico de Datos y Desarrollador Full-Stack especializado en machine learning, visualización de datos y soluciones web escalables. Actualmente estudiando Ciencia de Datos en ESCOM-IPN con más de 3 años de experiencia práctica entregando insights basados en datos y aplicaciones listas para producción.',
    'hero.summary': 'Científico de datos y desarrollador full-stack apasionado con un historial comprobado de transformar conjuntos de datos complejos en insights de negocio accionables. Experto en construir pipelines de machine learning de extremo a extremo, desde la recolección y preprocesamiento de datos hasta el despliegue y monitoreo de modelos.',
    'hero.cta.projects': 'Ver Proyectos',
    'hero.cta.contact': 'Contactar',
    
    // About Section
    'about.title': 'Acerca de Mí',
    'about.description': 'Prospero en la intersección de la ciencia de datos y la ingeniería de software, creando soluciones escalables que generan valor real para el negocio.',
    
    // Skills Section
    'skills.title': 'Habilidades y Tecnologías',
    'skills.description': 'Tecnologías y herramientas con las que trabajo',
    'skills.categories.datascience': 'Ciencia de Datos',
    'skills.categories.ml': 'Machine Learning',
    'skills.categories.databases': 'Bases de Datos',
    'skills.categories.versioncontrol': 'Control de Versiones',
    'skills.categories.cloud': 'Cloud y DevOps',
    'skills.categories.web': 'Desarrollo Web',
    
    // Projects Section
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Echa un vistazo a mi último trabajo',
    'projects.viewall': 'Ver Todos los Proyectos',
    'projects.totalProjects': 'proyectos en total',
    'projects.total': 'proyectos en total',
    'projects.filtering': 'Filtrando por',
    'projects.search.placeholder': 'Buscar proyectos por nombre o tecnología...',
    'projects.search.clear': 'Limpiar búsqueda',
    'projects.search.notfound': 'No se encontraron proyectos',
    'projects.search.notfoundDesc': 'No se encontraron proyectos que coincidan con',
    'projects.filters.show': 'Mostrar filtros',
    'projects.filters.hide': 'Ocultar filtros',
    'projects.filters.category': 'Filtrar por categoría',
    'projects.filters.clear': 'Limpiar filtros',
    'projects.filters.showing': 'Mostrando',
    'projects.filters.of': 'de',
    'projects.cta.title': '¿Creamos algo increíble juntos?',
    'projects.cta.description': '¿Interesado en colaborar o quieres discutir un proyecto? Siempre estoy abierto a nuevas oportunidades y desafíos.',
    'projects.cta.linkedin': 'Conectar en LinkedIn',
    'projects.cta.github': 'Ver GitHub',
    'projects.cta.email': 'Enviar Email',
    'projects.viewproject': 'Ver Proyecto',
    'projects.viewcode': 'Ver Código',
    'projects.technologies': 'Tecnologías',
    'projects.links': 'Enlaces del proyecto',
    'projects.active': 'Activo',
    'projects.inactive': 'Completado',
    'projects.activeProject': 'Proyecto Activo',
    'projects.achievements': 'Logros Destacados',
    'projects.completedRequirements': 'Proyecto completado cumpliendo todos los requisitos solicitados.',
    'projects.additionalFeatures': 'Implementación de características adicionales que mejoran la experiencia de usuario.',
    'projects.metricsDisclaimer': 'Esta sección muestra métricas e impacto del proyecto. Los datos presentados están basados en resultados reales o estimaciones aproximadas.',
    'projects.clickLinks': 'Haz clic en los enlaces para visitar el sitio del proyecto o el repositorio de código.',
    'projects.card.clickToView': 'Click para ver más',
    'projects.description': 'Explora mis proyectos en data science, optimización matemática y dashboards interactivos.',
    'projects.preview': 'Vista Previa',
    'projects.impact': 'Impacto',
    'projects.metricsResults': 'Métricas y Resultados',
    'projects.completionRate': 'Tasa de Finalización',
    'projects.clientRating': 'Evaluación del Cliente',
    'projects.qualityGrade': 'Calificación de Calidad',
    'projects.playVideo': 'Reproducir el video para ver una demostración del proyecto.',
    'projects.previewDescription': 'Vista previa del proyecto. Para más detalles, consulta los enlaces en la pestaña de descripción.',
    'projects.optimizedCode': 'Código optimizado para máximo rendimiento y escalabilidad.',
    
    // Project Descriptions
    'projects.descriptions.sarima': 'Desarrollé un modelo de series temporales SARIMA para pronosticar la demanda de viajes aéreos domésticos durante 5 años, analizando 36 años de datos históricos de las autoridades de aviación mexicanas. Logré una precisión de pronóstico del 92% mediante validación cruzada, permitiendo la optimización de la planificación de capacidad para las principales aerolíneas.',
    'projects.descriptions.melari': 'Lideré el desarrollo full-stack de una plataforma de bienestar optimizada para SEO usando Astro/React, resultando en un 40% de aumento en las conversiones de reservas. Implementé un pipeline CI/CD con Vercel logrando 99.9% de tiempo de actividad. Integré CMS headless para gestión dinámica de contenido.',
    'projects.descriptions.financial': 'Diseñé un sistema automatizado de reportes financieros usando Excel VBA, reduciendo el tiempo de procesamiento manual en 15 horas/semana. Incluye visualizaciones dinámicas de P&L, módulos de pronóstico de flujo de efectivo y seguimiento de KPIs para más de 200 ubicaciones de sucursales.',
    'projects.descriptions.houses': 'Construí un pipeline de machine learning (Random Forest Regressor) prediciendo valores de propiedades con un puntaje R² del 88%. Ingenié características a partir de datos geoespaciales y tendencias del mercado. Desplegué como API Flask para estimaciones de valuación en tiempo real.',
    'projects.descriptions.videogames': 'Creé un dashboard interactivo de Power BI analizando el mercado global de videojuegos de $60B. Integré datos de ventas de 15 plataformas, habilitando insights de estrategia de producto a través de tendencias de género y análisis de rendimiento regional.',
    'projects.descriptions.portfolio': 'Arquitecturé un portafolio de alto rendimiento usando Next.js SSG, logrando puntajes perfectos de Lighthouse. Implementé modo oscuro, showcases de proyectos y sistema de contenido basado en MDX. Sirve como plantilla de grado de producción para portafolios de desarrolladores.',
    'projects.descriptions.codemaster': 'Pionero en plataforma de educación de programación gamificada con backend Django soportando más de 10k usuarios. Incluye playgrounds de código, retroalimentación asistida por IA y seguimiento de progreso. Ganó 2do lugar en los Premios de Innovación EdTech 2024.',
    'projects.descriptions.airquality': 'Ingenié un pipeline ETL en tiempo real procesando más de 2M de registros diarios de calidad del aire de más de 500 estaciones de monitoreo. Construí dashboard de análisis geoespacial con PySpark, reduciendo el tiempo de procesamiento de datos en 75% y habilitando modelado predictivo de contaminación.',
    'projects.descriptions.population': 'Desarrollé un dashboard integral de análisis demográfico rastreando tendencias poblacionales a través de 7 continentes. Integré múltiples fuentes de datos con procesos ETL automatizados, presentando visualizaciones interactivas y capacidades de pronóstico de tendencias.',
    'projects.descriptions.health': 'Construí un dashboard integral de análisis de salud analizando tendencias de esperanza de vida y tasas de mortalidad infantil en más de 195 países. Incluye análisis de correlación, pronóstico de series temporales e integración de factores socioeconómicos.',
    'projects.descriptions.default': 'Proyecto innovador que demuestra experiencia técnica y capacidades de resolución de problemas.',
    
    // Experience Section
    'experience.title': 'Experiencia',
    'experience.education': 'Educación',
    'experience.work': 'Experiencia Laboral',
    
    // Contact Form
    'contact.title': 'Contáctame',
    'contact.description': '¿Tienes un proyecto en mente? ¡Me encantaría escuchar de ti y colaborar juntos!',
    'contact.name': 'Nombre',
    'contact.name.placeholder': 'Tu nombre',
    'contact.email': 'Email',
    'contact.email.placeholder': 'tu@email.com',
    'contact.subject': 'Asunto',
    'contact.subject.placeholder': '¿De qué quieres hablar?',
    'contact.message': 'Mensaje',
    'contact.message.placeholder': 'Cuéntame sobre tu proyecto o idea...',
    'contact.send': 'Enviar Mensaje',
    'contact.sending': 'Enviando...',
    'contact.success': 'Mensaje enviado correctamente. ¡Te responderé pronto!',
    'contact.error': 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
    
    // Validation messages
    'validation.name.min': 'El nombre debe tener al menos 2 caracteres.',
    'validation.email.invalid': 'Por favor ingresa un email válido.',
    'validation.subject.min': 'El asunto debe tener al menos 5 caracteres.',
    'validation.message.min': 'El mensaje debe tener al menos 10 caracteres.',
    
    // Status and Labels
    'status.available': 'Disponible para trabajar',
    'status.experiences': 'Experiencias',
    'status.degrees': 'Títulos',
    'status.certifications': 'Crecimiento Profesional',
    'status.present': 'Presente',
    
    // Roles
    'roles.datascientist': 'Científico de Datos',
    'roles.fullstack': 'Desarrollador Full-Stack',
    'roles.mlengineer': 'Ingeniero ML',
    
    // Metrics
    'metrics.forecasting': 'Precisión de Pronósticos',
    'metrics.conversion': 'Mejoras de Conversión',
    'metrics.experience': 'Años de Experiencia',
    'metrics.records': 'Registros Diarios',
    
    // About quotes
    'about.quote': 'Prospero en la intersección de la ciencia de datos y la ingeniería de software, creando soluciones que conectan algoritmos complejos con aplicaciones fáciles de usar.',
    'about.studying': 'Actualmente estudiando Ciencia de Datos en',
    'about.currentlyPursuing': 'Actualmente estudiando Ciencia de Datos en ESCOM-IPN',
    'about.opportunity': 'Actualmente estoy abierto a nuevas oportunidades en ciencia de datos, machine learning y desarrollo full-stack. Ya sea que necesites análisis predictivo, soluciones web o dashboards de visualización de datos, hablemos sobre cómo puedo ayudar a impulsar tu negocio.',
    
    // Contact Section
    'contact.hero.title': '¿Listo para Transformar Datos en Impacto?',
    'contact.hero.description': 'Actualmente estoy abierto a nuevas oportunidades en ciencia de datos, machine learning y desarrollo full-stack. Ya sea que necesites análisis predictivo, soluciones web o dashboards de visualización de datos, hablemos sobre cómo puedo ayudar a impulsar tu negocio.',
    'contact.status.available': 'Disponible para trabajar',
    'contact.status.location': 'Ciudad de México, MX',
    'contact.status.student': 'Estudiante de Ciencia de Datos',
    'contact.alternative.title': 'O conéctate directamente',
    'contact.response.time': 'Respuestas por email en 24h',
    'contact.linkedin.note': 'LinkedIn para consultas profesionales',
    'contact.remote.note': 'Abierto a oportunidades remotas e híbridas',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.readmore': 'Leer Más',
    'common.showless': 'Mostrar Menos',
    'common.learnmore': 'Saber Más',
    'common.back': 'Volver',
  },
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load language from localStorage on mount
  useEffect(() => {
    if (!isClient) return;
    
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, [isClient]);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (!isClient) return;
    
    localStorage.setItem('language', language);
  }, [language, isClient]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    isClient,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export type { Language };