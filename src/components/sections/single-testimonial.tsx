// src/components/sections/single-testimonial.tsx
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { MotionSection } from "../ui/motion-section.tsx";

// Testimonial data
const name = "Retzio Gredig";
const title = "Account Executive, Datadog";
const imageDesktop = "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-immersion-3-desktop.webp";
const imageMobile = "https://alluviance.s3.us-east-2.amazonaws.com/images/retzio-immersion-3-mobile.webp";
const watermark = "/assets/images/alluviance-watermark.png";

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
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.25, ease: "easeOut" },
  }),
};

// Pulse animation for "267%"
const pulseVariants = {
  hidden: { scale: 1, opacity: 1 },
  visible: {
    scale: [1, 1.2, 1.05, 1.1, 1],
    opacity: [1, 1, 1, 1, 1],
    transition: {
      duration: 1.5,
      ease: "easeOut",
      delay: 1.5,
      times: [0, 0.2, 0.4, 0.6, 1],
    },
  },
  loopPulse: {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0,
    },
  },
};

// Card background fade-in variants
const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, delay: 1.5, ease: "easeOut" } },
};

export const SingleTestimonial = () => {
  const controls = useAnimation();

  return (
    <MotionSection
      id="retzio"
      className="relative min-h-[650px] flex items-center justify-center overflow-hidden bg-alluBlue-900"
    >
      {/* Background Image */}
      <picture className="absolute inset-0 w-full h-full object-cover object-center opacity-45 lg:opacity-55">
        <source
          media="(max-width: 768px)"
          srcSet={imageMobile}
          type="image/webp"
        />
        <source
          srcSet={imageDesktop}
          type="image/webp"
        />
        <img
          src={imageMobile} // Fallback to mobile WebP
          alt="Retzio Gredig at Alluviance Immersion"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </picture>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-10" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23fff' stroke-opacity='.04'%3E%3Cpath d='M0 0h160v160H0z'/%3E%3C/g%3E%3C/svg%3E)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-5xl px-6 text-center">
        <motion.div
          className="relative p-8 rounded-2xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-alluBlue-900/50 z-0"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          />
          <motion.blockquote
            className="text-2xl md:text-3xl font-medium text-gray-100 leading-relaxed italic relative z-10"
          >
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
                {index === 0 && (
                  <span className="text-gray-100 text-2xl md:text-3xl leading-none inline mr-1">“</span>
                )}
                {index === 0 ? (
                  <>
                    I was at <span className="underline">1% of my yearly quota</span> at the June immersion...
                  </>
                ) : index === 2 ? (
                  <>
                    {part}
                    <span className="text-gradient font-semibold">largest deal ever</span>
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
                      onAnimationComplete={(definition) => {
                        if (definition === "visible") {
                          controls.start("loopPulse");
                        }
                      }}
                    >
                      267%
                    </motion.span>
                  </>
                ) : (
                  part
                )}
                {index === quoteParts.length - 1 && (
                  <span className="text-gray-100 text-2xl md:text-3xl leading-none inline ml-1">”</span>
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
        <img
          src={watermark}
          alt="Alluviance Watermark"
          className="absolute bottom-4 right-10 w-24 h-auto opacity-20 z-20"
        />
      </div>
    </MotionSection>
  );
};