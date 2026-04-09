import { motion } from "framer-motion";
import { ShieldCheck, Factory, Globe2, Truck } from "lucide-react";

const USP_ITEMS = [
  {
    title: "Premium Quality",
    description: "ISO-certified materials & processes",
    icon: ShieldCheck,
  },
  {
    title: "Large Scale Production",
    description: "High-capacity manufacturing units",
    icon: Factory,
  },
  {
    title: "Global Export",
    description: "Shipped to 50+ countries",
    icon: Globe2,
  },
  {
    title: "Reliable Delivery",
    description: "On-time logistics worldwide",
    icon: Truck,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {USP_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-[#E0323C]/20 hover:shadow-xl hover:shadow-red-50 hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#E0323C] transition-colors duration-300">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#E0323C] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm sm:text-base font-heading font-bold text-[#212529] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6F7183] font-sans">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
