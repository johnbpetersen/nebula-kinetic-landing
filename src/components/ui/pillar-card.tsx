import React from "react";
import { motion } from "framer-motion";

/* lucide‑react icon type */
type LucideIcon = (props: { size?: number; className?: string }) => JSX.Element;

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export const PillarCard = ({
  icon: Icon,
  title,
  description,
  index = 0,
}: PillarCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    className="relative"
  >
    <div
      className="group p-8 h-full rounded-2xl backdrop-blur-md bg-white/10 shadow-lg
                 transition-shadow duration-300 hover:shadow-2xl overflow-hidden"
    >
      {/* gradient bloom */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-yellow/10 via-alluBlue-500/25 to-alluBlue-800/25 blur-lg" />
      </div>

      <Icon size={48} className="text-neon-yellow mb-6 mx-auto" aria-hidden />
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      <p className="text-gray-100 text-center">{description}</p>
    </div>
  </motion.div>
);