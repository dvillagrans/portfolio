"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics tracking ID - reemplaza con tu ID real
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Función para enviar eventos a Google Analytics
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Hook para trackear page views
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = pathname + searchParams.toString();
      gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);
}

// Componente de Analytics
export function Analytics() {
  useAnalytics();

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Funciones de utilidad para trackear eventos
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackProjectView = (projectName: string) => {
  trackEvent('view_project', 'engagement', projectName);
};

export const trackContactForm = (action: 'submit' | 'success' | 'error') => {
  trackEvent(`contact_form_${action}`, 'contact');
};

export const trackDownload = (fileName: string) => {
  trackEvent('download', 'engagement', fileName);
};