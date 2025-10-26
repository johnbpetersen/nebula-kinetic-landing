// src/pages/Checkout.tsx
// V9 - Corrected the Masterclass features list and reverted footer button copy.

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronDown, Sparkles } from "lucide-react";

// --- Correct Payment Links ---
const MASTERCLASS_PAYMENT_URL = "https://payments-na1.hubspot.com/payments/Fb6hpfSpPs7?referrer=PAYMENT_LINK";
const BUNDLE_PAYMENT_URL = "https://payments-na1.hubspot.com/payments/HFbZMfrSCDFjR?referrer=PAYMENT_LINK";
// -----------------------------

// A simplified Starfield component for the background.
const Starfield: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let stars: { x: number, y: number, size: number, speed: number }[] = [];
    const createStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const starCount = window.innerWidth < 768 ? 100 : 200;
      for (let i = 0; i < starCount; i++) {
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 1.5, speed: Math.random() * 0.2 + 0.1 });
      }
    };
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(228, 231, 255, 0.8)';
      stars.forEach(star => {
        star.y -= star.speed; if (star.y < 0) { star.y = canvas.height; }
        ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI); ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    createStars(); animate();
    window.addEventListener('resize', createStars);
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', createStars); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const vipInterest = searchParams.get("vip") === "true";

  React.useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: "view_checkout", page: "checkout", vip_interest: vipInterest });
  }, [vipInterest]);

  return (
    <div className="relative min-h-screen bg-alluBlue-900 text-white font-sans overflow-hidden">
      <Helmet>
        <title>Complete Your Registration | Alluviance Masterclass</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Starfield />

      <main className="relative z-10 section-container py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <motion.div className="text-center mb-12 md:mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-display text-gradient mb-4">
              Let's Lock In Your Spot!
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              One final step. Choose your masterclass experience. In the 30 minutes immediately after the masterclass, we're hosting a can't miss VIP Experience!
            </p>
          </motion.div>

          {/* Checkout Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            
            {/* Option 1: Standard Masterclass */}
            <motion.div 
              className="bg-alluBlue-800/50 backdrop-blur-md p-8 rounded-3xl h-full flex flex-col" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl font-display">Masterclass Access</h2>
              <p className="text-5xl font-display my-4">$27</p>
              <p className="text-gray-300 mb-6">The complete masterclass to build the foundation of your inner game.</p>
              <div className="space-y-3 text-gray-200 flex-grow">
                <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-neon-yellow mt-1 shrink-0" /><span>60-Minute Masterclass</span></p>
                <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-neon-yellow mt-1 shrink-0" /><span>Actionable Inner Game Frameworks</span></p>
                <p className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-neon-yellow mt-1 shrink-0" /><span>Full Masterclass Replay</span></p>
              </div>
              <a href={MASTERCLASS_PAYMENT_URL} className="block mt-8 text-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white font-semibold hover:scale-105 active:scale-95 transition-all hover:bg-white/20">
                Grab Your Masterclass ticket now!
              </a>
            </motion.div>

            {/* Option 2: VIP Bundle */}
            <motion.div 
              className="relative edge-glow h-full" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-full flex flex-col p-8 bg-alluBlue-800 shadow-xl shadow-black/40 rounded-3xl">
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-neon-yellow text-alluBlue-900 text-sm font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">Most Popular</div>
                <h2 className="text-2xl font-display">Masterclass + VIP Bundle</h2>
                <p className="text-5xl font-display my-4">$46</p>
                <p className="text-gray-300 mb-6">The complete experience to not only learn the concepts but apply them immediately.</p>
                <div className="space-y-3 text-gray-200 flex-grow">
                  <p className="flex items-start gap-3 font-semibold"><CheckCircle className="w-5 h-5 text-neon-yellow mt-1 shrink-0" /><span>Everything in the standard package, <span className="text-neon-yellow">PLUS...</span></span></p>
                  <p className="flex items-start gap-3 pl-4"><Sparkles className="w-5 h-5 text-alluBlue-300 mt-1 shrink-0" /><span>30-Min Interactive VIP Session with Alex</span></p>
                  <p className="flex items-start gap-3 pl-4"><Sparkles className="w-5 h-5 text-alluBlue-300 mt-1 shrink-0" /><span>Priority Q&A to Get Your Questions Answered</span></p>
                  <p className="flex items-start gap-3 pl-4"><Sparkles className="w-5 h-5 text-alluBlue-300 mt-1 shrink-0" /><span>Interactive Inner Game Practice with other sales professionals</span></p>
                </div>
                <a href={BUNDLE_PAYMENT_URL} className="btn-primary group relative overflow-hidden block mt-8 text-center px-8 py-4 rounded-full text-lg font-semibold">
                  <span className="relative z-10 flex items-center justify-center gap-2">Unlock the full VIP Experience <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Alex Pull-Quote */}
          <motion.section aria-labelledby="alex-quote" className="relative mt-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <div className="edge-glow-subtle rounded-3xl">
              <div className="glass-card rounded-3xl overflow-hidden">
                <div className="relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-10 p-6 sm:p-8 md:p-10">
                  <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 60% at 15% 10%, rgba(96,116,255,0.08) 0%, rgba(96,116,255,0) 55%), radial-gradient(70% 50% at 85% 90%, rgba(62,71,151,0.10) 0%, rgba(62,71,151,0) 60%)" }} />
                  <div className="relative justify-self-center md-justify-self-start flex flex-col items-center md:block">
                    <div className="relative w-28 h-28 mx-auto md:mx-0 shrink-0">
                      <img src="https://alluviance.s3.us-east-2.amazonaws.com/images/alex-headshot.jpeg" alt="Alex Kremer" className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/40 ring-4 ring-white/5" loading="lazy" />
                      <span className="absolute -inset-1 rounded-3xl border border-alluBlue-400/25 blur-[1px] pointer-events-none" />
                    </div>
                    <div className="mt-3 sm:mt-4 text-center md:text-left">
                      <p className="text-white font-semibold leading-tight">Alex Kremer</p>
                      <p className="text-white/70 text-xs sm:text-sm leading-snug">Host, Inner Game Masterclass</p>
                    </div>
                  </div>
                  <div className="relative">
                    <span aria-hidden className="absolute -top-3 -left-3 md:-top-6 md:-left-6 text-6xl md:text-8xl font-serif text-white/10 leading-none select-none">“</span>
                    <h3 id="alex-quote" className="sr-only">A note from Alex</h3>
                    <blockquote className="relative text-left">
                      <p className="text-2xl sm:text-3xl font-display tracking-tight leading-snug">If you're committed to your own journey, this will be the easiest investment you'll ever make. In Beyond Tactics, we reveal the Inner Game levers top 1 % reps pull to close faster, feel fulfilled, and leave burnout behind.</p>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

           {/* Mini FAQ Section */}
           <section aria-labelledby="faq-title" className="pt-16">
            <h2 id="faq-title" className="text-3xl font-display text-center mb-8">Your Questions, Answered</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <details className="group glass-card rounded-2xl"><summary className="flex items-start gap-4 p-6 cursor-pointer"><span className="flex-1 text-lg font-semibold leading-snug text-left">Who is the VIP experience for and what do I get with it that's not included in the Masterclass?</span><ChevronDown className="w-5 h-5 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180" /></summary><div className="px-6 pb-6 -mt-2"><p className="text-gray-300 leading-relaxed">The VIP package is for those who don't like to sit back and wait. You will have the opportunity to meet other sales professionals who also are on their own journey to improve their inner game. And you'll get to apply what you've learned in a very real and hands-on way.</p></div></details>
              <details className="group glass-card rounded-2xl"><summary className="flex items-start gap-4 p-6 cursor-pointer"><span className="flex-1 text-lg font-semibold leading-snug text-left">What happens after I purchase?</span><ChevronDown className="w-5 h-5 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180" /></summary><div className="px-6 pb-6 -mt-2"><p className="text-gray-300 leading-relaxed">You'll be immediately redirected to a confirmation page and receive an email with your calendar invite and all the details you need for the event.</p></div></details>
              <details className="group glass-card rounded-2xl"><summary className="flex items-start gap-4 p-6 cursor-pointer"><span className="flex-1 text-lg font-semibold leading-snug text-left">What if I can't attend live?</span><ChevronDown className="w-5 h-5 shrink-0 text-white/70 transition-transform duration-300 group-open:rotate-180" /></summary><div className="px-6 pb-6 -mt-2"><p className="text-gray-300 leading-relaxed">No problem. The full replay of the masterclass (and the VIP session if you choose the bundle) will be sent to your inbox after the event. A member of our team will follow-up after the event to make sure we answer all of your inner game questions.</p></div></details>
            </div>
          </section>

          {/* Final CTA Section */}
          <motion.section 
            className="glass-card p-8 md:p-10 text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display">Your Inner Game Journey Awaits...</h2>
            <p className="mt-2 text-gray-300 max-w-xl mx-auto">
              This is where the real work and the real results begin.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={MASTERCLASS_PAYMENT_URL} 
                className="btn-secondary w-full sm:w-auto text-base px-8 py-4"
              >
                Masterclass Only — $27
              </a>
              <a 
                href={BUNDLE_PAYMENT_URL} 
                className="btn-primary group relative overflow-hidden w-full sm:w-auto text-base px-8 py-4"
              >
                <span className="relative z-10">Get the VIP Bundle — $46</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">One-time payment • Full replay included with both options</p>
          </motion.section>

        </div>
      </main>
    </div>
  );
}