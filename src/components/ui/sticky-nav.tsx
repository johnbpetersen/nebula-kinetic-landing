// src/components/ui/sticky-nav.tsx
// Purpose: Renders a sticky navigation bar on marketing pages, hidden on VIP checkout/confirmation.
// Hides itself on /vip-offer and /vip-confirmed so we don’t distract from the upsell or post-purchase state.
// Last Updated: September 9, 2025

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hasMasterclassPassed } from "../../config/eventMeta";
import { useLocation } from "react-router-dom";

export const StickyNav: React.FC = () => {
  // Hide on these paths (exact matches)
  const HIDDEN_PATHS = ["/vip-offer", "/vip-confirmed", "/vip-invite", "/replay"];

  const { pathname } = useLocation();
  if (HIDDEN_PATHS.includes(pathname)) {
    // Don’t render anything on VIP pages
    return null;
  }

  const targetRef = useRef<HTMLDivElement>(null); // (Currently unused; kept for potential future anchor logic)
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic button text based on event status
  const buttonText = hasMasterclassPassed() ? "Join Wait List" : "Register For Free";

  // Show nav when scrolled beyond ~90% of viewport height (hero section)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const vh = window.innerHeight;
    const threshold = vh * 0.9; // 90vh
    setIsVisible(latest > threshold);
  });

  return (
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
                loading="eager"
              />
            </picture>
          </a>
        </div>

        {/* CTA Button to scroll to registration form */}
        <div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-6 py-2 rounded-full bg-neon-yellow text-alluBlue-900 font-bold text-base shadow-xl hover:shadow-neon-yellow/40 transition-all duration-300 focus:ring-2 focus:ring-neon-yellow/50 focus:outline-none"
            onClick={() =>
              document.getElementById("final-cta-form")?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }
            aria-label="Scroll to registration form"
          >
            <span className="relative flex items-center gap-2">
              {buttonText}
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
  );
};