// src/components/sections/testimonials.tsx
// Purpose: Renders the social proof section with a grid of testimonial cards (video and quote variants).
// Dependencies: React, MotionSection, TestimonialCard
// Last Updated: June 17, 2025

import React from "react";
import { MotionSection } from "../ui/motion-section";
import { TestimonialCard } from "../ui/testimonial-card";

// Define types for TestimonialCard props
interface Base {
  name: string;
  role: string;
  size?: string; // SUGGESTION: Restrict to a union (e.g., 'col-span-2' | undefined) for stricter typing
}

interface VideoTile extends Base {
  video: string;
  imageDesktop: string;
  imageMobile: string;
  content?: never;
}

interface QuoteTile extends Base {
  content: string;
  image?: string; // Single image URL
  video?: never;
}

type TestimonialProps = VideoTile | QuoteTile;

// SUGGESTION: Move testimonial data to a separate config or CMS-driven source (e.g., src/config/testimonials.ts)
const TESTIMONIALS: TestimonialProps[] = [
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/kat-shuchuk.mp4",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/kat-shuchuk-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/kat-shuchuk-mobile.webp",
    name: "Kat Shuchuk",
    role: "Account Executive • 6sense",
    size: "col-span-2",
  },
  {
    content: "I came into this not knowing what to expect... Thank you, you changed my life!",
    name: "Alex Min",
    role: "Account Executive • Salesforce",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/headshot-alex-min.webp",
  },
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/hank-wells.mp4",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/hank-wells-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/hank-wells-mobile.webp",
    name: "Hank Wells",
    role: "Senior Account Executive • Saleo",
  },
  {
    content: "Last year was one of the most challenging of my life—but also a turning point...",
    name: "Matt Rangel",
    role: "Account Executive • Samsara",
    image: undefined, // No headshot; SUGGESTION: Omit `image` property instead of `undefined`
  },
  {
    content: "This was a life changing experience... These weekends keep me going deeper, closer to my truest self.",
    name: "Kaycie Noble",
    role: "Account Executive • Gong",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/headshot-kaycie-noble.webp",
  },
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/retzio-gredig.mp4",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-gredig-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-gredig-mobile.webp",
    name: "Retzio Gredig",
    role: "Account Executive • Datadog",
    size: "col-span-2",
  },
  {
    content: "I came to the Alluviance immersion expecting to expand my sales network...",
    name: "Lauren Slutsky",
    role: "Senior Sales Manager • Gartner",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/headshot-lauren-slutsky.webp",
  },
  {
    video: "https://alluviance.s3.us-east-2.amazonaws.com/videos/sunny-nelson.mp4",
    imageDesktop: "https://alluviance.s3.us-east-2.amazonaws.com/images/sunny-nelson-desktop.webp",
    imageMobile: "https://alluviance.s3.us-east-2.amazonaws.com/images/sunny-nelson-mobile.webp",
    name: "Sunny Nelson",
    role: "Senior Account Executive • AWS",
    size: "col-span-2",
  },
  {
    content: "I look at Alluviance as an investment, not a cost...",
    name: "Bobby Lukeman",
    role: "VP of Sales • Brex",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/headshot-bobby-lukeman.webp",
  },
];

export const Testimonials: React.FC = () => (
  <MotionSection
    id="social-proof"
    className="bg-alluBlue-800 py-32 hidden sm:block" // SUGGESTION: Ensure mobile fallback (MobileTestimonials) covers hidden state
  >
    <div className="section-container">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
        What Happens When Sellers <span className="block">Master Their Inner Game</span>
      </h2>

      {/* Masonry-like responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr auto-flow-dense">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={t.name + (t.video ?? t.content)} // SUGGESTION: Use unique combination instead of index
            {...t}
          />
        ))}
      </div>
    </div>
  </MotionSection>
);
