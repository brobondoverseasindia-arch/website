import { motion } from "framer-motion";
import { Factory, Globe, Shield, Package } from "lucide-react";
import { QUICK_HIGHLIGHTS } from "@/lib/constants";

const iconMap = {
  Factory,
  Globe,
  Shield,
  Package,
};

export function HighlightsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {QUICK_HIGHLIGHTS.map((highlight, index) => {
            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border card-shadow hover-lift"
              >
                <div className="w-12 h-12 rounded-lg gradient-purple flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
