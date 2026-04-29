"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, Eye, FileText, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={14} /> Trust & Safety Verified
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight italic leading-tight">
              Privacy <span className="text-blue-500 not-italic">Policy</span>
            </h1>
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Last updated: April 23, 2026</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 space-y-12 leading-relaxed text-gray-400">
            
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <Eye size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">1. Data Architecture</h2>
              </div>
              <p className="text-sm md:text-base">
                At Vytrixe, we implement a **transient processing architecture**. This means we do not host or store any multimedia content you process. 
                Our servers act as a secure bridge between the source platform and your device, ensuring total privacy during the download process.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">2. User Authentication</h2>
              </div>
              <p className="text-sm md:text-base">
                When you access Vytrixe Pro via Google Login, we only retrieve essential metadata: **Full Name, Email Address, and Avatar**. 
                This information is exclusively used to manage your premium features and profile settings. We use encryption at rest for all stored metadata via Supabase.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">3. Global Compliance</h2>
              </div>
              <p className="text-sm md:text-base">
                We are committed to international standards including **GDPR** (EU) and **CCPA** (USA). You have the absolute right to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Right to be Forgotten (Full Deletion)",
                  "Right to Data Portability (Export)",
                  "Right to Rectification (Updates)",
                  "Right to Object to Processing"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-bold uppercase tracking-widest text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-600 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-yellow-500/20">
                  <FileText size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">4. Third-Party Protocols</h2>
              </div>
              <p className="text-sm md:text-base">
                Payment data is handled directly by **PayPal Checkout**. Vytrixe never receives or stores your credit card details. 
                Our AI services (Gemini/Flux) process inputs in real-time and do not use your personal data for autonomous model re-training.
              </p>
            </section>

          </div>

          {/* Contact help */}
          <div className="text-center space-y-2">
            <p className="text-gray-500 text-xs uppercase font-black tracking-widest">Questions & Legal Inquiry</p>
            <p className="text-blue-500 font-bold hover:underline cursor-pointer">legal@vytrixe.pro</p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
