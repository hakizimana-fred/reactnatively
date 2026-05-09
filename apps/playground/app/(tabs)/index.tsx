import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassView } from '@reactnatively/glass';
import { Button, Stack, HStack } from '@reactnatively/core';
import { toast } from '@reactnatively/core';

export default function GlassScreen() {
  const isDark = useColorScheme() === 'dark';
  const bg     = isDark ? ['#0a0a1a', '#0f0f24', '#130d2e'] as const
                        : ['#e8eaf6', '#f3e5f5', '#e3f2fd'] as const;

  return (
    <LinearGradient colors={bg} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={[styles.hero, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
            Liquid Glass
          </Text>
          <Text style={[styles.sub, { color: isDark ? '#94a3b8' : '#475569' }]}>
            A glass-first React Native design system
          </Text>

          {/* Elevation showcase */}
          <SectionTitle title="Elevation Scale" isDark={isDark} />
          <Stack gap={12} style={styles.section}>
            {([0, 1, 2, 3, 4, 5] as const).map((elev) => (
              <GlassView key={elev} elevation={elev} borderRadius={16} style={styles.glassCard}>
                <Text style={[styles.label, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
                  Elevation {elev}
                </Text>
                <Text style={[styles.sublabel, { color: isDark ? '#94a3b8' : '#64748b' }]}>
                  {elevLabels[elev]}
                </Text>
              </GlassView>
            ))}
          </Stack>

          {/* Variant showcase */}
          <SectionTitle title="Glass Variants" isDark={isDark} />
          <Stack gap={12} style={styles.section}>
            {(['ultraThin', 'thin', 'surface', 'elevated'] as const).map((variant) => (
              <GlassView key={variant} elevation={2} variant={variant} borderRadius={16} style={styles.glassCard}>
                <Text style={[styles.label, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
                  {variant}
                </Text>
              </GlassView>
            ))}
          </Stack>

          {/* Toast demos */}
          <SectionTitle title="Toast Notifications" isDark={isDark} />
          <Stack gap={10} style={styles.section}>
            <HStack gap={8}>
              <Button
                label="Success"
                color="success"
                size="sm"
                flex={1}
                onPress={() => toast.success('Changes saved successfully!')}
              />
              <Button
                label="Error"
                color="danger"
                size="sm"
                flex={1}
                onPress={() => toast.error('Something went wrong')}
              />
            </HStack>
            <HStack gap={8}>
              <Button
                label="Warning"
                color="warning"
                size="sm"
                flex={1}
                onPress={() => toast.warning('Low storage space')}
              />
              <Button
                label="Info"
                size="sm"
                flex={1}
                onPress={() => toast.info('New update available')}
              />
            </HStack>
            <Button
              label="Glass Toast"
              variant="glass"
              onPress={() =>
                toast.show({
                  message: 'Beautiful liquid glass toast',
                  type: 'default',
                  glass: true,
                  position: 'top',
                })
              }
            />
          </Stack>

          {/* Glass Card demo */}
          <SectionTitle title="Glow Effects" isDark={isDark} />
          <Stack gap={12} style={styles.section}>
            {(Object.entries(glowColors) as [string, string][]).map(([key, color]) => (
              <GlassView
                key={key}
                elevation={3}
                borderRadius={16}
                glow={{ color, radius: 24, opacity: 0.35 }}
                style={styles.glassCard}
              >
                <HStack gap={10} align="center">
                  <View style={[styles.glowDot, { backgroundColor: color }]} />
                  <Text style={[styles.label, { color: isDark ? '#f1f5f9' : '#0f172a' }]}>
                    glow="{key}"
                  </Text>
                </HStack>
              </GlassView>
            ))}
          </Stack>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SectionTitle({ title, isDark }: { title: string; isDark: boolean }) {
  return (
    <Text style={[styles.sectionTitle, { color: isDark ? '#94a3b8' : '#64748b' }]}>
      {title.toUpperCase()}
    </Text>
  );
}

const elevLabels: Record<number, string> = {
  0: 'No blur · 95% tint',
  1: 'blur 12 · 82% tint',
  2: 'blur 24 · 72% tint',
  3: 'blur 40 · 65% tint',
  4: 'blur 55 · 55% tint',
  5: 'blur 72 · 45% tint',
};

const glowColors: Record<string, string> = {
  primary: '#6366f1',
  blue:    '#3b82f6',
  cyan:    '#06b6d4',
  rose:    '#f43f5e',
  success: '#10b981',
};

const styles = StyleSheet.create({
  gradient:     { flex: 1 },
  safe:         { flex: 1 },
  scroll:       { paddingHorizontal: 20, paddingTop: 12 },
  hero:         { fontSize: 34, fontWeight: '800', letterSpacing: -1, marginBottom: 6 },
  sub:          { fontSize: 16, fontWeight: '500', marginBottom: 28 },
  section:      { marginBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 10, marginTop: 20 },
  glassCard:    { paddingHorizontal: 16, paddingVertical: 14 },
  label:        { fontSize: 15, fontWeight: '600' },
  sublabel:     { fontSize: 12, fontWeight: '500', marginTop: 2 },
  glowDot:      { width: 10, height: 10, borderRadius: 5 },
});
