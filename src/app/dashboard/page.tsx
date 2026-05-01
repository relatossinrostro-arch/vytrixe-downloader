"use client";

import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, CreditCard, Download, History, Settings, LogOut, Crown, CheckCircle2, Trophy, Zap, ShieldCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { user, isPremium, logout, isLoading } = useUser();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("perks");

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                <img 
                  src={user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                  alt="Avatar"
                  className="rounded-3xl border-2 border-blue-500/50 p-1"
                />
                {isPremium && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 p-1.5 rounded-xl shadow-lg ring-4 ring-black">
                    <Crown size={14} className="text-black" />
                  </div>
                )}
              </div>
              <h2 className="font-black text-xl tracking-tight">{user?.user_metadata?.full_name || "ViralAuthority PRO PREMIUM User"}</h2>
              <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                {isPremium ? "Pro Member" : "Free Account"}
              </div>
            </div>

            <nav className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-2">
              {[
                { id: "perks", name: t("dash_perks"), icon: User },
                { id: "downloads", name: t("stat_downloads"), icon: Download },
                { id: "comparison", name: t("premium_feature_comparison"), icon: CreditCard },
                { id: "secure", name: t("rc_secure"), icon: Shield },
                { id: "company", name: t("footer_company"), icon: Settings },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              ))}
              <div className="h-[1px] bg-white/5 my-2" />
              <button 
                onClick={logout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} />
                {t("nav_logout")}
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            
            <AnimatePresence mode="wait">
              {activeTab === "perks" && (
                <motion.div
                  key="perks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Header / Premium Banner */}
                  <div className={`relative overflow-hidden rounded-[3rem] p-8 lg:p-12 border border-white/10 ${isPremium ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40' : 'bg-gradient-to-br from-gray-800/40 to-gray-900/40'}`}>
                    <div className="relative z-10">
                      <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4">
                        {t("dash_welcome")}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user?.user_metadata?.full_name?.split(' ')[0] || "Friend"}</span>!
                      </h1>
                      <p className="text-gray-400 max-w-xl mb-8 font-medium">
                        {isPremium 
                          ? t("dash_premium_benefit_desc")
                          : t("dash_free_benefit_desc")}
                      </p>
                      
                      {!isPremium && (
                        <Link 
                          href="/premium" 
                          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.03] transition-all shadow-xl"
                        >
                          {t("dash_up_pro")}
                          <Crown size={20} />
                        </Link>
                      )}
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4" />
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: t("dash_stats_downloads"), value: "0", icon: Download, color: "text-blue-500" },
                      { label: t("dash_stats_trans"), value: isPremium ? t("premium_limit_none") : "0/5 min", icon: History, color: "text-purple-500" },
                      { label: t("dash_stats_plan"), value: isPremium ? t("premium_pro") : t("dash_free"), icon: Star, color: "text-yellow-500" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                          <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-400">
                          <stat.icon size={24} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Premium Perks */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h3 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-8">{t("dash_perks")}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: t("perk_hd"), available: true },
                        { name: t("perk_4k"), available: isPremium },
                        { name: t("perk_trans"), available: true },
                        { name: t("perk_limit"), available: isPremium },
                        { name: t("perk_ads"), available: isPremium },
                        { name: t("perk_comm"), available: isPremium }
                      ].map((perk, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                          <CheckCircle2 size={18} className={perk.available ? "text-green-500" : "text-gray-600"} />
                          <span className={`text-sm font-bold uppercase tracking-widest ${perk.available ? "text-white" : "text-gray-500 line-through"}`}>
                            {perk.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "downloads" && (
                <motion.div
                  key="downloads"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center"
                >
                  <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                    <Download size={40} />
                  </div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{t("stat_downloads")}</h2>
                  <p className="text-gray-500 font-medium">Your media archive is currently empty. Start archiving content to see it here.</p>
                </motion.div>
              )}

              {activeTab === "comparison" && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t("premium_feature_comparison")}</h2>
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-white/[0.02]">
                        <tr>
                          <th className="px-8 py-6 text-sm font-black uppercase tracking-widest">{t("feat_header")}</th>
                          <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-500">{t("premium_free")}</th>
                          <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-blue-500">{t("premium_pro")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          { feature: t("feat_speed"), free: t("val_std"), pro: t("val_ultra"), icon: Zap },
                          { feature: t("feat_quality"), free: t("val_1080"), pro: t("val_4k"), icon: Crown },
                          { feature: t("feat_trans"), free: t("val_5m"), pro: t("premium_limit_none"), icon: Star },
                          { feature: t("feat_ads"), free: t("premium_ads_yes"), pro: t("premium_ads_no"), icon: Shield },
                          { feature: t("feat_support"), free: t("val_std"), pro: t("val_priority"), icon: Trophy },
                        ].map((item, i) => (
                          <tr key={i} className="hover:bg-white/[0.01]">
                            <td className="px-8 py-6 flex items-center gap-3">
                              <item.icon size={18} className="text-blue-500" />
                              <span className="font-bold">{item.feature}</span>
                            </td>
                            <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.free}</td>
                            <td className="px-8 py-6 text-sm font-bold text-white">{item.pro}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === "secure" && (
                <motion.div
                  key="secure"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-[3rem] p-12"
                >
                  <ShieldCheck size={40} className="text-emerald-500 mb-6" />
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{t("rc_secure")}</h2>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    ViralAuthority PRO PREMIUM uses end-to-end encryption for all media processing. We do not store your private media on our servers. Your data and downloads are 100% private and protected by industry-standard security protocols.
                  </p>
                </motion.div>
              )}

              {activeTab === "company" && (
                <motion.div
                  key="company"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-[3rem] p-12"
                >
                  <Settings size={40} className="text-blue-500 mb-6" />
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{t("footer_company")}</h2>
                  <p className="text-gray-400 font-medium leading-relaxed">
                    ViralAuthority PRO PREMIUM is a professional digital media archive suite designed for creators, archivists, and power users. Our mission is to provide the fastest and most secure tools for multimedia preservation.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <Link href="/about" className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">{t("footer_about")}</Link>
                    <Link href="/contact" className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">{t("footer_contact")}</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Star(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
