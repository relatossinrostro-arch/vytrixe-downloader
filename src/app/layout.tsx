import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vytrixe - Video Downloader",
  description: "Download TikTok, Instagram, YouTube, Facebook and Pinterest videos fast and free with Vytrixe. No watermark, HD quality, unlimited downloads.",
  icons: {
    icon: "/favicon.ico",
  },
};

import { CookieBanner } from "@/components/CookieBanner";
import { AdPopunder } from "@/components/AdPopunder";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner />
        <AdPopunder />
      </body>
    </html>
  );
}
