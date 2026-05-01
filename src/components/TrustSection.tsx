"use client";

import React from "react";
import { BrainCircuit, DatabaseZap, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export function TrustSection() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Seguridad",
      desc: "Procesamiento de contenido con conexiones cifradas, validaciones de enlace y una interfaz enfocada en reducir riesgos para el usuario.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Lock,
      title: "Privacidad",
      desc: "No pedimos credenciales de redes sociales para analizar enlaces publicos y evitamos guardar historiales personales innecesarios.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: UserCheck,
      title: "Uso responsable",
      desc: "La plataforma esta pensada para uso personal, educativo, archivo digital y referencia offline respetando autores y terminos de cada servicio.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: DatabaseZap,
      title: "No almacenamiento",
      desc: "ViralAuthority PRO PREMIUM no aloja ni conserva contenido de terceros; el procesamiento se inicia por accion directa del usuario.",
      color: "text-amber-400",
      bg: "bg-amber-400/10"
    },
    {
      icon: BrainCircuit,
      title: "IA para creadores",
      desc: "Transcripcion, mejora de texto y edicion visual ayudan a convertir material de referencia en flujos de trabajo creativos mas claros.",
      color: "text-pink-400",
      bg: "bg-pink-400/10"
    }
  ];

  return (
    <section className="py-24 bg-black/40 backdrop-blur-3xl border-t border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic italic text-white leading-tight">
            Plataforma de <span className="text-blue-500 not-italic">confianza</span>
          </h2>
          <p className="text-gray-500 font-medium">
            ViralAuthority PRO PREMIUM combina gestion multimedia, archivo digital responsable y herramientas IA para creadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 space-y-6 group hover:border-white/10 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-lg transition-transform group-hover:scale-110`}>
                <item.icon size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black uppercase tracking-tighter italic text-white">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
