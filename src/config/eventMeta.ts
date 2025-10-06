// src/config/eventMeta.ts

export const eventMeta = {
  // Set a date far in the future to ensure hasMasterclassPassed() is false
  // This makes sure components like the countdown timer *stay hidden*.
  rawDate: '2099-01-01T00:00:00-05:00', 

  // The new text that will be displayed across the site
  displayDate: 'Join the Waitlist',
  displayTime: 'for our next event!',
};

/**
 * This function will now consistently return `false` because the rawDate is in the future,
 * which is what we want for a permanent waitlist state.
 */
export const hasMasterclassPassed = (): boolean => {
  const eventDate = new Date(eventMeta.rawDate);
  const now = new Date();
  return eventDate.getTime() < now.getTime() + 60_000;
};