// src/components/ui/hubspot-embed.tsx
// Purpose: Generic inline HubSpot form embed (used for hero, final CTA, etc.).
// Injects mild CSS into the iframe so it looks on-brand.
// Last Updated: August 28, 2025, 10:55 AM EDT

"use client";

import React, { useEffect, useRef } from "react";
import type { WindowWithHbspt } from "../../types/hubspot";

type Props = {
  formId: string;
  className?: string;
  sectionId: string; // Unique identifier for each section (e.g., "hero", "final-cta")
};

function buildIframeCss() {
  return `
    :root {
      --hs-field-input_bg_color: rgba(23, 37, 84, 0.5);
      --hs-field-input_text_color: #ffffff;
      --hs-field-input_border_color: rgba(255,255,255,0.2);
      --hs-button_bg_color: #FFE45E;
      --hs-button_text_color: #0b122d;
      --hs-form_bg_color: transparent;
      --hs-form_border_color: transparent;
    }
    .hsfc-Form, .hs-form { background: transparent !important; border:0 !important; padding:0 !important; box-shadow:none !important; }
    .hsfc-Row, .hs-form-field { margin-bottom: 0.75rem !important; }
    input[type="text"], input[type="email"], select {
      width:100% !important; background: var(--hs-field-input_bg_color) !important; color: var(--hs-field-input_text_color) !important;
      border:1px solid var(--hs-field-input_border_color) !important; border-radius: 0.5rem !important; padding: 0.75rem 1rem !important;
    }
    .hsfc-Submit button, input[type="submit"], .hs-button.primary {
      background: var(--hs-button_bg_color) !important; color: var(--hs-button_text_color) !important; font-weight:600 !important;
      border-radius:9999px !important; padding:0.75rem 1.25rem !important; width:100% !important;
    }`;
}

export const HubSpotEmbed: React.FC<Props> = ({ formId, className, sectionId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const injectCssIntoIframe = (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;
      const id = "alluviance-inline-overrides";
      if (doc.getElementById(id)) return;
      const style = doc.createElement("style");
      style.id = id;
      style.textContent = buildIframeCss();
      (doc.head || doc.body).appendChild(style);
    };

    const mount = () => {
      const w = window as unknown as WindowWithHbspt;
      if (!w.hbspt?.forms || !containerRef.current) {
        console.error("[HubSpotEmbed] Forms API or container not available");
        return;
      }
      console.log(`[HubSpotEmbed] Mounting form ${formId} in ${sectionId}`);
      containerRef.current.innerHTML = ""; // Clear previous content
      w.hbspt.forms.create({
        region: "na1",
        portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
        formId,
        target: `#hs-form-inline-${sectionId}-${formId}`, // Unique target per section
        onFormReady: () => {
          const iframe = containerRef.current!.querySelector("iframe") as HTMLIFrameElement | null;
          injectCssIntoIframe(iframe);
          console.log(`[HubSpotEmbed] Form ${formId} ready in ${sectionId}`);
        },
      });
    };

    if (!cancelled) {
      if (!window.hbspt) {
        console.log(`[HubSpotEmbed] Loading script for ${sectionId}`);
        const script = document.createElement("script");
        script.src = "https://js.hsforms.net/forms/embed/v2.js";
        script.async = true;
        script.onload = () => !cancelled && mount();
        document.body.appendChild(script);
      } else {
        mount();
      }
    }

    return () => {
      cancelled = true;
    };
  }, [formId, sectionId]);

  return (
    <div
      ref={containerRef}
      id={`hs-form-inline-${sectionId}-${formId}`}
      className={className}
    />
  );
};