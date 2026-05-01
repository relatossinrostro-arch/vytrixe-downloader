import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "Facebook Content Processing Tool | ViralAuthority PRO PREMIUM",
  description: "Process public Facebook media references for personal review, education, accessibility, and responsible digital archiving.",
};

const FAQ_DATA = [
  {
    question: "Que enlaces de Facebook se pueden analizar?",
    answer: "Solo enlaces publicos accesibles por el proveedor de extraccion configurado.",
  },
  {
    question: "Se almacenan archivos?",
    answer: "No. ViralAuthority PRO PREMIUM no aloja ni conserva contenido de terceros.",
  },
  {
    question: "Puedo procesar contenido privado?",
    answer: "No. Usa solo contenido publico o contenido propio con permiso suficiente.",
  },
];

export default function FacebookDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM Facebook Content Tool" }} />
      <SEOPage
        platform="Facebook"
        title="Facebook Content Tool"
        subtitle="Referencia offline y procesamiento multimedia para uso personal o educativo."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="Facebook"
            focus="Facebook puede contener eventos, charlas y publicaciones comunitarias; conserva solo material permitido y evita redistribuirlo sin permiso."
            examples={["Eventos publicos", "Material educativo", "Archivo personal"]}
          />
        }
      />
    </>
  );
}
