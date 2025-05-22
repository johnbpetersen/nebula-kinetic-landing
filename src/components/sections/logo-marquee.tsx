import React, { useState } from "react";
import { motion } from "framer-motion";

interface LogoMarqueeProps {
  logos: string[];
}

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({ logos }) => {
  const [pause, setPause] = useState(false);

  /* repeat logos twice for seamless loop */
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
            duration: 35,
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