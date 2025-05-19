import React from "react";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "../ui/motion-section";
import { CountdownTimer } from "../ui/countdown-timer";

interface CountdownProps {
  targetDate: Date;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  return (
    <MotionSection className="bg-alluBlue-900">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Secure Your Spot</h2>

        <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">
          Join us on June 25th at 10AM EDT for this transformative webinar. Limited spots available.
        </p>

        <div className="mb-12">
          <CountdownTimer targetDate={targetDate} />
        </div>

        <button className="btn-primary relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-2">
            Register Free Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 w-full transform translate-x-[-100%] bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-[100%] transition-transform duration-1000"></span>
        </button>
      </div>
    </MotionSection>
  );
};