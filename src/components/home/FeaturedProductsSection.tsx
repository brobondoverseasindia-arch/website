import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/components/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProductsSection() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(id, name, slug),
          product_variants(
            id,
            color_name,
            color_hex,
            product_images(id, url, sort_order)
          )
        `)
        .eq("is_active", true)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding section-dark noise-overlay relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            title="Featured Products"
            subtitle="Explore our premium range of industrial safety gloves designed for maximum protection and durability."
            dark
          />
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-elevated-dark p-4">
                <Skeleton className="h-48 w-full rounded-lg mb-4 bg-white/10" />
                <Skeleton className="h-6 w-3/4 mb-2 bg-white/10" />
                <Skeleton className="h-4 w-1/2 bg-white/10" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} variant="dark" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white/60 mb-4">
              No featured products yet. Check back soon!
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <Link to="/products" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
