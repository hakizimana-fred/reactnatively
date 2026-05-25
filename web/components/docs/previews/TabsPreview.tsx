'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentPreview, type PreviewVariant } from '../ComponentPreview';

function RNTabs({
  tabs,
  variant = 'line',
  color = 'primary',
}: {
  tabs: { label: string; icon?: string; content?: string }[];
  variant?: 'line' | 'pills' | 'glass';
  color?: 'primary' | 'neutral';
}) {
  const [active, setActive] = useState(0);
  const hex = color === 'primary' ? '#7c3aed' : '#6b7280';

  return (
    <div style={{ width: '100%', maxWidth: 340 }}>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          borderBottom: variant === 'line' ? '1px solid rgba(255,255,255,0.08)' : undefined,
          background: variant === 'pills'
            ? 'rgba(255,255,255,0.06)'
            : variant === 'glass'
            ? 'rgba(255,255,255,0.05)'
            : 'transparent',
          borderRadius: variant !== 'line' ? 12 : 0,
          padding: variant !== 'line' ? 4 : 0,
          backdropFilter: variant === 'glass' ? 'blur(12px)' : undefined,
          border: variant === 'glass' ? '1px solid rgba(255,255,255,0.1)' : undefined,
          gap: 2,
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            style={{
              flex: 1,
              position: 'relative',
              padding: variant === 'line' ? '10px 16px 11px' : '8px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active === i ? (variant === 'line' ? hex : '#fff') : 'rgba(255,255,255,0.4)',
              fontSize: 13,
              fontWeight: active === i ? 600 : 400,
              borderRadius: variant !== 'line' ? 9 : 0,
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            {active === i && variant === 'line' && (
              <motion.span
                layoutId="lineIndicator"
                style={{
                  position: 'absolute', bottom: -1, left: 0, right: 0,
                  height: 2, background: hex, borderRadius: '1px 1px 0 0',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {active === i && variant !== 'line' && (
              <motion.span
                layoutId="pillIndicator"
                style={{
                  position: 'absolute', inset: 0,
                  background: variant === 'pills' ? hex : 'rgba(255,255,255,0.1)',
                  borderRadius: 9,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {tab.icon && <span style={{ fontSize: 15, position: 'relative' }}>{tab.icon}</span>}
            <span style={{ position: 'relative' }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px 4px 4px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              color: 'rgba(255,255,255,0.5)', fontSize: 13, textAlign: 'center',
              padding: '12px 0',
            }}
          >
            {tabs[active].content ?? `${tabs[active].label} content`}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const lineTabs = [
  { label: 'Feed', content: 'Your personalized activity feed' },
  { label: 'Explore', content: 'Discover new content and creators' },
  { label: 'Saved', content: "Items you've saved for later" },
];

const pillTabs = [
  { label: 'All', content: 'Showing all 128 results' },
  { label: 'Photos', content: '64 photos' },
  { label: 'Videos', content: '42 videos' },
  { label: 'Links', content: '22 links' },
];

const iconTabs = [
  { label: 'Home', icon: '🏠', content: 'Home screen content' },
  { label: 'Search', icon: '🔍', content: 'Search results appear here' },
  { label: 'Profile', icon: '👤', content: 'Your profile and settings' },
];

const variants: PreviewVariant[] = [
  {
    label: 'Line',
    preview: <RNTabs tabs={lineTabs} variant="line" />,
    filename: 'FeedScreen.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'reactnatively';

export function FeedScreen() {
  const [active, setActive] = useState('feed');

  return (
    <View style={styles.root}>
      <Tabs value={active} onChange={setActive} variant="line">
        <Tabs.List>
          <Tabs.Tab value="feed" label="Feed" />
          <Tabs.Tab value="explore" label="Explore" />
          <Tabs.Tab value="saved" label="Saved" />
        </Tabs.List>
        <Tabs.Panel value="feed"><FeedContent /></Tabs.Panel>
        <Tabs.Panel value="explore"><ExploreContent /></Tabs.Panel>
        <Tabs.Panel value="saved"><SavedContent /></Tabs.Panel>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});`,
  },
  {
    label: 'Pills',
    preview: <RNTabs tabs={pillTabs} variant="pills" />,
    filename: 'FilterTabs.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'reactnatively';

export function FilterTabs() {
  const [filter, setFilter] = useState('all');

  return (
    <View style={styles.root}>
      <Tabs value={filter} onChange={setFilter} variant="pills">
        <Tabs.List>
          <Tabs.Tab value="all" label="All" />
          <Tabs.Tab value="photos" label="Photos" />
          <Tabs.Tab value="videos" label="Videos" />
          <Tabs.Tab value="links" label="Links" />
        </Tabs.List>
      </Tabs>
      <MediaGrid filter={filter} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, gap: 16 },
});`,
  },
  {
    label: 'Glass + Icons',
    preview: <RNTabs tabs={iconTabs} variant="glass" />,
    filename: 'GlassTabs.tsx',
    code: `import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'reactnatively';

export function GlassTabs() {
  const [active, setActive] = useState('home');

  return (
    <View style={styles.root}>
      <Tabs value={active} onChange={setActive} variant="glass" glass>
        <Tabs.List>
          <Tabs.Tab value="home" label="Home" icon={<Ionicons name="home" size={18} />} />
          <Tabs.Tab value="search" label="Search" icon={<Ionicons name="search" size={18} />} />
          <Tabs.Tab value="profile" label="Profile" icon={<Ionicons name="person" size={18} />} />
        </Tabs.List>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});`,
  },
];

export function TabsPreview() {
  return <ComponentPreview variants={variants} minHeight={160} />;
}
