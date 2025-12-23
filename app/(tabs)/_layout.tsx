import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Briefcase, Plane, Star, Wrench } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: '计划',
          tabBarIcon: ({ color }) => <Plane size={28}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="special"
        options={{
          title: '专项',
          tabBarIcon: ({ color }) => <Briefcase size={28}    color={color} />,
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: '工具',
          tabBarIcon: ({ color }) => <Wrench size={28}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="motivation"
        options={{
          title: '激励',
          tabBarIcon: ({ color }) => <Star size={28}  color={color} />,
        }}
      />
    </Tabs>
  );
}
