import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Sparkle } from "lucide-react";
import { MotionSection } from "../ui/motion-section";

export const ProblemSolution = () => {
  // Animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Animation for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { y: -10, transition: { duration: 0.3 }, boxShadow: "0 10px 20px rgba(255, 228, 94, 0.2)" },
  };

  return (
    <MotionSection className="relative bg-allu-radial-dark py-24 overflow-hidden">
      {/* Background Wave Shape */}
      <div
        className="absolute top-0 left-0 w-full h-40 bg-alluBlue-900/50"
        style={{
          clipPath: "ellipse(80% 60% at 50% 0%)",
          zIndex: 0,
        }}
      ></div>

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gradient mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Sales Approach
        </motion.h2>

        {/* Problem and Solution Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Problem Card */}
          <motion.div
            className="glass-card p-8 md:p-10 rounded-3xl mb-12 md:mb-0 md:mr-32 border border-red-500/20 hover:border-red-500/40"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Why Most Sales Training Fails
            </h3>
            <ul className="space-y-4">
              {[
                "Relies on outdated pushy tactics that modern buyers reject",
                "Ignores the psychological barriers preventing sales success",
                "Focuses on scripts instead of authentic connection",
                "Creates more anxiety and burnout for sales professionals",
                "Doesn't adapt to today's informed and skeptical buyers",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 items-start"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <AlertTriangle size={20} className="text-red-500 mt-1 animate-pulse-slow" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Card - Overlapping on the right */}
          <motion.div
            className="glass-card p-8 md:p-10 rounded-3xl md:absolute md:top-16 md:right-0 md:w-[60%] border border-neon-yellow/20 hover:border-neon-yellow/40"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              The Inner Game Difference
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                "Master the psychology behind buyer decisions",
                "Remove internal blocks to selling with confidence",
                "Develop genuine connection techniques that feel natural",
                "Learn to navigate objections without anxiety",
                "Close deals without feeling pushy or manipulative",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 items-start"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <Sparkle size={20} className="text-neon-yellow mt-1 animate-pulse-slow" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <button className="btn-primary w-full">Learn The Inner Game Approach</button>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
};