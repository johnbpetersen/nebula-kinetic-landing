import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Minimal TypeScript declaration for HubSpot
interface HubSpotForms {
  create: (config: {
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
    hbspt?: {
      forms: HubSpotForms;
    };
  }
}

interface HubSpotFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HubSpotFormPopup: React.FC<HubSpotFormPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Load HubSpot form script
  useEffect(() => {
    if (!isOpen) return;

    const loadForm = () => {
      if (!window.hbspt?.forms || !ref.current) return;

      window.hbspt.forms.create({
        region: "na1",
        portalId: "46789902",
        formId: "5590b20c-f797-4591-9031-29391c29f6ac",
        target: ".hs-form-popup", // CSS selector, not DOM element
        css: "", // Disable HubSpot default styles
        cssClass: "hs-form-popup", // Stable styling root
        onFormReady: () => {
          // Remove inline background styles
          const form = ref.current?.querySelector(".hs-form, .hbspt-form");
          if (form instanceof HTMLElement) {
            form.style.removeProperty("background-color");
            form.style.removeProperty("background");
          }
          // Soft fade-in
          ref.current?.classList.add("opacity-0");
          requestAnimationFrame(() =>
            ref.current?.classList.replace("opacity-0", "opacity-100")
          );
        },
      });
    };

    if (!window.hbspt) {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js"; // Correct URL
      script.async = true;
      script.onload = loadForm;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup
      };
    } else {
      loadForm();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-card relative max-w-lg w-full mx-6 p-8 rounded-3xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <h3 className="text-2xl md:text-3xl font-display font-bold text-center text-gradient mb-6">
              Reserve Your Free Seat
            </h3>

            {/* Close button */}
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

            {/* HubSpot form target */}
            <div
              ref={ref}
              className="hs-form-popup transition-opacity duration-300"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};