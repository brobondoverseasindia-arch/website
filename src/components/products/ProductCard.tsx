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

export function ProductCard({ product, variant = "light", className }: ProductCardProps) {
  const isDark = variant === "dark";
  
  // Get first variant's first image as main image
  const mainImage = product.product_variants?.[0]?.product_images?.[0]?.url;
  const colors = product.product_variants?.map((v) => ({
    name: v.color_name,
    hex: v.color_hex,
  }));

  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden hover-lift transition-all duration-300",
        isDark
          ? "card-elevated-dark"
          : "card-elevated",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className={cn(
            "w-full h-full flex items-center justify-center",
            isDark ? "bg-white/5" : "bg-secondary"
          )}>
            <span className={isDark ? "text-white/40" : "text-muted-foreground"}>
              No image
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        {product.category && (
          <span className={cn(
            "absolute top-3 left-3 px-3 py-1.5 text-xs font-medium rounded-full backdrop-blur-sm",
            isDark
              ? "bg-black/50 text-white border border-white/10"
              : "bg-white/90 text-foreground shadow-sm"
          )}>
            {product.category.name}
          </span>
        )}

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
          <span className={cn(
            "px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground shadow-lg transform translate-y-0 group-hover:scale-105 transition-all duration-300"
          )}>
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={cn(
          "font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1",
          isDark ? "text-white" : "text-foreground"
        )}>
          {product.name}
        </h3>
        
        {product.short_description && (
          <p className={cn(
            "text-sm line-clamp-2 mb-4",
            isDark ? "text-white/60" : "text-muted-foreground"
          )}>
            {product.short_description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  isDark
                    ? "bg-white/10 text-white/70"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Colors & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-background shadow-sm"
                  style={{ backgroundColor: color.hex || "#ccc" }}
                  title={color.name}
                />
              ))}
              {colors.length > 4 && (
                <span className={cn(
                  "text-xs ml-1",
                  isDark ? "text-white/50" : "text-muted-foreground"
                )}>
                  +{colors.length - 4}
                </span>
              )}
            </div>
          )}
          <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
            Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
