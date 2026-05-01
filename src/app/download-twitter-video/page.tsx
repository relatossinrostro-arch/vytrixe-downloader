import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "Twitter/X Media Reference Tool | ViralAuthority PRO PREMIUM",
  description: "Analyze public Twitter/X media links for personal reference, research notes, accessibility, and responsible creator workflows.",
};

const FAQ_DATA = [
  {
    question: "Soporta enlaces de X y Twitter?",
    answer: "La pagina esta preparada para enlaces publicos compatibles con el flujo interno de deteccion.",
  },
  {
    question: "Puedo procesar contenido privado?",
    answer: "No. Solo deben procesarse enlaces publicos o material propio con permiso suficiente.",
  },
  {
    question: "El backend queda preparado para yt-dlp?",
    answer: "Si. La estructura mantiene compatibilidad con integraciones futuras sin cambiar la interfaz.",
  },
];

export default function TwitterVideoDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM Twitter/X Reference Tool" }} />
      <SEOPage
        platform="Twitter/X"
        title="Twitter/X Reference Tool"
        subtitle="Gestion de referencias publicas, notas de investigacion y archivo personal."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="Twitter/X"
            focus="X se mueve rapido; guarda contexto, fecha y fuente si analizas material publico para investigacion o estudio."
            examples={["Investigacion social", "Referencia de noticias", "Notas de accesibilidad"]}
          />
        }
      />
    </>
  );
}
