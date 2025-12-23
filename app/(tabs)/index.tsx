import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Activity, Award, BarChart3, Book, Calendar, Clock, Scale, Utensils } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getUserProgress, getWeightLossPlan, initializeStorage } from '../../storage';
import { UserProgress, WeightLossPlan } from '../../types';

export default function HomeScreen() {
  const [weightLossPlan, setWeightLossPlan] = useState<WeightLossPlan | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 初始化存储
        await initializeStorage();
        
        // 加载减肥计划数据
        const plan = await getWeightLossPlan();
        setWeightLossPlan(plan);
        
        // 加载用户进度数据
        const progress = await getUserProgress();
        setUserProgress(progress);
      } catch (error) {
        console.error('Failed to load data:', error);
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

  if (!weightLossPlan || !userProgress) {
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
        <ThemedText type="title" style={styles.title}>减肥计划</ThemedText>
        <ThemedText style={styles.subtitle}>8个月完整计划：84KG → 60KG</ThemedText>
      </ThemedView>

      {/* 今日打卡 */}
      <Link href="/check-in" asChild>
        <ThemedView style={styles.checkInContainer}>
          <Calendar size={24} color="#073B4C" style={styles.icon} />
          <ThemedText type="subtitle" style={styles.checkInTitle}>今日打卡</ThemedText>
          <ThemedText style={styles.checkInSubtitle}>连续打卡 {userProgress.streakCount} 天</ThemedText>
        </ThemedView>
      </Link>

      {/* 总览卡片 */}
      <ThemedView style={styles.overviewCard}>
        <BarChart3 size={24} color="#FF6B6B" style={styles.sectionIcon} />
        <ThemedText type="subtitle" style={styles.overviewTitle}>总览</ThemedText>
        <ThemedView style={styles.overviewStats}>
          <ThemedView style={styles.statItem}>
            <Scale size={20} color="#FF6B6B" style={styles.statIcon} />
            <ThemedText style={styles.statLabel}>总目标</ThemedText>
            <ThemedText style={styles.statValue}>
              减重 {weightLossPlan.totalTarget.startWeight - weightLossPlan.totalTarget.endWeight}kg
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <Clock size={20} color="#FF6B6B" style={styles.statIcon} />
            <ThemedText style={styles.statLabel}>时间</ThemedText>
            <ThemedText style={styles.statValue}>{weightLossPlan.totalTarget.totalWeeks}周</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <Activity size={20} color="#FF6B6B" style={styles.statIcon} />
            <ThemedText style={styles.statLabel}>月均</ThemedText>
            <ThemedText style={styles.statValue}>{weightLossPlan.totalTarget.monthlyTarget}kg</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 月度分解目标表格 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>月度分解目标</ThemedText>
        <ThemedView style={styles.table}>
          {/* 表头 */}
          <ThemedView style={styles.tableHeader}>
            <ThemedText style={styles.tableHeaderText}>月份</ThemedText>
            <ThemedText style={styles.tableHeaderText}>目标体重</ThemedText>
            <ThemedText style={styles.tableHeaderText}>减重目标</ThemedText>
            <ThemedText style={styles.tableHeaderText}>主要任务</ThemedText>
          </ThemedView>
          {/* 表格内容 */}
          {weightLossPlan.phases.map((phase, index) => (
            <ThemedView key={phase.id} style={styles.tableRow}>
              <ThemedText style={styles.tableCell}>{phase.weeks}</ThemedText>
              <ThemedText style={styles.tableCell}>{phase.targetWeight}kg</ThemedText>
              <ThemedText style={styles.tableCell}>{phase.weightLossTarget}kg</ThemedText>
              <ThemedText style={styles.tableCell}>{phase.mainTasks}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* 快速入口 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>快速入口</ThemedText>
        <ThemedView style={styles.quickLinks}>
          <Link href="/phases" asChild>
            <ThemedView style={styles.quickLinkItem}>
              <Book size={24} color="#FF6B6B" style={styles.quickLinkIcon} />
              <ThemedView style={styles.quickLinkContent}>
                <ThemedText type="subtitle" style={styles.quickLinkTitle}>计划详情</ThemedText>
                <ThemedText style={styles.quickLinkDescription}>查看各阶段饮食和运动方案</ThemedText>
              </ThemedView>
            </ThemedView>
          </Link>
          <Link href="/exercise" asChild>
            <ThemedView style={styles.quickLinkItem}>
              <Activity size={24} color="#FF6B6B" style={styles.quickLinkIcon} />
              <ThemedView style={styles.quickLinkContent}>
                <ThemedText type="subtitle" style={styles.quickLinkTitle}>运动方案</ThemedText>
                <ThemedText style={styles.quickLinkDescription}>查看详细运动计划</ThemedText>
              </ThemedView>
            </ThemedView>
          </Link>
          <Link href="/diet" asChild>
            <ThemedView style={styles.quickLinkItem}>
              <Utensils size={24} color="#FF6B6B" style={styles.quickLinkIcon} />
              <ThemedView style={styles.quickLinkContent}>
                <ThemedText type="subtitle" style={styles.quickLinkTitle}>饮食方案</ThemedText>
                <ThemedText style={styles.quickLinkDescription}>查看详细饮食计划</ThemedText>
              </ThemedView>
            </ThemedView>
          </Link>
          <Link href="/milestones" asChild>
            <ThemedView style={styles.quickLinkItem}>
              <Award size={24} color="#FF6B6B" style={styles.quickLinkIcon} />
              <ThemedView style={styles.quickLinkContent}>
                <ThemedText type="subtitle" style={styles.quickLinkTitle}>里程碑</ThemedText>
                <ThemedText style={styles.quickLinkDescription}>查看各阶段里程碑</ThemedText>
              </ThemedView>
            </ThemedView>
          </Link>
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
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.8,
  },
  icon: {
    marginBottom: 8,
  },
  sectionIcon: {
    marginBottom: 8,
    alignSelf: 'center',
  },
  checkInContainer: {
    backgroundColor: '#FFD166',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkInTitle: {
    color: '#073B4C',
    marginBottom: 4,
  },
  checkInSubtitle: {
    color: '#073B4C',
  },
  overviewCard: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  overviewTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  table: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    opacity: 0.8,
  },
  quickLinks: {
    gap: 12,
  },
  quickLinkItem: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  quickLinkIcon: {
    marginTop: 2,
  },
  quickLinkContent: {
    flex: 1,
  },
  quickLinkTitle: {
    marginBottom: 4,
  },
  quickLinkDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
});
