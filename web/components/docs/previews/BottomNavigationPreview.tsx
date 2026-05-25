'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  bell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
};

function RNBottomNavigation({
  items,
  variant = 'glass',
  badge,
}: {
  items: { key: string; label: string; icon: string }[];
  variant?: 'glass' | 'solid' | 'minimal';
  badge?: Record<string, number>;
}) {
  const [active, setActive] = useState(items[0].key);

  const bg =
    variant === 'glass' ? 'rgba(15,10,40,0.85)' :
    variant === 'solid' ? '#1a1a2e' :
    'transparent';

  const border =
    variant === 'glass' ? '1px solid rgba(255,255,255,0.1)' :
    variant === 'solid' ? '1px solid rgba(255,255,255,0.06)' :
    'none';

  return (
    <div style={{
      width: '100%', maxWidth: 360,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {/* Content area */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 16, padding: '20px 16px',
        border: '1px solid rgba(255,255,255,0.06)',
        minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 13,
      }}>
        {items.find(i => i.key === active)?.label} Screen
      </div>
      {/* Nav bar */}
      <div style={{
        display: 'flex',
        background: bg,
        border,
        borderRadius: 20,
        padding: '8px 4px',
        backdropFilter: variant === 'glass' ? 'blur(20px)' : undefined,
      }}>
        {items.map((item) => {
          const isActive = item.key === active;
          const count = badge?.[item.key];
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 3, background: 'none',
                border: 'none', cursor: 'pointer', padding: '6px 4px', position: 'relative',
              }}
            >
              <div style={{ position: 'relative' }}>
                {isActive && (
                  <motion.span
                    layoutId="navGlow"
                    style={{
                      position: 'absolute', inset: -6,
                      background: 'rgba(124,58,237,0.15)',
                      borderRadius: 12,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.span
                  animate={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', position: 'relative' }}
                >
                  {NAV_ICONS[item.icon]}
                </motion.span>
                {count !== undefined && count > 0 && (
                  <span style={{
                    position: 'absolute', top: -6, right: -6,
                    background: '#ef4444', borderRadius: 10,
                    width: 16, height: 16, fontSize: 9, fontWeight: 700,
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {count}
                  </span>
                )}
              </div>
              <motion.span
                animate={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 10, fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const defaultItems = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'search', label: 'Search', icon: 'search' },
  { key: 'saved', label: 'Saved', icon: 'heart' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

const badgeItems = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'search', label: 'Search', icon: 'search' },
  { key: 'notifs', label: 'Alerts', icon: 'bell' },
  { key: 'profile', label: 'Profile', icon: 'user' },
];

const variants: PreviewVariant[] = [
  {
    label: 'Glass',
    preview: <RNBottomNavigation items={defaultItems} variant="glass" />,
    filename: 'AppNavigator.tsx',
    code: `import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation } from 'reactnatively';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { value: 'home', label: 'Home', icon: <Ionicons name="home" size={22} /> },
  { value: 'search', label: 'Search', icon: <Ionicons name="search" size={22} /> },
  { value: 'saved', label: 'Saved', icon: <Ionicons name="heart" size={22} /> },
  { value: 'profile', label: 'Profile', icon: <Ionicons name="person" size={22} /> },
];

export function AppNavigator() {
  const [active, setActive] = useState('home');

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text>{active}</Text>
      </View>
      <BottomNavigation
        items={tabs}
        value={active}
        onChange={setActive}
        glass
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
});`,
  },
  {
    label: 'With Badges',
    preview: <RNBottomNavigation items={badgeItems} variant="glass" badge={{ notifs: 5, search: 2 }} />,
    filename: 'NotificationNav.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'reactnatively';
import { Ionicons } from '@expo/vector-icons';

export function NotificationNav() {
  const [active, setActive] = useState('home');
  const unreadCount = 5;

  const tabs = [
    { value: 'home', label: 'Home', icon: <Ionicons name="home" size={22} /> },
    { value: 'search', label: 'Search', icon: <Ionicons name="search" size={22} /> },
    {
      value: 'alerts',
      label: 'Alerts',
      icon: <Ionicons name="notifications" size={22} />,
      badge: unreadCount,
    },
    { value: 'profile', label: 'Profile', icon: <Ionicons name="person" size={22} /> },
  ];

  return (
    <View style={styles.root}>
      <BottomNavigation
        items={tabs}
        value={active}
        onChange={setActive}
        glass
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});`,
  },
  {
    label: 'Minimal',
    preview: <RNBottomNavigation items={defaultItems} variant="minimal" />,
    filename: 'MinimalNav.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'reactnatively';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { value: 'home', label: 'Home', icon: <Ionicons name="home" size={22} /> },
  { value: 'search', label: 'Search', icon: <Ionicons name="search" size={22} /> },
  { value: 'saved', label: 'Saved', icon: <Ionicons name="heart" size={22} /> },
  { value: 'profile', label: 'Profile', icon: <Ionicons name="person" size={22} /> },
];

export function MinimalNav() {
  const [active, setActive] = useState('home');

  return (
    <View style={styles.root}>
      <BottomNavigation
        items={tabs}
        value={active}
        onChange={setActive}
        showLabel={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});`,
  },
];

export function BottomNavigationPreview() {
  return <ComponentPreview variants={variants} minHeight={220} />;
}
