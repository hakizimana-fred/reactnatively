import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GlassView } from 'reactnatively-glass';
import { useIsDark } from 'reactnatively-theme';
import { useEntranceAnimation, useReducedMotion, TIMING_EXIT } from 'reactnatively-animations';

export type AlertStatus  = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'subtle' | 'solid' | 'outline' | 'glass';

export interface AlertProps {
  status?:        AlertStatus;
  variant?:       AlertVariant;
  title?:         string;
  description?:   string;
  icon?:          ReactNode;
  showIcon?:      boolean;
  isDismissible?: boolean;
  onDismiss?:     () => void;
  action?:        { label: string; onPress: () => void };
  style?:         StyleProp<ViewStyle>;
  children?:      ReactNode;
}

const STATUS_COLORS: Record<AlertStatus, string> = {
  info:    '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  error:   '#ef4444',
};

const STATUS_ICONS: Record<AlertStatus, string> = {
  info:    'ℹ',
  success: '✓',
  warning: '⚠',
  error:   '✕',
};

export const Alert = React.memo<AlertProps>(
  ({
    status        = 'info',
    variant       = 'subtle',
    title,
    description,
    icon,
    showIcon      = true,
    isDismissible = false,
    onDismiss,
    action,
    style,
    children,
  }) => {
    const isDark      = useIsDark();
    const isReduced   = useReducedMotion();
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(true);

    const exitOpacity   = useSharedValue(1);
    const exitScale     = useSharedValue(1);

    const entranceStyle = useEntranceAnimation({ variant: 'slideDown' });

    const handleDismiss = useCallback(() => {
      if (isReduced) {
        setMounted(false);
        onDismiss?.();
        return;
      }
      setVisible(false);
      exitOpacity.value = withTiming(0, TIMING_EXIT, () => {
        runOnJS(setMounted)(false);
        if (onDismiss) runOnJS(onDismiss)();
      });
      exitScale.value = withTiming(0.95, TIMING_EXIT);
    }, [isReduced, onDismiss, exitOpacity, exitScale]);

    const exitStyle = useAnimatedStyle(() => ({
      opacity:   exitOpacity.value,
      transform: [{ scale: exitScale.value }],
    }));

    if (!mounted) return null;

    const accentColor = STATUS_COLORS[status];
    const iconChar    = STATUS_ICONS[status];

    const containerStyle = resolveContainerStyle(variant, status, isDark);
    const textColor      = resolveTextColor(variant, isDark);

    const inner = (
      <View style={styles.inner}>
        {showIcon && (
          <View style={[styles.iconWrap, variant === 'solid' ? styles.iconWrapSolid : { backgroundColor: `${accentColor}20` }]}>
            {icon != null ? (
              icon
            ) : (
              <Text style={[styles.iconText, { color: variant === 'solid' ? '#fff' : accentColor }]}>
                {iconChar}
              </Text>
            )}
          </View>
        )}

        <View style={styles.textBlock}>
          {title != null && (
            <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
              {title}
            </Text>
          )}
          {description != null && (
            <Text style={[styles.description, { color: variant === 'solid' ? 'rgba(255,255,255,0.85)' : isDark ? '#94a3b8' : '#475569' }]}>
              {description}
            </Text>
          )}
          {children}
        </View>

        <View style={styles.actionsRow}>
          {action != null && (
            <Pressable onPress={action.onPress} style={styles.actionBtn}>
              <Text style={[styles.actionText, { color: variant === 'solid' ? '#fff' : accentColor }]}>
                {action.label}
              </Text>
            </Pressable>
          )}
          {isDismissible && (
            <Pressable onPress={handleDismiss} style={styles.closeBtn} accessibilityLabel="Dismiss alert" accessibilityRole="button">
              <Text style={[styles.closeText, { color: variant === 'solid' ? 'rgba(255,255,255,0.7)' : isDark ? '#64748b' : '#94a3b8' }]}>
                ✕
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );

    if (variant === 'glass') {
      return (
        <Animated.View style={[entranceStyle, exitStyle, style]}>
          <GlassView elevation={1} borderRadius={12} style={[styles.glassLeftBorder, { borderLeftColor: accentColor }]}>
            {inner}
          </GlassView>
        </Animated.View>
      );
    }

    return (
      <Animated.View style={[containerStyle, entranceStyle, exitStyle, style]}>
        {inner}
      </Animated.View>
    );
  },
);

Alert.displayName = 'Alert';

function resolveContainerStyle(
  variant: AlertVariant,
  status: AlertStatus,
  isDark: boolean,
): ViewStyle {
  const accentColor = STATUS_COLORS[status];
  const base: ViewStyle = {
    borderRadius: 12,
    overflow: 'hidden',
  };

  if (variant === 'subtle') {
    return {
      ...base,
      backgroundColor: `${accentColor}1A`,
      borderLeftWidth: 4,
      borderLeftColor: accentColor,
    };
  }

  if (variant === 'solid') {
    return {
      ...base,
      backgroundColor: accentColor,
    };
  }

  if (variant === 'outline') {
    return {
      ...base,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: accentColor,
    };
  }

  return base;
}

function resolveTextColor(variant: AlertVariant, isDark: boolean): string {
  if (variant === 'solid') return '#ffffff';
  return isDark ? '#f1f5f9' : '#0f172a';
}

const styles = StyleSheet.create({
  inner: {
    flexDirection:  'row',
    alignItems:     'flex-start',
    padding:        12,
    minHeight:      52,
  },
  iconWrap: {
    width:           32,
    height:          32,
    borderRadius:    16,
    alignItems:      'center',
    justifyContent:  'center',
    marginRight:     10,
    flexShrink:      0,
  },
  iconWrapSolid: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  iconText: {
    fontSize:   14,
    fontWeight: '700',
  },
  textBlock: {
    flex:       1,
    paddingTop: 6,
  },
  title: {
    fontSize:   15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 2,
  },
  description: {
    fontSize:   13,
    lineHeight: 18,
    marginTop:  2,
  },
  actionsRow: {
    flexDirection:  'row',
    alignItems:     'center',
    marginLeft:     4,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical:   6,
  },
  actionText: {
    fontSize:   13,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 8,
    alignItems:      'center',
    justifyContent:  'center',
  },
  closeText: {
    fontSize:   14,
    lineHeight: 18,
  },
  glassLeftBorder: {
    borderLeftWidth: 4,
  },
});
