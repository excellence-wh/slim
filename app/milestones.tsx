import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WeightLossPlan } from '../types';
import { getWeightLossPlan, updateWeightLossPlan, getUserProgress } from '../storage';

export default function MilestonesScreen() {
  const [weightLossPlan, setWeightLossPlan] = useState<WeightLossPlan | null>(null);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1');

  useEffect(() => {
    const loadData = async () => {
      try {
        const plan = await getWeightLossPlan();
        setWeightLossPlan(plan);
        
        const progress = await getUserProgress();
        setUserProgress(progress);
        setSelectedPhase(progress.currentPhase);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleMilestone = async (phaseId: string, milestoneId: string) => {
    if (!weightLossPlan) return;

    const updatedPlan = { ...weightLossPlan };
    const phase = updatedPlan.phases.find(p => p.id === phaseId);
    
    if (phase) {
      const milestone = phase.milestones.find(m => m.id === milestoneId);
      if (milestone) {
        milestone.completed = !milestone.completed;
        
        // 更新用户进度中的完成里程碑
        if (milestone.completed) {
          // 如果用户进度中没有这个里程碑，添加它
          if (!userProgress.completedMilestones.includes(milestoneId)) {
            userProgress.completedMilestones.push(milestoneId);
          }
        } else {
          // 如果用户进度中有这个里程碑，移除它
          userProgress.completedMilestones = userProgress.completedMilestones.filter(
            (id: string) => id !== milestoneId
          );
        }
        
        await updateWeightLossPlan(updatedPlan);
        setWeightLossPlan(updatedPlan);
      }
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>里程碑</ThemedText>
        <ThemedText style={styles.subtitle}>追踪你的减肥进度</ThemedText>
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

      {/* 阶段里程碑 */}
      {weightLossPlan.phases.map((phase) => (
        <ThemedView 
          key={phase.id} 
          style={[
            styles.phaseContainer,
            selectedPhase !== phase.id && styles.hiddenPhase
          ]}
        >
          <ThemedText type="subtitle" style={styles.phaseTitle}>
            {phase.name} ({phase.weeks})
          </ThemedText>
          
          <ThemedText style={styles.phaseTarget}>
            目标体重: {phase.targetWeight}kg (减重 {phase.weightLossTarget}kg)
          </ThemedText>
          
          <ThemedView style={styles.milestonesContainer}>
            {phase.milestones.map((milestone) => (
              <TouchableOpacity
                key={milestone.id}
                style={[
                  styles.milestoneItem,
                  milestone.completed && styles.completedMilestone
                ]}
                onPress={() => toggleMilestone(phase.id, milestone.id)}
              >
                <ThemedView style={styles.milestoneHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.milestoneWeek}>
                    第 {milestone.week} 周
                  </ThemedText>
                  <ThemedView 
                    style={[
                      styles.completionBadge,
                      milestone.completed && styles.completedBadge
                    ]}
                  >
                    <ThemedText style={styles.completionText}>
                      {milestone.completed ? '已完成' : '未完成'}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                
                <ThemedText style={styles.milestoneDescription}>
                  {milestone.description}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      ))}

      {/* 总体进度 */}
      <ThemedView style={styles.overallProgress}>
        <ThemedText type="subtitle" style={styles.progressTitle}>📊 总体进度</ThemedText>
        
        <ThemedView style={styles.progressCard}>
          <ThemedText style={styles.progressLabel}>当前体重</ThemedText>
          <ThemedText style={styles.progressValue}>{userProgress.currentWeight}kg</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.progressCard}>
          <ThemedText style={styles.progressLabel}>已减重</ThemedText>
          <ThemedText style={styles.progressValue}>
            {weightLossPlan.totalTarget.startWeight - userProgress.currentWeight}kg
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.progressCard}>
          <ThemedText style={styles.progressLabel}>完成里程碑</ThemedText>
          <ThemedText style={styles.progressValue}>
            {userProgress.completedMilestones.length} / 
            {weightLossPlan.phases.reduce((total, phase) => total + phase.milestones.length, 0)}
          </ThemedText>
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
  phaseContainer: {
    margin: 20,
    marginTop: 0,
  },
  hiddenPhase: {
    display: 'none',
  },
  phaseTitle: {
    marginBottom: 8,
    color: '#FF6B6B',
  },
  phaseTarget: {
    marginBottom: 16,
    opacity: 0.8,
  },
  milestonesContainer: {
    gap: 12,
  },
  milestoneItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  completedMilestone: {
    backgroundColor: '#E5FFE5',
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneWeek: {
    fontSize: 14,
  },
  completionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  completedBadge: {
    backgroundColor: '#06D6A0',
  },
  completionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  milestoneDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  overallProgress: {
    margin: 20,
    marginTop: 0,
  },
  progressTitle: {
    marginBottom: 16,
    color: '#FF6B6B',
  },
  progressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});
