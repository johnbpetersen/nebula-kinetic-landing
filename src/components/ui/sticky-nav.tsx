// src/components/ui/sticky-nav.tsx
import React, { useRef, useState } from "react"; // Added useState
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HubSpotFormPopup } from "./hubspot-form-popup"; // Added import

export const StickyNav = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // Added state for form

  // Trigger visibility when scrolling past 90vh (hero section height)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.9; // 90vh
    setIsVisible(latest > threshold);
  });

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 bg-alluBlue-900/90 backdrop-blur-sm shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="section-container flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src="/assets/images/alluviance-logo.png"
              alt="Alluviance Logo"
              className="h-10 w-auto"
            />
          </div>
          <div>
            <button
              className="btn-primary-sm group flex items-center gap-2"
              onClick={() => setIsFormOpen(true)} // Added onClick to open form
            >
              Register Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* HubSpot form popup */}
      <HubSpotFormPopup isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} /> {/* Added form popup */}
    </>
  );
};