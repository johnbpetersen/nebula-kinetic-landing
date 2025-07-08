// src/pages/Register.tsx
import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { StickyNav } from "../components/ui/sticky-nav";
import { FinalCTA } from "../components/sections/final-cta";
import { Footer } from "../components/sections/footer";

const REGISTER_FORM_ID = "4694cabd-1060-4490-9f6b-e8a80efb3668"; // original form

/* …types unchanged… */

const RegisterPage = () => {
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    const mountForm = () => {
      if (!window.hbspt?.forms || !wrapperRef.current) return;

      window.hbspt.forms.create({
        region   : "na1",
        portalId : import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
        formId   : REGISTER_FORM_ID,
        target   : "#hubspot-form-wrapper",
        css      : "",
        cssClass : "hs-form-standalone",
        onFormReady: () => {
          wrapperRef.current?.querySelectorAll<HTMLElement>(".hs-form, .hbspt-form")
            .forEach(el => { el.style.background = "transparent"; });
        },
      });
    };

    if (!window.hbspt && !scriptInjected.current) {
      const s = document.createElement("script");
      s.src   = "https://js.hsforms.net/forms/embed/v2.js";
      s.async = true;
      s.onload = () => { scriptInjected.current = true; mountForm(); };
      document.body.appendChild(s);
    } else {
      mountForm();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Register for the Inner Game Masterclass | Alluviance</title>
        <meta name="description"
              content="Secure your spot in the Inner Game Masterclass. Learn how top reps consistently outperform without burning out." />
      </Helmet>

      <StickyNav />

      <main className="min-h-screen bg-alluBlue-900 py-24 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full glass-card p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-gradient mb-6">
            Reserve Your Free Seat
          </h1>

          <div ref={wrapperRef} id="hubspot-form-wrapper" />
        </div>
      </main>

      <FinalCTA />
      <Footer />
    </>
  );
};

export default RegisterPage;