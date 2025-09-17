// src/pages/index.tsx
// Purpose: Renders the main landing page, assembling all sections and metadata.
// Last Updated: Pixel removed from Helmet (we’ll manage it in index.html only).

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

const Index: React.FC = () => {
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
        {/* Page metadata for SEO & social sharing */}
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

        {/* Preload hero poster images for performance (LCP optimization) */}
        <link
          rel="preload"
          as="image"
          href="https://alluviance.s3.us-east-2.amazonaws.com/images/vsl-thumbnail-mobile.webp"
          fetchPriority="high"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="https://alluviance.s3.us-east-2.amazonaws.com/images/vsl-thumbnail-desktop.webp"
          fetchPriority="high"
          media="(min-width: 768px)"
        />

        {/* Google Fonts: swap to reduce FOIT */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@700&display=swap"
          media="print"
          onLoad={(e) => ((e.currentTarget as HTMLLinkElement).media = "all")}
        />
      </Helmet>

      <StickyNav />
      <main className="overflow-hidden relative" role="main">
        <Hero />
        <LogoMarquee logos={logosPaths} />
        <BigPromise />
        <Pillars />
        <ProblemSolution />
        <Testimonials />
        <MobileTestimonials />
        <Countdown />
        <FAQ />
        <SingleTestimonial />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;