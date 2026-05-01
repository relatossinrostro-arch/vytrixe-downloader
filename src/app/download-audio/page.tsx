import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "Audio Processing and Reference Tool | ViralAuthority PRO PREMIUM",
  description: "Prepare audio references, educational notes, transcriptions, and creator workflows with responsible multimedia processing.",
};

const FAQ_DATA = [
  {
    question: "Que formatos de audio se manejan?",
    answer: "FREE incluye MP3 128kbps; PRO desbloquea MP3 256kbps y MP3 320kbps cuando estan disponibles.",
  },
  {
    question: "Para que sirve el flujo de audio?",
    answer: "Sirve para estudio, accesibilidad, transcripcion, notas personales y referencia offline.",
  },
  {
    question: "Se almacenan audios?",
    answer: "No. ViralAuthority PRO PREMIUM no aloja ni almacena contenido de terceros.",
  },
];

export default function AudioDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM Audio Processing Tool" }} />
      <SEOPage
        platform="Audio"
        title="Audio Processing Tool"
        subtitle="Gestion de audio, transcripcion IA y referencia offline para creadores."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="Audio"
            focus="El audio puede incluir voz, musica o clases; procesalo solo cuando tengas permiso o sea para uso personal o educativo."
            examples={["Notas de voz", "Transcripcion", "Referencia sonora"]}
          />
        }
      />
    </>
  );
}
