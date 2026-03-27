"use client";

import React, { useEffect } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { initGA } from "@/lib/analytics";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

export function CookieBanner() {
  useEffect(() => {
    // Check if previously accepted
    if (getCookieConsentValue("vytrixe_cookie_consent") === "true") {
      initGA();
    }
  }, []);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Reject All"
      enableDeclineButton
      cookieName="vytrixe_cookie_consent"
      onAccept={() => initGA()}
      expires={365}
      containerClasses="!fixed !bottom-6 !left-1/2 !-translate-x-1/2 !w-[calc(100%-2rem)] !max-w-4xl !bg-slate-950/80 !backdrop-blur-xl !rounded-[32px] !border !border-white/10 !p-6 !flex-col md:!flex-row !items-center !gap-6 !shadow-[0_20px_50px_rgba(0,0,0,0.5)] !z-[9999] !m-0"
      contentClasses="!m-0 !text-white/80 !text-sm !leading-relaxed !flex !items-center !gap-4"
      buttonWrapperClasses="!flex !gap-3 !shrink-0"
      buttonClasses="!bg-gradient-to-r !from-blue-600 !to-purple-600 !text-white !font-black !px-8 !py-3 !rounded-full !m-0 !transition-all hover:!scale-105 active:!scale-95 !text-xs !uppercase !tracking-widest"
      declineButtonClasses="!bg-white/5 !text-white/50 !font-bold !px-6 !py-3 !rounded-full !m-0 !transition-all hover:!bg-white/10 active:!scale-95 !text-xs !uppercase !tracking-widest"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
        <ShieldCheck size={28} />
      </div>
      <div>
        <p className="font-bold text-white text-base mb-1">Privacy & Personalization</p>
        <p className="opacity-70 text-xs sm:text-sm">
          We use cookies to improve your experience, analyze traffic, and serve ads. By clicking Accept, you agree to our use of cookies. 
          Read our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link> and <Link href="/cookies" className="text-blue-400 hover:underline">Cookie Policy</Link>.
        </p>
      </div>
    </CookieConsent>
  );
}
