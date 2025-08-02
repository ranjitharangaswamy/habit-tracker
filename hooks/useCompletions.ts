import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function useCompletions(userId: Id<"users"> | null) {
  const todayCompletions = useQuery(
    api.completions.getTodayCompletions,
    userId ? { userId } : "skip"
  );

  const completeHabit = useMutation(api.completions.completeHabit);
  const uncompleteHabit = useMutation(api.completions.uncompleteHabit);

  const isHabitCompletedToday = (habitId: Id<"habits">) => {
    return todayCompletions?.some(
      (completion) => completion.habitId === habitId
    ) ?? false;
  };

  const toggleHabitCompletion = async (habitId: Id<"habits">) => {
    if (!userId) return;

    const isCompleted = isHabitCompletedToday(habitId);
    
    if (isCompleted) {
      await uncompleteHabit({ habitId, userId });
    } else {
      await completeHabit({ habitId, userId });
    }
  };

  return {
    todayCompletions,
    completeHabit,
    uncompleteHabit,
    isHabitCompletedToday,
    toggleHabitCompletion,
  };
} 