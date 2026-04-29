import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vytrixe.com"),
  title: "Vytrixe - All-in-One: Video Downloader, AI Editor & Transcriber",
  description: "Free online platform to download HD videos, privately save Facebook/Instagram Stories, transcribe audio using AI, and generate covers with our advanced Image Editor. Fast, secure, and no watermark.",
  keywords: ["video downloader", "image editor online", "video to text", "ai transcription", "tiktok downloader", "youtube downloader", "instagram story saver", "free photo editor", "Vytrixe"],
  authors: [{ name: "Vytrixe Team" }],
  openGraph: {
    title: "Vytrixe - AI Multimedia Suite",
    description: "Download videos, edit images, and transcribe audio with AI. All-in-one free platform.",
    url: "https://www.vytrixe.com",
    siteName: "Vytrixe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vytrixe Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vytrixe - AI Multimedia Suite",
    description: "Download, Edit, and Transcribe with AI. Fast, secure, and 100% free.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.vytrixe.com",
    languages: {
      "en-US": "https://www.vytrixe.com",
      "es-ES": "https://www.vytrixe.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { CookieBanner } from "@/components/CookieBanner";
import { AdPopunder } from "@/components/AdPopunder";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <LanguageProvider>
          <UserProvider>
            {children}
            <CookieBanner />
            <AdPopunder />
          </UserProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
