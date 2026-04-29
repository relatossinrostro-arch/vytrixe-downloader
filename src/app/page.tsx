"use client";

import { useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ResultCard } from "@/components/ResultCard";
import { LoadingState } from "@/components/LoadingState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { TrendingGrid } from "@/components/TrendingGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { getVideoInfo } from "@/lib/video";
import type { VideoInfo } from "@/lib/video";
import { AdsterraAds } from "@/components/AdsterraAds";
import { ADS_SCRIPTS } from "@/lib/adsConfig";
import { PremiumBanner } from "@/components/PremiumBanner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Vytrixe",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "12500"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  const handleSearch = async (url: string) => {
    setVideoUrl(url);
    if (!url.includes("http")) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    const allowedDomains = [
      "tiktok.com",
      "instagram.com",
      "youtube.com",
      "youtu.be",
      "facebook.com",
      "pinterest.com"
    ];

    const isAllowed = allowedDomains.some(domain => url.toLowerCase().includes(domain));
    if (!isAllowed) {
      setError("Supported platforms: TikTok, Instagram, YouTube, Facebook, and Pinterest.");
      return;
    }

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
      const msg = err.message || "Unable to fetch video. Try another link.";
      setError(msg);
      setLoading(false);
    }
  };

  const reset = () => {
    setVideoInfo(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <JsonLd data={schemaData} />
      <Navbar />
      
      <main className="flex-1">
        {!videoInfo && !loading && (
          <>
            <Hero onSearch={handleSearch} isLoading={loading} externalUrl={videoUrl} />
            <div className="max-w-6xl mx-auto px-4 py-8">
              <AdsterraAds 
                zoneId={ADS_SCRIPTS.BANNER_TOP.key}
                format={ADS_SCRIPTS.BANNER_TOP.format}
                minHeight="90px"
                className="rounded-3xl border border-white/5 shadow-2xl"
              />
            </div>
          </>
        )}
        
        {loading && (
          <div className="py-24">
            <LoadingState />
          </div>
        )}
        
        {error && (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <ErrorAlert message={error} onClear={() => setError(null)} />
          </div>
        )}
        
        {videoInfo && !loading && (
          <div className="max-w-5xl mx-auto py-12">
            <ResultCard info={videoInfo} videoUrl={videoUrl} onReset={reset} />
          </div>
        )}

        {/* Global Features Section */}
        {!videoInfo && !loading && (
          <>
            <HowItWorks />
            <TrendingGrid onSelect={(url) => {
              setVideoUrl(url);
              window.scrollTo({ top: 0, behavior: "smooth" });
              handleSearch(url);
            }} />
            <PremiumBanner />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}


