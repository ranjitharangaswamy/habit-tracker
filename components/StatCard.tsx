import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  icon?: string;
}

export function StatCard({ title, value, subtitle, color = '#007AFF', icon }: StatCardProps) {
  return (
    <ThemedView style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.header}>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            {/* Icon would go here if we had an icon system */}
          </View>
        )}
        <View style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.value}>{value}</ThemedText>
          {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
}); 