"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translations object
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
    'hero.description': 'Data Scientist & Full-Stack Developer specializing in machine learning, data visualization, and scalable web solutions. Currently pursuing Data Science at ESCOM-IPN with 3+ years of hands-on experience delivering data-driven insights and production-ready applications.',
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
    'projects.description': 'Some of my recent work',
    'projects.viewall': 'View All Projects',
    'projects.totalProjects': 'total projects',
    'projects.total': 'projects in total',
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
    'projects.cta.title': 'Let\'s create something amazing together?',
    'projects.cta.description': 'Interested in collaborating or want to discuss a project? I\'m always open to new opportunities and challenges.',
    'projects.cta.linkedin': 'Connect on LinkedIn',
    'projects.cta.github': 'View GitHub',
    'projects.cta.email': 'Send Email',
    'projects.viewproject': 'View Project',
    'projects.viewcode': 'View Code',
    'projects.technologies': 'Technologies',
    'projects.links': 'Links',
    'projects.active': 'Active',
    'projects.inactive': 'Completed',
    'projects.activeProject': 'Active Project',
    'projects.achievements': 'Outstanding Achievements',
    'projects.completedRequirements': 'Project completed meeting all requested requirements.',
    'projects.additionalFeatures': 'Implementation of additional features that improve user experience.',
    'projects.metricsDisclaimer': 'This section shows project metrics and impact. The data presented is based on real results or approximate estimates.',
    'projects.clickLinks': 'Click on the links to visit the project site or code repository.',
    
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
    'projects.description': 'Algunos de mis trabajos recientes',
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
    'projects.links': 'Enlaces',
    'projects.active': 'Activo',
    'projects.inactive': 'Completado',
    'projects.activeProject': 'Proyecto Activo',
    'projects.achievements': 'Logros Destacados',
    'projects.completedRequirements': 'Proyecto completado cumpliendo todos los requisitos solicitados.',
    'projects.additionalFeatures': 'Implementación de características adicionales que mejoran la experiencia de usuario.',
    'projects.metricsDisclaimer': 'Esta sección muestra métricas e impacto del proyecto. Los datos presentados están basados en resultados reales o estimaciones aproximadas.',
    'projects.clickLinks': 'Haz clic en los enlaces para visitar el sitio del proyecto o el repositorio de código.',
    
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

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
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