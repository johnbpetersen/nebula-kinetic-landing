// src/components/ui/hubspot-inline-form.tsx
// This version relies ONLY on the robust postMessage listener for success.

"use client";

import React, { useEffect, useRef } from "react";
import type { WindowWithHbspt } from "../../types/hubspot";

type Props = { formId: string; onSuccess: () => void };

export const HubSpotInlineForm: React.FC<Props> = ({ formId, onSuccess }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const latestOnSuccess = useRef(onSuccess);
  const submittedRef = useRef(false);

  // Keep the ref updated with the latest onSuccess function
  useEffect(() => {
    latestOnSuccess.current = onSuccess;
  }, [onSuccess]);

  // This is the main effect hook that runs once
  useEffect(() => {
    // This is the ONLY success signal we will listen for.
    const onMessage = (evt: MessageEvent) => {
      if (evt.data?.type !== "hsFormCallback" || evt.data?.eventName !== "onFormSubmitted") {
        return;
      }

      // Check if the message is for our specific form
      const formGuid = evt.data?.id;
      if (formGuid && formGuid === formId && !submittedRef.current) {
        submittedRef.current = true;
        console.log("[HubSpot] Received 'onFormSubmitted' postMessage. Firing onSuccess.", { formGuid });
        latestOnSuccess.current?.();
      }
    };

    window.addEventListener("message", onMessage);

    const mountForm = () => {
      const w = window as unknown as WindowWithHbspt;
      if (!w.hbspt?.forms || !containerRef.current) return;

      w.hbspt.forms.create({
        region: "na1",
        portalId: import.meta.env.VITE_HUBSPOT_PORTAL_ID || "46789902",
        formId,
        target: `#hs-form-inline-${formId}`,
        // We REMOVE the onFormSubmitted callback entirely to prevent conflicts.
        // We will rely exclusively on the postMessage listener.
      });
    };

    const w = window as unknown as WindowWithHbspt;
    if (!w.hbspt) {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.onload = mountForm;
      document.body.appendChild(script);
    } else {
      mountForm();
    }

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [formId]);

  return <div ref={containerRef} id={`hs-form-inline-${formId}`} />;
};