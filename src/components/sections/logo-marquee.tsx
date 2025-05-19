import React, { useState } from "react";

interface LogoMarqueeProps {
  logos: string[];
}

export const LogoMarquee = ({ logos }: LogoMarqueeProps) => {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat logos 4 times to ensure the strip is wide enough for seamless scrolling
  const repeatedLogos = logos.concat(logos).concat(logos).concat(logos);

  return (
    <div
      className={`w-full overflow-hidden bg-white/20 backdrop-blur-sm py-6 ${isPaused ? "pause-marquee" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-container">
        <div className="flex gap-12 items-center flex-nowrap animate-marquee">
          {repeatedLogos.map((logo, index) => (
            <img
              key={index}
              src={`/public/assets/images/${logo.split("/").pop()}`}
              alt={`Client Logo ${index + 1}`}
              className={`w-auto grayscale opacity-90 brightness-125 hover:grayscale-0 hover:opacity-100 hover:brightness-100 transition-all ${
                logo.includes("aws-logo") ? "h-10" : "h-8"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};