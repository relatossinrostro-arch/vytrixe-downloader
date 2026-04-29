"use client";

import React from "react";
import Link from "next/link";
import { 
  Crown, 
  Zap, 
  Infinity as InfinityIcon, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Star
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export function PremiumBanner() {
  const { t } = useLanguage();

  const features = [
    { 
      title: t("premium_benefit_1_title"), 
      desc: t("premium_benefit_1_desc"), 
      icon: InfinityIcon, 
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    { 
      title: t("premium_benefit_2_title"), 
      desc: t("premium_benefit_2_desc"), 
      icon: Zap, 
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    { 
      title: t("premium_benefit_3_title"), 
      desc: t("premium_benefit_3_desc"), 
      icon: Star, 
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative group p-1 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-2xl overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-black/40 backdrop-blur-3xl rounded-[2.9rem] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              
              {/* Content Left */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-[0.2em] uppercase">
                  <Crown size={14} className="animate-pulse" /> {t("premium_badge")}
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none uppercase">
                  {t("premium_title")}
                </h2>
                
                <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl leading-relaxed">
                  {t("premium_subtitle")}
                </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <Link 
                      href="/premium"
                      className="group/btn relative px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                         {t("premium_cta")} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                      <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t("premium_period")}</p>
                          <p className="text-2xl font-black italic text-blue-500 leading-none">{t("premium_price")}</p>
                        </div>
                      </div>
                      <div className="group/save relative px-6 py-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{t("premium_save")}</p>
                          <p className="text-xl font-black italic text-white leading-none">{t("premium_annual_price")}<span className="text-[10px] not-italic text-gray-500">/yr</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Features Grid Right */}
              <div className="lg:w-[400px] w-full grid grid-cols-1 gap-6">
                {features.map((f, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-start gap-5 hover:bg-white/[0.06] transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center ${f.color} shrink-0`}>
                      <f.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold uppercase tracking-tight text-white">{f.title}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
