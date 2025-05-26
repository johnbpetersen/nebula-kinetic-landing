// src/components/sections/testimonials.tsx
import React from "react";
import { MotionSection } from "../ui/motion-section";
import { TestimonialCard } from "../ui/testimonial-card";

const TESTIMONIALS = [
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/kat-shuchuk.mp4",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/kat-shuchuk.png",
    name: "Kat Shuchuk",
    role: "Account Executive • 6sense",
    size: "col-span-2", // This will make it wider
    // Add a category like 'video' to differentiate, or rely on 'video' key existing
  },
  {
    content: "Last year was one of the most challenging of my life—but also a turning point. Being introduced to Alex. I’ve not only learned from incredible peers and mentors but I’ve built deep friendships, reconnected with my emotions, and regained my sense of self. On top of that, I landed a role at one of the top organizations in February—and closed out Q1 at 1084%, a lot of this is based on what I’ve learned in Alluviance.",
    name: "Matt Rangel",
    role: "Account Executive • Samsara",
    image: "/assets/images/carlos.jpg",
  },
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/daniel-berry.mp4",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/daniel-berry.png",
    name: "Daniel Berry",
    role: "Business Development Manager • Microsoft",
  },
  {
    content: "I came into this not knowing what to expect. This was one of, if not, the most impactful moments/weekends of my life. I received closure I never thought I would get, realized I was covering my negative emotions and when I felt them I felt as if 100 lbs was lifted off of me. Thank you, you changed my life!",
    name: "Alex Min",
    role: "Account Executive • Salesforce",
    image: "/assets/images/carlos.jpg",
  },
  {
    content: "This was a life changing experience, I don’t think I would have ever given myself, or had the strength, to do it otherwise. This community makes me strong. It makes me feel safe. It is my home. These weekends keep me going deeper, closer to my truest self.",
    name: "Kaycie Noble",
    role: "Account Executive • Gong",
  },
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/retzio-gredig.mp4",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-gredig.png",
    name: "Retzio Gredig",
    role: "Account Executive • Datadog",
    size: "col-span-2", // Make this one wider too
  },
  {
    content: "I came to the Alluviance immersion expecting to expand my sales network and embrace the unexpected. What I left with was far more powerful- a deeper understanding of who I am, what I’m truly worth, and a sense of belonging to a unique, purpose-driven community. Most importantly, I reconnected with the importance of just being me. Since then, I’ve stepped into my leadership role with renewed confidence, welcomed new opportunities beyond it, built an amazing relationship, and let go of anything that no longer serves me.",
    name: "Lauren Slutsky",
    role: "Senior Sales Manager • Gartner",
    image: "/assets/images/carlos.jpg",
  },
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/sunny-nelson.mp4",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/sunny-nelson.png",
    name: "Sunny Nelson",
    role: "Senior Account Executive • AWS",
    size: "col-span-2", // Adding another wide video card for more visual interest
  },
  {
    content: "I look at Alluviance as an investment, not a cost. I’ve stepped into a greater level of purpose in my life, and plus my comp has already increased enough to pay back that investment in less than 2 months - but that’s just the beginning.What I’m learning and how I’m growing are things I’ll carry with me for the rest of my life.",
    name: "Bobby Lukeman",
    role: "VP of Sales • Brex",
    image: "/assets/images/carlos.jpg",
  },
];

export const Testimonials = () => (
  <MotionSection id="social-proof" className="bg-alluBlue-800 py-32">
    <div className="section-container">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
      What Happens When Sellers <span className="block">Master Their Inner Game</span>
      </h2>

      {/* Masonry-like grid using dense flow and responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr auto-flow-dense">
        {TESTIMONIALS.map((t, i) => (
          // Pass the 'size' prop down
          <TestimonialCard key={i} {...(t as any)} />
        ))}
      </div>
    </div>
  </MotionSection>
);