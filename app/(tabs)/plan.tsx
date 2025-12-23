import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PhaseCard } from '@/components/phase-card';
import { phases } from '@/data/phases';
import { DietCard } from '@/components/diet-card';
import { ExerciseCard } from '@/components/exercise-card';
import { MilestoneCard } from '@/components/milestone-card';

export default function PlanScreen() {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const selectedPhaseData = phases.find(phase => phase.id === selectedPhase);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">减肥计划</ThemedText>
        <ThemedText style={styles.subtitle}>8个月完整计划：84KG → 60KG</ThemedText>
      </ThemedView>

      {!selectedPhase && (
        <ThemedView style={styles.phasesList}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>选择阶段</ThemedText>
          {phases.map(phase => (
            <PhaseCard
              key={phase.id}
              id={phase.id}
              name={phase.name}
              target={phase.target}
              onPress={() => setSelectedPhase(phase.id)}
            />
          ))}
        </ThemedView>
      )}

      {selectedPhaseData && (
        <ThemedView style={styles.phaseDetails}>
          <ThemedView style={styles.backButton}>
            <ThemedText type="subtitle" onPress={() => setSelectedPhase(null)}>← 返回</ThemedText>
          </ThemedView>

          <ThemedText type="subtitle" style={styles.phaseName}>{selectedPhaseData.name}</ThemedText>
          <ThemedText style={styles.phaseTarget}>{selectedPhaseData.target}</ThemedText>

          {/* 饮食方案 */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>饮食方案</ThemedText>
          <ThemedText style={styles.sectionDescription}>
            每日卡路里：{selectedPhaseData.dietPlan.dailyCalories}
          </ThemedText>
          <ThemedView style={styles.cookingMethods}>
            {selectedPhaseData.dietPlan.cookingMethods.map((method, index) => (
              <ThemedText key={index} style={styles.cookingMethod}>{method}</ThemedText>
            ))}
          </ThemedView>

          <DietCard
            title="早餐"
            items={selectedPhaseData.dietPlan.dailyStructure.breakfast}
          />
          <DietCard
            title="午餐"
            items={selectedPhaseData.dietPlan.dailyStructure.lunch}
          />
          <DietCard
            title="下午茶"
            items={selectedPhaseData.dietPlan.dailyStructure.afternoonTea}
          />
          <DietCard
            title="晚餐"
            items={selectedPhaseData.dietPlan.dailyStructure.dinner}
          />
          <ThemedView style={styles.snackRule}>
            <ThemedText type="subtitle" style={styles.snackRuleTitle}>加餐原则</ThemedText>
            <ThemedText style={styles.snackRuleText}>
              {selectedPhaseData.dietPlan.加餐原则}
            </ThemedText>
          </ThemedView>

          {/* 运动方案 */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>运动方案</ThemedText>
          <ThemedText style={styles.sectionDescription}>
            {selectedPhaseData.exercisePlan.description}
          </ThemedText>
          
          {Object.entries(selectedPhaseData.exercisePlan.weeklySchedule).map(([day, schedule]) => (
            <ExerciseCard
              key={day}
              day={day}
              type={schedule.type}
              exercises={schedule.exercises}
              duration={schedule.duration}
            />
          ))}

          {/* 里程碑 */}
          <MilestoneCard milestones={selectedPhaseData.milestones} />
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.8,
  },
  phasesList: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  phaseDetails: {
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  phaseName: {
    marginBottom: 8,
  },
  phaseTarget: {
    marginBottom: 20,
    opacity: 0.8,
  },
  sectionDescription: {
    marginBottom: 16,
    opacity: 0.8,
  },
  cookingMethods: {
    marginBottom: 20,
    gap: 8,
  },
  cookingMethod: {
    fontSize: 14,
    opacity: 0.8,
  },
  snackRule: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  snackRuleTitle: {
    marginBottom: 8,
  },
  snackRuleText: {
    fontSize: 14,
    opacity: 0.8,
  },
});
