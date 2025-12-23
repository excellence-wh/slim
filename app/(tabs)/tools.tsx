import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ReminderCard } from '@/components/reminder-card';
import { toolsData } from '@/data/tools';

export default function ToolsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">工具与提醒</ThemedText>
        <ThemedText style={styles.subtitle}>减肥必备工具和重要提醒</ThemedText>
      </ThemedView>

      {/* 工具清单 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>工具清单</ThemedText>
        <ThemedView style={styles.toolsList}>
          {toolsData.工具清单.map((tool, index) => (
            <ThemedView key={index} style={styles.toolItem}>
              <ThemedText style={styles.toolName}>{tool.name}</ThemedText>
              <ThemedText style={styles.toolDescription}>{tool.description}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* 重要提醒 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>重要提醒</ThemedText>
        {toolsData.重要提醒.map((reminder, index) => (
          <ReminderCard
            key={index}
            title={reminder.title}
            items={reminder.items}
          />
        ))}
      </ThemedView>

      {/* 监测指标 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>监测指标</ThemedText>
        <ThemedView style={styles.monitoringList}>
          {toolsData.监测指标.map((item, index) => (
            <ThemedView key={index} style={styles.monitoringItem}>
              <ThemedText style={styles.monitoringName}>{item.name}</ThemedText>
              <ThemedView style={styles.monitoringDetails}>
                <ThemedText style={styles.monitoringFrequency}>{item.frequency}</ThemedText>
                <ThemedText style={styles.monitoringDescription}>{item.description}</ThemedText>
              </ThemedView>
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
  toolsList: {
    gap: 12,
  },
  toolItem: {
    padding: 12,
    borderRadius: 8,
  },
  toolName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  monitoringList: {
    gap: 12,
  },
  monitoringItem: {
    padding: 12,
    borderRadius: 8,
  },
  monitoringName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  monitoringDetails: {
    gap: 4,
  },
  monitoringFrequency: {
    fontSize: 13,
    opacity: 0.7,
  },
  monitoringDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
});
