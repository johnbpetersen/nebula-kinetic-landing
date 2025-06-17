import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LogoMarqueeProps {
  logos: string[];
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(30); // desktop

  /* mobile ≈ 13 s, desktop ≈ 30 s */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const setDur = (m: MediaQueryList | MediaQueryListEvent) =>
      setDuration(m.matches ? 13 : 30);
    setDur(mq);
    mq.addEventListener("change", setDur);
    return () => mq.removeEventListener("change", setDur);
  }, []);

  /* repeat list to create seamless strip */
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
          transition={{ duration, ease: "linear", repeat: Infinity, pause }}
        >
          {strip.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt="Trusted company logo"
              width={128}              /*   ← explicit size stops CLS   */
              height={32}
              loading="lazy"           /*   ← keeps them off critical path */
              className="h-8 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};