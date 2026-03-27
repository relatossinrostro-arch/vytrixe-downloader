"use client";

import React, { useEffect, useRef } from "react";
import { getCookieConsentValue } from "react-cookie-consent";

interface AdsterraAdsProps {
  zoneId: string;
  format?: string;
  className?: string;
  minHeight?: string;
}

export function AdsterraAds({ zoneId, format, className = "", minHeight = "0px" }: AdsterraAdsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only load if consent is granted
    if (getCookieConsentValue("vytrixe_cookie_consent") !== "true") return;
    if (!containerRef.current || !zoneId) return;

    // Prevent duplicate injection in the same container
    if (containerRef.current.hasChildNodes()) return;

    try {
      const script = document.createElement("script");
      script.type = "text/javascript";
      
      // Adsterra Standard Banner Integration
      script.innerHTML = `
        atOptions = {
          'key' : '${zoneId}',
          'format' : '${format || "728x90"}',
          'params' : {}
        };
      `;
      
      const externalScript = document.createElement("script");
      externalScript.type = "text/javascript";
      externalScript.src = `//www.highperformanceformat.com/${zoneId}/invoke.js`;
      externalScript.async = true;

      containerRef.current.appendChild(script);
      containerRef.current.appendChild(externalScript);
    } catch (err) {
      console.error("Adsterra Injection Error:", err);
    }

    return () => {
      // Cleanup logic if needed, though Adsterra scripts usually stick
    };
  }, [zoneId, format]);

  return (
    <div 
      className={`ad-container flex justify-center items-center overflow-hidden bg-gray-50/10 ${className}`}
      style={{ minHeight }}
    >
      <div ref={containerRef} id={`ad-zone-${zoneId}`} className="w-full h-full flex justify-center items-center" />
    </div>
  );
}
