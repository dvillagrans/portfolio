# Optimización SEO y Rendimiento - Portfolio Diego Villagran

## 1. Análisis de Métricas Actuales

### Métricas de Rendimiento
- **First Contentful Paint (FCP)**: 0.3s ✅ (Excelente - < 1.8s)
- **Largest Contentful Paint (LCP)**: 1.4s ✅ (Bueno - < 2.5s)
- **Total Blocking Time (TBT)**: 410ms ❌ (Alto - debe ser < 200ms)
- **Cumulative Layout Shift (CLS)**: 0.008 ✅ (Excelente - < 0.1)
- **Speed Index**: 1.1s ✅ (Bueno - < 3.4s)

### Problemas Identificados
1. **Total Blocking Time elevado (410ms)** - Principal problema
2. Falta de structured data para SEO
3. Metadatos incompletos (faltan keywords, author)
4. Optimización de imágenes mejorable
5. Falta de lazy loading en componentes pesados

## 2. Optimizaciones de Rendimiento

### 2.1 Reducción del Total Blocking Time

#### Code Splitting Avanzado
```javascript
// Implementar en next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    domains: ['i.postimg.cc'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000
  }
};
```

#### Lazy Loading de Componentes
```javascript
// Implementar en page.tsx
import dynamic from 'next/dynamic';

// Lazy load componentes pesados
const ParticlesDemo = dynamic(() => import('@/components/ParticlesDemo'), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded" />
});

const IconCloudDemo = dynamic(() => import('@/components/ui/cloud-icon'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded" />
});

const MarqueeDemo = dynamic(() => import('@/components/MarqueeDemo'), {
  ssr: false
});
```

#### Optimización de Animaciones
```javascript
// Usar CSS transforms en lugar de JavaScript
// Reemplazar animaciones JavaScript pesadas con CSS
.animate-float {
  animation: float 6s ease-in-out infinite;
  will-change: transform;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### 2.2 Optimización de Imágenes

#### Configuración Next.js Image
```javascript
// Usar Next.js Image component
import Image from 'next/image';

<Image
  src="/img/me.webp"
  alt="Diego Villagran - Data Scientist"
  width={400}
  height={400}
  priority={true} // Para imágenes above-the-fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

#### Preload de Recursos Críticos
```javascript
// Agregar en layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/img/me.webp" as="image" type="image/webp" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 3. Optimizaciones SEO

### 3.1 Metadatos Mejorados

#### Layout.tsx Optimizado
```javascript
export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} - Data Scientist & Full-Stack Developer`,
    template: `%s | ${DATA.name}`,
  },
  description: "Data Scientist y Full-Stack Developer especializado en machine learning, visualización de datos y soluciones web escalables. 3+ años de experiencia en México.",
  keywords: [
    "Data Scientist",
    "Machine Learning",
    "Full-Stack Developer",
    "Python",
    "React",
    "México",
    "ESCOM-IPN",
    "Análisis de Datos",
    "Inteligencia Artificial"
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  openGraph: {
    title: `${DATA.name} - Data Scientist & Full-Stack Developer`,
    description: DATA.description,
    url: DATA.url,
    siteName: `Portfolio de ${DATA.name}`,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: `${DATA.url}/img/og-image.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Data Scientist Portfolio`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Data Scientist`,
    description: DATA.description,
    creator: "@dvillagrans",
    images: [`${DATA.url}/img/og-image.webp`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion",
  },
  alternates: {
    canonical: DATA.url,
    languages: {
      'es-MX': DATA.url,
      'en-US': `${DATA.url}/en`
    }
  }
};
```

### 3.2 Structured Data (JSON-LD)

#### Componente StructuredData
```javascript
// components/StructuredData.tsx
export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": DATA.name,
    "jobTitle": "Data Scientist & Full-Stack Developer",
    "description": DATA.description,
    "url": DATA.url,
    "image": `${DATA.url}/img/me.webp`,
    "sameAs": [
      DATA.contact.social.LinkedIn.url,
      DATA.contact.social.GitHub.url
    ],
    "worksFor": {
      "@type": "EducationalOrganization",
      "name": "ESCOM-IPN"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "ESCOM-IPN"
    },
    "knowsAbout": [
      "Data Science",
      "Machine Learning",
      "Python",
      "React",
      "Full-Stack Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mexico City",
      "addressCountry": "MX"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `Portfolio de ${DATA.name}`,
    "url": DATA.url,
    "description": DATA.description,
    "author": {
      "@type": "Person",
      "name": DATA.name
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
```

### 3.3 Sitemap Mejorado

```javascript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = DATA.url;
  const currentDate = new Date();
  
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
    }
  ];

  // Agregar proyectos individuales
  const projectRoutes = DATA.projects.map((project) => ({
    url: `${baseUrl}/projects/${encodeURIComponent(project.title.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
```

## 4. Optimizaciones Técnicas

### 4.1 Service Worker Mejorado

```javascript
// public/sw.js - Optimizado
const CACHE_NAME = 'portfolio-v2';
const STATIC_ASSETS = [
  '/',
  '/projects',
  '/img/me.webp',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
```

### 4.2 Optimización de Fuentes

```javascript
// layout.tsx - Optimización de fuentes
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});
```

### 4.3 Compresión y Minificación

```javascript
// next.config.mjs - Configuración de compresión
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      };
    }
    return config;
  },
};
```

## 5. Plan de Implementación

### Fase 1: Optimizaciones Críticas (Semana 1)
1. ✅ Implementar lazy loading en componentes pesados
2. ✅ Optimizar configuración de Next.js
3. ✅ Agregar preload de recursos críticos
4. ✅ Implementar code splitting

### Fase 2: SEO Avanzado (Semana 2)
1. ✅ Actualizar metadatos completos
2. ✅ Implementar structured data
3. ✅ Optimizar sitemap
4. ✅ Agregar verificación de Google Search Console

### Fase 3: Optimizaciones Avanzadas (Semana 3)
1. ✅ Optimizar service worker
2. ✅ Implementar compresión avanzada
3. ✅ Optimizar fuentes y recursos
4. ✅ Testing y monitoreo

## 6. Métricas Objetivo

### Objetivos de Rendimiento
- **Total Blocking Time**: < 200ms (reducir de 410ms)
- **First Contentful Paint**: Mantener < 0.5s
- **Largest Contentful Paint**: Mantener < 1.5s
- **Speed Index**: Mantener < 1.2s
- **Cumulative Layout Shift**: Mantener < 0.1

### Objetivos SEO
- Google PageSpeed Score: > 90
- Core Web Vitals: Todos en verde
- Indexación completa en Google (verificar con Search Console)
- Rich snippets funcionando correctamente

## 7. Herramientas de Monitoreo

### Herramientas Recomendadas
1. **Google PageSpeed Insights** - Monitoreo mensual
2. **Google Search Console** - Monitoreo semanal
3. **Lighthouse CI** - Integración en CI/CD
4. **Web Vitals Extension** - Testing local
5. **GTmetrix** - Análisis detallado

### Scripts de Monitoreo
```bash
# performance_check.sh - Mejorado
#!/bin/bash
npx lighthouse https