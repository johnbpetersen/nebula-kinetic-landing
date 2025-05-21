import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";

export const Hero = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section
      className="relative min-h-[90vh] flex items-center hero-background overflow-hidden bg-alluBlue-900"
    >
      {/* Particle Layer */}
-      <div className="absolute inset-0 pointer-events-none z-0">
-        <div className="particle particle-1" />
-        <div className="particle particle-2" />
-        <div className="particle particle-3" />
-        <div className="particle particle-4" />
-        <div className="particle particle-5" />
-      </div>

      <div className="section-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              className="inline-block text-sm uppercase text-gray-400 tracking-widest bg-white/10 px-3 py-1 rounded-full mb-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Masterclass
            </motion.span>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block mb-2">Beyond Tactics</span>
              <span className="text-gradient">The Inner Game</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl opacity-80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How The Top 1% Crush Quota Without Burning Out
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl opacity-80 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join our free 90-minute webinar to discover the mindset shifts top 1% reps use to close with confidence
              and lead live in.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-lg font-bold tracking-wide mb-4">FREE MASTERCLASS • June 25th @ 6:00pm CT</p>
              <button
                className="btn-primary group relative overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Reserve Your Spot Now
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-neon-yellow/20"
                  animate={
                    isHovering
                      ? {
                          scale: [1, 1.5],
                          opacity: [0.8, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1,
                    repeat: isHovering ? Infinity : 0,
                    repeatType: "loop",
                  }}
                />
              </button>
            </motion.div>
          </div>

          <div className="relative">
            <VideoPlayer />
          </div>
        </div>
      </div>
    </section>
  );
};