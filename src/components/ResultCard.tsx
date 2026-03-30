"use client";

import { motion } from "framer-motion";
import { Download, Play, ExternalLink, ArrowLeft } from "lucide-react";
import { VideoInfo } from "@/lib/video";
import Image from "next/image";
import { AdPlaceholder } from "./AdPlaceholder";

interface ResultCardProps {
  info: VideoInfo;
  videoUrl: string;
  onReset: () => void;
}

export function ResultCard({ info, videoUrl, onReset }: ResultCardProps) {
  const handleDownload = async (formatId: string) => {
    try {
      // Call our VPS download endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://167.86.74.3:3001"}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl, formatId }),
      });
      
      if (!response.ok) throw new Error("Download failed");
      
      const data = await response.json();
      if (data.url) {
        // Trigger download
        const link = document.createElement("a");
        link.href = data.url;
        link.setAttribute("download", data.fileName || "video.mp4");
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to start download. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <button 
        onClick={onReset}
        className="mb-8 flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-white border border-gray-100 shadow-sm transition-all active:scale-95"
      >
        <ArrowLeft size={18} />
        Download another video
      </button>

      <div className="overflow-hidden rounded-3xl bg-white shadow-soft border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {/* Preview Section */}
          <div className="relative aspect-video w-full md:w-1/2 bg-gray-900 overflow-hidden">
            {info.thumbnail ? (
              <Image
                src={info.thumbnail}
                alt={info.title || "preview"}
                fill
                className="object-cover opacity-80"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                <Play size={24} className="opacity-20" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-50">No preview available</span>
              </div>
            )}
            {info.thumbnail && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                  <Play size={24} fill="white" />
                </div>
              </div>
            )}
            {info.duration && (
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm z-10">
                {Math.floor(info.duration / 60)}:{(info.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-8 md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                {info.platform || "Video Ready"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight mb-4">
              {info.title}
            </h2>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-6 font-black animate-pulse">
              Select quality to download:
            </p>

            <div className="space-y-3 mt-auto max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {(info.formats || []).length > 0 ? (
                info.formats?.map((format, idx) => (
                  <motion.button
                    key={format.format_id || idx}
                    onClick={() => handleDownload(format.format_id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:bg-blue-50 hover:border-blue-100 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-gray-900">{format.quality} quality</p>
                        <p className="text-[10px] font-bold text-gray-400 capitalize">
                          {format.ext} • {format.filesize ? `${(format.filesize / 1024 / 1024).toFixed(1)} MB` : "Auto size"}
                        </p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))
              ) : (
                <motion.button
                  onClick={() => handleDownload("best")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 p-5 transition-all group shadow-lg shadow-blue-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                      <Download size={22} />
                    </div>
                    <div className="text-left">
                      <p className="text-base font-black text-gray-900">Download Best Quality</p>
                      <p className="text-[11px] font-bold text-gray-500">Fast Download • No Watermark</p>
                    </div>
                  </div>
                  <Download size={20} className="text-blue-600" />
                </motion.button>
              )}

              <div className="pt-4 text-center space-y-2">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">
                  🔥 High speed processing enabled
                </p>
                <p className="text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2">
                  Safe • No watermark • Premium Server
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
