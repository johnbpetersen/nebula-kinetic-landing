// src/components/ui/video-player.tsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface PlayerProps {
  /** optional utility classes so the parent can set its own max‑w / w‑full */
  className?: string;
}

export const VideoPlayer: React.FC<PlayerProps> = ({ className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  /* ── tilt effect, disabled once the user hits play ────────────── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isPlaying) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const rotateY = ((e.clientX - centerX) / (width / 2)) * 3;
    const rotateX = ((centerY - e.clientY) / (height / 2)) * 3;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => setRotation({ x: 0, y: 0 });

  /* ── S3 asset prefix ──────────────────────────────────────────── */
  const S3 = "https://alluviance.s3.us-east-2.amazonaws.com";

  return (
    <div
      ref={cardRef}
      className={`relative w-full min-w-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <motion.div
        className="glass-card overflow-hidden"
        animate={{ rotateX: isPlaying ? 0 : rotation.x, rotateY: isPlaying ? 0 : rotation.y }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* fixed aspect-ratio wrapper ensures no re-flow */}
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
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              width="672"
              height="378"
            >
              <source src={`${S3}/videos/Alex-Kremer-Masterclass-VSL-Optimized.mp4`} type="video/mp4" />
              <p>Your browser does not support the video tag.</p>
            </video>
          </picture>
        </div>
      </motion.div>
    </div>
  );
};