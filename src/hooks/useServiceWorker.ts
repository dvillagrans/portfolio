"use client"

import { useEffect, useState } from 'react'

interface ServiceWorkerState {
  isOnline: boolean
  isInstalled: boolean
  isUpdateAvailable: boolean
  registration: ServiceWorkerRegistration | null
}

export function useServiceWorker() {
  const [state, setState] = useState<ServiceWorkerState>({
    isOnline: true,
    isInstalled: false,
    isUpdateAvailable: false,
    registration: null
  })

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') return

    // Estado inicial de conexión
    setState(prev => ({ ...prev, isOnline: navigator.onLine }))

    // Listeners para cambios de conexión
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Registrar service worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      setState(prev => ({ 
        ...prev, 
        isInstalled: true, 
        registration 
      }))

      console.log('Service Worker registrado exitosamente:', registration)

      // Verificar actualizaciones
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setState(prev => ({ ...prev, isUpdateAvailable: true }))
              console.log('Nueva versión disponible')
            }
          })
        }
      })

      // Escuchar mensajes del service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('Mensaje del Service Worker:', event.data)
      })

    } catch (error) {
      console.error('Error al registrar Service Worker:', error)
    }
  }

  const updateServiceWorker = async () => {
    if (state.registration) {
      try {
        await state.registration.update()
        window.location.reload()
      } catch (error) {
        console.error('Error al actualizar Service Worker:', error)
      }
    }
  }

  const unregisterServiceWorker = async () => {
    if (state.registration) {
      try {
        await state.registration.unregister()
        setState(prev => ({ 
          ...prev, 
          isInstalled: false, 
          isUpdateAvailable: false,
          registration: null 
        }))
        console.log('Service Worker desregistrado')
      } catch (error) {
        console.error('Error al desregistrar Service Worker:', error)
      }
    }
  }

  const clearCache = () => {
    if (state.registration && state.registration.active) {
      state.registration.active.postMessage({ type: 'CLEAR_CACHE' })
    }
  }

  return {
    ...state,
    updateServiceWorker,
    unregisterServiceWorker,
    clearCache
  }
}

// Hook para detectar si la app está siendo usada como PWA
export function usePWA() {
  const [isPWA, setIsPWA] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detectar si está en modo PWA
    const checkPWA = () => {
      const isPWAMode = window.matchMedia('(display-mode: standalone)').matches ||
                       (window.navigator as any).standalone ||
                       document.referrer.includes('android-app://')
      setIsPWA(isPWAMode)
    }

    checkPWA()

    // Listener para el evento de instalación
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setIsInstallable(false)
      setDeferredPrompt(null)
      console.log('PWA instalada exitosamente')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`)
      setDeferredPrompt(null)
      setIsInstallable(false)
    }
  }

  return {
    isPWA,
    isInstallable,
    installPWA
  }
}