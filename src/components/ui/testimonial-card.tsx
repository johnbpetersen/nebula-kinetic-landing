import React from "react";
import { GlassCard } from "./glass-card";

interface TestimonialCardProps {
  content: string;
  name: string;
  role: string;
  image?: string;
  className?: string;
}

export const TestimonialCard = ({ content, name, role, image, className = "" }: TestimonialCardProps) => {
  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex gap-3 items-center mb-4">
        {image && (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm opacity-70">{role}</p>
        </div>
      </div>
      <p className="italic opacity-80">“{content}”</p>
    </GlassCard>
  );
};