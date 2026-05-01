"use client";

import React, { useEffect, useRef } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import { ADS_SCRIPTS } from "@/lib/adsConfig";

export function AdNative() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Consent Validation
    const consent = typeof window !== "undefined" ? localStorage.getItem("viralauthoritypro-cookie-consent") : null;
    if (consent !== "true") return;
    
    if (!containerRef.current) return;

    // 2. Duplicate Check
    if (containerRef.current.hasChildNodes()) return;

    try {
      // 3. Atomic Injection
      const script = document.createElement("script");
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = `//www.highperformanceformat.com/${ADS_SCRIPTS.NATIVE.key}/invoke.js`;
      script.id = ADS_SCRIPTS.NATIVE.id;
      
      containerRef.current.appendChild(script);
      console.log(`💰 ViralAuthority PRO PREMIUM: Native Ad [${ADS_SCRIPTS.NATIVE.key}] injected.`);
    } catch (err) {
      console.error("Adsterra Native Error:", err);
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
        className="min-h-[250px] w-full rounded-[2.5rem] bg-white/5 border border-white/10 p-4 transition-all flex items-center justify-center text-gray-500 italic text-xs font-black uppercase tracking-widest"
      >
        Waiting for ViralAuthority PRO PREMIUM Engine...
      </div>
    </div>
  );
}
