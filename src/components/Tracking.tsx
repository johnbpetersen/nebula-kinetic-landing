// src/components/Tracking.tsx
import { useEffect } from "react";

export const Tracking = () => {
  useEffect(() => {
    // Google Analytics 4
    const gaScript = document.createElement("script");
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    const gaInlineScript = document.createElement("script");
    gaInlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${import.meta.env.VITE_GA_ID}', {
        anonymize_ip: true,
        transport_type: 'beacon'
      });
    `;
    document.head.appendChild(gaInlineScript);

    // HubSpot Tracking
    const hsScript = document.createElement("script");
    hsScript.id = "hs-script-loader";
    hsScript.src = `https://js.hs-scripts.com/${import.meta.env.VITE_HUBSPOT_PORTAL_ID}.js`;
    hsScript.async = true;
    hsScript.defer = true;
    document.head.appendChild(hsScript);

    // Cleanup
    return () => {
      document.head.removeChild(gaScript);
      document.head.removeChild(gaInlineScript);
      document.head.removeChild(hsScript);
    };
  }, []);

  return null;
};