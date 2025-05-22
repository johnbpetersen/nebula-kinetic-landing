// src/components/sections/hero.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";

/* ── Starfield canvas ─────────────────────────────────────────── */
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const stars: { x: number; y: number; size: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.1;
    };
    window.addEventListener("resize", resize);
    resize();

    const initStars = () => {
      stars.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.3,
        });
      }
    };
    initStars();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.fillStyle = "rgba(228,231,255,0.8)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = canvas.height;
          s.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 z-0"
    />
  );
};

/* ── Decorative motion blobs ─────────────────────────────────── */
const Blob = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
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

/* ── Hero Section ─────────────────────────────────────────────── */
export const Hero = () => {
  const [hover, setHover] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-alluBlue-900">
      {/* animated star background */}
      <Starfield />

      {/* floating blobs */}
      <Blob className="w-[500px] h-[500px] bg-alluBlue-400 top-20 -right-64" delay={2} />
      <Blob className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40" delay={0} />
      <Blob className="w-[300px] h-[300px] bg-neon-yellow bottom-20 -left-20" delay={4} />

      <div className="section-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* copy block */}
          <div>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block mb-2">Master</span>
              <span className="text-gradient">The Inner Game</span>
              <span className="block mt-2">of Sales</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl opacity-80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transform your sales approach with psychological techniques to
              overcome objections, build authentic connections &amp; close more
              deals without feeling pushy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                className="btn-primary group relative overflow-hidden"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Register Now – Free Webinar
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </span>
                <motion.span
                  className="absolute inset-0 rounded-full bg-neon-yellow/20"
                  animate={
                    hover
                      ? { scale: [1, 1.5], opacity: [0.8, 0] }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 1,
                    repeat: hover ? Infinity : 0,
                    repeatType: "loop",
                  }}
                />
              </button>
            </motion.div>
          </div>

          {/* video with subtle parallax tilt */}
          <div className="relative">
            <VideoPlayer />
          </div>
        </div>
      </div>
    </section>
  );
};