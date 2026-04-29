import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Play, ExternalLink, ArrowLeft, Shield, Zap, Info, Clock, CheckCircle2, ArrowRight, Crown, Loader2, BadgeCheck, AlertCircle, X } from "lucide-react";
import { VideoInfo, downloadVideo } from "@/lib/video";
import Image from "next/image";
import { AdsterraAds } from "./AdsterraAds";
import { ADS_SCRIPTS } from "@/lib/adsConfig";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface ResultCardProps {
  info: VideoInfo;
  videoUrl: string;
  onReset: () => void;
}

export function ResultCard({ info, videoUrl, onReset }: ResultCardProps) {
  const { t } = useLanguage();
  const { isPremium } = useUser();
  const router = useRouter();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<{message: string, details?: string} | null>(null);
  const [statusText, setStatusText] = useState<string>("");

  const handleDownload = async (formatId: string, isPremiumFormat?: boolean, ext?: string, qualityLabel?: string) => {
    if (isPremiumFormat && !isPremium) {
      router.push("/premium");
      return;
    }
    
    setDownloadingId(formatId);
    setProgress(0);
    setSuccessMessage(null);
    setError(null);
    setStatusText(t("rc_preparing"));
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 30) {
            setStatusText(t("rc_preparing"));
            return prev + 1;
        }
        if (prev < 90) {
            setStatusText(t("rc_converting"));
            return prev + 0.5;
        }
        return prev;
      });
    }, 100);

    try {
      // Use updated downloadVideo with exact requested params
      const data = await downloadVideo(
        videoUrl, 
        ext, // format: "mp4" or "mp3"
        qualityLabel // quality: "360p", "720p", "best", etc.
      );
      
      clearInterval(interval);
      setProgress(100);
      setStatusText(t("rc_ready"));
      setSuccessMessage(`${data.filename}`);
      
      // TRIGGER DIRECT DOWNLOAD (Backend headers handle naming)
      const link = document.createElement("a");
      link.href = data.downloadUrl;
      link.download = data.filename; // Hint for some browsers
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setTimeout(() => {
        setDownloadingId(null);
        setProgress(0);
        setStatusText("");
        setTimeout(() => setSuccessMessage(null), 8000);
      }, 3000);

    } catch (err: any) {
      clearInterval(interval);
      setDownloadingId(null);
      setProgress(0);
      setStatusText("");
      
      console.error("API ERROR:", err);
      alert(err.message || "Failed to start download. Please try a different quality or link.");
      
      setError({
        message: err.message || "Download failed. Please try another quality.",
        details: err.details
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onReset}
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 text-sm font-bold text-gray-400 hover:text-white border border-white/10 transition-all active:scale-95 backdrop-blur-md"
            >
              <ArrowLeft size={18} />
              {t("rc_new")}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 rounded-full bg-red-500/20">
                    <AlertCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black uppercase tracking-widest mb-1">{t("rc_error_title")}</h4>
                    <p className="text-sm font-bold opacity-80">{error.message}</p>
                    {error.details && (
                      <details className="mt-3">
                        <summary className="text-[10px] uppercase tracking-widest cursor-pointer opacity-50 hover:opacity-100 transition-opacity">Ver detalles técnicos</summary>
                        <pre className="mt-2 p-3 rounded-xl bg-black/40 text-[9px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed opacity-60">
                          {error.details}
                        </pre>
                      </details>
                    )}
                  </div>
                  <button onClick={() => setError(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: 0 }}
                  transition={{ duration: 10, ease: "linear" }}
                  onAnimationComplete={() => setError(null)}
                  className="absolute bottom-0 left-0 h-1 bg-red-500/40"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="premium-card overflow-hidden glass-card">
            <div className="flex flex-col lg:flex-row">
              
              {/* Preview Section */}
              <div className="relative aspect-video w-full lg:w-[45%] bg-black overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                {info.thumbnail ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={info.thumbnail}
                      alt={info.title || "preview"}
                      fill
                      className="object-cover opacity-60 transition-transform duration-700 hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-700 gap-4">
                    <div className="p-5 rounded-full bg-white/5 border border-white/10">
                      <Play size={32} className="opacity-20" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{t("rc_preview_locked")}</span>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-2xl"
                  >
                    <Play size={24} fill="black" className="ml-1" />
                  </motion.div>
                </div>

                {info.duration && (
                  <div className="absolute bottom-6 left-6 rounded-xl bg-black/80 px-4 py-2 text-xs font-black text-white backdrop-blur-md border border-white/10 z-10">
                    {Math.floor(info.duration / 60)}:{(info.duration % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="flex flex-col p-6 lg:p-10 lg:w-[55%]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 border border-blue-500/20">
                    <CheckCircle2 size={12} />
                    {info.platform || "Video Detected"}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-green-400 border border-green-500/20">
                    <Shield size={12} />
                    {t("rc_secure")}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-[1.2] mb-6 tracking-tight line-clamp-2">
                  {info.title}
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    <span>{t("rc_select_format")}</span>
                    <span className="text-blue-500">{t("rc_premium")}</span>
                  </div>
                  
                  <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {(info.formats || []).length > 0 ? (
                      info.formats?.map((format, idx) => {
                        const isDownloading = downloadingId === (format.format_id || idx.toString());
                        return (
                          <button
                            key={format.format_id || idx}
                            disabled={downloadingId !== null && !isDownloading}
                            onClick={() => handleDownload(format.format_id || idx.toString(), format.premium, format.ext, format.quality)}
                            className={`group relative overflow-hidden flex flex-col rounded-2xl border transition-all ${format.premium && !isPremium ? 'bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10' : 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-white/10'} ${isDownloading ? 'ring-2 ring-blue-500/50 scale-[0.98]' : ''} ${downloadingId !== null && !isDownloading ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                          >
                            {/* Progress Background Overlay */}
                            {isDownloading && (
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="absolute inset-0 bg-blue-600/10 z-0 pointer-events-none border-r border-blue-500/30"
                              />
                            )}

                            <div className="relative z-10 w-full flex items-center justify-between p-4">
                              <div className="flex items-center gap-4">
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all border ${format.premium && !isPremium ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-white/5 text-gray-400 border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500'}`}>
                                  {isDownloading ? <Loader2 size={18} className="animate-spin" /> : (format.premium && !isPremium ? <Crown size={18} /> : <Download size={18} />)}
                                </div>
                                <div className="text-left leading-tight">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-black text-white">{format.quality}</p>
                                    {format.premium && (
                                      <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-400 to-yellow-600 text-[7px] font-black text-black uppercase tracking-widest">
                                        Pro
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                                    {isDownloading ? statusText : `${format.ext} • ${format.filesize ? `${(format.filesize / 1024 / 1024).toFixed(1)} MB` : "Auto-Detection"}`}
                                  </p>
                                </div>
                              </div>
                              
                              <AnimatePresence>
                                {isDownloading ? (
                                  <div className="text-[10px] font-black text-blue-500">{Math.round(progress)}%</div>
                                ) : (
                                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all ${format.premium && !isPremium ? 'bg-amber-500/20 border-amber-500/30' : 'bg-white/5 border-white/10 opacity-0 group-hover:opacity-100'}`}>
                                    <Zap size={12} className={format.premium && !isPremium ? "text-amber-500" : "text-blue-400"} />
                                  </div>
                                )}
                              </AnimatePresence>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <button
                        disabled={downloadingId !== null}
                        onClick={() => handleDownload("best")}
                        className={`w-full relative overflow-hidden flex items-center justify-between rounded-2xl bg-white p-5 shadow-2xl transition-all hover:scale-[1.02] active:scale-98 group ${downloadingId !== null ? 'opacity-70' : ''}`}
                      >
                         {/* Progress Overlay */}
                         {downloadingId === "best" && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="absolute inset-0 bg-blue-600/10 z-0 pointer-events-none"
                          />
                        )}

                        <div className="relative z-10 flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                            {downloadingId === "best" ? <Loader2 size={24} className="animate-spin text-blue-500" /> : <Download size={24} />}
                          </div>
                          <div className="text-left leading-tight">
                            <p className="text-base font-black text-black">
                              {downloadingId === "best" ? statusText : t("rc_download_hd")}
                            </p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{downloadingId === "best" ? `${Math.round(progress)}%` : t("rc_processing")}</p>
                          </div>
                        </div>
                        {downloadingId !== "best" && <ArrowRight size={18} className="text-black relative z-10" />}
                      </button>
                    )}
                    
                    <AnimatePresence>
                      {successMessage && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-center gap-4 text-green-400 mt-4"
                        >
                          <div className="p-2 rounded-full bg-green-500/20">
                            <CheckCircle2 size={20} />
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-[10px] font-black uppercase tracking-widest mb-1">¡ÉXITO!</span>
                            <span className="text-xs font-bold truncate max-w-full">{successMessage}</span>
                            <span className="text-[8px] font-bold opacity-60 uppercase tracking-widest mt-1">La descarga ha comenzado</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <Clock size={12} className="text-purple-500" /> {t("rc_fast_export")}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <Info size={12} className="text-blue-500" /> {t("rc_full_hd")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Ads */}
        <aside className="w-full lg:w-[320px] space-y-6">
          <div className="premium-card p-6 glass-card text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6">{t("rc_sponsored")}</h3>
            <AdsterraAds 
              zoneId={ADS_SCRIPTS.SIDEBAR_1.key}
              format={ADS_SCRIPTS.SIDEBAR_1.format}
              minHeight="250px"
              className="rounded-xl"
            />
          </div>
          {/* Premium Upsell Card */}
          {!isPremium && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 p-8 text-center space-y-6 shadow-2xl shadow-blue-500/20 border border-white/20"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
              
              <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
                <Crown size={32} className="animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-black uppercase tracking-[0.25em] text-white/70">VIP Membership</h3>
                <p className="text-2xl font-black italic tracking-tighter text-white leading-tight">UNLOCK THE FULL POWER OF VYTRIXE</p>
              </div>

              <ul className="text-left space-y-3 px-2">
                <li className="flex items-center gap-3 text-xs font-bold text-white/90">
                  <BadgeCheck size={14} className="text-white" /> {t("premium_benefit_1_title")}
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-white/90">
                  <BadgeCheck size={14} className="text-white" /> {t("premium_benefit_2_title")}
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-white/90">
                  <BadgeCheck size={14} className="text-white" /> No ads anywhere
                </li>
              </ul>

              <button 
                onClick={() => router.push("/premium")}
                className="relative w-full py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-black/10 active:scale-95"
              >
                Become Pro Now
              </button>
            </motion.div>
          )}

          <div className="premium-card p-6 glass-card text-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 mb-6">Explore Vytrixe</h3>
            <div className="space-y-3">
               <button onClick={() => router.push("/image-editor")} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">AI Image Studio</button>
               <button onClick={() => router.push("/video-to-text")} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">AI Transcriber</button>
            </div>
          </div>
        </aside>

      </div>
    </motion.div>
  );
}
