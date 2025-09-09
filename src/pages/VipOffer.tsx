// src/pages/VipOffer.tsx
// VIP Offer page with a cleaner, celebratory hero (ticket icon), keeping the rest of the layout intact.

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollText, HelpCircle, PlayCircle, Users, ArrowRight, Ticket } from "lucide-react";

const PERKS = [
  {
    icon: ScrollText,
    title: "Inner Game Practice",
    description:
      "Alex will lead the group through an immersive and interactive inner game experience to anchor the masterclass concepts.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/practicing.jpg",
  },
  {
    icon: HelpCircle,
    title: "Priority Q&A",
    description:
      "VIP questions jump the line so you leave with clarity and next steps you can implement immediately.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/hands-up.jpg",
  },
  {
    icon: PlayCircle,
    title: "Full Masterclass Replay",
    description:
      "Can’t attend live? You’ll receive the full session recording right in your inbox to watch anytime.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/replay.jpg",
  },
  {
    icon: Users,
    title: "Community Building",
    description:
      "Kept intentionally tight so you can get to know other sales professionals also committed to improving their inner game.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/community.jpg",
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
  const name = sp.get("name") || "";
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

      <main className="section-container py-12 md:py-20">
        <div className="mx-auto max-w-4xl space-y-12 md:space-y-16">
          {/* 1) CELEBRATION HERO — simplified, bold, and clear */}
          <motion.section
            className="relative edge-glow glass-card px-6 py-10 md:px-10 md:py-14 text-center overflow-hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-labelledby="reg-hero-title"
          >
            {/* subtle decorative sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                background:
                  "radial-gradient(60% 60% at 20% 10%, rgba(255,228,94,0.22) 0%, rgba(255,228,94,0) 60%)",
              }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl border border-neon-yellow/40 bg-neon-yellow/15 shadow-[0_0_40px_rgba(255,228,94,0.25)] flex items-center justify-center">
                <Ticket className="w-8 h-8 text-neon-yellow" strokeWidth={2} />
              </div>

              <h1
                id="reg-hero-title"
                className="mt-5 text-4xl md:text-5xl font-display font-bold tracking-tight"
              >
                You’re Registered<span className="text-gradient">!</span>
              </h1>

              <p className="mt-3 text-base md:text-lg text-white/80">
                We’ve sent your confirmation and calendar invite
                {email ? (
                  <>
                    {" "}
                    to <strong className="text-white">{email}</strong>
                  </>
                ) : (
                  " to your email"
                )}
                {" "}for <strong>{eventTitle}</strong>.
              </p>

              <p className="mt-2 text-sm text-white/60">
                You’re all set. Keep the momentum going below.
              </p>
            </div>
          </motion.section>

          {/* 2) Core VIP Pitch */}
          <section className="text-center" aria-labelledby="vip-offer-title">
            <motion.h2
              id="vip-offer-title"
              className="text-4xl md:text-5xl font-display text-gradient mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Want to Go Deeper?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Upgrade to our VIP package for just $29 and stay after the masterclass for a{" "}
              <strong>30-minute immersive inner game experience</strong> with Alex to jumpstart your
              journey.
            </motion.p>
          </section>

          {/* Primary CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={handleBuy}
              className="btn-primary relative overflow-hidden group text-lg px-8 py-4"
              aria-label="Upgrade to the full VIP experience for just $29"
            >
              <span className="relative z-10 flex items-center gap-2">
                Full VIP Upgrade — $29
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </motion.div>

          {/* 3) The Perks */}
          <section aria-labelledby="perks-title">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  className="relative flex items-center justify-center h-[300px] text-center p-6 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <img
                    src={perk.bgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="relative z-10">
                    <perk.icon className="w-12 h-12 mx-auto text-neon-yellow" strokeWidth={1.5} />
                    <h3 className="mt-4 text-2xl font-display">{perk.title}</h3>
                    <p className="mt-2 text-gray-300">{perk.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4) Q&A Section */}
          <section aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-3xl font-display text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <details className="glass-card p-5 cursor-pointer group">
                <summary className="text-lg font-semibold flex justify-between items-center">
                  Who is the VIP experience for and what do I get with it that's not included in the Masterclass?
                  <ChevronDown className="w-5 h-5 transition-transform duration-300 transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-300">
                  The VIP package is for those who don't like to sit back and wait. You will have the opportunity to meet other sales professionals who also are on their own journey to improve their inner game. And you'll get to apply what you've learned in a very real and hands-on way.
                </p>
              </details>
              <details className="glass-card p-5 cursor-pointer group">
                <summary className="text-lg font-semibold flex justify-between items-center">
                  Do I need to attend live?
                  <ChevronDown className="w-5 h-5 transition-transform duration-300 transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-300">
                  No. The VIP package includes the full replay so it's not required to attend live, but we highly recommend it as there will be live exercises, coaching, and Q&amp;A.
                </p>
              </details>
              <details className="glass-card p-5 cursor-pointer group">
                <summary className="text-lg font-semibold flex justify-between items-center">
                  I'm signed up for the masterclass. Do I still need to purchase a VIP ticket to attend the Masterclass?
                  <ChevronDown className="w-5 h-5 transition-transform duration-300 transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-300">
                  Absolutely not! You're all set for the Masterclass. The VIP package is for those ready to jump right in and starting applying the concepts from the masterclass immediately.
                </p>
              </details>
              <details className="glass-card p-5 cursor-pointer group">
                <summary className="text-lg font-semibold flex justify-between items-center">
                  Can I purchase a ticket to the VIP experience later?
                  <ChevronDown className="w-5 h-5 transition-transform duration-300 transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-gray-300">
                  We are intentionally keeping this setting small and intimate. There are no guarantees that you will be able to purchase a ticket later.
                </p>
              </details>
            </div>
          </section>

          {/* 5) Final CTA */}
          <section className="glass-card p-8 text-center">
            <h2 className="text-3xl font-display">Lock in your VIP Spot</h2>
            <p className="mt-2 text-gray-300">
              Capacity is limited to keep the group small and impactful.
            </p>
            <div className="mt-6">
              <button
                onClick={handleBuy}
                className="bg-neon-yellow text-alluBlue-900 font-bold text-lg rounded-full px-10 py-4 shadow-lg hover:shadow-neon-yellow/40 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Buy VIP access for $29"
              >
                Upgrade to VIP — $29
              </button>
              <p className="mt-3 text-sm text-gray-400">One-time payment • Full replay included</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);