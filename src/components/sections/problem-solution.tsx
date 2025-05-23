import React from "react";
import { motion, Variants } from "framer-motion";
import { AlertTriangle, Sparkle } from "lucide-react";
import { MotionSection } from "../ui/motion-section";

/* ── Copy pulled from webinar themes ─────────────────────────── */
const pairs = [
  {
    pain: "Scripts feel fake & prospects sense the performance",
    gain: "Self‑Connection makes authenticity your unfair advantage",
  },
  {
    pain: "Chasing every deal always leads to burnout",
    gain: "Focused pipeline fueled by clear inner intent",
  },
  {
    pain: "Objections spike anxiety and rambling",
    gain: "Grounded presence turns push‑back into partnership",
  },
  {
    pain: "One ‘no’ tanks confidence for days",
    gain: "Emotional resilience so rejection bounces off",
  },
  {
    pain: "Hitting quota still feels empty",
    gain: "Vision‑driven purpose pulls you beyond the number",
  },
];

/* motion helper */
const row: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export const ProblemSolution = () => (
  <MotionSection id="problem-solution" className="relative bg-alluBlue-800/70 py-32">
    {/* Neon spine */}
    <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-neon-yellow/0 via-neon-yellow to-neon-yellow/0 blur-sm" />

    <div className="section-container relative z-10">
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Transform Your Sales Approach
      </motion.h2>

      {/* Column labels */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] mb-10 text-center font-semibold uppercase tracking-wider text-gray-400">
        <span className="pr-4">Old Playbook</span>
        <span></span>
        <span className="pl-4">Inner Game Shift</span>
      </div>

      {/* Timeline rows */}
      <div className="flex flex-col gap-16">
        {pairs.map((rowText, i) => (
          <motion.div
            key={rowText.pain}
            custom={i}
            variants={row}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-start"
          >
            {/* Pain */}
            <div className="md:pr-8 text-right md:text-left">
              <div className="flex md:justify-end gap-3">
                <AlertTriangle size={20} className="text-red-500 mt-1" />
                <span className="opacity-80">{rowText.pain}</span>
              </div>
            </div>

            {/* Spine node */}
            <div className="relative flex justify-center">
              <div className="h-4 w-4 rounded-full bg-neon-yellow drop-shadow-[0_0_8px_rgba(255,228,94,0.8)]" />
            </div>

            {/* Gain */}
            <div className="md:pl-8">
              <div className="flex gap-3">
                <Sparkle size={20} className="text-neon-yellow mt-1" />
                <span className="font-semibold">{rowText.gain}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-24 flex justify-center"
      >
        <button className="btn-primary px-10 py-4 hover:bg-neon-yellow hover:text-alluBlue-900 transition-all">
          Experience the Inner Game
        </button>
      </motion.div>
    </div>
  </MotionSection>
);