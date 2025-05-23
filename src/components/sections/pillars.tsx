import React from "react";
import { motion, Variants } from "framer-motion";
import { HeartPulse, Anchor, Zap } from "lucide-react"; // Import lucide-react icons
import { MotionSection } from "../ui/motion-section";
import { PillarCard } from "../ui/pillar-card";

/* data */
const PILLARS = [
  {
    title: "Self‑Connection",
    copy: "Unlock authentic confidence by tuning into your inner signals.",
    icon: HeartPulse, // lucide-react component
  },
  {
    title: "Essence‑Led Leadership",
    copy: "Guide conversations with grounded presence—stop pitching, start partnering.",
    icon: Anchor, // lucide-react component
  },
  {
    title: "Vision‑Driven Performance",
    copy: "Anchor to a compelling why so rejection fuels you, not drains you.",
    icon: Zap, // lucide-react component
  },
];

/* card animation */
const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export const Pillars = () => (
  <MotionSection id="pillars" className="relative bg-alluBlue-900 py-32">
    {/* background glow */}
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <div className="w-[90vw] h-[90vw] bg-alluBlue-600/15 rounded-full blur-[220px]" />
    </div>

    <div className="section-container relative z-10">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center mb-20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        The Inner Game Framework
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            variants={card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <PillarCard
              icon={<p.icon size={48} className="text-neon-yellow" aria-hidden="true" />}
              title={p.title}
              description={p.copy}
              index={i}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </MotionSection>
);