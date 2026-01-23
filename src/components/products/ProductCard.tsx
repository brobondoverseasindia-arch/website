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
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
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
        "group block rounded-xl bg-card border border-border overflow-hidden hover-lift",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        
        {/* Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-md">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {product.short_description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.short_description}
          </p>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Colors & CTA */}
        <div className="flex items-center justify-between">
          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1">
              {colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex || "#ccc" }}
                  title={color.name}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{colors.length - 4}
                </span>
              )}
            </div>
          )}
          <span className="text-sm font-medium text-primary flex items-center gap-1">
            View Details
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
