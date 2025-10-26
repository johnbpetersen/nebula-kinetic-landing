// src/components/sections/hero.tsx
// Updated to handle form submission and redirect to the new /checkout page.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";
import { HubSpotEmbed } from "../ui/hubspot-embed";
import { eventMeta, hasMasterclassPassed } from "../../config/eventMeta";

// ... (rest of the file is unchanged, like useReducedMotion, isMobile, Starfield, Blob, motionIfDesktop)

/** Custom hook to detect reduced-motion preference. */
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

/** Detect mobile viewport. */
const isMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

/* ── Starfield canvas ─────────────────────────────── */
interface StarfieldProps {
  speedFactor?: number;
  disabled?: boolean;
}

const Starfield: React.FC<StarfieldProps> = ({ speedFactor = 1, disabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; s: number; v: number }[]>([]);

  useEffect(() => {
    if (disabled) return;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight * 1.2;
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

  useEffect(() => {
    starsRef.current.forEach((st) => (st.v = (Math.random() * 0.5 + 0.1) * speedFactor));
  }, [speedFactor]);

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
const Blob: React.FC<{ className: string; delay?: number }> = ({ className, delay = 0 }) => (
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

/** Helper to only apply motion props on desktop */
const motionIfDesktop = <T extends object>(props: T): T | {} => (isMobile() ? {} : props);


/* ── Hero section ─────────────────────────────────── */
export const Hero: React.FC = () => {
  const [slowStars, setSlowStars] = useState(false);
  const prefersReduced = useReducedMotion();
  const navigate = useNavigate(); // 2. Initialize the navigate function

  useEffect(() => {
    const timer = setTimeout(() => setSlowStars(true), 5000);
    return () => clearTimeout(timer);
  }, []);

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


  return (
    <section
      className="relative min-h-[120vh] flex items-center overflow-hidden bg-alluBlue-900"
      role="banner"
      aria-label="Hero section"
    >
      <Starfield speedFactor={slowStars ? 0.75 : 1} disabled={prefersReduced} />

      <Blob className="w-[500px] h-[500px] bg-alluBlue-400 top-20 -right-64" delay={2} />
      <Blob className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40" delay={0} />
      <Blob className="w-[300px] h-[300px] bg-neon-yellow bottom-20 -left-20" delay={3} />

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
          </div>

          {/* Video column */}
          <div className="relative edge-glow min-w-0 flex justify-center">
            <VideoPlayer className="max-w-[672px] w-full" />
          </div>
        </div>

        {/* Embedded Form Section */}
        <div className="mt-16 text-center">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold tracking-wide uppercase">{eventMeta.displayDate}</h3>
            <p className="text-lg text-neon-yellow">{eventMeta.displayTime}</p>
          </motion.div>

          <div className="max-w-lg mx-auto">
            {/* 4. Pass the handler to the component */}
            <HubSpotEmbed
              formId={"96bdf935-8d89-49ff-a674-bed46698ffa4"}
              className="hs-form-inline"
              sectionId="hero"
              onFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>

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
    </section>
  );
};