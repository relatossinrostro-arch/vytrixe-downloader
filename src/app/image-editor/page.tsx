"use client";

import React, { useState } from "react";
import { Upload, ImageIcon, Sparkles, Wand2, ShieldCheck, Zap, ClipboardPaste } from "lucide-react";
import Editor from "@/components/ImageEditor/Editor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function ImageEditorPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  const processFile = (file: File | Blob) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // If we're already editing an image, we might not want to replace it accidentally
      // But for the landing page where selectedImage is null, it's perfect.
      if (selectedImage) return;

      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) processFile(blob);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [selectedImage]);

  const handleManualPaste = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.read) {
        alert("Tu navegador no soporta pegar directamente o faltan permisos.");
        return;
      }
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.filter(type => type.startsWith('image/'));
        if (imageTypes.length > 0) {
          const blob = await clipboardItem.getType(imageTypes[0]);
          processFile(blob);
          return;
        }
      }
      alert("No se encontró una imagen en el portapapeles.");
    } catch (error) {
      console.error("Error pasting:", error);
      alert("Permiso denegado o error al acceder al portapapeles.");
    }
  };

  const handleCreateAI = (type: 'cover' | 'thumbnail') => {
    // For now, let's use a small transparent pixel as a base image
    const blankPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    setSelectedImage(blankPixel);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex flex-col">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12 relative z-10 flex items-center justify-center">
        <Editor imageSrc={selectedImage || undefined} onClose={() => setSelectedImage(null)} />
      </main>

      <Footer />
    </div>
  );
}
