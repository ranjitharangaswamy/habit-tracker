import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@/hooks/useUser';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { buttonStyles, commonStyles, formStyles } from '../styles';

export default function ProfileScreen() {
  const { user, userId, isLoading, signIn, signOut } = useUser();
  
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    try {
      await signIn(email.trim(), name.trim() || undefined);
      setShowSignIn(false);
      setEmail('');
      setName('');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: signOut },
      ]
    );
  };

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
        <ScrollView contentContainerStyle={commonStyles.scrollContent}>
          <View style={commonStyles.header}>
            <ThemedText style={commonStyles.title}>Profile</ThemedText>
            <ThemedText style={commonStyles.subtitle}>
              Sign in to track your habits
            </ThemedText>
          </View>

          {!showSignIn ? (
            <View style={commonStyles.centerContainer}>
              <TouchableOpacity
                style={buttonStyles.primary}
                onPress={() => setShowSignIn(true)}
              >
                <ThemedText style={buttonStyles.primaryText}>Sign In</ThemedText>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={formStyles.formContainer}>
              <TextInput
                style={formStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={formStyles.input}
                placeholder="Name (optional)"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
              <TouchableOpacity style={buttonStyles.primary} onPress={handleSignIn}>
                <ThemedText style={buttonStyles.primaryText}>Sign In</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollContent}>
        <View style={commonStyles.header}>
          <ThemedText style={commonStyles.title}>Profile</ThemedText>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#007AFF" />
          </View>
          
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>
              {user?.name || 'Anonymous User'}
            </ThemedText>
            <ThemedText style={styles.userEmail}>{user?.email}</ThemedText>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={buttonStyles.destructive} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <ThemedText style={buttonStyles.destructiveText}>Sign Out</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 4,
    paddingTop: 3,
    paddingBottom: 3,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 22,
    paddingTop: 2,
    paddingBottom: 2,
  },
  actionsContainer: {
    paddingHorizontal: 16,
  },
}); 