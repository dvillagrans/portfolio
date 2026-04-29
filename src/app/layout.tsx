import { ProjectChat } from '@/components/ui/ProjectChat';
import { ConsoleEasterEgg } from '@/components/ui/ConsoleEasterEgg';
import { ViewTransitionDirector } from '@/components/ui/ViewTransitionDirector';
import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ViewTransitions } from "next-view-transitions";
import { HtmlLang } from "@/components/ui/HtmlLang";

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

export const metadata: Metadata = {
  title: "Diego Villagran | Creative Technologist",
  description: "Senior Creative Technologist, Lead Frontend Engineer, and Product Systems Designer.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth antialiased" suppressHydrationWarning>
        <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/@react-grab/mcp/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ebGaramond.variable} ${jetbrainsMono.variable} font-sans bg-charcoal text-offwhite overflow-x-hidden selection:bg-accent selection:text-offwhite`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-charcoal focus:shadow-lg"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          <HtmlLang />
          <ViewTransitionDirector />
          <ConsoleEasterEgg />
          <div className="noise-overlay pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay"></div>
          {children}
          <ProjectChat />
        </LanguageProvider>
      </body>
    </html>
    </ViewTransitions>
  );
}
