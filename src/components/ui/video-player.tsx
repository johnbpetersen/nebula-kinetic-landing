// src/components/ui/video-player.tsx
// Purpose: Displays a responsive 16:9 video player with tilt interaction when not playing, used in the hero section for the VSL thumbnail/video.
// Dependencies: React, framer-motion (motion)
// Last Updated: June 17, 2025

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface PlayerProps {
  /** Optional additional CSS classes for container */
  className?: string;
}

// Base URL for S3 assets; SUGGESTION: Move to config or environment variable
const S3 = "https://alluviance.s3.us-east-2.amazonaws.com";

export const VideoPlayer: React.FC<PlayerProps> = ({ className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null); // container for tilt effect
  const videoRef = useRef<HTMLVideoElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  // Section: Calculate tilt based on mouse position relative to card center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isPlaying) return; // disable tilt when playing
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    setRotation({
      x: ((cy - e.clientY) / (height / 2)) * 3, // max tilt 3deg
      y: ((e.clientX - cx) / (width / 2)) * 3,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full min-w-0 ${className}`}
      onMouseMove={handleMouseMove}               // dynamic tilt
      onMouseLeave={() => setRotation({ x: 0, y: 0 })} // reset on leave
    >
      <motion.div
        className="glass-card overflow-hidden"
        animate={{
          // reset rotation when playing
          rotateX: isPlaying ? 0 : rotation.x,
          rotateY: isPlaying ? 0 : rotation.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* 16:9 aspect ratio wrapper to prevent CLS */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={`${S3}/images/vsl-thumbnail-mobile.webp`}
              type="image/webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet={`${S3}/images/vsl-thumbnail-desktop.webp`}
              type="image/webp"
            />
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              poster={`${S3}/images/vsl-thumbnail-mobile.webp`}
              controls                             // always visible for accessibility
              width={672}
              height={378}
              onPlay={() => setIsPlaying(true)}    // track play state
              onPause={() => setIsPlaying(false)}  // track pause state
            >
              {/* Main video source */}
              <source
                src={`${S3}/videos/Alex-Kremer-Masterclass-VSL-Optimized.mp4`}
                type="video/mp4"
              />
              {/* Fallback text */}
              Your browser does not support the video tag.
            </video>
          </picture>
        </div>
      </motion.div>
    </div>
  );
};