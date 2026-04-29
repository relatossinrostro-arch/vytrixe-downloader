"use client";

import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Shield, CreditCard, Download, History, Settings, LogOut, Crown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isPremium, logout, isLoading } = useUser();
  const { t } = useLanguage();

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
              <h2 className="font-black text-xl tracking-tight">{user?.user_metadata?.full_name || "Vytrixe User"}</h2>
              <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                {isPremium ? "Pro Member" : "Free Account"}
              </div>
            </div>

            <nav className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-2">
              {[
                { name: t("dash_perks"), icon: User, active: true },
                { name: t("stat_downloads"), icon: Download },
                { name: t("premium_feature_comparison"), icon: CreditCard },
                { name: t("rc_secure"), icon: Shield },
                { name: t("footer_company"), icon: Settings },
              ].map((item) => (
                <button 
                  key={item.name}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
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
            
            {/* Header / Premium Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative overflow-hidden rounded-[3rem] p-8 lg:p-12 border border-white/10 ${isPremium ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40' : 'bg-gradient-to-br from-gray-800/40 to-gray-900/40'}`}
            >
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
              
              {/* Abstract BG Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4" />
            </motion.div>

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

            {/* Premium Perks (Available only to show what they have) */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="font-black text-xs uppercase tracking-widest text-gray-500 mb-8">{t("dash_perks")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "HD Downloads (720p/1080p)", available: true },
                  { name: "High Resolution (2K/4K)", available: isPremium },
                  { name: "AI Transcription (Corrected)", available: true },
                  { name: "Unlimited Length (>5 min)", available: isPremium },
                  { name: "Ad-Free Experience", available: isPremium },
                  { name: "Commercial Usage", available: isPremium }
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
