import React, { useEffect, useState } from "react";

interface Props {
  targetDate: Date;
}

export const CountdownTimer = ({ targetDate }: Props) => {
  const [t, setT] = useState(calc(targetDate));

  /* tick every 1 s – not every frame */
  useEffect(() => {
    const id = setInterval(() => setT(calc(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (t.expired)
    return (
      <p className="text-neon-yellow text-xl font-semibold">
        The webinar is live—jump in!
      </p>
    );

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {[
        { v: t.days, label: "DAYS" },
        { v: t.hours, label: "HOURS" },
        { v: t.minutes, label: "MINUTES" },
        { v: t.seconds, label: "SECONDS" },
      ].map(({ v, label }) => (
        <Digit key={label} value={v} label={label} />
      ))}
    </div>
  );
};

/* — helpers — */
const Digit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="h-14 w-12 sm:h-20 sm:w-16 rounded-lg bg-white/5 backdrop-blur border border-neon-yellow/30 flex items-center justify-center shadow-inner shadow-neon-yellow/10">
      <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-xs opacity-70">{label}</span>
  </div>
);

function calc(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1_000) % 60);
  return { days, hours, minutes, seconds, expired: false };
}