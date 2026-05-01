"use client";

import Link from "next/link";
import { Play, Menu, X, Globe, User, LogOut, LayoutDashboard, Crown, Star, ChevronDown, Sparkles, FileText, Camera, Video, Music, Share2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

const MAIN_LINKS = [
  { key: "editor", href: "/image-editor", icon: Camera },
  { key: "transcriber", href: "/video-to-text", icon: FileText },
  { key: "youtube", href: "/download-youtube-video", icon: Play },
];

const PLATFORM_LINKS = [
  { key: "tiktok", href: "/download-tiktok-video", icon: Video },
  { key: "instagram", href: "/download-instagram-video", icon: Camera },
  { key: "facebook", href: "/download-facebook-video", icon: Share2 },
  { key: "pinterest", href: "/download-pinterest-video", icon: Star },
  { key: "twitter", href: "/download-twitter-video", icon: Share2 },
  { key: "reddit", href: "/download-reddit-video", icon: MessageSquare },
  { key: "twitch", href: "/download-twitch-clip", icon: Video },
  { key: "soundcloud", href: "/download-soundcloud-audio", icon: Music },
];

const TOOL_LINKS = [
  { key: "audio", href: "/audio", icon: Music },
  { key: "refine", href: "/video-to-text", icon: Sparkles },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { user, openLoginModal, logout, isLoading, isAdmin, isPremium } = useUser();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const getLinkName = (key: string) => {
    switch (key) {
      case "editor": return t("nav_editor");
      case "transcriber": return t("nav_transcriber");
      case "youtube": return t("nav_youtube");
      case "tiktok": return t("nav_tiktok");
      case "instagram": return t("nav_instagram");
      case "facebook": return t("nav_facebook");
      case "pinterest": return t("nav_pinterest");
      case "audio": return t("nav_audio");
      case "twitter": return "Twitter/X";
      case "reddit": return "Reddit";
      case "twitch": return "Twitch";
      case "soundcloud": return "SoundCloud";
      case "refine": return t("nav_refine");
      case "ai_studio": return t("nav_ai_studio");
      default: return key;
    }
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-3 shrink-0 transition-all hover:scale-[1.02] active:scale-95 group mr-8 lg:mr-12"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Play size={22} fill="currentColor" className="ml-0.5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">
              ViralAuthority
            </span>
            <span className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">
              PRO PREMIUM
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-2 xl:gap-4 lg:flex">
          {/* Main Links */}
          <div className="flex items-center gap-1 xl:gap-2">
            {MAIN_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="px-3 py-2 text-[11px] font-black tracking-widest uppercase transition-all text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
              >
                {getLinkName(link.key)}
              </Link>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-2" />

          {/* Platforms Dropdown */}
          <div 
            className="relative group h-20 flex items-center"
            onMouseEnter={() => setActiveDropdown("platforms")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-black tracking-widest uppercase transition-all text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
              {t("nav_platforms")}
              <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "platforms" ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === "platforms" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 w-64 bg-[#0a0a0a] border border-white/5 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none rounded-2xl" />
                  {PLATFORM_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all group/item"
                    >
                      <div className="p-1.5 rounded-lg bg-white/5 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <link.icon size={14} />
                      </div>
                      {getLinkName(link.key)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tools Dropdown */}
          <div 
            className="relative group h-20 flex items-center"
            onMouseEnter={() => setActiveDropdown("tools")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-black tracking-widest uppercase transition-all text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
              {t("nav_tools")}
              <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "tools" ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === "tools" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 w-64 bg-[#0a0a0a] border border-white/5 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none rounded-2xl" />
                  {TOOL_LINKS.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all group/item"
                    >
                      <div className="p-1.5 rounded-lg bg-white/5 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors">
                        <link.icon size={14} />
                      </div>
                      {getLinkName(link.key)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <Link 
            href="/premium" 
            className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-500/50 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{t("premium_badge")}</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-[10px] font-black transition-colors border border-white/10 uppercase tracking-[0.15em]"
          >
            <Globe size={14} />
            {language}
          </button>

          {!isLoading && (
            user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[9px] font-black uppercase tracking-widest">
                    <Crown size={10} />
                    Admin
                  </div>
                )}
                <Link 
                  href="/dashboard"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all overflow-hidden"
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
                    {t("nav_logout")}
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={openLoginModal}
                className="hidden sm:flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 text-white px-5 py-2.5 text-xs font-bold transition-all hover:bg-white/10 tracking-widest uppercase"
              >
                <User size={14} />
                {t("nav_login")}
              </button>
            )
          )}
          
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050505] border-b border-white/5 overflow-hidden"
          >
            <div className="p-6 space-y-8">
              {/* Main Links */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{t("nav_start_download")}</p>
                <div className="grid grid-cols-1 gap-3">
                  {MAIN_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest"
                    >
                      <link.icon size={18} className="text-blue-500" />
                      {getLinkName(link.key)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tools Dropdown (Click for Mobile) */}
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === "tools_mob" ? null : "tools_mob")}
                  className="flex items-center justify-between w-full text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]"
                >
                  {t("nav_tools")}
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === "tools_mob" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "tools_mob" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 gap-2"
                    >
                      {TOOL_LINKS.map((link) => (
                        <Link
                          key={link.key}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 text-gray-300 font-bold uppercase tracking-widest text-xs"
                        >
                          <link.icon size={16} />
                          {getLinkName(link.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Platforms Dropdown (Click for Mobile) */}
              <div className="space-y-4">
                <button 
                   onClick={() => setActiveDropdown(activeDropdown === "platforms_mob" ? null : "platforms_mob")}
                   className="flex items-center justify-between w-full text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]"
                >
                  {t("nav_platforms")}
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === "platforms_mob" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "platforms_mob" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-2"
                    >
                      {PLATFORM_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-gray-300 font-bold uppercase tracking-widest text-[10px]"
                        >
                          <link.icon size={14} />
                          {getLinkName(link.key)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-3 w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest"
                >
                  <Globe size={20} />
                  {language === "en" ? "English" : "Español"}
                </button>
                
                {!isLoading && (
                  user ? (
                    <button 
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center gap-4 w-full p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold uppercase tracking-widest"
                    >
                      <LogOut size={20} />
                      {t("nav_logout")}
                    </button>
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
