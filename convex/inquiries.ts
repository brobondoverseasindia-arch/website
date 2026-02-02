import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getInquiries = query({
  handler: async (ctx) => {
    return await ctx.db.query("inquiries").order("desc").collect();
  },
});

export const createInquiry = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      created_at: now,
    });
  },
});

export const updateInquiryStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
