import React from "react";
import { motion, Variants } from "framer-motion";
import { AlertTriangle, Sparkles, Target, Shield, Heart } from "lucide-react";
import { MotionSection } from "../ui/motion-section";

/* pain & gain data */
const pairs = [
  {
    pain: "Scripts feel fake & prospects sense the performance",
    gain: "Self-Connection makes authenticity your unfair advantage",
    gainSubtext: "Sell with confidence, not scripts.",
    icon: Sparkles,
  },
  {
    pain: "Chasing every deal always leads to burnout",
    gain: "Focused pipeline fueled by clear inner intent",
    gainSubtext: "Work smarter, not harder.",
    icon: Target,
  },
  {
    pain: "Objections spike anxiety and rambling",
    gain: "Grounded presence turns push-back into partnership",
    gainSubtext: "Stay calm, win trust.",
    icon: Shield,
  },
  {
    pain: "One ‘no’ tanks confidence for days",
    gain: "Emotional resilience so rejection bounces off",
    gainSubtext: "Bounce back, close more.",
    icon: Heart,
  },
  // Dropped 5th pair ("Hitting quota still feels empty") to fit 2x2 grid
];

/* motion variants */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const gainCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0 0 15px rgba(255, 228, 94, 0.5)",
    transition: { duration: 0.3 },
  },
};

export const ProblemSolution = () => (
  <MotionSection
    id="problem-solution"
    className="relative bg-alluBlue-800/70 py-32"
  >
    {/* neon spine */}
    <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-neon-yellow/0 via-neon-yellow to-neon-yellow/0 blur-sm" />

    <div className="section-container relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Transform Your Sales Approach
      </motion.h2>

      {/* Tired, Old Playbook Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
        className="max-w-2xl mx-auto mb-20"
      >
        <div className="glass-card bg-alluBlue-900/50 border border-gray-700/50 rounded-xl p-8 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-red-500" />
            <h3 className="text-2xl font-bold text-gray-300">The Tired, Old Playbook</h3>
          </div>
          <ul className="space-y-3 text-gray-400 text-lg">
            {pairs.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-500">•</span>
                <span>{item.pain}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 mt-6 italic">Sound familiar? You’re not alone.</p>
        </div>
      </motion.div>

      {/* Inner Game Shift Subheading */}
      <motion.h3
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-neon-yellow drop-shadow-[0_0_8px_rgba(255,228,94,0.5)]"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        The Inner Game Shift
      </motion.h3>

      {/* 2x2 Grid of Inner Game Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
        {pairs.map((item, i) => (
          <motion.div
            key={item.gain}
            variants={gainCardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            custom={i + 1}
            className="glass-card bg-alluBlue-600/30 border border-neon-yellow/30 rounded-xl p-6 backdrop-blur-md text-center"
          >
            <item.icon size={28} className="text-neon-yellow mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">{item.gain}</h4>
            <p className="text-gray-300 text-sm">{item.gainSubtext}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center"
      >
        <button className="btn-primary px-10 py-4 hover:bg-neon-yellow hover:text-alluBlue-900 transition-all hover:drop-shadow-[0_0_8px_rgba(255,228,94,0.8)]">
          Experience the Inner Game
        </button>
      </motion.div>
    </div>
  </MotionSection>
);