import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TaskList } from '@/components/task-list';
import { special改造 } from '@/data/special';

export default function SpecialScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">程序员专项改造</ThemedText>
        <ThemedText style={styles.subtitle}>专为程序员设计的减肥改造方案</ThemedText>
      </ThemedView>

      {/* 办公桌改造 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>办公桌改造</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          改善办公环境，减少久坐时间，提高代谢
        </ThemedText>
        <TaskList tasks={special改造.办公桌改造} />
      </ThemedView>

      {/* 加班应对方案 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>加班应对方案</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          加班时如何保持健康饮食和运动
        </ThemedText>
        <TaskList tasks={special改造.加班应对方案} />
      </ThemedView>

      {/* 睡眠管理 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>睡眠管理</ThemedText>
        <ThemedText style={styles.sectionDescription}>
          充足睡眠对减肥的重要性和改善方法
        </ThemedText>
        <TaskList tasks={special改造.睡眠管理} />
      </ThemedView>

      {/* 重要提醒 */}
      <ThemedView style={styles.reminder}>
        <ThemedText type="subtitle" style={styles.reminderTitle}>重要提醒</ThemedText>
        <ThemedText style={styles.reminderText}>
          睡眠不足会分泌皮质醇导致肥胖，务必保证7-7.5小时睡眠！
        </ThemedText>
        <ThemedText style={styles.reminderText}>
          每45分钟起身活动5分钟，有助于提高代谢和减少腰部脂肪堆积。
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
    marginBottom: 8,
  },
  sectionDescription: {
    marginBottom: 16,
    opacity: 0.8,
    fontSize: 14,
  },
  reminder: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  reminderTitle: {
    marginBottom: 12,
  },
  reminderText: {
    marginBottom: 8,
    fontSize: 14,
    opacity: 0.8,
  },
});
