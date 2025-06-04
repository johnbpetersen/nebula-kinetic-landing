// src/components/sections/testimonials.tsx
import React from "react";
import { MotionSection } from "../ui/motion-section";
import { TestimonialCard } from "../ui/testimonial-card";

// Define types for TestimonialCard props
interface Base {
  name: string;
  role: string;
  size?: string;
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
    content: "I came into this not knowing what to expect. This was one of, if not, the most impactful moments/weekends of my life. I received closure I never thought I would get, realized I was covering my negative emotions and when I felt them I felt as if 100 lbs was lifted off of me. Thank you, you changed my life!",
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
    content: "Last year was one of the most challenging of my life—but also a turning point. Being introduced to Alex. I’ve not only learned from incredible peers and mentors but I’ve built deep friendships, reconnected with my emotions, and regained my sense of self. On top of that, I landed a role at one of the top organizations in February—and closed out Q1 at 1084%, a lot of this is based on what I’ve learned in Alluviance.",
    name: "Matt Rangel",
    role: "Account Executive • Samsara",
    image: undefined, // No headshot
  },
  {
    content: "This was a life changing experience, I don’t think I would have ever given myself, or had the strength, to do it otherwise. This community makes me strong. It makes me feel safe. It is my home. These weekends keep me going deeper, closer to my truest self.",
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
    content: "I came to the Alluviance immersion expecting to expand my sales network and embrace the unexpected. What I left with was far more powerful- a deeper understanding of who I am, what I’m truly worth, and a sense of belonging to a unique, purpose-driven community. Most importantly, I reconnected with the importance of just being me. Since then, I’ve stepped into my leadership role with renewed confidence, welcomed new opportunities beyond it, built an amazing relationship, and let go of anything that no longer serves me.",
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
    content: "I look at Alluviance as an investment, not a cost. I’ve stepped into a greater level of purpose in my life, and plus my comp has already increased enough to pay back that investment in less than 2 months - but that’s just the beginning. What I’m learning and how I’m growing are things I’ll carry with me for the rest of my life.",
    name: "Bobby Lukeman",
    role: "VP of Sales • Brex",
    image: "https://alluviance.s3.us-east-2.amazonaws.com/images/headshot-bobby-lukeman.webp",
  },
];

export const Testimonials = () => (
  <MotionSection id="social-proof" className="bg-alluBlue-800 py-32">
    <div className="section-container">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">
        What Happens When Sellers <span className="block">Master Their Inner Game</span>
      </h2>

      {/* Masonry-like grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr auto-flow-dense">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  </MotionSection>
);