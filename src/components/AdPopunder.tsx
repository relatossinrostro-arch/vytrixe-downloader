"use client";

import { useEffect } from "react";
import { ADS_SCRIPTS, ADS_FREQUENCY } from "@/lib/adsConfig";
import { useUser } from "@/context/UserContext";

export function AdPopunder() {
  const { isPremium } = useUser();

  useEffect(() => {
    // 1. Consent Validation
    const consent = typeof window !== "undefined" ? localStorage.getItem("viralauthoritypro-cookie-consent") : null;
    if (consent !== "true" || isPremium) return;

    // 2. Frequency Check (24 Hours)
    const lastShow = localStorage.getItem("adsterra_last_shown");
    const now = Date.now();
    
    if (lastShow && now - parseInt(lastShow) < ADS_FREQUENCY.POPUNDER_MS) {
      console.log("🛡️ ViralAuthority PRO PREMIUM: Popunder skipped (24h cooldown active)");
      return;
    }

    // 3. Duplicate Prevention
    if (document.getElementById(ADS_SCRIPTS.POPUNDER.id)) return;

    try {
      // 4. Atomic Injection
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//pl${ADS_SCRIPTS.POPUNDER.key}.highperformanceformat.com/${ADS_SCRIPTS.POPUNDER.key}/invoke.js`;
      script.id = ADS_SCRIPTS.POPUNDER.id;
      script.async = true;
      
      document.body.appendChild(script);
      
      // Update Cooldown
      localStorage.setItem("adsterra_last_shown", now.toString());
      console.log("💰 ViralAuthority PRO PREMIUM: Production Popunder initiated.");
    } catch (err) {
      console.error("Adsterra Popunder Error:", err);
    }
  }, []);

  return null;
}
