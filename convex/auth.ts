import { v } from "convex/values";
import { mutation, action, query } from "./_generated/server";

// Initialize admin password if not set
export const initAuth = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "admin_password"))
      .first();

    if (!existing) {
      await ctx.db.insert("settings", {
        key: "admin_password",
        value: "Admin1234", // Default password
      });
      return "Initialized";
    }
    return "Already initialized";
  },
});

export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "admin_password"))
      .first();

    // If no password set, fallback to default (safety net)
    const currentPassword = setting?.value || "Admin1234";
    return currentPassword === args.password;
  },
});

export const updatePassword = mutation({
  args: { 
    currentPassword: v.string(), 
    newPassword: v.string() 
  },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "admin_password"))
      .first();

    const currentStoredPassword = setting?.value || "Admin1234";

    if (currentStoredPassword !== args.currentPassword) {
      throw new Error("Invalid current password");
    }

    if (setting) {
      await ctx.db.patch(setting._id, { value: args.newPassword });
    } else {
      await ctx.db.insert("settings", {
        key: "admin_password",
        value: args.newPassword,
      });
    }
    return true;
  },
});
