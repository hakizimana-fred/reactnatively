'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBlock } from '@/components/ui/CodeBlock';

type Example = {
  id: string;
  label: string;
  filename: string;
  language: string;
  code: string;
};

const examples: Example[] = [
  {
    id: 'install',
    label: 'Install',
    filename: 'terminal',
    language: 'bash',
    code: `# 1. Install the framework
pnpm add reactnatively react-native-reanimated expo-blur

# 2. Add Reanimated plugin to babel.config.js (must be last)
#    plugins: ['react-native-reanimated/plugin']

# 3. Wrap your root layout
#    <ReactnativelyProvider>
#      <Stack />
#    </ReactnativelyProvider>`,
  },
  {
    id: 'screen',
    label: 'ProfileScreen',
    filename: 'screens/ProfileScreen.tsx',
    language: 'tsx',
    code: `import type { ComponentProps } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  GlassView,
  Avatar,
  Heading,
  Text,
  Badge,
  Button,
  BottomNavigation,
} from 'reactnatively';

type ProfileScreenProps = {
  user: { avatarUrl: string; displayName: string };
  stats: Array<{ label: string; value: string }>;
  navItems: ComponentProps<typeof BottomNavigation>['items'];
};

export default function ProfileScreen({ user, stats, navItems }: ProfileScreenProps) {
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <GlassView elevation={3} borderRadius={24} style={styles.card}>
          <Avatar
            src={{ uri: user.avatarUrl }}
            size="xl"
            bordered
            borderColor="#8b5cf6"
          />
          <Heading level="h3" style={styles.name}>
            {user.displayName}
          </Heading>
          <Badge variant="glass" status="primary" label="Pro Member" />
          <View style={styles.statsRow}>
            {stats.map((s) => (
              <View key={s.label} style={styles.stat}>
                <Heading level="h4">{s.value}</Heading>
                <Text variant="sm" color="rgba(255,255,255,0.55)">
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
          <Button variant="glass" size="lg" style={styles.cta}>
            Edit Profile
          </Button>
        </GlassView>
      </ScrollView>
      <BottomNavigation items={navItems} value="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  root:     { flex: 1, backgroundColor: '#060610' },
  scroll:   { padding: 20, paddingTop: 60, alignItems: 'center' },
  card:     { padding: 24, alignItems: 'center', width: '100%' },
  name:     { marginTop: 16, marginBottom: 8 },
  statsRow: { flexDirection: 'row', gap: 20, marginVertical: 20 },
  stat:     { alignItems: 'center' },
  cta:      { marginTop: 4, width: '100%' },
});`,
  },
  {
    id: 'glass',
    label: 'GlassView',
    filename: 'components/HeroCard.tsx',
    language: 'tsx',
    code: `import { StyleSheet } from 'react-native';
import { GlassView, Heading, Text, Badge } from 'reactnatively';

export function HeroCard({ title, subtitle, tag }) {
  return (
    <GlassView
      elevation={3}
      variant="elevated"
      highlight
      glow={{ color: '#6366f1', radius: 40, opacity: 0.25 }}
      borderRadius={24}
      style={styles.card}
    >
      <Badge variant="glass" status="primary" label={tag} />
      <Heading level="h2" style={styles.title}>{title}</Heading>
      <Text variant="md" color="rgba(255,255,255,0.68)">{subtitle}</Text>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  card:  { margin: 20, padding: 24, gap: 12 },
  title: { marginTop: 4 },
});`,
  },
  {
    id: 'motion',
    label: 'Motion',
    filename: 'components/AnimatedCard.tsx',
    language: 'tsx',
    code: `import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  GlassView,
  Heading,
  Text,
  usePressAnimation,
  useEntranceAnimation,
} from 'reactnatively';

export function AnimatedCard({ title, subtitle, index }) {
  const press = usePressAnimation({
    pressedScale:   0.97,
    pressedOpacity: 0.85,
  });

  const entrance = useEntranceAnimation({
    variant: 'fadeSlideUp',
    delay:   index * 80,
  });

  return (
    <Pressable {...press.handlers}>
      <Animated.View style={[entrance.animatedStyle, press.animatedStyle]}>
        <GlassView elevation={2} borderRadius={20} style={styles.card}>
          <Heading level="h4">{title}</Heading>
          <Text variant="md" color="rgba(255,255,255,0.68)">{subtitle}</Text>
        </GlassView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, gap: 6 },
});`,
  },
  {
    id: 'theme',
    label: 'Theming',
    filename: 'theme/index.ts',
    language: 'typescript',
    code: `import { createTheme, baseTheme } from 'reactnatively';

export const appTheme = createTheme({
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary:    '#6366f1',
    secondary:  '#8b5cf6',
    background: '#060610',
  },
  glass: {
    ...baseTheme.glass,
    tint: {
      dark: {
        surface:  'rgba(20, 20, 40, 0.72)',
        elevated: 'rgba(30, 30, 55, 0.82)',
        overlay:  'rgba(10, 10, 30, 0.90)',
      },
      light: {
        surface:  'rgba(240, 240, 255, 0.72)',
        elevated: 'rgba(250, 250, 255, 0.82)',
      },
    },
  },
});

// app/_layout.tsx
import { ReactnativelyProvider } from 'reactnatively';
import { appTheme } from './theme';

export default function RootLayout() {
  return (
    <ReactnativelyProvider theme={appTheme}>
      <Stack />
    </ReactnativelyProvider>
  );
}`,
  },
];

export function CodeSection() {
  const [active, setActive] = useState(examples[0].id);
  const example = examples.find((e) => e.id === active)!;

  return (
    <section className="relative overflow-hidden py-24 section-bg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-white/50 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Code
            </div>
            <h2 className="text-4xl font-semibold text-[color:var(--text-primary)] mb-4 tracking-tight">
              Developer workflow first.{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Visual system second.
              </span>
            </h2>
            <p className="text-[color:var(--text-muted)] text-lg leading-relaxed mb-8">
              Start with a provider and typed components, then compose screens using
              normal React Native primitives, StyleSheet, Reanimated, and Expo APIs.
              The framework adds consistency without hiding the platform.
            </p>

            {/* Feature list */}
            <div className="space-y-3">
              {[
                '80+ production-ready React Native components',
                'Expo SDK 50+ compatible, zero native config',
                'Elevation system (0–5) with automatic blur & shadow',
                'Spring-physics press & entrance animations built in',
                'Full TypeScript inference — IntelliSense on every prop',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-[color:var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: code block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Tab bar */}
            <div className="flex gap-1 mb-3 p-1 rounded-xl bg-[color:var(--glass-subtle)] border border-[color:var(--border-subtle)] w-fit">
              {examples.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setActive(ex.id)}
                  className="relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                >
                  {active === ex.id && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.10]"
                      layoutId="codeTab"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active === ex.id ? 'text-[color:var(--text-primary)]' : 'text-[color:var(--text-muted)]'
                    }`}
                  >
                    {ex.label}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <CodeBlock
                  code={example.code}
                  language={example.language}
                  filename={example.filename}
                  showLineNumbers
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
