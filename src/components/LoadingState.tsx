"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="relative h-24 w-24">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="h-full w-full rounded-full border-[10px] border-white/5 border-t-blue-500 border-r-purple-500 shadow-2xl shadow-blue-500/20" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap size={24} className="text-white animate-pulse" />
        </div>
      </div>
      
      <div className="mt-12 space-y-4">
        <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Fetching <span className="text-blue-500">Video</span> Assets
        </h3>
        <p className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] max-w-xs mx-auto">
          Our global edge nodes are processing your request. Please hold.
        </p>
      </div>
      
      <div className="mt-8 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            className="h-1.5 w-1.5 rounded-full bg-blue-500"
          />
        ))}
      </div>
    </div>
  );
}
