// src/components/sections/final-cta.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { Clock, Users, TrendingUp, CheckCircle, ArrowRight, Zap } from "lucide-react";

const URGENCY_STATS = [
  { number: "347+", label: "Sellers Transformed", icon: Users },
  { number: "127%", label: "Avg Quota Growth in 6 Months", icon: TrendingUp },
  { number: "72", label: "Hours Left for Free Gift", icon: Clock }, // Updated dynamically
];

const FINAL_BENEFITS = [
  "Turn rejection into rocket fuel for your confidence",
  "Speak with unshakeable authority in every conversation",
  "Close deals without feeling pushy or salesy",
  "Build genuine connections that prospects remember",
  "Transform your inner critic into your biggest champion",
  "Master the psychology to crush your sales goals",
];

export const FinalCTA = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 72, minutes: 0 });

  useEffect(() => {
    const deadline = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours from now
    const updateTimer = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0 });
        URGENCY_STATS[2].number = "0";
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ hours, minutes });
      URGENCY_STATS[2].number = `${hours}`;
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <MotionSection className="relative bg-alluBlue-900 overflow-hidden">
      <div className="section-container relative z-10">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="edge-glow flex flex-wrap justify-center gap-6 mb-16"
        >
          {URGENCY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-yellow to-alluBlue-400 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-alluBlue-900" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-alluBlue-500/20 to-neon-yellow/20 backdrop-blur-sm border border-neon-yellow/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-neon-yellow animate-pulse" aria-hidden="true" />
              <span className="text-gray-200 font-semibold text-sm uppercase tracking-wider">
                Limited Seats Available
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block text-white">Don’t Let Another Deal</span>
              <span className="block text-gradient">Slip Through Your Fingers</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              You’ve seen what’s possible. You’ve heard from sellers who went from
              <span className="text-alluBlue-400 font-semibold"> struggling at 1% of quota </span>
              to <span className="text-neon-yellow font-semibold">crushing 267% performance</span>.
              Are you ready to be next?
            </p>
          </motion.div>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8 px-4">
              {FINAL_BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  className="flex items-start gap-3 text-left"
                >
                  <CheckCircle className="w-5 h-5 text-neon-yellow mt-1 flex-shrink-0" aria-label="Benefit" />
                  <span className="text-gray-200">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-neon-yellow text-alluBlue-900 font-bold text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-2xl cta-glow animate-pulse-slow focus:ring-2 focus:ring-neon-yellow/50"
            >
              <span className="relative flex items-center gap-3">
                Reserve My Free Seat
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </motion.button>
          </motion.div>

          {/* Value reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6"
          >
            <p className="text-lg text-gray-400 mb-4">
              <span className="line-through text-gray-400">$297 Value</span> —
              <span className="text-neon-yellow font-bold text-2xl ml-2">FREE</span> for a limited time
            </p>
            <p className="text-sm text-gray-400">
              Sign up in the next {timeLeft.hours} hours to get a FREE Sales Psychology Guide!
            </p>
            <p className="text-sm text-gray-400 mt-2">
              No credit card required • Instant access • 100% free training
            </p>
          </motion.div>

          {/* Final urgency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="border-t border-white/10 pt-8"
          >
            <div className="edge-glow flex flex-col items-center justify-center gap-4 text-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-neon-yellow animate-pulse" aria-hidden="true" />
                <span className="font-semibold">
                  Only {timeLeft.hours}h {timeLeft.minutes}m left for your free gift!
                </span>
              </div>
              <p className="text-sm text-gray-300 max-w-md">
                Limited seats available. Our premium immersions sell out fast—this free training will too!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </MotionSection>
  );
};