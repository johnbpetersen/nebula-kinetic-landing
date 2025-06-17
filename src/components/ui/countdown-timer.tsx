// src/components/ui/countdown-timer.tsx
// Purpose: Renders a digital countdown clock until the target date, displaying days, hours, minutes, and seconds, and handles expiration state.
// Dependencies: React, useEffect, useState
// Last Updated: June 17, 2025

import React, { useEffect, useState } from "react";

interface Props {
  /** Target date/time for countdown */
  targetDate: Date;
}

export const CountdownTimer: React.FC<Props> = ({ targetDate }) => {
  // Initialize timer state via calculation helper
  const [t, setT] = useState(calc(targetDate));

  /*
   * Update time every second.
   * FLAG: setInterval may drift over time; consider recalculating the next tick delay to the start of the next second for greater accuracy.
   */
  useEffect(() => {
    const id = setInterval(() => setT(calc(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]); // Re-run if targetDate changes

  // When expired, show live message
  if (t.expired) {
    return (
      <p className="text-neon-yellow text-xl font-semibold">
        The webinar is live—jump in!
      </p>
    );
  }

  // Render digits for days, hours, minutes, seconds
  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {[
        { v: t.days,    label: "DAYS" },
        { v: t.hours,   label: "HOURS" },
        { v: t.minutes, label: "MINUTES" },
        { v: t.seconds, label: "SECONDS" },
      ].map(({ v, label }) => (
        <Digit key={label} value={v} label={label} />
      ))}
    </div>
  );
};

/**
 * Digit renders a single time unit block with leading zeros.
 * SUGGESTION: Extract to a shared UI component for reuse (e.g., CountdownDigit).
 */
const Digit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div
      className="h-14 w-12 sm:h-20 sm:w-16 rounded-lg bg-white/5 backdrop-blur
                     border border-neon-yellow/30 flex items-center justify-center
                     shadow-inner shadow-neon-yellow/10"
    >
      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
        {/* Pad single digits for alignment */}
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-xs opacity-70">{label}</span>
  </div>
);

/**
 * calc computes the time difference between now and target,
 * returning days, hours, minutes, seconds, and expiration flag.
 * SUGGESTION: Define and export a TypeScript type for the return value to ensure type safety.
 */
function calc(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days    = Math.floor(diff / 86_400_000);               // 1000*60*60*24
  const hours   = Math.floor((diff / 3_600_000) % 24);         // 1000*60*60
  const minutes = Math.floor((diff / 60_000) % 60);            // 1000*60
  const seconds = Math.floor((diff / 1_000) % 60);             // 1000

  return { days, hours, minutes, seconds, expired: false };
}