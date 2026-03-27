"use client";

import React, { useEffect, useRef } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import { ADS_CONFIG } from "@/lib/adsConfig";

export function AdNative() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getCookieConsentValue("vytrixe_cookie_consent") !== "true") return;
    if (!containerRef.current) return;
    if (containerRef.current.hasChildNodes()) return;

    try {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `//www.highperformanceformat.com/${ADS_CONFIG.NATIVE.id}/invoke.js`;
      
      containerRef.current.appendChild(script);
    } catch (err) {
      console.error("Native Ad Error:", err);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-300">Recommended for you</h3>
        <span className="text-[10px] font-bold text-gray-400 opacity-50 uppercase tracking-widest">Sponsored</span>
      </div>
      
      <div 
        ref={containerRef} 
        className="min-h-[250px] w-full rounded-3xl bg-gray-50/50 border border-gray-100 p-4 transition-all hover:bg-gray-50 flex items-center justify-center text-gray-300 italic text-sm"
      >
        {/* Adsterra will inject the native grid here */}
        Waiting for content...
      </div>
    </div>
  );
}
