// src/components/sections/hero.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";

/* ── util ─────────────────────────────────────────── */
const useReducedMotion = () => {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    setPref(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);
  return pref;
};

/* ── Starfield canvas ─────────────────────────────── */
interface StarfieldProps {
  speedFactor?: number;
  disabled?: boolean;
}

const Starfield: React.FC<StarfieldProps> = ({
  speedFactor = 1,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disabled) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const stars: { x: number; y: number; s: number; v: number }[] = [];

    /* Resize & regenerate density‑based stars */
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight * 1.1;
      stars.length = 0;
      const n = Math.floor((c.width * c.height) / 6500);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          s: Math.random() * 2,
          v: (Math.random() * 0.3 + 0.05) * speedFactor, // upward drift speed
        });
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((st) => {
        ctx.fillStyle = "rgba(228,231,255,0.8)";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
        /* move star upward */
        st.y -= st.v;
        if (st.y < 0) {
          st.y = c.height;
          st.x = Math.random() * c.width;
        }
      });
      requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener("resize", resize);
  }, [speedFactor, disabled]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 z-0 pointer-events-none"
    />
  );
};

/* ── Floating blob ────────────────────────────────── */
const Blob: React.FC<{ className: string; delay?: number }> = ({
  className,
  delay = 0,
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{ y: [0, -20, 0] }}
    transition={{
      duration: 12,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
      ease: "easeInOut",
    }}
  />
);

/* ── Hero section ─────────────────────────────────── */
export const Hero: React.FC = () => {
  const [slowStars, setSlowStars] = useState(false);
  const reducedMotion = useReducedMotion();

  /* after 5 s, slow the drift slightly */
  useEffect(() => {
    const id = setTimeout(() => setSlowStars(true), 5000);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-alluBlue-900">
      <Starfield speedFactor={slowStars ? 0.5 : 1} disabled={reducedMotion} />

      {/* blobs */}
      <Blob
        className="w-[500px] h-[500px] bg-alluBlue-400 top-20 -right-64"
        delay={2}
      />
      <Blob
        className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40"
        delay={0}
      />
      <Blob
        className="w-[300px] h-[300px] bg-neon-yellow bottom-20 -left-20"
        delay={4}
      />

      {/* soft glow */}
      <div className="absolute left-1/4 top-1/4 w-[50vw] h-[50vw] bg-alluBlue-400/10 rounded-full blur-[220px] pointer-events-none" />

      <div className="section-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* copy */}
          <div>
            <motion.span
              className="inline-block text-xs md:text-sm uppercase tracking-widest text-gray-400 bg-white/10 px-3 py-1 rounded-full mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Masterclass
            </motion.span>

            <motion.h1
              className="leading-tight text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">Beyond Tactics:</span>
              <span className="block text-gradient">The Inner Game</span>
              <span className="block">That Top Reps</span>
              <span className="block">Never Talk About</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl opacity-80 mb-10 w-full max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How the Top 1 % Crush Quota Without Burning Out
            </motion.h2>

            <motion.p
              className="text-lg font-bold tracking-wide mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              FREE MASTERCLASS • June 25 @ 6 PM CT
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button className="btn-primary relative overflow-hidden group mb-4">
                <span className="relative z-10 flex items-center gap-2">
                  Register Free Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                <span className="absolute inset-0 w-full -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>
          </div>

          {/* edge‑lit video */}
          <div className="relative edge-glow">
            <VideoPlayer />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} className="text-white/80" />
      </motion.div>
    </section>
  );
};