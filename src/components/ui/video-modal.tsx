import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  videoSrc: string;
  onClose: () => void;
}

export const VideoModal = ({ videoSrc, onClose }: VideoModalProps) => (
  <motion.div
    className="fixed inset-0 bg-alluBlue-900/90 backdrop-blur-sm z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="relative w-full max-w-3xl p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-neon-yellow hover:text-white"
      >
        <X size={24} />
      </button>
      <video
        src={videoSrc}
        controls
        autoPlay
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  </motion.div>
);