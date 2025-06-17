// src/components/sections/hero.tsx
// Purpose: Renders the hero section with an animated starfield background, floating blobs, headline copy, video player, and registration CTA.
// Dependencies: React, framer-motion (motion), lucide-react (ArrowRight, ChevronDown), VideoPlayer, HubSpotFormPopup
// Last Updated: June 17, 2025

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { VideoPlayer } from "../ui/video-player";
import { HubSpotFormPopup } from "../ui/hubspot-form-popup";

/** 
 * Custom hook to detect reduced-motion preference.
 * SUGGESTION: Extract to src/hooks/usePrefersReducedMotion.ts and memoize the MediaQueryList listener.
 */
const useReducedMotion = () => {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPref(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPref(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return pref;
};

/** 
 * Detect mobile viewport.
 * NOTE: Runs synchronously; safe for SSR because window check is included, but can cause hydration mismatches.
 * SUGGESTION: Move to a hook (useIsMobile) and update state in useEffect.
 */
const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

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
  const starsRef = useRef<{ x: number; y: number; s: number; v: number }[]>(
    []
  );

  // Initialize and regenerate stars on resize
  useEffect(() => {
    if (disabled) return;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight * 1.1;
      starsRef.current = [];
      const count = Math.floor((c.width * c.height) / 6500);
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          s: Math.random() * 2,
          v: (Math.random() * 0.5 + 0.1) * speedFactor,
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, [disabled, speedFactor]);

  // Update velocity when speedFactor changes
  useEffect(() => {
    starsRef.current.forEach(
      (st) => (st.v = (Math.random() * 0.5 + 0.1) * speedFactor)
    );
  }, [speedFactor]);

  // Animation loop
  useEffect(() => {
    if (disabled) return;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    let id: number;
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      starsRef.current.forEach((st) => {
        ctx.fillStyle = "rgba(228,231,255,0.8)";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
        st.y -= st.v;
        if (st.y < 0) {
          st.y = c.height;
          st.x = Math.random() * c.width;
        }
      });
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(id);
  }, [disabled]);

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
    // SUGGESTION: Respect reduced-motion preference by disabling this if needed
  />
);

/** Helper to only apply motion props on desktop */
const motionIfDesktop = <T extends object>(props: T): T | {} =>
  isMobile() ? {} : props;

/* ── Hero section ─────────────────────────────────── */
export const Hero: React.FC = () => {
  const [slowStars, setSlowStars] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  // Slow down starfield after initial load for dynamic effect
  useEffect(() => {
    const timer = setTimeout(() => setSlowStars(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-alluBlue-900"
      role="banner"
      aria-label="Hero section"
    >
      <Starfield speedFactor={slowStars ? 0.75 : 1} disabled={prefersReduced} />

      {/* Decorative floating blobs */}
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
        delay={3}
      />

      {/* Soft glow overlay */}
      <div className="absolute left-1/4 top-1/4 w-[50vw] h-[50vw] bg-alluBlue-400/10 rounded-full blur-[220px] pointer-events-none" />

      <div className="section-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy column */}
          <div className="min-w-0">
            <motion.span
              className="inline-block text-xs md:text-sm uppercase tracking-widest text-gray-400 bg-white/10 px-3 py-1 rounded-full mb-4"
              {...motionIfDesktop({
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.5 },
              })}
            >
              Masterclass
            </motion.span>

            <motion.h1
              className="leading-tight text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-6 max-w-2xl"
              {...motionIfDesktop({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
              })}
            >
              <span className="block">Beyond Tactics:</span>
              <span className="block text-gradient pb-[3px]">The Inner Game</span>
              <span className="block">That Top Reps</span>
              <span className="block">Never Talk About</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl opacity-80 mb-10 max-w-xl"
              {...motionIfDesktop({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.1 },
              })}
            >
              How the Top&nbsp;1&nbsp;% Crush Quota&nbsp;Without&nbsp;Burning&nbsp;Out
            </motion.h2>

            <motion.p
              className="text-lg font-bold tracking-wide mb-6"
              {...motionIfDesktop({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 },
              })}
            >
              FREE&nbsp;MASTERCLASS&nbsp;•&nbsp;July&nbsp;9&nbsp;@&nbsp;3&nbsp;PM&nbsp;CT
            </motion.p>

            <motion.div
              {...motionIfDesktop({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.3 },
              })}
            >
              <button
                className="btn-primary relative overflow-hidden group mb-4"
                onClick={() => setIsFormOpen(true)}
                aria-label="Register for the free masterclass"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register Free Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>
          </div>

          {/* Video column */}
          <div className="relative edge-glow min-w-0 flex justify-center">
            <VideoPlayer className="max-w-[672px] w-full" />
          </div>
        </div>
      </div>

      {/* Scroll cue (decorative) */}
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
        className="absolute bottom-6 inset-x-1/2 -translate-x-1/2 z-20"
        aria-hidden="true"
      >
        <ChevronDown size={24} className="text-white/80" />
      </motion.div>

      {/* HubSpot signup form modal */}
      <HubSpotFormPopup isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};