// src/components/ui/sticky-nav.tsx
// Purpose: Renders a sticky navigation bar that appears after scrolling past the hero section and provides a quick registration CTA.
// Dependencies: React, framer-motion (motion, useScroll, useMotionValueEvent), lucide-react (ArrowRight), HubSpotFormPopup
// Last Updated: June 17, 2025

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HubSpotFormPopup } from "./hubspot-form-popup";

export const StickyNav: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null); // UNUSED: Consider removing if not needed
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Section: Show nav when scrolled beyond 90% of viewport height (hero section)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const vh = window.innerHeight;
    const threshold = vh * 0.9; // 90vh
    setIsVisible(latest > threshold);
  });

  return (
    <>
      {/* Sticky navigation bar */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 bg-alluBlue-900/90 backdrop-blur-sm shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between py-4">
          {/* Logo linking to main site */}
          <div className="flex items-center">
            <a
              href="https://alluviance.co"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Alluviance main site"
            >
              <picture>
                <source
                  srcSet="https://alluviance.s3.us-east-2.amazonaws.com/images/alluviance-logo.webp"
                  type="image/webp"
                />
                <img
                  src="/assets/images/alluviance-logo.png"
                  alt="Alluviance Logo"
                  className="h-10 w-auto"
                  width={72}
                  height={40}
                  loading="eager" // small image
                />
              </picture>
            </a>
          </div>

          {/* CTA Button to open registration form */}
          <div>
            <motion.button
              type="button" // Prevent implicit form submission
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden px-6 py-2 rounded-full
                         bg-neon-yellow text-alluBlue-900 font-bold text-base
                         shadow-xl hover:shadow-neon-yellow/40 transition-all duration-300
                         focus:ring-2 focus:ring-neon-yellow/50 focus:outline-none"
              onClick={() => setIsFormOpen(true)}
            >
              <span className="relative flex items-center gap-2">
                Register Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HubSpot registration form popup */}
      <HubSpotFormPopup
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
};