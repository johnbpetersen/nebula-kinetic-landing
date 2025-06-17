// src/components/sections/logo-marquee.tsx
// Purpose: Renders a continuously scrolling marquee of partner logos with hover-to-pause and responsive speed.
// Dependencies: React, framer-motion (motion)
// Last Updated: June 17, 2025

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LogoMarqueeProps {
  logos: string[];
}

/**
 * LogoMarquee displays the provided logos in a seamless, looping animation.
 * - Hovering pauses the scroll.
 * - Speed adapts for mobile (≈13s) vs. desktop (≈30s).
 * SUGGESTION: Extract responsive duration logic into a `useMediaQuery` or `useResponsiveValue` hook.
 */
export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(30); // default desktop speed in seconds

  /* Responsive speed based on viewport width */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const updateDuration = (m: MediaQueryList | MediaQueryListEvent) =>
      setDuration(m.matches ? 13 : 30);
    updateDuration(mq);
    mq.addEventListener("change", updateDuration);
    return () => mq.removeEventListener("change", updateDuration);
    // FLAG: Direct matchMedia in render can cause SSR hydration mismatch; consider using a hook that updates on mount only.
  }, []);

  // Duplicate the logos array to allow seamless loop
  const strip = logos.concat(logos);

  return (
    <div
      className="w-full overflow-hidden bg-white/20 backdrop-blur-sm py-6"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      // SUGGESTION: For touch devices, consider pausing on focus/blur or on tap
    >
      <div className="section-container">
        <motion.div
          className="flex gap-12 items-center flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
            // FLAG: `pause` is not an official Framer Motion transition prop.
            // To pause animation, you may need to control it via `useAnimation` controls instead.
          }}
        >
          {strip.map((src, i) => (
            <motion.img
              key={src + "-" + i} // SUGGESTION: Use logo URL or a unique ID instead of index-only key
              src={src}
              alt={`Partner logo`} // SUGGESTION: Provide descriptive alt text or accept alt via props
              width={128}              /* explicit size prevents layout shift */
              height={32}
              loading="lazy"           /* defer offscreen images */
              className="h-8 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};