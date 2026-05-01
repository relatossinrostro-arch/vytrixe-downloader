import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "Pinterest Visual Reference Tool | ViralAuthority PRO PREMIUM",
  description: "Organize public Pinterest references for study, design planning, educational review, and responsible multimedia management.",
};

const FAQ_DATA = [
  {
    question: "Para que sirve la herramienta de Pinterest?",
    answer: "Para analizar referencias publicas y organizarlas como material visual de estudio o inspiracion.",
  },
  {
    question: "Puedo publicar contenido de otros?",
    answer: "Solo si tienes derechos o permiso. ViralAuthority promueve uso responsable y respeto por creadores.",
  },
  {
    question: "Se guardan copias en ViralAuthority?",
    answer: "No. No alojamos ni almacenamos contenido de terceros.",
  },
];

export default function PinterestDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM Pinterest Reference Tool" }} />
      <SEOPage
        platform="Pinterest"
        title="Pinterest Reference Tool"
        subtitle="Archivo visual, moodboards privados y gestion responsable de referencias."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="Pinterest"
            focus="Pinterest funciona como motor de inspiracion visual; conserva referencias con contexto y respeta autoria."
            examples={["Moodboards", "Investigacion visual", "Referencias de diseno"]}
          />
        }
      />
    </>
  );
}
