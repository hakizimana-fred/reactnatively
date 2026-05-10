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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively';
import {
  SPRING_SNAPPY,
  SPRING_LIQUID,
  SPRING_BOUNCE,
  SPRING_PRECISE,
  TIMING_FAST,
  TIMING_SLOW,
  useEntranceAnimation,
  usePressAnimation,
} from 'reactnatively';
import { Button, Stack, HStack } from 'reactnatively';

export default function AnimationsScreen() {
  const isDark = useColorScheme() === 'dark';
  const bg     = isDark ? ['#0a0a1a', '#0d0d20'] as const
                        : ['#f8fafc', '#f1f5f9'] as const;
  const textPrimary   = isDark ? '#f1f5f9' : '#0f172a';
  const textSecondary = isDark ? '#94a3b8' : '#64748b';

  return (
    <LinearGradient colors={bg} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <Text style={[styles.pageTitle, { color: textPrimary }]}>Motion</Text>

          <SectionTitle title="Spring Presets" isDark={isDark} />
          <Stack gap={10} style={styles.section}>
            <SpringDemo label="SPRING_SNAPPY"  config={SPRING_SNAPPY}  textColor={textPrimary} subColor={textSecondary} isDark={isDark} />
            <SpringDemo label="SPRING_LIQUID"  config={SPRING_LIQUID}  textColor={textPrimary} subColor={textSecondary} isDark={isDark} />
            <SpringDemo label="SPRING_BOUNCE"  config={SPRING_BOUNCE}  textColor={textPrimary} subColor={textSecondary} isDark={isDark} />
            <SpringDemo label="SPRING_PRECISE" config={SPRING_PRECISE} textColor={textPrimary} subColor={textSecondary} isDark={isDark} />
          </Stack>

          <SectionTitle title="Press Animation" isDark={isDark} />
          <PressDemo isDark={isDark} textColor={textPrimary} />

          <SectionTitle title="Entrance Animations" isDark={isDark} />
          <EntranceDemos isDark={isDark} textColor={textPrimary} subColor={textSecondary} />

          <SectionTitle title="Pulse / Loop" isDark={isDark} />
          <PulseDemo isDark={isDark} />

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SpringDemo({
  label,
  config,
  textColor,
  subColor,
  isDark,
}: {
  label: string;
  config: object;
  textColor: string;
  subColor: string;
  isDark: boolean;
}) {
  const x = useSharedValue(0);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  const trigger = () => {
    x.value = -40;
    x.value = withSpring(0, config as any);
  };

  return (
    <GlassView elevation={1} borderRadius={14} style={styles.demoCard}>
      <HStack gap={12} align="center">
        <Animated.View
          style={[styles.springBall, { backgroundColor: '#6366f1' }, animStyle]}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.demoLabel, { color: textColor }]}>{label}</Text>
        </View>
        <Button label="Fire" size="xs" onPress={trigger} />
      </HStack>
    </GlassView>
  );
}

function PressDemo({ isDark, textColor }: { isDark: boolean; textColor: string }) {
  const press = usePressAnimation({ pressedScale: 0.93, pressedOpacity: 0.82 });
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Animated.View style={[styles.pressTarget, { backgroundColor: isDark ? '#1e1e30' : '#fff' }, press.animatedStyle as any]} {...press.handlers}>
      <Text style={[styles.demoLabel, { color: textColor }]}>Hold me</Text>
      <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>scale 0.93 · opacity 0.82</Text>
    </Animated.View>
  );
}

function EntranceDemos({
  isDark,
  textColor,
  subColor,
}: {
  isDark: boolean;
  textColor: string;
  subColor: string;
}) {
  const [visible, setVisible] = useState(true);

  const variants = ['fade', 'slideUp', 'slideDown', 'scale'] as const;

  return (
    <Stack gap={10}>
      <Button
        label={visible ? 'Hide all' : 'Show all'}
        variant="outline"
        size="sm"
        onPress={() => setVisible((v) => !v)}
      />
      {variants.map((variant) => (
        <EntranceCard key={variant} variant={variant} visible={visible} textColor={textColor} isDark={isDark} />
      ))}
    </Stack>
  );
}

function EntranceCard({
  variant,
  visible,
  textColor,
  isDark,
}: {
  variant: 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'none';
  visible: boolean;
  textColor: string;
  isDark: boolean;
}) {
  // useEntranceAnimation returns the style directly, not { animatedStyle }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entranceStyle = useEntranceAnimation({ variant, visible }) as any;
  return (
    <Animated.View style={entranceStyle}>
      <GlassView elevation={1} borderRadius={12} style={styles.demoCard}>
        <Text style={[styles.demoLabel, { color: textColor }]}>{variant}</Text>
      </GlassView>
    </Animated.View>
  );
}

function PulseDemo({ isDark }: { isDark: boolean }) {
  const scale   = useSharedValue(1);
  const opacity = useSharedValue(1);
  const [running, setRunning] = useState(false);

  const start = () => {
    setRunning(true);
    scale.value   = withRepeat(withSequence(withTiming(1.12, { duration: 600 }), withTiming(1, { duration: 600 })), -1, false);
    opacity.value = withRepeat(withSequence(withTiming(0.5, { duration: 600 }), withTiming(1, { duration: 600 })), -1, false);
  };

  const stop = () => {
    setRunning(false);
    scale.value   = withSpring(1);
    opacity.value = withTiming(1, TIMING_FAST);
  };

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity:   opacity.value,
  }));

  return (
    <Stack gap={12} align="center">
      <Animated.View style={[styles.pulseDot, { backgroundColor: '#6366f1' }, animStyle]} />
      <Button label={running ? 'Stop' : 'Start pulse'} onPress={running ? stop : start} />
    </Stack>
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
  demoCard:     { paddingHorizontal: 16, paddingVertical: 12 },
  demoLabel:    { fontSize: 14, fontWeight: '600' },
  springBall:   { width: 28, height: 28, borderRadius: 14 },
  pressTarget:  {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
  },
  pulseDot:     { width: 48, height: 48, borderRadius: 24 },
});
