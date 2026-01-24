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
        "group block rounded-xl overflow-hidden hover-lift transition-all duration-300 flex flex-col h-full",
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
      <div className="p-6 flex flex-col flex-1">
        <h3 className={cn(
          "font-semibold mb-3 text-lg group-hover:text-primary transition-colors line-clamp-1",
          isDark ? "text-white" : "text-foreground"
        )}>
          {product.name}
        </h3>
        
        {product.short_description && (
          <p className={cn(
            "text-sm line-clamp-2 mb-6 leading-relaxed",
            isDark ? "text-white/60" : "text-muted-foreground"
          )}>
            {product.short_description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-md",
                  isDark
                    ? "bg-white/5 text-white/70 border border-white/10"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Colors & CTA */}
        <div className={cn(
          "flex items-center justify-between pt-5 mt-auto border-t",
          isDark ? "border-white/10" : "border-border/50"
        )}>
          {colors && colors.length > 0 ? (
            <div className="flex items-center -space-x-1.5 hover:space-x-0.5 transition-all duration-300">
              {colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 shadow-sm transition-transform hover:scale-110 hover:z-10",
                    isDark ? "border-[hsl(var(--card))]" : "border-background"
                  )}
                  style={{ backgroundColor: color.hex || "#ccc" }}
                  title={color.name}
                />
              ))}
              {colors.length > 4 && (
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-medium",
                  isDark 
                    ? "border-[hsl(var(--card))] bg-white/10 text-white" 
                    : "border-background bg-secondary text-muted-foreground"
                )}>
                  +{colors.length - 4}
                </div>
              )}
            </div>
          ) : (
            <div /> // Spacer if no colors
          )}
          
          <span className={cn(
            "text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all",
            isDark ? "text-primary-foreground/90 group-hover:text-primary" : "text-primary"
          )}>
            Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
