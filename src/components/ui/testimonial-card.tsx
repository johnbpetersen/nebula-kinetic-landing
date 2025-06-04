// src/components/ui/testimonial-card.tsx
import React, { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface Base {
  name: string;
  role: string;
  size?: string;
}

interface VideoTile extends Base {
  video: string;
  imageDesktop: string;
  imageMobile: string;
  content?: never;
}

interface QuoteTile extends Base {
  content: string;
  image?: string;
  video?: never;
}

type Props = VideoTile | QuoteTile;

export const TestimonialCard = (props: Props) => {
  const colSpanClass = props.size || "";

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /* ─────────────────────────────  VIDEO TILE  ───────────────────────────── */
  if ("video" in props) {
    const videoProps = props as VideoTile;
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
      videoRef.current?.play();
      setIsPlaying(true);
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative rounded-2xl overflow-hidden cursor-pointer group ${colSpanClass}
                    bg-alluBlue-700 shadow-xl hover:shadow-neon-yellow/30
                    transition-shadow duration-300 ease-in-out`}
      >
        {/* fixed‑ratio wrapper so the row never collapses */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            poster={videoProps.imageMobile}
            controls
            onClick={handlePlay}
            onPlay={() => setIsPlaying(true)}
          >
            <source src={videoProps.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* play‑button overlay (disappears when playing) */}
        {!isPlaying && (
          <div
            onClick={handlePlay}
            className="absolute inset-0 flex flex-col items-center justify-center
                       transition-colors duration-300"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center p-4 bg-black/40
                         group-hover:bg-black/60 rounded-full backdrop-blur-sm
                         transition-all duration-300"
            >
              <Play
                size={48}
                className="text-neon-yellow drop-shadow-[0_0_8px_rgba(255,228,94,0.8)]"
              />
            </motion.div>
            <p className="text-lg font-bold text-white mt-4 text-center">
              Watch Testimonial
            </p>
          </div>
        )}

        {/* bottom gradient mask (always flush with bottom, extended higher) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32
                        bg-gradient-to-t from-black/95 to-transparent" />

        {/* name + role (lifted up 64 px) */}
        <div className="absolute inset-x-0 bottom-16 px-4 pb-6">
          <p className="text-sm md:text-base font-semibold text-white">
            {videoProps.name}
          </p>
          <p className="text-xs md:text-sm text-white/70">{videoProps.role}</p>
        </div>
      </motion.div>
    );
  }

  /* ─────────────────────────────  QUOTE TILE  ───────────────────────────── */
  const quoteProps = props as QuoteTile;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`p-6 flex flex-col justify-between rounded-2xl cursor-pointer
                  ${colSpanClass}
                  bg-white/5 backdrop-filter backdrop-blur-lg
                  border border-white/10
                  hover:border-neon-yellow/50 hover:shadow-lg hover:shadow-neon-yellow/20
                  transition-all duration-300 ease-in-out`}
    >
      <p className="italic opacity-80 mb-6 text-sm md:text-base">
        “{quoteProps.content}”
      </p>

      <div className="flex items-center gap-3 mt-auto">
        {quoteProps.image && (
          <img
            src={quoteProps.image}
            alt={quoteProps.name}
            width={48}
            height={48}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover border border-neon-yellow/30 shadow-md"
          />
        )}
        <div>
          <p className="text-sm font-semibold">{quoteProps.name}</p>
          <p className="text-xs opacity-60">{quoteProps.role}</p>
        </div>
      </div>
    </motion.div>
  );
};