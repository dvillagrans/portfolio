import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StructuredData } from "@/components/StructuredData";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
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
    "Inteligencia Artificial",
    "Diego Villagran",
    "Portfolio",
    "Ciencia de Datos"
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
        alt: `${DATA.name} - Data Scientist Portfolio`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${DATA.name} - Data Scientist`,
    description: DATA.description,
    creator: "@dvillagrans",
    images: [`${DATA.url}/img/me.webp`]
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
    google: "",
  },
  alternates: {
    canonical: DATA.url,
    languages: {
      'es-MX': DATA.url,
      'en-US': `${DATA.url}/en`
    }
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <StructuredData />
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
