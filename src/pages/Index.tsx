import React, { useEffect, useState } from "react";
import { Hero } from "../components/sections/hero";
import { LogoMarquee } from "../components/sections/logo-marquee";
import { ProblemSolution } from "../components/sections/problem-solution";
import { Pillars } from "../components/sections/pillars";
import { Countdown } from "../components/sections/countdown";
import { Testimonials } from "../components/sections/testimonials";
import { FAQ } from "../components/sections/faq";
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

  const targetDate = new Date('2025-06-25T10:00:00-04:00');

  // Mock data
  const logosPaths = [
    "/public/assets/images/logo1.svg",
    "/public/assets/images/logo2.svg",
    "/public/assets/images/logo3.svg",
    "/public/assets/images/logo4.svg",
    "/public/assets/images/logo5.svg",
    "/public/assets/images/logo6.svg",
  ];

  return (
    <>
      <head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
      </head>

      <main className="overflow-hidden relative">
        <Hero />
        <LogoMarquee logos={logosPaths} />
        <ProblemSolution />
        <Pillars />
        <Countdown targetDate={targetDate} />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;