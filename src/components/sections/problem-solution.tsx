import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { MotionSection } from "../ui/motion-section";

export const ProblemSolution = () => {
  return (
    <MotionSection className="bg-alluBlue-900 relative">
      <div
        className="absolute top-0 left-0 w-full h-32 bg-alluBlue-900"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 30%)",
        }}
      ></div>

      <div className="section-container relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Most Sales Training Fails</h2>

            <ul className="space-y-6">
              {[
                "Relies on outdated pushy tactics that modern buyers reject",
                "Ignores the psychological barriers preventing sales success",
                "Focuses on scripts instead of authentic connection",
                "Creates more anxiety and burnout for sales professionals",
                "Doesn't adapt to today's informed and skeptical buyers",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-red-500 mt-1">🔥</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex items-center">
            <GlassCard className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">The Inner Game Difference</h3>

              <ul className="space-y-4 mb-8">
                {[
                  "Master the psychology behind buyer decisions",
                  "Remove internal blocks to selling with confidence",
                  "Develop genuine connection techniques that feel natural",
                  "Learn to navigate objections without anxiety",
                  "Close deals without feeling pushy or manipulative",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-neon-yellow mt-1">
                      <Check size={18} className="animate-bounce-slow" />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <button className="btn-secondary w-full">Learn The Inner Game Approach</button>
            </GlassCard>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};