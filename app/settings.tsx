import { StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Settings as SettingsType } from '../types';
import { getSettings, updateSettings, clearAllData } from '../storage';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<SettingsType>({
    reminderEnabled: true,
    reminderTime: '08:00',
    measurementReminderEnabled: true,
    measurementReminderDay: 'Sunday',
    theme: 'auto'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await getSettings();
        setSettings(savedSettings);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const toggleReminder = async () => {
    const updatedSettings = { ...settings, reminderEnabled: !settings.reminderEnabled };
    setSettings(updatedSettings);
    await updateSettings(updatedSettings);
  };

  const toggleMeasurementReminder = async () => {
    const updatedSettings = { ...settings, measurementReminderEnabled: !settings.measurementReminderEnabled };
    setSettings(updatedSettings);
    await updateSettings(updatedSettings);
  };

  const handleClearData = () => {
    Alert.alert(
      '清除数据',
      '确定要清除所有数据吗？此操作不可恢复。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              Alert.alert('成功', '所有数据已清除');
            } catch (error) {
              console.error('Failed to clear data:', error);
              Alert.alert('错误', '清除数据失败');
            }
          }
        }
      ]
    );
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
        <ThemedText type="title" style={styles.title}>⚙️ 设置</ThemedText>
      </ThemedView>

      {/* 提醒设置 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🔔 提醒设置</ThemedText>
        
        <ThemedView style={styles.settingItem}>
          <ThemedView style={styles.settingInfo}>
            <ThemedText type="defaultSemiBold" style={styles.settingName}>每日打卡提醒</ThemedText>
            <ThemedText style={styles.settingDescription}>每天提醒您进行打卡</ThemedText>
          </ThemedView>
          <Switch
            value={settings.reminderEnabled}
            onValueChange={toggleReminder}
            trackColor={{ false: '#d0d0d0', true: '#FF6B6B' }}
            thumbColor={settings.reminderEnabled ? '#fff' : '#f4f3f4'}
          />
        </ThemedView>
        
        <ThemedView style={styles.settingItem}>
          <ThemedView style={styles.settingInfo}>
            <ThemedText type="defaultSemiBold" style={styles.settingName}>测量提醒</ThemedText>
            <ThemedText style={styles.settingDescription}>每周提醒您进行围度测量</ThemedText>
          </ThemedView>
          <Switch
            value={settings.measurementReminderEnabled}
            onValueChange={toggleMeasurementReminder}
            trackColor={{ false: '#d0d0d0', true: '#FF6B6B' }}
            thumbColor={settings.measurementReminderEnabled ? '#fff' : '#f4f3f4'}
          />
        </ThemedView>
        
        <ThemedView style={styles.settingItem}>
          <ThemedText type="defaultSemiBold" style={styles.settingName}>提醒时间</ThemedText>
          <ThemedView style={styles.settingValue}>
            <ThemedText style={styles.valueText}>{settings.reminderTime}</ThemedText>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.settingItem}>
          <ThemedText type="defaultSemiBold" style={styles.settingName}>测量提醒日</ThemedText>
          <ThemedView style={styles.settingValue}>
            <ThemedText style={styles.valueText}>{settings.measurementReminderDay}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 主题设置 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🎨 主题设置</ThemedText>
        
        <ThemedView style={styles.settingItem}>
          <ThemedText type="defaultSemiBold" style={styles.settingName}>主题</ThemedText>
          <ThemedView style={styles.themeOptions}>
            <TouchableOpacity 
              style={[
                styles.themeOption,
                settings.theme === 'auto' && styles.selectedTheme
              ]}
              onPress={() => {
                const updatedSettings = { ...settings, theme: 'auto' };
                setSettings(updatedSettings);
                updateSettings(updatedSettings);
              }}
            >
              <ThemedText style={styles.themeOptionText}>自动</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.themeOption,
                settings.theme === 'light' && styles.selectedTheme
              ]}
              onPress={() => {
                const updatedSettings = { ...settings, theme: 'light' };
                setSettings(updatedSettings);
                updateSettings(updatedSettings);
              }}
            >
              <ThemedText style={styles.themeOptionText}>浅色</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.themeOption,
                settings.theme === 'dark' && styles.selectedTheme
              ]}
              onPress={() => {
                const updatedSettings = { ...settings, theme: 'dark' };
                setSettings(updatedSettings);
                updateSettings(updatedSettings);
              }}
            >
              <ThemedText style={styles.themeOptionText}>深色</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* 数据管理 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>💾 数据管理</ThemedText>
        
        <TouchableOpacity style={styles.dataManagementItem}>
          <ThemedText type="defaultSemiBold" style={styles.dataManagementName}>备份数据</ThemedText>
          <ThemedText style={styles.dataManagementDescription}>将数据备份到本地文件</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.dataManagementItem}>
          <ThemedText type="defaultSemiBold" style={styles.dataManagementName}>恢复数据</ThemedText>
          <ThemedText style={styles.dataManagementDescription}>从本地文件恢复数据</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.dataManagementItem, styles.dangerItem]} onPress={handleClearData}>
          <ThemedText type="defaultSemiBold" style={[styles.dataManagementName, styles.dangerText]}>清除所有数据</ThemedText>
          <ThemedText style={styles.dataManagementDescription}>清除所有应用数据，此操作不可恢复</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* 关于 */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>ℹ️ 关于</ThemedText>
        
        <ThemedView style={styles.aboutItem}>
          <ThemedText type="defaultSemiBold" style={styles.aboutName}>应用版本</ThemedText>
          <ThemedText style={styles.aboutValue}>1.0.0</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.aboutItem}>
          <ThemedText type="defaultSemiBold" style={styles.aboutName}>开发者</ThemedText>
          <ThemedText style={styles.aboutValue}>减肥计划团队</ThemedText>
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
  section: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#FF6B6B',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  settingValue: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  themeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  selectedTheme: {
    backgroundColor: '#FF6B6B',
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dataManagementItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  dataManagementName: {
    marginBottom: 4,
  },
  dataManagementDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  dangerItem: {
    backgroundColor: '#FFE5E5',
  },
  dangerText: {
    color: '#FF6B6B',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  aboutName: {
    fontSize: 14,
  },
  aboutValue: {
    fontSize: 14,
    opacity: 0.8,
  },
});
