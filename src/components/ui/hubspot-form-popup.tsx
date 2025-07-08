// src/components/ui/hubspot-form-popup.tsx
// Purpose: Provides a modal popup embedding a HubSpot form for user registration, handling script injection and lifecycle.
// Dependencies: React
// Last Updated: June 17, 2025

import React, { useEffect, useRef } from "react";

/* ────────────  CONFIG  ──────────── */
// SUGGESTION: Move config values to a dedicated `src/config/hubspot.ts` or use a central env loader
const POPUP_FORM_ID = "4694cabd-1060-4490-9f6b-e8a80efb3668";

/* ────────────  TYPES  ──────────── */
interface HubSpotForms {
  create: (cfg: {
    region: string;             // HubSpot region code
    portalId: string;           // Portal ID from env
    formId: string;             // Unique form identifier
    target: string;             // CSS selector for container element
    css?: string;               // Disable default HubSpot CSS
    cssClass?: string;          // Custom CSS class for styling
    onFormReady?: () => void;   // Callback when form is ready
    onFormSubmit?: () => void;  // Callback before submission
    onFormSubmitted?: () => void; // Callback after successful submission
    onFormFailed?: (error: any) => void; // Callback on failure
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

export const HubSpotFormPopup: React.FC<Props> = ({ isOpen, onClose }) => {
  // Container for HubSpot form
  const containerRef = useRef<HTMLDivElement>(null);
  // Track if script has been injected to avoid duplicates
  const scriptInjected = useRef(false);
  // Track if the form was built to prevent reinitialization
  const formBuilt = useRef(false);

  useEffect(() => {
    // Only mount when opened and not yet built
    if (!isOpen || formBuilt.current) return;

    // DEBUG: Remove before production
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
          region: "na1",  // SUGGESTION: Externalize region
          portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
          formId: POPUP_FORM_ID,
          target: "#hs-form-popup",  // Use ID selector for precise targeting
          css: "",                   // Disable default styles
          cssClass: "hs-form-popup",
          onFormReady: () => {
            console.log("[Popup] HubSpot form loaded successfully");
            // Remove inline backgrounds set by HubSpot
            containerRef.current?.querySelectorAll<HTMLElement>(
              ".hs-form, .hbspt-form"
            ).forEach((el) => {
              el.style.background = "transparent";
            });
          },
          onFormSubmit: () => console.log("[Popup] Form submitted"),
          onFormSubmitted: () => console.log("[Popup] Form submission completed"),
          onFormFailed: (error) => console.error("[Popup] HubSpot form failed:", error),
        });
        formBuilt.current = true;
      } catch (error) {
        console.error("[Popup] HubSpot form creation failed:", error);
      }
    };

    // Dynamically inject script if not loaded
    if (!window.hbspt && !scriptInjected.current) {
      console.log("[Popup] Injecting HubSpot script...");
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.onload = () => {
        console.log("[Popup] HubSpot script loaded");
        scriptInjected.current = true;
        mountForm();
      };
      script.onerror = () => console.error("[Popup] Failed to load HubSpot script");
      document.body.appendChild(script);
      
      // Note: We do not remove the script on unmount to preserve global API
    } else {
      console.log("[Popup] HubSpot script already loaded");
      scriptInjected.current = true;
      mountForm();
    }
  }, [isOpen]);

  // Reset formBuilt on close to allow remounting next open
  useEffect(() => {
    if (!isOpen) {
      formBuilt.current = false; // SUGGESTION: ensures form rebuild on reopen
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"                // Accessibility: dialog landmark
      aria-modal="true"
      aria-labelledby="hs-form-popup-title"
    >
      <div
        className="glass-card relative max-w-lg w-full mx-6 p-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        // SUGGESTION: Implement focus trap for modal
      >
        <h3
          id="hs-form-popup-title"
          className="text-2xl md:text-3xl font-display font-bold text-center text-gradient mb-6"
        >
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
          id="hs-form-popup"
          className="hs-form-popup"
          aria-live="polite"        // Announce dynamic content changes
        />
      </div>
    </div>
  );
};