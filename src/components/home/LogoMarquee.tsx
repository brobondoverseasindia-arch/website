import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Industrial Safety Gloves",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "/products",
  },
  {
    name: "Protective Work Gloves",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "/products",
  },
  {
    name: "Safety Aprons",
    image: "https://images.unsplash.com/photo-1618517048289-c5245db27a68?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "/products",
  },
  {
    name: "Custom Protective Gear",
    image: "https://images.unsplash.com/photo-1590848805213-911b3334fa12?auto=format&fit=crop&q=80&w=400&h=400",
    slug: "/products",
  },
];

export function LogoMarquee() {
  return (
    <section className="py-14 md:py-20 bg-[#FAFAFA]">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block bg-red-50 text-[#E0323C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Our Range
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#212529] mb-3">
            Product <span className="text-[#E0323C]">Categories</span>
          </h2>
          <p className="text-[#6F7183] max-w-lg mx-auto text-sm sm:text-base font-sans">
            Browse our comprehensive range of industrial safety equipment
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <Link to={cat.slug} className="block">
                <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white group-hover:border-[#E0323C]/30 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-red-100 mb-4 sm:mb-5 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#E0323C]/0 group-hover:bg-[#E0323C]/10 transition-colors duration-300 rounded-full" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-heading font-bold text-[#212529] group-hover:text-[#E0323C] transition-colors duration-300 px-2">
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
