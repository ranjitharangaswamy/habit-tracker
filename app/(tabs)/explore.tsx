import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { commonStyles } from '../styles';

export default function ExploreScreen() {
  return (
    <ThemedView style={commonStyles.container}>
      <ThemedView style={commonStyles.centerContainer}>
        <ThemedText style={commonStyles.title}>Explore Tab</ThemedText>
        <ThemedText style={commonStyles.subtitle}>
          social streaks feature to be implemented
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
