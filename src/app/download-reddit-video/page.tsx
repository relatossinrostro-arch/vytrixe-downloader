import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "Reddit Media Reference Tool | ViralAuthority PRO PREMIUM",
  description: "Prepare public Reddit media references for research, community review, accessibility, and responsible digital archive.",
};

const FAQ_DATA = [
  {
    question: "Que contenido de Reddit puede analizarse?",
    answer: "Solo enlaces publicos accesibles por el proveedor de extraccion configurado.",
  },
  {
    question: "Sirve para investigacion?",
    answer: "Si, especialmente para conservar contexto, citas y material de referencia offline.",
  },
  {
    question: "Procesa publicaciones privadas?",
    answer: "No. ViralAuthority no debe usarse para intentar acceder a contenido privado o eliminado.",
  },
];

export default function RedditVideoDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM Reddit Reference Tool" }} />
      <SEOPage
        platform="Reddit"
        title="Reddit Reference Tool"
        subtitle="Archivo digital responsable para clips publicos y material comunitario."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="Reddit"
            focus="Reddit combina debate, evidencia y contexto comunitario; conserva material publico con notas de fuente y fecha."
            examples={["Investigacion comunitaria", "Clips publicos", "Notas de debate"]}
          />
        }
      />
    </>
  );
}
