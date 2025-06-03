// src/components/sections/pillars.tsx
import React from "react";
import { motion, Variants } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { SecretPillarCard } from "../ui/secret-pillar-card";
import { Lock } from "lucide-react";

const INNER_GAME_SECRETS = [
  {
    number: "01",
    title: "Self‑Connection",
    subtitle: "The Foundation Secret",
    description: "You’ll learn how top performers stop faking confidence and start showing up fully grounded in who they are. And when you have feelings like fear, imposter, or anxiety come up - how do you actually USE them in a positive way to help you build real connection, real trust, and real influence.",
    gradient: "from-alluBlue-700 via-alluBlue-600 to-alluBlue-500",
    glowColor: "alluBlue",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/self-connection-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/self-connection-mobile.webp",
  },
  {
    number: "02",
    title: "Essence‑Led Leadership",
    subtitle: "The Influence Secret",
    description: "You’ll discover why the best reps don’t push products. They guide decisions. And I’ll show you the inner mindset shift that flips you from “salesperson” to “trusted advisor” in one conversation.",
    gradient: "from-alluBlue-700 via-alluBlue-600 to-alluBlue-500",
    glowColor: "alluBlue",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/essence-led-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/essence-led-mobile.webp",
  },
  {
    number: "03",
    title: "Vision‑Driven Performance",
    subtitle: "The Resilience Secret",
    description: "You’ll learn how to connect your day-to-day grind to a deeper purpose and how that single shift makes rejection bounce off and attracts aligned, ready-to-buy clients like a magnet.",
    gradient: "from-alluBlue-700 via-alluBlue-600 to-alluBlue-500",
    glowColor: "alluBlue",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/vision-driven-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/vision-driven-mobile.webp",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export const Pillars = () => {
  return (
    <MotionSection
      id="pillars"
      className="relative bg-gradient-to-br from-black via-alluBlue-900 to-alluBlue-800 py-32 overflow-hidden"
    >
      {/* Dramatic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-gradient-radial from-alluBlue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-neon-yellow/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFE45E' stroke-width='0.5' stroke-opacity='0.3'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={titleVariants} className="mb-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-neon-yellow" />
              <span className="text-neon-yellow font-semibold tracking-wider uppercase text-sm">
                Classified Alluviance Intelligence
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-neon-yellow" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-neon-yellow bg-clip-text text-transparent mb-4">
              The Inner Game Framework
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <span className="text-neon-yellow font-semibold">Three secrets</span> that separate
              the top 1% of sales professionals from everyone else
            </p>
          </motion.div>
          <motion.div variants={titleVariants} className="mt-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-alluBlue-700/60 to-purple via-purple-500/60 backdrop-blur-sm border border-gray-600/30 rounded-full px-6 py-2">
              <Lock className="w-4 h-4 text-neon-yellow" />
              <span className="text-gray-200 text-sm">
                <span className="text-neon-yellow font-semibold">WARNING:</span> This intelligence changes everything
              </span>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {INNER_GAME_SECRETS.map((secret, index) => (
            <SecretPillarCard key={secret.title} secret={secret} index={index} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 mb-6">
              These aren't just theories. They're the exact psychological frameworks we teach
              to <span className="text-neon-yellow font-semibold">Fortune 500 sales leaders</span> to close million-dollar deals.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>347 sales professionals trained</span>
              </div>
              <div className="w-0.5 h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>127% average performance increase</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
};