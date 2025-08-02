import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';

import { StatCard } from '@/components/StatCard';
import { StreakCard } from '@/components/StreakCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useStats } from '@/hooks/useStats';
import { useUser } from '@/hooks/useUser';

export default function StatsScreen() {
  const { user, userId, isLoading } = useUser();
  const stats = useStats(userId);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!userId) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.centerContainer}>
          <ThemedText style={styles.title}>Statistics</ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign in to view your habit statistics
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  const completionPercentage = Math.round(stats.completionRate * 100);
  const averageCompletions = Math.round(stats.averageCompletionsPerDay * 10) / 10;

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>Statistics</ThemedText>
          <ThemedText style={styles.subtitle}>
            Track your progress and achievements
          </ThemedText>
        </View>

        {/* Overview Stats */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Today's Progress</ThemedText>
          <View style={styles.statsGrid}>
            <StatCard
              title="Habits Completed"
              value={stats.todayCompletions}
              subtitle={`of ${stats.totalHabits} total`}
              color="#4CAF50"
            />
            <StatCard
              title="Completion Rate"
              value={`${completionPercentage}%`}
              subtitle="Today's success rate"
              color="#2196F3"
            />
          </View>
        </View>

        {/* Overall Stats */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Overall Statistics</ThemedText>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Habits"
              value={stats.totalHabits}
              subtitle="Active habits"
              color="#9C27B0"
            />
            <StatCard
              title="Total Completions"
              value={stats.totalCompletions}
              subtitle="All time"
              color="#FF9800"
            />
            <StatCard
              title="Daily Average"
              value={averageCompletions}
              subtitle="Last 30 days"
              color="#F44336"
            />
            <StatCard
              title="Most Active Day"
              value={stats.mostActiveDay || 'N/A'}
              subtitle="Your peak day"
              color="#795548"
            />
          </View>
        </View>

        {/* Category Breakdown */}
        {Object.keys(stats.categoryBreakdown).length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Habits by Category</ThemedText>
            <View style={styles.categoryContainer}>
              {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
                <View key={category} style={styles.categoryItem}>
                  <ThemedText style={styles.categoryName}>{category}</ThemedText>
                  <ThemedText style={styles.categoryCount}>{count}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Streaks */}
        {stats.streakData && stats.streakData.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Current Streaks</ThemedText>
            <View style={styles.streaksContainer}>
              {stats.streakData
                .filter(streak => streak.currentStreak > 0)
                .sort((a, b) => b.currentStreak - a.currentStreak)
                .map((streak, index) => (
                  <StreakCard
                    key={streak.habitId}
                    habitName={streak.name}
                    currentStreak={streak.currentStreak}
                    longestStreak={streak.longestStreak}
                    color={getStreakColor(streak.currentStreak)}
                  />
                ))}
            </View>
            {stats.streakData.filter(streak => streak.currentStreak === 0).length > 0 && (
              <View style={styles.noStreakContainer}>
                <Ionicons name="flame-outline" size={24} color="#666" />
                <ThemedText style={styles.noStreakText}>
                  {stats.streakData.filter(streak => streak.currentStreak === 0).length} habits need attention
                </ThemedText>
              </View>
            )}
          </View>
        )}

        {/* Empty State */}
        {stats.totalHabits === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="stats-chart-outline" size={64} color="#666" />
            <ThemedText style={styles.emptyTitle}>No data yet</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Create some habits to start tracking your progress
            </ThemedText>
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </ThemedView>
  );
}

function getStreakColor(streak: number): string {
  if (streak >= 7) return '#4CAF50'; // Green for 7+ days
  if (streak >= 3) return '#FF9800'; // Orange for 3-6 days
  return '#2196F3'; // Blue for 1-2 days
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: Platform.OS === 'ios' ? 100 : 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    marginBottom: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 26,
    paddingTop: 2,
    paddingBottom: 2,
  },
  statsGrid: {
    gap: 12,
  },
  categoryContainer: {
    gap: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  streaksContainer: {
    gap: 12,
  },
  noStreakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  noStreakText: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    marginTop: 16,
    marginBottom: 8,
    paddingTop: 3,
    paddingBottom: 3,
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
}); 