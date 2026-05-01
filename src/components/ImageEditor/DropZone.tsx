"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Link as LinkIcon, Sparkles, Loader2, ClipboardPaste } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  onLinkSubmit: (url: string) => void;
}

export function DropZone({ onFileSelect, onLinkSubmit }: DropZoneProps) {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov']
    },
    multiple: false
  });

  const handlePaste = useCallback((event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          onFileSelect(file);
          // Trigger a global success event or similar if needed
          // But usually loading the file is enough feedback
        }
      }
    }
  }, [onFileSelect]);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const handleClipboardClick = async () => {
    try {
      if (!navigator.clipboard) {
        alert("Tu navegador no soporta el acceso al portapapeles. Usa CTRL + V.");
        return;
      }
      
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const file = new File([blob], "clipboard-image.png", { type });
            onFileSelect(file);
            return;
          }
        }
      }
      alert("No se encontró ninguna imagen en el portapapeles. Prueba con CTRL + V.");
    } catch (err) {
      console.error("Clipboard access error:", err);
      alert("Presiona CTRL + V para pegar tu captura");
    }
  };

  const handleSubmitLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onLinkSubmit(url.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 py-12">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div 
            {...getRootProps()}
            className={`relative flex flex-col items-center justify-center p-8 sm:p-16 border-2 border-dashed rounded-[2.5rem] transition-all cursor-pointer overflow-hidden
              ${isDragActive 
                ? 'border-blue-500 bg-blue-500/10 scale-[1.02] shadow-[0_0_50px_rgba(59,130,246,0.3)]' 
                : 'border-white/10 bg-black hover:border-white/20'}`}
          >
            <input {...getInputProps()} />
            
            <motion.div
              animate={isDragActive ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/5 flex items-center justify-center text-blue-500 mb-8 border border-white/5 shadow-inner"
            >
              <Upload size={42} className={isDragActive ? "animate-bounce" : ""} />
            </motion.div>

            <h2 className="max-w-full text-center text-xl sm:text-3xl font-black uppercase tracking-tight leading-tight mb-3 break-words">
              {isDragActive ? "Sueltalo aquí 🔥" : "ViralAuthority PRO PREMIUM Studio"}
            </h2>
            <p className="text-gray-400 font-medium mb-8 text-center max-w-md text-sm sm:text-base">
              Arrastra tu imagen o video aquí, o haz clic para subirlo. <br/>
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-black">JPG · PNG · WEBP · MP4</span>
              <span className="hidden sm:block mt-2 text-[11px] text-blue-400/60 font-bold tracking-tight">
                También puedes pegar una captura con <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono">CTRL + V</kbd>
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white shadow-lg hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <Upload size={14} /> Subir Archivo
              </button>
              
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); handleClipboardClick(); }}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ClipboardPaste size={14} /> Pegar captura
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em] text-white/20">
          <span className="bg-[#050505] px-6">O utiliza un enlace</span>
        </div>
      </div>

      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleSubmitLink}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative group">
          <div className="absolute inset-y-0 left-5 flex items-center text-gray-500 group-focus-within:text-blue-500 transition-colors">
            <LinkIcon size={18} />
          </div>
          <input 
            type="text"
            placeholder="Pega un link de TikTok, YouTube, Instagram o imagen directa..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
          />
        </div>
        <button 
          disabled={!url.trim() || isProcessing}
          className="px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-yellow-500" />}
          Importar
        </button>
      </motion.form>
    </div>
  );
}
