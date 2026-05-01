"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Send, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Mail size={14} /> Get in Touch
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight italic leading-tight">
              Contact <span className="text-blue-500 not-italic">Us</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">We're here to help</h2>
                <p className="text-gray-400 leading-relaxed">
                  Have a question about ViralAuthority PRO PREMIUM? Need technical support or have a business inquiry? Send us a message and our team will get back to you within 24-48 hours.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email Support", value: "support@viralauthoritypro.pro" },
                  { icon: MessageSquare, label: "Response Time", value: "24-48 Business Hours" },
                  { icon: Globe, label: "Location", value: "Global Edge Network" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                        <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Subject</label>
                      <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message</label>
                      <textarea required rows={5} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors resize-none"></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      <Send size={18} /> Send Message
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto">
                      <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight italic">Message Sent!</h3>
                    <p className="text-gray-400">Thank you for reaching out. We'll get back to you shortly.</p>
                    <button onClick={() => setSent(false)} className="text-blue-500 font-bold uppercase text-xs tracking-widest hover:underline">Send another message</button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
