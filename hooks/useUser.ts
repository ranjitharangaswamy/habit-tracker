import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

const USER_ID_KEY = "habit_tracker_user_id";

export function useUser() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useQuery(api.users.getUser, userId ? { userId } : "skip");
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    loadUserId();
  }, []);

  const loadUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem(USER_ID_KEY);
      if (storedUserId) {
        setUserId(storedUserId as Id<"users">);
      }
    } catch (error) {
      console.error("Error loading user ID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, name?: string) => {
    try {
      const newUserId = await createUser({ email, name });
      await AsyncStorage.setItem(USER_ID_KEY, newUserId);
      setUserId(newUserId);
      return newUserId;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(USER_ID_KEY);
      setUserId(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return {
    user,
    userId,
    isLoading,
    signIn,
    signOut,
  };
} 