import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, HTMLMotionProps } from "framer-motion";

interface MotionSectionProps extends HTMLMotionProps<"section"> {
}

export const MotionSection = ({
  children,
  className = "", // Defaulting className if it's explicitly destructured
  ...props // The rest of the props will be of type HTMLMotionProps<"section">
}: MotionSectionProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      // Combine the default section-spacing with any className passed in props
      className={`section-spacing ${className}`}
      {...props} // Spread the rest of the HTMLMotionProps
    >
      {children}
    </motion.section>
  );
};