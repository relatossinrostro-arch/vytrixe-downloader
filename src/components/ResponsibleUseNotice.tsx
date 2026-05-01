"use client";

import { ShieldCheck } from "lucide-react";

export function ResponsibleUseNotice() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-left shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-black/30 text-emerald-300">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.24em] text-emerald-200">
              Uso responsable
            </h2>
            <p className="text-sm font-medium leading-relaxed text-gray-300">
              ViralAuthority PRO PREMIUM está diseñado para uso responsable. No alojamos ni almacenamos contenido de terceros. Todo procesamiento es iniciado por el usuario y debe respetar derechos de autor, términos de cada plataforma y usos personales o educativos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
