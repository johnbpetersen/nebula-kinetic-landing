// src/components/sections/final-cta.tsx
// Purpose: Renders the final call-to-action section with stats, benefits, and embedded inline registration form.
// Dependencies: React, framer-motion (motion), MotionSection, HubSpotEmbed, lucide-react icons (Users, TrendingUp, CheckCircle, ArrowRight, Zap)
// Last Updated: August 28, 2025, 12:30 PM EDT

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { HubSpotEmbed } from "../ui/hubspot-embed";
import {
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import { eventMeta, hasMasterclassPassed } from "../../config/eventMeta";

// Move benefits data to config or CMS for easier updates
const FINAL_BENEFITS = [
  "Turn rejection into rocket fuel for your confidence",
  "Speak with unshakeable authority in every conversation",
  "Close deals without feeling pushy or salesy",
  "Build genuine connections that prospects remember",
  "Transform your inner critic into your biggest champion",
  "Master the psychology to crush your sales goals",
];

export const FinalCTA: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number }>({
    hours: 0,
    minutes: 0,
  });

  /* -------- Timer until event date (commented out for now) -------- */
  useEffect(() => {
    const deadline = new Date(eventMeta.rawDate);
    const tick = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0 });
        return;
      }
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // Stats displayed above the CTA
  const stats = [
    { number: "300+", label: "Sellers Transformed", icon: Users },
    { number: "9.1", label: "Alluviance NPS Score", icon: TrendingUp },
    // Removed: { number: `${timeLeft.hours}`, label: "Hours Left for a Free Gift", icon: Clock },
  ];

  return (
    <MotionSection className="relative bg-alluBlue-900 overflow-hidden pb-20" style={{ minHeight: "120vh" }}>
      <div className="section-container relative z-10">
        {/* ── Stats Pills ─────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map(({ number, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 sm:px-6 sm:py-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span
                className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-yellow to-alluBlue-400 flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-alluBlue-900" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">{number}</p>
                <p className="text-xs sm:text-sm text-gray-300">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Headline & Copy ─────────────────────────────────────────── */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-alluBlue-500/20 to-neon-yellow/20 backdrop-blur-sm border border-neon-yellow/30 rounded-full px-4 py-2 mb-7"
          >
            <Zap
              className="w-4 h-4 text-neon-yellow animate-pulse"
              aria-hidden="true"
            />
            <span className="text-gray-200 font-semibold text-sm uppercase tracking-wider">
              Limited Seats Available
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-snug mb-10">
            <span className="block text-white">Don’t Let Another Deal</span>
            <span className="block text-gradient pb-[10px]">
              Slip Through Your Fingers
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            You’ve seen what’s possible. You’ve heard from sellers who went from{" "}
            <span className="text-alluBlue-400 font-semibold">
              struggling at 1% of quota{" "}
            </span>
            to{" "}
            <span className="text-neon-yellow font-semibold">
              crushing 267% performance
            </span>
            . Are you ready to be next?
          </p>
        </motion.div>

        {/* ── Benefit Bullets ─────────────────────────────────────────── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto px-4">
            {FINAL_BENEFITS.map((b, i) => (
              <motion.div
                key={b}
                className="flex items-start gap-3 text-left"
                initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
              >
                <CheckCircle
                  className="w-5 h-5 text-neon-yellow mt-[2px]"
                  aria-hidden="true"
                />
                <span className="text-gray-200">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Price Anchor & Countdown Text ─────────────────────────── */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg text-gray-400 mb-3">
            <span className="line-through text-gray-400">$297 Value</span> —
            <span className="text-neon-yellow font-bold text-2xl ml-2">
              FREE
            </span>{" "}
            for a limited time
          </p>
          <p className="text-xs text-gray-500 mt-2">
            No credit card required • 100% free training
          </p>
        </motion.div>

        {/* Removed countdown text block */}

        {/* ── Embedded Inline Form ───────────────────────────────────── */}
        <div id="final-cta-form" className="mt-12 max-w-lg mx-auto">
          <HubSpotEmbed
            formId={import.meta.env.VITE_HS_FORM_ID_STEP1 || "1750eaa7-b9fb-4852-a88e-5390ebb5eb6e"}
            className="hs-form-inline"
            sectionId="final-cta"
          />
        </div>
      </div>

      {/* Bottom fade for visual transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </MotionSection>
  );
};