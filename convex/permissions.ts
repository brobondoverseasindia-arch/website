import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx, QueryCtx } from "./_generated/server";

export const requireAdmin = async (ctx: MutationCtx | QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Unauthorized: You must be logged in to perform this action.");
  }
  return userId;
};
