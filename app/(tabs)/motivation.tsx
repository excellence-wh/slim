import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TaskList } from '@/components/task-list';
import { motivationData } from '@/data/motivation';

export default function MotivationScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">激励机制</ThemedText>
        <ThemedText style={styles.subtitle}>保持动力，坚持到底</ThemedText>
      </ThemedView>

      {/* 阶段性奖励 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>阶段性奖励</ThemedText>
        <ThemedView style={styles.rewardsList}>
          {motivationData.阶段性奖励.map((reward, index) => (
            <ThemedView key={index} style={styles.rewardItem}>
              <ThemedText style={styles.rewardPhase}>{reward.阶段}</ThemedText>
              <ThemedText style={styles.rewardContent}>{reward.奖励}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* 程序员专属奖励 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>程序员专属奖励</ThemedText>
        <ThemedView style={styles.rewardsList}>
          {motivationData.程序员专属奖励.map((reward, index) => (
            <ThemedView key={index} style={styles.rewardItem}>
              <ThemedText style={styles.rewardCondition}>{reward.条件}</ThemedText>
              <ThemedText style={styles.rewardContent}>{reward.奖励}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* 心理建设 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>心理建设</ThemedText>
        {motivationData.心理建设.map((item, index) => (
          <ThemedView key={index} style={styles.mentalItem}>
            <ThemedText style={styles.mentalQuestion}>{item.问题}</ThemedText>
            <ThemedView style={styles.mentalSolutions}>
              {item.对策.map((solution, solutionIndex) => (
                <ThemedText key={solutionIndex} style={styles.mentalSolution}>
                  • {solution}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      {/* 明日启动清单 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>明日启动清单</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          今晚准备：
        </ThemedText>
        <TaskList tasks={motivationData.明日启动清单.今晚准备} />
        
        <ThemedText style={styles.sectionDescription}>
          明天购买：
        </ThemedText>
        <TaskList tasks={motivationData.明日启动清单.明天购买} />
        
        <ThemedText style={styles.sectionDescription}>
          明天执行：
        </ThemedText>
        <TaskList tasks={motivationData.明日启动清单.明天执行} />
      </ThemedView>

      {/* 最后鼓励 */}
      <ThemedView style={styles.encouragement}>
        <ThemedText type="subtitle" style={styles.encouragementTitle}>记住：</ThemedText>
        <ThemedText style={styles.encouragementText}>
          前30天最难，熬过去就成功80%！
        </ThemedText>
      </ThemedView>
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
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionDescription: {
    marginBottom: 8,
    opacity: 0.8,
    fontSize: 14,
    fontWeight: '600',
  },
  rewardsList: {
    gap: 12,
  },
  rewardItem: {
    padding: 12,
    borderRadius: 8,
  },
  rewardPhase: {
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardCondition: {
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardContent: {
    fontSize: 14,
    opacity: 0.8,
  },
  mentalItem: {
    marginBottom: 16,
  },
  mentalQuestion: {
    fontWeight: '600',
    marginBottom: 8,
  },
  mentalSolutions: {
    gap: 4,
  },
  mentalSolution: {
    fontSize: 14,
    opacity: 0.8,
    marginLeft: 8,
  },
  encouragement: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  encouragementTitle: {
    marginBottom: 8,
  },
  encouragementText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
