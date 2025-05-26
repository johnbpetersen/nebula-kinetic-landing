// src/components/sections/big-promise.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
        backgroundImage:
          "url('https://alluviance.s3.us-east-2.amazonaws.com/images/bigpromisebackground.jpg')",
      }}
    />
    {/* legibility overlay */}
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
        Lead with Unshakable Confidence, <br />
        <span className="text-gradient">Inspire Instant Trust,</span> <br />
        Reclaim Your Time
      </motion.h2>

      {/* accent bar */}
      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto mt-6 h-[4px] w-40 bg-gradient-to-r from-neon-yellow via-white to-neon-yellow animate-[pulse_3s_ease-in-out_infinite]"
      />

      {/* sub-headline */}
      <motion.p
        variants={fadeUp}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-8 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto"
      >
        Discover the Inner Game levers top 1 % reps pull to close faster,
        feel fulfilled, and leave burnout behind.
      </motion.p>

      {/* prompt + chevron */}
      <motion.div
        variants={fadeUp}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-20 flex flex-col items-center gap-4"
      >
        <span className="text-xl md:text-2xl font-medium">
          Ready to see how it works?
        </span>
        <ChevronDown
          size={32}
          className="text-neon-yellow animate-bounce-slow"
        />
      </motion.div>
    </div>
  </MotionSection>
);