import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Industrial Welding Gloves",
    image: "/Welding Gloves.png",
    slug: "/products",
  },
  {
    name: "Industrial Safety Aprons",
    image: "/Welding Aprons.png",
    slug: "/products",
  },
  {
    name: "Driving Gloves",
    image: "/Driving Gloves.png",
    slug: "/products",
  },
  {
    name: "Canadian Gloves",
    image: "/Canadian Gloves.png",
    slug: "/products",
  },
  {
    name: "Leg Guards",
    image: "/Leg Guard.png",
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

        <div className="relative w-full overflow-hidden flex pt-4 pb-8">
          <motion.div
            className="flex gap-6 sm:gap-8 whitespace-nowrap px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, index) => (
              <div
                key={`${cat.name}-${index}`}
                className="flex-none w-32 sm:w-40 md:w-44 lg:w-52 text-center"
              >
                <Link to={cat.slug} className="block group/link">
                  <div className="mx-auto w-full aspect-square rounded-full overflow-hidden border-4 border-white group-hover/link:border-[#E0323C]/30 transition-all duration-500 shadow-lg group-hover/link:shadow-2xl group-hover/link:shadow-red-100 mb-4 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover/link:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#E0323C]/0 group-hover/link:bg-[#E0323C]/10 transition-colors duration-300 rounded-full" />
                  </div>
                  <h3 className="whitespace-normal text-xs sm:text-sm md:text-base font-heading font-bold text-[#212529] group-hover/link:text-[#E0323C] transition-colors duration-300 px-2 line-clamp-2">
                    {cat.name}
                  </h3>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
