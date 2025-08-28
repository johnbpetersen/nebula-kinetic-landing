// src/components/ui/hubspot-form-popup.tsx
// Purpose: Reusable modal that embeds any HubSpot form (Step-2 enrichment or waitlist)

"use client";

import React, { useEffect, useRef } from "react";
import { hasMasterclassPassed } from "../../config/eventMeta";
import type { WindowWithHbspt } from "../../types/hubspot";

type Props = { isOpen: boolean; onClose: () => void; formId: string };

export const HubSpotFormPopup: React.FC<Props> = ({ isOpen, onClose, formId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formBuilt = useRef(false);
  const modalTitle = hasMasterclassPassed() ? "Join The Waitlist" : "Reserve Your Free Seat";

  useEffect(() => {
    if (!isOpen || formBuilt.current || !formId || !containerRef.current) return;

    const mount = () => {
      const w = window as unknown as WindowWithHbspt;
      if (!w.hbspt?.forms || !containerRef.current) {
        console.error("[Popup] HubSpot forms not available");
        return;
      }

      // clear previous render on reopen
      containerRef.current.innerHTML = "";

      try {
        w.hbspt.forms.create({
          region: "na1",
          portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
          formId,
          target: `#hs-form-popup-${formId}`,
          css: "",
          cssClass: "hs-form-popup",
          onFormReady: () => {
            // eslint-disable-next-line no-console
            console.log("[Popup] onFormReady", { formId });
          },
        });
        formBuilt.current = true;
      } catch (e) {
        console.error("[Popup] form creation failed:", e);
      }
    };

    const w = window as unknown as WindowWithHbspt;
    if (!w.hbspt) {
      const s = document.createElement("script");
      s.src = "https://js.hsforms.net/forms/embed/v2.js";
      s.async = true;
      s.onload = mount;
      document.body.appendChild(s);
    } else {
      mount();
    }
  }, [isOpen, formId]);

  // allow re-mount on next open
  useEffect(() => {
    if (!isOpen) formBuilt.current = false;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hs-form-popup-title"
    >
      <div
        className="glass-card relative max-w-lg w-full mx-6 p-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="hs-form-popup-title"
          className="text-2xl md:text-3xl font-display font-bold text-center text-gradient mb-6"
        >
          {modalTitle}
        </h3>

        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-neon-yellow focus:outline-none"
          aria-label="Close form"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          ref={containerRef}
          id={`hs-form-popup-${formId}`}
          className="hs-form-popup"
          aria-live="polite"
        />
      </div>
    </div>
  );
};