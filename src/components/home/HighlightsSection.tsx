import { motion } from "framer-motion";
import { Factory, Globe, Shield, Package, Check, MapPin, Truck } from "lucide-react";
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
    <section className="section-padding-sm bg-secondary/10">
      <div className="container-wide">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 md:auto-rows-[300px]">
          {QUICK_HIGHLIGHTS.map((highlight, index) => {
            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
            
            // Grid Layout Logic:
            // 0: Factory -> Tall (Row span 2)
            // 1: Global Export -> Wide (Col span 2)
            // 2: Quality -> Standard
            // 3: Delivery -> Standard
            
            const isTall = index === 0;
            const isWide = index === 1;
            
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-300",
                  isTall ? "md:row-span-2" : "",
                  isWide ? "md:col-span-2" : ""
                )}
              >
                {/* Header Section */}
                <div className="p-6 md:p-8 border-b border-border/50 bg-white dark:bg-card z-10 relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-md bg-secondary text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground uppercase">
                      {highlight.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>

                {/* Visual Section - Technical/Schematic Style */}
                <div className="flex-1 bg-secondary/20 relative overflow-hidden p-6 flex items-center justify-center">
                  
                  {/* Decorative Grid Background */}
                  <div className="absolute inset-0 opacity-[0.05]" 
                       style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                  />

                  {/* 1. Factory Visual (Tall) */}
                  {index === 0 && (
                    <div className="w-full h-full flex flex-col gap-4 relative">
                      {/* Code/Process Block */}
                      <div className="w-full bg-white dark:bg-card border border-border rounded-lg p-4 shadow-sm transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-2 mb-3 border-b border-border/50 pb-2">
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <div className="text-[10px] text-muted-foreground font-mono ml-auto">process.log</div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-3/4 bg-secondary rounded-full" />
                          <div className="h-2 w-1/2 bg-secondary rounded-full" />
                          <div className="h-2 w-5/6 bg-secondary rounded-full" />
                        </div>
                      </div>
                      
                      {/* Pipeline Diagram */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-2 opacity-60">
                         <div className="w-0.5 h-8 bg-border" />
                         <div className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-primary" />
                         </div>
                         <div className="w-0.5 h-8 bg-border" />
                         <div className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-primary/50" />
                         </div>
                      </div>
                    </div>
                  )}

                  {/* 2. Global Export Visual (Wide) */}
                  {index === 1 && (
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                         {/* Abstract Map Grid */}
                         <div className="grid grid-cols-6 gap-4 opacity-30">
                           {Array.from({ length: 18 }).map((_, i) => (
                             <div key={i} className="w-2 h-2 rounded-full bg-primary/20" />
                           ))}
                         </div>
                      </div>
                      
                      {/* Floating Cards */}
                      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-card border border-border p-3 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="text-xs font-mono font-bold">USA</span>
                        </div>
                      </div>
                      <div className="absolute top-1/3 right-1/4 transform -translate-y-1/2 translate-x-1/2 bg-white dark:bg-card border border-border p-3 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 delay-100">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="text-xs font-mono font-bold">EU</span>
                        </div>
                      </div>
                      
                      {/* Connecting Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path d="M150 100 Q 300 150 450 100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-primary/20" fill="none" />
                      </svg>
                    </div>
                  )}

                  {/* 3. Quality Visual */}
                  {index === 2 && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse-slow" />
                        <div className="relative bg-white dark:bg-card border border-border p-4 rounded-xl shadow-sm rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
                          <div className="flex items-center gap-1 justify-center">
                             <Check className="w-3 h-3 text-success" />
                             <span className="text-[10px] font-mono uppercase">Certified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. Delivery Visual */}
                  {index === 3 && (
                    <div className="w-full h-full flex items-center justify-center">
                       <div className="relative w-32 h-24">
                         <div className="absolute bottom-0 left-0 w-16 h-16 bg-white dark:bg-card border border-border rounded-lg shadow-sm flex items-center justify-center z-10 group-hover:translate-x-2 transition-transform duration-300">
                            <Package className="w-8 h-8 text-primary" />
                         </div>
                         <div className="absolute top-0 right-0 w-16 h-16 bg-secondary border border-border/50 rounded-lg flex items-center justify-center group-hover:-translate-x-2 transition-transform duration-300">
                            <Truck className="w-8 h-8 text-muted-foreground" />
                         </div>
                       </div>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
