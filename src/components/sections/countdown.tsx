// src/components/sections/countdown.tsx
// Purpose: Renders the countdown section with timer and registration button/modal for the Inner Game Masterclass.
// Dependencies: React, framer-motion (motion), lucide-react (ArrowRight), MotionSection, CountdownTimer, HubSpotFormPopup
// Masterclass Date/Time: July 9, 2025 @ 3:00 PM CT (UTC-5)
// Last Updated: June 17, 2025

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "../ui/motion-section";
import { CountdownTimer } from "../ui/countdown-timer";
import { HubSpotFormPopup } from "../ui/hubspot-form-popup";

/**
 * GradientGlow renders a subtle radial gradient background glow.
 * SUGGESTION: Move to src/components/ui/GradientGlow.tsx for reuse and easier styling.
 */
const GradientGlow: React.FC = () => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px]
               bg-gradient-radial from-alluBlue-600/20 via-purple-600/10 to-transparent
               rounded-full blur-3xl opacity-30 z-0"
  />
);

// Centralized masterclass target date (3:00 PM CT)
const MASTERCLASS_DATE_CT = new Date("2025-07-09T15:00:00-05:00");

interface CountdownProps {
  /** Target date/time for the countdown (defaults to masterclass 3 PM CT) */
  targetDate?: Date;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate = MASTERCLASS_DATE_CT,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Open registration modal if URL contains #register or ?register=true
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    if (hash === "#register" || params.get("register") === "true") {
      setIsFormOpen(true);
      const section = document.getElementById("countdown-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <MotionSection
      id="countdown-section"
      className="relative bg-gradient-to-b from-alluBlue-800 to-alluBlue-900
                 min-h-screen flex items-center"
    >
      {/* Decorative glow behind content */}
      <GradientGlow />

      <div className="section-container text-center relative z-10">
        {/* Section headline */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Secure Your Spot
        </motion.h2>

        {/* Subheadline with date/time */}
        <motion.p
          className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join us on July 9th at 3 PM CT for this transformative masterclass.
          Limited spots available.
        </motion.p>

        {/* Countdown timer with gentle scaling animation */}
        <motion.div
          className="mb-10 relative"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <CountdownTimer targetDate={targetDate} />
        </motion.div>

        {/* Registration button */}
        <motion.button
          className="relative overflow-hidden group px-6 py-3 md:px-8 md:py-4
                     text-base md:text-lg font-semibold
                     bg-gradient-to-r from-alluBlue-600 to-alluBlue-400
                     rounded-full text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsFormOpen(true)}
          aria-label="Register for the free masterclass"
        >
          <span className="relative z-10 flex items-center gap-2">
          Join Wait List
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </span>
          {/* Animated highlight on hover */}
          <span
            className="absolute inset-0 w-full transform -translate-x-full
                       bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0
                       group-hover:translate-x-full transition-transform duration-1000"
            aria-hidden="true"
          />
        </motion.button>
      </div>

      {/* HubSpot signup form modal */}
      <HubSpotFormPopup
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </MotionSection>
  );
};