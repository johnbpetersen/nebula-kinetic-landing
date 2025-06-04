// src/components/sections/final-cta.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { HubSpotFormPopup } from "../ui/hubspot-form-popup";
import {
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";

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
  const [isFormOpen, setIsFormOpen] = useState(false);

  /* -------- live 72‑hour timer -------- */
  useEffect(() => {
    const deadline = new Date(Date.now() + 72 * 60 * 60 * 1000);
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ hours: 0, minutes: 0 });

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { number: "300+", label: "Sellers Transformed", icon: Users },
    { number: "9.1", label: "Alluviance NPS Score", icon: TrendingUp },
    { number: `${timeLeft.hours}`, label: "Hours Left for a Free Gift", icon: Clock },
  ];

  return (
    <MotionSection className="relative bg-alluBlue-900 overflow-hidden">
      <div className="section-container relative z-10">
        {/* ── stats pills ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
        >
          {stats.map(({ number, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm
                         border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3"
            >
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-yellow to-alluBlue-400 flex items-center justify-center">
                <Icon className="w-5 h-5 text-alluBlue-900" aria-hidden />
              </span>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">{number}</p>
                <p className="text-xs sm:text-sm text-gray-300">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── headline & copy ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-alluBlue-500/20 to-neon-yellow/20
                          backdrop-blur-sm border border-neon-yellow/30 rounded-full px-4 py-2 mb-7">
            <Zap className="w-4 h-4 text-neon-yellow animate-pulse" aria-hidden />
            <span className="text-gray-200 font-semibold text-sm uppercase tracking-wider">
              Limited Seats Available
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-snug mb-10">
            <span className="block text-white">Don’t Let Another Deal</span>
            <span className="block text-gradient pb-[10px]">Slip Through Your Fingers</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            You’ve seen what’s possible. You’ve heard from sellers who went from 
            <span className="text-alluBlue-400 font-semibold"> struggling at  1% of quota </span> 
            to <span className="text-neon-yellow font-semibold">crushing 267% performance</span>. 
            Are you ready to be next?
          </p>
        </motion.div>

        {/* ── benefit bullets ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-14"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto px-4">
            {FINAL_BENEFITS.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className="flex items-start gap-3 text-left"
              >
                <CheckCircle className="w-5 h-5 text-neon-yellow mt-[2px]" aria-hidden />
                <span className="text-gray-200">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA button ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-10 py-5 rounded-full
                       bg-neon-yellow text-alluBlue-900 font-bold text-lg sm:text-xl
                       shadow-xl hover:shadow-neon-yellow/40 transition-all duration-300
                       focus:ring-2 focus:ring-neon-yellow/50"
            onClick={() => setIsFormOpen(true)}
          >
            {/* moving shine */}
            <motion.span
              className="pointer-events-none absolute inset-0 bg-white/40 skew-x-12"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <span className="relative flex items-center gap-3">
              Reserve My Free Seat
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>

        {/* ── price anchor & countdown ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-lg text-gray-400 mb-3">
            <span className="line-through text-gray-400">$297 Value</span> —
            <span className="text-neon-yellow font-bold text-2xl ml-2">FREE</span> for a limited time
          </p>
          <p className="text-sm text-gray-400">
            Sign up in the next {timeLeft.hours}h {timeLeft.minutes}m to receive  
            <span className="text-neon-yellow"> The Formula to Finding Your Purpose</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            No credit card required • 100% free training
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-white/10 pt-6"
        >
          <div className="flex items-center justify-center gap-2 text-gray-200">
            <Clock className="w-5 h-5 text-neon-yellow animate-pulse" aria-hidden />
            <span className="font-semibold">
              Only {timeLeft.hours}h {timeLeft.minutes}m left to grab your free gift — secure your seat now
            </span>
          </div>
        </motion.div>
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      {/* HubSpot form popup */}
      <HubSpotFormPopup isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </MotionSection>
  );
};