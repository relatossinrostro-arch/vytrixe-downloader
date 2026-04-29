"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
  import { 
    FileText, 
    Video,
    Copy, 
    Check, 
    Sparkles, 
    Clock, 
    Languages, 
    ShieldCheck,
    Zap,
    Loader2,
    Activity
  } from "lucide-react";
  import axios from "axios";
  import { useLanguage } from "@/context/LanguageContext";
  import { useUser } from "@/context/UserContext";
  import { motion, AnimatePresence } from "framer-motion";
  
  export default function VideoToTextPage() {
    const [url, setUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [activeMode, setActiveMode] = useState<"url" | "file">("url");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");
    const [transcription, setTranscription] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState("auto");
    const { t } = useLanguage();
    const { user, isPremium } = useUser();

  const languages = [
    { code: "auto", name: t("trans_lang_auto") },
    { code: "English", name: t("trans_lang_en") },
    { code: "Spanish", name: t("trans_lang_es") },
    { code: "French", name: t("trans_lang_fr") },
    { code: "German", name: t("trans_lang_de") },
    { code: "Italian", name: t("trans_lang_it") },
    { code: "Portuguese", name: t("trans_lang_pt") },
  ];

  const handleTranscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeMode === "url" && !url) return;
    if (activeMode === "file" && !file) return;

    setLoading(true);
    setError(null);
    setTranscription(null);
    setProgress(5);
    setStatusMessage(t("trans_status_1"));

    // Progressive loading simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          setStatusMessage(t("trans_status_2"));
          return prev + 1;
        }
        if (prev < 65) {
          setStatusMessage(t("trans_status_3"));
          return prev + 0.5;
        }
        if (prev < 90) {
          setStatusMessage(t("trans_status_4"));
          return prev + 0.2;
        }
        if (prev < 98) {
          setStatusMessage(t("trans_status_5"));
          return prev + 0.1;
        }
        return prev;
      });
    }, 150);

    try {
      const formData = new FormData();
      if (activeMode === "url") {
        formData.append("url", url);
      } else if (file) {
        formData.append("file", file);
      }
      formData.append("targetLanguage", selectedLang);
      
      if (isPremium && user) {
        formData.append("userId", user.id);
      }

      const response = await axios.post("/api/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        setTranscription(response.data.text);
        setLoading(false);
      }, 500);
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error("Transcription error:", err);
      const serverError = err.response?.data?.error;
      const details = err.response?.data?.details;
      
      setError(details ? `${serverError}: ${details.substring(0, 50)}...` : (serverError || t("trans_limit_error")));
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!transcription) return;
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="container mx-auto px-4 py-12 lg:py-24 max-w-5xl">
        <div className="space-y-12">
          
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold">
              <Sparkles size={16} /> AI POWERED
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-[1.1] uppercase italic px-4">
              {t("trans_title_1")} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600 inline-block pr-2">{t("trans_title_2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              {t("trans_subtitle")}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex justify-center gap-4 max-w-sm mx-auto">
            <button 
              onClick={() => setActiveMode("url")}
              className={`flex-1 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${activeMode === "url" ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}
            >
              URL Link
            </button>
            <button 
              onClick={() => setActiveMode("file")}
              className={`flex-1 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${activeMode === "file" ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-500 border border-white/5'}`}
            >
              Upload File
            </button>
          </div>

          {/* Form Area */}
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <form 
              onSubmit={handleTranscribe}
              className="relative bg-black border border-white/10 p-2 rounded-[2rem] flex flex-col gap-2"
            >
              <div className="flex flex-col md:flex-row gap-2">
                {activeMode === "url" ? (
                  <div className="flex-1 flex items-center gap-3 px-6 h-16 bg-white/[0.03] rounded-2xl border border-white/10 group-focus-within:border-purple-500/50 transition-colors">
                    <Video className="text-purple-500 shrink-0" size={24} />
                    <input 
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={t("trans_placeholder")}
                      className="w-full bg-transparent border-none outline-none text-lg font-medium placeholder:text-gray-600"
                      required={activeMode === "url"}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-3 px-4 h-16 bg-white/[0.03] rounded-2xl border border-white/10 group-focus-within:border-purple-500/50 transition-colors relative overflow-hidden">
                    <FileText className="text-purple-500 shrink-0" size={24} />
                    <span className="text-sm font-medium text-gray-400 truncate">
                      {file ? file.name : "Select or drag audio/video file..."}
                    </span>
                    <input 
                      type="file"
                      accept="audio/*,video/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      required={activeMode === "file"}
                    />
                  </div>
                )}
                
                <div className="h-16 flex items-center gap-2 px-4 bg-white/[0.03] rounded-2xl border border-white/10">
                  <Languages className="text-purple-500 shrink-0" size={20} />
                  <select 
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-bold uppercase tracking-widest text-gray-400 cursor-pointer focus:text-white transition-colors h-full pr-4"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code} className="bg-black text-white">{lang.name}</option>
                    ))}
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="h-16 md:w-56 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                  {loading ? t("trans_loading") : t("trans_btn")}
                </button>
              </div>
            </form>
          </div>

          {/* Progress Bar Area */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-3">
                    <Activity className="text-purple-500 animate-pulse" size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest text-purple-400">
                      {statusMessage}
                    </span>
                  </div>
                  <span className="text-sm font-black text-white">{Math.floor(progress)}%</span>
                </div>
                
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-[length:200%_100%] animate-gradient-x rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                  />
                </div>
                
                <p className="text-center text-xs text-gray-500 font-medium">
                  {progress < 50 ? "Downloading audio buffers..." : "Whisper AI is processing the semantic timestamps..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <div className="max-w-3xl mx-auto bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <p className="text-red-200 font-medium pt-2">{error}</p>
            </div>
          )}

          {/* Results Area */}
          {transcription && (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-widest">{t("trans_result")}</h3>
                      <p className="text-xs text-gray-500 font-medium">{t("trans_ready")}</p>
                    </div>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors font-bold text-xs uppercase tracking-widest"
                  >
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    {copied ? t("trans_copied") : t("trans_copy")}
                  </button>
                </div>
                <div className="p-8 lg:p-12">
                  <textarea 
                    value={transcription}
                    readOnly
                    className="w-full h-[400px] bg-transparent border-none outline-none text-gray-100 text-lg leading-relaxed font-normal resize-none focus:ring-0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Info Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              { title: t("trans_feat1_title"), desc: t("trans_feat1_desc"), icon: Zap },
              { title: t("trans_feat2_title"), desc: t("trans_feat2_desc"), icon: Languages },
              { title: t("trans_feat3_title"), desc: t("trans_feat3_desc"), icon: Clock }
            ].map((f, i) => (
              <div key={i} className="space-y-4 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-purple-500/30">
                  <f.icon size={28} />
                </div>
                <h4 className="text-lg font-black uppercase italic tracking-tighter">{f.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
