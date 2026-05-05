import { ProjectChat } from '@/components/ui/ProjectChat';
import { ConsoleEasterEgg } from '@/components/ui/ConsoleEasterEgg';
import { ViewTransitionDirector } from '@/components/ui/ViewTransitionDirector';
import GridOverlay from '@/components/ui/GridOverlay';
import { PersonSchema, WebSiteSchema } from '@/components/ui/SchemaOrg';
import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/hooks/ThemeContext";
import { ViewTransitions } from "next-view-transitions";
import { HtmlLang } from "@/components/ui/HtmlLang";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://www.dvillagrans.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Diego Villagran | AI & Data Engineer · ML Systems Builder",
    template: "%s | Diego Villagran",
  },
  description:
    "Senior AI & Data Engineer building production ML pipelines, LLM automation, and scalable infrastructure. Data Science student at ESCOM-IPN. Portfolio of data engineering, analytics, and full-stack systems.",
  keywords: [
    "Diego Villagran",
    "AI Engineer",
    "Data Engineer",
    "Machine Learning",
    "LLM",
    "Data Science",
    "Python",
    "Next.js",
    "Full Stack Developer",
    "portfolio",
  ],
  authors: [{ name: "Diego Villagran Salazar", url: BASE_URL }],
  creator: "Diego Villagran Salazar",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_MX",
    url: BASE_URL,
    siteName: "Diego Villagran — Portfolio",
    title: "Diego Villagran | AI & Data Engineer · ML Systems Builder",
    description:
      "Senior AI & Data Engineer building production ML pipelines, LLM automation, and scalable infrastructure.",
    // TODO: Consider a designed OG image (1200×630) with name + title + branding
    // For now using profile photo which works but isn't optimal for social sharing
    images: [
      {
        url: "/img/optimized/me-1200.webp",
        width: 1200,
        height: 630,
        alt: "Diego Villagran — AI & Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Villagran | AI & Data Engineer",
    description:
      "Building production ML pipelines, LLM automation, and scalable infrastructure.",
    images: ["/img/optimized/me-1200.webp"],
    creator: "@dvillagrans",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": `${BASE_URL}/en`,
      "es-MX": `${BASE_URL}/es`,
    },
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
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth antialiased no-transition" suppressHydrationWarning>
        <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme || (theme !== 'dark' && theme !== 'light')) {
                    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-grab/dist/styles.css"
            crossOrigin="anonymous"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <script
            id="react-grab"
            src="https://unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            data-options={JSON.stringify(
              { activationMode: "toggle", allowActivationInsideInput: true, maxContextLines: 3 }
            )}
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <script
            id="react-grab-mcp"
            src="https://unpkg.com/@react-grab/mcp/dist/client.global.js"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ebGaramond.variable} ${jetbrainsMono.variable} font-sans overflow-x-hidden selection:bg-accent selection:text-offwhite`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-charcoal focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <Analytics />
            <HtmlLang />
            <ViewTransitionDirector />
            <ConsoleEasterEgg />
            <PersonSchema />
            <WebSiteSchema />
            <GridOverlay />
            <div className="noise-overlay pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay" aria-hidden="true"></div>
            {children}
            <ProjectChat />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
    </ViewTransitions>
  );
}
