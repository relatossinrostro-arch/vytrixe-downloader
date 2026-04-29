"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Play, Download, Loader2, Clock, 
  Video, Monitor, CheckCircle2, AlertCircle, 
  ChevronRight, Volume2, Music, Layers, History
} from "lucide-react";
import axios from "axios";

const AI_API_URL = "http://localhost:8000";

export default function AIContentStudio() {
  const [niche, setNiche] = useState("Curiosidades");
  const [format, setFormat] = useState("9:16");
  const [theme, setTheme] = useState("");
  const [voice, setVoice] = useState("en-US-ChristopherNeural");
  const [music, setMusic] = useState("lofi");
  
  const [job, setJob] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Poll status if job is processing
  useEffect(() => {
    let interval: any;
    if (job && (job.status === "pending" || job.status === "processing")) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`${AI_API_URL}/api/ai-video/status/${job.id}`);
          setJob(res.data);
          if (res.data.status === "completed" || res.data.status === "failed") {
            clearInterval(interval);
            setIsGenerating(false);
            if (res.data.status === "completed") {
              setHistory(prev => [res.data, ...prev]);
            }
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [job]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setJob(null);
    try {
      const res = await axios.post(`${AI_API_URL}/api/ai-video/start`, {
        niche,
        format,
        theme,
        voice,
        music
      });
      setJob(res.data);
    } catch (e) {
      alert("No se pudo conectar con el motor de IA. ¿Está encendido?");
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20">
                <Sparkles size={28} className="text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter italic">AI CONTENT STUDIO</h1>
            </div>
            <p className="text-gray-400 text-sm font-medium tracking-wide">Genera videos automáticos para YouTube y TikTok en segundos.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
            <div className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
              Pro Version
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Config Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="premium-card p-8 glass-card space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Nicho del Video</label>
                  <select 
                    value={niche} 
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:border-purple-500 outline-none transition-all text-white"
                  >
                    <option value="Curiosidades" className="bg-[#0a0a0a] text-white">Curiosidades</option>
                    <option value="Historias de Terror" className="bg-[#0a0a0a] text-white">Historias de Terror</option>
                    <option value="Motivación" className="bg-[#0a0a0a] text-white">Motivación</option>
                    <option value="Finanzas" className="bg-[#0a0a0a] text-white">Finanzas</option>
                    <option value="Gaming" className="bg-[#0a0a0a] text-white">Gaming</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Formato</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setFormat("9:16")}
                      className={`flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${format === "9:16" ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10 text-gray-400'}`}
                    >
                      <Video size={18} />
                      <span className="text-[10px] font-black uppercase">Shorts 9:16</span>
                    </button>
                    <button 
                      onClick={() => setFormat("16:9")}
                      className={`flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all ${format === "16:9" ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/10 text-gray-400'}`}
                    >
                      <Monitor size={18} />
                      <span className="text-[10px] font-black uppercase">Largo 16:9</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Idea o Tema Principal</label>
                  <textarea 
                    placeholder="Ej: 3 datos que no sabías sobre el espacio..."
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold focus:border-purple-500 outline-none transition-all min-h-[120px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2"><Volume2 size={12}/> Voz</label>
                    <select value={voice} onChange={(e) => setVoice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold outline-none text-white">
                      <option value="en-US-ChristopherNeural" className="bg-[#0a0a0a] text-white">Masculina</option>
                      <option value="en-US-JennyNeural" className="bg-[#0a0a0a] text-white">Femenina</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2"><Music size={12}/> Música</label>
                    <select value={music} onChange={(e) => setMusic(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold outline-none text-white">
                      <option value="lofi" className="bg-[#0a0a0a] text-white">Lofi Relax</option>
                      <option value="epic" className="bg-[#0a0a0a] text-white">Epic Cinema</option>
                      <option value="suspense" className="bg-[#0a0a0a] text-white">Suspense</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !theme}
                className="w-full py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_auto] rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl hover:bg-right transition-all duration-500 active:scale-95 disabled:opacity-30 disabled:grayscale"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 size={18} className="animate-spin" />
                    <span>PROCESANDO...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles size={18} />
                    <span>GENERAR VIDEO AI</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Monitoring & Preview */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Job Status */}
            <AnimatePresence mode="wait">
              {job ? (
                <motion.div 
                  key="active-job"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="premium-card p-10 glass-card relative overflow-hidden"
                >
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Estado del Pipeline</span>
                        <h3 className="text-2xl font-black italic">{job.step}</h3>
                      </div>
                      <div className="text-4xl font-black text-white/10">{job.progress}%</div>
                    </div>

                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                      />
                    </div>

                    {job.status === "completed" ? (
                      <div className="flex flex-col items-center gap-6 py-8">
                        <div className="w-full aspect-video rounded-3xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                           <div className="text-center space-y-4">
                             <CheckCircle2 size={48} className="mx-auto text-green-500" />
                             <p className="text-sm font-bold text-gray-400 italic">Previsualización del video generada correctamente</p>
                           </div>
                        </div>
                        <div className="flex gap-4 w-full">
                          <button className="flex-1 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                            <Play size={14} /> Reproducir
                          </button>
                          <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                            <Download size={14} /> Descargar MP4
                          </button>
                        </div>
                      </div>
                    ) : job.status === "failed" ? (
                      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-4">
                        <AlertCircle size={24} />
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase">Error en la Generación</p>
                          <p className="text-[11px] font-bold opacity-80">{job.error}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-4 py-4">
                        {[
                          { id: 'script', label: 'Guión', icon: Layers, p: 10 },
                          { id: 'audio', label: 'Audio', icon: Volume2, p: 30 },
                          { id: 'visuals', label: 'Escenas', icon: Play, p: 60 },
                          { id: 'render', label: 'Render', icon: CheckCircle2, p: 80 }
                        ].map((step, i) => (
                          <div key={i} className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${job.progress >= step.p ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-white/5 border-white/5 text-white/20'}`}>
                            <step.icon size={20} />
                            <span className="text-[9px] font-black uppercase tracking-widest">{step.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-[400px] rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-6 rounded-full bg-white/5">
                    <Play size={48} className="text-white/10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest text-white/20">Esperando Inicio</p>
                    <p className="text-xs font-medium text-gray-600 max-w-xs">Configura los parámetros de tu video y haz clic en "Generar Video AI" para comenzar.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* History */}
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <History size={20} className="text-blue-500" />
                 <h4 className="text-sm font-black uppercase tracking-widest">Historial de Creaciones</h4>
               </div>

               <div className="grid sm:grid-cols-2 gap-4">
                 {history.length > 0 ? history.map((h, i) => (
                   <div key={i} className="premium-card p-5 glass-card flex items-center justify-between group">
                     <div className="flex items-center gap-4 overflow-hidden">
                       <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all">
                         <Video size={18} className="text-gray-500 group-hover:text-purple-400" />
                       </div>
                       <div className="flex flex-col overflow-hidden">
                         <span className="text-xs font-black truncate">{h.id.slice(0,8)}...</span>
                         <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2"><Clock size={10}/> {new Date().toLocaleDateString()}</span>
                       </div>
                     </div>
                     <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-blue-400 transition-all">
                       <Download size={16} />
                     </button>
                   </div>
                 )) : (
                   <p className="col-span-full text-center py-12 text-[10px] font-black uppercase tracking-widest text-white/10 italic">No hay videos generados aún</p>
                 )}
               </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
