"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("viralauthoritypro-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("viralauthoritypro-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[150] animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl shadow-black/50">
        <div className="flex gap-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Cookie size={28} />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Cookie Control</h4>
                <span className="text-[9px] font-bold text-blue-500 tracking-widest uppercase">System Protocol</span>
              </div>
              <button 
                onClick={() => setIsVisible(false)} 
                className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="text-[10px] leading-relaxed text-gray-400 font-medium">
              We deploy advanced tracking protocols to optimize your <span className="text-white italic">ViralAuthority PRO PREMIUM</span> experience. 
              By staying, you consent to our <Link href="/cookies" className="text-blue-500 hover:underline mx-0.5">Cookie Engine</Link> management.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button 
                onClick={acceptCookies}
                className="flex-1 bg-white hover:bg-gray-200 text-black text-[9px] font-black uppercase tracking-[0.2em] py-3.5 rounded-xl transition-all active:scale-95"
              >
                Accept Protocols
              </button>
              <Link 
                href="/privacy"
                className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Policy
              </Link>
            </div>
            
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-gray-600">
              <ShieldCheck size={12} className="text-green-500/50" /> 
              Secure Session Enabled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
