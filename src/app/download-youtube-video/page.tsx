import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "YouTube Content Processing and Digital Archive | ViralAuthority PRO PREMIUM",
  description: "Analyze public YouTube links for personal reference, educational review, AI transcription, and responsible multimedia management.",
};

const FAQ_DATA = [
  {
    question: "Para que sirve esta herramienta de YouTube?",
    answer: "Sirve para analizar enlaces publicos y preparar material de referencia personal, educativo o de estudio cuando el usuario tiene derecho a hacerlo.",
  },
  {
    question: "ViralAuthority almacena contenido de YouTube?",
    answer: "No. ViralAuthority PRO PREMIUM no aloja ni almacena contenido de terceros.",
  },
  {
    question: "Puedo usarlo para transcripcion educativa?",
    answer: "Si. Puedes combinar el analisis de enlace con flujos de transcripcion IA para apuntes, subtitulos o revision personal.",
  },
];

export default function YouTubeDownloader() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ViralAuthority PRO PREMIUM YouTube Content Tool",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
  };

  return (
    <>
      <JsonLd data={schema} />
      <SEOPage
        platform="YouTube"
        title="YouTube Content Tool"
        subtitle="Gestion multimedia para referencia personal, estudio y transcripcion IA."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="YouTube"
            focus="YouTube es una fuente amplia de aprendizaje y referencia; procesa solo material permitido para uso personal o educativo."
            examples={["Clases y tutoriales", "Referencias offline", "Subtitulos y notas"]}
          />
        }
      />
    </>
  );
}
