// src/pages/Register.tsx
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { StickyNav } from "../components/ui/sticky-nav"; // Assuming path is correct
import { Footer } from "../components/sections/footer";   // Assuming path is correct

// Minimal TypeScript declaration for HubSpot
interface HubSpotForms {
  create: (config: {
    region: string;
    portalId: string;
    formId: string;
    target: string; // CSS selector for the target div
    css?: string;
    cssClass?: string;
    onFormReady?: () => void;
    // Add other options as needed, e.g., onFormSubmit, onFormSubmitted
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
  const HUBSPOT_SCRIPT_ID = 'hubspot-form-script-v2';
  const FORM_CONTAINER_ID = 'hubspot-form-wrapper'; // Must match the div's ID

  useEffect(() => {
    const loadAndCreateForm = () => {
      if (window.hbspt && window.hbspt.forms) {
        // Ensure the target div exists and is empty before creating the form
        // This prevents duplicate forms on fast re-renders or HMR
        if (formRef.current && !formRef.current.hasChildNodes()) {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "46789902", // Your Portal ID
            formId: "5590b20c-f797-4591-9031-29391c29f6ac", // Your Form ID
            target: `#${FORM_CONTAINER_ID}`,
            css: "", // Optional: Add custom CSS for the form
            cssClass: "hs-form-standalone", // Optional: Add a class for styling
            onFormReady: () => {
              // Optional: Callback when the form is ready
              const formElement = formRef.current?.querySelector(".hs-form, .hbspt-form");
              if (formElement instanceof HTMLElement) {
                // Example: Remove default HubSpot styling if needed
                formElement.style.removeProperty("background-color");
                formElement.style.removeProperty("background");
              }
            },
          });
        }
      } else {
        // HubSpot script might be loaded but forms object not yet ready,
        // or script not loaded at all. The script's onload will recall this.
      }
    };

    // Check if the HubSpot forms V2 script is already on the page
    if (document.getElementById(HUBSPOT_SCRIPT_ID)) {
      // Script tag exists, hbspt.forms might be ready or script is still loading
      loadAndCreateForm();
    } else {
      // Script tag doesn't exist, create and append it
      const script = document.createElement("script");
      script.id = HUBSPOT_SCRIPT_ID;
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.defer = true; // Ensures script executes after HTML is parsed

      script.onload = () => {
        loadAndCreateForm(); // Call after script is loaded
      };
      script.onerror = () => {
        console.error("HubSpot form script (embed/v2.js) failed to load.");
      };
      document.body.appendChild(script);
    }

    // Cleanup function for useEffect is not strictly necessary for the script tag,
    // as it's typically loaded once. If form needs cleanup, do it here.
    // The SCRIPT_ID check prevents adding multiple script tags.
    // The formRef.current.hasChildNodes() check prevents re-injecting the form.

  }, []); // Empty dependency array: runs once on mount and cleanup on unmount.

  return (
    <>
      <Helmet>
        <title>Register for the Inner Game Masterclass | Alluviance</title>
        <meta
          name="description"
          content="Secure your spot in the Inner Game Masterclass. Learn how top reps consistently outperform without burning out."
        />
        {/* Add any other specific meta tags for this page */}
      </Helmet>

      <StickyNav />

      <main className="min-h-screen bg-alluBlue-900 py-24 px-4 flex items-center justify-center">
        {/* Ensure 'glass-card' and 'text-gradient' styles are globally available (see Step 4) */}
        <div className="max-w-2xl w-full glass-card p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-gradient mb-6">
            Reserve Your Free Seat
          </h1>

          {/* This is where the HubSpot form will be injected */}
          <div ref={formRef} id={FORM_CONTAINER_ID} className="transition-opacity duration-300" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegisterPage;