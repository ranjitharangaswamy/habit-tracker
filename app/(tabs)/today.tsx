import { HabitCard } from '@/components/HabitCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCompletions } from '@/hooks/useCompletions';
import { useHabits } from '@/hooks/useHabits';
import { useUser } from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { commonStyles } from '../styles';

export default function TodayScreen() {
  const { user, userId, isLoading } = useUser();
  const { todayHabits } = useHabits(userId);
  const { isHabitCompletedToday, toggleHabitCompletion } = useCompletions(userId);

  if (isLoading) {
    return (
      <ThemedView style={commonStyles.container}>
        <ThemedText style={commonStyles.loadingText}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!userId) {
    return (
      <ThemedView style={commonStyles.container}>
        <View style={commonStyles.centerContainer}>
          <ThemedText style={commonStyles.title}>Today</ThemedText>
          <ThemedText style={commonStyles.subtitle}>
            Sign in to track your habits
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  const completedCount = todayHabits?.filter((habit: any) => 
    isHabitCompletedToday(habit._id)
  ).length || 0;
  const totalCount = todayHabits?.length || 0;

  return (
    <ThemedView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        <View style={commonStyles.header}>
          <ThemedText style={commonStyles.title}>Today</ThemedText>
          <ThemedText style={styles.progressText}>
            {completedCount} of {totalCount} completed
          </ThemedText>
        </View>

        {todayHabits && todayHabits.length > 0 ? (
          <View style={styles.habitsContainer}>
            {todayHabits.map((habit: any) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                isCompleted={isHabitCompletedToday(habit._id)}
                onToggle={toggleHabitCompletion}
              />
            ))}
          </View>
        ) : (
          <View style={commonStyles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#666" />
            <ThemedText style={commonStyles.emptyTitle}>No habits for today</ThemedText>
            <ThemedText style={commonStyles.emptySubtitle}>
              Go to Habits tab to create your first habit
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  progressText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  habitsContainer: {
    flex: 1,
  },
}); 