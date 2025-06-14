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

  useEffect(() => {
    const loadForm = () => {
      if (!window.hbspt?.forms || !formRef.current) return;

      window.hbspt.forms.create({
        region: "na1",
        portalId: "46789902",
        formId: "5590b20c-f797-4591-9031-29391c29f6ac",
        target: "#hubspot-form-wrapper",
        css: "",
        cssClass: "hs-form-standalone",
        onFormReady: () => {
          const form = formRef.current?.querySelector(".hs-form, .hbspt-form");
          if (form instanceof HTMLElement) {
            form.style.removeProperty("background-color");
            form.style.removeProperty("background");
          }
        },
      });
    };

    if (!window.hbspt) {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.onload = loadForm;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      loadForm();
    }
  }, []);

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

          <div ref={formRef} id="hubspot-form-wrapper" className="transition-opacity duration-300" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default RegisterPage;