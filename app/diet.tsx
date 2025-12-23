import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WeightLossPlan } from '../types';
import { getWeightLossPlan } from '../storage';

export default function DietScreen() {
  const [weightLossPlan, setWeightLossPlan] = useState<WeightLossPlan | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string>('phase-1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const plan = await getWeightLossPlan();
        setWeightLossPlan(plan);
      } catch (error) {
        console.error('Failed to load weight loss plan:', error);
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

  if (!weightLossPlan) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>数据加载失败</ThemedText>
      </ThemedView>
    );
  }

  const phase = weightLossPlan.phases.find(p => p.id === selectedPhase);

  if (!phase) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>阶段数据不存在</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 头部 */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>饮食方案</ThemedText>
        <ThemedText style={styles.subtitle}>科学饮食，健康减重</ThemedText>
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

      {/* 阶段饮食方案 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {phase.name} ({phase.weeks})
        </ThemedText>
        
        <ThemedView style={styles.infoCard}>
          <ThemedText type="defaultSemiBold" style={styles.infoLabel}>
            每日热量摄入
          </ThemedText>
          <ThemedText style={styles.infoValue}>{phase.dietPlan.dailyCalories}</ThemedText>
        </ThemedView>

        {/* 烹饪模板 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>烹饪模板</ThemedText>
          <ThemedView style={styles.cookingMethods}>
            {phase.dietPlan.cookingMethods.map((method, index) => (
              <ThemedView key={index} style={styles.cookingMethodItem}>
                <ThemedText style={styles.cookingMethodText}>{method}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* 每日结构 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>每日套餐选择</ThemedText>
          
          {/* 早餐套餐 */}
          <ThemedView style={styles.mealContainer}>
            <ThemedText type="defaultSemiBold" style={styles.mealTitle}>
              🥣 早餐（7:00）
            </ThemedText>
            {phase.dietPlan.mealPackages.breakfast.map((pkg, index) => (
              <ThemedView key={pkg.id} style={styles.mealItem}>
                <ThemedView style={styles.packageHeader}>
                  <ThemedText style={styles.packageName}>{pkg.name}</ThemedText>
                  <ThemedText style={styles.calories}>{pkg.calories} 大卡</ThemedText>
                </ThemedView>
                <ThemedText style={styles.packageItems}>
                  {pkg.foodItems.join(' + ')}
                </ThemedText>
                <ThemedView style={styles.nutritionContainer}>
                  <ThemedText style={styles.nutritionItem}>蛋白质: {pkg.protein}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>碳水: {pkg.carbs}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>脂肪: {pkg.fat}g</ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>

          {/* 午餐套餐 */}
          <ThemedView style={styles.mealContainer}>
            <ThemedText type="defaultSemiBold" style={styles.mealTitle}>
              🍽️ 午餐（12:00）
            </ThemedText>
            {phase.dietPlan.mealPackages.lunch.map((pkg, index) => (
              <ThemedView key={pkg.id} style={styles.mealItem}>
                <ThemedView style={styles.packageHeader}>
                  <ThemedText style={styles.packageName}>{pkg.name}</ThemedText>
                  <ThemedText style={styles.calories}>{pkg.calories} 大卡</ThemedText>
                </ThemedView>
                <ThemedText style={styles.packageItems}>
                  {pkg.foodItems.join(' + ')}
                </ThemedText>
                <ThemedView style={styles.nutritionContainer}>
                  <ThemedText style={styles.nutritionItem}>蛋白质: {pkg.protein}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>碳水: {pkg.carbs}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>脂肪: {pkg.fat}g</ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>

          {/* 下午茶套餐 */}
          <ThemedView style={styles.mealContainer}>
            <ThemedText type="defaultSemiBold" style={styles.mealTitle}>
              ☕ 下午茶（15:00）
            </ThemedText>
            {phase.dietPlan.mealPackages.afternoonTea.map((pkg, index) => (
              <ThemedView key={pkg.id} style={styles.mealItem}>
                <ThemedView style={styles.packageHeader}>
                  <ThemedText style={styles.packageName}>{pkg.name}</ThemedText>
                  <ThemedText style={styles.calories}>{pkg.calories} 大卡</ThemedText>
                </ThemedView>
                <ThemedText style={styles.packageItems}>
                  {pkg.foodItems.join(' + ')}
                </ThemedText>
                <ThemedView style={styles.nutritionContainer}>
                  <ThemedText style={styles.nutritionItem}>蛋白质: {pkg.protein}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>碳水: {pkg.carbs}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>脂肪: {pkg.fat}g</ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>

          {/* 晚餐套餐 */}
          <ThemedView style={styles.mealContainer}>
            <ThemedText type="defaultSemiBold" style={styles.mealTitle}>
              🥗 晚餐（19:00）
            </ThemedText>
            {phase.dietPlan.mealPackages.dinner.map((pkg, index) => (
              <ThemedView key={pkg.id} style={styles.mealItem}>
                <ThemedView style={styles.packageHeader}>
                  <ThemedText style={styles.packageName}>{pkg.name}</ThemedText>
                  <ThemedText style={styles.calories}>{pkg.calories} 大卡</ThemedText>
                </ThemedView>
                <ThemedText style={styles.packageItems}>
                  {pkg.foodItems.join(' + ')}
                </ThemedText>
                <ThemedView style={styles.nutritionContainer}>
                  <ThemedText style={styles.nutritionItem}>蛋白质: {pkg.protein}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>碳水: {pkg.carbs}g</ThemedText>
                  <ThemedText style={styles.nutritionItem}>脂肪: {pkg.fat}g</ThemedText>
                </ThemedView>
              </ThemedView>
            ))}
          </ThemedView>
        </ThemedView>

        {/* 加餐原则 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>加餐原则</ThemedText>
          <ThemedView style={styles.snackPrinciple}>
            <ThemedText style={styles.snackPrincipleText}>{phase.dietPlan.snackPrinciple}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* 阶段提示 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionSubtitle}>阶段提示</ThemedText>
          {phase.tips.map((tip, index) => (
            <ThemedView key={index} style={styles.tipItem}>
              <ThemedText style={styles.tipText}>• {tip}</ThemedText>
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
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#FF6B6B',
  },
  sectionSubtitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFE5E5',
    marginBottom: 20,
  },
  infoLabel: {
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  cookingMethods: {
    gap: 12,
  },
  cookingMethodItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  cookingMethodText: {
    fontSize: 14,
  },
  mealContainer: {
    marginBottom: 20,
    gap: 8,
  },
  mealTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  mealItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  mealItemText: {
    fontSize: 14,
  },
  snackPrinciple: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#E5FFE5',
  },
  snackPrincipleText: {
    fontSize: 14,
    color: '#06D6A0',
  },
  tipItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  tipText: {
    fontSize: 14,
    opacity: 0.8,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageName: {
    fontWeight: '600',
    fontSize: 15,
  },
  calories: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 14,
  },
  packageItems: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.9,
  },
  nutritionContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  nutritionItem: {
    fontSize: 13,
    opacity: 0.8,
  },
});
