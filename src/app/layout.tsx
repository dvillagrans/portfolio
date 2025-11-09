import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StructuredData } from "@/components/StructuredData";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { PageTransition } from "@/components/page-transition";
import { OfflineIndicator } from "@/components/offline-indicator";
import { ServiceWorkerProvider } from "@/components/service-worker-provider";
import { I18nProvider } from "@/contexts/i18n-context";
import { ProfileProvider } from "@/contexts/profile-context";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} - Data Scientist & Full-Stack Developer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Data Scientist",
    "Machine Learning",
    "Full-Stack Developer",
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "México",
    "ESCOM-IPN",
    "Análisis de Datos",
    "Inteligencia Artificial",
    "Diego Villagran",
    "Portfolio",
    "Ciencia de Datos",
    "Web Development"
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
        url: `${DATA.url}/img/me.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Data Scientist Portfolio`,
      },
    ],
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
  twitter: {
    title: `${DATA.name} - Data Scientist & Full-Stack Developer`,
    description: DATA.description,
    card: "summary_large_image",
    images: [`${DATA.url}/img/me.webp`],
    creator: "@dvillagrans",
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: DATA.url,
    languages: {
      'es-MX': DATA.url,
      'en-US': `${DATA.url}/en`
    }
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: DATA.name,
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'preload': '/img/me.webp',
    'preconnect': 'https://fonts.googleapis.com'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={DATA.name} />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StructuredData />
        <ServiceWorkerProvider>
          <I18nProvider>
            <ProfileProvider>
              <ThemeProvider attribute="class" defaultTheme="dark">
                <TooltipProvider delayDuration={0}>
                  <PageTransition>
                    {children}
                  </PageTransition>
                  <Navbar />
                  <ScrollToTop />
                  <OfflineIndicator />
                  <Toaster richColors position="top-right" />
                </TooltipProvider>
              </ThemeProvider>
            </ProfileProvider>
          </I18nProvider>
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}
