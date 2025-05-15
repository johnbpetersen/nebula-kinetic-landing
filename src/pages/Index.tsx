
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check } from "lucide-react";

// Meta data
const META_TITLE = "Inner Game Webinar | Alluviance";
const META_DESCRIPTION = "Transform your sales approach with 'The Inner Game of Sales' webinar. Learn psychological techniques to overcome objections, build authentic connections & close more deals without feeling pushy. June 25th.";

// Helper components
const GlassCard = ({ children, className = "" }) => {
  return <div className={`glass-card ${className}`}>{children}</div>;
};

const MotionSection = ({ children, className = "" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={`section-spacing ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Blob decorations
const Blob = ({ className, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -20, 0],
        opacity: [0.2, 0.3, 0.2]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay
      }}
    />
  );
};

// Starfield background
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.1; // Slightly taller to avoid white space on scroll
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create stars
    const createStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.3
        });
      }
    };
    
    createStars();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(228, 231, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars
        star.y -= star.speed;
        
        // Reset stars that go off screen
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full bg-gradient-to-b from-alluBlue-800 to-alluBlue-900 z-0"
    />
  );
};

// Video player with parallax effect
const VideoPlayer = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation (max 3 degrees)
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 3;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-full h-full max-w-2xl mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
    >
      <motion.div 
        className="glass-card overflow-hidden"
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="aspect-video relative">
          <video 
            className="w-full h-full object-cover rounded-3xl"
            poster="/public/assets/video-poster.jpg"
            controls
          >
            <source src="/public/assets/vsl.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </div>
  );
};

// Logo marquee
const LogoMarquee = ({ logos }: { logos: string[] }) => {
  const [isPaused, setIsPaused] = useState(false);
  
  return (
    <div 
      className="w-full overflow-hidden bg-white/5 backdrop-blur-sm py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center section-container">
        <div className={`flex gap-12 items-center ${isPaused ? "" : "animate-marquee"}`}>
          {logos.concat(logos).map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt="Client Logo" 
              className="h-8 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Pillar card
const PillarCard = ({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) => {
  return (
    <motion.div
      className="glass-card p-8 h-full transition-all hover:translate-y-[-5px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <img src={icon} alt={title} className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </motion.div>
  );
};

// Countdown timer
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const [flipping, setFlipping] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Trigger flip animation
      if (timeLeft.seconds !== seconds) {
        setFlipping(prev => ({ ...prev, seconds: true }));
        setTimeout(() => setFlipping(prev => ({ ...prev, seconds: false })), 500);
      }
      
      if (timeLeft.minutes !== minutes) {
        setFlipping(prev => ({ ...prev, minutes: true }));
        setTimeout(() => setFlipping(prev => ({ ...prev, minutes: false })), 500);
      }
      
      if (timeLeft.hours !== hours) {
        setFlipping(prev => ({ ...prev, hours: true }));
        setTimeout(() => setFlipping(prev => ({ ...prev, hours: false })), 500);
      }
      
      if (timeLeft.days !== days) {
        setFlipping(prev => ({ ...prev, days: true }));
        setTimeout(() => setFlipping(prev => ({ ...prev, days: false })), 500);
      }
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate, timeLeft]);
  
  const TimeDigit = ({ value, label, flipping }: { value: number; label: string; flipping: boolean }) => {
    const formattedValue = value.toString().padStart(2, '0');
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative h-20 w-16 md:w-20 perspective">
          <div className={`h-full w-full rounded-md bg-alluBlue-700 text-white flex justify-center items-center text-2xl md:text-3xl font-bold ${flipping ? 'animate-flip' : ''}`}>
            {formattedValue}
          </div>
        </div>
        <span className="text-xs mt-2 opacity-70">{label}</span>
      </div>
    );
  };
  
  return (
    <div className="flex justify-center gap-4">
      <TimeDigit value={timeLeft.days} label="DAYS" flipping={flipping.days} />
      <TimeDigit value={timeLeft.hours} label="HOURS" flipping={flipping.hours} />
      <TimeDigit value={timeLeft.minutes} label="MINUTES" flipping={flipping.minutes} />
      <TimeDigit value={timeLeft.seconds} label="SECONDS" flipping={flipping.seconds} />
    </div>
  );
};

// Testimonial card
const TestimonialCard = ({ content, name, role, image, className = "" }: 
  { content: string; name: string; role: string; image?: string; className?: string }) => {
  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex gap-3 items-center mb-4">
        {image && (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm opacity-70">{role}</p>
        </div>
      </div>
      <p className="italic opacity-80">&ldquo;{content}&rdquo;</p>
    </GlassCard>
  );
};

// FAQ Section
const faqs = [
  {
    question: "When exactly is the webinar?",
    answer: "The webinar is scheduled for June 25th at 10:00 AM EDT. It will run for approximately 90 minutes with time for Q&A at the end."
  },
  {
    question: "Will there be a recording available?",
    answer: "Yes, all registered participants will receive a recording of the webinar. However, live attendees will have access to exclusive bonuses and the ability to ask questions."
  },
  {
    question: "What topics will be covered?",
    answer: "The webinar covers psychological techniques to overcome objections, build authentic connections, and close more deals without feeling pushy. We'll explore mindset shifts, practical communication strategies, and real-world examples."
  },
  {
    question: "Is this relevant for B2B sales professionals?",
    answer: "Absolutely! The Inner Game principles apply to both B2B and B2C contexts. We'll provide specific examples for different sales environments."
  },
  {
    question: "What if I can't attend the full session?",
    answer: "Register anyway! You'll receive the recording and all materials, though live attendees will have access to exclusive Q&A and special offers."
  }
];

// Main component
const Index = () => {
  const [isHovering, setIsHovering] = useState(false);
  
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
      { property: 'og:type', content: 'website' }
    ];
    
    ogTags.forEach(tag => {
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
    "/public/assets/logo1.svg",
    "/public/assets/logo2.svg",
    "/public/assets/logo3.svg",
    "/public/assets/logo4.svg",
    "/public/assets/logo5.svg",
    "/public/assets/logo6.svg",
  ];
  
  const pillars = [
    {
      icon: "/public/assets/icon-mindset.svg",
      title: "Mindset Mastery",
      description: "Overcome limiting beliefs and develop the psychological foundations for sales success."
    },
    {
      icon: "/public/assets/icon-connection.svg",
      title: "Authentic Connection",
      description: "Build genuine rapport that makes prospects feel understood and valued."
    },
    {
      icon: "/public/assets/icon-close.svg",
      title: "Effortless Closing",
      description: "Guide conversations to natural conclusions without pressure or manipulation."
    }
  ];
  
  const testimonials = [
    {
      content: "This webinar completely transformed my approach to sales. I'm closing 40% more deals with half the stress.",
      name: "Sarah Johnson",
      role: "Sales Director, TechCorp",
      image: "/public/assets/testimonial1.jpg"
    },
    {
      content: "The psychological insights were game-changing for my team. We've improved conversion rates across the board.",
      name: "Michael Chen",
      role: "VP Sales, GrowthFirst",
      image: "/public/assets/testimonial2.jpg"
    },
    {
      content: "Finally, a sales training that focuses on authenticity rather than tricks. My clients can feel the difference.",
      name: "Jessica Miller",
      role: "Independent Consultant",
      image: "/public/assets/testimonial3.jpg"
    }
  ];

  return (
    <>
      <head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
      </head>
      
      <main className="overflow-hidden relative">
        {/* Hero Section with Starfield */}
        <section className="relative min-h-[90vh] flex items-center">
          <Starfield />
          
          {/* Decorative blobs */}
          <Blob className="w-[500px] h-[500px] bg-alluBlue-400 top-20 -right-64" delay={2} />
          <Blob className="w-[600px] h-[600px] bg-alluBlue -top-64 left-40" delay={0} />
          <Blob className="w-[300px] h-[300px] bg-neon-yellow bottom-20 -left-20" delay={4} />
          
          <div className="section-container relative z-10 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block mb-2">Master</span>
                  <span className="text-gradient">The Inner Game</span>
                  <span className="block mt-2">of Sales</span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl opacity-80 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Transform your sales approach with psychological techniques to overcome objections, 
                  build authentic connections & close more deals without feeling pushy.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <button 
                    className="btn-primary group relative overflow-hidden"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    Register Now - Free Webinar
                    <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={18} />
                    </span>
                    <motion.span 
                      className="absolute inset-0 rounded-full bg-neon-yellow/20"
                      animate={isHovering ? { 
                        scale: [1, 1.5], 
                        opacity: [0.8, 0] 
                      } : {}}
                      transition={{ 
                        duration: 1,
                        repeat: isHovering ? Infinity : 0,
                        repeatType: "loop"
                      }}
                    />
                  </button>
                </motion.div>
              </div>
              
              <div className="relative">
                <VideoPlayer />
              </div>
            </div>
          </div>
        </section>
        
        {/* Logo Marquee */}
        <LogoMarquee logos={logosPaths} />
        
        {/* Problem → Solution Section */}
        <MotionSection className="bg-alluBlue-900 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-alluBlue-900" style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 30%)"
          }}></div>
          
          <div className="section-container relative z-10 pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Most Sales Training Fails</h2>
                
                <ul className="space-y-6">
                  {[
                    "Relies on outdated pushy tactics that modern buyers reject",
                    "Ignores the psychological barriers preventing sales success",
                    "Focuses on scripts instead of authentic connection",
                    "Creates more anxiety and burnout for sales professionals",
                    "Doesn't adapt to today's informed and skeptical buyers"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex gap-4 items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-red-500 mt-1">🔥</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center">
                <GlassCard className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">The Inner Game Difference</h3>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Master the psychology behind buyer decisions",
                      "Remove internal blocks to selling with confidence",
                      "Develop genuine connection techniques that feel natural",
                      "Learn to navigate objections without anxiety",
                      "Close deals without feeling pushy or manipulative"
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex gap-3 items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                      >
                        <span className="text-neon-yellow mt-1">
                          <Check size={18} className="animate-bounce-slow" />
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <button className="btn-secondary w-full">
                    Learn The Inner Game Approach
                  </button>
                </GlassCard>
              </div>
            </div>
          </div>
        </MotionSection>
        
        {/* Pillars Section */}
        <MotionSection className="bg-alluBlue-800">
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              The Three Pillars of Sales Mastery
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => (
                <PillarCard key={index} {...pillar} index={index} />
              ))}
            </div>
          </div>
        </MotionSection>
        
        {/* Countdown Section */}
        <MotionSection className="bg-alluBlue-900">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Secure Your Spot</h2>
            
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">
              Join us on June 25th at 10AM EDT for this transformative webinar. 
              Limited spots available.
            </p>
            
            <div className="mb-12">
              <CountdownTimer targetDate={targetDate} />
            </div>
            
            <button 
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Register Free Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 w-full transform translate-x-[-100%] bg-gradient-to-r from-neon-yellow/0 via-neon-yellow/30 to-neon-yellow/0 group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            </button>
          </div>
        </MotionSection>
        
        {/* Testimonial Section */}
        <MotionSection className="bg-alluBlue-800">
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              What Sales Leaders Are Saying
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index} 
                  {...testimonial}
                />
              ))}
            </div>
          </div>
        </MotionSection>
        
        {/* FAQ Section */}
        <MotionSection className="bg-alluBlue-900">
          <div className="section-container max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Frequently Asked Questions
            </h2>
            
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
        
        {/* Final CTA */}
        <MotionSection className="bg-alluBlue-800">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Master The Inner Game?</h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-12">
              Join hundreds of sales professionals who have transformed their results 
              through the power of psychology and authentic connection.
            </p>
            
            <button className="btn-primary text-lg px-10 py-4">
              Register For The Free Webinar
            </button>
          </div>
        </MotionSection>
        
        {/* Footer */}
        <footer className="bg-alluBlue-900 py-8 border-t border-white/10">
          <div className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="opacity-70 text-sm">© 2025 Alluviance. All rights reserved.</p>
              </div>
              
              <div className="flex gap-6">
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</a>
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Terms of Service</a>
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
