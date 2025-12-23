import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialSettings, initialUserProgress, initialWeightLossPlan } from './initialData';
import { CheckInRecord, MeasurementRecord, Settings, UserProgress, WeightLossPlan } from './types';

// 存储键名定义
const STORAGE_KEYS = {
  WEIGHT_LOSS_PLAN: 'weightLossPlan',
  USER_PROGRESS: 'userProgress',
  SETTINGS: 'settings',
  MEASUREMENT_RECORDS: 'measurementRecords',
  CHECK_IN_RECORDS: 'checkInRecords'
};

// 初始化存储数据
export const initializeStorage = async () => {
  try {
    // 检查是否已经初始化
    const isInitialized = await AsyncStorage.getItem('isInitialized');
    if (isInitialized) {
      return;
    }

    // 初始化减肥计划数据
    await AsyncStorage.setItem(
      STORAGE_KEYS.WEIGHT_LOSS_PLAN,
      JSON.stringify(initialWeightLossPlan)
    );

    // 初始化用户进度数据
    await AsyncStorage.setItem(
      STORAGE_KEYS.USER_PROGRESS,
      JSON.stringify(initialUserProgress)
    );

    // 初始化设置数据
    await AsyncStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify(initialSettings)
    );

    // 初始化空的测量记录和打卡记录
    await AsyncStorage.setItem(STORAGE_KEYS.MEASUREMENT_RECORDS, JSON.stringify([]));
    await AsyncStorage.setItem(STORAGE_KEYS.CHECK_IN_RECORDS, JSON.stringify([]));

    // 标记为已初始化
    await AsyncStorage.setItem('isInitialized', 'true');
  } catch (error) {
    console.error('Failed to initialize storage:', error);
  }
};

// 减肥计划相关存储操作
export const getWeightLossPlan = async (): Promise<WeightLossPlan> => {
  try {
    const plan = await AsyncStorage.getItem(STORAGE_KEYS.WEIGHT_LOSS_PLAN);
    return plan ? JSON.parse(plan) : initialWeightLossPlan;
  } catch (error) {
    console.error('Failed to get weight loss plan:', error);
    return initialWeightLossPlan;
  }
};

export const updateWeightLossPlan = async (plan: WeightLossPlan): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_LOSS_PLAN, JSON.stringify(plan));
  } catch (error) {
    console.error('Failed to update weight loss plan:', error);
  }
};

// 用户进度相关存储操作
export const getUserProgress = async (): Promise<UserProgress> => {
  try {
    const progress = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return progress ? JSON.parse(progress) : initialUserProgress;
  } catch (error) {
    console.error('Failed to get user progress:', error);
    return initialUserProgress;
  }
};

export const updateUserProgress = async (progress: UserProgress): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to update user progress:', error);
  }
};

// 设置相关存储操作
export const getSettings = async (): Promise<Settings> => {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : initialSettings;
  } catch (error) {
    console.error('Failed to get settings:', error);
    return initialSettings;
  }
};

export const updateSettings = async (settings: Settings): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to update settings:', error);
  }
};

// 测量记录相关存储操作
export const getMeasurementRecords = async (): Promise<MeasurementRecord[]> => {
  try {
    const records = await AsyncStorage.getItem(STORAGE_KEYS.MEASUREMENT_RECORDS);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error('Failed to get measurement records:', error);
    return [];
  }
};

export const addMeasurementRecord = async (record: MeasurementRecord): Promise<void> => {
  try {
    const records = await getMeasurementRecords();
    records.push(record);
    await AsyncStorage.setItem(STORAGE_KEYS.MEASUREMENT_RECORDS, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to add measurement record:', error);
  }
};

// 打卡记录相关存储操作
export const getCheckInRecords = async (): Promise<CheckInRecord[]> => {
  try {
    const records = await AsyncStorage.getItem(STORAGE_KEYS.CHECK_IN_RECORDS);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error('Failed to get check-in records:', error);
    return [];
  }
};

export const addCheckInRecord = async (record: CheckInRecord): Promise<void> => {
  try {
    const records = await getCheckInRecords();
    records.push(record);
    await AsyncStorage.setItem(STORAGE_KEYS.CHECK_IN_RECORDS, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to add check-in record:', error);
  }
};

export const updateCheckInRecord = async (record: CheckInRecord): Promise<void> => {
  try {
    const records = await getCheckInRecords();
    const index = records.findIndex(r => r.id === record.id);
    if (index !== -1) {
      records[index] = record;
      await AsyncStorage.setItem(STORAGE_KEYS.CHECK_IN_RECORDS, JSON.stringify(records));
    }
  } catch (error) {
    console.error('Failed to update check-in record:', error);
  }
};

export const getCheckInRecordByDate = async (date: string): Promise<CheckInRecord | null> => {
  try {
    const records = await getCheckInRecords();
    return records.find(r => r.date === date) || null;
  } catch (error) {
    console.error('Failed to get check-in record by date:', error);
    return null;
  }
};

// 获取连续打卡天数
export const getStreakCount = async (): Promise<number> => {
  try {
    const records = await getCheckInRecords();
    if (records.length === 0) {
      return 0;
    }

    // 按日期降序排序
    const sortedRecords = records.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    let streakCount = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const record of sortedRecords) {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today.getTime() - recordDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === streakCount && record.completed) {
        streakCount++;
        today.setDate(today.getDate() - 1);
      } else {
        break;
      }
    }

    return streakCount;
  } catch (error) {
    console.error('Failed to get streak count:', error);
    return 0;
  }
};

// 计算特定日期的卡路里摄入
export const calculateDailyCalories = async (date: string): Promise<number> => {
  try {
    const checkInRecord = await getCheckInRecordByDate(date);
    if (!checkInRecord || !checkInRecord.details.diet) {
      return 0;
    }
    
    const { breakfastPackage, lunchPackage, dinnerPackage } = checkInRecord.details.diet;
    if (!breakfastPackage && !lunchPackage && !dinnerPackage) {
      return 0;
    }
    
    const weightLossPlan = await getWeightLossPlan();
    const progress = await getUserProgress();
    const currentPhase = weightLossPlan.phases.find(p => p.id === progress.currentPhase);
    if (!currentPhase) {
      return 0;
    }
    
    let totalCalories = 0;
    
    // 计算早餐卡路里
    if (breakfastPackage) {
      const pkg = currentPhase.dietPlan.mealPackages.breakfast.find(p => p.id === breakfastPackage);
      if (pkg) {
        totalCalories += pkg.calories;
      }
    }
    
    // 计算午餐卡路里
    if (lunchPackage) {
      const pkg = currentPhase.dietPlan.mealPackages.lunch.find(p => p.id === lunchPackage);
      if (pkg) {
        totalCalories += pkg.calories;
      }
    }
    
    // 计算晚餐卡路里
    if (dinnerPackage) {
      const pkg = currentPhase.dietPlan.mealPackages.dinner.find(p => p.id === dinnerPackage);
      if (pkg) {
        totalCalories += pkg.calories;
      }
    }
    
    return totalCalories;
  } catch (error) {
    console.error('Failed to calculate daily calories:', error);
    return 0;
  }
};

// 计算日期范围内的卡路里摄入
export const calculatePeriodCalories = async (startDate: string, endDate: string): Promise<{ date: string; calories: number }[]> => {
  try {
    const records = await getCheckInRecords();
    const weightLossPlan = await getWeightLossPlan();
    const userProgress = await getUserProgress();
    const currentPhase = weightLossPlan.phases.find(p => p.id === userProgress.currentPhase);
    if (!currentPhase) {
      return [];
    }
    
    const result: { date: string; calories: number }[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 过滤日期范围内的打卡记录
    const filteredRecords = records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= start && recordDate <= end;
    });
    
    // 计算每天的卡路里
    for (const record of filteredRecords) {
      if (!record.details.diet) continue;
      
      const { breakfastPackage, lunchPackage, dinnerPackage } = record.details.diet;
      let dailyCalories = 0;
      
      if (breakfastPackage) {
        const pkg = currentPhase.dietPlan.mealPackages.breakfast.find(p => p.id === breakfastPackage);
        if (pkg) dailyCalories += pkg.calories;
      }
      
      if (lunchPackage) {
        const pkg = currentPhase.dietPlan.mealPackages.lunch.find(p => p.id === lunchPackage);
        if (pkg) dailyCalories += pkg.calories;
      }
      
      if (dinnerPackage) {
        const pkg = currentPhase.dietPlan.mealPackages.dinner.find(p => p.id === dinnerPackage);
        if (pkg) dailyCalories += pkg.calories;
      }
      
      result.push({
        date: record.date,
        calories: dailyCalories
      });
    }
    
    return result;
  } catch (error) {
    console.error('Failed to calculate period calories:', error);
    return [];
  }
};

// 清除所有数据
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Failed to clear all data:', error);
  }
};
