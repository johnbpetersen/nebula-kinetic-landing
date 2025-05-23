import React from "react";
import { motion } from "framer-motion";

interface PillarCardProps {
  icon: React.ReactNode; // Changed from string to React.ReactNode
  title: string;
  description: string;
  index?: number;
}

export const PillarCard = ({
  icon,
  title,
  description,
  index = 0,
}: PillarCardProps) => (
  <motion.div
    className={`group relative p-8 h-full rounded-2xl backdrop-blur-md bg-white/10 shadow-lg
      transition-transform duration-300 hover:-translate-y-2`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
  >
    {/* gradient glow on hover */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-yellow/10 via-alluBlue-500/20 to-alluBlue-900/30 blur-sm" />
    </div>

    <div className="w-12 h-12 mb-6 mx-auto flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
    <p className="text-gray-200 text-center">{description}</p>
  </motion.div>
);