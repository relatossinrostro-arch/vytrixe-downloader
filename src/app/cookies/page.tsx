"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cookie, Settings, Check, X, ShieldAlert } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
              <Cookie size={14} /> Tracking Transperancy
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight italic leading-tight">
              Cookie <span className="text-red-500 not-italic">Engine</span>
            </h1>
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Policy Version 2.0</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 space-y-12 leading-relaxed text-gray-400">
            
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-orange-400 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                  <Settings size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">How We Use Cookies</h2>
              </div>
              <p className="text-sm md:text-base">
                Vytrixe uses "cookies" and similar tracking technologies to optimize your downloading experience. 
                These small files allow us to remember your preferences (like language) and ensure that your Pro features remain active during your session.
              </p>
            </section>

            {/* Cookie Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: "Essential Cookies", 
                  desc: "Required for core functionality, login persistence, and premium access verification.", 
                  status: "Required",
                  color: "text-green-500",
                  icon: <Check size={16} />
                },
                { 
                  title: "Performance Cookies", 
                  desc: "Help us understand how users navigate Vytrixe so we can optimize download speeds.", 
                  status: "Enabled",
                  color: "text-blue-500",
                  icon: <Settings size={16} />
                },
                { 
                  title: "Marketing Cookies", 
                  desc: "Used for serving relevant advertisements to free users. Pro users have these disabled.", 
                  status: "Optional",
                  color: "text-yellow-500",
                  icon: <ShieldAlert size={16} />
                },
              ].map((cookie, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4 hover:border-red-500/30 transition-all group">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white italic">{cookie.title}</h3>
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase ${cookie.color}`}>
                      {cookie.icon} {cookie.status}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">
                    {cookie.desc}
                  </p>
                </div>
              ))}
            </div>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <X size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Opt-Out & Management</h2>
              </div>
              <p className="text-sm md:text-base">
                You can control and manage cookies through your browser settings. Please note that disabling 
                essential cookies may prevent you from logging in or using Vytrixe Pro features correctly. 
                For a detailed guide on managing cookies, visit <span className="text-red-500 underline cursor-pointer">aboutcookies.org</span>.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
