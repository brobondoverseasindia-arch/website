import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({
    validatePasswordRequirements: (password: string) => {
      if (password.length < 8 || !/\d/.test(password)) {
        throw new Error("Password must be at least 8 characters and include a number.");
      }
    },
  })],
});

// Simple Admin Login support using Hardcoded Password
export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    // Password for admin access from environment variables
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable is not set.");
      return false;
    }
    return args.password === adminPassword;
  },
});

// No-op for compatibility with existing frontend
export const initAuth = mutation({
  handler: async () => {
    return "Initialized"; 
  },
});
