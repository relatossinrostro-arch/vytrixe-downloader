import { JsonLd } from "@/components/JsonLd";
import { PlatformEducationContent } from "@/components/PlatformEducationContent";
import { SEOPage } from "@/components/SEOPage";

export const metadata = {
  title: "Instagram Media Management Tool | ViralAuthority PRO PREMIUM",
  description: "Analyze public Instagram media links for personal reference, creator planning, educational review, and responsible multimedia workflows.",
};

const FAQ_DATA = [
  {
    question: "ViralAuthority almacena contenido de Instagram?",
    answer: "No. La plataforma no aloja ni almacena contenido de terceros.",
  },
  {
    question: "Puedo usarlo para organizar referencias visuales?",
    answer: "Si, siempre que sea para uso personal, educativo o con los permisos correspondientes.",
  },
  {
    question: "Necesito compartir mi contrasena?",
    answer: "No. No pedimos credenciales de Instagram para analizar enlaces publicos.",
  },
];

export default function InstagramDownloader() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "ViralAuthority PRO PREMIUM Instagram Media Tool" }} />
      <SEOPage
        platform="Instagram"
        title="Instagram Media Tool"
        subtitle="Organizacion visual, archivo digital responsable y referencia offline."
        faqData={FAQ_DATA}
        content={
          <PlatformEducationContent
            platform="Instagram"
            focus="Instagram contiene material visual de creadores; usa cualquier procesamiento como referencia privada o con autorizacion clara."
            examples={["Moodboards privados", "Referencias visuales", "Planificacion social"]}
          />
        }
      />
    </>
  );
}
