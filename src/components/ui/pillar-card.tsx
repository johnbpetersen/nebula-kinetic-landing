import React from "react";
import { motion } from "framer-motion";

interface PillarCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export const PillarCard = ({ icon, title, description, index }: PillarCardProps) => {
  return (
    <motion.div
      className="glass-card p-8 h-full transition-all hover:translate-y-[-5px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <img src={icon} alt={title} className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </motion.div>
  );
};