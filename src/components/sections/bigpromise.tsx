// src/components/sections/big-promise.tsx
// Purpose: Renders the "Big Promise" hero section with animated headline, background, and prompt arrow
// Dependencies: React, framer-motion (motion, Variants), lucide-react (ChevronDown), MotionSection
// Last Updated: June 17, 2025

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MotionSection } from "../ui/motion-section";

/**
 * Animation variants for fade-and-up effect.
 * SUGGESTION: Consider centralizing common animations in src/lib/animations.ts
 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export const BigPromise: React.FC = () => (
  <MotionSection
    id="big-promise"
    className="relative overflow-hidden py-40 text-center"
  >
    {/* FLAG: Using dangerouslySetInnerHTML—consider moving these styles to a CSS module or Tailwind plugin to avoid XSS risks */}
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .bg-bigpromise {
            background-image: url('https://alluviance.s3.us-east-2.amazonaws.com/images/bigpromisebackground-mobile.webp');
          }
          @media (min-width: 768px) {
            .bg-bigpromise {
              background-image: url('https://alluviance.s3.us-east-2.amazonaws.com/images/bigpromisebackground-desktop.webp');
            }
          }
        `,
      }}
    />

    {/* Background image container */}
    <div className="absolute inset-0 bg-cover bg-center bg-bigpromise" />
    {/* Overlay for text legibility */}
    <div className="absolute inset-0 bg-alluBlue-900/70" />

    <div className="section-container relative z-10">
      {/* Animated headline */}
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

      {/* Animated accent bar */}
      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto mt-6 h-[4px] w-40 bg-gradient-to-r from-neon-yellow via-white to-neon-yellow animate-[pulse_3s_ease-in-out_infinite]"
      />

      {/* Animated sub-headline */}
      <motion.p
        variants={fadeUp}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-8 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto"
      >
        Discover the Inner Game levers top&nbsp;1 % reps pull to close faster,
        feel fulfilled, and leave burnout behind.
      </motion.p>

      {/* Animated prompt with chevron */}
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
          aria-hidden="true" // SUGGESTION: Add aria-hidden for decorative icon
        />
      </motion.div>
    </div>
  </MotionSection>
);