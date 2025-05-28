import React from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";

// Testimonial data
const name = "Retzio Gredig";
const title = "Account Executive, Datadog";
const bg = "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-immersion.jpg";

// Quote parts for storytelling
const quoteParts = [
  "I was at 1% of my yearly quota at the June immersion...",
  "Came back with a week left in the quarter and hit the entire quarter number that week...",
  "In Q3 I closed our team’s ",
  "Finished the year at ",
  "And became the #1 AE at Datadog.",
];

// Animation variants for staggered text
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.25 },
  }),
};

// Pulse animation for "267%"
const pulseVariants = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, repeat: Infinity, delay: 1.5 },
  },
};

export const SingleTestimonial = () => (
  <MotionSection
    id="retzio"
    className="relative min-h-[650px] flex items-center justify-center overflow-hidden bg-alluBlue-900"
  >
    {/* Background Image */}
    <img
      src={bg}
      alt="Retzio Gredig at Alluviance Immersion"
      className="absolute inset-0 w-full h-full object-cover object-center opacity-40 lg:opacity-50"
    />

    {/* Vignette Overlay with Pulsating Glow */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-alluBlue-900/50 to-black/80 z-10">
      <div className="absolute inset-0 bg-alluBlue-600/10 animate-pulse-slow" />
    </div>

    {/* Noise Texture */}
    <div
      className="absolute inset-0 mix-blend-overlay pointer-events-none"
      style={{
        backgroundImage:
          "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23fff' stroke-opacity='.04'%3E%3Cpath d='M0 0h160v160H0z'/%3E%3C/g%3E%3C/svg%3E)",
      }}
    />

    {/* Content */}
    <div className="relative z-20 max-w-4xl px-6 text-center">
      <motion.div
        className="relative bg-alluBlue-950/50 card-bg-transparent p-8 rounded-2xl border border-alluBlue-600/30 shadow-lg shadow-alluBlue-600/10 edge-glow"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* SVG Quotation Mark */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-20 z-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neon-yellow [filter:_drop-shadow(0_0_8px_rgba(251,191,36,0.5))]"
          >
            <path
              d="M10 7L6 11H8V17H2V11L6 7H10ZM22 7L18 11H20V17H14V11L18 7H22Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <motion.blockquote className="text-2xl md:text-3xl font-medium text-gray-100 leading-relaxed italic">
          {quoteParts.map((part, index) => (
            <motion.span
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              className="block mb-3 last:mb-0"
            >
              {index === 2 ? (
                <>
                  {part}
                  <span className="text-gradient-subtle font-semibold [text-shadow:_0_0_8px_rgba(96,116,255,0.5)]">
                    largest deal ever
                  </span>
                </>
              ) : index === 3 ? (
                <>
                  {part}
                  <motion.span
                    className="text-neon-yellow text-4xl md:text-5xl font-extrabold [text-shadow:_0_0_10px_rgba(251,191,36,0.7)]"
                    variants={pulseVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    267%
                  </motion.span>
                </>
              ) : (
                part
              )}
            </motion.span>
          ))}
        </motion.blockquote>

        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="mt-6 mx-auto w-32 border-none h-[2px] bg-gradient-to-r from-transparent via-alluBlue-400 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-4 text-base md:text-lg font-medium text-gray-300"
        >
          {name} — {title}
        </motion.p>
      </motion.div>

      {/* Alluviance Watermark */}
      <div className="absolute bottom-4 right-4 text-gray-500/50 text-sm font-semibold z-20">
        Alluviance
      </div>
    </div>
  </MotionSection>
);