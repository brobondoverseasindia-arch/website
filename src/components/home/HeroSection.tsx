import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Factory, Globe, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, TRUST_BADGES } from "@/lib/constants";

const iconMap = {
  Factory,
  Globe,
  Truck,
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-bg">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-wide relative">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6"
            >
              <Factory className="h-4 w-4" />
              Manufacturer & Merchant Exporter
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Premium Industrial Gloves.{" "}
              <span className="text-gradient">Global Supply.</span>{" "}
              Export-Ready Quality.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {COMPANY.description} Trusted by distributors and procurement teams across 50+ countries.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/products">View Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {TRUST_BADGES.map((badge) => {
                const Icon = iconMap[badge.icon as keyof typeof iconMap];
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm border border-border"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
