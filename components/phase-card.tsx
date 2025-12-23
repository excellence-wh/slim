import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface PhaseCardProps {
  id: string;
  name: string;
  target: string;
  onPress: () => void;
}

export const PhaseCard: React.FC<PhaseCardProps> = ({ id, name, target, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.content}>
        <ThemedText type="subtitle" style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.target}>{target}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 16,
  },
  name: {
    marginBottom: 8,
  },
  target: {
    fontSize: 14,
    opacity: 0.8,
  },
});
