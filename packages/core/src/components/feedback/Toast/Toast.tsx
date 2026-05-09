import React, { useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GlassView } from '@reactnatively/glass';
import { useIsDark } from '@reactnatively/theme';
import { SPRING_REVEAL, TIMING_EXIT } from '@reactnatively/animations';
import type { ToastItem } from './Toast.types';

interface ToastProps {
  item:      ToastItem;
  onDismiss: (id: string) => void;
}

const TYPE_COLORS: Record<string, string> = {
  success: '#22c55e',
  error:   '#ef4444',
  warning: '#f59e0b',
  info:    '#06b6d4',
  default: '#6366f1',
};

const TYPE_ICONS: Record<string, string> = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
  default: '●',
};

export const Toast = React.memo<ToastProps>(({ item, onDismiss }) => {
  const isDark     = useIsDark();
  const opacity    = useSharedValue(0);
  const translateY = useSharedValue(item.position === 'top' ? -20 : 20);

  const dismiss = useCallback(() => {
    opacity.value    = withTiming(0, TIMING_EXIT, () => runOnJS(onDismiss)(item.id));
    translateY.value = withTiming(item.position === 'top' ? -16 : 16, TIMING_EXIT);
  }, [item.id, item.position, onDismiss]);

  useEffect(() => {
    opacity.value    = withSpring(1, SPRING_REVEAL);
    translateY.value = withSpring(0, SPRING_REVEAL);
  }, []);

  useEffect(() => {
    if (item.duration === 0) return;
    const timer = setTimeout(() => dismiss(), item.duration);
    return () => clearTimeout(timer);
  }, [item.duration, dismiss]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity:   opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const accentColor = TYPE_COLORS[item.type] ?? TYPE_COLORS['default']!;
  const iconChar    = TYPE_ICONS[item.type]  ?? TYPE_ICONS['default']!;

  const content = (
    <View style={styles.content}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={[styles.iconWrap, { backgroundColor: `${accentColor}20` }]}>
        <Text style={[styles.icon, { color: accentColor }]}>
          {item.icon != null ? item.icon : iconChar}
        </Text>
      </View>
      <Text style={[styles.message, { color: isDark ? '#f1f5f9' : '#0f172a' }]} numberOfLines={2}>
        {item.message}
      </Text>
      {item.action != null && (
        <Pressable onPress={() => { item.action!.onPress(); dismiss(); }} style={styles.actionBtn}>
          <Text style={[styles.actionText, { color: accentColor }]}>{item.action.label}</Text>
        </Pressable>
      )}
      <Pressable onPress={dismiss} style={styles.closeBtn}>
        <Text style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: 18, lineHeight: 22 }}>×</Text>
      </Pressable>
    </View>
  );

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      {item.glass ? (
        <GlassView elevation={3} borderRadius={14}>{content}</GlassView>
      ) : (
        <View style={[styles.solidBg, { backgroundColor: isDark ? '#1e1e30' : '#fff' }]}>
          {content}
        </View>
      )}
    </Animated.View>
  );
});

Toast.displayName = 'Toast';

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical:   5,
  },
  content: {
    flexDirection: 'row',
    alignItems:    'center',
    minHeight:     52,
  },
  accentBar: {
    width: 3, alignSelf: 'stretch', borderRadius: 2,
    marginRight: 10, marginLeft: 4, marginVertical: 10,
  },
  iconWrap: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  icon: { fontSize: 13, fontWeight: '700' },
  message: {
    flex: 1, fontSize: 14, fontWeight: '500', lineHeight: 20,
    paddingVertical: 10, paddingRight: 6,
  },
  actionBtn:  { paddingHorizontal: 10, paddingVertical: 6, marginLeft: 4 },
  actionText: { fontSize: 13, fontWeight: '700' },
  closeBtn:   { padding: 10, alignItems: 'center', justifyContent: 'center' },
  solidBg: {
    borderRadius: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 4,
  },
});
