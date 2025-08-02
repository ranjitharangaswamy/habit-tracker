import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Id } from '../convex/_generated/dataModel';
import { ThemedText } from './ThemedText';

interface HabitCardProps {
  habit: {
    _id: Id<"habits">;
    name: string;
    description?: string;
    category: string;
    color: string;
    icon: string;
  };
  isCompleted: boolean;
  onToggle: (habitId: Id<"habits">) => void;
  streak?: number;
}

export function HabitCard({ habit, isCompleted, onToggle, streak }: HabitCardProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(habit._id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: habit.color + '20' }, // Add transparency
        isCompleted && styles.completedContainer
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={habit.icon as any} 
            size={24} 
            color={habit.color}
          />
        </View>
        
        <View style={styles.textContainer}>
          <ThemedText style={styles.name}>{habit.name}</ThemedText>
          {habit.description && (
            <ThemedText style={styles.description}>{habit.description}</ThemedText>
          )}
          {streak !== undefined && streak > 0 && (
            <ThemedText style={styles.streak}>
              🔥 {streak} day{streak !== 1 ? 's' : ''} streak
            </ThemedText>
          )}
        </View>

        <View style={styles.checkContainer}>
          <View style={[
            styles.checkCircle,
            { borderColor: habit.color },
            isCompleted && { backgroundColor: habit.color }
          ]}>
            {isCompleted && (
              <Ionicons 
                name="checkmark" 
                size={16} 
                color="white" 
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
    paddingTop: 2,
    paddingBottom: 2,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 4,
    paddingTop: 1,
    paddingBottom: 1,
  },
  streak: {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 16,
    paddingTop: 1,
    paddingBottom: 1,
  },
  checkContainer: {
    marginLeft: 16,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 