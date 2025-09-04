const CACHE_NAME = 'portfolio-v2'
const STATIC_CACHE = 'static-v2'
const DYNAMIC_CACHE = 'dynamic-v2'

// Archivos esenciales para cachear
const STATIC_ASSETS = [
  '/',
  '/projects',
  '/img/me.webp',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.svg'
]

// Archivos que siempre deben ser frescos
const NETWORK_FIRST = [
  '/api/',
  '/_next/webpack-hmr'
]

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Service Worker: Installed successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error)
      })
  )
})

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated successfully')
        return self.clients.claim()
      })
  )
})

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return
  }
  
  // Ignorar requests que no son HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return
  }
  
  // Ignorar requests de desarrollo y HMR
  if (url.pathname.includes('_next/webpack-hmr') || 
      url.pathname.includes('_next/static/chunks/webpack') ||
      url.searchParams.has('_rsc') ||
      (url.searchParams.has('v=') && url.pathname.includes('_next/static/'))) {
    return
  }
  
  // Network first para APIs
  if (NETWORK_FIRST.some(path => url.pathname.startsWith(path))) {
    event.respondWith(networkFirst(request))
    return
  }
  
  // Cache first para assets estáticos (sin versioning)
  if ((url.pathname.startsWith('/_next/static/') && !url.searchParams.has('v=')) || 
      url.pathname.startsWith('/img/') ||
      url.pathname.endsWith('.webp') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.ico')) {
    event.respondWith(cacheFirst(request))
    return
  }
  
  // Solo manejar navegación de páginas
  if (request.mode === 'navigate' || 
      (request.method === 'GET' && request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(staleWhileRevalidate(request))
  }
})

// Estrategia: Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone()).catch(() => {
        // Ignorar errores de caché silenciosamente
      })
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache...', error)
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Fallback para páginas offline
    if (request.destination === 'document' || 
        (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
      const offlineHTML = '<!DOCTYPE html><html><head><title>Offline</title><meta charset="utf-8"><style>body{font-family:system-ui;text-align:center;padding:2rem}.offline{max-width:400px;margin:0 auto}.icon{font-size:4rem;margin-bottom:1rem}</style></head><body><div class="offline"><div class="icon">📱</div><h1>Offline</h1><p>No internet connection available.</p><button onclick="location.reload()">Retry</button></div></body></html>'
      
      return new Response(offlineHTML, {
        headers: { 'Content-Type': 'text/html' }
      })
    }
    
    return new Response('', { status: 404, statusText: 'Not Found' })
  }
}

// Estrategia: Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok && networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone()).catch(() => {
        // Ignorar errores de caché silenciosamente
      })
    }
    
    return networkResponse
  } catch (error) {
    console.warn('Cache first failed for:', request.url, error)
    return new Response('', { status: 404, statusText: 'Not Found' })
  }
}

// Estrategia: Stale While Revalidate
async function staleWhileRevalidate(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)
    
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok && networkResponse.status === 200) {
        cache.put(request, networkResponse.clone()).catch(() => {
          // Ignorar errores de caché silenciosamente
        })
      }
      return networkResponse
    }).catch((error) => {
      console.warn('Network failed in stale-while-revalidate:', error)
      return cachedResponse
    })
    
    return cachedResponse || fetchPromise
  } catch (error) {
    console.warn('Stale while revalidate failed:', error)
    try {
      return await fetch(request)
    } catch (fetchError) {
      return new Response('', { status: 404, statusText: 'Not Found' })
    }
  }
}

// Limpiar cache periódicamente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      )
    }).then(() => {
      self.registration.unregister()
    })
  }
})
