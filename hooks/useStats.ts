import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function useStats(userId: Id<"users"> | null) {
  const habits = useQuery(
    api.habits.getUserHabits,
    userId ? { userId } : "skip"
  );

  const completions = useQuery(
    api.completions.getUserCompletions,
    userId ? { userId } : "skip"
  );

  const todayCompletions = useQuery(
    api.completions.getTodayCompletions,
    userId ? { userId } : "skip"
  );

  const streaks = useQuery(
    api.completions.getUserStreaks,
    userId ? { userId } : "skip"
  );

  // Calculate various statistics
  const stats = {
    totalHabits: habits?.length || 0,
    totalCompletions: completions?.length || 0,
    todayCompletions: todayCompletions?.length || 0,
    completionRate: habits?.length ? (todayCompletions?.length || 0) / habits.length : 0,
    averageCompletionsPerDay: 0,
    mostActiveDay: '',
    categoryBreakdown: {} as Record<string, number>,
    streakData: streaks || [],
  };

  // Calculate average completions per day (last 30 days)
  if (completions && completions.length > 0) {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentCompletions = completions.filter(c => c.completedAt >= thirtyDaysAgo);
    stats.averageCompletionsPerDay = recentCompletions.length / 30;
  }

  // Calculate category breakdown
  if (habits && habits.length > 0) {
    habits.forEach(habit => {
      const category = habit.category;
      stats.categoryBreakdown[category] = (stats.categoryBreakdown[category] || 0) + 1;
    });
  }

  // Calculate most active day of the week
  if (completions && completions.length > 0) {
    const dayCounts: Record<string, number> = {};
    completions.forEach(completion => {
      const day = new Date(completion.completedAt).toLocaleDateString('en-US', { weekday: 'long' });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    
    const dayEntries = Object.entries(dayCounts);
    if (dayEntries.length > 0) {
      const mostActiveDay = dayEntries.reduce((a, b) => 
        dayCounts[a[0]] > dayCounts[b[0]] ? a : b
      );
      stats.mostActiveDay = mostActiveDay[0];
    }
  }

  return stats;
} 