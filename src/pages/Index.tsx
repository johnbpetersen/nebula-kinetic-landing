// src/pages/Index.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { StickyNav } from "../components/ui/sticky-nav";
import { Hero } from "../components/sections/hero";
import { LogoMarquee } from "../components/sections/logo-marquee";
import { BigPromise } from "../components/sections/bigpromise";
import { Pillars } from "../components/sections/pillars";
import { ProblemSolution } from "../components/sections/problem-solution";
import { Testimonials } from "../components/sections/testimonials";
import { MobileTestimonials } from "../components/sections/mobile-testimonials";
import { Countdown } from "../components/sections/countdown";
import { FAQ } from "../components/sections/faq";
import { SingleTestimonial } from "../components/sections/single-testimonial";
import { FinalCTA } from "../components/sections/final-cta";
import { Footer } from "../components/sections/footer";

const Index = () => {
  const targetDate = new Date('2025-07-09T15:00:00-05:00');

  const logosPaths = [
    "/assets/images/zoom-logo.svg",
    "/assets/images/aws-logo.svg",
    "/assets/images/docusign-logo.svg",
    "/assets/images/gong-logo.svg",
    "/assets/images/databricks-logo.svg",
    "/assets/images/microsoft-logo.svg",
    "/assets/images/verkada-logo.svg",
    "/assets/images/salesforce-logo.svg",
    "/assets/images/google-logo.svg",
    "/assets/images/datadog-logo.svg",
  ];

  return (
    <>
      <Helmet>
        <title>Inner Game Masterclass | Alluviance</title>
        <meta
          name="description"
          content="Join the Inner Game Masterclass to master sales mindset and close deals like top 1% performers. Free training by Alluviance. Sign up now!"
        />
        <meta property="og:title" content="Inner Game Masterclass | Alluviance" />
        <meta
          property="og:description"
          content="Join the Inner Game Masterclass to master sales mindset and close deals like top 1% performers. Free training by Alluviance. Sign up now!"
        />
        <meta property="og:type" content="website" />
        {/* Preload Google Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700&display=swap"
        />
        {/* Load Google Fonts with font-display: swap */}
        <link
          id="google-fonts"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700&display=swap"
          rel="stylesheet"
          media="print"
        />
        {/* Inline critical CSS */}
        <style>
          {`
            /* Base styles */
            body {
              background-color: #0b0f2a;
              color: #ffffff;
              font-family: 'Inter', sans-serif;
              overflow-x: hidden;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Poppins', sans-serif;
              font-weight: 700;
            }
            /* Glass card (Hero video player) */
            .glass-card {
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              background-color: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
              border-radius: 1.5rem;
            }
            /* Buttons (StickyNav and Hero) */
            .btn-primary {
              background-color: #172554;
              padding: 0.75rem 1.5rem;
              border-radius: 9999px;
              color: #ffffff;
              font-weight: 600;
              transition: all 0.3s;
            }
            .btn-primary:hover {
              transform: scale(1.05);
              box-shadow: 0 0 15px rgba(251, 191, 36, 0.2);
            }
            .btn-primary:active {
              transform: scale(0.95);
            }
            .btn-primary-sm {
              background-color: #FBBF24;
              color: #172554;
              font-weight: 600;
              border-radius: 9999px;
              padding: 0.5rem 1rem;
              font-size: 0.875rem;
              transition: all 0.3s;
            }
            .btn-primary-sm:hover {
              background-color: rgba(251, 191, 36, 0.8);
            }
            /* Text gradient (Hero heading) */
            .text-gradient {
              background: linear-gradient(to right, #6074FF, #FFE45E);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            /* Hero background */
            .hero-background {
              position: relative;
              background-color: #0b0f2a;
              overflow: hidden;
            }
            .hero-background::before {
              content: "";
              position: absolute;
              inset: -50% -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(45deg, #8a2be2, #4b0082, #1e90ff, #00bfff);
              background-size: 200% 200%;
              animation: gradient-animation 20s ease infinite alternate;
              opacity: 0.3;
              filter: blur(100px);
              z-index: 0;
            }
            @keyframes gradient-animation {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .hero-background > * {
              position: relative;
              z-index: 1;
            }
            /* Edge glow (Hero video player) */
            .edge-glow {
              position: relative;
              border-radius: 1.5rem;
              overflow: visible;
            }
            .edge-glow::before {
              content: "";
              position: absolute;
              inset: -2px;
              border-radius: inherit;
              background: linear-gradient(130deg, #6074ff, #ffe45e, #6074ff, #3e4797);
              background-size: 400% 400%;
              animation: edgeGlow 6s ease-in-out infinite;
              z-index: -1;
            }
            @keyframes edgeGlow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
        {/* Defer non-critical CSS */}
        <link
          id="main-css"
          rel="stylesheet"
          href="/assets/index-B9Ku5IZH.css"
          media="print"
        />
        {/* Script to defer CSS and fonts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.getElementById('google-fonts').onload = function() {
                this.media = 'all';
              };
              document.getElementById('main-css').onload = function() {
                this.media = 'all';
              };
            `,
          }}
        />
      </Helmet>

      <StickyNav />

      <main className="overflow-hidden relative">
        <Hero />
        <LogoMarquee logos={logosPaths} />
        <BigPromise />
        <Pillars />
        <ProblemSolution />
        <Testimonials />
        <MobileTestimonials />
        <Countdown targetDate={targetDate} />
        <FAQ />
        <SingleTestimonial />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;