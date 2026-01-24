import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Factory, Globe, Truck, Shield, Award, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, TRUST_BADGES } from "@/lib/constants";

const iconMap = {
  Factory,
  Globe,
  Truck,
  Shield,
  Award,
  Package,
};

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Countries Served" },
  { value: "500K+", label: "Units Monthly" },
  { value: "100%", label: "Export Ready" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-dark noise-overlay">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      
      {/* Animated Floating Glow - moves across hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]"
          animate={{
            x: ["-10%", "80%", "50%", "20%", "-10%"],
            y: ["-20%", "10%", "60%", "30%", "-20%"],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bg-steel/15 rounded-full blur-[120px]"
          animate={{
            x: ["80%", "20%", "-10%", "60%", "80%"],
            y: ["60%", "20%", "50%", "80%", "60%"],
            scale: [0.8, 1.1, 1, 0.9, 0.8],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px]"
          animate={{
            x: ["50%", "10%", "70%", "30%", "50%"],
            y: ["30%", "70%", "20%", "50%", "30%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Global Route Lines SVG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0 400 Q300 200 600 400 T1200 400"
            stroke="url(#routeGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 500 Q400 300 800 500 T1200 300"
            stroke="url(#routeGradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
          />
          <motion.path
            d="M100 600 Q500 400 900 600 T1100 200"
            stroke="url(#routeGradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 5, delay: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(254 100% 65%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(254 100% 65%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(254 100% 65%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-wide relative z-10 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-8"
          >
            <Factory className="h-4 w-4" />
            Manufacturer & Merchant Exporter
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] text-balance"
          >
            Premium Industrial Gloves.{" "}
            <span className="text-gradient">Global Supply.</span>{" "}
            <br className="hidden lg:block" />
            Export-Ready Quality.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto prose-custom"
          >
            {COMPANY.description} Trusted by distributors and procurement teams across 50+ countries.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button asChild size="lg" className="text-base px-8 btn-glow">
              <Link to="/products">View Products</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {TRUST_BADGES.map((badge, index) => {
              const Icon = iconMap[badge.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white/90">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="card-elevated-dark p-5 md:p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-10 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full text-[hsl(var(--section-light))] fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </section>
  );
}
