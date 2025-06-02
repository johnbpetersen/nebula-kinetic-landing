// src/components/ui/secret-pillar-card.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HubSpotFormPopup } from "./hubspot-form-popup"; // Added import

interface SecretData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  glowColor: string;
  image: string;
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
  const [isFormOpen, setIsFormOpen] = useState(false); // Added state for form

  return (
    <>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, amount: 0.3 }}
        className="relative group perspective-1000"
        onHoverStart={() => setIsRevealed(true)}
        onHoverEnd={() => setIsRevealed(false)}
      >
        {/* Main card */}
        <div className="relative h-full min-h-[500px] bg-gradient-to-br from-gray-900/90 via-alluBlue-900/80 to-black/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden group-hover:border-neon-yellow/30 transition-all duration-500">
          {/* Dynamic glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${secret.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
          />
          <div
            className={`absolute -inset-1 bg-gradient-to-br ${secret.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-3xl`}
          />

          {/* Secret number badge */}
          <div className="absolute top-6 left-6 z-20">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${secret.gradient} rounded-full flex items-center justify-center shadow-lg`}
            >
              <span className="text-white font-bold text-lg">{secret.number}</span>
            </div>
          </div>

          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src={secret.image}
              alt={secret.title}
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Subtitle (positioned below number badge) */}
            <div className="mt-16 mb-6">
              <p
                className={`text-sm font-semibold tracking-wider uppercase ${
                  isRevealed ? "text-white" : "text-gray-500"
                } transition-colors duration-300`}
              >
                {secret.subtitle}
              </p>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight group-hover:text-neon-yellow transition-colors duration-300">
              {secret.title}
            </h3>

            {/* Description (hidden by default, revealed on hover) */}
            <motion.p
              animate={{
                opacity: isRevealed ? 1 : 0,
                y: isRevealed ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 leading-relaxed text-base mt-4 mb-8 flex-grow"
            >
              {secret.description}
            </motion.p>

            {/* Unlock button */}
            <motion.div
              animate={{
                scale: isRevealed ? 1.05 : 1,
                opacity: isRevealed ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
              className="mt-auto"
            >
              <div
                className={`w-full py-3 px-6 bg-gradient-to-r ${secret.gradient} rounded-full text-white font-semibold text-center cursor-pointer hover:shadow-lg hover:shadow-${secret.glowColor}-500/25 transition-all duration-300`}
                onClick={() => setIsFormOpen(true)} // Added onClick to open form
              >
                {isRevealed ? "Unlock This Secret" : "Hover to Reveal"}
              </div>
            </motion.div>
          </div>

          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${secret.gradient} p-[1px]`}>
              <div className="w-full h-full rounded-3xl bg-transparent" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* HubSpot form popup */}
      <HubSpotFormPopup isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} /> {/* Added form popup */}
    </>
  );
};