// src/config/eventMeta.ts

export const eventMeta = {
  // The new, official date and time for the upcoming masterclass.
  // This single source of truth will update the entire site.
  rawDate: '2025-11-18T14:00:00-06:00', 

  // The new human-readable text that will be displayed across the site.
  displayDate: 'Tuesday, November 18th',
  displayTime: '2:00 PM CT',
};

/**
 * This function now correctly compares the current time to the new event time.
 * It will return `false` before the event, and `true` after,
 * automatically controlling components like the countdown timer.
 */
export const hasMasterclassPassed = (): boolean => {
  const eventDate = new Date(eventMeta.rawDate);
  const now = new Date();
  // Adding a 60-second buffer to ensure the transition happens smoothly.
  return eventDate.getTime() < now.getTime() + 60_000;
};