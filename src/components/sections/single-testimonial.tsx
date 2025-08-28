// src/components/sections/single-testimonial.tsx
// Purpose: Renders a single testimonial section with animated quote reveal, user details, and branding watermark.
// Dependencies: React, framer-motion (motion), MotionSection
// Last Updated: August 25, 2025

import React from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";

// Testimonial metadata (consider externalizing to config/CMS)
const name = "Retzio Gredig";
const title = "Account Executive, Datadog";
const imageDesktop = "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-immersion-3-desktop.webp";
const imageMobile = "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-immersion-3-mobile.webp";
const watermark = "https://alluviance.s3.us-east-2.amazonaws.com/images/alluviance-watermark.webp";

// Story fragments for staggered reveal
const quoteParts = [
  "I was at 1% of my yearly quota at the June immersion...",
  "Came back with a week left in the quarter and hit the entire quarter number that week...",
  "In Q3 I closed our team’s ",
  "Finished the year at ",
  "And became the #1 AE at Datadog.",
];

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.25, ease: "easeOut" },
  }),
};
const pulseVariants = {
  hidden: { scale: 1, opacity: 1 },
  visible: {
    scale: [1, 1.2, 1.05, 1.1, 1],
    opacity: [1, 1, 1, 1, 1],
    transition: { duration: 1.5, ease: "easeOut", delay: 1.5, times: [0, 0.2, 0.4, 0.6, 1] },
  },
};
const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay: 1.5, ease: "easeOut" } },
};

export const SingleTestimonial: React.FC = () => {
  return (
    <MotionSection
      id="retzio"
      className="relative min-h-[650px] flex items-center justify-center overflow-hidden bg-alluBlue-900"
    >
      {/* Background testimonial image */}
      <picture className="absolute inset-0 w-full h-full object-cover object-center opacity-45 lg:opacity-55" aria-hidden>
        <source media="(max-width: 768px)" srcSet={imageMobile} type="image/webp" />
        <source srcSet={imageDesktop} type="image/webp" />
        <img
          src={imageMobile}
          alt="Retzio Gredig at Alluviance Immersion"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </picture>

      {/* Vignette overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-10" aria-hidden />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23fff' stroke-opacity='.04'%3E%3Cpath d='M0 0h160v160H0z'/%3E%3C/g%3E%3C/svg%3E)",
        }}
        aria-hidden
      />

      {/* Testimonial content */}
      <div className="relative z-20 max-w-5xl px-6 text-center">
        <motion.div className="relative p-8 rounded-2xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden">
          {/* Card background fade-in */}
          <motion.div
            className="absolute inset-0 bg-alluBlue-900/50 z-0"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            aria-hidden
          />

          {/* Staggered quote reveal */}
          <motion.blockquote className="text-2xl md:text-3xl font-medium text-gray-100 leading-relaxed italic relative z-10">
            {quoteParts.map((part, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={textVariants}
                className="block mb-3 last:mb-0"
              >
                {index === 0 && <span className="inline mr-1">“</span>}
                {index === 2 ? (
                  <>{part}<span className="text-gradient font-semibold">largest deal ever</span></>
                ) : index === 3 ? (
                  <>{part}<motion.span
                    className="text-neon-yellow text-4xl md:text-5xl font-extrabold [text-shadow:_0_0_10px_rgba(251,191,36,0.7)]"
                    variants={pulseVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >267%</motion.span></>
                ) : (
                  part
                )}
                {index === quoteParts.length - 1 && <span className="inline ml-1">”</span>}
              </motion.span>
            ))}
          </motion.blockquote>

          {/* Decorative divider */}
          <motion.hr
            className="mt-6 mx-auto w-32 h-[2px] bg-gradient-to-r from-transparent via-alluBlue-400 to-transparent border-none"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.25 }}
            aria-hidden
          />

          {/* Author credit */}
          <motion.p
            className="mt-4 text-base md:text-lg font-medium text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {name} — {title}
          </motion.p>
        </motion.div>

        {/* Alluviance watermark */}
        <picture aria-hidden>
          <source srcSet={watermark} type="image/webp" />
          <img
            src={watermark}
            alt="Alluviance Watermark"
            className="absolute bottom-4 right-10 w-24 h-auto opacity-20 z-20"
            width={96}
            height={54}
          />
        </picture>
      </div>
    </MotionSection>
  );
};