/* eslint-disable @typescript-eslint/consistent-type-imports */
// src/components/ui/hubspot-form-popup.tsx
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Use the same ID as the standalone register page
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
  const containerRef   = useRef<HTMLDivElement>(null);
  const scriptInjected = useRef(false);
  const formBuilt      = useRef(false);            // ensure ONE embed only

  /* ── embed once on first open ── */
  useEffect(() => {
    if (!isOpen || formBuilt.current) return;

    const mountForm = () => {
      if (!window.hbspt?.forms || !containerRef.current) return;

      window.hbspt.forms.create({
        region   : "na1",
        portalId : import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
        formId   : POPUP_FORM_ID, // Corrected to use the single form ID
        target   : ".hs-form-popup",
        css      : "",
        cssClass : "hs-form-popup",
        onFormReady: () => {
          /* strip HS inline bg & fade-in */
          containerRef.current?.querySelectorAll<HTMLElement>(".hs-form, .hbspt-form")
            .forEach(el => { el.style.background = "transparent"; });
          containerRef.current?.classList.remove("opacity-0");
        },
      });

      formBuilt.current = true;
    };

    /* inject HS script once */
    if (!window.hbspt && !scriptInjected.current) {
      const s = document.createElement("script");
      s.src   = "https://js.hsforms.net/forms/embed/v2.js";
      s.async = true;
      s.onload = () => { scriptInjected.current = true; mountForm(); };
      document.body.appendChild(s);
    } else {
      mountForm();
    }

  }, [isOpen]);

  /* ──────────  UI  ────────── */
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card relative max-w-lg w-full mx-6 p-8 rounded-3xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            exit={{    scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-center text-gradient mb-6">
              Reserve Your Free Seat
            </h3>

            <button
              className="absolute top-5 right-5 text-gray-400 hover:text-neon-yellow focus:outline-none"
              aria-label="Close form"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div
              ref={containerRef}
              className="hs-form-popup transition-opacity duration-300 opacity-0"
              aria-live="polite"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  );
};