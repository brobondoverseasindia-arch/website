import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="section-padding section-dark noise-overlay relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Trusted by Global Partners"
            subtitle="See what our international customers say about their experience with BroBond Overseas."
            dark
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="card-elevated-dark p-8 md:p-12 text-center relative overflow-hidden"
              >
                {/* Decorative quote */}
                <div className="absolute top-6 left-6 opacity-10">
                  <Quote className="h-16 w-16 text-primary" />
                </div>
                
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="h-5 w-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                  "{testimonial.content}"
                </p>

                {/* Divider */}
                <div className="divider-dark max-w-32 mx-auto mb-6" />

                {/* Author */}
                <div>
                  <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                  <p className="text-sm text-white/60">
                    {testimonial.company} • {testimonial.country}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-primary w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
