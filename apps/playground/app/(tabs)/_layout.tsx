import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const tabBarStyle = {
    backgroundColor: isDark ? '#0d0d1a' : '#ffffff',
    borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  };

  const activeTint  = '#6366f1';
  const inactiveTint = isDark ? '#4b5563' : '#9ca3af';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:   activeTint,
        tabBarInactiveTintColor: inactiveTint,
        tabBarStyle,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Glass',
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="◈" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="components"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="⊞" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tokens"
        options={{
          title: 'Tokens',
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="◉" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="animations"
        options={{
          title: 'Motion',
          tabBarIcon: ({ color }) => (
            <TabIcon symbol="⟳" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ symbol, color }: { symbol: string; color: string }) {
  const { Text } = require('react-native');
  return (
    <Text style={{ fontSize: 20, color, lineHeight: 24 }}>{symbol}</Text>
  );
}
