import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-alluBlue-900 py-8 border-t border-white/10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="opacity-70 text-sm">© 2025 Alluviance. All rights reserved.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};