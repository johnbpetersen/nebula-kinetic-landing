// src/components/sections/faq.tsx
// Purpose: Renders the Frequently Asked Questions section as an accordion for the Inner Game Masterclass.
// Dependencies: React, MotionSection, Accordion (from shadcn/ui)
// Last Updated: August 25, 2025

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionSection } from "../ui/motion-section";
import { eventMeta } from "../../config/eventMeta"; // Added import for eventMeta

// FAQ data; consider moving to a CMS or external JSON/config for easier updates
interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "I’m new to sales. Will this help me?",
    answer:
      "Absolutely! The masterclass teaches universal mindset shifts that boost confidence and close rates, whether you’re a rookie or a pro. Join free and start winning!",
  },
  {
    question: "I’ve  been in sales for a long time. Will this help me too?",
    answer:
      "We got you. You will learn the strategies and tactics that the top 1% of sales professionals use to crush their quotas and crush stress! We've seen this work for even the most seasoned reps!",
  },
  {
    question: "How long is the masterclass?",
    answer:
      "Just 60 minutes to transform your sales game with actionable strategies you’ll use immediately. Don’t miss out—secure your spot today!",
  },
  {
    question: "What if I can’t make the live session?",
    answer:
      `No worries! We'll send you a link to the replay after the masterclass session, and a member of our team will reach out to answer any questions you may have!.`,
  },
];

export const FAQ: React.FC = () => (
  <MotionSection className="bg-alluBlue-900">
    <div className="section-container max-w-4xl mx-auto">
      {/* Section title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
        Frequently Asked Questions
      </h2>

      {/* Accordion wrapper */}
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
        // SUGGESTION: Add `defaultValue` if you want the first item open by default
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={`faq-${index}`} // SUGGESTION: Use a stable unique ID instead of array index
            value={`item-${index}`}
            className="glass-card overflow-hidden border-none"
          >
            {/* Accordion trigger (button) */}
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5">
              <h3 className="text-left font-semibold text-lg">{faq.question}</h3>
            </AccordionTrigger>

            {/* Accordion content */}
            <AccordionContent className="px-6 pb-4">
              <p className="text-white/80">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </MotionSection>
);