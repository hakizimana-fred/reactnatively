import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  LiquidCard,
  Avatar,
  Skeleton,
  Stack,
  HStack,
  VStack,
} from '@reactnatively/core';

export default function ComponentsScreen() {
  const isDark = useColorScheme() === 'dark';
  const bg     = isDark ? ['#0a0a1a', '#0d0d20'] as const
                        : ['#f8fafc', '#f1f5f9'] as const;
  const textPrimary   = isDark ? '#f1f5f9' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#64748b';

  const [loading, setLoading] = useState(false);

  return (
    <LinearGradient colors={bg} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={[styles.pageTitle, { color: textPrimary }]}>Components</Text>

          {/* ── Buttons ── */}
          <SectionTitle title="Button" isDark={isDark} />
          <Stack gap={10} style={styles.section}>
            <HStack gap={8}>
              {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
                <Button key={size} label={size.toUpperCase()} size={size} />
              ))}
            </HStack>
            <HStack gap={8}>
              <Button label="Primary"   color="primary"   flex={1} />
              <Button label="Secondary" color="secondary" flex={1} />
            </HStack>
            <HStack gap={8}>
              <Button label="Success"   color="success"   flex={1} />
              <Button label="Danger"    color="danger"    flex={1} />
            </HStack>
            <HStack gap={8}>
              <Button label="Outline"   variant="outline" flex={1} />
              <Button label="Ghost"     variant="ghost"   flex={1} />
            </HStack>
            <Button label="Glass Variant" variant="glass" />
            <Button
              label={loading ? 'Loading…' : 'Toggle Loading'}
              loading={loading}
              onPress={() => setLoading((v) => !v)}
            />
            <Button label="Disabled"  disabled />
          </Stack>

          {/* ── LiquidCard ── */}
          <SectionTitle title="LiquidCard" isDark={isDark} />
          <Stack gap={12} style={styles.section}>
            <LiquidCard>
              <LiquidCard.Header>
                <Text style={[styles.cardTitle, { color: textPrimary }]}>Default Card</Text>
                <Text style={[styles.cardSub, { color: textSecondary }]}>elevation=2 · solid</Text>
              </LiquidCard.Header>
              <LiquidCard.Body>
                <Text style={[styles.body, { color: textSecondary }]}>
                  Cards provide a contained surface for grouping related content with consistent
                  elevation and border treatment.
                </Text>
              </LiquidCard.Body>
              <LiquidCard.Footer>
                <HStack gap={8} justify="flex-end">
                  <Button label="Cancel" variant="ghost" size="sm" />
                  <Button label="Confirm" size="sm" />
                </HStack>
              </LiquidCard.Footer>
            </LiquidCard>

            <LiquidCard elevation={4} glow={{ color: '#6366f1', radius: 24, opacity: 0.3 }}>
              <LiquidCard.Header>
                <Text style={[styles.cardTitle, { color: textPrimary }]}>Deep Glass Card</Text>
                <Text style={[styles.cardSub, { color: textSecondary }]}>elevation=4 · glow</Text>
              </LiquidCard.Header>
              <LiquidCard.Body>
                <Text style={[styles.body, { color: textSecondary }]}>
                  Higher elevation = stronger blur, lower tint opacity, deeper shadow. Combined with
                  a glow halo for a premium floating feel.
                </Text>
              </LiquidCard.Body>
            </LiquidCard>

            <LiquidCard pressable onPress={() => {}}>
              <LiquidCard.Header>
                <Text style={[styles.cardTitle, { color: textPrimary }]}>Pressable Card</Text>
                <Text style={[styles.cardSub, { color: textSecondary }]}>Spring-driven press animation</Text>
              </LiquidCard.Header>
            </LiquidCard>
          </Stack>

          {/* ── Avatar ── */}
          <SectionTitle title="Avatar" isDark={isDark} />
          <Stack gap={16} style={styles.section}>
            <HStack gap={12} align="center">
              {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
                <Avatar key={size} name="Fred H" size={size} />
              ))}
            </HStack>

            <HStack gap={12} align="center">
              <Avatar name="Alice Brown" online={true} size="lg" />
              <Avatar name="Bob Smith"   online="busy" size="lg" />
              <Avatar name="Carol White" online="away" size="lg" />
              <Avatar name="Dan Jones"   online="offline" size="lg" />
            </HStack>

            <HStack gap={12} align="center">
              <Avatar name="Fred H"    bordered size="lg" />
              <Avatar name="Alice B"   bordered size="lg" fallbackBg="#6366f1" />
              <Avatar name="Bob S"     bordered size="lg" fallbackBg="#ec4899" />
              <Avatar name="Carol W"   bordered size="lg" fallbackBg="#10b981" />
            </HStack>
          </Stack>

          {/* ── Skeleton ── */}
          <SectionTitle title="Skeleton" isDark={isDark} />
          <Stack gap={12} style={styles.section}>
            <Skeleton width="100%" height={20} borderRadius={6} />
            <Skeleton width="75%"  height={20} borderRadius={6} />
            <Skeleton width="55%"  height={20} borderRadius={6} />
            <HStack gap={12} align="center">
              <Skeleton width={48} height={48} borderRadius={24} />
              <VStack gap={8} flex={1}>
                <Skeleton width="80%" height={16} borderRadius={4} />
                <Skeleton width="55%" height={12} borderRadius={4} />
              </VStack>
            </HStack>
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
  section:      { marginBottom: 4 },
  cardTitle:    { fontSize: 16, fontWeight: '700' },
  cardSub:      { fontSize: 12, fontWeight: '500', marginTop: 2 },
  body:         { fontSize: 14, lineHeight: 22, fontWeight: '400' },
});
