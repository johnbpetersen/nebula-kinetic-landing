// src/components/sections/footer.tsx
// Purpose: Renders the site footer with copyright notice and legal/contact links.
// Dependencies: React
// Last Updated: June 17, 2025

import React from "react";

export const Footer: React.FC = () => {
  return (
    // SUGGESTION: Add role="contentinfo" for explicit landmark
    <footer className="bg-alluBlue-900 py-8 border-t border-white/10" role="contentinfo">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright notice */}
          <div className="mb-4 md:mb-0">
            {/* SUGGESTION: Use dynamic year: © {new Date().getFullYear()} Alluviance */}
            <p className="opacity-70 text-sm">© 2025 Alluviance. All rights reserved.</p>
          </div>

          {/* Legal & contact links */}
          <nav aria-label="Footer links" className="flex gap-6">
            <a
              href="https://alluviance.co/privacy-policy"
              className="opacity-70 hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Privacy Policy (opens in new tab)"
            >
              Privacy Policy
            </a>
            <a
              href="https://alluviance.co/terms-of-service"
              className="opacity-70 hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Terms of Service (opens in new tab)"
            >
              Terms of Service
            </a>
            <a
              href="mailto:connect@alluviance.co"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Contact Alluviance via email"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};