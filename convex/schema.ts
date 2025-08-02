import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),

  habits: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    frequency: v.union(v.literal("daily"), v.literal("weekly"), v.literal("custom")),
    reminderTimes: v.array(v.string()), // Array of reminder times
    color: v.string(),
    icon: v.string(),
    goal: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_category", ["userId", "category"])
    .index("by_created_at", ["createdAt"]),

  completions: defineTable({
    habitId: v.id("habits"),
    userId: v.id("users"),
    completedAt: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_habit", ["habitId"])
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "completedAt"])
    .index("by_habit_and_date", ["habitId", "completedAt"]),

  userSettings: defineTable({
    userId: v.id("users"),
    notificationPreferences: v.object({
      reminders: v.boolean(),
      streakAlerts: v.boolean(),
      motivationalMessages: v.boolean(),
    }),
    theme: v.union(v.literal("light"), v.literal("dark"), v.literal("auto")),
    timezone: v.string(),
  })
    .index("by_user", ["userId"]),
}); 