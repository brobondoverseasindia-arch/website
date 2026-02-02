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

// Simple Admin Login support using Environment Variable
export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const adminPassword = process.env.admin_password;
    if (!adminPassword) {
      throw new Error("admin_password environment variable is not set");
    }
    // Fallback or simple check. 
    // If env var is not set (local dev without config), this might fail.
    // Use `admin_password` from env.
    return args.password === adminPassword;
  },
});

// No-op for compatibility with existing frontend
export const initAuth = mutation({
  handler: async () => {
    return "Initialized"; 
  },
});

