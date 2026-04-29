"use client";

import React, { useState } from "react";
import { X, Play, Mail, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { loginWithGoogle, isLoading } = useUser();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

        <div className="p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Play size={32} fill="currentColor" className="ml-1" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white italic">
                Vytrixe <span className="text-blue-500 not-italic">Pro</span>
              </h2>
              <p className="text-sm text-gray-400 font-medium tracking-wide">
                Join the most advanced multimedia suite.
              </p>
            </div>
          </div>

          {/* Login Options */}
          <div className="space-y-3">
            <button 
              onClick={() => loginWithGoogle()}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-black py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin text-blue-600" size={20} />
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              )}
              <span className="uppercase tracking-widest text-[10px]">
                {isLoading ? "Redirecting..." : "Continue with Google"}
              </span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-black text-gray-600 bg-[#0a0a0a] px-4">
                Or secure access
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xs font-bold outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <button 
                disabled
                className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 cursor-not-allowed"
              >
                Password Login (Coming Soon)
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[8px] font-black uppercase tracking-widest text-gray-600">
            <div className="flex items-center gap-1.5"><ShieldCheck size={12} /> Privacy Guaranteed</div>
            <div className="flex items-center gap-1.5"><Sparkles size={12} /> AI Powered</div>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
