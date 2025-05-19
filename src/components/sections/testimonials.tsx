import React from "react";
import { MotionSection } from "../ui/motion-section";
import { TestimonialCard } from "../ui/testimonial-card";

const testimonials = [
  {
    content: "This webinar completely transformed my approach to sales. I'm closing 40% more deals with half the stress.",
    name: "Sarah Johnson",
    role: "Sales Director, TechCorp",
    image: "/public/assets/images/testimonial1.jpg",
  },
  {
    content: "The psychological insights were game-changing for my team. We've improved conversion rates across the board.",
    name: "Michael Chen",
    role: "VP Sales, GrowthFirst",
    image: "/public/assets/images/testimonial2.jpg",
  },
  {
    content: "Finally, a sales training that focuses on authenticity rather than tricks. My clients can feel the difference.",
    name: "Jessica Miller",
    role: "Independent Consultant",
    image: "/public/assets/images/testimonial3.jpg",
  },
];

export const Testimonials = () => {
  return (
    <MotionSection className="bg-alluBlue-800">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Sales Leaders Are Saying</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};