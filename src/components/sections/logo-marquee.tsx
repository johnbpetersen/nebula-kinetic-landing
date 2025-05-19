import React, { useState } from "react";

interface LogoMarqueeProps {
  logos: string[];
}

export const LogoMarquee = ({ logos }: LogoMarqueeProps) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="w-full overflow-hidden bg-white/5 backdrop-blur-sm py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center section-container">
        <div className={`flex gap-12 items-center ${isPaused ? "" : "animate-marquee"}`}>
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={`/public/assets/images/${logo.split("/").pop()}`}
              alt="Client Logo"
              className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};