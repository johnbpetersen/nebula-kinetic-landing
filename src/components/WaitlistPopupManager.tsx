// src/components/WaitlistPopupManager.tsx
// Listens for waitlist popup requests and renders the HubSpot modal on demand.

import React, { useEffect, useState } from "react";
import { HubSpotFormPopup } from "./ui/hubspot-form-popup";
import { subscribeToWaitlistPopup } from "../lib/waitlist-popup";
import { hasMasterclassPassed } from "../config/eventMeta";

const WAITLIST_FORM_ID =
  import.meta.env.VITE_HS_FORM_ID_WAITLIST || "fa5f7734-7719-4478-b4ab-264b460804a4";

export const WaitlistPopupManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isWaitlistActive = hasMasterclassPassed();

  useEffect(() => {
    if (!isWaitlistActive) {
      return;
    }

    const unsubscribe = subscribeToWaitlistPopup(() => setIsOpen(true));
    return unsubscribe;
  }, [isWaitlistActive]);

  if (!isWaitlistActive) {
    return null;
  }

  return (
    <HubSpotFormPopup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      formId={WAITLIST_FORM_ID}
    />
  );
};
