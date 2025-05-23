// src/components/sections/big-promise.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { Brain, Handshake, Zap } from "lucide-react";
import { MotionSection } from "../ui/motion-section";

/* stagger helper */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export const BigPromise = () => (
  <MotionSection
    id="big-promise"
    className="relative overflow-hidden py-40 text-center"
  >
    {/* background image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('/public/assets/images/bigpromisebackground.jpg')",
      }}
    />
    {/* dark overlay for legibility */}
    <div className="absolute inset-0 bg-alluBlue-900/70" />

    <div className="section-container relative z-10">
      {/* headline */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
      >
        Lead with&nbsp;Unshakable Confidence, <br />
        <span className="text-gradient">Inspire Instant Trust,</span> <br />
        Reclaim Your Time
      </motion.h2>

      {/* animated accent bar */}
      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto mt-6 h-[4px] w-40 bg-gradient-to-r from-neon-yellow via-white to-neon-yellow animate-[pulse_3s_ease-in-out_infinite]"
      />

      {/* sub‑headline */}
      <motion.p
        variants={fadeUp}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-8 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto"
      >
        Discover the three Inner Game levers top 1 % reps pull to close faster,
        feel fulfilled, and leave burnout behind.
      </motion.p>

      {/* icon trio */}
      <motion.ul
        variants={fadeUp}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-14 flex flex-col sm:flex-row gap-10 justify-center items-center"
      >
        <li className="flex flex-col items-center gap-3">
          <Brain size={48} className="text-neon-yellow" />
          <span className="font-medium">Mindset Mastery</span>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Handshake size={48} className="text-neon-yellow" />
          <span className="font-medium">Authentic Presence</span>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Zap size={48} className="text-neon-yellow" />
          <span className="font-medium">Momentum Unlocked</span>
        </li>
      </motion.ul>
    </div>
  </MotionSection>
);