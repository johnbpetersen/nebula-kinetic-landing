import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";

const useReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Starfield canvas (unchanged) ─────────────────────────────── */
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

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight * 1.1;
    };
    window.addEventListener("resize", resize);
    resize();

    const init = () => {
      stars.length = 0;
      const n = Math.floor((c.width * c.height) / 8000);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          s: Math.random() * 2,
          v: Math.random() * 0.3 * speedFactor,
        });
      }
    };
    init();

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((st) => {
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
      requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener("resize", resize);
  }, [speedFactor, disabled]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 z-0"
    />
  );
};

/* ── blob ─────────────────────────────────────────────────────── */
const Blob: React.FC<{ className: string; delay?: number }> = ({
  className,
  delay = 0,
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{ y: [0, -20, 0], opacity: [0.2, 0.3, 0.2] }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ── Hero ─────────────────────────────────────────────────────── */
export const Hero: React.FC = () => {
  const [hover, setHover] = useState(false);
  const [slowStars, setSlowStars] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setSlowStars(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-alluBlue-900">
      <Starfield speedFactor={slowStars ? 0.5 : 1} disabled={reducedMotion} />

      {/* blobs */}
      <Blob className="w-[500px] h-[500px] bg-alluBlue-400 top-20 -right-64" delay={2} />
      <Blob className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40" delay={0} />
      <Blob className="w-[300px] h-[300px] bg-neon-yellow bottom-20 -left-20" delay={4} />

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
              className="leading-tight text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">Beyond Tactics:</span>
              <span className="block text-gradient">The Inner Game</span>
              <span className="block">That Top Reps Never Talk About</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl opacity-80 mb-6 w-full max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              How the Top 1% Crush Quota Without Burning Out
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl opacity-80 mb-8 w-full max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join our free 90‑minute webinar to discover the mindset shifts elite
              reps use to close with confidence and lighten the load.
            </motion.p>

            <motion.p
              className="text-lg font-bold tracking-wide mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              FREE MASTERCLASS • June 25 @ 6:00 PM CT
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                aria-label="Reserve your seat for the free masterclass"
                className="btn-primary group relative overflow-hidden shadow-neon-yellow/30"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Reserve Your Spot Now
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-neon-yellow/20"
                  animate={
                    hover
                      ? { scale: [1, 1.6], opacity: [0.8, 0] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 1,
                    repeat: hover ? Infinity : 0,
                    repeatType: "loop",
                  }}
                />
                <span className="absolute inset-0 -z-10 rounded-full bg-white/5 backdrop-blur-md" />
              </button>
            </motion.div>
          </div>

          {/* edge‑lit video */}
          <div className="relative edge-glow">
            <VideoPlayer />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neon-yellow"
      >
        <ChevronDown size={28} className="animate-bounce-slow" />
      </motion.div>
    </section>
  );
};