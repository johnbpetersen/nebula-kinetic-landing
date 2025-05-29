// src/components/ui/motion-section.tsx
import React, { useEffect, forwardRef } from "react";
import { motion, useInView, useAnimation, HTMLMotionProps } from "framer-motion";

interface MotionSectionProps extends HTMLMotionProps<"section"> {}

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ children, className = "", ...props }, forwardedRef) => {
    const ref = React.useRef<HTMLElement>(null);
    const controls = useAnimation();
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    // Combine forwardedRef with local ref
    React.useImperativeHandle(forwardedRef, () => ref.current!);

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
        className={`section-spacing ${className}`}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

MotionSection.displayName = "MotionSection";