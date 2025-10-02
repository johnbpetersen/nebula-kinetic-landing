// src/pages/Replay.tsx
// Redesigned by Gemini to put the CTA first.

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

// --- CONFIG ---
const REPLAY_MP4_URL = "https://alluviance.s3.us-east-2.amazonaws.com/videos/Beyond+Tactics+Masterclass+-+10.2.25.mp4";
const POSTER_URL = "https://alluviance.s3.us-east-2.amazonaws.com/images/alluviance-masterclass-social-share.png";
const HUBSPOT_BOOKING_LINK = "https://meetings.hubspot.com/alex3048/arise-immersion-introductory-call";

/* ── Starfield canvas (from your hero) ───────────────────────── */
const Starfield: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let stars: { x: number; y: number; size: number; speed: number }[] = [];
    const createStars = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight; stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 1.5, speed: Math.random() * 0.2 + 0.1 });
      }
    };
    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "rgba(228, 231, 255, 0.8)";
      stars.forEach((star) => {
        star.y -= star.speed; if (star.y < 0) star.y = canvas.height;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI); ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    createStars(); animate(); window.addEventListener("resize", createStars);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener("resize", createStars); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

/* ── Floating blob (from your hero) ──────────────────────────── */
const Blob: React.FC<{ className: string; delay?: number }> = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay, ease: "easeInOut" }}
  />
);

export default function Replay() {
  return (
    <div className="relative min-h-screen bg-alluBlue-900 text-white font-sans overflow-hidden">
      <Helmet>
        <title>Masterclass Replay | Alluviance</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Starfield />
      <Blob className="w-[500px] h-[500px] bg-alluBlue-400 -top-20 -right-64" delay={2} />
      <Blob className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40" delay={0} />

      <main className="relative z-10 section-container flex flex-col justify-center min-h-screen py-20 md:py-28">
        
        {/* 1. The Headline - Higher on the page */}
        <motion.header 
          className="text-center w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-display text-gradient">Beyond Tactics — The Replay</h1>
          <p className="mt-3 text-lg text-gray-300">Watch the masterclass that started it all.</p>
        </motion.header>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-6xl mx-auto">
          
          {/* 2. The Video - Smaller, on the left */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div className="edge-glow glass-card p-2">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={REPLAY_MP4_URL}
                  poster={POSTER_URL}
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
            </div>
          </motion.div>

          {/* 3. THE PITCH - Compelling, on the right, instantly visible */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">The Real Transformation Starts Now.</h2>
            <p className="mt-4 text-lg text-gray-300">
              This masterclass was just the beginning. The concepts you've learned are most powerful when applied directly to your unique challenges.
            </p>
            <ul className="mt-6 space-y-3 text-left">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-neon-yellow flex-shrink-0 mt-1" />
                <span>Map your next moves and build a personalized roadmap.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-neon-yellow flex-shrink-0 mt-1" />
                <span>Identify and remove the hidden blockers holding you back.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-neon-yellow flex-shrink-0 mt-1" />
                <span>Get clarity on how to apply the "Inner Game" to your world, fast.</span>
              </li>
            </ul>
            <div className="mt-8">
              <a
                href={HUBSPOT_BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-neon-yellow text-alluBlue-900 font-bold text-lg rounded-full px-8 py-4 shadow-lg hover:shadow-neon-yellow/40 transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span className="flex items-center gap-2">
                  Book a Complimentary 1:1 Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <p className="mt-3 text-sm text-gray-400">
                100% Free • No Obligation
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}