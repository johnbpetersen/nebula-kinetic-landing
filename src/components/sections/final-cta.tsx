import React from "react";
import { MotionSection } from "../ui/motion-section";

export const FinalCTA = () => {
  return (
    <MotionSection className="bg-alluBlue-800">
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Master The Inner Game?</h2>
        <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">
          Join hundreds of sales professionals who have transformed their results through the power of psychology and
          authentic connection.
        </p>

        <button className="btn-primary text-lg px-10 py-4">Register For The Free Webinar</button>
      </div>
    </MotionSection>
  );
};