import { HabitCard } from '@/components/HabitCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCompletions } from '@/hooks/useCompletions';
import { useHabits } from '@/hooks/useHabits';
import { useUser } from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Modal, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HabitsScreen() {
  const { user, userId, isLoading } = useUser();
  const { habits, createHabit, updateHabit, deleteHabit } = useHabits(userId);
  const { isHabitCompletedToday } = useCompletions(userId);
  const insets = useSafeAreaInsets();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [habitCategory, setHabitCategory] = useState('Health');
  const [habitColor, setHabitColor] = useState('#4CAF50');
  const [habitIcon, setHabitIcon] = useState('fitness');

  const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#F44336', '#795548'];
  const icons = ['fitness', 'water', 'book', 'meditation', 'walk', 'nutrition'];
  const categories = ['Health', 'Fitness', 'Learning', 'Mindfulness', 'Productivity'];

  const handleCreateHabit = async () => {
    if (!habitName.trim() || !userId) return;

    try {
      await createHabit({
        userId,
        name: habitName.trim(),
        description: habitDescription.trim() || undefined,
        category: habitCategory,
        frequency: 'daily',
        reminderTimes: [],
        color: habitColor,
        icon: habitIcon,
      });
      
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to create habit. Please try again.');
    }
  };

  const handleUpdateHabit = async () => {
    if (!habitName.trim() || !editingHabit) return;

    try {
      await updateHabit({
        habitId: editingHabit._id,
        name: habitName.trim(),
        description: habitDescription.trim() || undefined,
        category: habitCategory,
        color: habitColor,
        icon: habitIcon,
      });
      
      setEditingHabit(null);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to update habit. Please try again.');
    }
  };

  const handleDeleteHabit = async (habit: any) => {
    Alert.alert(
      'Delete Habit',
      `Are you sure you want to delete "${habit.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await deleteHabit({ habitId: habit._id });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete habit. Please try again.');
            }
          }
        },
      ]
    );
  };

  const resetForm = () => {
    setHabitName('');
    setHabitDescription('');
    setHabitCategory('Health');
    setHabitColor('#4CAF50');
    setHabitIcon('fitness');
  };

  const openEditModal = (habit: any) => {
    setEditingHabit(habit);
    setHabitName(habit.name);
    setHabitDescription(habit.description || '');
    setHabitCategory(habit.category);
    setHabitColor(habit.color);
    setHabitIcon(habit.icon);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingHabit(null);
    resetForm();
  };

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
          <ThemedText style={styles.title}>Habits</ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign in to manage your habits
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  const completedCount = habits?.filter((habit: any) => 
    isHabitCompletedToday(habit._id)
  ).length || 0;
  const totalCount = habits?.length || 0;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>All Habits</ThemedText>
          <ThemedText style={styles.progressText}>
            {completedCount} of {totalCount} completed today
          </ThemedText>
        </View>

        {habits && habits.length > 0 ? (
          <View style={styles.habitsContainer}>
            {habits.map((habit: any) => (
              <View key={habit._id} style={styles.habitWrapper}>
                <HabitCard
                  habit={habit}
                  isCompleted={isHabitCompletedToday(habit._id)}
                  onToggle={() => {}} // No completion in habits tab
                />
                <View style={styles.habitActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => openEditModal(habit)}
                  >
                    <Ionicons name="pencil" size={16} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteHabit(habit)}
                  >
                    <Ionicons name="trash" size={16} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="list-outline" size={64} color="#666" />
            <ThemedText style={styles.emptyTitle}>No habits yet</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Create your first habit to get started
            </ThemedText>
          </View>
        )}

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={24} color="white" />
          <ThemedText style={styles.createButtonText}>Create Habit</ThemedText>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showCreateModal || editingHabit !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <ThemedView style={styles.modalContainer}>
          <View style={[styles.modalHeader, { paddingTop: Math.max(insets.top, 16) }]}>
            <ThemedText style={styles.modalTitle}>
              {editingHabit ? 'Edit Habit' : 'Create Habit'}
            </ThemedText>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Habit name"
              value={habitName}
              onChangeText={setHabitName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              value={habitDescription}
              onChangeText={setHabitDescription}
              multiline
            />

            <ThemedText style={styles.sectionTitle}>Category</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.optionChip,
                    habitCategory === category && styles.selectedChip
                  ]}
                  onPress={() => setHabitCategory(category)}
                >
                  <ThemedText style={[
                    styles.optionText,
                    habitCategory === category && styles.selectedOptionText
                  ]}>
                    {category}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ThemedText style={styles.sectionTitle}>Color</ThemedText>
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    habitColor === color && styles.selectedColor
                  ]}
                  onPress={() => setHabitColor(color)}
                />
              ))}
            </View>

            <ThemedText style={styles.sectionTitle}>Icon</ThemedText>
            <View style={styles.iconContainer}>
              {icons.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    habitIcon === icon && styles.selectedIcon
                  ]}
                  onPress={() => setHabitIcon(icon)}
                >
                  <Ionicons 
                    name={icon as any} 
                    size={24} 
                    color={habitIcon === icon ? 'white' : '#666'} 
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>

          <View style={[styles.modalFooter, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={editingHabit ? handleUpdateHabit : handleCreateHabit}
            >
              <ThemedText style={styles.saveButtonText}>
                {editingHabit ? 'Update' : 'Create'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
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
    textAlign: 'center',
  },
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
  habitWrapper: {
    position: 'relative',
  },
  habitActions: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    paddingTop: 2,
    paddingBottom: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    paddingTop: 2,
    paddingBottom: 2,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 12,
    marginTop: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedOptionText: {
    color: 'white',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#007AFF',
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    backgroundColor: '#007AFF',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
    backgroundColor: 'white',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
}); 