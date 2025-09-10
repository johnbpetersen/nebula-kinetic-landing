// src/pages/VipConfirmed.tsx

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle } from "lucide-react"; // Using a more on-brand icon

// We can reuse the Starfield component from the hero section for a consistent, premium feel.
// NOTE: You may need to export Starfield from hero.tsx or move it to its own file.
// For now, I'm including a simplified version here for completeness.

const Starfield: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: { x: number, y: number, size: number, speed: number }[] = [];
    const createStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          speed: Math.random() * 0.2 + 0.1,
        });
      }
    };

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(228, 231, 255, 0.8)';
      stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    createStars();
    animate();
    window.addEventListener('resize', createStars);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', createStars);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};


export default function VipConfirmed() {
  React.useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "vip_purchase_success" });
  }, []);

  return (
    <div className="relative min-h-screen bg-alluBlue-900 text-white flex flex-col items-center justify-center overflow-hidden font-sans p-6">
      <Helmet>
        <title>VIP Confirmed | Alluviance Masterclass</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Starfield />

      <motion.main 
        className="relative z-10 glass-card p-8 md:p-12 text-center max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="w-16 h-16 bg-neon-yellow/10 border-2 border-neon-yellow/30 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8 text-neon-yellow" />
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-display text-gradient">
          VIP Access Unlocked
        </h1>

        <p className="mt-4 text-lg text-gray-300 max-w-lg mx-auto">
          You're all set for the 30-minute interactive VIP session with Alex immediately after the Inner Game Masterclass. Get ready to go deeper.
        </p>

        <div className="my-8 h-[1px] w-24 bg-gradient-to-r from-neon-yellow/0 via-white/50 to-neon-yellow/0 mx-auto" />

        <div className="text-left space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-neon-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg">Check Your Email</h2>
              <p className="text-gray-400">We've just sent a separate email with your exclusive VIP confirmation details.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-neon-yellow flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-semibold text-lg">Prepare Your Questions</h2>
              <p className="text-gray-400">This is your chance for priority Q&amp;A. Think about the one challenge you'd love to get some guidance on.</p>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer link */}
      <div className="relative z-10 mt-8 text-sm text-gray-400">
        Take me back to the{" "}
        <a 
          href="https://masterclass.alluviance.co" 
          className="text-neon-yellow hover:underline"
        >
          Masterclass site
        </a>.
      </div>
    </div>
  );
}