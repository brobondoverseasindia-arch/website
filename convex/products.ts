/* eslint-disable @typescript-eslint/no-explicit-any */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// Helper to enrich product with details
async function enrichProduct(ctx: any, product: Doc<"products">) {
  let category = null;
  if (product.category_id) {
     category = await ctx.db.get(product.category_id);
  }
  
  const variants = await ctx.db
    .query("product_variants")
    .withIndex("by_product", (q: any) => q.eq("product_id", product._id))
    .collect();

  const variantsWithImages = await Promise.all(
    variants.map(async (v: Doc<"product_variants">) => {
       const images = await ctx.db
         .query("product_images")
         .withIndex("by_variant", (q: any) => q.eq("variant_id", v._id))
         .collect();
       
       const imagesWithUrls = await Promise.all(images.map(async (img: any) => {
         // If url looks like a storage ID (which is alphanumeric), try to get URL
         // Or we can just try getUrl and fallback to original if null
         // But getUrl expects an ID. 
         // Let's assume if it doesn't start with http, it is a storage ID
         if (!img.url.startsWith("http")) {
            const url = await ctx.storage.getUrl(img.url);
            return { ...img, url: url || img.url };
         }
         return img;
       }));

       return { ...v, product_images: imagesWithUrls };
    })
  );

  return { ...product, product_variants: variantsWithImages, category };
}

// Products
export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getAllProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("is_active"), true))
      .order("desc")
      .collect();

    return await Promise.all(products.map((p) => enrichProduct(ctx, p)));
  },
});

export const getFeaturedProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("is_active"), true))
      .filter((q) => q.eq(q.field("featured"), true))
      .order("desc") 
      .take(6);

    return await Promise.all(products.map((p) => enrichProduct(ctx, p)));
  },
});

export const getProductBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
      
    if (!product) return null;

    return await enrichProduct(ctx, product);
  },
});

export const getProductById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createProduct = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    short_description: v.optional(v.string()),
    full_description: v.optional(v.string()),
    category_id: v.optional(v.id("categories")),
    featured: v.boolean(),
    is_active: v.boolean(),
    specifications: v.optional(v.any()),
    key_features: v.optional(v.array(v.string())),
    applications: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("products", {
      ...args,
      created_at: now,
      updated_at: now,
    });
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    short_description: v.optional(v.string()),
    full_description: v.optional(v.string()),
    category_id: v.optional(v.id("categories")),
    featured: v.optional(v.boolean()),
    is_active: v.optional(v.boolean()),
    specifications: v.optional(v.any()),
    key_features: v.optional(v.array(v.string())),
    applications: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = new Date().toISOString();
    await ctx.db.patch(id, {
      ...updates,
      updated_at: now,
    });
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Variants
export const getVariantsByProductId = query({
  args: { product_id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("product_variants")
      .withIndex("by_product", (q) => q.eq("product_id", args.product_id))
      .collect();
  },
});

export const createVariant = mutation({
  args: {
    product_id: v.id("products"),
    color_name: v.string(),
    color_hex: v.optional(v.string()),
    sort_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("product_variants", {
      ...args,
      created_at: now,
    });
  },
});

export const deleteVariant = mutation({
  args: { id: v.id("product_variants") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Images
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getImagesByVariantId = query({
  args: { variant_id: v.id("product_variants") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("product_images")
      .withIndex("by_variant", (q) => q.eq("variant_id", args.variant_id))
      .collect();
  },
});

export const createImage = mutation({
  args: {
    variant_id: v.id("product_variants"),
    url: v.string(),
    sort_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("product_images", {
      ...args,
      created_at: now,
    });
  },
});
