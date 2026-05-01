import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "SoundCloud Audio Reference Tool | ViralAuthority PRO PREMIUM",
  description: "Analyze public SoundCloud links for audio reference, study notes, accessibility, and responsible creator workflows.",
};

const FAQ_DATA = [
  {
    question: "Esta herramienta es audio-first?",
    answer: "Si. SoundCloud se trata como flujo de audio para referencia personal, estudio o accesibilidad.",
  },
  {
    question: "Que calidades existen para audio?",
    answer: "FREE incluye MP3 128kbps; PRO desbloquea MP3 256kbps y 320kbps cuando estan disponibles.",
  },
  {
    question: "ViralAuthority guarda pistas?",
    answer: "No. No alojamos ni almacenamos contenido de terceros.",
  },
];

export default function SoundCloudAudioDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM SoundCloud Audio Tool" }} />
      <SEOPage
        platform="SoundCloud"
        title="SoundCloud Audio Tool"
        subtitle="Gestion de audio, referencia offline y flujos responsables para creadores."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="SoundCloud"
            focus="SoundCloud incluye obras de artistas y productores; usa cualquier procesamiento como referencia personal o con autorizacion."
            examples={["Notas de audio", "Estudio musical", "Referencia educativa"]}
          />
        }
      />
    </>
  );
}
