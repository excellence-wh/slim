import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface DietCardProps {
  title: string;
  items: string[];
}

export const DietCard: React.FC<DietCardProps> = ({ title, items }) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      <ThemedView style={styles.list}>
        {items.map((item, index) => (
          <ThemedView key={index} style={styles.item}>
            <ThemedText style={styles.itemText}>{item}</ThemedText>
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
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemText: {
    fontSize: 14,
    flex: 1,
  },
});
