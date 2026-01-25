import { 
  Ship, 
  Globe, 
  Award, 
  ShieldCheck, 
  Plane, 
  Anchor, 
  PackageCheck, 
  BadgeCheck 
} from "lucide-react";

const PARTNERS = [
  { name: "Global Shipping", icon: Ship },
  { name: "ISO Certified", icon: Award },
  { name: "Secure Logistics", icon: ShieldCheck },
  { name: "Air Freight", icon: Plane },
  { name: "Ocean Cargo", icon: Anchor },
  { name: "Quality Control", icon: PackageCheck },
  { name: "Verified Export", icon: BadgeCheck },
  { name: "Worldwide Network", icon: Globe },
];

export function LogoMarquee() {
  return (
    <div className="w-full bg-[hsl(var(--section-light))] border-y border-border/40 py-10 overflow-hidden relative">
      {/* Fade Gradients for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[hsl(var(--section-light))] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[hsl(var(--section-light))] to-transparent pointer-events-none" />

      <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        {/* Original Set */}
        <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
          {PARTNERS.map((partner, i) => (
            <div key={`original-${i}`} className="flex items-center gap-3 group select-none">
              <div className="p-3 rounded-xl bg-white/50 border border-black/5 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <partner.icon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm md:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate Set for Seamless Loop */}
        <div className="flex items-center gap-12 md:gap-24 px-6 md:px-12">
          {PARTNERS.map((partner, i) => (
            <div key={`duplicate-${i}`} className="flex items-center gap-3 group select-none">
              <div className="p-3 rounded-xl bg-white/50 border border-black/5 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <partner.icon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-sm md:text-base font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
