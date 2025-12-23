import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { addCheckInRecord, getCheckInRecordByDate, getUserProgress, getWeightLossPlan, updateCheckInRecord, updateUserProgress } from '../storage';
import { CheckInRecord, WeightLossPlan } from '../types';

export default function CheckInScreen() {
  const today = new Date().toISOString().split('T')[0];
  const [checkInRecord, setCheckInRecord] = useState<CheckInRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [weightLossPlan, setWeightLossPlan] = useState<WeightLossPlan | null>(null);
  const [currentPhaseId, setCurrentPhaseId] = useState('phase-1');
  
  // 饮食打卡状态
  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [breakfastPackage, setBreakfastPackage] = useState('');
  const [lunchPackage, setLunchPackage] = useState('');
  const [dinnerPackage, setDinnerPackage] = useState('');
  
  // 运动打卡状态
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  
  // 体重打卡状态
  const [weight, setWeight] = useState('');
  
  // 备注
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // 检查今天是否已经打卡
        const record = await getCheckInRecordByDate(today);
        setCheckInRecord(record);
        
        // 加载减肥计划
        const plan = await getWeightLossPlan();
        setWeightLossPlan(plan);
        
        // 加载用户当前阶段
        const progress = await getUserProgress();
        setCurrentPhaseId(progress.currentPhase);
        
        // 如果已经打卡，填充表单
        if (record) {
          setBreakfast(record.details.diet?.breakfast || false);
          setLunch(record.details.diet?.lunch || false);
          setDinner(record.details.diet?.dinner || false);
          setBreakfastPackage(record.details.diet?.breakfastPackage || '');
          setLunchPackage(record.details.diet?.lunchPackage || '');
          setDinnerPackage(record.details.diet?.dinnerPackage || '');
          setExerciseCompleted(record.details.exercise?.completed || false);
          setExerciseDuration(record.details.exercise?.duration.toString() || '');
          setExerciseType(record.details.exercise?.type || '');
          setWeight(record.details.weight?.toString() || '');
          setNotes(record.notes || '');
        }
      } catch (error) {
        console.error('Failed to load check-in data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [today]);

  const handleSubmit = async () => {
    try {
      const newRecord: CheckInRecord = {
        id: checkInRecord?.id || Date.now().toString(),
        date: today,
        type: 'all',
        completed: breakfast || lunch || dinner || exerciseCompleted || weight !== '',
        details: {
          diet: {
            breakfast,
            lunch,
            dinner,
            breakfastPackage: breakfastPackage || undefined,
            lunchPackage: lunchPackage || undefined,
            dinnerPackage: dinnerPackage || undefined,
          },
          exercise: {
            completed: exerciseCompleted,
            duration: exerciseDuration ? parseInt(exerciseDuration) : 0,
            type: exerciseType
          },
          weight: weight ? parseFloat(weight) : undefined
        },
        notes
      };

      if (checkInRecord) {
        // 更新现有记录
        await updateCheckInRecord(newRecord);
      } else {
        // 添加新记录
        await addCheckInRecord(newRecord);
        
        // 更新用户进度
        const progress = await getUserProgress();
        await updateUserProgress({
          ...progress,
          streakCount: progress.streakCount + 1,
          totalCheckIns: progress.totalCheckIns + 1,
          lastUpdated: today
        });
      }

      Alert.alert('成功', '打卡成功！');
    } catch (error) {
      console.error('Failed to submit check-in:', error);
      Alert.alert('错误', '打卡失败，请重试。');
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
        <ThemedText type="title" style={styles.title}>今日打卡</ThemedText>
        <ThemedText style={styles.date}>{today}</ThemedText>
        {checkInRecord && (
          <ThemedView style={styles.completedBadge}>
            <ThemedText style={styles.completedText}>已打卡</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* 饮食打卡 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🍱 饮食打卡</ThemedText>
        
        {/* 早餐 */}
        <ThemedView style={styles.mealContainer}>
          <ThemedText style={styles.mealTitle}>早餐</ThemedText>
          
          {/* 套餐选择 */}
          {weightLossPlan && weightLossPlan.phases.find(p => p.id === currentPhaseId)?.dietPlan?.mealPackages?.breakfast && (
            <ThemedView style={styles.packageSelector}>
              <ThemedText style={styles.packageLabel}>选择套餐:</ThemedText>
              <ThemedView style={styles.packageGrid}>
                {weightLossPlan.phases.find(p => p.id === currentPhaseId)?.dietPlan?.mealPackages?.breakfast?.map((pkg) => (
                  <TouchableOpacity
                    key={pkg.id}
                    style={[
                      styles.packageItem,
                      breakfastPackage === pkg.id && styles.selectedPackageItem
                    ]}
                    onPress={() => {
                      setBreakfastPackage(pkg.id);
                      setBreakfast(true); // 选择套餐时自动标记为完成
                    }}
                  >
                    <ThemedText style={styles.packageItemText}>{pkg.name}</ThemedText>
                    <ThemedText style={styles.packageItemCalories}>{pkg.calories} 大卡</ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          )}
          
          {/* 手动完成选项 */}
          <TouchableOpacity 
            style={[styles.checkInItem, breakfast && styles.checkedItem]} 
            onPress={() => {
              setBreakfast(!breakfast);
              if (!breakfast) {
                setBreakfastPackage(''); // 取消完成时清除套餐选择
              }
            }}
          >
            <ThemedText style={styles.checkInItemText}>{breakfast ? '✓ 已完成早餐' : '○ 手动完成（不选套餐）'}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {/* 午餐 */}
        <ThemedView style={styles.mealContainer}>
          <ThemedText style={styles.mealTitle}>午餐</ThemedText>
          
          {/* 套餐选择 */}
          {weightLossPlan && weightLossPlan.phases.find(p => p.id === currentPhaseId)?.dietPlan?.mealPackages?.lunch && (
            <ThemedView style={styles.packageSelector}>
              <ThemedText style={styles.packageLabel}>选择套餐:</ThemedText>
              <ThemedView style={styles.packageGrid}>
                {weightLossPlan.phases.find(p => p.id === currentPhaseId)?.dietPlan?.mealPackages?.lunch?.map((pkg) => (
                  <TouchableOpacity
                    key={pkg.id}
                    style={[
                      styles.packageItem,
                      lunchPackage === pkg.id && styles.selectedPackageItem
                    ]}
                    onPress={() => {
                      setLunchPackage(pkg.id);
                      setLunch(true); // 选择套餐时自动标记为完成
                    }}
                  >
                    <ThemedText style={styles.packageItemText}>{pkg.name}</ThemedText>
                    <ThemedText style={styles.packageItemCalories}>{pkg.calories} 大卡</ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          )}
          
          {/* 手动完成选项 */}
          <TouchableOpacity 
            style={[styles.checkInItem, lunch && styles.checkedItem]} 
            onPress={() => {
              setLunch(!lunch);
              if (!lunch) {
                setLunchPackage(''); // 取消完成时清除套餐选择
              }
            }}
          >
            <ThemedText style={styles.checkInItemText}>{lunch ? '✓ 已完成午餐' : '○ 手动完成（不选套餐）'}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        {/* 晚餐 */}
        <ThemedView style={styles.mealContainer}>
          <ThemedText style={styles.mealTitle}>晚餐</ThemedText>
          
          {/* 套餐选择 */}
          {weightLossPlan && weightLossPlan.phases.find(p => p.id === currentPhaseId)?.dietPlan?.mealPackages?.dinner && (
            <ThemedView style={styles.packageSelector}>
              <ThemedText style={styles.packageLabel}>选择套餐:</ThemedText>
              <ThemedView style={styles.packageGrid}>
                {weightLossPlan.phases.find(p => p.id === currentPhaseId)?.dietPlan?.mealPackages?.dinner?.map((pkg) => (
                  <TouchableOpacity
                    key={pkg.id}
                    style={[
                      styles.packageItem,
                      dinnerPackage === pkg.id && styles.selectedPackageItem
                    ]}
                    onPress={() => {
                      setDinnerPackage(pkg.id);
                      setDinner(true); // 选择套餐时自动标记为完成
                    }}
                  >
                    <ThemedText style={styles.packageItemText}>{pkg.name}</ThemedText>
                    <ThemedText style={styles.packageItemCalories}>{pkg.calories} 大卡</ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          )}
          
          {/* 手动完成选项 */}
          <TouchableOpacity 
            style={[styles.checkInItem, dinner && styles.checkedItem]} 
            onPress={() => {
              setDinner(!dinner);
              if (!dinner) {
                setDinnerPackage(''); // 取消完成时清除套餐选择
              }
            }}
          >
            <ThemedText style={styles.checkInItemText}>{dinner ? '✓ 已完成晚餐' : '○ 手动完成（不选套餐）'}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* 运动打卡 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🏃‍♂️ 运动打卡</ThemedText>
        <ThemedView style={styles.checkInGroup}>
          <TouchableOpacity 
            style={[styles.checkInItem, exerciseCompleted && styles.checkedItem]} 
            onPress={() => setExerciseCompleted(!exerciseCompleted)}
          >
            <ThemedText style={styles.checkInItemText}>完成运动</ThemedText>
            <ThemedText style={styles.checkInItemStatus}>{exerciseCompleted ? '✓ 已完成' : '○ 未完成'}</ThemedText>
          </TouchableOpacity>
          
          {exerciseCompleted && (
            <>
              <ThemedView style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>运动时长（分钟）</ThemedText>
                <TextInput
                  style={styles.input}
                  value={exerciseDuration}
                  onChangeText={setExerciseDuration}
                  keyboardType="numeric"
                  placeholder="请输入运动时长"
                />
              </ThemedView>
              
              <ThemedView style={styles.inputGroup}>
                <ThemedText style={styles.inputLabel}>运动类型</ThemedText>
                <TextInput
                  style={styles.input}
                  value={exerciseType}
                  onChangeText={setExerciseType}
                  placeholder="请输入运动类型（如：跑步、健身、游泳等）"
                />
              </ThemedView>
            </>
          )}
        </ThemedView>
      </ThemedView>

      {/* 体重打卡 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>⚖️ 体重打卡</ThemedText>
        <ThemedView style={styles.checkInGroup}>
          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>今日体重（kg）</ThemedText>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="请输入今日体重"
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 备注 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>📝 备注</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="请输入今日感受或特殊情况"
          multiline
          numberOfLines={4}
        />
      </ThemedView>

      {/* 提交按钮 */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <ThemedText style={styles.submitButtonText}>
          {checkInRecord ? '更新打卡' : '提交打卡'}
        </ThemedText>
      </TouchableOpacity>
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
  date: {
    opacity: 0.8,
    marginBottom: 12,
  },
  completedBadge: {
    backgroundColor: '#06D6A0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  completedText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  checkInGroup: {
    gap: 12,
  },
  checkInItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  checkedItem: {
    backgroundColor: '#06D6A0',
  },
  checkInItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  checkInItemStatus: {
    fontSize: 14,
    opacity: 0.8,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  input: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  mealContainer: {
    marginBottom: 20,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  packageSelector: {
    marginTop: 8,
    gap: 8,
  },
  packageLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  packageGrid: {
    gap: 12,
  },
  packageItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedPackageItem: {
    backgroundColor: '#06D6A0',
  },
  packageItemText: {
    fontWeight: '500',
  },
  packageItemCalories: {
    fontSize: 12,
    opacity: 0.8,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
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
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
