/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1618517048289-c5245db27a68?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1590848805213-911b3334fa12?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600",
];

export function FeaturedProductsSection() {
  const products = useQuery(api.products.getFeaturedProducts);
  const isLoading = products === undefined;

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
            Our Products
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#212529] mb-3">
            Featured <span className="text-[#E0323C]">Products</span>
          </h2>
          <p className="text-[#6F7183] max-w-lg mx-auto text-sm sm:text-base font-sans">
            Our best-selling industrial safety equipment, trusted worldwide.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 p-0">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-5 sm:p-6 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.slice(0, 8).map((product: any, index: number) => {
              const mainImage = product.product_variants?.[0]?.product_images?.[0]?.url;
              const fallbackImage = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#E0323C]/20 hover:shadow-2xl hover:shadow-red-50 hover:-translate-y-2 transition-all duration-400 h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                      <img
                        src={mainImage || fallbackImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Category badge */}
                      {product.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] sm:text-xs font-bold font-sans rounded-lg bg-white/90 backdrop-blur-sm text-[#212529] shadow-sm border border-gray-100">
                          {product.category.name}
                        </span>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h3 className="text-sm sm:text-base font-heading font-bold text-[#212529] mb-1.5 sm:mb-2 group-hover:text-[#E0323C] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      {product.short_description && (
                        <p className="text-[#6F7183] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1 font-sans line-clamp-2">
                          {product.short_description}
                        </p>
                      )}

                      {/* Color Swatches */}
                      {product.product_variants && product.product_variants.length > 0 && (
                        <div className="flex items-center -space-x-1 mb-3 sm:mb-4">
                          {product.product_variants.slice(0, 4).map((v: any, i: number) => (
                            <div
                              key={i}
                              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: v.color_hex || "#ccc" }}
                              title={v.color_name}
                            />
                          ))}
                          {product.product_variants.length > 4 && (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] sm:text-[8px] font-bold bg-gray-100 text-gray-500">
                              +{product.product_variants.length - 4}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        <span className="text-xs sm:text-sm font-bold font-sans text-[#E0323C] flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details
                          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <p className="text-[#6F7183] font-sans text-sm sm:text-base">No featured products available yet.</p>
          </div>
        )}

        {/* View All Products CTA */}
        {products && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10 sm:mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#E0323C] hover:bg-[#c92a34] text-white rounded-full px-6 sm:px-8 py-3 font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#E0323C]/20 group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
