import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get all habits for a user
export const getUserHabits = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const habits = await ctx.db
      .query("habits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return habits;
  },
});

// Query to get today's habits for a user
export const getTodayHabits = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const habits = await ctx.db
      .query("habits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    // For now, return all habits as "today's habits"
    // In a more sophisticated implementation, you'd filter by frequency
    return habits;
  },
});

// Query to get a specific habit
export const getHabit = query({
  args: { habitId: v.id("habits") },
  handler: async (ctx, args) => {
    const habit = await ctx.db.get(args.habitId);
    return habit;
  },
});

// Mutation to create a new habit
export const createHabit = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    frequency: v.union(v.literal("daily"), v.literal("weekly"), v.literal("custom")),
    reminderTimes: v.array(v.string()),
    color: v.string(),
    icon: v.string(),
    goal: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const habitId = await ctx.db.insert("habits", {
      userId: args.userId,
      name: args.name,
      description: args.description,
      category: args.category,
      frequency: args.frequency,
      reminderTimes: args.reminderTimes,
      color: args.color,
      icon: args.icon,
      goal: args.goal,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return habitId;
  },
});

// Mutation to update a habit
export const updateHabit = mutation({
  args: {
    habitId: v.id("habits"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    frequency: v.optional(v.union(v.literal("daily"), v.literal("weekly"), v.literal("custom"))),
    reminderTimes: v.optional(v.array(v.string())),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
    goal: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { habitId, ...updates } = args;
    
    await ctx.db.patch(habitId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return habitId;
  },
});

// Mutation to delete a habit
export const deleteHabit = mutation({
  args: { habitId: v.id("habits") },
  handler: async (ctx, args) => {
    // First delete all completions for this habit
    const completions = await ctx.db
      .query("completions")
      .withIndex("by_habit", (q) => q.eq("habitId", args.habitId))
      .collect();

    for (const completion of completions) {
      await ctx.db.delete(completion._id);
    }

    // Then delete the habit
    await ctx.db.delete(args.habitId);
  },
}); 