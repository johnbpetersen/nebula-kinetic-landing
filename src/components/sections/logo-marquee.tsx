// src/components/logo-marquee.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LogoMarqueeProps {
  logos: string[];
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(30); // Default duration for desktop

  /* Set duration based on screen size */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)"); // Tailwind's 'sm' breakpoint
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setDuration(e.matches ? 13 : 30); // 13s for mobile, 30s for desktop
    };

    // Initial check
    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  /* Repeat logos twice for seamless loop */
  const strip = logos.concat(logos);

  return (
    <div
      className="w-full overflow-hidden bg-white/20 backdrop-blur-sm py-6"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <div className="section-container">
        <motion.div
          className="flex gap-12 items-center flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            pause,
          }}
        >
          {strip.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="Trusted company logo"
              className="h-8 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              whileInView={{ opacity: [0.3, 0.7] }}
              viewport={{ once: true, amount: 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};