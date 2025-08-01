import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const openWebsite = () => {
    Linking.openURL('https://ranjitharangaswamy.com');
  };

  const openGitHub = () => {
    Linking.openURL('https://github.com/ranjitharangaswamy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker</Text>
      <Text style={styles.description}>
        A simple and effective habit tracking app to help you build better habits and achieve your goals.
      </Text>
      
      <View style={styles.creatorSection}>
        <Text style={styles.creatorTitle}>Created by</Text>
        <Text style={styles.creatorName}>Ranjitha Rangaswamy</Text>
        
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={openWebsite} style={styles.linkButton}>
            <Text style={styles.linkText}>Website</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={openGitHub} style={styles.linkButton}>
            <Text style={styles.linkText}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  creatorSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  creatorTitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  creatorName: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});