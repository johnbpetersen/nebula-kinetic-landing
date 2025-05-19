import React from "react";
import { MotionSection } from "../ui/motion-section";
import { PillarCard } from "../ui/pillar-card";

const pillars = [
  {
    icon: "/public/assets/images/icon-mindset.svg",
    title: "Mindset Mastery",
    description: "Overcome limiting beliefs and develop the psychological foundations for sales success.",
  },
  {
    icon: "/public/assets/images/icon-connection.svg",
    title: "Authentic Connection",
    description: "Build genuine rapport that makes prospects feel understood and valued.",
  },
  {
    icon: "/public/assets/images/icon-close.svg",
    title: "Effortless Closing",
    description: "Guide conversations to natural conclusions without pressure or manipulation.",
  },
];

export const Pillars = () => {
  return (
    <MotionSection className="bg-alluBlue-800">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">The Three Pillars of Sales Mastery</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} index={index} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};