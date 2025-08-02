import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { commonStyles } from './styles';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={commonStyles.container}>
        <ThemedView style={commonStyles.centerContainer}>
          <ThemedText style={commonStyles.title}>This screen does not exist.</ThemedText>
          <Link href="/" style={styles.link}>
            <ThemedText style={styles.linkText}>Go to home screen!</ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
