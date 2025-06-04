// src/components/ui/motion-section.tsx
import React, { forwardRef, useRef, useEffect } from "react";
import { motion, useAnimation, useInView, HTMLMotionProps } from "framer-motion";

interface MotionSectionProps extends HTMLMotionProps<"section"> {}

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  ({ children, className = "", ...props }, forwardedRef) => {
    /* ----- observer ----------------------------------------------------- */
    const localRef = useRef<HTMLElement>(null);
    const controls = useAnimation();

    // Combine forwardedRef + localRef
    React.useImperativeHandle(forwardedRef, () => localRef.current!);

    /** ✅ Root‑margin pushes the trigger 100 px INTO the viewport
        ✅ Smaller amount so tiny screens still pass the threshold */
    const inView = useInView(localRef, {
      once: true,
      margin: "0px 0px -100px 0px", // 100 px before it scrolls off
      amount: 0.05,                 // 5 % is enough
    });

    useEffect(() => {
      if (inView) controls.start("visible");
    }, [inView, controls]);

    return (
      <motion.section
        ref={localRef}
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