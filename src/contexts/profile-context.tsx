'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ProfileType = 'ml-engineer' | 'data-engineer' | 'devops-engineer' | 'data-analyst';

export interface ProfileMetadata {
  id: ProfileType;
  title: string;
  titleEs: string;
  tagline: string;
  taglineEs: string;
  description: string;
  descriptionEs: string;
  icon: string;
  color: string;
  resumePdf: string;
  themeClass: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

interface ProfileContextType {
  profile: ProfileType;
  setProfile: (profile: ProfileType) => void;
  getProfileMetadata: (profile: ProfileType) => ProfileMetadata;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const PROFILE_METADATA: Record<ProfileType, ProfileMetadata> = {
  'ml-engineer': {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    titleEs: 'Ingeniero de Machine Learning',
    tagline: 'MLOps | Applied AI | Model Training & Serving',
    taglineEs: 'MLOps | IA Aplicada | Entrenamiento y Despliegue de Modelos',
    description: 'Data Science student with hands-on experience building machine learning pipelines, model training and serving, and data processing APIs in production.',
    descriptionEs: 'Estudiante de Ciencia de Datos con experiencia práctica construyendo pipelines de machine learning, entrenamiento y despliegue de modelos, y APIs de procesamiento de datos en producción.',
    icon: '🤖',
    color: 'from-purple-500 to-pink-500',
    resumePdf: '/resumes/diego_villagran_resume_ml.pdf',
    themeClass: 'theme-ml-engineer',
    seoTitle: 'Diego — MLOps & ML Engineer Portfolio',
    seoDescription: 'Deploys reproducibles, monitoreados y sin sorpresas. Modelos en producción con observabilidad y retraining automático.',
    ogImage: '/img/patterns/mlops-particles.svg'
  },
  'data-engineer': {
    id: 'data-engineer',
    title: 'Data Engineer',
    titleEs: 'Ingeniero de Datos',
    tagline: 'ETL Developer | Pipeline Automation | Data Warehousing',
    taglineEs: 'Desarrollador ETL | Automatización de Pipelines | Data Warehousing',
    description: 'Data Science student with hands-on experience building ETL pipelines, orchestration workflows, and automated data integration systems in production environments.',
    descriptionEs: 'Estudiante de Ciencia de Datos con experiencia práctica construyendo pipelines ETL, flujos de orquestación y sistemas automatizados de integración de datos en entornos de producción.',
    icon: '⚙️',
    color: 'from-blue-500 to-cyan-500',
    resumePdf: '/resumes/diego_villagran_resume_etl.pdf',
    themeClass: 'theme-data-engineer',
    seoTitle: 'Diego — Data Engineering Portfolio',
    seoDescription: 'Pipelines que no se rompen, linaje vivo y costos bajo control. Datos listos para BI y ML.',
    ogImage: '/img/patterns/pipelines-flow.svg'
  },
  'devops-engineer': {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    titleEs: 'Ingeniero DevOps',
    tagline: 'Containerization | CI/CD | Observability',
    taglineEs: 'Contenedores | CI/CD | Observabilidad',
    description: 'Engineer with hands-on experience designing and operating containerized services, CI/CD pipelines, observability, and operational automation.',
    descriptionEs: 'Ingeniero con experiencia práctica diseñando y operando servicios en contenedores, pipelines CI/CD, observabilidad y automatización operacional.',
    icon: '🚀',
    color: 'from-green-500 to-teal-500',
    resumePdf: '/resumes/diego_villagran_resume_devops.pdf',
    themeClass: 'theme-devops-engineer',
    seoTitle: 'Diego — DevOps & Observability Portfolio',
    seoDescription: 'Deploys aburridos, incidentes breves y métricas claras. SLOs, alertas y costos controlados.',
    ogImage: '/img/patterns/infra-grid.svg'
  },
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    titleEs: 'Analista de Datos',
    tagline: 'SQL | BI Dashboards | Statistical Analysis',
    taglineEs: 'SQL | Dashboards BI | Análisis Estadístico',
    description: 'Data Analyst with strong SQL, data cleaning, and dashboarding skills. Experience turning unstructured data into analysis-ready tables and building automated datasets for reporting.',
    descriptionEs: 'Analista de Datos con sólidas habilidades en SQL, limpieza de datos y creación de dashboards. Experiencia convirtiendo datos no estructurados en tablas listas para análisis y construyendo datasets automatizados para reportes.',
    icon: '📊',
    color: 'from-orange-500 to-red-500',
    resumePdf: '/resumes/diego_villagran_resume_analyst.pdf',
    themeClass: 'theme-data-analyst',
    seoTitle: 'Diego — Analytics & Dashboard Portfolio',
    seoDescription: 'Insights que provocan decisiones. Dashboards con adopción real y storytelling accionable.',
    ogImage: '/img/patterns/analytics-tiles.svg'
  }
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>('ml-engineer');
  const [isClient, setIsClient] = useState(false);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load profile from localStorage on mount
  useEffect(() => {
    if (!isClient) return;

    const savedProfile = localStorage.getItem('profile') as ProfileType;
    if (savedProfile && PROFILE_METADATA[savedProfile]) {
      setProfile(savedProfile);
    }
  }, [isClient]);

  // Save profile to localStorage when it changes
  useEffect(() => {
    if (!isClient) return;

    localStorage.setItem('profile', profile);
  }, [profile, isClient]);

  const getProfileMetadata = (profileType: ProfileType): ProfileMetadata => {
    return PROFILE_METADATA[profileType];
  };

  const value = {
    profile,
    setProfile,
    getProfileMetadata,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
