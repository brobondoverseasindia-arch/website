import { motion } from "framer-motion";
import { CheckCircle, Package, Settings, FileCheck, TrendingUp, Headphones } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap = {
  CheckCircle,
  Package,
  Settings,
  FileCheck,
  TrendingUp,
  Headphones,
};

export function WhyChooseUsSection() {
  return (
    <section className="section-padding section-light">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Why Choose BroBond Overseas"
            subtitle="We combine manufacturing excellence with export expertise to deliver exceptional value to our global partners."
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group card-elevated p-6 hover-lift ${
                  isEven ? "" : "md:bg-secondary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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
