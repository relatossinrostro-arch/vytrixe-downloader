"use client";

import { motion } from "framer-motion";
import { Play, TrendingUp, Zap, Star, Shield, Clock, Search, Download } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const TRENDING_VIDEOS = [
  {
    id: "1",
    title: "Paradise Found: Bali",
    category: "YouTube",
    views: "2.1M",
    date: "3h ago",
    url: "https://www.youtube.com/shorts/m_S67JzFqYs",
    thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "POV: Tokyo Night Vibes",
    category: "YouTube",
    views: "850K",
    date: "5h ago",
    url: "https://www.youtube.com/shorts/zR3zH8O1S_I",
    thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "The Future of AI",
    category: "YouTube",
    views: "1.2M",
    date: "1h ago",
    url: "https://www.youtube.com/shorts/pZ_n0kLqX9E",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    title: "Master Chef Secrets",
    category: "YouTube",
    views: "3.4M",
    date: "12h ago",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
  },
];

const CATEGORIES = ["ALL", "TikTok", "Instagram", "YouTube", "Facebook"];

interface TrendingGridProps {
  onSelect?: (url: string) => void;
}

export function TrendingGrid({ onSelect }: TrendingGridProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredVideos = selectedCategory === "ALL" 
    ? TRENDING_VIDEOS 
    : TRENDING_VIDEOS.filter(v => v.category === selectedCategory);

  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
              <TrendingUp size={14} />
              {t("trending_badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {t("trending_title_1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 uppercase">{t("trending_title_2")}</span>
            </h2>
          </div>
          
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap ${
                  selectedCategory === cat 
                  ? "bg-white text-black shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat === "ALL" ? t("cat_all") : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredVideos.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => onSelect?.(video.url)}
              className="premium-card group cursor-pointer overflow-hidden border border-white/5 hover:border-white/20 active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                   src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-xl">
                    {video.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-300 mb-2">
                    <Download size={20} />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{t("trending_download")}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <Zap size={12} className="text-yellow-500" />
                    {video.views} {t("trending_views")}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <Clock size={12} />
                    {video.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-20 text-center">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-20" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{t("trending_empty")}</p>
          </div>
        )}

        <div className="mt-20 text-center">
          <button className="px-12 py-5 rounded-[32px] bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-2xl hover:scale-[1.05] active:scale-95">
            {t("trending_btn")}
          </button>
        </div>
      </div>
    </section>
  );
}
