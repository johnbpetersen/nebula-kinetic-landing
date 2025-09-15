// src/pages/VipOffer.tsx
// Spacing polish + stacked date/time:
// - Generous vertical rhythm (breathing room) across VIP pitch, perks, FAQ, final CTA
// - Timing bubble given more space
// - Date & Time now stacked in a single column above the CTA
// - Subtle gaps/padding tuned for mobile → desktop

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ScrollText,
  HelpCircle,
  PlayCircle,
  Users,
  ArrowRight,
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react";
import HeroScrollExpansion from "@/components/hero/HeroScrollExpansion";

const PERKS = [
  {
    icon: ScrollText,
    title: "Inner Game Practice",
    description:
      "Alex will lead the group through an immersive and interactive inner game experience to anchor the masterclass concepts.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/practicing.webp",
  },
  {
    icon: HelpCircle,
    title: "Priority Q&A",
    description:
      "VIP questions jump the line so you leave with clarity and next steps you can implement immediately.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/hands-up.webp",
  },
  {
    icon: PlayCircle,
    title: "Full Masterclass Replay",
    description:
      "Can’t attend live? You’ll receive the full session recording right in your inbox to watch anytime.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/replay.webp",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Kept intentionally tight so you can get to know other sales professionals also committed to improving their inner game.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/community.webp",
  },
];

const DEFAULT_EVENT = "Inner Game of Sales Masterclass";

function getCheckoutUrl(): string {
  const env = (import.meta as any).env || {};
  const fromEnv =
    env.VITE_HUBSPOT_PAYMENT_LINK_URL || env.VITE_STRIPE_PAYMENT_LINK_URL || "";

  const fromWindow = (window as any).__VIP_PAYMENT_URL;
  const cleanedWindow =
    typeof fromWindow === "string" && !/^%VITE_.+%$/.test(fromWindow) ? fromWindow : "";

  return fromEnv || cleanedWindow || "";
}

export default function VipOffer() {
  const [sp] = useSearchParams();
  const email = sp.get("email") || "";
  const eventTitle = sp.get("event") || DEFAULT_EVENT;

  const checkoutUrl = React.useMemo(() => getCheckoutUrl(), []);

  React.useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "view_vip_offer", page: "vip_offer" });
  }, []);

  const handleBuy = () => {
    (window as any).dataLayer?.push({ event: "click_vip_buy" });
    if (!checkoutUrl) {
      // eslint-disable-next-line no-console
      console.error("VIP checkout URL missing. import.meta.env:", (import.meta as any).env);
      alert(
        "VIP checkout isn’t configured yet. Set VITE_HUBSPOT_PAYMENT_LINK_URL in your Vercel Environment Variables (and in your local .env), then redeploy/restart."
      );
      return;
    }
    window.location.assign(checkoutUrl);
  };

  return (
    <div className="bg-alluBlue-900 text-white min-h-screen font-sans">
      <Helmet>
        <title>VIP Upgrade | Alluviance Masterclass</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ==== Scroll-Expansion Hero (video) ==== */}
      <HeroScrollExpansion
        videoSrc="https://alluviance.s3.us-east-2.amazonaws.com/videos/alluviance+website+trim.mp4"
        headline={<>You’re registered!</>}
        subhead={
          <>
            We’ve sent your confirmation and calendar invite
            {email ? (
              <>
                {" "}
                to <strong className="text-white">{email}</strong>
              </>
            ) : (
              " to your email"
            )}
            {" "}for <strong>{eventTitle}</strong>. Keep the momentum going below.
          </>
        }
        anchorId="vip-pitch"
      />

      <main className="section-container py-20 md:py-28">
        <div className="mx-auto max-w-4xl space-y-20 md:space-y-24">
          {/* 2) Core VIP Pitch */}
          <section id="vip-pitch" className="text-center" aria-labelledby="vip-offer-title">
            {/* Timing bubble */}
            <div className="mb-8 md:mb-10 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-5 py-2.5 border border-white/15">
                <span className="text-xs sm:text-sm text-white/85 font-semibold">
                  30-minute session immediately after the masterclass
                </span>
              </div>
            </div>

            <motion.h2
              id="vip-offer-title"
              className="text-4xl md:text-5xl font-display text-gradient mb-5 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              Want to Go Deeper?
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-[46rem] mx-auto leading-relaxed md:leading-relaxed mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Upgrade to our VIP package for just $19 and stay after the masterclass for a{" "}
              <strong>30-minute immersive inner game experience</strong> with Alex to jumpstart your
              journey.
            </motion.p>

            {/* Date & Time (stacked column) */}
            <motion.div
              className="flex flex-col items-center gap-3 md:gap-4 text-sm md:text-base text-white/90 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              aria-label="VIP session date and time"
            >
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">Date: October 2</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">Time: 3:00 PM CT</span>
              </span>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={handleBuy}
                className="btn-primary relative overflow-hidden group text-lg px-9 py-4.5 md:px-10 md:py-5"
                aria-label="Upgrade to the full VIP experience for just $19"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Full VIP Upgrade — $19
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>
          </section>

          {/* 3) The Perks */}
          <section aria-labelledby="perks-title" className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  className="relative flex items-center justify-center h-[300px] md:h-[320px] text-center p-7 md:p-8 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <img
                    src={perk.bgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="relative z-10 max-w-[34ch]">
                    <perk.icon className="w-12 h-12 mx-auto text-neon-yellow" strokeWidth={1.5} />
                    <h3 className="mt-5 text-2xl font-display">{perk.title}</h3>
                    <p className="mt-3 text-gray-300 leading-relaxed">{perk.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4) Q&A Section */}
          <section aria-labelledby="faq-title" className="pt-2">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-display text-center mb-8 md:mb-10">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5 md:space-y-6 max-w-2xl mx-auto">
              {/* FAQ Item */}
              <details className="group glass-card rounded-2xl">
                <summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer">
                  <span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">
                    Who is the VIP experience for and what do I get with it that's not included in the Masterclass?
                  </span>
                  <ChevronDown
                    className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 md:px-7 pb-6 -mt-2">
                  <p className="text-gray-300 leading-relaxed">
                    The VIP package is for those who don't like to sit back and wait. You will have the
                    opportunity to meet other sales professionals who also are on their own journey to improve their
                    inner game. And you'll get to apply what you've learned in a very real and hands-on way.
                  </p>
                </div>
              </details>

              {/* FAQ Item */}
              <details className="group glass-card rounded-2xl">
                <summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer">
                  <span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">
                    Do I need to attend live?
                  </span>
                  <ChevronDown
                    className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 md:px-7 pb-6 -mt-2">
                  <p className="text-gray-300 leading-relaxed">
                    No. The VIP package includes the full replay so it's not required to attend live, but we highly
                    recommend it as there will be live exercises, coaching, and Q&amp;A.
                  </p>
                </div>
              </details>

              {/* FAQ Item */}
              <details className="group glass-card rounded-2xl">
                <summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer">
                  <span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">
                    I'm signed up for the masterclass. Do I still need to purchase a VIP ticket to attend the Masterclass?
                  </span>
                  <ChevronDown
                    className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 md:px-7 pb-6 -mt-2">
                  <p className="text-gray-300 leading-relaxed">
                    Absolutely not! You're all set for the Masterclass. The VIP package is for those ready to jump
                    right in and start applying the concepts from the masterclass immediately.
                  </p>
                </div>
              </details>

              {/* FAQ Item */}
              <details className="group glass-card rounded-2xl">
                <summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer">
                  <span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">
                    Can I purchase a ticket to the VIP experience later?
                  </span>
                  <ChevronDown
                    className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 md:px-7 pb-6 -mt-2">
                  <p className="text-gray-300 leading-relaxed">
                    We are intentionally keeping this setting small and intimate. There are no guarantees that you
                    will be able to purchase a ticket later.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* === Alex Pull-Quote  === */}
          <motion.section
            aria-labelledby="alex-quote"
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="edge-glow rounded-3xl">
              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-10 p-6 sm:p-8 md:p-10">
                  {/* Subtle backdrop flourish */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 15% 10%, rgba(255,228,94,0.08) 0%, rgba(255,228,94,0) 55%), radial-gradient(70% 50% at 85% 90%, rgba(96,116,255,0.10) 0%, rgba(96,116,255,0) 60%)",
                    }}
                  />

                  {/* Alex headshot */}
                  <div className="relative flex md:block justify-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
                      <img
                        src="https://alluviance.s3.us-east-2.amazonaws.com/images/alex-headshot.jpeg"
                        alt="Alex Kremer"
                        className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/40 ring-4 ring-white/5"
                        loading="lazy"
                      />
                      {/* Accent ring */}
                      <span className="absolute -inset-1 rounded-3xl border border-[#FFE45E]/25 blur-[1px] pointer-events-none" />
                    </div>

                    {/* Name + role (mobile under image; on md we’ll keep it near image) */}
                    <div className="mt-4 text-center md:text-left">
                      <p className="text-white font-semibold leading-tight">Alex Kremer</p>
                      <p className="text-white/70 text-sm">Host, Inner Game Masterclass</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    {/* Decorative opening quote */}
                    <span
                      aria-hidden
                      className="absolute -top-3 -left-3 md:-top-6 md:-left-6 text-6xl md:text-8xl font-serif text-white/10 leading-none select-none"
                    >
                      “
                    </span>

                    <h3 id="alex-quote" className="sr-only">
                      A note from Alex
                    </h3>

                    <blockquote className="relative text-left">
                      <p className="text-2xl sm:text-3xl md:text-4xl font-display tracking-tight leading-snug">
                        If you want to go deeper, get your specific questions answered, and access the{" "}
                          smaller group experience, I’m opening a private VIP room. This is where I’ll break things down in detail and interact directly. If you're committed to your own journey, this will be the easiest{" "}
                        <span className="text-[#FFE45E] font-bold">$19</span> you'll ever spend.
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 5) Final CTA */}
          <section className="glass-card p-8 text-center">
            <h2 className="text-3xl font-display">Lock in your VIP Spot</h2>
            <p className="mt-2 text-gray-300">
              Capacity is limited to keep the group small and impactful.
            </p>

            {/* Subtle timing recap */}
            <p className="mt-3 text-sm text-white/80 flex items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" /> Oct 2
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" /> 3:00 PM CT
              </span>
              <span className="hidden sm:inline text-white/60">•</span>
              <span className="hidden sm:inline text-white/80">Immediately after the masterclass</span>
            </p>

            <div className="mt-6">
              <button
                onClick={handleBuy}
                className="bg-neon-yellow text-alluBlue-900 font-bold text-lg rounded-full px-10 py-4 shadow-lg hover:shadow-neon-yellow/40 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Buy VIP access for $19"
              >
                Upgrade to VIP — $19
              </button>
              <p className="mt-3 text-sm text-gray-400">One-time payment • Full replay included</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}