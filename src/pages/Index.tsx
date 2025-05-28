import React, { useEffect, useState } from "react";
import { StickyNav } from "../components/ui/sticky-nav";
import { Hero } from "../components/sections/hero";
import { LogoMarquee } from "../components/sections/logo-marquee";
import { ProblemSolution } from "../components/sections/problem-solution";
import { BigPromise } from "../components/sections/bigpromise";
import { Pillars } from "../components/sections/pillars";
import { Testimonials } from "../components/sections/testimonials";
import { Countdown } from "../components/sections/countdown";
import { FAQ } from "../components/sections/faq";
import { SingleTestimonial } from "../components/sections/single-testimonial";
import { FinalCTA } from "../components/sections/final-cta";
import { Footer } from "../components/sections/footer";

// Meta data
const META_TITLE = "Inner Game Webinar | Alluviance";
const META_DESCRIPTION = "Transform your sales approach with 'The Inner Game of Sales' webinar. Learn psychological techniques to overcome objections, build authentic connections & close more deals without feeling pushy. June 25th.";

const Index = () => {
  // Set meta tags
  useEffect(() => {
    document.title = META_TITLE;

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', META_DESCRIPTION);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = META_DESCRIPTION;
      document.head.appendChild(newMetaDescription);
    }

    // OG tags
    const ogTags = [
      { property: 'og:title', content: META_TITLE },
      { property: 'og:description', content: META_DESCRIPTION },
      { property: 'og:type', content: 'website' },
    ];

    ogTags.forEach((tag) => {
      const existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const newTag = document.createElement('meta');
        newTag.setAttribute('property', tag.property);
        newTag.setAttribute('content', tag.content);
        document.head.appendChild(newTag);
      }
    });
  }, []);

  const targetDate = new Date('2025-06-25T18:00:00-05:00'); // 6:00 PM CT (UTC-5)

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
      <head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
      </head>

      <StickyNav />

      <main className="overflow-hidden relative">
        <Hero />
        <LogoMarquee logos={logosPaths} />
        <ProblemSolution />
        <BigPromise />
        <Pillars />
        <Testimonials />
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