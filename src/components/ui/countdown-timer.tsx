import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FlippingState {
  days: boolean;
  hours: boolean;
  minutes: boolean;
  seconds: boolean;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [flipping, setFlipping] = useState<FlippingState>({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Initialize immediately

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Trigger flip animation
      if (timeLeft.seconds !== seconds) {
        setFlipping((prev) => ({ ...prev, seconds: true }));
        setTimeout(() => setFlipping((prev) => ({ ...prev, seconds: false })), 500);
      }

      if (timeLeft.minutes !== minutes) {
        setFlipping((prev) => ({ ...prev, minutes: true }));
        setTimeout(() => setFlipping((prev) => ({ ...prev, minutes: false })), 500);
      }

      if (timeLeft.hours !== hours) {
        setFlipping((prev) => ({ ...prev, hours: true }));
        setTimeout(() => setFlipping((prev) => ({ ...prev, hours: false })), 500);
      }

      if (timeLeft.days !== days) {
        setFlipping((prev) => ({ ...prev, days: true }));
        setTimeout(() => setFlipping((prev) => ({ ...prev, days: false })), 500);
      }

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeDigit = ({ value, label, flipping }: { value: number; label: string; flipping: boolean }) => {
    const formattedValue = value.toString().padStart(2, "0");

    return (
      <div className="flex flex-col items-center">
        <div className="relative h-20 w-16 md:w-20 perspective">
          <div
            className={`h-full w-full rounded-md bg-alluBlue-700 text-white flex justify-center items-center text-2xl md:text-3xl font-bold ${
              flipping ? "animate-flip" : ""
            }`}
          >
            {formattedValue}
          </div>
        </div>
        <span className="text-xs mt-2 opacity-70">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center gap-4">
      <TimeDigit value={timeLeft.days} label="DAYS" flipping={flipping.days} />
      <TimeDigit value={timeLeft.hours} label="HOURS" flipping={flipping.hours} />
      <TimeDigit value={timeLeft.minutes} label="MINUTES" flipping={flipping.minutes} />
      <TimeDigit value={timeLeft.seconds} label="SECONDS" flipping={flipping.seconds} />
    </div>
  );
};