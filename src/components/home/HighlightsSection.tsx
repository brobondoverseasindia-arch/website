import { motion } from "framer-motion";
import { Factory, Globe, Shield, Package, Check, Truck, Sparkles, Activity, MapPin, Clock } from "lucide-react";
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
    <section className="section-padding-sm bg-secondary/5 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 md:auto-rows-[340px]">
          {QUICK_HIGHLIGHTS.map((highlight, index) => {
            const Icon = iconMap[highlight.icon as keyof typeof iconMap];
            
            const isTall = index === 0;
            const isWide = index === 1;
            
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white dark:bg-card/50 transition-all duration-500",
                  "border border-border/60 hover:border-primary/30",
                  "shadow-[0_2px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(var(--primary),0.1)]",
                  isTall ? "md:row-span-2" : "",
                  isWide ? "md:col-span-2" : ""
                )}
              >
                {/* Header Section */}
                <div className="p-8 z-20 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-3.5 rounded-2xl bg-secondary/50 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm border border-border/50 group-hover:border-transparent">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {highlight.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-md font-medium text-[15px]">
                    {highlight.description}
                  </p>
                </div>

                {/* Visual Section */}
                <div className="flex-1 relative overflow-hidden">
                  
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500" 
                       style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                  />

                  {/* Gradient Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* 1. Factory Visual (Tall) - Animated Process */}
                  {index === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center pt-8">
                      {/* Floating Code Card */}
                      <motion.div 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-56 bg-white dark:bg-card border border-border rounded-xl p-4 shadow-xl z-20"
                      >
                        <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground">production.config</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-3/4 bg-primary/10 rounded-full animate-pulse" />
                          <div className="h-2 w-1/2 bg-primary/10 rounded-full animate-pulse delay-75" />
                          <div className="h-2 w-5/6 bg-primary/10 rounded-full animate-pulse delay-150" />
                        </div>
                      </motion.div>

                      {/* Animated Connection Line */}
                      <div className="h-full w-px bg-gradient-to-b from-border to-transparent relative mt-4">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-primary to-transparent opacity-50 blur-[1px] animate-[pulse_2s_infinite]" />
                      </div>

                      {/* Process Nodes */}
                      <div className="absolute bottom-12 flex flex-col gap-6">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="relative group/node">
                            <div className="w-4 h-4 rounded-full border-2 border-primary bg-background shadow-[0_0_15px_rgba(var(--primary),0.4)] z-10 relative" />
                            <div className={`absolute top-1/2 left-8 -translate-y-1/2 px-3 py-1 rounded-full bg-white dark:bg-card border border-border shadow-sm text-xs font-semibold whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-all duration-300 -translate-x-2 group-hover/node:translate-x-0`}>
                              Step 0{i}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Global Export Visual (Wide) - Dynamic Network */}
                  {index === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      {/* World Map Background */}
                      <div className="absolute inset-0 opacity-10"
                           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} 
                      />
                      
                      {/* Connecting Arcs */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path 
                          d="M100 200 Q 350 50 600 200" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeDasharray="8 8"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.3 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                         <motion.path 
                          d="M150 220 Q 350 100 550 220" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="1.5" 
                          fill="none" 
                          strokeDasharray="4 4"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 0.2 }}
                          transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                        />
                      </svg>

                      {/* Floating Location Cards */}
                      <div className="w-full max-w-2xl px-8 flex justify-between items-center relative z-10">
                        {[{ label: "USA", delay: 0 }, { label: "EUROPE", delay: 0.2 }, { label: "ASIA", delay: 0.4 }].map((loc, i) => (
                          <motion.div 
                            key={loc.label}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: loc.delay, duration: 0.5 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className={cn(
                              "flex items-center gap-2 bg-white dark:bg-card px-5 py-2.5 rounded-full shadow-lg border border-border/50",
                              i === 1 ? "mb-24" : "mt-12"
                            )}
                          >
                            <Globe className="w-4 h-4 text-primary animate-pulse" />
                            <span className="font-bold text-sm tracking-wide">{loc.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Quality Visual - Layered Material Inspection */}
                  {index === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
                      <div className="relative w-32 h-40 flex items-center justify-center">
                        
                        {/* Layer 3: Final Shield (Top) */}
                        <motion.div 
                          className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30"
                          whileHover={{ y: -15, scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="p-4 bg-white dark:bg-card rounded-2xl shadow-xl ring-1 ring-black/5 flex items-center justify-center">
                            <Shield className="w-10 h-10 text-primary fill-primary/10" />
                          </div>
                          
                          <div className="px-3 py-1.5 rounded-full bg-white dark:bg-card border border-border shadow-md text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Check className="w-3 h-3" />
                            Certified
                          </div>
                        </motion.div>

                        {/* Connecting Glow */}
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
                      </div>
                    </div>
                  )}

                  {/* 4. Delivery Visual - Orbital Logistics */}
                  {index === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="relative w-64 h-full flex items-center justify-center">
                         
                         {/* Orbital Rings */}
                         <div className="absolute w-40 h-40 border border-dashed border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
                         <div className="absolute w-56 h-56 border border-border/40 rounded-full opacity-50" />

                         {/* Central Hub */}
                         <div className="relative z-10 w-16 h-16 bg-white dark:bg-card rounded-2xl shadow-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                           <Package className="w-8 h-8 text-primary fill-primary/5" />
                           <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-card animate-pulse" />
                         </div>

                         {/* Orbiting Truck */}
                         <motion.div 
                           className="absolute w-40 h-40 rounded-full"
                           animate={{ rotate: 360 }}
                           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                         >
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-card p-2 rounded-lg shadow-md border border-primary/10 transform -rotate-0">
                             <Truck className="w-4 h-4 text-primary" />
                           </div>
                         </motion.div>

                         {/* Orbiting Plane/Check */}
                         <motion.div 
                           className="absolute w-28 h-28 rounded-full"
                           animate={{ rotate: -360 }}
                           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                         >
                           <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-secondary p-1.5 rounded-full shadow-sm border border-border">
                             <Clock className="w-3 h-3 text-muted-foreground" />
                           </div>
                         </motion.div>

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


