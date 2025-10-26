// src/components/sections/final-cta.tsx
// Updated to handle form submission and redirect to the new /checkout page.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
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

const FINAL_BENEFITS = [
  "Turn rejection into rocket fuel for your confidence",
  "Speak with unshakeable authority in every conversation",
  "Close deals without feeling pushy or salesy",
  "Build genuine connections that prospects remember",
  "Transform your inner critic into your biggest champion",
  "Master the psychology to crush your sales goals",
];

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  // 3. Create the handler function
  const handleFormSubmit = (
    submittedData: { name: string; value: string | boolean }[]
  ) => {
    // NOTE: The 'name' must match the "Internal name" of your HubSpot form field.
    // Check the console log to verify this name if it doesn't work.
    const vipField = submittedData.find(
      (field) => field.name === "im_interested_in_vip"
    );

    // If the checkbox was checked, its value will be 'true'
    const vipInterest = vipField?.value === "true";

    if (vipInterest) {
      navigate("/checkout?vip=true");
    } else {
      navigate("/checkout");
    }
  };
  
  // ... (rest of the file is unchanged, like the stats and useEffects)
  
  const stats = [
    { number: "300+", label: "Sellers Transformed", icon: Users },
    { number: "9.1", label: "Alluviance NPS Score", icon: TrendingUp },
  ];

  return (
    <MotionSection className="relative bg-alluBlue-900 overflow-hidden pb-20" style={{ minHeight: "120vh" }}>
      <div className="section-container relative z-10">
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

        <div id="final-cta-form" className="mt-12 text-center">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold tracking-wide uppercase">
              Secure Your Spot Now
            </h3>
            <p className="text-lg text-neon-yellow">{eventMeta.displayDate} {eventMeta.displayTime}</p>
          </motion.div>

          <div className="max-w-lg mx-auto">
            {/* 4. Pass the handler to the component */}
            <HubSpotEmbed
              formId={"96bdf935-8d89-49ff-a674-bed46698ffa4"}
              className="hs-form-inline"
              sectionId="final-cta"
              onFormSubmit={handleFormSubmit}
            />
          </div>
           <p className="text-xs text-gray-500 mt-3">
            Your journey to the top 1% starts here.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </MotionSection>
  );
};