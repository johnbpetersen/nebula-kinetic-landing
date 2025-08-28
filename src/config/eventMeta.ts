// src/config/eventMeta.ts
export const eventMeta = {
    // ISO 8601 format for September 25, 2025, 2:00 PM CDT (UTC-5)
    rawDate: '2025-09-25T14:00:00-05:00',
    displayDate: 'September 25th, 2025',
    displayTime: '2:00 PM CT',
  };
  
  /**
   * Checks if the masterclass date has passed, with a 1-minute buffer.
   * @returns {boolean} - True if the event is in the past, false otherwise.
   */
  export const hasMasterclassPassed = (): boolean => {
    const eventDate = new Date(eventMeta.rawDate);
    const now = new Date();
    // Add 60-second buffer to avoid edge cases at the exact event time
    return eventDate.getTime() < now.getTime() + 60_000;
  };