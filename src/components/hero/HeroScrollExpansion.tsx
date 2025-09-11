// src/components/hero/HeroScrollExpansion.tsx
// Card→full-bleed scroll expansion with REAL “fly-off” text + bottom teaser bar.
// New: a subtle black wash overlay ABOVE the video (and vignette) so the hero text pops.
// - The wash sits between the media and the text, participates in the masked expansion,
//   and gently reduces from 22% → 12% opacity as you scroll.

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = {
  videoSrc: string;
  poster?: string;
  headline: React.ReactNode;
  subhead?: React.ReactNode;
  anchorId?: string;
};

export default function HeroScrollExpansion({
  videoSrc,
  poster,
  headline,
  subhead,
  anchorId = "vip-pitch",
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  // Responsive off-screen distance for the fly-away animation
  const [offX, setOffX] = React.useState<number>(800);
  // Responsive starting inset for the “card” (wider on mobile so it doesn’t look half-width)
  const [startInset, setStartInset] = React.useState<string>("inset(22% 22% 22% 22% round 28px)");

  React.useEffect(() => {
    const recompute = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setStartInset("inset(18% 12% 18% 12% round 20px)");
      } else {
        setStartInset("inset(22% 22% 22% 22% round 28px)");
      }
      setOffX(Math.round(w * 0.7));
    };
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Thinner starting card -> expand to full-bleed
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [startInset, "inset(0% 0% 0% 0% round 0px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // Text fly-off: headline LEFT, subhead RIGHT, hint RIGHT
  const titleX = useTransform(scrollYProgress, [0.12, 0.42], [0, -offX]);
  const subX   = useTransform(scrollYProgress, [0.12, 0.42], [0,  offX]);
  const hintX  = useTransform(scrollYProgress, [0.12, 0.42], [0,  offX]);

  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.35, 0.42], [1, 0.85, 0]);
  const subOpacity   = useTransform(scrollYProgress, [0.08, 0.35, 0.42], [1, 0.9,  0]);
  const hintOpacity  = useTransform(scrollYProgress, [0.10, 0.35, 0.42], [1, 0.9,  0]);

  // Keep a subtle global overlay scale so text feels like it’s part of the expansion.
  const overlayScale = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1.03, 1.03]);

  // Media motion
  const mediaScale = useTransform(scrollYProgress, [0, 0.72, 1], [0.995, 1, 1]);
  const mediaOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // NEW: Gentle black wash above video to boost text contrast (22% → 12%)
  const washOpacity = useTransform(scrollYProgress, [0, 1], [0.22, 0.12]);

  // Bottom teaser bar — visible immediately; fades out as hero releases.
  const teaserOpacity = useTransform(scrollYProgress, [0, 0.85, 0.95], [1, 1, 0]);
  const teaserY = useTransform(scrollYProgress, [0, 0.06], [0, 0]);

  // Reduced motion variants
  const maskedStyle = prefersReducedMotion
    ? {
        clipPath: "inset(0% 0% 0% 0% round 0px)" as any,
        WebkitClipPath: "inset(0% 0% 0% 0% round 0px)" as any,
      }
    : { clipPath: clipPath as any, WebkitClipPath: clipPath as any };

  const overlayStyle = prefersReducedMotion ? { opacity: 1 } : { scale: overlayScale };
  const mediaStyle = prefersReducedMotion ? { transform: "scale(1)", opacity: 1 } : { scale: mediaScale, opacity: mediaOpacity };
  const teaserStyle = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: teaserOpacity, y: teaserY };

  // Clamp subhead to avoid spill during scale
  const clamp4: React.CSSProperties & Record<string, any> = {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  // Autoplay helpers
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch { /* ignore */ }
    };
    const onLoaded = () => tryPlay();
    v.addEventListener("loadedmetadata", onLoaded);
    return () => v.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  // Keep body bg consistent until hero releases
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    document.body.style.backgroundColor = p < 1 ? "#0F1125" : "";
  });

  const scrollToAnchor = () => {
    const el = document.getElementById(anchorId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-[220vh]" aria-label="Registration confirmed">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-alluBlue-900" />

        {/* Expanding masked layer (card -> full) */}
        <motion.div className="absolute inset-0 will-change-[clip-path,transform,opacity]" style={maskedStyle}>
          {/* Video */}
          <motion.div className="absolute inset-0" style={mediaStyle}>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={videoSrc}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
            />
            {/* Existing vignette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 80% at 50% 35%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)",
              }}
            />
            {/* NEW: subtle black wash above the video/vignette */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-black"
              style={{ opacity: prefersReducedMotion ? 0.18 : washOpacity }}
            />
          </motion.div>

          {/* Overlay content — centered vertically */}
          <motion.div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6" style={overlayStyle}>
            <div className="text-center mx-auto w-full max-w-[30ch] sm:max-w-[42ch] md:max-w-3xl">
              {/* Headline: responsive sizing; flies LEFT */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight"
                style={prefersReducedMotion ? undefined : { x: titleX, opacity: titleOpacity }}
              >
                {headline}
              </motion.h1>

              {/* Subhead: responsive sizing; flies RIGHT, clamped */}
              {subhead ? (
                <motion.p
                  className="mt-3 text-sm sm:text-base md:text-lg text-white/85 mx-auto max-w-[28ch] sm:max-w-[40ch] md:max-w-[52ch] leading-snug"
                  style={prefersReducedMotion ? (clamp4 as any) : ({ x: subX, opacity: subOpacity, ...clamp4 } as any)}
                >
                  {subhead}
                </motion.p>
              ) : null}

              {/* In-video cue line — inside the video box, flies off with the text */}
              <motion.button
                type="button"
                onClick={scrollToAnchor}
                className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-semibold text-[#FFE45E] hover:text-white transition"
                style={prefersReducedMotion ? undefined : { x: hintX, opacity: hintOpacity }}
                aria-label="Scroll to VIP details"
              >
                <span className="whitespace-nowrap">Scroll down for even more greatness</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-slow" aria-hidden />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom teaser bar — centered full-width container */}
        <motion.div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-6" style={teaserStyle}>
          <button
            type="button"
            onClick={scrollToAnchor}
            className="glass-card px-5 py-3 rounded-full flex items-center gap-3 text-sm md:text-base text-white/90 hover:text-white transition
                       border-white/15 shadow-xl hover:shadow-neon-yellow/20"
            aria-label="Scroll to VIP offer"
          >
            <span className="inline-flex items-center gap-2">
              <span className="hidden sm:inline-flex uppercase tracking-extra-wide text-[0.7rem] text-white/70">
                VIP Experience below
              </span>
              <span className="sm:hidden uppercase tracking-extra-wide text-[0.7rem] text-white/70">
                VIP below
              </span>
              <span className="h-1 w-1 rounded-full bg-[#FFE45E]/80" />
              <span className="font-semibold">Click to see offer</span>
            </span>
            <span className="ml-2 rounded-full bg-[#FFE45E] text-alluBlue-900 font-bold px-3 py-1">
              $19
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}