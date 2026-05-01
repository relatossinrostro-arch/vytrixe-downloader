"use client";

import { AlertCircle, X, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { UNSUPPORTED_LINK_ERROR } from "@/lib/platforms";

interface ErrorAlertProps {
  message: string;
  onClear: () => void;
}

export function ErrorAlert({ message, onClear }: ErrorAlertProps) {
  const { t } = useLanguage();
  const isUnsupportedLink = message === UNSUPPORTED_LINK_ERROR;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 mt-8 max-w-2xl"
    >
      <div className="flex items-center gap-5 rounded-3xl bg-red-500/5 p-6 border border-red-500/20 backdrop-blur-3xl shadow-2xl shadow-red-500/5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20">
          <ShieldAlert size={24} />
        </div>
        <div className="flex-1">
          <h4 className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] mb-1">
            {isUnsupportedLink ? "Enlace no soportado" : t("error_system_exception")}
          </h4>
          <p className="text-sm font-bold text-white leading-relaxed">{message}</p>
        </div>
        <button 
          onClick={onClear}
          className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-500 hover:bg-white hover:text-black transition-all active:scale-90"
        >
          <X size={18} />
        </button>
      </div>
    </motion.div>
  );
}
