/**
 * ViralAuthority PRO PREMIUM Analytics Utility
 * Dynamically injects Google Analytics 4 (GA4) scripts only after user consent.
 */

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Updated via env or placeholder

export const initGA = () => {
  if (typeof window === "undefined") return;

  // Prevent duplicate injection
  if (document.getElementById("google-analytics")) return;

  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script1.id = "google-analytics";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.id = "google-analytics-config";
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);

  console.log("🛡️ ViralAuthority PRO PREMIUM: Analytics initialized via user consent.");
};
