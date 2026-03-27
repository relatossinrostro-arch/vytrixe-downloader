"use client";

import { useEffect } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import { ADS_CONFIG } from "@/lib/adsConfig";

export function AdPopunder() {
  useEffect(() => {
    // 1. Check Consent
    if (getCookieConsentValue("vytrixe_cookie_consent") !== "true") return;

    // 2. Check Frequency Capping (24 Hours)
    const lastShow = localStorage.getItem("vytrixe_last_pop");
    const now = Date.now();
    const cooldown = ADS_CONFIG.POPUNDER.frequencyMinutes * 60 * 1000;

    if (lastShow && now - parseInt(lastShow) < cooldown) {
      console.log("🛡️ VYTRIXE: Popunder skipped (Cooldown active)");
      return;
    }

    // 3. Inject Popunder Script
    try {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//pl${ADS_CONFIG.POPUNDER.id}.highperformanceformat.com/${ADS_CONFIG.POPUNDER.id}/invoke.js`;
      script.async = true;
      script.id = "adsterra-popunder";
      
      document.body.appendChild(script);
      
      // Update Timestamp
      localStorage.setItem("vytrixe_last_pop", now.toString());
      console.log("💰 VYTRIXE: Popunder initialized for session.");
    } catch (err) {
      console.error("Popunder Error:", err);
    }
  }, []);

  return null; // Invisible component
}
