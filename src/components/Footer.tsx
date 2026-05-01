"use client";

import Link from "next/link";
import { Globe, Share2, Mail, Play, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import { ProBannerVIP } from "./ProBannerVIP";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/5 bg-black/20 py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <ProBannerVIP />
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 mt-20">
          
          <div className="md:col-span-4">
            <Link 
              href="/" 
              className="flex items-center gap-3 mb-8 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110">
                <Play size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">
                ViralAuthority PRO PREMIUM
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500 font-medium">
              {t("footer_desc")}
            </p>
            <div className="mt-8 flex items-center gap-4">
              {[Globe, Share2, Mail, Play].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-gray-500 hover:bg-white hover:text-black transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-white">{t("footer_solutions")}</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li><Link href="/image-editor" className="hover:text-blue-500 transition-colors">Editor IA</Link></li>
              <li><Link href="/video-to-text" className="hover:text-blue-500 transition-colors">Transcriptor</Link></li>
              <li><Link href="/download-youtube-video" className="hover:text-blue-500 transition-colors">YouTube</Link></li>
              <li><Link href="/download-instagram-video" className="hover:text-blue-500 transition-colors">Instagram</Link></li>
              <li><Link href="/audio" className="hover:text-blue-500 transition-colors">{t("footer_audio_only")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-white">{t("footer_company")}</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-bold">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">{t("footer_about")}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">{t("footer_contact")}</Link></li>
              <li><Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="rounded-3xl bg-white/5 border border-white/5 p-8 backdrop-blur-xl">
              <h4 className="mb-4 text-sm font-black text-white">{t("footer_system_status")}</h4>
              <div className="flex items-center gap-3 text-green-500 mb-6">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-[10px]">{t("footer_operational")}</span>
              </div>
              <p className="text-[11px] text-gray-500 font-bold leading-relaxed mb-6">
                {t("footer_system_desc")}
              </p>
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} /> {t("footer_secure")}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 flex flex-col items-center justify-between border-t border-white/5 pt-12 sm:flex-row">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {t("footer_copyright")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:mt-0 sm:justify-end">
            <Link href="/privacy-policy" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">{t("footer_privacy")}</Link>
            <Link href="/terms" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">{t("footer_terms")}</Link>
            <Link href="/cookies" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">{t("footer_cookies")}</Link>
            <Link href="/about" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">{t("footer_about")}</Link>
            <Link href="/contact" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">{t("footer_contact")}</Link>
            <Link href="/blog" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

