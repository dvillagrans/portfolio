"use client"

import { useServiceWorker, usePWA } from "@/hooks/useServiceWorker"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, WifiOff, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"

export function OfflineIndicator() {
  const { isOnline, isUpdateAvailable, updateServiceWorker } = useServiceWorker()
  const { isInstallable, installPWA } = usePWA()
  const [isUpdating, setIsUpdating] = useState(false)
  const [showReconnected, setShowReconnected] = useState(false)
  const wasOfflineRef = useRef(false)
  const reconnectedTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Manejar el estado de reconexión
  useEffect(() => {
    if (!isOnline) {
      // Marcar que estuvimos offline
      wasOfflineRef.current = true
      setShowReconnected(false)
      // Limpiar timeout si existe
      if (reconnectedTimeoutRef.current) {
        clearTimeout(reconnectedTimeoutRef.current)
        reconnectedTimeoutRef.current = null
      }
    } else if (isOnline && wasOfflineRef.current) {
      // Solo mostrar "conexión restaurada" si estuvimos offline antes
      setShowReconnected(true)
      wasOfflineRef.current = false
      
      // Ocultar el mensaje después de 3 segundos
      reconnectedTimeoutRef.current = setTimeout(() => {
        setShowReconnected(false)
      }, 3000)
    }

    // Cleanup
    return () => {
      if (reconnectedTimeoutRef.current) {
        clearTimeout(reconnectedTimeoutRef.current)
      }
    }
  }, [isOnline])

  const handleUpdate = async () => {
    setIsUpdating(true)
    await updateServiceWorker()
    setIsUpdating(false)
  }

  return (
    <>
      {/* Indicador de estado offline */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Card className="bg-orange-500/90 backdrop-blur-sm border-orange-400 text-white shadow-lg">
              <CardContent className="flex items-center gap-3 py-3 px-4">
                <WifiOff className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Sin conexión - Modo offline activado
                </span>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de conexión restaurada - solo cuando se recupera de offline */}
      <AnimatePresence>
        {showReconnected && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30
            }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-green-500/90 backdrop-blur-sm border-green-400 text-white shadow-lg">
                <CardContent className="flex items-center gap-3 py-3 px-4">
                  <Wifi className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    Conexión restaurada
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificación de actualización disponible */}
      <AnimatePresence>
        {isUpdateAvailable && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="bg-blue-500/90 backdrop-blur-sm border-blue-400 text-white shadow-lg max-w-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">
                      Nueva versión disponible
                    </h4>
                    <p className="text-xs opacity-90 mb-3">
                      Actualiza para obtener las últimas mejoras
                    </p>
                    <Button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      size="sm"
                      variant="secondary"
                      className="w-full"
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                          Actualizando...
                        </>
                      ) : (
                        'Actualizar ahora'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de instalación PWA */}
      <AnimatePresence>
        {isInstallable && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: 2 // Aparecer después de un momento
            }}
            className="fixed bottom-4 left-4 z-50"
          >
            <Card className="bg-purple-500/90 backdrop-blur-sm border-purple-400 text-white shadow-lg max-w-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">
                      Instalar aplicación
                    </h4>
                    <p className="text-xs opacity-90 mb-3">
                      Accede más rápido desde tu dispositivo
                    </p>
                    <Button
                      onClick={installPWA}
                      size="sm"
                      variant="secondary"
                      className="w-full"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Instalar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Componente simple para mostrar estado de conexión en la navbar
export function ConnectionStatus() {
  const { isOnline } = useServiceWorker()

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2"
    >
      <div className={`w-2 h-2 rounded-full ${
        isOnline ? 'bg-green-500' : 'bg-red-500'
      }`} />
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </motion.div>
  )
}