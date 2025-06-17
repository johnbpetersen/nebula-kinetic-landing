/* eslint-disable @typescript-eslint/consistent-type-imports */
// src/components/ui/hubspot-form-popup.tsx
import React, { useEffect, useRef } from "react";

/* ────────────  CONFIG  ──────────── */
const POPUP_FORM_ID = "5590b20c-f797-4591-9031-29391c29f6ac";

/* ────────────  TYPES  ──────────── */
interface HubSpotForms {
  create: (cfg: {
    region: string;
    portalId: string;
    formId: string;
    target: string;
    css?: string;
    cssClass?: string;
    onFormReady?: () => void;
    onFormSubmit?: () => void;
    onFormSubmitted?: () => void;
    onFormFailed?: (error: any) => void;
  }) => void;
}
declare global {
  interface Window {
    hbspt?: { forms: HubSpotForms };
  }
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/* ══════════════════════════════════ */
export const HubSpotFormPopup: React.FC<Props> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptInjected = useRef(false);
  const formBuilt = useRef(false);

  useEffect(() => {
    if (!isOpen || formBuilt.current) return;

    console.log("[Popup] VITE_HUBSPOT_PORTAL_ID:", import.meta.env.VITE_HUBSPOT_PORTAL_ID);
    console.log("[Popup] Form ID:", POPUP_FORM_ID);
    console.log("[Popup] isOpen:", isOpen);

    const mountForm = () => {
      if (!window.hbspt?.forms || !containerRef.current) {
        console.error("[Popup] HubSpot forms not available or container missing");
        return;
      }

      console.log("[Popup] Calling hbspt.forms.create()");
      try {
        window.hbspt.forms.create({
          region: "na1",
          portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
          formId: POPUP_FORM_ID,
          target: "#hs-form-popup", // Changed to ID selector
          css: "",
          cssClass: "hs-form-popup",
          onFormReady: () => {
            console.log("[Popup] HubSpot form loaded successfully");
            containerRef.current?.querySelectorAll<HTMLElement>(".hs-form, .hbspt-form").forEach((el) => {
              el.style.background = "transparent";
            });
          },
          onFormSubmit: () => console.log("[Popup] Form submitted"),
          onFormSubmitted: () => console.log("[Popup] Form submission completed"),
          onFormFailed: (error: any) => console.error("[Popup] HubSpot form failed:", error),
        });
        formBuilt.current = true;
      } catch (error) {
        console.error("[Popup] HubSpot form creation failed:", error);
      }
    };

    if (!window.hbspt && !scriptInjected.current) {
      console.log("[Popup] Injecting HubSpot script...");
      const s = document.createElement("script");
      s.src = "https://js.hsforms.net/forms/embed/v2.js";
      s.async = true;
      s.onload = () => {
        console.log("[Popup] HubSpot script loaded");
        scriptInjected.current = true;
        mountForm();
      };
      s.onerror = () => console.error("[Popup] Failed to load HubSpot script");
      document.body.appendChild(s);
    } else {
      console.log("[Popup] HubSpot script already loaded");
      scriptInjected.current = true;
      mountForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-card relative max-w-lg w-full mx-6 p-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl md:text-3xl font-display font-bold text-center text-gradient mb-6">
          Reserve Your Free Seat
        </h3>
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-neon-yellow focus:outline-none"
          aria-label="Close form"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div
          ref={containerRef}
          id="hs-form-popup" // Added ID
          className="hs-form-popup"
          aria-live="polite"
        />
      </div>
    </div>
  );
};