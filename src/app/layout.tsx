import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/scroll-to-top";
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
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Data Scientist",
    "Full-Stack Developer",
    "Machine Learning",
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Diego Villagran",
    "ESCOM",
    "Mexico",
    "Data Analysis",
    "Web Development"
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  openGraph: {
    title: `${DATA.name} - Data Scientist & Full-Stack Developer`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/img/me.webp`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} - Professional Photo`,
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
    yandex: "",
  },
  alternates: {
    canonical: DATA.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
            <ScrollToTop />
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
