import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    company: "RK Fabrication Works",
    country: "India",
    content: "The leather welding hood quality is outstanding. It provides excellent protection against sparks and heat, and the comfort level is very good for long working hours.",
    rating: 5,
  },
  {
    name: "Amit Das",
    company: "Eastern Metal Industries",
    country: "India",
    content: "Very durable and well-stitched safety hood. The material feels premium and gives full coverage during welding operations.",
    rating: 5,
  },
  {
    name: "Daniel Foster",
    company: "Foster Industrial Supplies",
    country: "United Kingdom",
    content: "We imported welding safety products from BroBond and were highly impressed with the product quality, packaging, and timely shipment process.",
    rating: 5,
  },
  {
    name: "Ahmed Al Rashid",
    company: "Al Rashid Safety Equipment LLC",
    country: "UAE",
    content: "BroBond has been a reliable export partner for our safety equipment requirements. Their leather protective products meet international quality expectations consistently.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-red-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block bg-red-50 text-[#E0323C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#212529] mb-3">
            Client <span className="text-[#E0323C]">Reviews</span>
          </h2>
          <p className="text-[#6F7183] max-w-lg mx-auto text-sm sm:text-base font-sans">
            Trusted by procurement teams worldwide
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-6 sm:p-8 md:p-10 lg:p-14 text-center rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-6 sm:top-6 sm:left-8 opacity-[0.06]">
                <Quote className="h-20 w-20 sm:h-28 sm:w-28 text-[#E0323C]" />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1.5 mb-6 sm:mb-8 relative z-10">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <p className="text-base sm:text-lg md:text-xl text-[#212529] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto italic font-sans relative z-10">
                "{testimonial.content}"
              </p>

              {/* Divider */}
              <div className="w-12 h-1 bg-[#E0323C] mx-auto mb-4 sm:mb-6 rounded-full" />

              {/* Author */}
              <div className="relative z-10">
                <p className="font-heading font-bold text-[#212529] text-base sm:text-lg">{testimonial.name}</p>
                <p className="text-xs sm:text-sm text-[#6F7183] font-sans mt-1">
                  <span className="text-[#E0323C] font-medium">{testimonial.company}</span> • {testimonial.country}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full text-[#212529] hover:bg-[#E0323C] hover:text-white shadow-lg border border-gray-100 hover:border-[#E0323C] transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-[#E0323C]" : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-200 hover:bg-gray-300"
                    }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full text-[#212529] hover:bg-[#E0323C] hover:text-white shadow-lg border border-gray-100 hover:border-[#E0323C] transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
