import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getCheckInRecords } from '../storage';
import { CheckInRecord } from '../types';

export default function CalendarScreen() {
  const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCheckInRecords = async () => {
      try {
        const records = await getCheckInRecords();
        setCheckInRecords(records);
      } catch (error) {
        console.error('Failed to load check-in records:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCheckInRecords();
  }, []);

  const markedDates = checkInRecords.reduce((marked: any, record: CheckInRecord) => {
    marked[record.date] = {
      marked: true,
      selected: record.completed,
      selectedColor: record.completed ? '#06D6A0' : '#FF6B6B',
      customStyles: {
        container: {
          backgroundColor: record.completed ? '#06D6A0' : '#FF6B6B',
          borderRadius: 16,
        },
        text: {
          color: 'white',
        },
      },
    };
    return marked;
  }, {});

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>打卡日历</ThemedText>
      {loading ? (
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>加载中...</ThemedText>
        </ThemedView>
      ) : (
        <Calendar
          current={'2026-01-01'}
          minDate={'2026-01-01'}
          onDayPress={(day: any) => {
            console.log('Day pressed:', day);
          }}
          markedDates={markedDates}
          markingType={'custom'}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});