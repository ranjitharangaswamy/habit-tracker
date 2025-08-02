import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export function useHabits(userId: Id<"users"> | null) {
  const habits = useQuery(
    api.habits.getUserHabits,
    userId ? { userId } : "skip"
  );

  const todayHabits = useQuery(
    api.habits.getTodayHabits,
    userId ? { userId } : "skip"
  );

  const createHabit = useMutation(api.habits.createHabit);
  const updateHabit = useMutation(api.habits.updateHabit);
  const deleteHabit = useMutation(api.habits.deleteHabit);

  return {
    habits,
    todayHabits,
    createHabit,
    updateHabit,
    deleteHabit,
  };
} 