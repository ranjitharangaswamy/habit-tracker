import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to get completions for a specific habit
export const getHabitCompletions = query({
  args: { habitId: v.id("habits") },
  handler: async (ctx, args) => {
    const completions = await ctx.db
      .query("completions")
      .withIndex("by_habit", (q) => q.eq("habitId", args.habitId))
      .order("desc")
      .collect();

    return completions;
  },
});

// Query to get completions for a user
export const getUserCompletions = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const completions = await ctx.db
      .query("completions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return completions;
  },
});

// Query to get today's completions for a user
export const getTodayCompletions = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

    const completions = await ctx.db
      .query("completions")
      .withIndex("by_user_and_date", (q) => 
        q.eq("userId", args.userId)
         .gte("completedAt", startOfDay)
         .lte("completedAt", endOfDay)
      )
      .collect();

    return completions;
  },
});

// Query to check if a habit is completed today
export const isHabitCompletedToday = query({
  args: { habitId: v.id("habits"), userId: v.id("users") },
  handler: async (ctx, args) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

    const completions = await ctx.db
      .query("completions")
      .withIndex("by_habit_and_date", (q) => 
        q.eq("habitId", args.habitId)
         .gte("completedAt", startOfDay)
         .lte("completedAt", endOfDay)
      )
      .collect();

    return completions.length > 0;
  },
});

// Mutation to mark a habit as completed
export const completeHabit = mutation({
  args: {
    habitId: v.id("habits"),
    userId: v.id("users"),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already completed today
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

    const existingCompletions = await ctx.db
      .query("completions")
      .withIndex("by_habit_and_date", (q) => 
        q.eq("habitId", args.habitId)
         .gte("completedAt", startOfDay)
         .lte("completedAt", endOfDay)
      )
      .collect();

    if (existingCompletions.length > 0) {
      // Already completed today, return existing completion
      return existingCompletions[0]._id;
    }

    // Create new completion
    const completionId = await ctx.db.insert("completions", {
      habitId: args.habitId,
      userId: args.userId,
      completedAt: Date.now(),
      notes: args.notes,
    });

    return completionId;
  },
});

// Mutation to uncomplete a habit (remove today's completion)
export const uncompleteHabit = mutation({
  args: {
    habitId: v.id("habits"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

    const completions = await ctx.db
      .query("completions")
      .withIndex("by_habit_and_date", (q) => 
        q.eq("habitId", args.habitId)
         .gte("completedAt", startOfDay)
         .lte("completedAt", endOfDay)
      )
      .collect();

    for (const completion of completions) {
      await ctx.db.delete(completion._id);
    }
  },
});

// Query to get streak information for a habit
export const getHabitStreak = query({
  args: { habitId: v.id("habits") },
  handler: async (ctx, args) => {
    const completions = await ctx.db
      .query("completions")
      .withIndex("by_habit", (q) => q.eq("habitId", args.habitId))
      .order("desc")
      .collect();

    if (completions.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    // Sort completions by date (most recent first)
    const sortedCompletions = completions.sort((a, b) => b.completedAt - a.completedAt);

    let expectedDate = startOfToday;
    let i = 0;

    // Check if today is completed
    if (sortedCompletions[0] && 
        sortedCompletions[0].completedAt >= startOfToday && 
        sortedCompletions[0].completedAt < startOfToday + 24 * 60 * 60 * 1000) {
      currentStreak = 1;
      tempStreak = 1;
      i = 1;
      expectedDate = startOfToday - 24 * 60 * 60 * 1000; // Yesterday
    }

    // Calculate consecutive days
    for (; i < sortedCompletions.length; i++) {
      const completion = sortedCompletions[i];
      const completionDate = new Date(completion.completedAt);
      const completionStartOfDay = new Date(completionDate.getFullYear(), completionDate.getMonth(), completionDate.getDate()).getTime();

      if (completionStartOfDay === expectedDate) {
        tempStreak++;
        if (i < sortedCompletions.length - 1) {
          expectedDate -= 24 * 60 * 60 * 1000; // Previous day
        }
      } else {
        // Break in streak
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 1;
        expectedDate = completionStartOfDay - 24 * 60 * 60 * 1000;
      }
    }

    // Update longest streak if current streak is longer
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    // Update current streak if we're still in a streak
    if (currentStreak === 0) {
      currentStreak = tempStreak;
    }

    return { currentStreak, longestStreak };
  },
});

// Query to get streak information for all habits of a user
export const getUserStreaks = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const habits = await ctx.db
      .query("habits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const streaks = [];

    for (const habit of habits) {
      const completions = await ctx.db
        .query("completions")
        .withIndex("by_habit", (q) => q.eq("habitId", habit._id))
        .order("desc")
        .collect();

      if (completions.length === 0) {
        streaks.push({
          habitId: habit._id,
          name: habit.name,
          currentStreak: 0,
          longestStreak: 0,
        });
        continue;
      }

      // Calculate current streak
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

      // Sort completions by date (most recent first)
      const sortedCompletions = completions.sort((a, b) => b.completedAt - a.completedAt);

      let expectedDate = startOfToday;
      let i = 0;

      // Check if today is completed
      if (sortedCompletions[0] && 
          sortedCompletions[0].completedAt >= startOfToday && 
          sortedCompletions[0].completedAt < startOfToday + 24 * 60 * 60 * 1000) {
        currentStreak = 1;
        tempStreak = 1;
        i = 1;
        expectedDate = startOfToday - 24 * 60 * 60 * 1000; // Yesterday
      }

      // Calculate consecutive days
      for (; i < sortedCompletions.length; i++) {
        const completion = sortedCompletions[i];
        const completionDate = new Date(completion.completedAt);
        const completionStartOfDay = new Date(completionDate.getFullYear(), completionDate.getMonth(), completionDate.getDate()).getTime();

        if (completionStartOfDay === expectedDate) {
          tempStreak++;
          if (i < sortedCompletions.length - 1) {
            expectedDate -= 24 * 60 * 60 * 1000; // Previous day
          }
        } else {
          // Break in streak
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 1;
          expectedDate = completionStartOfDay - 24 * 60 * 60 * 1000;
        }
      }

      // Update longest streak if current streak is longer
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }

      // Update current streak if we're still in a streak
      if (currentStreak === 0) {
        currentStreak = tempStreak;
      }

      streaks.push({
        habitId: habit._id,
        name: habit.name,
        currentStreak,
        longestStreak,
      });
    }

    return streaks;
  },
}); 