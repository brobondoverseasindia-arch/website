import { query } from "./_generated/server";

export const getStats = query({
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const categories = await ctx.db.query("categories").collect();
    const inquiries = await ctx.db.query("inquiries").collect();
    
    const newInquiries = inquiries.filter((i) => i.status === "new").length;

    return {
      products: products.length,
      categories: categories.length,
      inquiries: inquiries.length,
      newInquiries,
    };
  },
});

export const getRecentInquiries = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("inquiries")
      .order("desc")
      .take(5);
  },
});
