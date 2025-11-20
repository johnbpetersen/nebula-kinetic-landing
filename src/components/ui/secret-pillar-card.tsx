// src/components/ui/secret-pillar-card.tsx
// Purpose: Displays an interactive pillar card for each "Inner Game" secret, revealing details and scrolling to the registration form.
// Dependencies: React, framer-motion
// Last Updated: August 28, 2025, 11:50 AM EDT

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { hasMasterclassPassed } from "../../config/eventMeta";
import { openWaitlistPopup } from "../../lib/waitlist-popup";

interface SecretData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  glowColor: string;
  imageDesktop: string;
  imageMobile: string;
}

interface SecretPillarCardProps {
  secret: SecretData;
  index: number;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: -15,
    scale: 0.9,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: index * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -12,
    scale: 1.02,
    rotateX: 5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const SecretPillarCard = ({ secret, index }: SecretPillarCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isEventPast = hasMasterclassPassed();

  // Detect mobile screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Handle card tap/click for mobile
  const handleCardInteraction = () => {
    if (isMobile && !isRevealed) {
      setIsRevealed(true);
    }
  };

  // Dynamic button text based on event status
  const buttonText = isRevealed
    ? isEventPast
      ? "Join The Waitlist"
      : "Register Now!"
    : isMobile
    ? "Tap to Reveal"
    : "Hover to Reveal";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={isMobile ? undefined : "hover"}
      viewport={{ once: true, amount: 0.3 }}
      className="relative group perspective-1000"
      onHoverStart={() => !isMobile && setIsRevealed(true)}
      onHoverEnd={() => !isMobile && setIsRevealed(false)}
      onClick={handleCardInteraction}
    >
      <div className="relative h-full min-h-[500px] bg-gradient-to-br from-gray-900/90 via-alluBlue-900/80 to-black/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden group-hover:border-neon-yellow/30 transition-all duration-500">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${secret.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
        />
        <div
          className={`absolute -inset-1 bg-gradient-to-br ${secret.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-3xl`}
        />
        <div className="absolute top-6 left-6 z-20">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${secret.gradient} rounded-full flex items-center justify-center shadow-lg`}
          >
            <span className="text-white font-bold text-lg">{secret.number}</span>
          </div>
        </div>
        <div className="absolute inset-0">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={secret.imageMobile}
              type="image/webp"
            />
            <source
              srcSet={secret.imageDesktop}
              type="image/webp"
            />
            <img
              src={secret.imageMobile}
              alt={`Sales Inner Game Masterclass - ${secret.title}`}
              className="w-full h-full object-cover opacity-30 group-hover:opacity-35 transition-opacity duration-500"
              loading="lazy"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/60" />
        </div>
        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="mt-16 mb-6">
            <p
              className={`text-sm font-semibold tracking-wider uppercase ${
                isRevealed ? "text-white" : "text-gray-500"
              } transition-colors duration-300`}
            >
              {secret.subtitle}
            </p>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight group-hover:text-neon-yellow transition-colors duration-300">
            {secret.title}
          </h3>
          <motion.p
            animate={{
              opacity: isRevealed ? 1 : 0,
              y: isRevealed ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 leading-relaxed text-base mt-4 mb-8 flex-grow z-20"
            style={{ pointerEvents: "none" }}
          >
            {secret.description}
          </motion.p>
          <motion.div
            animate={{
              scale: isRevealed ? 1.05 : 1,
              opacity: isRevealed ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
            className="mt-auto"
          >
            <div
              className={`w-full py-3 px-6 bg-gradient-to-r ${
                isRevealed
                  ? `from-${secret.glowColor}-800 to-${secret.glowColor}-600 border-white`
                  : `from-${secret.glowColor}-700 to-${secret.glowColor}-500 border-transparent`
              } rounded-full text-white font-semibold text-center cursor-pointer hover:shadow-lg hover:shadow-${secret.glowColor}-500/25 transition-all duration-300`}
              onClick={(e) => {
                e.stopPropagation();
                if (isEventPast) {
                  openWaitlistPopup();
                  return;
                }
                document.getElementById("final-cta-form")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              aria-label="Scroll to registration form"
            >
              {buttonText}
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${secret.gradient} p-[1px]`}>
            <div className="w-full h-full rounded-3xl bg-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
