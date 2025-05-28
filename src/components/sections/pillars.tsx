
import React from "react";
import { motion, Variants } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { SecretPillarCard } from "../ui/secret-pillar-card";
import { Lock, Eye, Crown } from "lucide-react";

/* The 3 Secrets of the Inner Game Framework */
const INNER_GAME_SECRETS = [
  {
    number: "01",
    title: "Self‑Connection",
    subtitle: "The Foundation Secret",
    description: "Discover the hidden psychological trigger that instantly eliminates imposter syndrome and unlocks unshakeable confidence from within.",
    secretReveal: "What top performers know that you don't...",
    icon: Eye,
    gradient: "from-purple-600 via-purple-500 to-pink-500",
    glowColor: "purple",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face"
  },
  {
    number: "02", 
    title: "Essence‑Led Leadership",
    subtitle: "The Influence Secret",
    description: "The counterintuitive approach that transforms you from pushy salesperson to trusted advisor—making prospects chase YOU.",
    secretReveal: "Why the best closers never actually 'sell'...",
    icon: Crown,
    gradient: "from-blue-600 via-blue-500 to-cyan-500",
    glowColor: "blue",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop&crop=face"
  },
  {
    number: "03",
    title: "Vision‑Driven Performance", 
    subtitle: "The Resilience Secret",
    description: "The neurological hack that rewires your brain to crave rejection and use every 'no' as fuel for unstoppable momentum.",
    secretReveal: "How rejection becomes your competitive advantage...",
    icon: Lock,
    gradient: "from-emerald-600 via-emerald-500 to-teal-500", 
    glowColor: "emerald",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop&crop=face"
  },
];

/* Staggered reveal animation */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

export const Pillars = () => (
  <MotionSection id="pillars" className="relative bg-gradient-to-br from-black via-alluBlue-900 to-alluBlue-800 py-32 overflow-hidden">
    {/* Dramatic background elements */}
    <div className="absolute inset-0">
      {/* Main ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-gradient-radial from-alluBlue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" />
      
      {/* Floating secret symbols */}
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
      
      {/* Mysterious grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\\"100\\\" height=\\\"100\\\" viewBox=\\\"0 0 100 100\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"%3E%3Cg fill=\\\"none\\\" stroke=\\\"%23FFE45E\\\" stroke-width=\\\"0.5\\\" stroke-opacity=\\\"0.1\\\"%3E%3Cpath d=\\\"M0 0h100v100H0z\\\"/%3E%3Cpath d=\\\"M0 50h100M50 0v100\\\"/%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
    </div>

    <div className="section-container relative z-10">
      {/* Header section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <motion.div
          variants={titleVariants}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-neon-yellow" />
            <span className="text-neon-yellow font-semibold tracking-wider uppercase text-sm">
              Classified Intelligence
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-neon-yellow" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-neon-yellow bg-clip-text text-transparent mb-4">
            The Inner Game Framework
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-neon-yellow font-semibold">Three classified secrets</span> that separate 
            the top 1% of sales professionals from everyone else
          </p>
        </motion.div>

        {/* Teaser line */}
        <motion.div
          variants={titleVariants}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-alluBlue-700/50 to-purple-700/50 backdrop-blur-sm border border-neon-yellow/20 rounded-full px-6 py-3">
            <Lock className="w-4 h-4 text-neon-yellow" />
            <span className="text-gray-200 text-sm">
              <span className="text-neon-yellow font-semibold">WARNING:</span> This intelligence changes everything
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* The Three Secrets */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {INNER_GAME_SECRETS.map((secret, index) => (
          <SecretPillarCard
            key={secret.title}
            secret={secret}
            index={index}
          />
        ))}
      </motion.div>

      {/* Bottom CTA section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-300 mb-6">
            These aren't just theories—they're the exact psychological frameworks 
            used by <span className="text-neon-yellow font-semibold">Fortune 500 sales leaders</span> to close million-dollar deals.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>3,247 sales professionals trained</span>
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
