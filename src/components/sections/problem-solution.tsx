import React from "react";
import { motion, Variants } from "framer-motion";
import { AlertTriangle, Sparkle } from "lucide-react";
import { MotionSection } from "../ui/motion-section";

const bullets = {
  pain: [
    "Relies on outdated pushy tactics buyers reject",
    "Ignores the psychological barriers to success",
    "Focuses on scripts over authentic connection",
    "Creates more anxiety and burnout",
    "Doesn't adapt to today’s informed buyers",
  ],
  promise: [
    "Master the psychology behind buying decisions",
    "Remove inner blocks to confident selling",
    "Develop genuine connection techniques",
    "Navigate objections minus the stress",
    "Close deals without feeling pushy",
  ],
};

const listItemVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -50 : 50,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export const ProblemSolution = () => {
  return (
    <MotionSection
      id="problem-solution"
      className="relative bg-alluBlue-900 py-24 overflow-hidden"
    >
      {/* Subtle Wave Shape */}
      <div
        className="absolute top-0 left-0 w-full h-40 bg-alluBlue-900/30"
        style={{
          clipPath: "ellipse(80% 60% at 50% 0%)",
          zIndex: 0,
        }}
      ></div>

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <motion.h2
          className="text-4xl md:text-5xl text-white font-bold text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Your Sales Approach
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Pain (Problem) Area */}
          <motion.div
            className="lg:w-2/5 space-y-6 p-6 rounded-3xl bg-white/5 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl text-white font-bold mb-6">
              Why Most Sales Training Fails
            </h3>
            <ul className="space-y-4">
              {bullets.pain.map((item, index) => (
                <motion.li
                  key={item}
                  className="flex gap-3 items-start"
                  variants={listItemVariants}
                  custom={index}
                >
                  <AlertTriangle size={20} className="text-red-500/70 mt-1 animate-pulse-slow" />
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Promise (Solution) Area */}
          <motion.div
            className="lg:w-3/5 space-y-6 mt-10 lg:mt-0 p-8 rounded-3xl bg-alluBlue-800/30 backdrop-blur-md border border-neon-yellow/40 shadow-xl shadow-neon-yellow/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, staggerChildren: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl text-white font-bold mb-6">
              The Inner Game Difference
            </h3>
            <ul className="space-y-4 mb-8">
              {bullets.promise.map((item, index) => (
                <motion.li
                  key={item}
                  className="flex gap-3 items-start"
                  variants={listItemVariants}
                  custom={index}
                >
                  <Sparkle size={20} className="text-neon-yellow mt-1 animate-pulse-slow" />
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
            <button className="btn-primary w-full hover:bg-neon-yellow hover:text-alluBlue-900 hover:shadow-neon-yellow/30 transition-all duration-300">
              Learn The Inner Game Approach
            </button>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
};