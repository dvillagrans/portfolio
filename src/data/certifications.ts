export type CertLevel = 'specialization' | 'professional' | 'course';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerInitials: string;
  platform: 'coursera' | 'udemy' | 'google' | 'oracle' | 'github' | 'datacamp';
  year: number;
  month: string;
  skills: string[];
  level: CertLevel;
  imageUrl: string;
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  // 2024 — más recientes primero dentro del año
  {
    id: 'aws-deeplearning',
    name: 'Generative AI with LLMs',
    issuer: 'AWS + DeepLearning.AI',
    issuerInitials: 'AI',
    platform: 'coursera',
    year: 2024,
    month: 'Nov',
    skills: ['LLMs', 'Fine-tuning', 'RLHF', 'AWS Bedrock'],
    level: 'specialization',
    imageUrl: '/certs/aws-deeplearning.webp',
    credentialUrl: 'https://coursera.org/share/670b15ffaa93a2b32ef0bc8803b48fa0',
  },
  {
    id: 'google-ai-essentials',
    name: 'Google AI Essentials V1',
    issuer: 'Google - Coursera',
    issuerInitials: 'GO',
    platform: 'google',
    year: 2024,
    month: 'Oct',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Ethics'],
    level: 'professional',
    imageUrl: '/certs/google-ai-essentials.png',
    credentialUrl: 'https://www.credly.com/badges/1e3dfdbc-ec96-4e7c-a6e6-351eefae2390',
  },
  {
    id: 'datacamp-docker',
    name: 'Introduction to Docker',
    issuer: 'DataCamp',
    issuerInitials: 'DC',
    platform: 'datacamp',
    year: 2024,
    month: 'Oct',
    skills: ['Docker', 'Containers', 'DevOps'],
    level: 'professional',
    imageUrl: '/certs/datacamp-docker.webp',
    credentialUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/987dd238b61eaad76c0784e8bed1511c3eba9e78',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    issuer: 'GitHub',
    issuerInitials: 'GH',
    platform: 'github',
    year: 2024,
    month: 'Sep',
    skills: ['CI/CD', 'Automatización', 'DevOps'],
    level: 'course',
    imageUrl: '/certs/github-actions.webp',
  },
  {
    id: 'udemy-docker',
    name: 'Docker & Docker Compose',
    issuer: 'Udemy',
    issuerInitials: 'U',
    platform: 'udemy',
    year: 2024,
    month: 'Aug',
    skills: ['Docker', 'Contenedores', 'DevOps'],
    level: 'course',
    imageUrl: '/certs/udemy-docker.webp',
  },
  {
    id: 'sql-intermediate-datacamp',
    name: 'Intermediate SQL',
    issuer: 'DataCamp',
    issuerInitials: 'DC',
    platform: 'datacamp',
    year: 2024,
    month: 'Jun',
    skills: ['SQL', 'Joins', 'Subqueries', 'Aggregations'],
    level: 'course',
    imageUrl: '/certs/sql-intermediate-datacamp.png',
    credentialUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/9513ed23df423a9d3cc9dbdaf50e3e801f0e2541',
  },
  // 2023
  {
    id: 'google-cloud',
    name: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud',
    issuerInitials: 'GC',
    platform: 'google',
    year: 2023,
    month: 'May',
    skills: ['Cloud Computing', 'GCP', 'Infraestructura'],
    level: 'professional',
    imageUrl: '/certs/google-cloud.webp',
    credentialUrl: 'https://www.credly.com/badges/93bc9ccd-a8c6-4dca-b2e3-2b4d483beefe',
  },
  {
    id: 'oracle-db',
    name: 'Base de Datos Oracle',
    issuer: 'Oracle',
    issuerInitials: 'OR',
    platform: 'oracle',
    year: 2023,
    month: 'Mar',
    skills: ['SQL', 'PostgreSQL', 'Diseño de BD'],
    level: 'course',
    imageUrl: '/certs/oracle-db.webp',
  },
  {
    id: 'udemy-python',
    name: 'Data Science en Python + ChatGPT',
    issuer: 'Udemy',
    issuerInitials: 'U',
    platform: 'udemy',
    year: 2023,
    month: 'Jan',
    skills: ['Python', 'Data Science', 'ML'],
    level: 'course',
    imageUrl: '/certs/udemy-python.webp',
    credentialUrl: 'https://www.udemy.com/certificate/UC-f5d5c1ca-020e-4281-aef7-cb02cb25d01d/',
  },
  {
    id: 'coursera-docker',
    name: 'Fundamentos de Docker',
    issuer: 'Coursera',
    issuerInitials: 'CO',
    platform: 'coursera',
    year: 2023,
    month: 'Jan',
    skills: ['Docker', 'Contenedores', 'CI/CD'],
    level: 'course',
    imageUrl: '/certs/coursera-docker.webp',
  },
];

// Agrupa por año para la timeline
export const CERTS_BY_YEAR = CERTIFICATIONS.reduce((acc, cert) => {
  if (!acc[cert.year]) acc[cert.year] = [];
  acc[cert.year].push(cert);
  return acc;
}, {} as Record<number, Certification[]>);

// Un color por plataforma — discreto, coherente con el sistema CLARO
export const PLATFORM_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  coursera:  { bg: 'rgba(30,  58, 138, 0.08)', text: '#1e3a8a', border: 'rgba(30,58,138,0.2)' },
  udemy:     { bg: 'rgba(124, 45, 18,  0.08)', text: '#7c2d12', border: 'rgba(124,45,18,0.2)' },
  google:    { bg: 'rgba(20,  83, 45,  0.08)', text: '#14532d', border: 'rgba(20,83,45,0.2)' },
  oracle:    { bg: 'rgba(127, 29, 29,  0.08)', text: '#7f1d1d', border: 'rgba(127,29,29,0.2)' },
  github:    { bg: 'rgba(30,  30, 30,  0.06)', text: '#374151', border: 'rgba(30,30,30,0.15)' },
  datacamp:  { bg: 'rgba(5,   150,105, 0.08)', text: '#065f46', border: 'rgba(5,150,105,0.2)' },
};

// Badge de nivel — solo 3 estados (fondo claro)
export const LEVEL_BADGE: Record<CertLevel, { label: string; style: React.CSSProperties }> = {
  specialization: {
    label: 'ESPECIALIZACIÓN',
    style: {
      background: 'rgba(139,92,246,0.08)',
      color: '#7c3aed',
      border: '0.5px solid rgba(139,92,246,0.2)',
    },
  },
  professional: {
    label: 'PROFESIONAL',
    style: {
      background: 'rgba(245,158,11,0.08)',
      color: '#d97706',
      border: '0.5px solid rgba(245,158,11,0.2)',
    },
  },
  course: {
    label: 'CURSO',
    style: {
      background: 'rgba(0,0,0,0.04)',
      color: 'rgba(0,0,0,0.40)',
      border: '0.5px solid rgba(0,0,0,0.1)',
    },
  },
};

// Labels i18n
export const certLabels = {
  en: {
    sectionLabel: 'CERTIFICATIONS',
    title: 'Continuous learning backed',
    subtitle: 'by recognized credentials.',
    footerCount: (total: number, years: number) =>
      `${total} credentials · ${years} years of continuous learning`,
    footerVerify: 'Verifiable on original credential',
    yearCerts: (count: number) => `${count} CERTIFICATION${count > 1 ? 'S' : ''}`,
  },
  es: {
    sectionLabel: 'CERTIFICACIONES',
    title: 'Aprendizaje continuo respaldado',
    subtitle: 'por credenciales reconocidas.',
    footerCount: (total: number, years: number) =>
      `${total} credenciales · ${years} años de aprendizaje continuo`,
    footerVerify: 'Verificables en credencial original',
    yearCerts: (count: number) => `${count} CERTIFICADO${count > 1 ? 'S' : ''}`,
  },
};
