"use client";

import React from "react";
import { 
  Maximize, SlidersHorizontal, Palette, Sparkles, 
  RotateCw, FlipHorizontal, FlipVertical, Wand2, 
  Crown, Play, Download, Trash2, Layers, Type, 
  PenTool, Crop as CropIcon, Image as ImageIcon,
  Square, Circle, ArrowUpRight, Eraser,
  Sun, Moon, Droplets, Thermometer, Box, ZoomIn
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorStore } from "@/store/editorStore";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

interface SidebarProps {
  onRemoveBG: () => void;
  onUpscale: () => void;
  onExport: (format: string) => void;
  onAddText: () => void;
  onAddShape: (type: string) => void;
  onApplyFilter: (filter: string) => void;
  onCropMode: () => void;
  onApplyCrop: () => void;
  onCancelCrop: () => void;
  isProcessing: boolean;
  isCropping: boolean;
}

export function Sidebar({ 
  onRemoveBG, onUpscale, onExport, onAddText, onAddShape, 
  onApplyFilter, onCropMode, onApplyCrop, onCancelCrop,
  isProcessing, isCropping 
}: SidebarProps) {
  const { 
    activeTab, setActiveTab, reset, setFilter, 
    brightness, contrast, saturate, sepia, hue, blur, temperature, vignette, exposure,
    isDrawingMode, setDrawingMode, brushColor, brushWidth, setBrushSettings
  } = useEditorStore();
  const { isPremium } = useUser();
  const [exportFormat, setExportFormat] = React.useState('png');

  const tabs = [
    { id: 'transform', icon: Maximize, label: 'Transform' },
    { id: 'crop', icon: CropIcon, label: 'Crop' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'draw', icon: PenTool, label: 'Draw' },
    { id: 'filters', icon: Palette, label: 'Filters' },
    { id: 'adjust', icon: SlidersHorizontal, label: 'Adjust' },
    { id: 'ai', icon: Sparkles, label: 'AI Studio' },
  ];

  const TabButton = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all relative ${activeTab === id ? 'text-blue-400' : 'text-white/40 hover:text-white/60'}`}
    >
      <Icon size={18} />
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      {activeTab === id && (
        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      )}
    </button>
  );

  const Slider = ({ label, value, min, max, onChange, colorClass = "accent-blue-500" }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className="text-[9px] font-bold text-white/60">{value}%</span>
      </div>
      <input 
        type="range" min={min} max={max} value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-1 bg-white/5 rounded-full appearance-none ${colorClass} cursor-pointer`} 
      />
    </div>
  );

  return (
    <div className="w-full lg:w-80 bg-black/40 backdrop-blur-3xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col h-[450px] lg:h-full shadow-2xl relative z-30 overflow-hidden">
      
      {/* Tabs - Scrollable on mobile */}
      <div className="flex overflow-x-auto lg:overflow-x-visible border-b border-white/5 bg-black/20 shrink-0 no-scrollbar">
        {tabs.map(tab => <TabButton key={tab.id} {...tab} />)}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'transform' && (
            <motion.div key="transform" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <RotateCw size={20} className="text-blue-400" />
                  <span className="text-[9px] font-black uppercase">Rotate</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <FlipHorizontal size={20} className="text-purple-400" />
                  <span className="text-[9px] font-black uppercase">Flip X</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <FlipVertical size={20} className="text-purple-400" />
                  <span className="text-[9px] font-black uppercase">Flip Y</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <ZoomIn size={20} className="text-green-400" />
                  <span className="text-[9px] font-black uppercase">Zoom</span>
                </button>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">Redimensionar (px)</label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[8px] text-white/40 uppercase">Ancho</span>
                    <input type="number" placeholder="1920" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-white/40 uppercase">Alto</span>
                    <input type="number" placeholder="1080" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['1080x1080', '1920x1080', '1280x720', '1080x1920'].map(res => (
                    <button key={res} className="py-2 bg-white/5 border border-white/5 rounded-lg text-[8px] font-bold hover:bg-blue-500/10 transition-all">
                      {res}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'crop' && (
            <motion.div key="crop" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {!isCropping ? (
                <button onClick={onCropMode} className="w-full py-4 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all">
                  Entrar en Modo Recorte
                </button>
              ) : (
                <div className="space-y-2">
                   <button onClick={onApplyCrop} className="w-full py-4 bg-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-green-500 transition-all">
                    Aplicar Recorte
                  </button>
                  <button onClick={onCancelCrop} className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all">
                    Cancelar
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-4">
                {['1:1', '16:9', '9:16', '4:5', 'Free'].map(ratio => (
                  <button key={ratio} className="py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase hover:bg-white/10">
                    {ratio}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'text' && (
            <motion.div key="text" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <button onClick={onAddText} className="w-full py-4 bg-white/5 border border-blue-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2">
                <Type size={14} /> Añadir Texto
              </button>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                 <div className="flex gap-2">
                   {['#ffffff', '#000000', '#3b82f6', '#ef4444', '#eab308'].map(c => (
                     <button key={c} className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                   ))}
                 </div>
                 <Slider label="Tamaño" value={50} min={10} max={200} onChange={() => {}} />
              </div>
            </motion.div>
          )}

          {activeTab === 'draw' && (
            <motion.div key="draw" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setDrawingMode(!isDrawingMode)} className={`p-4 rounded-xl border transition-all ${isDrawingMode ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 text-white/40'}`}>
                  <PenTool size={20} />
                </button>
                <button onClick={() => onAddShape('rect')} className="p-4 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-white/10">
                  <Square size={20} />
                </button>
                <button onClick={() => onAddShape('circle')} className="p-4 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-white/10">
                  <Circle size={20} />
                </button>
                <button onClick={() => onAddShape('arrow')} className="p-4 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-white/10">
                  <ArrowUpRight size={20} />
                </button>
                <button className="p-4 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-white/10">
                  <Eraser size={20} />
                </button>
              </div>
              <Slider label="Grosor" value={brushWidth} min={1} max={50} onChange={(v:any) => setBrushSettings(brushColor, v)} />
              <div className="flex gap-2 pt-2">
                {['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#ffffff'].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setBrushSettings(c, brushWidth)}
                    className={`w-6 h-6 rounded-full border-2 ${brushColor === c ? 'border-white' : 'border-transparent'}`} 
                    style={{ backgroundColor: c }} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'filters' && (
            <motion.div key="filters" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-2 gap-2">
              {['Original', 'B&N', 'Sepia', 'Vintage', 'Cool', 'Warm', 'HDR', 'Sharp'].map(f => (
                <button key={f} onClick={() => onApplyFilter(f)} className="p-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase hover:bg-white/10 transition-all">
                  {f}
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'adjust' && (
            <motion.div key="adjust" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <Slider label="Brillo" value={brightness} min={0} max={200} onChange={(v:any) => setFilter('brightness', v)} icon={Sun} />
              <Slider label="Contraste" value={contrast} min={0} max={200} onChange={(v:any) => setFilter('contrast', v)} icon={Droplets} />
              <Slider label="Saturación" value={saturate} min={0} max={200} onChange={(v:any) => setFilter('saturate', v)} icon={Palette} />
              <Slider label="Temperatura" value={temperature} min={-100} max={100} onChange={(v:any) => setFilter('temperature', v)} icon={Thermometer} />
              <Slider label="Viñeta" value={vignette} min={0} max={100} onChange={(v:any) => setFilter('vignette', v)} icon={Box} />
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div key="ai" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
              {[
                { label: 'Quitar Fondo', icon: Wand2, color: 'text-blue-400', action: onRemoveBG },
                { label: 'Upscale 2X', icon: ZoomIn, color: 'text-purple-400', action: onUpscale },
                { label: 'Limpiar Imagen', icon: Sparkles, color: 'text-yellow-400' },
                { label: 'Texto Viral', icon: Type, color: 'text-green-400' }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={item.color} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  {!isPremium && <Crown size={12} className="text-yellow-500" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-5 border-t border-white/5 bg-black/40 space-y-4 shrink-0">
        <div className="flex flex-col gap-2">
          <label className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Formato de Salida</label>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {['png', 'jpg', 'webp'].map(fmt => (
              <button 
                key={fmt}
                onClick={() => setExportFormat(fmt)}
                className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${exportFormat === fmt ? 'bg-blue-600 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={reset} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-all flex items-center justify-center gap-2">
            <Trash2 size={12} /> Reset
          </button>
          <button onClick={() => onExport(exportFormat)} disabled={isProcessing} className="flex-[2] py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-[9px] font-black uppercase tracking-widest text-white shadow-lg hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center justify-center gap-2">
            {isProcessing ? <Loader2 className="animate-spin" size={12} /> : <Download size={12} />} Exportar Pro
          </button>
        </div>
      </div>
    </div>
  );
}

const Loader2 = ({ className, size }: any) => (
  <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
