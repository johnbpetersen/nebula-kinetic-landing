// src/components/ui/testimonial-card.tsx
import React from "react";
import { Play } from "lucide-react";
import { GlassCard } from "./glass-card"; // Assuming GlassCard provides the base glass effect
import { motion } from "framer-motion"; // Import motion

interface Base {
  name: string;
  role: string;
  size?: string; // Add size prop for col-span/row-span
}

/* === Video tile ============================================ */
interface VideoTile extends Base {
  video: string; // mp4 or external link
  image: string; // poster thumbnail
  content?: never;
}

/* === Quote tile ============================================ */
interface QuoteTile extends Base {
  content: string;
  image?: string; // optional headshot
  video?: never;
}

type Props = VideoTile | QuoteTile;

/* ——————————————————————————————————————————————— */
export const TestimonialCard = (props: Props) => {
  // Apply size prop directly to the card container
  const colSpanClass = props.size || ""; // Defaults to empty string if no size is provided

  /* ANIMATION VARIANTS (for subtle entrance) */
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  /* VIDEO TILE */
  if ("video" in props) {
    return (
      <motion.div
        className={`relative rounded-2xl overflow-hidden cursor-pointer group ${colSpanClass}
          bg-alluBlue-700 shadow-xl
          hover:shadow-neon-yellow/30 transition-shadow duration-300 ease-in-out
          `}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }} // Subtle lift on hover
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Play button overlay */}
        <a
          href={props.video}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-300"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center p-4 bg-neon-yellow/20 rounded-full backdrop-blur-sm
                       group-hover:bg-neon-yellow/40 transition-all duration-300"
          >
            <Play size={48} className="text-neon-yellow drop-shadow-[0_0_8px_rgba(255,228,94,0.8)]" />
          </motion.div>
          <p className="text-lg font-bold text-white mt-4 text-center">Watch Testimonial</p>
        </a>

        {/* Name and role at the bottom, with a gradient */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 pb-6">
          <p className="text-sm md:text-base font-semibold text-white">{props.name}</p>
          <p className="text-xs md:text-sm text-white/70">{props.role}</p>
        </div>
      </motion.div>
    );
  }

  /* QUOTE TILE */
  return (
    <motion.div
      className={`p-6 flex flex-col justify-between rounded-2xl cursor-pointer ${colSpanClass}
        bg-white/5 backdrop-filter backdrop-blur-lg border border-white/10
        hover:border-neon-yellow/50 hover:shadow-lg hover:shadow-neon-yellow/20 transition-all duration-300 ease-in-out`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5 }} // Subtle lift on hover
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <p className="italic opacity-80 mb-6 text-sm md:text-base">“{props.content}”</p>
      <div className="flex items-center gap-3 mt-auto"> {/* mt-auto pushes content to bottom */}
        {props.image && (
          <img
            src={props.image}
            alt={props.name}
            className="w-12 h-12 rounded-full object-cover border border-neon-yellow/30 shadow-md"
          />
        )}
        <div>
          <p className="text-sm font-semibold">{props.name}</p>
          <p className="text-xs opacity-60">{props.role}</p>
        </div>
      </div>
    </motion.div>
  );
};