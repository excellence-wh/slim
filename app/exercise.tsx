import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WeightLossPlan } from '../types';
import { getWeightLossPlan } from '../storage';

export default function ExerciseScreen() {
  const [weightLossPlan, setWeightLossPlan] = useState<WeightLossPlan | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const plan = await getWeightLossPlan();
        setWeightLossPlan(plan);
      } catch (error) {
        console.error('Failed to load weight loss plan:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>加载中...</ThemedText>
      </ThemedView>
    );
  }

  if (!weightLossPlan) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>数据加载失败</ThemedText>
      </ThemedView>
    );
  }

  const phase = weightLossPlan.phases.find(p => p.id === selectedPhase);

  if (!phase) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>阶段数据不存在</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>运动方案</ThemedText>
        <ThemedText style={styles.subtitle}>科学运动，健康减重</ThemedText>
      </ThemedView>

      {/* 阶段选择 */}
      <ThemedView style={styles.phaseSelector}>
        {weightLossPlan.phases.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[
              styles.phaseButton,
              selectedPhase === p.id && styles.selectedPhaseButton
            ]}
            onPress={() => setSelectedPhase(p.id)}
          >
            <ThemedText 
              style={[
                styles.phaseButtonText,
                selectedPhase === p.id && styles.selectedPhaseButtonText
              ]}
            >
              {p.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* 阶段运动方案 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {phase.name} ({phase.weeks})
        </ThemedText>

        {/* 每周计划 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>每周计划</ThemedText>
          
          {Object.entries(phase.exercisePlan.weeklySchedule).map(([week, schedule], index) => (
            <ThemedView key={index} style={styles.weekContainer}>
              <ThemedText type="defaultSemiBold" style={styles.weekTitle}>{week}</ThemedText>
              <ThemedText style={styles.weekType}>{schedule.type}</ThemedText>
              <ThemedText style={styles.weekDuration}>{schedule.duration}</ThemedText>
              
              <ThemedView style={styles.exercisesContainer}>
                {schedule.exercises.map((exercise, exIndex) => (
                  <ThemedView key={exIndex} style={styles.exerciseItem}>
                    <ThemedText type="defaultSemiBold" style={styles.exerciseName}>
                      {exercise.name}
                    </ThemedText>
                    <ThemedText style={styles.exerciseDetails}>
                      {exercise.sets}组 × {exercise.reps}
                    </ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>

        {/* 程序员专项改造 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>💻 程序员专项改造</ThemedText>
          <ThemedView style={styles.programmerTips}>
            {phase.exercisePlan.programmerTips.map((tip, index) => (
              <ThemedView key={index} style={styles.tipItem}>
                <ThemedText style={styles.tipText}>• {tip}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* 阶段提示 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>阶段提示</ThemedText>
          {phase.tips.map((tip, index) => (
            <ThemedView key={index} style={styles.tipItem}>
              <ThemedText style={styles.tipText}>• {tip}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.8,
  },
  phaseSelector: {
    flexDirection: 'row',
    overflowX: 'scroll',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  phaseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedPhaseButton: {
    backgroundColor: '#FF6B6B',
  },
  phaseButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedPhaseButtonText: {
    color: '#fff',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#FF6B6B',
  },
  sectionSubtitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  weekContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  weekTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  weekType: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  weekDuration: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  exercisesContainer: {
    gap: 12,
  },
  exerciseItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  exerciseName: {
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    opacity: 0.8,
  },
  programmerTips: {
    gap: 8,
  },
  tipItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  tipText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
