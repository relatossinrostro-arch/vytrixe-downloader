"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ResultCard } from "@/components/ResultCard";
import { AdsterraAds } from "@/components/AdsterraAds";
import { AdNative } from "@/components/AdNative";
import { LoadingState } from "@/components/LoadingState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { VideoInfo, getVideoInfo } from "@/lib/video";
import { ADS_SCRIPTS } from "@/lib/adsConfig";
import { useUser } from "@/context/UserContext";
import { ProBannerVIP } from "@/components/ProBannerVIP";

interface SEOPageProps {
  platform: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  faqData?: { question: string; answer: string }[];
}

const ALL_PLATFORMS = [
  { name: "TikTok Video", path: "/download-tiktok-video" },
  { name: "TikTok No Watermark", path: "/tiktok-downloader-no-watermark" },
  { name: "Free TikTok", path: "/free-tiktok-video-downloader" },
  { name: "Instagram Reels", path: "/download-instagram-reels" },
  { name: "Instagram Stories", path: "/download-instagram-stories" },
  { name: "Instagram Video", path: "/instagram-video-downloader" },
  { name: "YouTube Video", path: "/download-youtube-video" },
  { name: "Free YouTube", path: "/free-youtube-downloader" },
  { name: "Facebook Video", path: "/download-facebook-video" },
  { name: "Facebook Stories", path: "/facebook-story-downloader" },
  { name: "Facebook Downloader", path: "/facebook-video-downloader" },
  { name: "Pinterest Video", path: "/download-pinterest-video" },
  { name: "Pinterest Downloader", path: "/pinterest-video-downloader" },
  { name: "No Watermark Tool", path: "/download-video-without-watermark" },
  { name: "Free Online Tool", path: "/free-video-downloader-online" },
  { name: "Best Downloader 2026", path: "/best-video-downloader-2026" },
  { name: "MP4 from Link", path: "/download-mp4-from-link" },
  { name: "AI Image Editor", path: "/image-editor" },
  { name: "AI Transcriber", path: "/video-to-text" },
];

export function SEOPage({ platform, title, subtitle, content, faqData }: SEOPageProps) {
  const pathname = usePathname();
  const { isPremium } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = async (url: string) => {
    setVideoUrl(url);
    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const info = await getVideoInfo(url);
      
      if (info && info.title) {
        setVideoInfo(info);
        setLoading(false);
      } else {
        throw new Error("Video info not found.");
      }
    } catch (err: any) {
      const msg = err.message || `Failed to process ${platform} video.`;
      setError(msg);
      setLoading(false);
    }
  };

  // Generate Schema.org JSON-LD for FAQ
  const jsonLd = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      <main className="flex-1">
        {!videoInfo && !loading && <Hero onSearch={handleSearch} isLoading={loading} />}
        
        {loading && <LoadingState />}
        
        {error && <ErrorAlert message={error} onClear={() => setError(null)} />}
        
        {videoInfo && !loading && (
          <ResultCard 
            info={videoInfo} 
            videoUrl={videoUrl}
            onReset={() => setVideoInfo(null)} 
          />
        )}

        {!isPremium && (
          <>
            <AdsterraAds 
              zoneId={ADS_SCRIPTS.BANNER_MID.key} 
              format={ADS_SCRIPTS.BANNER_MID.format}
              minHeight={ADS_SCRIPTS.BANNER_MID.minHeight}
              className="my-12"
            />
            <ProBannerVIP />
            <AdNative />
          </>
        )}

        <div className="container mx-auto px-4 py-20 max-w-4xl prose lg:prose-lg">
          {content}
        </div>

        {/* Internal Linking Section */}
        <section className="bg-white/5 py-20 border-t border-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Explore More Downloaders</h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto italic">High-quality, free, and secure video downloading tools for all major platforms.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ALL_PLATFORMS.filter(p => p.path !== pathname).map((p) => (
                <Link
                  key={p.name}
                  href={p.path}
                  className="px-4 py-4 rounded-2xl bg-[#111111] border border-white/10 text-gray-300 font-semibold hover:border-blue-500 hover:text-white transition-all shadow-sm hover:shadow-blue-500/20 text-sm text-center"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
