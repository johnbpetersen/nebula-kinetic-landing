// src/pages/Register.tsx
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { StickyNav } from "../components/ui/sticky-nav";
import { Footer } from "../components/sections/footer";

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
    // Add other relevant callbacks if needed, e.g., onFormSubmitted
  }) => void;
}

declare global {
  interface Window {
    hbspt?: {
      forms: HubSpotForms;
    };
  }
}

const RegisterPage = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const FORM_CONTAINER_ID = 'hubspot-form-wrapper'; // Must match the div's ID

  useEffect(() => {
    let isMounted = true;
    let pollInterval: NodeJS.Timeout | undefined;
    const MAX_POLL_ATTEMPTS = 25; // Poll for 5 seconds (25 * 200ms)
    let pollAttempts = 0;

    const tryCreateForm = () => {
      if (!isMounted) {
        if (pollInterval) clearInterval(pollInterval);
        return;
      }

      console.log(`[HS Debug] Attempt: ${pollAttempts + 1}. Checking for hbspt.forms...`);

      if (window.hbspt && window.hbspt.forms) {
        console.log("[HS Debug] hbspt.forms found!");
        if (pollInterval) clearInterval(pollInterval);

        if (formRef.current && !formRef.current.hasChildNodes()) {
          console.log("[HS Debug] Target div found and empty. Creating form...");
          try {
            window.hbspt.forms.create({
              region: "na1",
              portalId: "46789902", // Your Portal ID
              formId: "5590b20c-f797-4591-9031-29391c29f6ac", // Your Form ID
              target: `#${FORM_CONTAINER_ID}`,
              css: "",
              cssClass: "hs-form-standalone",
              onFormReady: () => {
                if (!isMounted) return;
                console.log("[HS Debug] HubSpot form is READY!");
                const formElement = formRef.current?.querySelector(".hs-form, .hbspt-form");
                if (formElement instanceof HTMLElement) {
                  formElement.style.removeProperty("background-color");
                  formElement.style.removeProperty("background");
                }
              },
            });
            console.log("[HS Debug] window.hbspt.forms.create() called.");
          } catch (error) {
            console.error("[HS Debug] Error calling window.hbspt.forms.create():", error);
          }
        } else if (formRef.current && formRef.current.hasChildNodes()) {
          console.log("[HS Debug] Target div found, but already has children. Form not created.");
        } else if (!formRef.current) {
          console.log("[HS Debug] Target div (formRef.current) not found. Form not created.");
        }
      } else {
        pollAttempts++;
        if (pollAttempts >= MAX_POLL_ATTEMPTS) {
          console.error("[HS Debug] Max polling attempts reached. hbspt.forms not available.");
          if (pollInterval) clearInterval(pollInterval);
        } else {
          // console.log("[HS Debug] hbspt.forms not yet available. Will poll again.");
        }
      }
    };

    // Start polling, assuming the script from index.html will make hbspt.forms available.
    // Initial check:
    tryCreateForm();

    // If not immediately available, set up the polling interval.
    if (!(window.hbspt && window.hbspt.forms) && pollAttempts < MAX_POLL_ATTEMPTS) {
        console.log("[HS Debug] Setting up poll interval for hbspt.forms.");
        pollInterval = setInterval(tryCreateForm, 200); // Poll every 200ms
    }

    return () => {
      isMounted = false;
      if (pollInterval) {
        console.log("[HS Debug] Cleaning up poll interval on unmount.");
        clearInterval(pollInterval);
      }
    };
  }, []); // Empty dependency array: runs once on mount.

  return (
    <>
      <Helmet>
        <title>Register for the Inner Game Masterclass | Alluviance</title>
        <meta
          name="description"
          content="Secure your spot in the Inner Game Masterclass. Learn how top reps consistently outperform without burning out."
        />
      </Helmet>

      <StickyNav />

      <main className="min-h-screen bg-alluBlue-900 py-24 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full glass-card p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-gradient mb-6">
            Reserve Your Free Seat
          </h1>
          <div ref={formRef} id={FORM_CONTAINER_ID} className="transition-opacity duration-300" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegisterPage;