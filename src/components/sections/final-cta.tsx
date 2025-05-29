
import React from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { Clock, Users, TrendingUp, CheckCircle, ArrowRight, Zap } from "lucide-react";

const URGENCY_STATS = [
  { number: "3,247", label: "Sellers Transformed", icon: Users },
  { number: "127%", label: "Avg Performance Increase", icon: TrendingUp },
  { number: "48", label: "Hours Left to Register", icon: Clock },
];

const FINAL_BENEFITS = [
  "Turn rejection into rocket fuel for your confidence",
  "Speak with unshakeable authority in every conversation", 
  "Close deals without feeling pushy or salesy",
  "Build genuine connections that prospects remember",
  "Transform your inner critic into your biggest champion"
];

export const FinalCTA = () => {
  return (
    <MotionSection className="relative bg-gradient-to-br from-alluBlue-900 via-black to-alluBlue-800 overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0">
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-full bg-gradient-to-b from-neon-yellow/10 via-transparent to-transparent opacity-50" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FFE45E' stroke-width='0.5' stroke-opacity='0.1'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        
        {/* Floating energy orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-neon-yellow/20 to-alluBlue-500/20 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {URGENCY_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-yellow to-orange-500 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-alluBlue-900" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-red-300 font-semibold text-sm uppercase tracking-wider">
                Limited Time Only
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block text-white">Don't Let Another Deal</span>
              <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-neon-yellow bg-clip-text text-transparent">
                Slip Through Your Fingers
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              You've seen what's possible. You've heard from sellers who went from 
              <span className="text-red-400 font-semibold"> struggling at 1% of quota </span>
              to <span className="text-neon-yellow font-semibold">crushing 267% performance</span>. 
              The question is: are you ready to be next?
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
              {FINAL_BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="flex items-start gap-3 text-left"
                >
                  <CheckCircle className="w-5 h-5 text-neon-yellow mt-1 flex-shrink-0" />
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
              className="group relative bg-gradient-to-r from-neon-yellow via-orange-400 to-red-400 text-alluBlue-900 font-bold text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-neon-yellow/50 transition-all duration-300 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow via-orange-400 to-red-400 blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              
              <span className="relative flex items-center gap-3">
                Reserve My Seat in The Inner Game Masterclass
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.button>
          </motion.div>

          {/* Value reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-lg text-gray-400 mb-4">
              <span className="line-through text-gray-500">$497 Value</span> — 
              <span className="text-neon-yellow font-bold text-2xl ml-2">FREE</span> for a limited time
            </p>
            <p className="text-sm text-gray-500">
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
            <div className="flex items-center justify-center gap-4 text-orange-300">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="font-semibold">
                Registration closes in 48 hours — Don't wait until it's too late
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom dramatic edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </MotionSection>
  );
};
