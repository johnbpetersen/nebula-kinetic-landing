// src/lib/waitlist-popup.ts
// Helper utilities to coordinate the waitlist HubSpot popup across the app.

const WAITLIST_POPUP_EVENT = "alluviance:waitlist:open";

export const openWaitlistPopup = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(WAITLIST_POPUP_EVENT));
};

export const subscribeToWaitlistPopup = (handler: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(WAITLIST_POPUP_EVENT, handler);
  return () => window.removeEventListener(WAITLIST_POPUP_EVENT, handler);
};
