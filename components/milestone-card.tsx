import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface MilestoneCardProps {
  milestones: {
    name: string;
    description: string;
  }[];
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestones }) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.title}>里程碑</ThemedText>
      <ThemedView style={styles.list}>
        {milestones.map((milestone, index) => (
          <ThemedView key={index} style={styles.milestone}>
            <ThemedView style={styles.milestoneHeader}>
              <ThemedText style={styles.milestoneName}>{milestone.name}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.milestoneDescription}>{milestone.description}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  list: {
    gap: 16,
  },
  milestone: {
    gap: 4,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  milestoneName: {
    fontWeight: '600',
    fontSize: 15,
  },
  milestoneDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 24,
  },
});
