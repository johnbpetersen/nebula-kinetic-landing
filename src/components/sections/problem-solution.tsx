// src/components/sections/problem-solution.tsx
import React, { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { AlertTriangle, Zap, Shield, Target, Crown } from "lucide-react";
import { HubSpotFormPopup } from "../ui/hubspot-form-popup";

const painPoints = [
  "I’m crushing calls but terrified of imposter syndrome and being 'found out'.",
  "I sound like a robot performing a script on calls, and prospects know it.",
  "I'm on track for quota but worried about burning out before year‑end.",
  "Rejection stings so bad it tanks my confidence for the next call.",
  "Even when I win, quota still feels empty and meaningless.",
];

const transformationCards = [
  {
    title: "Authenticity",
    description:
      "Ditch the fake persona and ignite real trust. The masterclass shows you how to channel fear into magnetic presence that closes deals fast.",
    icon: Zap,
    image:
      "https://alluviance.s3.us-east-2.amazonaws.com/images/authenticity.jpg",
  },
  {
    title: "Resilience",
    description:
      "Turn rejection into rocket fuel. The masterclass rewires your mindset to stay unshakable, no matter how many ‘no’s are tossed your way.",
    icon: Shield,
    image:
      "https://alluviance.s3.us-east-2.amazonaws.com/images/resilience.jpg",
  },
  {
    title: "Leadership",
    description:
      "Lead prospects to breakthroughs, not just deals. The masterclass teaches you to sell from essence, guiding like a trusted advisor in interaction.",
    icon: Target,
    image:
      "https://alluviance.s3.us-east-2.amazonaws.com/images/leadership.jpg",
  },
  {
    title: "Vision",
    description:
      "Anchor to a soul-level 'why' that makes burnout impossible. The masterclass unlocks a vision that pulls you through grind and the roller coaster.",
    icon: Crown,
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/vision-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/vision-mobile.webp",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};
const painVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
};

export function ProblemSolution() {
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const isProblemInView = useInView(problemRef, { once: true, amount: 0.3 });
  const isSolutionInView = useInView(solutionRef, { once: true, amount: 0.2 });
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="relative">
      {/* █ Part 1 – Exhausting Reality */}
      <section
        ref={problemRef}
        className="relative min-h-[80vh] bg-gradient-to-br from-alluBlue-900 to-black pt-24 pb-32 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="section-container relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isProblemInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <motion.div
              variants={painVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <AlertTriangle className="text-red-600 w-8 h-8 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                The Exhausting Reality of Sales
              </h2>
              <AlertTriangle className="text-red-600 w-8 h-8 animate-pulse" />
            </motion.div>
            <motion.p
              variants={painVariants}
              className="text-xl text-gray-300 italic mb-8"
            >
              “If I’m being honest with myself…”
            </motion.p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isProblemInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card bg-gray-900/80 border-red-900/20 p-8 md:p-12 backdrop-blur-xl">
              <div className="space-y-6">
                {painPoints.map((pain, i) => (
                  <motion.div
                    key={i}
                    variants={painVariants}
                    className="flex gap-4 items-start group"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-3 group-hover:scale-150 transition-transform" />
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
                  Sound familiar? You’re not alone…
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* █ Part 2 – Inner-Game Shift */}
      <section
        ref={solutionRef}
        className="relative bg-gradient-to-br from-alluBlue-600 to-alluBlue-500 pt-28 pb-24 overflow-hidden"
      >
        <div className="section-container relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl md:text-5xl font-bold text-white mb-6"
          >
            The Inner Game Shift
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-center text-xl text-alluBlue-100 max-w-2xl mx-auto mb-16"
          >
            Discover the secrets that sales professionals use to consistently crush
          </motion.p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isSolutionInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
          >
            {transformationCards.map((card) => (
              <motion.div
                key={card.title}
                variants={cardVariants}
                whileHover="hover"
                className="glass-card bg-alluBlue-700/20 border-neon-yellow/20 p-8 backdrop-blur-xl group relative overflow-hidden shadow-lg cursor-pointer"
              >
                {card.title === "Vision" ? (
                  <picture className="absolute inset-0 w-full h-full object-cover opacity-60 brightness-75 group-hover:opacity-100 group-hover:brightness-100 transition-[opacity,filter] duration-500">
                    <source
                      media="(max-width: 768px)"
                      srcSet={card.imageMobile}
                      type="image/webp"
                    />
                    <source
                      srcSet={card.imageDesktop}
                      type="image/webp"
                    />
                    <img
                      src={card.image} // Fallback to old JPEG
                      alt={`${card.title} background`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </picture>
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 brightness-75 group-hover:opacity-100 group-hover:brightness-100 transition-[opacity,filter] duration-500"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                )}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-alluBlue-600 to-alluBlue-400 p-4 mb-6 group-hover:scale-110 transition-transform">
                    <card.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-yellow transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-alluBlue-200 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isSolutionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <button
              className="btn-primary bg-neon-yellow text-alluBlue-900 px-12 py-4 text-lg font-bold hover:scale-105 hover:shadow-2xl hover:shadow-neon-yellow/50 transition-all"
              onClick={() => setIsFormOpen(true)}
            >
              Lock In My Spot
            </button>
          </motion.div>
        </div>
        <HubSpotFormPopup isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </section>
    </div>
  );
}