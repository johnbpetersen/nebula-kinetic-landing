import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const VideoPlayer = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate rotation (max 3 degrees)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 3;

    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full max-w-2xl mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <motion.div
        className="glass-card overflow-hidden"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="aspect-video relative">
          <video
            className="w-full h-full object-cover rounded-3xl"
            poster="/assets/images/alex-kremer-masterclass-thumbnail.png"
            controls
            aria-label="Inner Game Masterclass Video"
          >
            <source src="/public/assets/videos/vsl.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </div>
  );
};