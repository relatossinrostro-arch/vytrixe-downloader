type PlatformEducationContentProps = {
  platform: string;
  focus: string;
  examples: string[];
};

export function PlatformEducationContent({ platform, focus, examples }: PlatformEducationContentProps) {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl font-extrabold text-white border-b border-white/10 pb-4">
          {platform}: gestion multimedia responsable
        </h1>
        <p className="mt-8 text-lg text-gray-300 leading-relaxed">
          ViralAuthority PRO PREMIUM ofrece una superficie profesional para analizar enlaces publicos de {platform}, revisar formatos disponibles y preparar material de referencia para uso personal, educativo o creativo.
        </p>
        <p className="mt-4 text-gray-300 leading-relaxed">
          El objetivo es apoyar flujos de archivo digital, transcripcion, organizacion de contenido y referencia offline. No alojamos ni almacenamos contenido de terceros.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white">Casos de uso recomendados</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-300">{item}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                Organiza el material con contexto, fuente y notas propias antes de reutilizarlo en cualquier proyecto.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[36px] border border-emerald-400/20 bg-emerald-400/10 p-8">
        <h2 className="text-2xl font-black text-white">Uso responsable</h2>
        <p className="mt-4 text-gray-300 leading-relaxed">
          {focus} Respeta derechos de autor, terminos de cada plataforma y permisos del creador. Usa estas herramientas para investigacion, estudio, accesibilidad, archivo personal o referencia educativa.
        </p>
      </section>
    </div>
  );
}
