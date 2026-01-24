import { motion } from "framer-motion";
import { Factory, Globe, Shield, Package, ArrowRight } from "lucide-react";
import { QUICK_HIGHLIGHTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  Factory,
  Globe,
  Shield,
  Package,
};

export function HighlightsSection() {
  return (
    <section className="section-padding-sm section-light">
      <div className="container-wide">
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 auto-rows-[250px]">
          {QUICK_HIGHLIGHTS.map((highlight, index) => {
            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
            
            // Bento Grid Layout Logic
            // Item 0: Manufactured in Kolkata -> Span 1
            // Item 1: Global Export Network -> Span 2 (Featured)
            // Item 2: Premium Quality -> Span 1
            // Item 3: Reliable Delivery -> Span 2 (Featured)
            
            // Adjusting indices to match the desired layout:
            // Let's make index 1 (Global Export) and index 3 (Delivery) span 2 columns
            // But wait, the array order is:
            // 0: Factory, 1: Globe, 2: Shield, 3: Package
            
            const isWide = index === 1 || index === 3;
            
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover-lift flex flex-col justify-between",
                  isWide ? "md:col-span-2 bg-gradient-to-br from-[hsl(var(--card))] to-secondary/30" : "md:col-span-1 bg-card",
                  "border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-md"
                )}
              >
                {/* Background Decoration for Wide Cards */}
                {isWide && (
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                )}

                <div className="relative z-10">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                    isWide ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-primary"
                  )}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {highlight.description}
                  </p>
                </div>

                {isWide && (
                  <div className="relative z-10 mt-6 flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
