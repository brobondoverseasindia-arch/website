import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    short_description: string | null;
    tags: string[] | null;
    category?: { id: string; name: string; slug: string } | null;
    product_variants?: Array<{
      id: string;
      color_name: string;
      color_hex: string | null;
      product_images?: Array<{
        id: string;
        url: string;
        sort_order: number | null;
      }>;
    }>;
  };
  variant?: "light" | "dark";
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const mainImage = product.product_variants?.[0]?.product_images?.[0]?.url;
  const colors = product.product_variants?.map((v) => ({
    name: v.color_name,
    hex: v.color_hex,
  }));

  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        "group block rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 flex flex-col h-full",
        "hover:border-[#E0323C]/20 hover:shadow-2xl hover:shadow-red-50 hover:-translate-y-1.5",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-gray-300 font-sans text-sm">No image</span>
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 px-3 py-1.5 text-xs font-semibold font-sans rounded-lg bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm border border-gray-100">
            {product.category.name}
          </span>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-5 py-2.5 rounded-xl text-sm font-bold font-sans bg-[#E0323C] text-white shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-bold mb-2 text-[#212529] group-hover:text-[#E0323C] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {product.short_description && (
          <p className="text-sm line-clamp-2 mb-4 leading-relaxed text-[#6F7183] font-sans">
            {product.short_description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-[#E0323C]/70 border border-red-100/50 font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-end pt-4 mt-auto border-t border-gray-100">
          <span className="text-sm font-semibold font-sans flex items-center gap-1.5 text-[#E0323C] group-hover:gap-2.5 transition-all">
            Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
