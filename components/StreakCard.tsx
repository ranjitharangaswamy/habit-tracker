import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface StreakCardProps {
  habitName: string;
  currentStreak: number;
  longestStreak: number;
  color?: string;
}

export function StreakCard({ habitName, currentStreak, longestStreak, color = '#007AFF' }: StreakCardProps) {
  return (
    <ThemedView style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.habitName}>{habitName}</ThemedText>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={16} color={color} />
            <ThemedText style={[styles.currentStreak, { color }]}>
              {currentStreak} days
            </ThemedText>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Current</ThemedText>
            <ThemedText style={styles.statValue}>{currentStreak}</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Best</ThemedText>
            <ThemedText style={styles.statValue}>{longestStreak}</ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currentStreak: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 