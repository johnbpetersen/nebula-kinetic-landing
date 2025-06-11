import React, { useState, useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface Base { name: string; role: string; size?: string }
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
  const colSpanClass = props.size ?? "";

  const cardVariants = {
    hidden : { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0,
               transition: { duration: 0.6, ease: "easeOut" } }
  };

  /* ───────────────────────── VIDEO TILE ───────────────────────── */
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
        className={`relative w-full rounded-2xl overflow-hidden cursor-pointer group
                    bg-alluBlue-700 shadow-xl hover:shadow-neon-yellow/30
                    transition-shadow duration-300 ease-in-out
                    ${colSpanClass}`}
      >
        {/* 9:16 on mobile, 16:9 ≥sm */}
        <div className="w-full aspect-[9/16] sm:aspect-video">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover
                       transition-transform duration-500 group-hover:scale-105"
            poster={videoProps.imageMobile}
            controls={isPlaying}
            playsInline
            onClick={handlePlay}
            onPlay={() => setIsPlaying(true)}
          >
            <source src={videoProps.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* yellow play badge */}
        {!isPlaying && (
          <div onClick={handlePlay}
               className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1,  opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center p-4 bg-black/40
                         group-hover:bg-black/60 rounded-full backdrop-blur-sm
                         transition-all duration-300">
              <Play size={48}
                    className="text-neon-yellow drop-shadow-[0_0_8px_rgba(255,228,94,0.8)]" />
            </motion.div>
            {/* caption hidden on mobile */}
            <p className="mt-4 text-lg font-bold text-white hidden sm:block">
              Watch Testimonial
            </p>
          </div>
        )}

        {/* bottom gradient mask */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24
                        bg-gradient-to-t from-black/95 to-transparent" />

        {/* ── NAME & ROLE  (now flush w/ bottom) ── */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-6">
          <p className="text-sm sm:text-base font-semibold text-white">
            {videoProps.name}
          </p>
          <p className="text-xs sm:text-sm text-white/70">
            {videoProps.role}
          </p>
        </div>
      </motion.div>
    );
  }

  /* ───────────────────────── QUOTE TILE ───────────────────────── */
  const quote = props as QuoteTile;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-full p-6 flex flex-col justify-between rounded-2xl
                  cursor-pointer ${colSpanClass}
                  bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10
                  hover:border-neon-yellow/50 hover:shadow-lg hover:shadow-neon-yellow/20
                  transition-all duration-300 ease-in-out`}
    >
      <p className="italic opacity-80 mb-6 text-sm sm:text-base">
        “{quote.content}”
      </p>

      <div className="flex items-center gap-3 mt-auto">
        {quote.image && (
          <img
            src={quote.image}
            alt={quote.name}
            width={48} height={48}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover
                       border border-neon-yellow/30 shadow-md"
          />
        )}
        <div>
          <p className="text-sm font-semibold">{quote.name}</p>
          <p className="text-xs opacity-60">{quote.role}</p>
        </div>
      </div>
    </motion.div>
  );
};