import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get a user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return user;
  },
});

// Query to get a user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

// Mutation to create a new user
export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      name: args.name,
      avatar: args.avatar,
      createdAt: Date.now(),
    });

    // Create default user settings
    await ctx.db.insert("userSettings", {
      userId,
      notificationPreferences: {
        reminders: true,
        streakAlerts: true,
        motivationalMessages: true,
      },
      theme: "auto",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    return userId;
  },
});

// Mutation to update user profile
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    await ctx.db.patch(userId, updates);
    return userId;
  },
}); 