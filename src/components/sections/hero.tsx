import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";

export const Hero = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section
      className="relative min-h-[90vh] flex items-center hero-background"
      style={{
        background: "linear-gradient(to bottom, #1A202C, #2D3748)",
      }}
    >
      <style>
        {`
          .hero-background::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url('/public/assets/images/mountain-silhouette.png') no-repeat center;
            background-size: cover;
            opacity: 0.2;
            z-index: 0;
          }
          .hero-background > * {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
      <div className="section-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block mb-2">Unlock</span>
              <span className="text-gradient">The Inner Game</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl opacity-80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Crush quota without the burnout—join our free 45-minute webinar to discover the mindset shifts top 1%
              reps use to close with confidence and lead live in.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
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