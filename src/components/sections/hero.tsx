import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "../ui/video-player";

const Starfield = ({ containerHeight }: { containerHeight: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = containerHeight; // Match hero section height
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create stars with varied opacity and size
    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 12000); // Reduced density
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // Smaller stars
          speed: Math.random() * 0.15 + 0.05, // Slower movement
          opacity: Math.random() * 0.4 + 0.3, // Varied opacity
        });
      }
    };

    createStars();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(228, 231, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Move stars upward
        star.y -= star.speed;

        // Reset stars that go off screen
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [containerHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 z-0"
    />
  );
};

const Blob = ({ className, delay = 0 }: { className: string; delay?: number }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

export const Hero = () => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get the hero section's height dynamically
  useEffect(() => {
    const updateHeight = () => {
      if (sectionRef.current) {
        const height = sectionRef.current.getBoundingClientRect().height;
        // Trigger a re-render if needed (handled by Starfield dependency)
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center hero-background overflow-hidden"
    >
      <Starfield containerHeight={sectionRef.current?.getBoundingClientRect().height || window.innerHeight * 0.9} />
      {/* Decorative blobs */}
      <Blob className="w-[500px] h-[500px] bg-alluBlue-400 top-20 -right-64 z-0" delay={2} />
      <Blob className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40 z-0" delay={0} />
      <Blob className="w-[300px] h-[300px] bg-neon-yellow bottom-20 -left-20 z-0" delay={4} />

      <div className="section-container relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
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

          <div className="relative z-10">
            <VideoPlayer />
          </div>
        </div>
      </div>
    </section>
  );
};