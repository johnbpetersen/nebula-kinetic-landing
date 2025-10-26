// src/pages/VipOffer.tsx
// V2 - Repurposed as a post-purchase upsell page for the $19 VIP Add-on.

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ScrollText, HelpCircle, PlayCircle, Users, ArrowRight, ChevronDown, Calendar, Clock } from "lucide-react";
import HeroScrollExpansion from "@/components/hero/HeroScrollExpansion";
import { eventMeta } from "@/config/eventMeta"; // 1. Import our Single Source of Truth

const PERKS = [
  {
    icon: ScrollText,
    title: "Inner Game Practice",
    description: "Alex will lead the group through an immersive and interactive inner game experience to anchor the masterclass concepts.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/practicing.webp",
  },
  {
    icon: HelpCircle,
    title: "Priority Q&A",
    description: "VIP questions jump the line so you leave with clarity and next steps you can implement immediately.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/hands-up.webp",
  },
  {
    icon: PlayCircle,
    title: "Full Masterclass Replay",
    description: "You'll receive the full session recording right in your inbox to watch anytime, on-demand.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/replay.webp",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Kept intentionally tight so you can get to know other sales professionals also committed to improving their inner game.",
    bgImage: "https://alluviance.s3.us-east-2.amazonaws.com/images/community.webp",
  },
];

// --- ACTION REQUIRED ---
// Replace this placeholder with your actual $19 VIP Add-on payment link.
const VIP_ADDON_PAYMENT_URL = "https://payments-na1.hubspot.com/payments/cjbP4QpSgmj?referrer=PAYMENT_LINK";
// -----------------------

export default function VipOffer() {
  React.useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "view_vip_upsell", page: "vip_offer" });
  }, []);

  const handleBuy = () => {
    (window as any).dataLayer?.push({ event: "click_vip_upsell" });
    window.location.assign(VIP_ADDON_PAYMENT_URL);
  };

  return (
    <div className="bg-alluBlue-900 text-white min-h-screen font-sans">
      <Helmet>
        <title>VIP Upgrade | Alluviance Masterclass</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* 2. Updated Hero Copy for the Upsell */}
      <HeroScrollExpansion
        videoSrc="https://alluviance.s3.us-east-2.amazonaws.com/videos/alluviance+website+trim.mp4"
        headline={<>Your Spot is Confirmed!</>}
        subhead={
          <>
            You're all set for the masterclass. But before you go, consider this special one-time invitation to go deeper.
          </>
        }
        anchorId="vip-pitch"
      />

      <main className="section-container py-20 md:py-28">
        <div className="mx-auto max-w-4xl space-y-20 md:space-y-24">
          {/* Core VIP Pitch */}
          <section id="vip-pitch" className="text-center" aria-labelledby="vip-offer-title">
            <div className="mb-8 md:mb-10 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xs px-5 py-2.5 border border-white/15">
                <span className="text-xs sm:text-sm text-white/85 font-semibold">
                  A 30-minute interactive session immediately after the masterclass
                </span>
              </div>
            </div>

            <motion.h2
              id="vip-offer-title"
              className="text-4xl md:text-5xl font-display text-gradient mb-5 md:mb-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
            >
              Want to Go Deeper?
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-[46rem] mx-auto leading-relaxed md:leading-relaxed mb-8 md:mb-10"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              Upgrade to our VIP package for just $19 and stay after the masterclass for a{" "}
              <strong>30-minute immersive inner game experience</strong> with Alex to apply the concepts you've learned on the spot.
            </motion.p>

            {/* 3. Dynamic Date & Time from eventMeta */}
            <motion.div
              className="flex flex-col items-center gap-3 md:gap-4 text-sm md:text-base text-white/90 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: 0.15 }}
              aria-label="VIP session date and time"
            >
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">Date: {eventMeta.displayDate}</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">Time: Immediately following the masterclass</span>
              </span>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={handleBuy}
                className="btn-primary relative overflow-hidden group text-lg px-9 py-4.5 md:px-10 md:py-5"
                aria-label="Upgrade to the full VIP experience for just $19"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Yes, Add VIP Access — $19
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>
          </section>

          {/* Perks Section (Unchanged) */}
          <section aria-labelledby="perks-title" className="pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
              {PERKS.map((perk, i) => (
                <motion.div key={perk.title} className="relative flex items-center justify-center h-[300px] md:h-[320px] text-center p-7 md:p-8 rounded-2xl overflow-hidden" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <img src={perk.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover brightness-50" />
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

          {/* FAQ Section (Unchanged) */}
          <section aria-labelledby="faq-title" className="pt-2">
            <h2 id="faq-title" className="text-3xl md:text-4xl font-display text-center mb-8 md:mb-10">Frequently Asked Questions</h2>
            <div className="space-y-5 md:space-y-6 max-w-2xl mx-auto">
              <details className="group glass-card rounded-2xl"><summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer"><span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">Who is the VIP experience for?</span><ChevronDown className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180" /></summary><div className="px-6 md:px-7 pb-6 -mt-2"><p className="text-gray-300 leading-relaxed">The VIP package is for those who want to apply what they've learned in a very real and hands-on way with a small group of other dedicated sales professionals.</p></div></details>
              <details className="group glass-card rounded-2xl"><summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer"><span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">I already bought my masterclass ticket. Is this included?</span><ChevronDown className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180" /></summary><div className="px-6 md:px-7 pb-6 -mt-2"><p className="text-gray-300 leading-relaxed">Your masterclass ticket is secured! This is a separate, optional upgrade for a more intimate, hands-on session after the main event.</p></div></details>
              <details className="group glass-card rounded-2xl"><summary className="flex items-start gap-4 p-6 md:p-7 cursor-pointer"><span className="flex-1 text-lg md:text-xl font-semibold leading-snug text-left">Is this my only chance to upgrade?</span><ChevronDown className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180" /></summary><div className="px-6 md:px-7 pb-6 -mt-2"><p className="text-gray-300 leading-relaxed">We intentionally keep this group small and intimate to get the most out of the experience. These tickets will be available until they are not.</p></div></details>
            </div>
          </section>

          {/* Alex Pull-Quote (Unchanged) */}
          <motion.section aria-labelledby="alex-quote" className="relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <div className="edge-glow rounded-3xl"><div className="glass-card rounded-3xl overflow-hidden"><div className="relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-10 p-6 sm:p-8 md:p-10"><div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 60% at 15% 10%, rgba(255,228,94,0.08) 0%, rgba(255,228,94,0) 55%), radial-gradient(70% 50% at 85% 90%, rgba(96,116,255,0.10) 0%, rgba(96,116,255,0) 60%)" }} /><div className="relative justify-self-center md:justify-self-start flex flex-col items-center md:block"><div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto md:mx-0 shrink-0"><img src="https://alluviance.s3.us-east-2.amazonaws.com/images/alex-headshot.jpeg" alt="Alex Kremer" className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/40 ring-4 ring-white/5" loading="lazy" /><span className="absolute -inset-1 rounded-3xl border border-[#FFE45E]/25 blur-[1px] pointer-events-none" /></div><div className="mt-3 sm:mt-4 text-center md:text-left"><p className="text-white font-semibold leading-tight">Alex Kremer</p><p className="text-white/70 text-xs sm:text-sm leading-snug">Host, Inner <span className="block sm:inline">Game Masterclass</span></p></div></div><div className="relative"><span aria-hidden className="absolute -top-3 -left-3 md:-top-6 md:-left-6 text-6xl md:text-8xl font-serif text-white/10 leading-none select-none">“</span><h3 id="alex-quote" className="sr-only">A note from Alex</h3><blockquote className="relative text-left"><p className="text-2xl sm:text-3xl md:text-4xl font-display tracking-tight leading-snug">If you're committed to your own journey, this will be the easiest <span className="text-[#FFE45E] font-bold">$19</span> you'll ever spend. This is where we go deeper and apply the concepts from the masterclass in a small, interactive group.</p></blockquote></div></div></div></div>
          </motion.section>

          {/* Final CTA */}
          <section className="glass-card p-8 text-center">
            <h2 className="text-3xl font-display">Lock in your VIP Spot</h2>
            <p className="mt-2 text-gray-300">This is your only chance to upgrade before the masterclass.</p>
            <div className="mt-6">
              <button onClick={handleBuy} className="bg-neon-yellow text-alluBlue-900 font-bold text-lg rounded-full px-10 py-4 shadow-lg hover:shadow-neon-yellow/40 transition-all duration-300 hover:scale-105 active:scale-95" aria-label="Buy VIP access for $19">
                Yes, Add VIP Access — $19
              </button>
              <p className="mt-3 text-sm text-gray-400">One-time payment • Full replay included</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}