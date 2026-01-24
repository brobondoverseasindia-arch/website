import { motion } from "framer-motion";
import { Factory, Globe, Shield, Package, ArrowRight, Sparkles } from "lucide-react";
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
    <section className="section-padding-sm bg-secondary/30 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 auto-rows-[280px]">
          {QUICK_HIGHLIGHTS.map((highlight, index) => {
            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
            
            // Layout: 
            // 0: Small
            // 1: Wide (Global)
            // 2: Small
            // 3: Wide (Delivery)
            const isWide = index === 1 || index === 3;
            
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] p-8 transition-all duration-500",
                  "bg-white dark:bg-card border border-white/50 dark:border-white/5",
                  "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
                  isWide ? "md:col-span-2" : "md:col-span-1"
                )}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                      isWide 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : "bg-secondary text-primary dark:bg-secondary/50"
                    )}>
                      <Icon className="h-7 w-7" />
                    </div>
                    {isWide && (
                      <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-[15px]">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
