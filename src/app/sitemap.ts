import { MetadataRoute } from 'next'
import { DATA } from '@/data/resume'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Agregar páginas individuales de proyectos si las tienes
    ...DATA.projects.map((project) => ({
      url: `${baseUrl}/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}