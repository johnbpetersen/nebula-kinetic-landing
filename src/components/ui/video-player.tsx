// src/components/ui/video-player.tsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface PlayerProps { className?: string }

const S3 = "https://alluviance.s3.us-east-2.amazonaws.com";
const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

export const VideoPlayer: React.FC<PlayerProps> = ({ className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [rotation, setRotation]   = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(!isMobile());  // desktop = true, mobile = lazy

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isPlaying) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    setRotation({
      x: ((centerY - e.clientY) / (height / 2)) * 3,
      y: ((e.clientX - centerX) / (width / 2)) * 3,
    });
  };

  /* tap on mobile swaps img ➜ video */
  const handleStart = () => {
    if (!showVideo) setShowVideo(true);
    else if (videoRef.current) videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full min-w-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
    >
      <motion.div
        className="glass-card overflow-hidden"
        animate={{ rotateX: isPlaying ? 0 : rotation.x, rotateY: isPlaying ? 0 : rotation.y }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* 16 : 9 aspect-ratio wrapper */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          {showVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              poster={`${S3}/images/vsl-thumbnail-mobile.webp`}
              controls
              width="672"
              height="378"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              {...({ loading: "lazy" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
            >
              <source src={`${S3}/videos/Alex-Kremer-Masterclass-VSL-Optimized.webm`} type="video/webm" />
              <source src={`${S3}/videos/Alex-Kremer-Masterclass-VSL-Optimized.mp4`} type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>
          ) : (
            <>
              <img
                src={`${S3}/images/vsl-thumbnail-mobile.webp`}
                alt="Masterclass preview"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                width="672" height="378" loading="lazy"
              />
              {/* play button overlay */}
              <button
                onClick={handleStart}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm hover:bg-black/50 transition"
              >
                <Play size={64} className="text-neon-yellow drop-shadow-[0_0_8px_rgba(255,228,94,0.9)]" />
                <span className="sr-only">Play video</span>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};