import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface TaskListProps {
  title?: string;
  tasks: string[];
}

export const TaskList: React.FC<TaskListProps> = ({ title, tasks }) => {
  return (
    <ThemedView style={styles.container}>
      {title && (
        <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      )}
      <ThemedView style={styles.list}>
        {tasks.map((task, index) => (
          <ThemedView key={index} style={styles.taskItem}>
            <ThemedView style={styles.checkbox}>
              <ThemedText style={styles.checkboxText}>□</ThemedText>
            </ThemedView>
            <ThemedText style={styles.taskText}>{task}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 12,
  },
  list: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxText: {
    fontSize: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 14,
  },
});
