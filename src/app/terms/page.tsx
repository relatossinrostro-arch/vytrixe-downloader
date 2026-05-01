"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Shield, UserCheck, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <FileText size={14} /> Legal Agreement
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight italic leading-tight">
              Terms of <span className="text-blue-500 not-italic">Service</span>
            </h1>
            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Last updated: April 29, 2026</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 space-y-12 leading-relaxed text-gray-400">
            
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <Shield size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">1. Use of Service</h2>
              </div>
              <p className="text-sm md:text-base">
                By accessing ViralAuthority PRO PREMIUM, you agree to use our tools for **personal, non-commercial purposes only**. You are responsible for ensuring that your use of the service complies with all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                  <AlertCircle size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">2. No Content Storage</h2>
              </div>
              <p className="text-sm md:text-base">
                ViralAuthority PRO PREMIUM does not host, store, or archive any multimedia content. We provide a technical interface to process public links. Users are solely responsible for the content they access and preserve.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                  <UserCheck size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">3. Intellectual Property</h2>
              </div>
              <p className="text-sm md:text-base">
                Users must respect the intellectual property rights of content creators and platforms. You agree not to use ViralAuthority PRO PREMIUM to process copyrighted material without the express permission of the original owner.
              </p>
            </section>

            <section className="space-y-6 border-t border-white/5 pt-12">
              <h3 className="text-xl font-black uppercase tracking-tighter italic text-white">Liability Disclaimer</h3>
              <p className="text-sm">
                ViralAuthority PRO PREMIUM is provided "as is" without any warranties. We are not liable for any direct or indirect damages resulting from the use or inability to use our services.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
