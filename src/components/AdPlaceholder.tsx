"use client";

import React, { useState, useEffect } from "react";
import { getCookieConsentValue } from "react-cookie-consent";

interface AdPlaceholderProps {
  slot: "header" | "content" | "bottom";
  className?: string;
}

export function AdPlaceholder({ slot, className = "" }: AdPlaceholderProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const minHeight = slot === "header" ? "h-[90px]" : "h-[250px]";

  useEffect(() => {
    // Check consent state on mount and update
    const consent = getCookieConsentValue("ViralAuthority PRO PREMIUM_cookie_consent");
    setHasConsent(consent === "true");
  }, []);
  
  return (
    <div className={`w-full max-w-4xl mx-auto my-6 overflow-hidden rounded-xl bg-gray-50/50 border border-dashed border-gray-200 flex flex-col items-center justify-center p-4 transition-all hover:bg-gray-50 ${minHeight} ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Advertisement</span>
      <div className="text-sm font-medium text-gray-300 italic">
        {!hasConsent ? (
          "Consent Required to Load Ads"
        ) : (
          slot === "header" ? "Leaderboard Banner Slot" : "Responsive Display Slot"
        )}
      </div>
      <p className="text-[9px] text-gray-300 mt-1 uppercase tracking-tighter">
        {hasConsent ? "Monetization Active" : "Waiting for Acceptance"}
      </p>
    </div>
  );
}
