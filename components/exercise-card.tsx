import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

interface ExerciseCardProps {
  day: string;
  type: string;
  exercises: Exercise[];
  duration?: string;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ day, type, exercises, duration }) => {
  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.header}>
        <ThemedText type="subtitle" style={styles.day}>{day}</ThemedText>
        <ThemedText style={styles.type}>{type}</ThemedText>
      </ThemedView>
      
      {exercises.length > 0 && (
        <ThemedView style={styles.exercisesList}>
          {exercises.map((exercise, index) => (
            <ThemedView key={index} style={styles.exerciseItem}>
              <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
              <ThemedText style={styles.exerciseDetails}>
                {exercise.sets}×{exercise.reps}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      )}
      
      {duration && (
        <ThemedView style={styles.durationContainer}>
          <ThemedText style={styles.duration}>{duration}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  day: {
    flex: 1,
  },
  type: {
    fontSize: 12,
    opacity: 0.8,
  },
  exercisesList: {
    gap: 12,
    marginBottom: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    flex: 1,
    fontSize: 14,
  },
  exerciseDetails: {
    fontSize: 14,
    opacity: 0.8,
  },
  durationContainer: {
    marginTop: 8,
  },
  duration: {
    fontSize: 14,
    opacity: 0.8,
  },
});
