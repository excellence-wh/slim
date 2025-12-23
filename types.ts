// 减肥计划相关类型
export interface WeightLossPlan {
  totalTarget: {
    startWeight: number;
    endWeight: number;
    totalWeeks: number;
    monthlyTarget: number;
  };
  phases: Phase[];
}

export interface Phase {
  id: string;
  name: string;
  weeks: string;
  targetWeight: number;
  weightLossTarget: number;
  mainTasks: string;
  dietPlan: DietPlan;
  exercisePlan: ExercisePlan;
  milestones: Milestone[];
  tips: string[];
}

// 饮食套餐相关类型
export interface MealPackage {
  id: string;
  name: string;
  calories: number;
  foodItems: string[];
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealTypePackages {
  breakfast: MealPackage[];
  lunch: MealPackage[];
  afternoonTea: MealPackage[];
  dinner: MealPackage[];
}

// 饮食方案相关类型
export interface DietPlan {
  dailyCalories: string;
  cookingMethods: string[];
  dailyStructure: {
    breakfast: string[];
    lunch: string[];
    afternoonTea: string[];
    dinner: string[];
  };
  snackPrinciple: string;
  mealPackages: MealTypePackages;
}

// 运动方案相关类型
export interface ExercisePlan {
  weeklySchedule: {
    [key: string]: ExerciseDay;
  };
  programmerTips: string[];
}

export interface ExerciseDay {
  type: string;
  exercises: Exercise[];
  duration: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  description?: string;
}

// 里程碑相关类型
export interface Milestone {
  id: string;
  week: number;
  description: string;
  completed: boolean;
}

// 打卡记录相关类型
export interface CheckInRecord {
  id: string;
  date: string; // YYYY-MM-DD format
  type: 'diet' | 'exercise' | 'weight' | 'all'; // 打卡类型
  completed: boolean; // 打卡状态
  details: {
    diet?: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      breakfastPackage?: string;
      lunchPackage?: string;
      dinnerPackage?: string;
    };
    exercise?: {
      completed: boolean;
      duration: number;
      type: string;
    };
    weight?: number;
  };
  notes?: string;
}

// 测量记录相关类型
export interface MeasurementRecord {
  id: string;
  date: string;
  weight: number;
  waist: number;
  chest: number;
  thigh: number;
  bodyFat?: number;
  photoUrls?: string[];
}

// 用户进度相关类型
export interface UserProgress {
  currentWeight: number;
  startDate: string;
  currentPhase: string;
  completedMilestones: string[];
  streakCount: number; // 连续打卡天数
  totalCheckIns: number; // 总打卡次数
  lastUpdated: string;
}

// 设置相关类型
export interface Settings {
  reminderEnabled: boolean;
  reminderTime: string;
  measurementReminderEnabled: boolean;
  measurementReminderDay: string;
  theme: 'light' | 'dark' | 'auto';
}
