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
import { palette, spacing, radii, shadows } from '@reactnatively/theme';
import { Stack, HStack } from '@reactnatively/core';

export default function TokensScreen() {
  const isDark = useColorScheme() === 'dark';
  const bg     = isDark ? ['#0a0a1a', '#0d0d20'] as const
                        : ['#f8fafc', '#f1f5f9'] as const;
  const textPrimary   = isDark ? '#f1f5f9' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#64748b';

  return (
    <LinearGradient colors={bg} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={[styles.pageTitle, { color: textPrimary }]}>Design Tokens</Text>

          {/* Color Palette */}
          <SectionTitle title="Color Palette" isDark={isDark} />
          {Object.entries(palette).map(([family, shades]) => (
            <View key={family} style={styles.paletteRow}>
              <Text style={[styles.paletteName, { color: textSecondary }]}>{family}</Text>
              <HStack gap={4}>
                {Object.entries(shades).map(([shade, hex]) => (
                  <View key={shade} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                    <View style={[styles.swatch, { backgroundColor: hex as string }]} />
                    <Text style={[styles.swatchLabel, { color: textSecondary }]}>{shade}</Text>
                  </View>
                ))}
              </HStack>
            </View>
          ))}

          {/* Spacing Scale */}
          <SectionTitle title="Spacing Scale" isDark={isDark} />
          <Stack gap={6} style={styles.section}>
            {Object.entries(spacing).slice(0, 16).map(([key, value]) => (
              <HStack key={key} gap={12} align="center">
                <Text style={[styles.tokenKey, { color: textSecondary }]}>{key}</Text>
                <View style={[styles.spacingBar, { width: Math.min(value as number, 200), backgroundColor: '#6366f1' }]} />
                <Text style={[styles.tokenValue, { color: textSecondary }]}>{value}px</Text>
              </HStack>
            ))}
          </Stack>

          {/* Border Radius */}
          <SectionTitle title="Border Radius" isDark={isDark} />
          <HStack gap={12} wrap>
            {Object.entries(radii).map(([key, value]) => (
              <View key={key} style={styles.radiusItem}>
                <View
                  style={[
                    styles.radiusBox,
                    {
                      borderRadius: typeof value === 'number' ? value : 9999,
                      backgroundColor: isDark ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.12)',
                      borderColor: '#6366f1',
                    },
                  ]}
                />
                <Text style={[styles.tokenKey, { color: textSecondary, textAlign: 'center' }]}>{key}</Text>
                <Text style={[styles.tokenValue, { color: textSecondary, textAlign: 'center' }]}>{value}</Text>
              </View>
            ))}
          </HStack>

          {/* Shadow Scale */}
          <SectionTitle title="Shadow Scale" isDark={isDark} />
          <Stack gap={12} style={styles.section}>
            {Object.entries(shadows)
              .filter(([key]) => key !== 'glassGlow')
              .map(([key, shadow]) => (
                <View
                  key={key}
                  style={[
                    styles.shadowCard,
                    {
                      backgroundColor: isDark ? '#1e1e30' : '#fff',
                      ...(shadow as any).ios,
                    },
                  ]}
                >
                  <Text style={[styles.tokenKey, { color: textPrimary }]}>{key}</Text>
                </View>
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

const styles = StyleSheet.create({
  gradient:     { flex: 1 },
  safe:         { flex: 1 },
  scroll:       { paddingHorizontal: 20, paddingTop: 12 },
  pageTitle:    { fontSize: 28, fontWeight: '800', letterSpacing: -0.8, marginBottom: 4 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginBottom: 10, marginTop: 24 },
  section:      {},
  paletteRow:   { marginBottom: 12 },
  paletteName:  { fontSize: 11, fontWeight: '600', marginBottom: 4, textTransform: 'capitalize' },
  swatch:       { width: '100%', height: 32, borderRadius: 6 },
  swatchLabel:  { fontSize: 9, fontWeight: '500' },
  tokenKey:     { fontSize: 12, fontWeight: '600', width: 48 },
  tokenValue:   { fontSize: 11, fontWeight: '500' },
  spacingBar:   { height: 8, borderRadius: 4 },
  radiusItem:   { alignItems: 'center', gap: 4, marginBottom: 12 },
  radiusBox:    { width: 52, height: 52, borderWidth: 2 },
  shadowCard:   {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
  },
});
