"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Info, Target, Users, Sparkles, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Info size={14} /> Our Mission
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight italic leading-tight">
              About <span className="text-blue-500 not-italic">Us</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <Target size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Our Vision</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">
                ViralAuthority PRO PREMIUM was born with a single goal: to empower creators with professional-grade tools that are usually locked behind complex software or expensive subscriptions. We believe that every creator deserves access to high-performance multimedia tools.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                  <Rocket size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Innovation First</h2>
              </div>
              <p className="text-gray-400 leading-relaxed">
                We combine industry-leading AI like OpenAI Whisper and Google Gemini with high-speed processing engines to provide a seamless workflow for content creators, social media managers, and casual users alike.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center space-y-8">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Why ViralAuthority PRO PREMIUM?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { icon: Sparkles, title: "AI-Powered", desc: "Top-tier AI for transcription and editing" },
                { icon: Users, title: "Creator Focused", desc: "Built specifically for modern social workflows" },
                { icon: Rocket, title: "High Speed", desc: "Optimized infrastructure for fast processing" }
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-500">
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-black uppercase tracking-widest text-xs">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
