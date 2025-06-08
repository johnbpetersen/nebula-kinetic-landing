// src/pages/Index.tsx
import React from "react";
import { Helmet } from "react-helmet-async"; // Add import
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
  const targetDate = new Date('2025-06-25T15:00:00-05:00'); // 3:00 PM CT (UTC-5)

  // Mock data
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