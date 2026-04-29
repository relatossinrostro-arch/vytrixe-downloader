"use client";

import Link from "next/link";
import { Play, Menu, X, Globe, User, LogOut, LayoutDashboard, Crown, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, openLoginModal, logout, isLoading, isAdmin, isPremium } = useUser();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-3 shrink-0 transition-all hover:scale-[1.02] active:scale-95 group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Play size={22} fill="currentColor" className="ml-0.5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-white uppercase italic">
              Vytrixe
            </span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-blue-500 uppercase">
              Premium
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 lg:flex">
          {[
            { name: t("nav_tiktok"), href: "/tiktok-downloader-no-watermark" },
            { name: t("nav_youtube"), href: "/download-youtube-video" },
            { name: t("nav_instagram"), href: "/instagram-video-downloader" },
            { name: t("nav_facebook"), href: "/facebook-video-downloader" },
            { name: t("nav_pinterest"), href: "/pinterest-video-downloader" },
            { name: t("nav_audio"), href: "/download-audio" },
            { name: t("nav_transcriber"), href: "/video-to-text" },
          ].map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              title={`${link.name} Downloader`}
              className="text-xs font-bold tracking-widest uppercase transition-colors text-gray-400 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/10" />
          <Link href="/image-editor" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
            {t("nav_editor")}
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <Link 
            href="/premium" 
            className="group relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{t("premium_badge")}</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors border border-white/10 uppercase tracking-widest"
          >
            <Globe size={14} />
            {language}
          </button>

          {!isLoading && (
            user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-500 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-yellow-500/5"
                  >
                    <Crown size={10} />
                    Admin Pro
                  </motion.div>
                )}
                {isPremium && !isAdmin && (
                  <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-black uppercase tracking-widest">
                    <Star size={10} />
                    Pro Member
                  </div>
                )}
                <Link 
                  href="/dashboard"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all overflow-hidden shadow-inner"
                >
                  <img 
                    src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
                    alt="User"
                    className="h-full w-full object-cover p-1 rounded-2xl"
                  />
                </Link>
                <div className="hidden xl:flex flex-col">
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate w-24">
                    {user?.user_metadata?.full_name || "Account"}
                  </span>
                  <button onClick={logout} className="text-[9px] font-bold text-red-500 uppercase tracking-widest text-left hover:text-red-400">
                    {t("nav_logout") || "Logout"}
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={openLoginModal}
                className="hidden sm:flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 text-white px-5 py-2.5 text-xs font-bold transition-all hover:bg-white/10 tracking-widest uppercase"
              >
                <User size={14} />
                {t("nav_login") || "Log In"}
              </button>
            )
          )}
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/5 p-6 animate-in slide-in-from-top duration-300">
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors border border-white/10 uppercase tracking-widest"
            >
              <Globe size={16} />
              {language === "en" ? "English" : "Español"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Link href="/tiktok-downloader-no-watermark" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_tiktok")}</Link>
            <Link href="/download-youtube-video" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_youtube")}</Link>
            <Link href="/instagram-video-downloader" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_instagram")}</Link>
            <Link href="/facebook-video-downloader" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_facebook")}</Link>
            <Link href="/pinterest-video-downloader" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_pinterest")}</Link>
            <Link href="/download-audio" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_audio")}</Link>
            <Link href="/video-to-text" className="text-sm font-bold text-white uppercase tracking-widest">{t("nav_transcriber")}</Link>
          </div>
          <Link href="/image-editor" className="mt-8 block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-center text-lg font-black text-white">
            {t("nav_editor")}
          </Link>

          <div className="mt-8 space-y-4">
            {!isLoading && (
              user ? (
                <>
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest"
                  >
                    <LayoutDashboard size={20} />
                    {t("nav_dashboard")}
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center gap-4 w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold uppercase tracking-widest"
                  >
                    <LogOut size={20} />
                    {t("nav_logout")}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { openLoginModal(); setIsOpen(false); }}
                  className="flex items-center gap-4 w-full p-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest"
                >
                  <User size={20} />
                  {t("nav_login")}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

