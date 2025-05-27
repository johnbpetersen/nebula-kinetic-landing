
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Shield, Zap, Target, Crown, Flame, CheckCircle } from "lucide-react";

/* Problem pain points - written in first person for emotional connection */
const painPoints = [
  "I sound robotic when I follow scripts and prospects can tell I'm performing",
  "Every objection makes my heart race and I start rambling to fill the silence", 
  "One rejection ruins my entire day and tanks my confidence for the next call",
  "I'm constantly chasing deals but always feel like I'm behind quota",
  "Even when I hit my numbers, I feel empty and burnt out inside"
];

/* Inner Game transformation cards */
const transformationCards = [
  {
    title: "Authenticity Mastery",
    subtitle: "Transform scripts into genuine connection",
    description: "Speak from your truth, not a template",
    icon: Zap,
    color: "from-blue-500 to-purple-600",
    glow: "shadow-blue-500/20"
  },
  {
    title: "Rejection Immunity", 
    subtitle: "Build unshakeable confidence",
    description: "Bounce back stronger from every 'no'",
    icon: Shield,
    color: "from-emerald-500 to-teal-600", 
    glow: "shadow-emerald-500/20"
  },
  {
    title: "Pressure Navigation",
    subtitle: "Turn objections into opportunities",
    description: "Stay calm and curious under fire",
    icon: Target,
    color: "from-orange-500 to-red-600",
    glow: "shadow-orange-500/20"
  },
  {
    title: "Inner Authority",
    subtitle: "Command respect without aggression", 
    description: "Lead with quiet confidence and presence",
    icon: Crown,
    color: "from-violet-500 to-pink-600",
    glow: "shadow-violet-500/20"
  }
];

/* Animation variants */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const painVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const ProblemSolution = () => {
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const isProblemInView = useInView(problemRef, { once: true, amount: 0.3 });
  const isSolutionInView = useInView(solutionRef, { once: true, amount: 0.2 });

  return (
    <div className="relative">
      {/* PART 1: The Exhausting Reality - Problem Section */}
      <section 
        ref={problemRef}
        className="relative min-h-screen bg-gradient-to-br from-gray-900 via-alluBlue-900 to-black py-32 overflow-hidden"
      >
        {/* Dark texture overlay */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Stress visualization particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="section-container relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isProblemInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <motion.div
              variants={painVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Flame className="text-red-500 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-red-100">
                The Exhausting Reality
              </h2>
              <Flame className="text-red-500 w-8 h-8" />
            </motion.div>
            
            <motion.p
              variants={painVariants}
              className="text-xl text-gray-300 mb-8 italic"
            >
              "If I'm being honest with myself..."
            </motion.p>
          </motion.div>

          {/* Confession booth style card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isProblemInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card bg-gray-900/80 border-red-900/30 p-8 md:p-12 backdrop-blur-xl">
              <div className="space-y-6">
                {painPoints.map((pain, i) => (
                  <motion.div
                    key={i}
                    variants={painVariants}
                    className="flex gap-4 items-start group"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 group-hover:scale-150 transition-transform" />
                    <p className="text-gray-200 text-lg leading-relaxed group-hover:text-white transition-colors">
                      {pain}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                variants={painVariants}
                className="mt-12 pt-8 border-t border-gray-700/50 text-center"
              >
                <p className="text-gray-400 text-lg italic">
                  Sound familiar? You're not alone...
                </p>
                <div className="mt-4 w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dramatic transition gradient */}
      <div className="h-32 bg-gradient-to-b from-black via-alluBlue-800 to-alluBlue-600" />

      {/* PART 2: The Inner Game Revelation - Solution Section */}
      <section 
        ref={solutionRef}
        className="relative bg-gradient-to-br from-alluBlue-600 via-alluBlue-500 to-blue-600 py-32 overflow-hidden"
      >
        {/* Light particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon-yellow/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <CheckCircle className="text-neon-yellow w-8 h-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                The Inner Game Shift
              </h2>
              <CheckCircle className="text-neon-yellow w-8 h-8" />
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Transform your sales approach from the inside out
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-neon-yellow to-white rounded-full mx-auto" />
          </motion.div>

          {/* 2x2 Transformation Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isSolutionInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
          >
            {transformationCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover="hover"
                className={`glass-card bg-white/10 border-white/20 p-8 backdrop-blur-xl hover:${card.glow} transition-all duration-300 group cursor-pointer`}
              >
                <div className="relative">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} p-4 mb-6 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-yellow transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-blue-100 font-semibold mb-3">
                    {card.subtitle}
                  </p>
                  <p className="text-blue-200 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <button className="btn-primary bg-neon-yellow text-alluBlue-900 px-12 py-4 text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-neon-yellow/50 transition-all">
              Master Your Inner Game
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
