// src/components/sections/countdown.tsx
// Purpose: Renders the countdown section with a timer, event details, and a button to scroll to the final CTA form.
// Dependencies: React, framer-motion (motion), MotionSection, CountdownTimer, HubSpotEmbed
// Last Updated: August 28, 2025, 11:35 AM EDT

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MotionSection } from "../ui/motion-section";
import { CountdownTimer } from "../ui/countdown-timer";
import { HubSpotEmbed } from "../ui/hubspot-embed";
import { eventMeta, hasMasterclassPassed } from "../../config/eventMeta";
import { ArrowRight } from "lucide-react";

const FORM1_INLINE_ID = import.meta.env.VITE_HS_FORM_ID_STEP1 || "1750eaa7-b9fb-4852-a88e-5390ebb5eb6e";
const FORM2_INLINE_ID = import.meta.env.VITE_HS_FORM_ID_STEP2 || "88193456-5081-4c04-ab4e-9ea776e83c1c";
const WAITLIST_FORM_ID = import.meta.env.VITE_HS_FORM_ID_WAITLIST || "4694cabd-1060-9f6b-e8a80efb3668";

// Helper functions (unchanged)
function getTzAbbrev(dateISO: string, tz: string): string { try { const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short", }).formatToParts(new Date(dateISO)); return parts.find((p) => p.type === "timeZoneName")?.value ?? "CT"; } catch { return "CT"; } }
function formatEventDate(dateISO: string, tz: string): string { try { return new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long", year: "numeric", month: "long", day: "numeric", }).format(new Date(dateISO)); } catch { return ""; } }
function formatEventTime(dateISO: string, tz: string): string { try { return new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", hour12: true, }).format(new Date(dateISO)); } catch { return ""; } }
const GradientGlow: React.FC = () => ( <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-gradient-radial from-alluBlue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl opacity-30 z-0" /> );

export const Countdown: React.FC = () => {
  const isEventPast = hasMasterclassPassed();

  const targetDate = useMemo<Date>(() => new Date((eventMeta as any).dateISO || (eventMeta as any).rawDate), []);

  const { displayDate, displayTime } = useMemo(() => {
    const dateISO = (eventMeta as any).dateISO || (eventMeta as any).rawDate;
    const tzVal = (eventMeta as any).tz || "America/Chicago";
    return {
      displayDate: formatEventDate(dateISO, tzVal),
      displayTime: `${formatEventTime(dateISO, tzVal)} ${getTzAbbrev(dateISO, tzVal)}`,
    };
  }, []);

  useEffect(() => {
    if (window.location.hash === "#register") {
      document.getElementById("countdown-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const buttonText = hasMasterclassPassed() ? "Join The Waitlist" : "Register For Free";

  return (
    <MotionSection id="countdown-section" className="relative bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 min-h-screen flex items-center">
      <GradientGlow />
      <div className="section-container text-center relative z-10">
        <motion.h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Secure Your Spot
        </motion.h2>
        <motion.p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          Join us on {displayDate} at {displayTime} for this transformative masterclass.
        </motion.p>
        {!isEventPast && (
          <motion.div className="mb-10 relative" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <CountdownTimer targetDate={targetDate} />
          </motion.div>
        )}

        <div className="mt-10 w-full max-w-lg mx-auto">
          <motion.button
            className="btn-primary relative overflow-hidden group"
            onClick={() => document.getElementById("final-cta-form")?.scrollIntoView({ behavior: "smooth", block: "center" })}
            aria-label="Scroll to registration form"
          >
            <span className="relative z-10 flex items-center gap-2">
              {buttonText}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
        </div>
      </div>
    </MotionSection>
  );
};