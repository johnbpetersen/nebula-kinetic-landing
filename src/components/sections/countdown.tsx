// src/components/sections/countdown.tsx
import React, { useState } from "react"; // Added useState
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "../ui/motion-section";
import { CountdownTimer } from "../ui/countdown-timer";
import { HubSpotFormPopup } from "../ui/hubspot-form-popup"; // Added import

// GradientGlow component
const GradientGlow = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-gradient-radial from-alluBlue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl opacity-30 z-0" />
);

interface CountdownProps {
  targetDate: Date;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false); // Added state for form

  return (
    <MotionSection className="relative bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 min-h-screen flex items-center">
      <GradientGlow /> {/* Only GradientGlow, no Starfield */}

      <div className="section-container text-center relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Secure Your Spot
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join us on June 25th at 6 PM CT for this transformative masterclass. Limited spots available.
        </motion.p>

        <motion.div
          className="mb-10 relative"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <CountdownTimer targetDate={targetDate} /> {/* Removed bg-neon-yellow/10 glow */}
        </motion.div>

        <motion.button
          className="relative overflow-hidden group px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-alluBlue-600 to-alluBlue-400 rounded-full text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsFormOpen(true)} // Added onClick to open form
        >
          <span className="relative z-10 flex items-center gap-2">
            Register Free Now{" "}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 w-full transform -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>
      </div>

      {/* HubSpot form popup */}
      <HubSpotFormPopup isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} /> {/* Added form popup */}
    </MotionSection>
  );
};