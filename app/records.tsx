import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LineChart } from 'react-native-chart-kit';
import { CheckInRecord, MeasurementRecord } from '../types';
import { getCheckInRecords, getMeasurementRecords, getUserProgress } from '../storage';

const screenWidth = Dimensions.get('window').width;

export default function RecordsScreen() {
  const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
  const [measurementRecords, setMeasurementRecords] = useState<MeasurementRecord[]>([]);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [weightData, setWeightData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 加载打卡记录
        const checkIns = await getCheckInRecords();
        setCheckInRecords(checkIns);
        
        // 加载测量记录
        const measurements = await getMeasurementRecords();
        setMeasurementRecords(measurements);
        
        // 加载用户进度
        const progress = await getUserProgress();
        setUserProgress(progress);
        
        // 准备体重数据用于图表
        prepareWeightData(checkIns);
      } catch (error) {
        console.error('Failed to load records:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const prepareWeightData = (records: CheckInRecord[]) => {
    // 过滤出有体重记录的打卡
    const weightRecords = records.filter(record => record.details.weight !== undefined);
    
    // 按日期排序
    weightRecords.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // 提取日期和体重数据
    const labels = weightRecords.map(record => record.date.split('-').slice(1).join('/'));
    const data = weightRecords.map(record => record.details.weight!);
    
    if (labels.length > 0 && data.length > 0) {
      setWeightData({
        labels,
        datasets: [
          {
            data,
            color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
            strokeWidth: 2,
          },
        ],
        legend: ['体重变化'],
      });
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>加载中...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>📊 记录与分析</ThemedText>
        <ThemedText style={styles.subtitle}>追踪你的体重和围度变化</ThemedText>
      </ThemedView>

      {/* 体重变化趋势图 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>⚖️ 体重变化趋势</ThemedText>
        
        {weightData ? (
          <LineChart
            data={weightData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 107, 107, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#FF6B6B',
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <ThemedView style={styles.noDataContainer}>
            <ThemedText>暂无体重记录</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* 最近记录 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>📝 最近记录</ThemedText>
        
        {checkInRecords.length > 0 ? (
          <ThemedView style={styles.recordsContainer}>
            {checkInRecords.slice(-5).reverse().map((record) => (
              <ThemedView key={record.id} style={styles.recordItem}>
                <ThemedText type="defaultSemiBold" style={styles.recordDate}>
                  {record.date}
                </ThemedText>
                
                {record.details.weight && (
                  <ThemedView style={styles.recordDetail}>
                    <ThemedText style={styles.recordLabel}>体重</ThemedText>
                    <ThemedText style={styles.recordValue}>{record.details.weight}kg</ThemedText>
                  </ThemedView>
                )}
                
                {record.details.exercise?.completed && (
                  <ThemedView style={styles.recordDetail}>
                    <ThemedText style={styles.recordLabel}>运动</ThemedText>
                    <ThemedText style={styles.recordValue}>
                      {record.details.exercise.duration}分钟 {record.details.exercise.type}
                    </ThemedText>
                  </ThemedView>
                )}
                
                <ThemedView style={styles.recordDiet}>
                  <ThemedText style={styles.recordLabel}>饮食</ThemedText>
                  <ThemedView style={styles.dietStatus}>
                    <ThemedText style={styles.dietItem}>
                      🥣 {record.details.diet?.breakfast ? '已吃' : '未吃'}
                    </ThemedText>
                    <ThemedText style={styles.dietItem}>
                      🍽️ {record.details.diet?.lunch ? '已吃' : '未吃'}
                    </ThemedText>
                    <ThemedText style={styles.dietItem}>
                      🥗 {record.details.diet?.dinner ? '已吃' : '未吃'}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={styles.noDataContainer}>
            <ThemedText>暂无打卡记录</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* 围度记录 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>📏 围度记录</ThemedText>
        
        {measurementRecords.length > 0 ? (
          <ThemedView style={styles.recordsContainer}>
            {measurementRecords.slice(-3).reverse().map((record) => (
              <ThemedView key={record.id} style={styles.measurementItem}>
                <ThemedText type="defaultSemiBold" style={styles.recordDate}>
                  {record.date}
                </ThemedText>
                
                <ThemedView style={styles.measurementDetails}>
                  <ThemedView style={styles.measurementDetail}>
                    <ThemedText style={styles.recordLabel}>体重</ThemedText>
                    <ThemedText style={styles.recordValue}>{record.weight}kg</ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.measurementDetail}>
                    <ThemedText style={styles.recordLabel}>腰围</ThemedText>
                    <ThemedText style={styles.recordValue}>{record.waist}cm</ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.measurementDetail}>
                    <ThemedText style={styles.recordLabel}>胸围</ThemedText>
                    <ThemedText style={styles.recordValue}>{record.chest}cm</ThemedText>
                  </ThemedView>
                  
                  <ThemedView style={styles.measurementDetail}>
                    <ThemedText style={styles.recordLabel}>大腿围</ThemedText>
                    <ThemedText style={styles.recordValue}>{record.thigh}cm</ThemedText>
                  </ThemedView>
                  
                  {record.bodyFat !== undefined && (
                    <ThemedView style={styles.measurementDetail}>
                      <ThemedText style={styles.recordLabel}>体脂率</ThemedText>
                      <ThemedText style={styles.recordValue}>{record.bodyFat}%</ThemedText>
                    </ThemedView>
                  )}
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={styles.noDataContainer}>
            <ThemedText>暂无围度记录</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* 统计信息 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>📊 统计信息</ThemedText>
        
        <ThemedView style={styles.statsContainer}>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statLabel}>总打卡次数</ThemedText>
            <ThemedText style={styles.statValue}>{checkInRecords.length}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statLabel}>连续打卡</ThemedText>
            <ThemedText style={styles.statValue}>{userProgress.streakCount}天</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statLabel}>测量次数</ThemedText>
            <ThemedText style={styles.statValue}>{measurementRecords.length}</ThemedText>
          </ThemedView>
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
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#FF6B6B',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  recordsContainer: {
    gap: 12,
  },
  recordItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  recordDate: {
    marginBottom: 12,
  },
  recordDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recordLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  recordValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  recordDiet: {
    marginTop: 8,
  },
  dietStatus: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 12,
  },
  dietItem: {
    fontSize: 14,
  },
  measurementItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  measurementDetails: {
    gap: 8,
  },
  measurementDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 4,
  },
  noDataContainer: {
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
});
