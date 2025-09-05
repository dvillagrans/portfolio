import { MetadataRoute } from 'next'
import { DATA } from '@/data/resume'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url
  const currentDate = new Date()
  
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#skills`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  // Agregar proyectos individuales
  const projectRoutes = DATA.projects.map((project) => ({
    url: `${baseUrl}/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...projectRoutes]
}