import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2000",
    subtitle: "Trusted by 500+ Global Clients",
    headline: "Premium Industrial",
    headlineAccent: "Safety Gloves",
    description: "Manufactured with precision for maximum protection. Exported to 50+ countries with ISO-certified quality assurance.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=2000",
    subtitle: "State-of-the-Art Manufacturing",
    headline: "Precision",
    headlineAccent: "At Scale",
    description: "10M+ gloves produced annually in our modern facility with stringent multi-stage quality checks.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000",
    subtitle: "Export Excellence Since 2010",
    headline: "Global Export",
    headlineAccent: "Standards",
    description: "Trusted by procurement teams worldwide for reliable bulk supply, custom branding, and on-time delivery.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
  }),
};

export function HeroSection() {
  const [[currentSlide, direction], setSlide] = useState([0, 0]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlide(([prev]) => [(prev + 1) % SLIDES.length, 1]);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const paginate = (newDirection: number) => {
    setSlide(([prev]) => {
      const next = newDirection > 0
        ? (prev + 1) % SLIDES.length
        : (prev - 1 + SLIDES.length) % SLIDES.length;
      return [next, newDirection];
    });
    startTimer();
  };

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden mt-[68px]">
      {/* Slide images — horizontal slide transition, no white flash */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#212529]/85 via-[#212529]/55 to-[#212529]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#212529]/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative glow */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-[#E0323C]/10 rounded-full blur-3xl pointer-events-none z-[1] hidden md:block" />

      {/* Content — Left Aligned */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-wide">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-4 md:space-y-5"
              >
                {/* Subtitle Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-sans px-4 sm:px-5 py-1.5 sm:py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#E0323C] animate-pulse" />
                    {slide.subtitle}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-[0.95] tracking-tight"
                >
                  {slide.headline}
                  <br />
                  <span className="text-[#E0323C]">{slide.headlineAccent}</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-white/70 max-w-md leading-relaxed font-sans font-light"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3 pt-2"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#E0323C] hover:bg-[#c92a34] text-white rounded-full px-6 sm:px-7 h-11 sm:h-12 text-sm font-bold uppercase tracking-wider shadow-2xl shadow-[#E0323C]/30 hover:-translate-y-1 transition-all group w-full sm:w-auto"
                  >
                    <Link to="/contact">
                      Enquire Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-white/30 text-white rounded-full px-6 sm:px-7 h-11 sm:h-12 text-sm font-semibold hover:bg-white hover:text-[#212529] transition-all w-full sm:w-auto"
                  >
                    <Link to="/products">
                      View Products
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20">
        <div className="container-wide flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const dir = index > currentSlide ? 1 : -1;
                  setSlide([index, dir]);
                  startTimer();
                }}
                className={`rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 sm:w-10 h-2 bg-[#E0323C]" : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Nav Arrows */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#212529] transition-all backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#212529] transition-all backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
