import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "../ui/motion-section";
import { CountdownTimer } from "../ui/countdown-timer";

// Simplified Starfield for background
const Starfield = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    });

    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-20 z-0"
    />
  );
};

// Animated Blob
const Blob = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    animate={{ y: [0, -20, 0], opacity: [0.2, 0.3, 0.2] }}
    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay }}
  />
);

interface CountdownProps {
  targetDate: Date;
}

export const Countdown = ({ targetDate }: CountdownProps) => (
  <MotionSection className="relative bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 min-h-screen flex items-center">
    <Starfield />
    <Blob className="w-[300px] h-[300px] bg-neon-yellow top-10 right-10" delay={0} />

    <div className="section-container text-center relative z-10">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Secure Your Spot
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Join us on June 25th at 6 PM CT for this transformative masterclass. Limited spots available.
      </motion.p>

      <motion.div
        className="mb-10 relative"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-neon-yellow/10 rounded-full blur-xl" />
        <CountdownTimer targetDate={targetDate} />
      </motion.div>

      <motion.button
        className="btn-primary relative overflow-hidden group px-6 py-3 md:px-8 md:py-4 text-base md:text-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          Register Free Now{" "}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </span>
        <span className="absolute inset-0 w-full transform -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
      </motion.button>
    </div>
  </MotionSection>
);