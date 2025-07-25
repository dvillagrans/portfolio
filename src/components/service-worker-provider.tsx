"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";
import { useEffect } from "react";

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

export function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const serviceWorker = useServiceWorker();

  useEffect(() => {
    // Service worker is automatically registered in the hook
    // No need to call it manually here
  }, []);

  return <>{children}</>;
}