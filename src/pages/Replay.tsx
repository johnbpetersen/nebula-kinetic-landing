// src/pages/Replay.tsx
// CTA-first Replay page: sits higher; mobile shows CTA before video; CTA stays single-line.
// Adds light no-download deterrents to the <video>.

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- CONFIG ---
const REPLAY_MP4_URL =
  "https://alluviance.s3.us-east-2.amazonaws.com/videos/Beyond+Tactics+Masterclass+-+10.2.25.mp4";
const POSTER_URL =
  "https://alluviance.s3.us-east-2.amazonaws.com/images/alluviance-masterclass-social-share.png";
const HUBSPOT_BOOKING_LINK =
  "https://meetings.hubspot.com/alex3048/arise-immersion-introductory-call";

/* ── Starfield (background flourish) ───────────────────────── */
const Starfield: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;

    let stars: { x: number; y: number; size: number; speed: number }[] = [];
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

    let id = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(228, 231, 255, 0.8)";
      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      id = requestAnimationFrame(animate);
    };

    createStars();
    animate();
    window.addEventListener("resize", createStars);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", createStars);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

/* ── Floating blobs ────────────────────────────────────────── */
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

      {/* Sit content higher: lighter top/bottom padding */}
      <main className="relative z-10 section-container pt-6 md:pt-8 pb-8 md:pb-10">
        {/* Headline sits higher */}
        <motion.header
          className="text-center w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-display text-gradient">
            Beyond Tactics: Inner Game Masterclass
          </h1>
          <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-300">
            Watch the replay now! Only available through October 5.
          </p>
        </motion.header>

        {/* Grid: CTA first on mobile, video second; normal order on desktop */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start w-full max-w-6xl mx-auto">
          {/* Pitch + CTA (mobile first) */}
          <motion.div
            className="order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Are you ready?
            </h2>

            {/* Paragraph 1 with extra breathing room from header */}
            <p className="mt-6 text-lg text-white">
              Your inner game journey starts now!
            </p>

            {/* Paragraph 2 — hidden on mobile for immediate CTA visibility */}
            <p className="hidden sm:block mt-6 text-lg text-gray-300">
              The masterclass was just the beginning. The concepts you’ve learned are most powerful
              when applied directly to your unique challenges.
            </p>

            <div className="mt-6">
              <a
                href={HUBSPOT_BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-neon-yellow text-alluBlue-900 font-bold text-[15px] sm:text-lg rounded-full px-5 py-3 sm:px-8 sm:py-4 shadow-lg hover:shadow-neon-yellow/40 transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  Book a Free 30 Min Coaching Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Video (mobile second) */}
          <motion.div
            className="order-2 lg:order-1 w-full"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <div className="edge-glow glass-card p-2">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={REPLAY_MP4_URL}
                  poster={POSTER_URL}
                  controls
                  controlsList="nodownload noplaybackrate"
                  // These are deterrents only; determined users can still fetch the file.
                  onContextMenu={(e) => e.preventDefault()}
                  disablePictureInPicture
                  preload="metadata"
                  playsInline
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* P.S. — slightly higher with modest margins */}
        <div className="max-w-3xl mx-auto text-center mt-10 md:mt-12">
          <p className="text-sm md:text-base text-white/80 italic">
            <span className="not-italic font-semibold text-white">P.S.</span> If you are having any hesitation
            booking that free call, I invite you to ask yourself what your Essence Led Leader would do in
            this situation if you were coming from vision.
          </p>
        </div>
      </main>
    </div>
  );
}