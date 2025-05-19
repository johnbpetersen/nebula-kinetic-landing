import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MotionSection } from "../ui/motion-section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "When exactly is the webinar?",
    answer: "The webinar is scheduled for June 25th at 10:00 AM EDT. It will run for approximately 90 minutes with time for Q&A at the end.",
  },
  {
    question: "Will there be a recording available?",
    answer: "Yes, all registered participants will receive a recording of the webinar. However, live attendees will have access to exclusive bonuses and the ability to ask questions.",
  },
  {
    question: "What topics will be covered?",
    answer: "The webinar covers psychological techniques to overcome objections, build authentic connections, and close more deals without feeling pushy. We'll explore mindset shifts, practical communication strategies, and real-world examples.",
  },
  {
    question: "Is this relevant for B2B sales professionals?",
    answer: "Absolutely! The Inner Game principles apply to both B2B and B2C contexts. We'll provide specific examples for different sales environments.",
  },
  {
    question: "What if I can't attend the full session?",
    answer: "Register anyway! You'll receive the recording and all materials, though live attendees will have access to exclusive Q&A and special offers.",
  },
];

export const FAQ = () => {
  return (
    <MotionSection className="bg-alluBlue-900">
      <div className="section-container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card overflow-hidden border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5">
                <h3 className="text-left font-semibold text-lg">{faq.question}</h3>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-white/80">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MotionSection>
  );
};