import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HighlightsSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3] group">
              <img
                src="https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=1000"
                alt="BroBond Overseas Manufacturing Facility"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#212529]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-end gap-4">
                  <span className="text-4xl sm:text-5xl font-heading font-black text-[#E0323C]">15+</span>
                  <span className="text-sm sm:text-base font-heading text-white/90 pb-1">Years of<br />Excellence</span>
                </div>
              </div>
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-gray-100 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#E0323C]" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[#212529] text-sm">ISO 9001:2015</p>
                  <p className="text-xs text-[#6F7183]">Certified Manufacturer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div>
              <span className="inline-block bg-red-50 text-[#E0323C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                About Us
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-black text-[#212529] mb-4 sm:mb-6 leading-tight">
                About <span className="text-[#E0323C]">BroBond Overseas</span>
              </h2>
            </div>

            <div className="space-y-4 text-[#6F7183] text-sm sm:text-base leading-relaxed font-sans">
              <p>
                BroBond Overseas is a premier manufacturer and exporter of high-quality industrial safety gloves, protective aprons, and specialized workwear. We are dedicated to delivering uncompromising safety solutions for the global workforce.
              </p>
              <p>
                With state-of-the-art manufacturing facilities and rigorous quality control protocols, we ensure every product meets the highest international safety standards.
              </p>
            </div>

            <ul className="space-y-3 sm:space-y-4 py-2">
              {[
                "ISO Certified Manufacturing Processes",
                "Custom OEM & ODM Production",
                "Stringent Material Quality Checks",
                "Reliable Global Shipping & Logistics"
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-[#212529]"
                >
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#E0323C]" />
                  </div>
                  <span className="font-sans font-medium text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-2">
              <Button asChild className="bg-[#E0323C] hover:bg-[#c92a34] text-white rounded-full px-8 h-12 font-sans font-bold text-sm group transition-all shadow-lg shadow-[#E0323C]/20 hover:-translate-y-0.5 w-full sm:w-auto">
                <Link to="/about">
                  Read More About Us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
