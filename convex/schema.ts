import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    parent_id: v.optional(v.id("categories")),
    is_active: v.boolean(),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_slug", ["slug"]),

  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    country: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    product_id: v.optional(v.id("products")),
    product_name: v.optional(v.string()),
    attachment_url: v.optional(v.string()),
    status: v.string(), // "new", "read", "responded", etc.
    created_at: v.string(),
  }),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    short_description: v.optional(v.string()),
    full_description: v.optional(v.string()),
    category_id: v.optional(v.id("categories")),
    featured: v.boolean(),
    is_active: v.boolean(),
    specifications: v.optional(v.any()), // JSON content
    key_features: v.optional(v.array(v.string())),
    applications: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    created_at: v.string(),
    updated_at: v.string(),
  }).index("by_slug", ["slug"]),

  product_variants: defineTable({
    product_id: v.id("products"),
    color_name: v.string(),
    color_hex: v.optional(v.string()),
    sort_order: v.optional(v.number()),
    created_at: v.string(),
  }).index("by_product", ["product_id"]),

  product_images: defineTable({
    variant_id: v.id("product_variants"),
    url: v.string(),
    sort_order: v.optional(v.number()),
    created_at: v.string(),
  }).index("by_variant", ["variant_id"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});
