/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ZoomIn, X, Check } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { cn } from "@/lib/utils";

interface Specification {
  label: string;
  value: string;
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const product = useQuery(api.products.getProductBySlug, { slug: slug || "" });
  const isLoading = product === undefined;

  // Select first variant by default
  const selectedVariant = useMemo(() => {
    if (!product || !product.product_variants || !product.product_variants.length) return null;
    const variant = selectedVariantId
      ? product.product_variants.find((v: any) => v._id === selectedVariantId)
      : product.product_variants[0];
    return variant || product.product_variants[0];
  }, [product, selectedVariantId]);

  // Get images for selected variant
  const images = useMemo(() => {
    if (!selectedVariant || !selectedVariant.product_images || !selectedVariant.product_images.length) return [];
    return [...selectedVariant.product_images].sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));
  }, [selectedVariant]);

  // Parse specifications safely
  const specifications = useMemo((): Specification[] => {
    if (!product?.specifications) return [];
    try {
      const specs = product.specifications;
      if (typeof specs === 'object' && specs !== null && !Array.isArray(specs)) {
        return Object.entries(specs as Record<string, unknown>).map(([key, value]) => ({
          label: key,
          value: String(value),
        }));
      }
      return [];
    } catch {
      return [];
    }
  }, [product]);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="container-wide section-padding">
          <div className="grid gap-12 lg:grid-cols-2">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (product === null) {
    return (
      <PublicLayout>
        <div className="container-wide section-padding text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container-wide py-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div
                className="relative aspect-square rounded-2xl bg-secondary overflow-hidden cursor-zoom-in group"
                onClick={() => images.length > 0 && setLightboxOpen(true)}
              >
                {images[selectedImageIndex] ? (
                  <>
                    <img
                      src={(images[selectedImageIndex] as any).url}
                      alt={product!.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-foreground/10">
                      <ZoomIn className="h-8 w-8 text-background" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img: any, index: any) => (
                    <button
                      key={img._id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                        index === selectedImageIndex
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <img
                        src={img.url}
                        alt={`${product!.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              {product!.category && (
                <span className="inline-block px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                  {(product.category as any).name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {product!.name}
              </h1>

              {/* Description */}
              {product!.short_description && (
                <p className="text-lg text-muted-foreground">
                  {product!.short_description}
                </p>
              )}

              {/* Tags */}
              {product!.tags && product!.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product!.tags.map((tag: any) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Color Variants */}
              {product!.product_variants && product!.product_variants.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Color: {(selectedVariant as any)?.color_name}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product!.product_variants.map((variant: any) => (
                      <button
                        key={variant._id}
                        onClick={() => {
                          setSelectedVariantId(variant._id);
                          setSelectedImageIndex(0);
                        }}
                        className={cn(
                          "relative w-10 h-10 rounded-full border-2 transition-all",
                          (variant as any)._id === (selectedVariant as any)?._id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        )}
                        style={{ backgroundColor: variant.color_hex || "#ccc" }}
                        title={variant.color_name}
                      >
                        {(variant as any)._id === (selectedVariant as any)?._id && (
                          <Check className="absolute inset-0 m-auto h-5 w-5 text-primary-foreground drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Specifications & Details Tabs */}
              <div className="pt-6 pb-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-4 space-x-6 overflow-x-auto no-scrollbar">
                    <TabsTrigger
                      value="overview"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0F766E] data-[state=active]:bg-transparent px-0 pb-2 text-gray-500 data-[state=active]:text-[#0F766E] whitespace-nowrap"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0F766E] data-[state=active]:bg-transparent px-0 pb-2 text-gray-500 data-[state=active]:text-[#0F766E] whitespace-nowrap"
                    >
                      Key Features
                    </TabsTrigger>
                    <TabsTrigger
                      value="applications"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0F766E] data-[state=active]:bg-transparent px-0 pb-2 text-gray-500 data-[state=active]:text-[#0F766E] whitespace-nowrap"
                    >
                      Applications
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-0">
                    <div className="prose prose-slate max-w-none text-sm text-gray-600">
                      {product!.full_description ? (
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {product!.full_description}
                        </p>
                      ) : (
                        <p className="leading-relaxed">{product!.short_description}</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-0">
                    {product!.key_features && product!.key_features.length > 0 ? (
                      <ul className="grid grid-cols-1 gap-2">
                        {product!.key_features.map((feature: any, i: any) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-[#0F766E] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No key features specified.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="applications" className="mt-0">
                    {product!.applications && product!.applications.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {product!.applications.map((app: any, i: any) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No applications specified.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href="#request-quote">Request a Quote</a>
                </Button>
              </div>
            </motion.div>
          </div>



          {/* Request Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
            id="request-quote"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Request a Quote for {product!.name}
            </h2>
            <div className="max-w-2xl mx-auto text-left">
              <InquiryForm
                preselectedProductId={product!._id}
                preselectedProductName={product!.name}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 p-2 text-background hover:text-primary transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={(images[selectedImageIndex] as any).url}
              alt={product!.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PublicLayout>
  );
};

export default ProductDetail;
